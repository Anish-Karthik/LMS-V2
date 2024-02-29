"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { firstTimeRender } from "@/store/atoms"
import { zodResolver } from "@hookform/resolvers/zod"
import { Batch, Promo } from "@prisma/client"
import axios from "axios"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { useRecoilState } from "recoil"
import * as z from "zod"

import { performPurchaseAsFree } from "@/lib/actions/server/course.server.action"
import { formatPrice } from "@/lib/format"
import { useDebounce } from "@/hooks/use-debounce"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
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
  batches: Batch[]
}
const batchSelectSchema = z.object({
  batch: z.string({
    required_error: "Please select an email to display.",
  }),
})

const CourseEnrollButton = ({
  courseId,
  promo,
  userId,
  originalPrice,
  batches,
}: CourseEnrollButtonProps) => {
  const [isFirstTimeRendered, setIsFirstTimeRendered] =
    useRecoilState(firstTimeRender)
  const debouncedValue = useDebounce(isFirstTimeRendered, 2000)

  const form = useForm<z.infer<typeof batchSelectSchema>>({
    resolver: zodResolver(batchSelectSchema),
    defaultValues: {
      batch: batches.find((batch) => batch.isCurrent)?.id.toString(),
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
  const { isValid, isSubmitting } = form.formState

  console.log(promo)

  useEffect(() => {
    if (isFirstTimeRendered) {
      setIsFirstTimeRendered(false)
    }
  }, [isFirstTimeRendered, setIsFirstTimeRendered])
  if (!userId) router.push("/sign-in")

  const onClick = async (values: z.infer<typeof batchSelectSchema>) => {
    console.log("price", price)
    try {
      if (promo?.discount === 100) {
        console.log("free")
        const response = await performPurchaseAsFree({
          courseId,
          userId,
          batchId: values.batch!,
          price: price < 1 ? originalPrice : price,
          promoId: promo?.id,
        })

        router.push(`/student/dashboard}`)
        return
      }
      console.log("not free")
      const response = await axios.post(`/api/courses/${courseId}/checkout`, {
        userId,
        price,
        batchId: values.batch,
        promo: promo || null,
      })

      router.push(response.data.url)
    } catch (error: any) {
      toast.error("Something went wrong")
    }
  }

  return (
    <div className="relative mt-3 flex w-full flex-col gap-3">
      {isSubmitting && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100/50">
          <div className="h-20 w-20 animate-spin rounded-full border-4 border-gray-900"></div>
        </div>
      )}
      {!batches.length || debouncedValue ? (
        <div className="flex flex-col gap-3">
          <div className="h-9 w-full animate-pulse rounded-md bg-gray-100"></div>
          <div className="h-9 w-full animate-pulse rounded-md bg-gray-100"></div>
        </div>
      ) : (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onClick)}
            className="mt-3 flex w-full flex-col gap-3"
          >
            <FormField
              control={form.control}
              name="batch"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select a Batch</FormLabel>

                  <Select
                    onValueChange={(value) => field.onChange(value)}
                    defaultValue={batches[0].id}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a Batch" />
                    </SelectTrigger>
                    <SelectContent>
                      {batches.map((batch) => (
                        <SelectItem value={batch.id.toString()}>
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
            <Button
              disabled={isSubmitting || !batches.length}
              size="sm"
              className="w-full md:w-auto"
            >
              Enroll for {promo?.discount === 100 ? "Free" : formatPrice(price)}
            </Button>
          </form>
        </Form>
      )}
    </div>
  )
}

export default CourseEnrollButton
