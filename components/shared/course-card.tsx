import Image from "next/image"
import { Course } from "@prisma/client"
import { CalendarIcon, Clock, UsersIcon } from "lucide-react"

import { formatPrice } from "@/lib/format"
import { Badge } from "@/components/ui/badge"

type CourseCardProps = {
  course: Course & {
    isPurchased?: boolean
  }
}

const CourseCard = ({ course }: CourseCardProps) => {
  return (
    <div className="group border border-slate-200 rounded-lg overflow-hidden h-full">
      <div className="relative aspect-video w-full">
        <Image
          src={course.imageUrl || "/placeholder-course.jpg"}
          alt={course.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold line-clamp-1">{course.title}</h3>
          {course.isPurchased && (
            <Badge className="bg-blue-600">Purchased</Badge>
          )}
        </div>
        <p className="text-sm text-slate-500 mt-2 line-clamp-2">
          {course.description || "No description available"}
        </p>
        <div className="flex items-center gap-2 mt-4 text-sm text-slate-500">
          {course.type === "self-paced" ? (
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>Self-paced</span>
            </div>
          ) : (
            <div className="flex items-center gap-1">
              <CalendarIcon className="h-4 w-4" />
              <span>Batches available</span>
            </div>
          )}
        </div>
        <div className="mt-auto pt-4">
          <p className="font-bold text-lg">{formatPrice(course.price)}</p>
        </div>
      </div>
    </div>
  )
}

export default CourseCard
