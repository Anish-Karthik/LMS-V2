"use client"

import React from "react"
import { ArrowUpIcon } from "lucide-react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Meteors } from "@/components/animation/meteors"

import ButtonCard from "./button-card"

const faq1 = [
  {
    question: "Can someone with no trading experience enroll?",
    answer: `Yes, certainly! Our program caters to beginners by providing thorough explanations of every aspect of stock trading, starting from the fundamentals. You'll develop a solid foundation in stock trading. Additionally, you'll have access to expert support to address any questions or concerns you may have.`,
  },
  {
    question: "What do I need to start trading?",
    answer: `Trading has transitioned to online platforms, making it accessible to everyone. All you need is a device with reliable internet access, such as a laptop, PC, or even a mobile phone, along with a Demat account. We recommend reputable brokers like Upstox to facilitate your trading journey.`,
  },
  {
    question: "Will this training make me a good stock trader?",
    answer: `You will be learning, interacting, raising questions, trading, and having fun along with a bunch of other driven and experienced stock traders. It’s a continuous learning process. We have everything setup for you to be the best trader.`,
  },
]

const faq2 = [
  {
    question: "What are the segments covered in the program?",
    answer: `The program covers stocks markets in general and gives the complete foundations on swing trading, long term investment and intraday trading in forex. Swing trading and Long term investments are ideal for employees and Forex Intraday is recommended for students. As an indiviudual swing trader make, more return percentage than the mutual funds with confidence.`,
  },
  {
    question: "Do you offer your content in any other languages?",
    answer: `Our program currently incorporates a bilingual approach, blending instruction in both Tamil and English.`,
  },
  {
    question: "When can I start making money after the program?",
    answer: `Mastering the foundational concepts and honing them through practice in a demo account are essential steps towards becoming a successful trader. Prioritizing skill development over monetary gains is crucial, as money is merely a byproduct. Focusing on trading solely for monetary gain can pose challenges, as it may negatively impact a trader's psychology.`,
  },
]

const FAQSection = () => {
  return (
    <section
      className="text-text-primary grid items-center gap-40 bg-black py-12 max-xl:px-4"
      id="faqs"
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="relative w-full ">
          <div className="absolute inset-0 h-full w-full scale-[0.80] rounded-full bg-red-500 bg-gradient-to-r from-blue-500 to-teal-500 blur-3xl" />
          <div className="relative flex h-full flex-col items-start justify-end overflow-hidden rounded-2xl border border-gray-800 bg-gray-900 shadow-xl">
            <div className="text-text-primary mx-auto w-full  rounded-md p-6 py-20">
              <div className="mb-12">
                <center>
                  <h1 className="mb-6 text-4xl font-bold">
                    Frequently Asked Questions
                  </h1>
                </center>
              </div>
              <div className="grid w-full gap-x-3 px-3 md:grid-cols-2">
                <Accordion
                  type="single"
                  collapsible
                  className="flex w-full flex-col gap-2"
                >
                  {faq1.map((item, index) => (
                    <AccordionItem key={index} value={item.answer}>
                      <AccordionTrigger className="w-full">
                        <div className="flex w-full items-center justify-between">
                          <h3 className="text-lg font-semibold">
                            {item.question}
                          </h3>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="w-full">
                        <p className="text-base">{item.answer}</p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
                <Accordion
                  type="single"
                  collapsible
                  className="flex w-full flex-col gap-2"
                >
                  {faq2.map((item, index) => (
                    <AccordionItem key={index} value={item.answer}>
                      <AccordionTrigger className="w-full">
                        <div className="flex w-full items-center justify-between">
                          <h3 className="text-lg font-semibold">
                            {item.question}
                          </h3>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="w-full">
                        <p className="text-base">{item.answer}</p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
              <center>
                <div className="mt-14">
                  <ButtonCard
                    arrowIcon={<ArrowUpIcon width={25} />}
                    scrollTo="#purchase-details"
                    text="My question is answered! Take me to the pricing section!"
                  />
                </div>
              </center>
            </div>
            <Meteors number={25} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default FAQSection
