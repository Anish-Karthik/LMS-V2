"use client"

import { useEffect, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Announcement, Attachment } from "@prisma/client"
import { Loader2, PlusCircle } from "lucide-react"
import qs from "query-string"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import * as z from "zod"

import { createAnnouncement } from "@/lib/actions/announcement.action"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { AnnouncementsList } from "./announcements-list"

interface AnnouncementsFormProps {
  initialData: (Announcement & { attachments?: Attachment[] })[]
}

const formSchema = z.object({
  title: z.string().min(1),
})

export const AnnouncementsForm = ({ initialData }: AnnouncementsFormProps) => {
  const [isCreating, setIsCreating] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  useEffect(() => {
    // clear search params
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          type: "",
          courseId: "",
          batchId: "",
        },
      },
      { skipEmptyString: true, skipNull: true }
    )
    router.push(url)
  }, [pathname, router, searchParams])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  })

  const { isSubmitting, isValid } = form.formState

  const toggleCreating = () => {
    setIsCreating((current) => !current)
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsUpdating(true)
      await createAnnouncement(values.title)
      toast.success("Announcement created")
      toggleCreating()
      router.refresh()
    } catch (error: any) {
      toast.error("Something went wrong", error.message)
    }
    setIsUpdating(false)
  }

  return (
    <div className="relative mt-6 rounded-md border bg-secondary p-4">
      {isUpdating && (
        <div className="rounded-m absolute right-0 top-0 flex h-full w-full items-center justify-center bg-slate-500/20">
          <Loader2 className="h-6 w-6 animate-spin text-sky-700" />
        </div>
      )}
      <div className="flex items-center justify-between font-medium">
        Announcements
        <Button onClick={toggleCreating} variant="ghost">
          {isCreating ? (
            <>Cancel</>
          ) : (
            <>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add a Announcements
            </>
          )}
        </Button>
      </div>
      {isCreating && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-4 space-y-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. 'Introduction to the course'"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={!isValid || isSubmitting} type="submit">
              Create
            </Button>
          </form>
        </Form>
      )}
      {!isCreating && (
        <div
          className={cn(
            "mt-2 text-sm",
            !initialData.length && "italic text-slate-500"
          )}
        >
          {!initialData.length && "No batches"}
          <AnnouncementsList items={initialData} />
        </div>
      )}
    </div>
  )
}
