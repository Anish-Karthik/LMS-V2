"use client"

import { useEffect, useState } from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Check } from "lucide-react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { useHandleScroll } from "@/lib/useHandleScroll"
import { multiStepHooksType } from "@/lib/useMultiStepForm"
import { OnboardingType, callOnce } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Question } from "./question"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Get Details form",
}

export default function GenericForm({
  name,
  updateFields,
  getHooks,
  form,
  formHead,
  formSchema,
  type = "text",
  selectOptions,
  title,
}: {
  name:
    | "name"
    | "email"
    | "phoneNo"
    | "dob"
    | "gender"
    | "employmentStatus"
    | "howDidHear"
  getHooks: () => multiStepHooksType
  updateFields: (fields: Partial<OnboardingType>) => void
  form: ReturnType<typeof useForm<Partial<OnboardingType>>>
  formSchema: z.ZodObject<any, any, any>
  type?: string
  selectOptions?: string[]
  formHead?: string
  title?: string
}) {
  const {
    steps,
    currentStepIndex,
    step,
    isFirstStep,
    isLastStep,
    back,
    next,
    goTo,
    getFirstInvalidStep,
    setValidIndex,
    validCountArr,
    prev,
  } = getHooks()
  useHandleScroll(scrollDown, back)
  const now = currentStepIndex
  const [isGoingBack, setIsGoingBack] = useState(false)
  const [prevValue, setPrevValue] = useState<number>(prev)
  const [enterDelay, setEnterDelay] = useState(!isFirstStep)
  const { isSubmitting, isValid } = form.formState

  function scrollDown() {
    form.handleSubmit(onSubmit)()
  }

  function scrollUp() {
    if (isFirstStep || now == 0) return
    setPrevValue(() => now + 1)
    setIsGoingBack(() => true)
  }
  useEffect(() => {
    callOnce(() => setTimeout(() => setEnterDelay(false), 300), 1000)()
  }, [])

  // handle next
  async function onSubmit(values: z.infer<typeof formSchema>) {
    updateFields({ ...values })
    if (!isLastStep) {
      console.log("next step", getFirstInvalidStep())
      // if(getFirstInvalidStep() !== steps.length && getFirstInvalidStep() !== currentStepIndex) goTo(getFirstInvalidStep())
      // else
      next()
    } else {
      console.log("form submitted")
      alert("form submitted")
    }
    console.log(values)
  }
  useEffect(() => {
    if (isValid) {
      setValidIndex(currentStepIndex)
    } else {
      setValidIndex(currentStepIndex, 0)
    }
  }, [isValid])

  // handle back
  useEffect(() => {
    if (isGoingBack) {
      setIsGoingBack(false)
      callOnce(() => setTimeout(back, 200), 1000)()
    }
  }, [back, isGoingBack, prevValue])

  // console.log("prev", prev, "now", now)
  // console.log("prevValue", prevValue)
  // console.log("isGoingBack", isGoingBack)
  return (
    <Question
      outView={false}
      outViewSlide={prevValue < now ? "up" : "down"}
      inView={true}
      inViewSlide={prev == -1 ? "" : prev < now ? "up" : "down"}
    >
      <FormBodyComponent
        name={name}
        form={form}
        formHead={formHead}
        formSchema={formSchema}
        type={type}
        title={title}
        selectOptions={selectOptions}
        isFirstStep={isFirstStep}
        isLastStep={isLastStep}
        back={scrollUp}
        onSubmit={onSubmit}
        enterDelay={enterDelay}
      />
    </Question>
  )
}

function FormBodyComponent({
  name,
  form,
  formSchema,
  type = "text",
  selectOptions,
  isFirstStep,
  isLastStep,
  formHead,
  back,
  onSubmit,
  enterDelay,
  title,
}: {
  name:
    | "name"
    | "email"
    | "phoneNo"
    | "dob"
    | "gender"
    | "employmentStatus"
    | "howDidHear"
  form: ReturnType<typeof useForm<Partial<OnboardingType>>>
  formSchema: z.ZodObject<any, any, any>
  type?: string
  selectOptions?: string[]
  isFirstStep: boolean
  isLastStep: boolean
  back: () => void
  onSubmit: (values: z.infer<typeof formSchema>) => void
  formHead?: string
  enterDelay: boolean
  title?: string
}) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name={name}
          render={({ field }) => (
            <FormItem className="!text-4xl">
              <FormLabel className="form_heading capitalize">
                {formHead || name}
              </FormLabel>
              <FormControl>
                {type !== "select" ? (
                  !enterDelay && (
                    <Input
                      className="no-focus form_input"
                      type={type}
                      placeholder={`Enter your ${title || name}`}
                      {...field}
                      autoFocus
                    />
                  )
                ) : (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder={`Select ${name}`} />
                    </SelectTrigger>
                    <SelectContent>
                      {selectOptions?.map((option) => (
                        <SelectItem
                          key={option}
                          value={option}
                          className="capitalize"
                        >
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </FormControl>

              <FormMessage className="form_message" />
            </FormItem>
          )}
        />
        <div className="flex gap-4">
          {/* {!isFirstStep && <Button onClick={back} type="button" className="form_button">Back</Button>} */}
          {isLastStep && (
            <Button type="submit" className="form_button">
              Submit
            </Button>
          )}
          {!isLastStep && (
            <Button
              type="submit"
              className="form_button flex items-center gap-1"
            >
              <>OK</> <Check />{" "}
            </Button>
          )}
        </div>
      </form>
    </Form>
  )
}
