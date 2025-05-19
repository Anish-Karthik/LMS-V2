import Image from "next/image"
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar"
import { QuoteIcon, UserIcon } from "lucide-react"

import { Card, CardContent, CardFooter } from "@/components/ui/card"

interface TestimonialCardProps {
  quote: string
  author: string
  role: string
  avatarUrl: string
}

export function TestimonialCard({
  quote,
  author,
  role,
  avatarUrl,
}: TestimonialCardProps) {
  return (
    <Card className="overflow-hidden border border-purple-900/30 bg-black">
      <CardContent className="relative pt-6">
        <QuoteIcon className="absolute left-6 top-6 h-8 w-8 text-pink-500/30" />
        <div className="relative z-10 pl-4 text-purple-100">"{quote}"</div>
      </CardContent>
      <CardFooter className="mt-4 border-t border-purple-900/20 pt-4">
        <div className="flex items-center gap-4">
          {avatarUrl ? (
            <Image
              src={avatarUrl || "/placeholder.svg"}
              alt={author}
              width={48}
              height={48}
              className="rounded-full border-2 border-purple-500"
            />
          ) : (
            <div className="h-10 w-10 rounded-full border border-purple-800/30 bg-purple-800/30" />
          )}
          <div>
            <div className="font-medium text-white">{author}</div>
            <div className="text-sm text-purple-300">{role}</div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
