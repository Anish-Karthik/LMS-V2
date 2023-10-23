"use client"

import React, { useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { User } from "@clerk/nextjs/dist/types/server"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { z } from "zod"

import { createUser } from "@/lib/actions/server/user.server.action"
import { useUploadThing } from "@/lib/uploadthing"
import { isBase64Image } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"

import { CustomInputField, CustomProfilePhoto } from "../form-fields"

const UserValidation = z.object({
  image: z.string().url(),
  name: z.string().min(3).max(30),
  email: z.string().email(),
  phoneNo: z.string().min(10).max(10),
})

const AccountProfile = ({ user, route }: { user: User; route: string }) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  const { startUpload } = useUploadThing("media")
  const router = useRouter()
  const pathname = usePathname()

  const form = useForm({
    resolver: zodResolver(UserValidation),
    defaultValues: {
      image: user.imageUrl || "",
      name: user.firstName || "",
      email: user.emailAddresses[0].emailAddress || "",
      phoneNo: user.phoneNumbers[0]?.phoneNumber || "",
    },
  })

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

  async function onSubmit(values: z.infer<typeof UserValidation>) {
    setIsSubmitting(true)
    try {
      const blob = values.image

      const hasImageChanged = isBase64Image(blob)

      if (hasImageChanged) {
        const imgRes = await startUpload(files)

        if (imgRes && imgRes[0].url) {
          values.image = imgRes[0].url
        }
      }

      await createUser({
        userId: user.id,
        name: values.name,
        email: values.email,
        image: values.image,
        phoneNo: values.phoneNo,
      })

      if (pathname.includes("/profile/edit")) {
        router.back()
      } else {
        router.push(route)
      }
      toast.success("Profile Updated Successfully")
    } catch (error: any) {
      console.log(error)
      toast.error(error.message)
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-start gap-10"
      >
        <CustomProfilePhoto
          form={form}
          handleImageChange={handleImageChange}
          name="image"
        />
        <CustomInputField form={form} name="name" />
        <CustomInputField form={form} name="email" />
        <CustomInputField form={form} name="phoneNo" />
        <Button type="submit" className="" disabled={isSubmitting}>
          {"Complete Profile"}
        </Button>
      </form>
    </Form>
  )
}

export default AccountProfile
