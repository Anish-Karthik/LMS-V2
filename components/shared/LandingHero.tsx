import Image from "next/image"

import { cn } from "@/lib/utils"

export const LandingHero = ({
  title,
  description,
  image,
  children,
  className,
}: {
  title: string
  description: string
  image: string
  children?: React.ReactNode
  className?: string
}) => {
  return (
    <section className={cn("w-full py-20", className)}>
      <div className="mx-auto flex max-w-6xl flex-col items-center space-y-5 py-3 max-lg:gap-6 lg:grid lg:grid-cols-2">
        <div className="flex flex-col items-start justify-center gap-2 max-lg:mx-4 max-lg:max-w-xl max-lg:items-center max-sm:mx-16 max-sm:w-[90vw] md:px-5">
          <div>
            <h1 className="text-xl font-extrabold text-pink-600 md:text-2xl lg:text-4xl">
              {title}
            </h1>
          </div>
          <p className="text-slate-700 max-sm:text-sm">{description}</p>

          {children}
        </div>
        <div className="max-lg:mx-4 max-sm:mx-16">
          <Image src={image} alt="hero" width={500} height={500} />
        </div>
      </div>
    </section>
  )
}
