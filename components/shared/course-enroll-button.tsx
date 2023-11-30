"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Batch, Promo } from "@prisma/client"
import axios from "axios"
import toast from "react-hot-toast"

import { performPurchaseAsFree } from "@/lib/actions/server/course.server.action"
import { formatPrice } from "@/lib/format"
import { Button } from "@/components/ui/button"
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

const CourseEnrollButton = ({
  courseId,
  promo,
  userId,
  originalPrice,
  batches,
}: CourseEnrollButtonProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const [batch, setBatch] = useState<string | null>(null)
  const router = useRouter()
  console.log(promo)
  const price = Math.floor(
    originalPrice! - ((promo?.discount! || 0) * originalPrice!) / 100
  )
  if (!userId) router.push("/sign-in")
  console.log("promo", promo)
  console.log("price", price)
  const onClick = async () => {
    console.log("price", price)
    try {
      setIsLoading(true)
      if (promo?.discount === 100) {
        console.log("free")
        const response = await performPurchaseAsFree({
          courseId,
          userId,
          batchId: batch!,
          price: price < 1 ? originalPrice : price,
          promoId: promo?.id,
        })

        router.push(`/student/courses/${courseId}`)
        return
      }
      console.log("not free")
      const response = await axios.post(`/api/courses/${courseId}/checkout`, {
        userId,
        price,
        batchId: batch,
        promo: promo || null,
      })

      window.location.assign(response.data.url)
    } catch (error: any) {
      toast.error(error.message)
      toast.error("Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-2">
      {isLoading || !batches.length ? (
        <div className="h-8 w-full animate-pulse rounded-md bg-gray-200"></div>
      ) : (
        <>
          <Select
            onValueChange={(value) => setBatch(value)}
            defaultValue={batches[0].id}
          >
            <SelectTrigger className="w-[180px]">
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

          <Button
            onClick={onClick}
            disabled={isLoading || !batches.length}
            size="sm"
            className="w-full md:w-auto"
          >
            Enroll for {promo?.discount === 100 ? "Free" : formatPrice(price)}
          </Button>
        </>
      )}
    </div>
  )
}

export default CourseEnrollButton
