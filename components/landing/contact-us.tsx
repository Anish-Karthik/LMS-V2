import React from "react"
import Image from "next/image"
import Link from "next/link"
import { Phone } from "lucide-react"

import { socials } from "@/lib/socials"
import { cn } from "@/lib/utils"

const ContactUs = ({ className }: { className?: string }) => {
  return (
    <footer
      id="contact"
      className={cn(
        "footer z-10 mt-12 flex w-full flex-col border border-x-transparent border-t-[#33353F] text-background-color",
        className
      )}
    >
      <div className="container flex justify-between gap-2 py-6 sm:px-12">
        <Link
          href={"/"}
          className="flex items-center text-2xl font-semibold text-background-color md:text-5xl"
        >
          <Image
            src="/images/logo.png"
            className="rounded-full zoom-in-75"
            width={50}
            height={50}
            alt="logo"
          />
        </Link>
        <div className="socials flex flex-row items-center justify-evenly gap-2 sm:ml-[5.5rem]">
          {socials.map((social, index) => (
            <Link href={social.href} key={index} className="flex items-center">
              <social.icon width={30} />
            </Link>
          ))}
        </div>

        <p className="flex items-center text-slate-600">All rights reserved.</p>
      </div>
      {/* <div className="container mt-[-2rem] pb-10 sm:px-12 flex items-center justify-evenly gap-2">
          <p className="text-white text-sm ">
            Made with ❤️ by Anish Karthik
          </p>
      </div> */}
    </footer>
  )
}

export default ContactUs
