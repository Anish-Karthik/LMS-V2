/* eslint-disable tailwindcss/migration-from-tailwind-2 */
"use client"

import { useRouter } from "next/navigation"
import { useAuth } from "@clerk/nextjs"
import { zodResolver } from "@hookform/resolvers/zod"
import { Promo } from "@prisma/client"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import * as z from "zod"

import {
  createOrUpdatePromo,
  isUniquePromoCode,
} from "@/lib/actions/promo.action"
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

const formSchema = z.object({
  id: z.string().optional(),
  code: z
    .string()
    .min(6)
    .max(12)
    .toUpperCase()
    .refine(
      async (code) => {
        return await isUniquePromoCode(code)
      },
      { message: "Promo code already exists" }
    ),
  discount: z.number().min(1).max(100),
  expiresAt: z
    .date()
    .optional()
    .refine((date) => {
      return !date || date > new Date()
    }),
})

const formSchemaEdit = z.object({
  id: z.string().optional(),
  code: z.string().min(6).max(12).toUpperCase(),
  discount: z.number().min(1).max(100),
  expiresAt: z
    .date()
    .optional()
    .refine((date) => {
      return !date || date > new Date()
    }),
})

export function PromoForm({
  userId,
  id,
  code,
  discount,
  expiresAt,
  type = "create",
  setIsCreating,
}: {
  userId: string
  id?: string
  code?: string
  discount?: number
  expiresAt?: Date
  type?: "create" | "edit"
  setIsCreating: (val: boolean) => void
}) {
  const schema = type == "edit" ? formSchemaEdit : formSchema
  const router = useRouter()
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      id: id || undefined,
      code: code || randomString(12),
      discount: discount || 10,
      expiresAt: expiresAt || undefined,
    },
  })

  const { isSubmitting, isValid } = form.formState

  if (!userId) return null

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // TODO: TRPC
      await createOrUpdatePromo({ ...values, userId })
      console.log(values)
      toast.success(
        `Promo Code ${type == "edit" ? "updated" : "created"} successfully`
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
            name="code"
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
          <h3>Discount</h3>
          <FormField
            control={form.control}
            name="discount"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    type="number"
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
                  <div>
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      className="rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
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
