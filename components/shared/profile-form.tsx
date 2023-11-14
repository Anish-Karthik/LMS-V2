import { useEffect, useState } from "react"
import { redirect, useRouter } from "next/navigation"
import { useAuth } from "@clerk/nextjs"
import { zodResolver } from "@hookform/resolvers/zod"
import { User } from "@prisma/client"
import {
  City,
  Country,
  ICity,
  ICountry,
  IState,
  State,
} from "country-state-city"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { formatDate_YYYYMMDD } from "@/lib/format"
import { useUploadThing } from "@/lib/uploadthing"
import { isBase64Image } from "@/lib/utils"
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
import { trpc } from "@/app/_trpc/client"

import { CountryStateCityForm } from "./country-state-city-select"

const profileFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    }),
  dob: z
    .string()
    .min(1, {
      message: "Please enter your date of birth",
    })
    .refine(
      (dob) => {
        if (!dob) return false
        console.log(dob)
        const res = new Date(dob)
        const date = new Date()
        date.setFullYear(date.getFullYear() - 10)
        return !(res > date)
      },
      { message: "You must be atleast 10 years old" }
    )
    .refine(
      (dob) => {
        if (!dob) return false
        const res = new Date(dob)
        const date = new Date()
        date.setFullYear(date.getFullYear() - 110)
        return !(res < date)
      },
      { message: "You must be less than 110 years old" }
    ),
  phoneNo: z.string().min(10).max(10),
  image: z.string().url(),
  city: z.string().min(1, { message: "city name can't be empty" }),
  country: z.string().min(1, { message: "country name can't be empty" }),
  state: z.string().min(1, { message: "state name can't be empty" }),
  gender: z.string().min(1, { message: "gender can't be empty" }),
})

export type ProfileFormValues = z.infer<typeof profileFormSchema>

export function ProfileForm({
  userInfo,
  setIsEditing,
}: {
  userInfo: User
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const [selectedCountry, setSelectedCountry] = useState<ICountry | null>(null)
  const [selectedState, setSelectedState] = useState<IState | null>(null)
  const [selectedCity, setSelectedCity] = useState<ICity | null>(null)
  const [files, setFiles] = useState<File[]>([])
  const { startUpload } = useUploadThing("media")
  const { userId } = useAuth()
  const router = useRouter()
  const updateUser = trpc.user.update.useMutation()

  const defaultValues: Partial<ProfileFormValues> = {
    name: userInfo.name,
    dob: formatDate_YYYYMMDD(userInfo.dob || new Date()) || "",
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
    if (!userInfo.country) return
    const userCountry = Country.getAllCountries().find(
      (c) => c.name === userInfo.country
    )
    const userState = State.getStatesOfCountry(userCountry?.isoCode).find(
      (s) => s.name === userInfo.state
    )
    const userCity = City.getCitiesOfState(
      userCountry?.isoCode || "",
      userState?.isoCode || ""
    ).find((c) => c.name === userInfo.city)
    if (userCountry?.isoCode !== selectedCountry?.isoCode)
      setSelectedCountry(userCountry || null)
    if (userState?.isoCode !== selectedState?.isoCode)
      setSelectedState(userState || null)
    if (userCity?.name !== selectedCity?.name) setSelectedCity(userCity || null)
  }, [
    userInfo.city,
    userInfo.country,
    userInfo.state,
    selectedCountry,
    selectedState,
    selectedCity,
  ])
  useEffect(() => {
    form.setValue("country", selectedCountry?.name || "")
  }, [form, selectedCountry])
  useEffect(() => {
    form.setValue("state", selectedState?.name || "")
  }, [form, selectedState])
  useEffect(() => {
    form.setValue("city", selectedCity?.name || "")
  }, [form, selectedCity])
  console.log(selectedCountry, selectedState, selectedCity)
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
  if (!userId) redirect("/signin")
  async function onSubmit(data: ProfileFormValues) {
    try {
      const blob = data.image

      const hasImageChanged = isBase64Image(blob)

      if (hasImageChanged) {
        const imgRes = await startUpload(files)

        if (imgRes && imgRes[0].url) {
          data.image = imgRes[0].url
        }
      }
      await updateUser.mutateAsync(
        {
          userId: userId!,
          name: data.name,
          dob: new Date(data.dob),
          phoneNo: data.phoneNo,
          image: data.image,
          city: data.city,
          country: data.country,
          state: data.state,
        },
        {
          onSuccess: () => {
            toast({ title: "Profile Updated Successfully" })
            setIsEditing(false)
          },
        }
      )

      router.refresh()
    } catch (err: any) {
      console.log(err)
      toast({
        title: "Error",
        description: err.message,
      })
    }
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
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Your Name" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
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
          name="dob"
          render={({ field }) => (
            <FormItem>
              <FormLabel>D.O.B</FormLabel>
              <FormControl>
                <Input type={"date"} {...field} />
              </FormControl>
              <FormDescription>Please Enter your birth date</FormDescription>
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
