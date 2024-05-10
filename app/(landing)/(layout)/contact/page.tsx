import Link from "next/link"
import { LocationCity } from "@mui/icons-material"
import { LocateIcon, MailIcon, Map, PhoneIcon } from "lucide-react"

import { BackgroundBeams } from "@/components/animation/background-beams"
import { TypewriterEffectSmooth } from "@/components/animation/typewriter-effect"
// import ContactForm from "@/components/form/ContactForm"
import ContactUs from "@/app/(landing)/_components/landing/contact-us"

import ContactForm from "../../_components/landing/sample"
import HandleCopy from "./handle-copy"

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
      <div className="flex flex-col items-center bg-black">
        <div className="flex flex-wrap justify-evenly gap-7">
          <div
            className="w-[500px] md:m-auto"
            // style={{
            //   paddingLeft: "3rem",
            //   marginTop: "50px",
            //   marginLeft: "50px",
            //   height: "400px",
            //   width: "500px",
            //   margin: "auto",
            // }}
          >
            <TypewriterEffectSmooth
              words={words}
              className="ml-16 max-md:ml-40 max-md:scale-150"
            />
            <ContactForm />
            {/* <ContactForm /> */}
          </div>
          <section className="bg-purple-color/10 z-50 h-fit rounded-lg pr-3 max-md:w-96 md:mt-28">
            <div className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
              <div className="flex flex-col gap-3 py-3 pl-3">
                {/* heading contact Details */}
                <h1 className="text-3xl font-bold text-pink-600 ">
                  Contact Details
                </h1>
                <div className="flex justify-between">
                  <Link
                    href={`mailto:${process.env.EMAIL}`}
                    target="_blank"
                    className="flex items-center gap-2 "
                  >
                    <MailIcon
                      width={30}
                      height={30}
                      className="text-pink-600"
                    />
                    <p className="text-underlined">{process.env.EMAIL}</p>
                  </Link>
                  {/* <HandleCopy className={"text-purple-800"} text={process.env.EMAIL!} /> */}
                </div>
                <div className="flex justify-between">
                  <Link
                    href={`tel:${process.env.PHONE}`}
                    target="_blank"
                    className="flex items-center gap-2 "
                  >
                    <PhoneIcon
                      width={30}
                      height={30}
                      className="text-pink-600"
                    />
                    <p className="text-underlined">{process.env.PHONE}</p>
                  </Link>
                  {/* <HandleCopy className={"text-purple-800"} text={process.env.PHONE!} /> */}
                </div>
                {/* 30/4, Nehru Nagar, 
Shanthi Medu, 
Coimbatore 641019 */}
                <div className="flex justify-between">
                  <Link
                    href={`https://goo.gl/maps/4Vjv8J7vZQyX3wZm6`}
                    target="_blank"
                    className="flex gap-2 "
                  >
                    <Map width={30} height={30} className="text-pink-600" />
                    <div className="">
                      <p className="text-underlined">{"30/4, Nehru Nagar,"}</p>
                      <p className="text-underlined">{"Shanthi Medu,"}</p>
                      <p className="text-underlined">{"Coimbatore 641019."}</p>
                    </div>
                  </Link>
                  {/* <HandleCopy className={"text-purple-800"}
                  text={"30/4, Nehru Nagar, Shanthi Medu, Coimbatore 641019"}
                /> */}
                </div>
              </div>
            </div>
          </section>
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
    //               {/* <HandleCopy className={"text-purple-800"} text={social.href} /> */}
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
    //               {/* <HandleCopy className={"text-purple-800"} text={social.href} /> */}
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
