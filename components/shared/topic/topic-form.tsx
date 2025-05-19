"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Topic } from "@prisma/client"
import { format, set } from "date-fns"
import {
  Calendar,
  EyeIcon,
  EyeOffIcon,
  FileText,
  ListChecks,
  Loader2,
  Pencil,
  Video,
} from "lucide-react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import * as z from "zod"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Checkbox } from "@/components/ui/checkbox"
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Editor } from "@/components/editor"
import { trpc } from "@/app/_trpc/client"

interface TopicFormProps {
  initialData: Topic
  courseId: string
  chapterId: string
}

const formSchema = z
  .object({
    title: z.string().min(1, { message: "Title is required" }),
    description: z.string().optional(),
    type: z.enum(["video", "quiz", "assignment", "live", "article"]),
    isFree: z.boolean().default(false),
  })
  .and(
    z.discriminatedUnion("type", [
      z.object({
        type: z.literal("video"),
        videoUrl: z.union([z.string().url(), z.string().max(0)]).optional(),
      }),
      z.object({
        type: z.literal("quiz"),
        timeLimit: z.coerce.number().optional(),
        passingScore: z.coerce.number().min(0).max(100).optional(),
        allowedAttempts: z.coerce.number().optional(),
      }),
      z.object({
        type: z.literal("article"),
        content: z.string().min(1).optional(),
      }),
      z.object({
        type: z.literal("live"),
        startTime: z.date().optional(),
        duration: z.coerce.number().optional(),
        liveLink: z.union([z.string().url(), z.string().max(0)]).optional(),
      }),
      z.object({
        type: z.literal("assignment"),
      }),
    ])
  )

