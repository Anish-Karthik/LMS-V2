import Link from "next/link"

import { socials } from "@/lib/socials"
import ContactForm from "@/components/form/ContactForm"
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
      className="bg-text-primary text-background lg:py-20"
    >
      <div className="socials flex justify-evenly gap-2">
        {socials.map((social, index) =>
          ["Mail Me", "Phone"].includes(social.title) ? null : (
            <div className="flex justify-between" key={index}>
              <Link
                href={social.href}
                key={index}
                target="_blank"
                className="flex items-center gap-2 text-tertiary-color"
              >
                <social.icon width={40} height={40} />
                {/* <p className="text-underlined">{social.href}</p> */}
              </Link>
              {/* <HandleCopy text={social.href} /> */}
            </div>
          )
        )}
      </div>
      <div>
        {socials.map((social, index) =>
          !["Mail Me", "Phone"].includes(social.title) ? null : (
            <div className="flex justify-between" key={index}>
              <Link
                href={social.href}
                key={index}
                target="_blank"
                className="flex items-center gap-2 text-tertiary-color"
              >
                <social.icon width={40} height={40} />
                <p className="text-underlined hover:text-blue-500">
                  {social.href}
                </p>
              </Link>
              {/* <HandleCopy text={social.href} /> */}
            </div>
          )
        )}
      </div>
      <ContactForm />
    </LandingHero>
  )
}

export default page
