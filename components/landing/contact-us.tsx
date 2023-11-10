import React from "react"
import Image from "next/image"
import Link from "next/link"
import EmailIcon from "@/public/email-icon.svg"
import GithubIcon from "@/public/github-icon.svg"
import LinkedinIcon from "@/public/linkedin-icon.svg"
import TwitterIcon from "@/public/twitter-icon.svg"

import { cn } from "@/lib/utils"

const socials = [
  {
    title: "Linkedin",
    href: "https://www.linkedin.com/in/anish-karthik/",
    icon: LinkedinIcon,
    alt: "Linkedin Icon",
    style: "",
  },
  {
    title: "Github",
    href: "https://github.com/Anish-Karthik",
    icon: GithubIcon,
    alt: "Github Icon",
    style: "",
  },
  {
    title: "Mail Me",
    href: "mailto: anishkarthik.54321@gmail.com",
    icon: EmailIcon,
    alt: "Email Icon",
    style: "px-1",
  },
  {
    title: "Twitter",
    href: "https://twitter.com/Anish_Karthik_A",
    icon: TwitterIcon,
    alt: "Twitter Icon",
    style: "px-1",
  },
]

const ContactUs = () => {
  return (
    <footer
      id="contact"
      className="footer z-10 mt-12 flex w-full flex-col border border-x-transparent border-t-[#33353F] text-white"
    >
      <div className="container flex justify-between gap-2 py-12 sm:px-12">
        <Link
          href={"/"}
          className="flex items-center text-2xl font-semibold text-white md:text-5xl"
        >
          <Image
            src="/images/logo.png"
            className="rounded-full zoom-in-75"
            width={50}
            height={50}
            alt="logo"
          />
        </Link>
        <div className="socials flex flex-row justify-evenly gap-2 sm:ml-[5.5rem]">
          {socials.map((social, index) => (
            <Link
              href={social.href}
              key={index}
              className={cn("flex ", social.style)}
            >
              <Image src={social.icon} alt={social.alt} />
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
