"use client"

import React from "react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import ButtonCard from "./button-card"

const faq1 = [
  {
    question: "Is it accessible?",
    answer: "Yes. It adheres to the WAI-ARIA design pattern.",
  },
  {
    question: "Is it styled?",
    answer:
      "Yes. It comes with default styles that matches the other components' aesthetic.",
  },
  {
    question: "Is it animated?",
    answer:
      "Yes. It's animated by default, but you can disable it if you prefer.",
  },
]

const faq2 = [
  {
    question: "Is it accessible?",
    answer: "Yes. It adheres to the WAI-ARIA design pattern.",
  },
  {
    question: "Is it styled?",
    answer:
      "Yes. It comes with default styles that matches the other components' aesthetic.",
  },
  {
    question: "Is it animated?",
    answer:
      "Yes. It's animated by default, but you can disable it if you prefer.",
  },
]

const FAQSection = () => {
  return (
    <div className="w-full max-w-6xl">
      <div className="mb-12">
        <center>
          <h1 className="mb-6 text-4xl font-bold">
            Frequently Asked Questions
          </h1>
        </center>
      </div>
      <div className="flex gap-5">
        <Accordion
          type="single"
          collapsible
          className="flex w-full flex-col gap-2"
        >
          {faq1.map((item, index) => (
            <AccordionItem key={index} value={item.answer}>
              <AccordionTrigger className="w-full">
                <div className="flex w-full items-center justify-between">
                  <h3 className="text-2xl font-semibold">{item.question}</h3>
                </div>
              </AccordionTrigger>
              <AccordionContent className="w-full">
                <p className="text-xl">{item.answer}</p>
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
                  <h3 className="text-2xl font-semibold">{item.question}</h3>
                </div>
              </AccordionTrigger>
              <AccordionContent className="w-full">
                <p className="text-xl">{item.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      <center>
        <div className="mt-14">
          <ButtonCard
            scrollTo="#course-purchase"
            text="My question is answered! Take me to the pricing section!"
          />
        </div>
      </center>
    </div>
  )
}

export default FAQSection
