import Image from "next/image"
import Link from "next/link"

import { socials } from "@/lib/socials"
import { cn } from "@/lib/utils"

const ContactUs = ({ className }: { className?: string }) => {
  console.log(socials)
  return (
    <footer
      id="contact"
      className={cn(
        "footer text-background-color z-10 mt-12 flex w-full flex-col border-t border-x-transparent border-t-[#33353F]",
        className
      )}
    >
      <div className="container flex justify-between gap-2 py-6 sm:px-12">
        <Link
          href={"/"}
          className="text-background-color flex items-center text-2xl font-semibold md:text-5xl"
        >
          <Image
            src="/images/logo2.jpg"
            className="zoom-in-75 rounded-full"
            width={50}
            height={50}
            alt="logo"
          />
        </Link>
        <div className="socials flex flex-row items-center justify-evenly gap-2 sm:ml-[5.5rem]">
          {/* <AnimatedTooltip /> */}
          {/* {socials.map((social, index) => (
            <Link href={social.href} key={index} className="flex items-center">
              <social.icon width={30} />
            </Link>
          ))} */}
        </div>
        {/* <Link href={"/policies"} className="flex items-center text-slate-500 underline-offset-2 underline hover:text-slate-300">
          Terms & Conditions
        </Link> */}
        <p className="flex items-center text-slate-500">All rights reserved.</p>
      </div>
    </footer>
  )
}

export default ContactUs
