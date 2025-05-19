import Image from "next/image"
import { QuoteIcon, UserIcon } from "lucide-react"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar"

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
    <Card className="bg-black border border-purple-900/30 overflow-hidden">
      <CardContent className="pt-6 relative">
        <QuoteIcon className="h-8 w-8 text-pink-500/30 absolute top-6 left-6" />
        <div className="text-purple-100 relative z-10 pl-4">"{quote}"</div>
      </CardContent>
      <CardFooter className="border-t border-purple-900/20 pt-4 mt-4">
        <div className="flex items-center gap-4">
          {avatarUrl ?<Image
            src={avatarUrl || "/placeholder.svg"}
            alt={author}
            width={48}
            height={48}
            className="rounded-full border-2 border-purple-500"
          />: (
            <div className="w-10 h-10 bg-purple-800/30 rounded-full border border-purple-800/30" />
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
