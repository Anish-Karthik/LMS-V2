"use client"

import { useEffect, useState } from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Check } from "lucide-react"
import { useForm } from "react-hook-form"
import Select from "react-select"
import * as z from "zod"

import { jobRolesObj } from "@/lib/job-role"
import { useHandleScroll } from "@/lib/useHandleScroll"
import { multiStepHooksType } from "@/lib/useMultiStepForm"
import { OnboardingType, callOnce, selectClassNames } from "@/lib/utils"
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

import { Question } from "./question"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Country, City and State form",
}

export default function EmploymentForm({
  updateFields,
  getHooks,
  form,
  formSchema,
  data,
}: {
  getHooks: () => multiStepHooksType
  updateFields: (fields: Partial<OnboardingType>) => void
  form: ReturnType<typeof useForm<Partial<OnboardingType>>>
  formSchema: z.ZodObject<any, any, any>
  data: OnboardingType
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
  const [selectedData, setSelectedData] = useState<{ name: string } | null>({
    name:
      data.employmentStatus === "" ? "Please Select..." : data.employmentStatus,
  })
  const { isSubmitting, isValid } = form.formState
  const [enterDelay, setEnterDelay] = useState(!isFirstStep)
  useEffect(() => {
    callOnce(() => setTimeout(() => setEnterDelay(false), 300), 1000)()
  }, [])

  useEffect(() => {
    form.setValue("employmentStatus", selectedData?.name || "")
  }, [form, selectedData, setSelectedData])

  function scrollDown() {
    form.handleSubmit(onSubmit)()
  }

  function scrollUp() {
    if (isFirstStep || now == 0) return
    setPrevValue(() => now + 1)
    setIsGoingBack(() => true)
  }

  // handle next
  async function onSubmit(values: z.infer<typeof formSchema>) {
    updateFields({ ...values })
    console.log("isLastStep", values)
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
      callOnce(() => setTimeout(scrollUp, 200), 1000)()
    }
  }, [scrollUp, isGoingBack, prevValue])

  return (
    <Question
      outView={false}
      outViewSlide={prevValue < now ? "up" : "down"}
      inView={true}
      inViewSlide={prev == -1 ? "" : prev < now ? "up" : "down"}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="employmentStatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="form_heading capitalize">
                  {"Employment Status"}
                </FormLabel>
                <FormControl>
                  {!enterDelay && (
                    <div className="relative ">
                      {/* {(!selectedData || selectedData.name === "") && <div className="absolute inset-0 top-2 left-2 ">
                        Select your status
                      </div>} */}
                      <Select
                        unstyled
                        classNames={selectClassNames}
                        className="form_select bg-transparent"
                        options={jobRolesObj}
                        getOptionLabel={(options) => {
                          return options["name"]
                        }}
                        getOptionValue={(options) => {
                          return options["name"]
                        }}
                        placeholder="Select your EmploymentStatus"
                        value={selectedData}
                        defaultValue={{ name: "Select your EmploymentStatus" }}
                        onChange={(item) => {
                          setSelectedData(item)
                        }}
                        autoFocus
                      />
                    </div>
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-4">
            {/* {!isFirstStep && <Button onClick={scrollUp} type="button" className="form_button">Back</Button>} */}
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
    </Question>
  )
}
