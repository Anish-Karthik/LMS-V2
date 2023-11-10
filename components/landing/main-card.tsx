import React from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowBigDownIcon, ArrowDownIcon, Verified } from "lucide-react"

import { formatDate } from "@/lib/format"

import { Button } from "../ui/button"
import ButtonCard from "./button-card"

const MainCard = () => {
  return (
    <section className="flex flex-col items-center gap-8">
      <HeaderCard />
      <ContentCard />
      <BodyCard />
      <div className="flex items-center gap-2">
        <Verified size={32} className="text-quaternary-color" />
        <p className="text-xl font-extrabold">
          Up to date:{" "}
          <span className="ml-2 rounded-md bg-tertiary-color p-2 text-quaternary-color">
            {formatDate(new Date())}
          </span>
        </p>
      </div>
      <div className="mt-10 max-w-3xl">
        <p className="text-center text-2xl text-muted-foreground">
          Read the page if you want every single piece of information. Or just
          scroll to the main details by clicking the button below.
        </p>
      </div>
      <ButtonCard scrollTo="#course-details" text="Scroll to main details" />
    </section>
  )
}

export default MainCard

const HeaderCard = () => {
  return (
    // stylish
    <header className="flex flex-col items-center gap-8">
      <h3 className="font-bold text-quaternary-color">
        FOR DEVELOPERS WHO WANT TO STAND OUT AND BECOME IRREPLACEABLE
      </h3>
      <h1 className="text-6xl font-extrabold">
        <span className="rounded-md bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
          AlfaQ
        </span>{" "}
        Trading Community
      </h1>
      {/* <h1 className="max-w-4xl text-5xl font-extrabold">
        Become a{" "}  
        <span className="bg-gradient-to-r from-text-secondary to-tertiary-color bg-clip-text text-transparent">
          Trading Expert 
        </span>{" "}
        in only one course Trading Community
      </h1> */}
    </header>
  )
}

const ContentCard = () => {
  return (
    <section>
      <h1 className="my-2 text-4xl font-extrabold">
        One stop space for trading
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
