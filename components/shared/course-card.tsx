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
    <div className="group h-full overflow-hidden rounded-lg border border-slate-200">
      <div className="relative aspect-video w-full">
        <Image
          src={course.imageUrl || "/placeholder-course.jpg"}
          alt={course.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex grow flex-col p-4">
        <div className="flex items-center justify-between">
          <h3 className="line-clamp-1 text-lg font-semibold">{course.title}</h3>
          {course.isPurchased && (
            <Badge className="bg-blue-600">Purchased</Badge>
          )}
        </div>
        <p className="mt-2 line-clamp-2 text-sm text-slate-500">
          {course.description || "No description available"}
        </p>
        <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
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
          <p className="text-lg font-bold">{formatPrice(course.price ?? 0)}</p>
        </div>
      </div>
    </div>
  )
}

export default CourseCard
