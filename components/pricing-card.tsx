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
      className={`bg-black border ${
        popular ? "border-pink-500" : "border-purple-900/30"
      } overflow-hidden relative h-full flex flex-col`}
    >
      {popular && (
        <div className="absolute top-0 right-0 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs font-medium px-3 py-1 rounded-bl-lg">
          Most Popular
        </div>
      )}
      <CardHeader className={`pb-2 ${popular ? "pt-12" : "pt-6"}`}>
        <CardTitle className="text-xl font-bold text-white">{title}</CardTitle>
        <div className="mt-4 flex items-baseline">
          <span className="text-4xl font-bold text-white">{price}</span>
          <span className="ml-1 text-purple-300">{period}</span>
        </div>
        <CardDescription className="text-purple-200 mt-2">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <ul className="space-y-3 mt-4">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <CheckCircle className="h-5 w-5 text-pink-500 shrink-0 mt-0.5" />
              <span className="text-purple-100">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="pt-4 mt-auto">
        <Button
          className={`w-full ${
            popular
              ? "bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white"
              : "bg-black border border-purple-500 text-purple-100 hover:bg-purple-950/50"
          }`}
        >
          {buttonText}
        </Button>
      </CardFooter>
    </Card>
  )
}
