"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@clerk/nextjs"
import { Promo } from "@prisma/client"
import axios from "axios"
import toast from "react-hot-toast"

import { performPurchaseAsFree } from "@/lib/actions/server/course.server.action"
import { formatPrice } from "@/lib/format"
import { Button } from "@/components/ui/button"

interface CourseEnrollButtonProps {
  userId: string
  courseId: string
  promo: Promo | undefined
  originalPrice: number
}

export const CourseEnrollButton = ({
  courseId,
  promo,
  userId,
  originalPrice,
}: CourseEnrollButtonProps) => {
  const [isLoading, setIsLoading] = useState(false)
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
    <Button
      onClick={onClick}
      disabled={isLoading}
      size="sm"
      className="w-full md:w-auto"
    >
      Enroll for {promo?.discount === 100 ? "Free" : formatPrice(price)}
    </Button>
  )
}
