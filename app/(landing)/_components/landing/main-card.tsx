import Image from "next/image"
import { Verified } from "lucide-react"

import { formatDate } from "@/lib/format"

import {
  TypewriterEffect,
  TypewriterEffectSmooth,
} from "../../../../components/animation/typewriter-effect"
import ButtonCard from "./button-card"

const MainCard = () => {
  return (
    <section
      className="flex w-full flex-col items-center gap-8 bg-transparent px-4 py-24"
      id="hero"
    >
      <HeaderCard />
      <ContentCard />
      {/* <BodyCard /> */}
      <div className="flex items-center gap-2">
        {/* <Verified size={32} className="text-quaternary-color" /> */}
        {/* <p className="text-xl font-extrabold">
          Up to date:{" "}
          <span className="bg-tertiary-color text-quaternary-color ml-2 rounded-md p-2">
            {formatDate(new Date())}
          </span>
        </p> */}
      </div>
      <div className="mt-10 max-w-3xl">
        {/* <p className="text-muted-foreground text-center text-2xl">
          Read the page if you want every single piece of information. Or just
          scroll to the main details by clicking the button below.
        </p> */}
      </div>
      <ButtonCard scrollTo="#main-details" text="Scroll to main details" />
    </section>
  )
}

export default MainCard

const words = [
  {
    text: "Learn,",
    className:
      "bg-gradient-to-r from-blue-500 to-blue-500 bg-clip-text text-transparent xs:text-4xl text-3xl font-bold sm:text-5xl md:text-6xl",
  },
  {
    text: "Trade,",
    className:
      "bg-gradient-to-r from-pink-500 to-pink-500 bg-clip-text text-transparent xs:text-4xl text-3xl font-bold sm:text-5xl md:text-6xl",
  },
  {
    text: "Earn",
    className:
      "bg-gradient-to-r from-yellow-500 to-yellow-500 bg-clip-text text-transparent xs:text-4xl text-3xl font-bold sm:text-5xl md:text-6xl",
  },
]

const HeaderCard = () => {
  return (
    // stylish
    <header className="flex flex-col items-center gap-8">
      <h1 className="text-quaternary-color xs:text-4xl text-3xl font-bold sm:text-5xl md:text-6xl">
        <span className="absolute -z-10 rounded-md bg-black/90 px-4 py-2 text-transparent blur-xl">
          Learn, Trade, Earn
        </span>
        <TypewriterEffectSmooth
          words={words}
          cursorClassName="xs:h-8 sm:h-10 md:h-12 lg:h-13 text-purple-color bg-pink-color mt-[0.4rem]"
        />
        {/* <span className="rounded-md bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
          Learn,{" "}
        </span>
        <span className="rounded-md bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
          Trade,{" "}
        </span>
        <span className="rounded-md bg-gradient-to-r from-yellow-500 to-yellow-800 bg-clip-text text-transparent">
          Earn
        </span> */}
      </h1>

      <h1 className="xs:text-4xl text-center text-3xl font-extrabold sm:text-5xl md:text-6xl">
        <span className="absolute -z-10 rounded-md bg-black/90 px-4 py-2 text-center text-transparent blur-xl">
          Smartly with Clovers
        </span>
        Smartly with{" "}
        <span className="z-50 rounded-md bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-center text-transparent">
          Clovers
        </span>
      </h1>
      <h1 className="max-w-4xl text-5xl font-extrabold">
        {/* Become a{" "}
        <span className="bg-gradient-to-r from-text-secondary to-tertiary-color bg-clip-text text-transparent">
          Trading Expert
        </span>{" "}
        in only one course Trading Community */}
      </h1>
    </header>
  )
}

const ContentCard = () => {
  return (
    <section>
      <h1 className="xs:text-xl my-2 text-center text-lg font-extrabold md:text-2xl">
        From Novice to Ninja: Clovers trading community unlocks your trading
        potential
      </h1>
    </section>
  )
}

const BodyCard = () => {
  return (
    <section className="mt-30 bg-primary-color p-5">
      <Image
        src="/images/hero1.jpeg"
        alt="landing-image-1"
        width={500}
        height={500}
      />
    </section>
  )
}
