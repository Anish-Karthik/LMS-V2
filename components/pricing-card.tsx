import { CheckCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface PricingCardProps {
  title: string
  price: string
  period: string
  description: string
  features: string[]
  buttonText: string
  popular?: boolean
}

export function PricingCard({
  title,
  price,
  period,
  description,
  features,
  buttonText,
  popular = false,
}: PricingCardProps) {
  return (
    <Card
      className={`border bg-black ${
        popular ? "border-pink-500" : "border-purple-900/30"
      } relative flex h-full flex-col overflow-hidden`}
    >
      {popular && (
        <div className="absolute right-0 top-0 rounded-bl-lg bg-gradient-to-r from-pink-500 to-purple-600 px-3 py-1 text-xs font-medium text-white">
          Most Popular
        </div>
      )}
      <CardHeader className={`pb-2 ${popular ? "pt-12" : "pt-6"}`}>
        <CardTitle className="text-xl font-bold text-white">{title}</CardTitle>
        <div className="mt-4 flex items-baseline">
          <span className="text-4xl font-bold text-white">{price}</span>
          <span className="ml-1 text-purple-300">{period}</span>
        </div>
        <CardDescription className="mt-2 text-purple-200">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="grow">
        <ul className="mt-4 space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-pink-500" />
              <span className="text-purple-100">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="mt-auto pt-4">
        <Button
          className={`w-full ${
            popular
              ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700"
              : "border border-purple-500 bg-black text-purple-100 hover:bg-purple-950/50"
          }`}
        >
          {buttonText}
        </Button>
      </CardFooter>
    </Card>
  )
}
