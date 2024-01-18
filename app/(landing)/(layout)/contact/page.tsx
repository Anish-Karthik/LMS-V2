import Link from "next/link"

import { socials } from "@/lib/socials"
import { LandingHero } from "@/components/shared/LandingHero"

import HandleCopy from "./handle-copy"

const title = "Get In Touch"
const image = "/landing/about.png"

const page = () => {
  return (
    <LandingHero
      title={title}
      description={""}
      image={image}
      className="bg-text-secondary text-background lg:py-20"
    >
      <div className="socials flex flex-col justify-evenly gap-2 pb-8 ">
        {socials.map((social, index) => (
          <div className="flex justify-between" key={index}>
            <Link
              href={social.href}
              key={index}
              target="_blank"
              className="flex items-center gap-2"
            >
              <social.icon width={40} height={40} />
              <p className="text-underlined">{social.href}</p>
            </Link>
            <HandleCopy text={social.href} />
          </div>
        ))}
      </div>
    </LandingHero>
  )
}

export default page