export const TopicForm = ({
  initialData,
  courseId,
  chapterId,
}: TopicFormProps) => {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)

  const toggleEdit = () => setIsEditing((current) => !current)

  const updateTopic = trpc.topic.update.useMutation({
    onSuccess: () => {
      toast.success("Topic updated")
      toggleEdit()
      router.refresh()
    },
    onError: (error) => {
      toast.error("Something went wrong")
      console.error(error)
    },
  })

  const togglePublish = trpc.topic.togglePublish.useMutation({
    onSuccess: (data) => {
      toast.success(data.isPublished ? "Topic published" : "Topic unpublished")
      router.refresh()
    },
    onError: (error) => {
      toast.error("Something went wrong")
      console.error(error)
    },
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialData.title,
      description: initialData.description || "",
      type: (initialData.type as any) || "video",
      videoUrl: initialData.videoUrl || "",
      isFree: initialData.isFree,

      // Live class fields
      startTime: initialData.startTime
        ? new Date(initialData.startTime)
        : undefined,
      duration: initialData.duration || undefined,
      liveLink: initialData.liveLink || "",

      // Quiz fields
      timeLimit: initialData.timeLimit || undefined,
      passingScore: initialData.passingScore || undefined,
      allowedAttempts: initialData.allowedAttempts || undefined,

      // Article field
      content: initialData.content || "",
    },
  })

  const { isSubmitting, isValid, errors } = form.formState
  const type = form.watch("type")

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      updateTopic.mutate({
        id: initialData.id,
        title: values.title,
        description: values.description,
        type: values.type,
        videoUrl: values.type === "video" ? values.videoUrl : undefined,
        isFree: values.isFree,

        // Live class fields
        startTime:
          values.type === "live" && values.startTime
            ? new Date(values.startTime)
            : undefined,
        duration: values.type === "live" ? values.duration : undefined,
        liveLink: values.type === "live" ? values.liveLink : undefined,

        // Quiz fields
        timeLimit: values.type === "quiz" ? values.timeLimit : undefined,
        passingScore: values.type === "quiz" ? values.passingScore : undefined,
        allowedAttempts:
          values.type === "quiz" ? values.allowedAttempts : undefined,

        // Article field
        content: values.type === "article" ? values.content : undefined,
      })
    } catch (error) {
      console.error(error)
      toast.error("Something went wrong")
    }
  }

  const onTogglePublish = () => {
    togglePublish.mutate({
      id: initialData.id,
      isPublished: !initialData.isPublished,
    })
  }

  const isLoading =
    isSubmitting || updateTopic.isLoading || togglePublish.isLoading

  console.log(isValid, "VALID")
  console.log(isLoading, "LOADING")

  const renderTopicTypeIcon = (topicType: string) => {
    switch (topicType) {
      case "video":
        return <Video className="mr-2 h-4 w-4 text-blue-500" />
      case "quiz":
        return <ListChecks className="mr-2 h-4 w-4 text-green-500" />
      case "article":
        return <FileText className="mr-2 h-4 w-4 text-yellow-500" />
      case "live":
        return <Calendar className="mr-2 h-4 w-4 text-red-500" />
      default:
        return null
    }
  }

  return (
    <div className="bg-secondary mt-6 rounded-md border p-4">
      <div className="flex items-center justify-between font-medium">
        Topic settings
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="mr-2 h-4 w-4" />
              Edit topic
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <div className="mt-4 space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <div className="text-sm font-medium">Title</div>
              <p className="mt-1 text-sm">{initialData.title}</p>
            </div>
            <div>
              <div className="text-sm font-medium">Type</div>
              <div className="mt-1 flex items-center">
                {renderTopicTypeIcon(initialData.type)}
                <span className="text-sm capitalize">{initialData.type}</span>
              </div>
            </div>
          </div>

          <div>
            <div className="text-sm font-medium">Description</div>
            <p className="mt-1 text-sm">
              {initialData.description || "No description provided"}
            </p>
          </div>

          {initialData.type === "video" && initialData.videoUrl && (
            <div>
              <div className="text-sm font-medium">Video URL</div>
              <p className="mt-1 text-sm text-blue-500 underline">
                <a
                  href={initialData.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {initialData.videoUrl}
                </a>
              </p>
            </div>
          )}

          {initialData.type === "live" && (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {initialData.startTime && (
                <div>
                  <div className="text-sm font-medium">Start Time</div>
                  <p className="mt-1 text-sm">
                    {format(new Date(initialData.startTime), "PPP p")}
                  </p>
                </div>
              )}
              {initialData.duration && (
                <div>
                  <div className="text-sm font-medium">Duration</div>
                  <p className="mt-1 text-sm">{initialData.duration} minutes</p>
                </div>
              )}
              {initialData.liveLink && (
                <div className="col-span-2">
                  <div className="text-sm font-medium">Live Link</div>
                  <p className="mt-1 text-sm text-blue-500 underline">
                    <a
                      href={initialData.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {initialData.liveLink}
                    </a>
                  </p>
                </div>
              )}
            </div>
          )}

          {initialData.type === "quiz" && (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {initialData.timeLimit && (
                <div>
                  <div className="text-sm font-medium">Time Limit</div>
                  <p className="mt-1 text-sm">
                    {initialData.timeLimit} minutes
                  </p>
                </div>
              )}
              {initialData.passingScore && (
                <div>
                  <div className="text-sm font-medium">Passing Score</div>
                  <p className="mt-1 text-sm">{initialData.passingScore}%</p>
                </div>
              )}
              {initialData.allowedAttempts && (
                <div>
                  <div className="text-sm font-medium">Allowed Attempts</div>
                  <p className="mt-1 text-sm">{initialData.allowedAttempts}</p>
                </div>
              )}
            </div>
          )}

          <div>
            <div className="flex items-center">
              <div className="mr-2 text-sm font-medium">Access</div>
              {initialData.isFree ? (
                <div className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-800">
                  Free
                </div>
              ) : (
                <div className="rounded-full bg-amber-100 px-2 py-1 text-xs text-amber-800">
                  Premium
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {isEditing && (
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
                  <FormLabel>Topic title</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="e.g. 'Introduction to the topic'"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Topic type</FormLabel>
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="video">
                        <div className="flex items-center">
                          <Video className="mr-2 h-4 w-4 text-blue-500" />
                          Video
                        </div>
                      </SelectItem>
                      <SelectItem value="quiz">
                        <div className="flex items-center">
                          <ListChecks className="mr-2 h-4 w-4 text-green-500" />
                          Quiz
                        </div>
                      </SelectItem>
                      <SelectItem value="article">
                        <div className="flex items-center">
                          <FileText className="mr-2 h-4 w-4 text-yellow-500" />
                          Article
                        </div>
                      </SelectItem>
                      <SelectItem value="live">
                        <div className="flex items-center">
                          <Calendar className="mr-2 h-4 w-4 text-red-500" />
                          Live Session
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Topic description</FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={isLoading}
                      placeholder="e.g. 'In this topic we will cover...'"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {type === "video" && (
              <FormField
                control={form.control}
                name="videoUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Video URL</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="e.g. 'https://www.youtube.com/watch?v=...'"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {type === "live" && (
              <>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="startTime"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Start Time</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP p")
                                ) : (
                                  <span>Pick a date and time</span>
                                )}
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <CalendarComponent
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              initialFocus
                            />
                            <div className="border-border border-t p-3">
                              <Input
                                type="time"
                                onChange={(e) => {
                                  const [hours, minutes] = e.target.value
                                    .split(":")
                                    .map(Number)
                                  const date = field.value || new Date()
                                  const newDate = set(date, { hours, minutes })
                                  field.onChange(newDate)
                                }}
                                value={
                                  field.value
                                    ? `${String(
                                        field.value.getHours()
                                      ).padStart(2, "0")}:${String(
                                        field.value.getMinutes()
                                      ).padStart(2, "0")}`
                                    : ""
                                }
                              />
                            </div>
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Duration (minutes)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            disabled={isLoading}
                            placeholder="e.g. 60"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="liveLink"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Live Session Link</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          placeholder="e.g. 'https://zoom.us/j/...'"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            {type === "quiz" && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <FormField
                    control={form.control}
                    name="timeLimit"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Time Limit (minutes)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            disabled={isLoading}
                            placeholder="e.g. 30"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="passingScore"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Passing Score (%)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            disabled={isLoading}
                            placeholder="e.g. 70"
                            min={0}
                            max={100}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="allowedAttempts"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Allowed Attempts</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            disabled={isLoading}
                            placeholder="e.g. 3"
                            min={1}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormDescription>
                  After saving, you can edit the quiz questions in the quiz
                  editor.
                </FormDescription>
              </div>
            )}

            {type === "article" && (
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Article Content (Markdown)</FormLabel>
                    <FormControl>
                      <Editor
                        value={field.value || ""}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="isFree"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Free topic</FormLabel>
                    <FormDescription>
                      Check this box if you want to make this topic free for
                      preview
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button disabled={!isValid || isLoading} type="submit">
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save changes
              </Button>
              {!isValid && (
                <p className="text-sm text-red-500">
                  Form validation errors: {JSON.stringify(errors)}
                </p>
              )}
            </div>
          </form>
        </Form>
      )}
    </div>
  )
}
