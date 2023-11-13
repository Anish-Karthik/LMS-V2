"use client"

import React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@clerk/nextjs"
import { Testimonial, User } from "@prisma/client"
import { Pencil, TrashIcon } from "lucide-react"
import { toast } from "react-hot-toast"

import { deleteTestimonial } from "@/lib/actions/server/testimonial.server.action"
import { cn } from "@/lib/utils"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { ConfirmModal } from "../modals/confirm-modal"
import { Button } from "../ui/button"

const TestimonialCard = ({
  className,
  svg,
  description,
  avatar,
  name,
  title,
  testimonial,
  userInfo,
}: {
  className?: string
  svg: React.ReactNode
  description: string
  avatar: React.ReactNode | string
  name: string
  title: string
  testimonial?: (Testimonial & { user: User }) | null
  userInfo?: (User & { testimonials: Testimonial[] }) | null
}) => {
  const { userId } = useAuth()
  const router = useRouter()
  return (
    <Card
      key={description}
      className={cn("mb-2 border-none bg-secondary", className)}
    >
      <CardHeader className="!pb-0">
        <CardTitle className="flex items-center justify-between gap-x-2">
          {svg}
          {testimonial &&
            userInfo &&
            (userInfo.userId === userId || userInfo.role === "admin") && (
              <div>
                <Link href={`/testimonials/${testimonial.id}`}>
                  <Button variant={"ghost"}>
                    <Pencil className="h-5 w-5" />
                  </Button>
                </Link>
                <ConfirmModal
                  typeDelete
                  onConfirm={async () => {
                    try {
                      await deleteTestimonial(testimonial.id)
                      router.refresh()
                      toast.success("annoucement Deleted")
                    } catch (error) {
                      toast.error("Something went wrong")
                    }
                  }}
                >
                  <Button variant={"destructive"}>
                    <TrashIcon className="h-5 w-5" />
                  </Button>
                </ConfirmModal>
              </div>
            )}
        </CardTitle>
        <CardContent className="px-0 pt-4">{description}</CardContent>
      </CardHeader>
      <CardFooter className="!-mt-3 ">
        <div className="flex flex-row items-center justify-center gap-2 ">
          <div>
            <div
              className={cn(
                "rounded-full",
                typeof avatar === "string" &&
                  "bg-tertiary-color px-[0.7rem] py-1 text-quaternary-color"
              )}
            >
              {avatar}
            </div>
          </div>
          <div>
            <div className="font-semibold">{name}</div>
            <div className="!text-[13px] text-muted-foreground">{title}</div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}

export default TestimonialCard
