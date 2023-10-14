"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const testimonials = [
  {
    name: "Anish Karthik",
    avatar: "A",
    title: "Software Engineer",
    description:
      "This is the best trading Course I have ever taken! I have gained knowledge and how to use my money wisely!",
  },
  {
    name: "Anandakannan",
    avatar: "A",
    title: "Student",
    description:
      "I have been studying this course for a while now and I have to say that it is the best trading course I have ever taken!",
  },
  {
    name: "Dharun Prakash",
    avatar: "D",
    title: "Trader",
    description:
      "This trading course has provided me with the knowledge and skills to become a successful trader. I am very happy with the results!",
  },
  {
    name: "Akash Raj",
    avatar: "A",
    title: "Businessman",
    description:
      "The best in the market! I have been trading for a while now and this course has helped me to become a better trader and increase my profits!",
  },
]

export const LandingContent = () => {
  return (
    <div className="px-10 pb-20">
      <h2 className="mb-10 text-center  text-4xl font-extrabold">
        Testimonials
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {testimonials.map((item) => (
          <Card key={item.description} className="border-none bg-secondary ">
            <CardHeader>
              <CardTitle className="flex items-center gap-x-2">
                <div>
                  <p className="text-lg">{item.name}</p>
                  <p className="text-sm text-zinc-400">{item.title}</p>
                </div>
              </CardTitle>
              <CardContent className="px-0 pt-4">
                {item.description}
              </CardContent>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  )
}
