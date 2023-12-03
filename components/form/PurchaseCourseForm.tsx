"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Batch, Course, Promo } from "@prisma/client"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { RecoilRoot } from "recoil"
import * as z from "zod"

import {
  getPromoByCodeClient,
  isPromoExpired,
  isValidPromoCode,
} from "@/lib/actions/server/promo.server.action"
import { formatPrice } from "@/lib/format"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import CourseEnrollButton from "@/components/shared/course-enroll-button"

const formSchema = z.object({
  promo: z
    .string()
    .min(6)
    .max(12)
    .toUpperCase()
    .refine(async (promo) => await isValidPromoCode(promo || ""), {
      message: "Please enter a valid promo code",
    })
    .refine(async (promo) => !(await isPromoExpired(promo || "")), {
      message: "Promo Code Expired",
    }),
})

const PurchaseCourseForm = ({
  courseId,
  course,
  userId,
  promoObj,
  batches,
}: {
  batches: Batch[]
  userId: string
  courseId: string
  course: Course
  promoObj?: Promo
}) => {
  const [isCreating, setIsCreating] = useState(false)
  const [success, setSuccess] = useState(false)
  const [value, setValue] = useState("")
  const [promo, setPromo] = useState<Promo | undefined>(promoObj)
  const [continueState, setContinueState] = useState("Continue without promo")
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      promo: value,
    },
  })

  useEffect(() => {
    if (promoObj) {
      form.setValue("promo", promoObj.code)
      form.handleSubmit(onSubmit)
      // setSuccess(true)
      setValue(promoObj.code)
      setPromo(promoObj)
    }
  }, [promoObj, form, setValue, form.getValues])

  const { isSubmitting, isValid } = form.formState
  const discountedPrice = promo
    ? Math.floor(course.price! - (promo.discount! * course.price!) / 100)
    : course.price!

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsCreating(true)
      toast.success("Promo Applied Success")
      const res = await getPromoByCodeClient(values.promo)
      setPromo(res)
      // setSuccess(true)
      setValue(values.promo)
      setContinueState("Continue")
      router.refresh()
    } catch (error: any) {
      toast.error("Something went wrong", error.message)
    }
    setIsCreating(false)
  }
  return (
    <RecoilRoot>
      <div className="my-auto flex h-full flex-col items-center justify-center gap-3 px-3">
        <div className={cn("w-full max-w-lg", success ? "p-12" : "p-12")}>
          <div>
            {promo && (
              <h3 className="text-lg font-semibold">
                {" "}
                After {promo.discount}% discount
              </h3>
            )}
            <h3 className="text-lg font-semibold">
              Enroll for{" "}
              <span className={cn(promo ? "line-through" : "")}>
                {formatPrice(course.price!)}
              </span>{" "}
              {promo && formatPrice(discountedPrice)}
            </h3>
          </div>
          {!success && (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="mt-4 space-y-4"
              >
                <div>
                  <h3 className="text-lg font-semibold">Redeem a promo code</h3>
                  <p className="text-sm text-gray-500">
                    If you have a promo code, you can redeem it here.
                  </p>
                </div>
                <FormField
                  control={form.control}
                  name="promo"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          disabled={isSubmitting}
                          autoFocus={true}
                          placeholder="e.g. 'Introduction to the course'"
                          {...field}
                          onChange={(e) => {
                            e.target.value = e.target.value.toUpperCase()
                            field.value = e.target.value.toUpperCase()
                            field.onChange(e)
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex flex-col gap-2 ">
                  <Button disabled={isSubmitting} type="submit">
                    Redeem
                  </Button>
                  <Button
                    disabled={isSubmitting}
                    type={"button"}
                    onClick={() => setSuccess(true)}
                  >
                    {continueState}
                  </Button>
                </div>
              </form>
            </Form>
          )}

          {success && (
            <div className="flex w-full flex-col items-center justify-center gap-2">
              <CourseEnrollButton
                batches={batches}
                courseId={courseId}
                originalPrice={course.price!}
                promo={promo}
                userId={userId}
              />
              <Button
                onClick={() => setSuccess(false)}
                size="sm"
                className="w-full"
              >
                Back
              </Button>
            </div>
          )}
        </div>
      </div>
    </RecoilRoot>
  )
}

export default PurchaseCourseForm
