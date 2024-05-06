import Link from "next/link"

import { socials } from "@/lib/socials"
import { cn } from "@/lib/utils"

const data: {
  heading: string
  contents: {
    title: string
    href: string
  }[]
}[] = [
  {
    heading: "Product",
    contents: [
      { title: "Features", href: "/purchase#why" },
      { title: "Testimonials", href: "/purchase#reviews" },
      { title: "FAQ", href: "/purchase#faqs" },
    ],
  },
  {
    heading: "Company",
    contents: [
      { title: "About", href: "/purchase#about" },
      { title: "Contact", href: "/contact" },
      { title: "Blogs", href: "/careers" },
    ],
  },
  {
    heading: "Social Media",
    contents: [
      { title: "Instagram", href: process.env.INSTAGRAM! },
      { title: "Youtube", href: process.env.YOUTUBE! },
      { title: "Linkedin", href: process.env.LINKEDIN! },
      { title: "Twitter", href: process.env.TWITTER! },
    ],
  },
  {
    heading: "Policies",
    contents: [
      { title: "Terms & Conditions", href: "/policies#terms" },
      { title: "Privacy", href: "/policies#privacy" },
      { title: "Refund", href: "/policies#refund" },
      { title: "Cancellation", href: "/policies#cancellation" },
    ],
  },

]

const PoliciesFooter = ({ className }: { className?: string }) => {
  console.log(data)
  return (
    <footer
      id="policies"
      className={cn(
        "text-background-color z-10 mt-12 flex w-full flex-col",
        className
      )}
    >
      <div className="container flex justify-between gap-2 py-6 sm:px-12">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col gap-2">
            <h3 className="text-xl font-semibold">{item.heading}</h3>
            {item.contents.map((content, index) => (
              <Link
                href={content.href}
                key={index}
                className="text-slate-500 underline underline-offset-2 ease-in-out hover:text-slate-300"
              >
                {content.title}
              </Link>
            ))}
          </div>
        ))}
      </div>
    </footer>
  )
}

export default PoliciesFooter
