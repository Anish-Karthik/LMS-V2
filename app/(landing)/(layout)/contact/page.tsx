"use client"

import Link from "next/link"

import { socials } from "@/lib/socials"
import { BackgroundBeams } from "@/components/animation/background-beams"
import { TypewriterEffectSmooth } from "@/components/animation/typewriter-effect"
// import ContactForm from "@/components/form/ContactForm"
import ContactUs from "@/app/(landing)/_components/landing/contact-us"

import ContactForm from "../../_components/landing/sample"

const title = "Get In Touch"
const image = "/landing/about.png"

const words = [
  {
    text: "Contact",
    className:
      "rounded-md bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent",
  },
  {
    text: "Us",
    className:
      "rounded-md bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent",
  },
]

const page = () => {
  return (
    <section className="mt-20 h-full w-full bg-black">
      <BackgroundBeams />
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ flex: 1 }}>
          <div
            className="bl"
            style={{
              paddingLeft: "3rem",
              marginTop: "50px",
              marginLeft: "50px",
              height: "400px",
              width: "500px",
            }}
          >
            <TypewriterEffectSmooth words={words} className="ml-16" />
            <ContactForm />
            {/* <ContactForm /> */}
          </div>
        </div>
        <ContactUs className="z-40 lg:fixed lg:inset-x-0 lg:-bottom-1" />
      </div>
    </section>
    // <section className="h-full w-full bg-black">
    //   {/* <div
    //     className="fixed bottom-[-130%] left-[10%] mx-auto h-[80rem] w-[80rem] rounded-full bg-gradient-to-br"
    //     style={{
    //       background:
    //         "radial-gradient(closest-side, #fff 40%, hsl(263 76.2 53.9))",
    //       filter: "blur(80px)",
    //     }}
    //   ></div> */}
    //   <div className="!text-pink-color relative z-40 flex h-full w-full max-w-2xl flex-col justify-between pt-40">
    //     <div className="flex h-full w-full flex-col px-4 lg:ml-24">
    //       <div className="socials flex max-w-lg justify-start gap-4">
    //         {socials.map((social, index) =>
    //           ["Mail Me", "Phone"].includes(social.title) ? null : (
    //             <div className="flex justify-between" key={index}>
    //               <Link
    //                 href={social.href}
    //                 key={index}
    //                 target="_blank"
    //                 className="flex items-center gap-2 "
    //               >
    //                 <social.icon width={40} height={40} />
    //                 {/* <p className="text-underlined">{social.href}</p> */}
    //               </Link>
    //               {/* <HandleCopy text={social.href} /> */}
    //             </div>
    //           )
    //         )}
    //       </div>
    //       <div className="flex flex-col gap-3 py-3 pl-3">
    //         {socials.map((social, index) =>
    //           !["Mail Me", "Phone"].includes(social.title) ? null : (
    //             <div className="flex justify-between" key={index}>
    //               <Link
    //                 href={social.href}
    //                 key={index}
    //                 target="_blank"
    //                 className="flex items-center gap-2 "
    //               >
    //                 <social.icon width={40} height={40} />
    //                 <p className="text-underlined hover:text-blue-500">
    //                   {social.href}
    //                 </p>
    //               </Link>
    //               {/* <HandleCopy text={social.href} /> */}
    //             </div>
    //           )
    //         )}
    //       </div>
    //       <ContactForm className="pl-3" />
    //     </div>
    //     <ContactUs className="z-40 lg:fixed lg:inset-x-0 lg:-bottom-1" />
    //   </div>
    // </section>
  )
}

export default page
