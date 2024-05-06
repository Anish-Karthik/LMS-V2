"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import toast from "react-hot-toast"

import { sendmail } from "@/lib/mailing/mailer"
import { TypewriterEffectSmooth } from "@/components/animation/typewriter-effect"

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

const ContactForm: React.FC = () => {
  const [data, setData] = useState<{
    name: string
    email: string
    message: string
  }>({
    name: "",
    email: "",
    message: "",
  })
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      await sendmail({
        to: [process.env.EMAIL!],
        subject: "Contact Us",
        from: data.email,
        text: `${data.name} has sent you a message: \n\n ${data.message} \n\n You can reply to them at ${data.email}`,
      })
      toast.success("Mailed sent successfully")
    } catch (error) {
      setData({
        name: "",
        email: "",
        message: "",
      })
    }
    console.log("Form submitted")
  }

  const titleWords = [{ text: "Contact Us" }]

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  }

  const hoverEffect = {
    rest: { scale: 1, boxShadow: "0px 0px 0px rgba(0, 0, 0, 0)" },
    hover: {
      scale: 1.05,
      boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
      transition: { duration: 0.3 },
    },
  }

  return (
    <motion.div
      className="relative flex items-center justify-center"
      variants={hoverEffect}
      initial="rest"
      whileHover="hover"
    >
      <motion.div
        className="relative z-10 rounded-lg bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 p-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="p-4">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            {/* <Typewriter words={titleWords} cursorClassName={undefined} /> */}
            <div className="flex flex-col gap-2">
              <input
                required
                placeholder="Your Name"
                className="rounded-md border-2 border-gray-300 bg-transparent p-2 text-white transition-colors duration-300 placeholder:text-gray-300 focus:border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
                type="text"
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
              />
            </div>
            <div className="flex flex-col gap-2">
              <input
                required
                placeholder="Your Email"
                className="rounded-md border-2 border-gray-300 bg-transparent p-2 text-white transition-colors duration-300 placeholder:text-gray-300 focus:border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
                type="email"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
              />
            </div>
            <div className="flex flex-col gap-2">
              <textarea
                required
                placeholder="Your Message"
                className="rounded-md border-2 border-gray-300 bg-transparent p-2 text-white transition-colors duration-300 placeholder:text-gray-300 focus:border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
                cols={30}
                rows={5}
                value={data.message}
                onChange={(e) => setData({ ...data, message: e.target.value })}
              ></textarea>
            </div>
            <button
              className="mt-4 rounded-md border border-transparent bg-gradient-to-r from-pink-400 to-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all duration-300 hover:bg-gradient-to-br focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
              type="submit"
            >
              Send Message
            </button>
          </form>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default ContactForm
