"use client"

import { useEffect, useState } from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import {
  City,
  Country,
  ICity,
  ICountry,
  IState,
  State,
} from "country-state-city"
import { Check } from "lucide-react"
import { useForm } from "react-hook-form"
import Select from "react-select"
import * as z from "zod"

import { useHandleScroll } from "@/lib/useHandleScroll"
import { multiStepHooksType } from "@/lib/useMultiStepForm"
import {
  OnboardingType,
  callOnce,
  emptyCity,
  emptyState,
  selectClassNames,
} from "@/lib/utils"
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

export default function CountryStateCityForm({
  updateFields,
  getHooks,
  form,
  formSchema,
  data,
  name,
  value,
}: {
  name: "country" | "state" | "city"
  getHooks: () => multiStepHooksType
  updateFields: (fields: Partial<OnboardingType>) => void
  form: ReturnType<typeof useForm<Partial<OnboardingType>>>
  formSchema: z.ZodObject<any, any, any>
  data: OnboardingType
  value: "ICountry" | "IState" | "ICity"
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
  const [selectedCSCData, setSelectedCSCData] = useState<
    ICountry | IState | ICity | null
  >(data[value])
  const options = {
    country: Country.getAllCountries(),
    state: State.getStatesOfCountry(data.ICountry?.isoCode).length
      ? State.getStatesOfCountry(data.ICountry?.isoCode)
      : [emptyState],
    city: City.getCitiesOfState(
      data.IState?.countryCode || "",
      data.IState?.isoCode || ""
    ).length
      ? City.getCitiesOfState(
          data.IState?.countryCode || "",
          data.IState?.isoCode || ""
        )
      : [emptyCity],
  }
  const { isSubmitting, isValid } = form.formState

  const [enterDelay, setEnterDelay] = useState(!isFirstStep)
  useEffect(() => {
    callOnce(() => setTimeout(() => setEnterDelay(false), 300), 1000)()
    if (options[name][0].name === "None") {
      setSelectedCSCData(options[name][0])
      if (data[name] !== "None")
        callOnce(() => setTimeout(scrollDown, 100), 100)()
    }
  }, [])

  useEffect(() => {
    form.setValue(name, selectedCSCData ? selectedCSCData.name : "")
  }, [form, name, selectedCSCData])

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
    updateFields({ ...values, [value]: selectedCSCData })

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
      if (isValid) setValidIndex(currentStepIndex)
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
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="max-w-4xl space-y-8"
        >
          <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="form_heading capitalize">
                  {name}
                </FormLabel>
                <FormControl>
                  {!enterDelay && (
                    <Select
                      unstyled
                      classNames={selectClassNames}
                      className="form_select"
                      options={options[name]}
                      getOptionLabel={(options) => {
                        return options["name"]
                      }}
                      getOptionValue={(options) => {
                        return options["name"]
                      }}
                      value={selectedCSCData}
                      onChange={(item) => {
                        setSelectedCSCData(item)
                      }}
                      autoFocus
                    />
                  )}
                </FormControl>
                <FormDescription>Select your {name}.</FormDescription>
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
