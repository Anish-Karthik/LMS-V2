import Image from "next/image"
import Link from "next/link"
import { Copy } from "lucide-react"
import { toast } from "react-hot-toast"

import { socials } from "@/lib/socials"
import ContactUs from "@/components/landing/contact-us"
import LandingNavbar from "@/components/shared/LandingNavbar"

import HandleCopy from "./handle-copy"

const page = () => {
  return (
    <div className="max-h-full bg-primary-color py-16">
      <div className="max-6xl mx-16 bg-primary-color">
        <div className="flex w-full items-center gap-4 lg:grid  lg:grid-cols-2">
          <div className="flex !h-full flex-1 text-background">
            <div className="!py-auto !my-auto flex flex-col items-center gap-2">
              <h1 className="px-20 pt-8 text-2xl font-extrabold xs:text-3xl sm:text-4xl">
                Get In touch
              </h1>
              <div className="socials flex flex-col justify-evenly gap-2 pb-8 sm:ml-[5.5rem]">
                {socials.map((social, index) => (
                  <div className="flex justify-between">
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
            </div>
          </div>
          <div className="flex-1 max-lg:hidden">
            <Image
              src="/landing/about.png"
              alt="about author"
              width={850}
              height={850}
            />
          </div>
        </div>
      </div>
      <ContactUs className="fixed inset-x-0 -bottom-1 bg-secondary-color" />
    </div>
  )
}

export default page
