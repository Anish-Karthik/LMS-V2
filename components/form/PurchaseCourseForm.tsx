"use client"

import React, { useEffect, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Announcement, Attachment, Course, Promo } from "@prisma/client"
import { set } from "date-fns"
import { Loader2, PlusCircle } from "lucide-react"
import qs from "query-string"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import * as z from "zod"

import { createAnnouncement } from "@/lib/actions/announcement.action"
import {
  getPromoByCode,
  isPromoExpired,
  isValidPromoCode,
} from "@/lib/actions/promo.action"
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

import { CourseEnrollButton } from "../shared/course-enroll-button"

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
}: {
  userId: string
  courseId: string
  course: Course
}) => {
  const [isCreating, setIsCreating] = useState(false)
  const [success, setSuccess] = useState(false)
  const [value, setValue] = useState("")
  const [promo, setPromo] = useState<Promo>()
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      promo: value,
    },
  })

  const { isSubmitting, isValid } = form.formState
  const discountedPrice = promo
    ? Math.floor(course.price! - (promo.discount! * course.price!) / 100)
    : course.price!

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsCreating(true)
      toast.success("Promo Applied Success")
      const res = await getPromoByCode(values.promo)
      setPromo(res)
      // setSuccess(true)
      setValue(values.promo)
      router.refresh()
    } catch (error: any) {
      toast.error("Something went wrong", error.message)
    }
    setIsCreating(false)
  }
  return (
    <div className="my-auto flex flex-col items-center justify-center gap-3 p-3">
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
                      placeholder="e.g. 'Introduction to the course'"
                      {...field}
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
                Continue {!isValid && "without promo"}
              </Button>
            </div>
          </form>
        </Form>
      )}

      {success && (
        <div className="flex flex-col items-center justify-center gap-2 sm:flex-row">
          <CourseEnrollButton
            price={discountedPrice || course.price!}
            courseId={courseId}
            promo={promo}
            userId={userId}
          />
          <Button onClick={() => setSuccess(false)} size="sm">
            Back
          </Button>
        </div>
      )}
    </div>
  )
}

export default PurchaseCourseForm
