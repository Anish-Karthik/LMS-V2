import Link from "next/link"

import { socials } from "@/lib/socials"
import ContactForm from "@/components/form/ContactForm"
import ContactUs from "@/components/landing/contact-us"
import { LandingHero } from "@/components/shared/LandingHero"

import HandleCopy from "./handle-copy"

const title = "Get In Touch"
const image = "/landing/about.png"

const page = () => {
  return (
    <section className="h-full w-full bg-black">
      <div
        className="fixed bottom-[-130%] left-[10%] mx-auto h-[80rem] w-[80rem] rounded-full bg-gradient-to-br"
        style={{
          background:
            "radial-gradient(closest-side, #fff 40%, hsl(263 76.2 53.9))",
          filter: "blur(80px)",
        }}
      ></div>
      <LandingHero
        title={title}
        description={""}
        image={image}
        className="relative z-40 pt-40 lg:py-20"
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
      <ContactUs className="z-40 lg:fixed lg:inset-x-0 lg:-bottom-1" />
    </section>
  )
}

export default page
