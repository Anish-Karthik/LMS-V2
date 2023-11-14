"use client"

import { useEffect } from "react"
import {
  City,
  Country,
  ICity,
  ICountry,
  IState,
  State,
} from "country-state-city"
import { useForm } from "react-hook-form"
import Select from "react-select"

import { cn } from "@/lib/utils"
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { ProfileFormValues } from "./profile-form"

export const selectClassNames = {
  container: () =>
    "bg-background border-2 border-secondary border-solid rounded-md text-primary",
  control: () => "pl-2",
  menuList: () =>
    "bg-background z-20 border-2 border-gray border-solid rounded-md",
  option: (state: any) =>
    cn(
      "bg-background p-1",
      state.isSelected && "!bg-foreground font-bold !text-black",
      state.isFocused && "bg-slate-400 font-bold !text-black"
    ),
  indicatorSeparator: () => "bg-slate-800 mr-2 my-2",
  dropdownIndicator: () => "text-slate-800 pr-2",
}
export const emptyState: IState = {
  name: "None",
  isoCode: "",
  countryCode: "",
}
export const emptyCity: ICity = {
  name: "None",
  stateCode: "",
  countryCode: "",
}

export function CountryStateCityForm({
  form,
  selectedCountry,
  selectedState,
  selectedCity,
  setSelectedCountry,
  setSelectedState,
  setSelectedCity,
}: {
  selectedCountry: ICountry | null
  selectedState: IState | null
  selectedCity: ICity | null
  setSelectedCountry: React.Dispatch<React.SetStateAction<ICountry | null>>
  setSelectedState: React.Dispatch<React.SetStateAction<IState | null>>
  setSelectedCity: React.Dispatch<React.SetStateAction<ICity | null>>
  form: ReturnType<typeof useForm<ProfileFormValues>>
}) {
  const countryData = Country.getAllCountries()
  useEffect(() => {
    if (!selectedCountry) return
    setSelectedState(
      State?.getStatesOfCountry(selectedCountry?.isoCode || "")[0]
        ? null
        : emptyState
    )
  }, [selectedCountry, setSelectedState])
  useEffect(() => {
    if (!selectedState) return
    setSelectedCity(
      City.getCitiesOfState(
        selectedState?.countryCode || "",
        selectedState?.isoCode || ""
      )[0]
        ? null
        : emptyCity
    )
  }, [selectedState, setSelectedCity])
  return (
    <div className="flex flex-col gap-2">
      <FormField
        control={form.control}
        name="country"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Country</FormLabel>
            <FormControl>
              <Select
                unstyled
                classNames={selectClassNames}
                options={Country.getAllCountries()}
                getOptionLabel={(options) => {
                  return options["name"]
                }}
                getOptionValue={(options) => {
                  return options["name"]
                }}
                value={selectedCountry}
                onChange={(item) => {
                  setSelectedCountry(item)
                }}
              />
            </FormControl>
            <FormDescription>Select your Country.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="state"
        render={({ field }) => (
          <FormItem>
            <FormLabel>State</FormLabel>
            <FormControl>
              <Select
                unstyled
                classNames={selectClassNames}
                options={State?.getStatesOfCountry(selectedCountry?.isoCode)}
                getOptionLabel={(options) => {
                  return options["name"]
                }}
                getOptionValue={(options) => {
                  return options["name"]
                }}
                value={selectedState}
                onChange={(item) => {
                  setSelectedState(item)
                }}
              />
            </FormControl>
            <FormDescription>Select your State.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="city"
        render={({ field }) => (
          <FormItem>
            <FormLabel>City</FormLabel>
            <FormControl>
              <Select
                unstyled
                classNames={selectClassNames}
                options={City.getCitiesOfState(
                  selectedState?.countryCode || "",
                  selectedState?.isoCode || ""
                )}
                getOptionLabel={(options) => {
                  return options["name"]
                }}
                getOptionValue={(options) => {
                  return options["name"]
                }}
                value={selectedCity}
                onChange={(item) => {
                  setSelectedCity(item)
                }}
              />
            </FormControl>
            <FormDescription>Select your City.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}
