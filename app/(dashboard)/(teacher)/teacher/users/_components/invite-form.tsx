/* eslint-disable tailwindcss/migration-from-tailwind-2 */
"use client"

import { useRouter } from "next/navigation"
import { useAuth } from "@clerk/nextjs"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import * as z from "zod"

import {
  createOrUpdateInviteClient,
  isUniqueInviteClient,
} from "@/lib/actions/server/invite.server.action"
import { randomString } from "@/lib/format"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
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

const formSchema = z.object({
  id: z.string().optional(),
  invite: z
    .string()
    .min(6)
    .max(12)
    .toUpperCase()
    .refine(
      async (code) => {
        return await isUniqueInviteClient(code)
      },
      { message: "Invite code already exists" }
    ),
  role: z.enum(["admin", "teacher"]),
  uses: z
    .string()
    .min(1)
    .max(3)
    .refine((val) => parseInt(val) <= 100 && parseInt(val) > 0),
  expiresAt: z
    .date()
    .optional()
    .refine((date) => {
      return !date || date > new Date()
    }),
})

export function InviteForm({
  id,
  invite,
  uses,
  expiresAt,
  type = "create",
  setIsCreating,
}: {
  id?: string
  invite?: string
  uses?: number
  expiresAt?: Date
  type?: "create" | "edit"
  setIsCreating: (val: boolean) => void
}) {
  const { userId } = useAuth()
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: id || undefined,
      invite: invite || randomString(12),
      uses: uses?.toString() || "10",
      expiresAt: expiresAt || undefined,
    },
  })
  if (!userId) {
    router.push("/sign-in")
    return null
  }
  const { isSubmitting, isValid } = form.formState

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // TODO: TRPC
      await createOrUpdateInviteClient({
        ...values,
        userId,
        uses: parseInt(values.uses),
      })
      console.log(values)
      toast.success(
        `Invite Code ${type == "edit" ? "updated" : "created"} successfully`
      )
      setIsCreating(false)
      router.refresh()
    } catch {
      toast.error("Something went wrong")
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 space-y-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <h3> PromoCode </h3>
            <Button variant="secondary" onClick={() => setIsCreating(false)}>
              Cancel
            </Button>
          </div>
          <FormField
            control={form.control}
            name="invite"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    placeholder="e.g. HELLO2023"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-2">
          <h3>role</h3>
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select
                    disabled={isSubmitting}
                    {...field}
                    onValueChange={(val) => {
                      field.onChange(val)
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue
                        placeholder="Teacher"
                        defaultValue={"teacher"}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="teacher">Teacher</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-2">
          <h3>uses</h3>
          <FormField
            control={form.control}
            name="uses"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    type={"number"}
                    placeholder="e.g. 10 for 10%"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-2">
          <h3>{"Expiry Date (Optional)"}</h3>
          <FormField
            control={form.control}
            name="expiresAt"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      className="rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 max-xs:!-ml-8"
                    />
                    {!field.value ? (
                      <span className="text-xs text-slate-500">
                        Leave empty for no expiry (Currently left empty)
                      </span>
                    ) : (
                      <span className="text-xs text-slate-500">
                        double click on any date to deslect them and leave it
                        empty
                      </span>
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button disabled={isSubmitting} type="submit">
          Save
        </Button>
      </form>
    </Form>
  )
}
