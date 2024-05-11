"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import classNames from "classnames"
import { Check } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { z } from "zod"

import { getCoursesClient } from "@/lib/actions/server/course.server.action"
import styles from "@/lib/styles.module.css"
import { useHandleScroll } from "@/lib/useHandleScroll"
import { multiStepHooksType } from "@/lib/useMultiStepForm"
import { ObjectType, OnboardingType, callOnce, cn } from "@/lib/utils"
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
import { trpc } from "@/app/_trpc/client"

import { DropdownSelectOption } from "./dropdown-select-option/DropdownSelectOption"
import { DropdownSelect } from "./dropdown-select/DropdownSelect"
import { Question } from "./question"

const SelectForm = ({
  updateFields,
  getHooks,
  form,
  formSchema,
  data,
  name,
  options,
  promo,
}: {
  getHooks: () => multiStepHooksType
  updateFields: (fields: Partial<OnboardingType>) => void
  form: ReturnType<typeof useForm<Partial<OnboardingType>>>
  formSchema: z.ZodObject<any, any, any>
  data: OnboardingType
  name: "gender" | "howDidHear"
  options: ObjectType
  promo?: string
}) => {
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
  const [isGoingNext, setIsGoingNext] = useState(false)
  const [prevValue, setPrevValue] = useState<number>(prev)
  const [selectedData, setSelectedData] = useState<string>(data[name])
  const router = useRouter()!
  const searchParams = useSearchParams()!
  const params = useParams()
  const createUser = trpc.user.create.useMutation()
  const { isSubmitting, isValid } = form.formState
  useEffect(() => {
    form.setValue(name, selectedData || "")
  }, [form, selectedData, setSelectedData])

  function scrollDown() {
    form.handleSubmit(onSubmit)()
  }

  function scrollUp() {
    if (isFirstStep || now == 0) return
    setPrevValue(() => now + 1)
    setIsGoingBack(() => true)
  }
  function handleDropdownOptionClick(val: string) {
    setSelectedData(val)
    setIsGoingNext(true)
  }

  // handle next
  async function onSubmit(values: z.infer<typeof formSchema>) {
    updateFields({ ...values })
    const searchParamsPromo = searchParams.get("promo")
      ? `promo=${searchParams.get("promo")}`
      : ""
    const searchParamsInvite = searchParams.get("invite")
      ? `invite=${searchParams.get("invite")}`
      : ""
    const searchParamsUrl = `${searchParamsPromo}&${searchParamsInvite}`
    console.log(searchParamsUrl)
    if (!isLastStep) {
      console.log("next step", getFirstInvalidStep())
      if (
        getFirstInvalidStep() !== steps.length &&
        getFirstInvalidStep() !== currentStepIndex
      )
        goTo(getFirstInvalidStep())
      else next()
    } else {
      try {
        await createUser.mutateAsync({
          ...data,
          ...values,
          dob: new Date(data.dob),
        })
        const course = await getCoursesClient()
        setValidIndex(currentStepIndex)
        toast.success("Form submitted")
        if (!course || !course.length) throw new Error("No courses found")
        router.push(`/purchase/${course[0].id}?${searchParamsUrl}`)
      } catch (error) {
        toast.error("Some Error occurred, try filling again")
        console.log(error)
        router.push(`/onboarding?${searchParamsUrl}`)
      }
      // alert("form submitted")
    }
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

  useEffect(() => {
    if (isGoingNext) {
      setIsGoingNext(false)
      callOnce(() => setTimeout(scrollDown, 500), 1000)()
    }
  }, [isGoingNext, prevValue])
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
            name={name}
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="form_heading capitalize">
                  {name}
                </FormLabel>
                <FormControl className="relative text-4xl">
                  <div>
                    {isSubmitting && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                        <div className="h-32 w-32 animate-spin rounded-full border-y-2 border-red-500"></div>
                      </div>
                    )}
                    <DropdownSelect className={styles["role-dropdown"]}>
                      <div className="w-full md:w-[45rem]">
                        {Object.keys(options).map((optionKey) => {
                          const _role = options[optionKey]

                          return (
                            <DropdownSelectOption
                              key={optionKey}
                              className={cn(
                                styles["role-option"],
                                "!bg-slate-400 "
                              )}
                              onClick={() => handleDropdownOptionClick(_role)}
                              isSelected={_role === selectedData}
                            >
                              <span
                                className={cn(
                                  classNames({
                                    [styles["selected"]]:
                                      _role === selectedData,
                                  }),
                                  "border-2 border-red-800"
                                )}
                              >
                                {optionKey}
                              </span>
                              {_role}
                            </DropdownSelectOption>
                          )
                        })}
                      </div>
                    </DropdownSelect>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-4">
            {/* {!isFirstStep && <Button onClick={scrollUp} type="button" className="form_button">Back</Button>} */}
            {isLastStep && (
              <Button
                type="submit"
                className="form_button"
                disabled={isSubmitting}
              >
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

export default SelectForm
