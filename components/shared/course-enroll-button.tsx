"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Batch, Promo } from "@prisma/client"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import * as z from "zod"

import { performPurchaseAsFree } from "@/lib/actions/server/course.server.action"
import { formatPrice } from "@/lib/format"
import { makePayment } from "@/lib/make-payment"
import { useDebounce } from "@/hooks/use-debounce"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface CourseEnrollButtonProps {
  userId: string
  courseId: string
  promo: Promo | undefined
  originalPrice: number
  gst: number
  batches: Batch[]
  courseType: "self-paced" | "batch-based"
}

const batchSelectSchema = z.object({
  batch: z.string().optional(),
})

const CourseEnrollButton = ({
  courseId,
  promo,
  userId,
  originalPrice,
  batches,
  gst,
  courseType,
}: CourseEnrollButtonProps) => {
  const [purchasing, setPurchasing] = useState(false)
  const [isFirstTimeRendered, setIsFirstTimeRendered] = useState(true)
  const debouncedValue = useDebounce(isFirstTimeRendered, 2000)

  const form = useForm<z.infer<typeof batchSelectSchema>>({
    resolver: zodResolver(batchSelectSchema),
    defaultValues: {
      batch:
        courseType === "batch-based"
          ? batches.find((batch) => batch.isCurrent)?.id.toString()
          : undefined,
    },
  })
  const router = useRouter()!
  const price = useMemo(
    () =>
      Math.floor(
        originalPrice! - ((promo?.discount! || 0) * originalPrice!) / 100
      ),
    [originalPrice, promo?.discount]
  )
  const totalPrice = useMemo(
    () => Math.floor(price + (price * gst) / 100),
    [price, gst]
  )
  const { isValid, isSubmitting } = form.formState

  console.log(promo)

  useEffect(() => {
    if (isFirstTimeRendered) {
      setIsFirstTimeRendered(false)
    }
  }, [isFirstTimeRendered])
  if (!userId) router.push("/sign-in")

  const onClick = async (values: z.infer<typeof batchSelectSchema>) => {
    try {
      // For 100% discount (free courses)
      if (promo?.discount === 100) {
        // For free courses
        const purchaseData: any = {
          courseId,
          userId,
          price: price < 1 ? originalPrice : price,
          promoId: promo?.id,
        }

        // Only add batchId for batch-based courses
        if (courseType === "batch-based" && values.batch) {
          purchaseData.batchId = values.batch
        }

        await performPurchaseAsFree(purchaseData)
        router.push(`/student/dashboard`)
        return
      }

      // For paid courses
      const paymentData: any = {
        courseId,
        userId,
        price,
        gst,
        promoCode: promo?.code,
        setPurchasing: (val: boolean) => {
          setPurchasing(val)
          if (val === false) {
            setTimeout(() => {
              router.push(`/student/dashboard`)
            }, 2000)
          }
        },
      }

      // Only add batchId for batch-based courses
      if (courseType === "batch-based" && values.batch) {
        paymentData.batchId = values.batch
      }

      await makePayment(paymentData)

      router.push(`/student/dashboard`)
    } catch (error: any) {
      console.error(error)
      toast.error("Something went wrong")
    }
  }

  return (
    <div className="relative mt-3 flex w-full flex-col gap-3">
      {purchasing && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-100/50">
          <div className="h-20 w-20 animate-spin rounded-full border-4 border-gray-900" />
        </div>
      )}
      {isSubmitting && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100/50">
          <div className="h-20 w-20 animate-spin rounded-full border-4 border-gray-900" />
        </div>
      )}
      {courseType === "batch-based" && (!batches.length || debouncedValue) ? (
        <div className="flex flex-col gap-3">
          <div className="h-9 w-full animate-pulse rounded-md bg-gray-100" />
          <div className="h-9 w-full animate-pulse rounded-md bg-gray-100" />
        </div>
      ) : (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onClick)}
            className="mt-3 flex w-full flex-col gap-3"
          >
            {courseType === "batch-based" && (
              <FormField
                control={form.control}
                name="batch"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select a Batch</FormLabel>

                    <Select
                      onValueChange={(value) => field.onChange(value)}
                      defaultValue={batches[0]?.id}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a Batch" />
                      </SelectTrigger>
                      <SelectContent>
                        {batches.map((batch) => (
                          <SelectItem
                            key={batch.id}
                            value={batch.id.toString()}
                          >
                            {batch.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <FormDescription>
                      You can switch batches later by contacting admins{" "}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <Button
              disabled={
                isSubmitting ||
                (courseType === "batch-based" && !batches.length)
              }
              size="sm"
              className="w-full md:w-auto"
            >
              Enroll for{" "}
              {promo?.discount === 100 ? "Free" : formatPrice(totalPrice)}
            </Button>
          </form>
        </Form>
      )}
    </div>
  )
}

export default CourseEnrollButton
