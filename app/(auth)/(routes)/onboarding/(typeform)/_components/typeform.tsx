"use client"

import { isValidElement, useState } from "react"
import Image from "next/image"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowBigRight, ArrowLeft, ArrowRight } from "lucide-react"
import { useForm } from "react-hook-form"

import {
  formSchemaCity,
  formSchemaCountry,
  formSchemaDob,
  formSchemaEmail,
  formSchemaEmploymentStatus,
  formSchemaGender,
  formSchemaHowDidHear,
  formSchemaName,
  formSchemaPhoneNo,
  formSchemaState,
} from "@/lib/schema"
import { multiStepHooksType, useMultistepForm } from "@/lib/useMultiStepForm"
import { OnboardingType } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

import CountryStateCityForm from "./country-state-city"
import EmploymentForm from "./employment-form"
import GenericForm from "./generic-form"
import SelectForm from "./select-form"

const total = 9
const TypeForm = ({
  initialData,
  promo,
}: {
  initialData: OnboardingType
  promo?: string
}) => {
  const [data, setData] = useState<OnboardingType>(initialData)
  function updateFields(fields: Partial<OnboardingType>) {
    setData((prev) => {
      return { ...prev, ...fields }
    })
  }
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
  } = useMultistepForm([
    <GenericForm
      key={0}
      getHooks={getHooks}
      formHead={"Hello, what's your name?"}
      form={useForm<Partial<OnboardingType>>({
        resolver: zodResolver(formSchemaName),
        defaultValues: {
          name: data.name,
        },
      })}
      name="name"
      formSchema={formSchemaName}
      updateFields={updateFields}
    />,
    // <GenericForm
    //   key={1}
    //   getHooks={getHooks}
    //   form={useForm<Partial<OnboardingType>>({
    //     resolver: zodResolver(formSchemaEmail),
    //     defaultValues: {
    //       email: data.email,
    //     },
    //   })}
    //   name="email"
    //   formSchema={formSchemaEmail}
    //   updateFields={updateFields}
    // />,
    <GenericForm
      key={2}
      getHooks={getHooks}
      formHead={`Hello ${data.name}, what's your Phone Number?`}
      form={useForm<Partial<OnboardingType>>({
        resolver: zodResolver(formSchemaPhoneNo),
        defaultValues: {
          phoneNo: data.phoneNo,
        },
      })}
      name="phoneNo"
      title="Phone Number"
      type="number"
      formSchema={formSchemaPhoneNo}
      updateFields={updateFields}
    />,
    <GenericForm
      key={3}
      getHooks={getHooks}
      formHead={`Hey ${data.name}, what's your Date of Birth?`}
      form={useForm<Partial<OnboardingType>>({
        resolver: zodResolver(formSchemaDob),
        defaultValues: {
          dob: data.dob,
        },
      })}
      name="dob"
      type="date"
      formSchema={formSchemaDob}
      updateFields={updateFields}
    />,
    <SelectForm
      data={data}
      key={4}
      getHooks={getHooks}
      form={useForm<Partial<OnboardingType>>({
        resolver: zodResolver(formSchemaGender),
        defaultValues: {
          gender: data.gender,
        },
      })}
      formSchema={formSchemaGender}
      name="gender"
      options={{
        A: "Male",
        B: "Female",
        C: "Prefer not to say",
      }}
      updateFields={updateFields}
    />,
    <CountryStateCityForm
      key={5}
      getHooks={getHooks}
      form={useForm<Partial<OnboardingType>>({
        resolver: zodResolver(formSchemaCountry),
        defaultValues: {
          country: data.country,
        },
      })}
      formSchema={formSchemaCountry}
      data={data}
      updateFields={updateFields}
      name="country"
      value="ICountry"
    />,
    <CountryStateCityForm
      key={6}
      getHooks={getHooks}
      form={useForm<Partial<OnboardingType>>({
        resolver: zodResolver(formSchemaState),
        defaultValues: {
          state: data.state,
        },
      })}
      formSchema={formSchemaState}
      data={data}
      updateFields={updateFields}
      name="state"
      value="IState"
    />,
    <CountryStateCityForm
      key={7}
      getHooks={getHooks}
      form={useForm<Partial<OnboardingType>>({
        resolver: zodResolver(formSchemaCity),
        defaultValues: {
          city: data.city,
        },
      })}
      formSchema={formSchemaCity}
      data={data}
      updateFields={updateFields}
      name="city"
      value="ICity"
    />,
    <EmploymentForm
      key={8}
      getHooks={getHooks}
      form={useForm<Partial<OnboardingType>>({
        resolver: zodResolver(formSchemaEmploymentStatus),
        defaultValues: {
          employmentStatus: data.employmentStatus,
        },
      })}
      formSchema={formSchemaEmploymentStatus}
      data={data}
      updateFields={updateFields}
    />,
    <SelectForm
      key={9}
      getHooks={getHooks}
      form={useForm<Partial<OnboardingType>>({
        resolver: zodResolver(formSchemaHowDidHear),
        defaultValues: {
          howDidHear: data.howDidHear,
        },
      })}
      formSchema={formSchemaHowDidHear}
      name="howDidHear"
      title="How did you hear about us?"
      options={{
        A: "Social media",
        B: "Referred by a friend",
        C: "Prefer not to say",
      }}
      updateFields={updateFields}
      data={data}
      promo={promo}
    />,
  ])
  function getHooks(): multiStepHooksType {
    return {
      steps,
      currentStepIndex,
      step,
      isFirstStep,
      isLastStep,
      goTo,
      back,
      next,
      getFirstInvalidStep,
      setValidIndex,
      validCountArr,
      prev,
    }
  }
  console.log(getFirstInvalidStep())
  console.log(currentStepIndex)
  console.log(validCountArr)
  console.log(!validCountArr[currentStepIndex])
  console.log(getFirstInvalidStep() <= currentStepIndex)
  console.log(
    isLastStep ||
      !validCountArr[currentStepIndex] ||
      getFirstInvalidStep() <= currentStepIndex
  )
  return (
    <div>
      <div className="fixed -inset-x-1 top-0">
        <Progress
          value={(validCountArr.reduce((x, sm) => x + sm) / steps.length) * 100}
          className="h-2"
        />
      </div>
      <div
        className="relative flex h-screen w-screen flex-col items-center justify-center
      "
      >
        <div className="flex w-[90vw] max-w-6xl gap-2">
          <div className="flex h-full text-2xl">
            <div className="mt-3 flex h-fit items-center">
              <>{currentStepIndex + 1}</>
              <Image
                src={"/right-arrow.svg"}
                width={25}
                height={25}
                alt="arrow"
                className="text-red"
              />
            </div>
          </div>
          <div className="w-full">{step}</div>
        </div>
        <div className="absolute left-5 top-5">
          <Button onClick={back} disabled={isFirstStep}>
            {" "}
            <ArrowLeft />{" "}
          </Button>
          <Button onClick={next} disabled={isLastStep}>
            {" "}
            <ArrowRight />{" "}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default TypeForm
