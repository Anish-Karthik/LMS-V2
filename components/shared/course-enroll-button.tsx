"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@clerk/nextjs"
import { Promo } from "@prisma/client"
import axios from "axios"
import toast from "react-hot-toast"

import { formatPrice } from "@/lib/format"
import { Button } from "@/components/ui/button"

interface CourseEnrollButtonProps {
  userId: string
  price: number
  courseId: string
  promo: Promo | undefined
}

export const CourseEnrollButton = ({
  price,
  courseId,
  promo,
  userId,
}: CourseEnrollButtonProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  if (!userId) router.push("/sign-in")
  const onClick = async () => {
    try {
      setIsLoading(true)

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
      Enroll for {formatPrice(price)}
    </Button>
  )
}
