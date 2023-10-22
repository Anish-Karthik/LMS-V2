"use client"

import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { User } from "@prisma/client"
import { ICity, ICountry, IState } from "country-state-city"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { useUploadThing } from "@/lib/uploadthing"
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
import { toast } from "@/components/ui/use-toast"
import { CustomProfilePhoto } from "@/components/form-fields"

import { CountryStateCityForm } from "./country-state-city-select"

const profileFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    }),
  dob: z.date(),
  phoneNo: z.string().min(10).max(10),
  image: z.string().url(),
  city: z.string().min(1, { message: "city name can't be empty" }),
  country: z.string().min(1, { message: "country name can't be empty" }),
  state: z.string().min(1, { message: "state name can't be empty" }),
  gender: z.string().min(1, { message: "gender can't be empty" }),
})

export type ProfileFormValues = z.infer<typeof profileFormSchema>

export function ProfileForm({ userInfo }: { userInfo: User }) {
  const [selectedCountry, setSelectedCountry] = useState<ICountry | null>(null)
  const [selectedState, setSelectedState] = useState<IState | null>(null)
  const [selectedCity, setSelectedCity] = useState<ICity | null>(null)
  const [files, setFiles] = useState<File[]>([])
  const { startUpload } = useUploadThing("media")

  const defaultValues: Partial<ProfileFormValues> = {
    name: userInfo.name,
    dob: userInfo.dob || new Date(),
    phoneNo: userInfo.phoneNo || "",
    image: userInfo.image || "",
    city: userInfo.city || "",
    country: userInfo.country || "",
    state: userInfo.state || "",
    gender: userInfo.gender || "",
  }
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  })
  useEffect(() => {
    form.setValue("country", selectedCountry?.name || "")
  }, [form, selectedCountry])
  useEffect(() => {
    form.setValue("state", selectedState?.name || "")
  }, [form, selectedState])
  useEffect(() => {
    form.setValue("city", selectedCity?.name || "")
  }, [form, selectedCity])

  function handleImageChange(
    e: React.ChangeEvent<HTMLInputElement>,
    onChange: (value: string) => void
  ) {
    e.preventDefault()
    const fileReader = new FileReader()

    if (e.target?.files && e.target.files.length > 0) {
      const file = e.target?.files[0]
      setFiles(Array.from(e.target.files))

      if (!file.type.includes("image")) return

      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || ""
        onChange(imageDataUrl)
      }

      fileReader.readAsDataURL(file)
    }
  }
  function onSubmit(data: ProfileFormValues) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">
            {JSON.stringify(
              {
                ...data,
                city: selectedCity?.name,
                country: selectedCountry?.name,
                state: selectedState?.name,
              },
              null,
              2
            )}
          </code>
        </pre>
      ),
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <CustomProfilePhoto
          form={form}
          handleImageChange={handleImageChange}
          name="image"
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Anish" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name. It can be your real name or a
                pseudonym. You can only change this once every 30 days.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gender</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="prefer not to say">
                      Prefer not to say
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormDescription>Select a gender</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneNo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="9876543210" {...field} />
              </FormControl>
              <FormDescription>Enter your phone number.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <CountryStateCityForm
          form={form}
          selectedCity={selectedCity}
          selectedState={selectedState}
          selectedCountry={selectedCountry}
          setSelectedCity={setSelectedCity}
          setSelectedCountry={setSelectedCountry}
          setSelectedState={setSelectedState}
        />

        <Button type="submit">Update profile</Button>
      </form>
    </Form>
  )
}
