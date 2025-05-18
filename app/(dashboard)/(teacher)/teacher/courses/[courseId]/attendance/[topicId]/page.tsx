"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { useAuth, useUser } from "@clerk/nextjs"
import {
  BookmarkIcon,
  CheckCircle2,
  Clock,
  Edit2,
  Save,
  Search,
  Settings,
  UserCheck,
  Users,
  X,
  XCircle,
} from "lucide-react"
import { toast } from "react-hot-toast"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { trpc } from "@/app/_trpc/client"

interface Student {
  id: string
  userId: string
  name: string
  email: string
  image?: string | null
  attendances: Array<{
    id: string
    userId: string
    status: string
    userObjId: string
    topicId: string
    markedById: string
    notes?: string | null
    createdAt?: string
    updatedAt?: string
  }>
}

interface AttendanceForm {
  [key: string]: {
    status: "present" | "absent" | "excused" | "late"
    notes?: string
  }
}

// Update the interface for saved defaults to match
interface SavedDefault {
  name: string
  settings: Record<
    string,
    {
      status: "present" | "absent" | "excused" | "late"
      notes?: string
    }
  >
}

const TopicAttendancePage = () => {
  const router = useRouter()
  const params = useParams() || {}
  const courseId = params.courseId as string
  const topicId = params.topicId as string
  const { userId } = useAuth()
  const { user } = useUser()

  const [searchQuery, setSearchQuery] = useState("")
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [attendanceForm, setAttendanceForm] = useState<AttendanceForm>({})
  const [selectedStudents, setSelectedStudents] = useState<string[]>([])
  const [selectAll, setSelectAll] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null)
  const [noteDialogOpen, setNoteDialogOpen] = useState(false)
  const [currentNote, setCurrentNote] = useState("")
  const [savedDefaults, setSavedDefaults] = useState<SavedDefault[]>([])
  const [saveDefaultDialogOpen, setSaveDefaultDialogOpen] = useState(false)
  const [defaultName, setDefaultName] = useState("")

  const utils = trpc.useUtils()

  // Get topic details
  const { data: topic, isLoading: topicLoading } = trpc.topic.get.useQuery(
    topicId,
    {
      enabled: !!topicId,
    }
  )

  // Get user's DB ID for marking attendance
  const { data: userDbInfo } = trpc.user.get.useQuery(userId as string, {
    enabled: !!userId,
  })

  // Get students for this topic
  const { data: students, isLoading: studentsLoading } =
    trpc.attendance.getStudentsForTopicAttendance.useQuery(
      {
        topicId,
        courseId,
      },
      {
        enabled: !!topicId && !!courseId,
      }
    )

  // Bulk mark attendance mutation
  const { mutate: bulkMarkAttendance } =
    trpc.attendance.bulkMarkAttendance.useMutation({
      onSuccess: () => {
        toast.success("Attendance saved successfully")
        setIsSaving(false)
        setIsEditing(false)
        utils.attendance.getStudentsForTopicAttendance.invalidate({
          topicId,
          courseId,
        })
      },
      onError: (error) => {
        toast.error("Failed to save attendance: " + error.message)
        setIsSaving(false)
      },
    })

  // Initialize form with existing attendance data
  useEffect(() => {
    if (students && students.length > 0) {
      const initialForm: AttendanceForm = {}
      students.forEach((student) => {
        const attendance = student.attendances[0]
        initialForm[student.userId] = {
          status:
            (attendance?.status as "present" | "absent" | "excused" | "late") ||
            "absent",
          notes: attendance?.notes || "",
        }
      })
      setAttendanceForm(initialForm)
    }
  }, [students])

  // Load saved defaults from localStorage
  useEffect(() => {
    const savedDefaultsStr = localStorage.getItem("attendanceDefaults")
    if (savedDefaultsStr) {
      try {
        const defaults = JSON.parse(savedDefaultsStr)
        setSavedDefaults(defaults)
      } catch (e) {
        console.error("Failed to parse saved defaults:", e)
      }
    }
  }, [])

  const filteredStudents = students?.filter((student) => {
    if (!searchQuery) return true
    return (
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })

  // Function to toggle select all students
  const toggleSelectAll = () => {
    setSelectAll(!selectAll)
    if (!selectAll) {
      const studentIds =
        filteredStudents?.map((student) => student.userId) || []
      setSelectedStudents(studentIds)
    } else {
      setSelectedStudents([])
    }
  }

  // Function to toggle selection of a single student
  const toggleStudentSelection = (userId: string) => {
    setSelectedStudents((prev) => {
      if (prev.includes(userId)) {
        return prev.filter((id) => id !== userId)
      } else {
        return [...prev, userId]
      }
    })
  }

  // Update select all state when filtered students change
  useEffect(() => {
    if (filteredStudents && filteredStudents.length > 0) {
      const allSelected = filteredStudents.every((student) =>
        selectedStudents.includes(student.userId)
      )
      setSelectAll(allSelected)
    } else {
      setSelectAll(false)
    }
  }, [selectedStudents, filteredStudents])

  // Reset selections when search query changes
  useEffect(() => {
    setSelectedStudents([])
    setSelectAll(false)
  }, [searchQuery])

  const handleStatusChange = (
    userId: string,
    status: "present" | "absent" | "excused" | "late"
  ) => {
    setAttendanceForm((prev) => ({
      ...prev,
      [userId]: {
        ...prev[userId],
        status,
      },
    }))
  }

  const openNoteDialog = (userId: string) => {
    setSelectedStudent(userId)
    setCurrentNote(attendanceForm[userId]?.notes || "")
    setNoteDialogOpen(true)
  }

  const saveNote = () => {
    if (selectedStudent) {
      setAttendanceForm((prev) => ({
        ...prev,
        [selectedStudent]: {
          ...prev[selectedStudent],
          notes: currentNote || undefined,
        },
      }))
      setNoteDialogOpen(false)
      setSelectedStudent(null)
    }
  }

  const handleSaveAttendance = async () => {
    setIsSaving(true)

    if (!userId || !userDbInfo) {
      toast.error("You must be logged in to mark attendance")
      setIsSaving(false)
      return
    }

    const attendanceData = Object.entries(attendanceForm).map(
      ([userId, data]) => {
        const student = students?.find((s) => s.userId === userId)
        if (!student) throw new Error("Student not found")

        return {
          userId,
          userObjId: student.id,
          topicId,
          status: data.status,
          notes: data.notes || "",
        }
      }
    )

    bulkMarkAttendance({
      attendances: attendanceData,
      markedById: userDbInfo.id,
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "present":
        return "text-green-500"
      case "absent":
        return "text-red-500"
      case "excused":
        return "text-yellow-500"
      case "late":
        return "text-orange-500"
      default:
        return "text-gray-500"
    }
  }

  // Update the bulk status change function
  const handleBulkStatusChange = (
    status: "present" | "absent" | "excused" | "late",
    mode: "all" | "filtered" | "selected" = "all"
  ) => {
    if (!students || students.length === 0) return

    const updatedForm = { ...attendanceForm }
    let targetStudents: Student[] = []

    if (mode === "selected" && selectedStudents.length > 0) {
      // Apply to selected students
      targetStudents = students.filter((student) =>
        selectedStudents.includes(student.userId)
      )
    } else if (mode === "filtered" && searchQuery && filteredStudents) {
      // Apply to filtered students
      targetStudents = filteredStudents
    } else {
      // Apply to all students
      targetStudents = students
    }

    if (targetStudents.length === 0) {
      toast.error("No students selected for this action")
      return
    }

    targetStudents.forEach((student) => {
      updatedForm[student.userId] = {
        ...updatedForm[student.userId],
        status,
      }
    })

    setAttendanceForm(updatedForm)

    toast.success(`${targetStudents.length} students marked as ${status}`)
  }

  // Update the save default function
  const handleSaveDefault = () => {
    if (!defaultName.trim()) {
      toast.error("Please enter a name for this default setting")
      return
    }

    // Extract current settings
    const settings: Record<
      string,
      {
        status: "present" | "absent" | "excused" | "late"
        notes?: string
      }
    > = {}

    students?.forEach((student) => {
      if (attendanceForm[student.userId]) {
        settings[student.userId] = {
          status: attendanceForm[student.userId].status,
          notes: attendanceForm[student.userId].notes || undefined,
        }
      }
    })

    const newDefault: SavedDefault = {
      name: defaultName,
      settings,
    }

    const updatedDefaults = [...savedDefaults, newDefault]
    setSavedDefaults(updatedDefaults)
    localStorage.setItem("attendanceDefaults", JSON.stringify(updatedDefaults))

    toast.success(`Saved "${defaultName}" as a default setting`)
    setSaveDefaultDialogOpen(false)
    setDefaultName("")
  }

  // Apply a saved default to current form
  const applyDefault = (defaultSetting: SavedDefault) => {
    const updatedForm = { ...attendanceForm }

    students?.forEach((student) => {
      if (defaultSetting.settings[student.userId]) {
        updatedForm[student.userId] = {
          ...updatedForm[student.userId],
          status: defaultSetting.settings[student.userId].status,
          notes: defaultSetting.settings[student.userId].notes || undefined,
        }
      }
    })

    setAttendanceForm(updatedForm)
    toast.success(`Applied default setting: ${defaultSetting.name}`)
  }

  // Remove a saved default
  const removeDefault = (index: number) => {
    const updatedDefaults = savedDefaults.filter((_, i) => i !== index)
    setSavedDefaults(updatedDefaults)
    localStorage.setItem("attendanceDefaults", JSON.stringify(updatedDefaults))
    toast.success("Default setting removed")
  }

  if (topicLoading || studentsLoading) {
    return (
      <div className="p-8">
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    )
  }

  if (!topic) {
    return (
      <div className="p-8">
        <div className="text-center">
          <h2 className="text-xl font-semibold">Topic not found</h2>
          <p className="text-muted-foreground mt-2">
            The topic you are looking for does not exist or has been removed.
          </p>
          <Button className="mt-4" onClick={() => router.back()}>
            Go Back
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{topic.title}</h1>
          <p className="text-muted-foreground">
            Attendance Management • {topic.type} Topic
          </p>
          {topic.startTime && (
            <div className="flex items-center mt-2">
              <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
              <span className="text-sm">
                {new Date(topic.startTime).toLocaleString()}
              </span>
              {topic.duration && (
                <span className="text-sm ml-2">({topic.duration} minutes)</span>
              )}
            </div>
          )}
        </div>

        <div className="flex gap-2">
          {isEditing ? (
            <>
              <Button
                variant="outline"
                onClick={() => setIsEditing(false)}
                disabled={isSaving}
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button onClick={handleSaveAttendance} disabled={isSaving}>
                <Save className="h-4 w-4 mr-2" />
                {isSaving ? "Saving..." : "Save Attendance"}
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)}>
              <Edit2 className="h-4 w-4 mr-2" />
              Mark Attendance
            </Button>
          )}
        </div>
      </div>

      <Separator className="my-4" />

      {/* Add save/load defaults dropdown to the bulk actions section */}
      {isEditing && (
        <div className="mb-4 p-4 border rounded-md bg-muted/30">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-2" />
                <span className="font-medium">Bulk Actions</span>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4 mr-2" />
                    Saved Defaults
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem
                    onClick={() => setSaveDefaultDialogOpen(true)}
                  >
                    <BookmarkIcon className="h-4 w-4 mr-2" />
                    Save Current Settings
                  </DropdownMenuItem>

                  {savedDefaults.length > 0 && <DropdownMenuSeparator />}

                  {savedDefaults.map((defaultSetting, index) => (
                    <DropdownMenuItem
                      key={index}
                      className="flex justify-between items-center"
                    >
                      <span
                        className="cursor-pointer flex-grow"
                        onClick={() => applyDefault(defaultSetting)}
                      >
                        {defaultSetting.name}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={(e) => {
                          e.stopPropagation()
                          removeDefault(index)
                        }}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </DropdownMenuItem>
                  ))}

                  {savedDefaults.length === 0 && (
                    <div className="px-2 py-2 text-sm text-muted-foreground">
                      No saved defaults
                    </div>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="flex flex-wrap gap-2 mt-2">
              <Button
                size="sm"
                variant="outline"
                className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100 hover:text-green-800"
                onClick={() => handleBulkStatusChange("present", "all")}
              >
                <CheckCircle2 className="h-4 w-4 mr-1" />
                Mark All Present
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="bg-red-50 text-red-700 border-red-200 hover:bg-red-100 hover:text-red-800"
                onClick={() => handleBulkStatusChange("absent", "all")}
              >
                <XCircle className="h-4 w-4 mr-1" />
                Mark All Absent
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="bg-yellow-50 text-yellow-700 border-yellow-200 hover:bg-yellow-100 hover:text-yellow-800"
                onClick={() => handleBulkStatusChange("excused", "all")}
              >
                <Clock className="h-4 w-4 mr-1" />
                Mark All Excused
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100 hover:text-orange-800"
                onClick={() => handleBulkStatusChange("late", "all")}
              >
                <Clock className="h-4 w-4 mr-1" />
                Mark All Late
              </Button>
            </div>

            {selectedStudents.length > 0 && (
              <div className="mt-3">
                <div className="flex items-center text-sm text-muted-foreground mb-2">
                  <UserCheck className="h-4 w-4 mr-1" />
                  <span>{selectedStudents.length} students selected</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button
                    size="sm"
                    className="bg-green-500 hover:bg-green-600"
                    onClick={() =>
                      handleBulkStatusChange("present", "selected")
                    }
                  >
                    <CheckCircle2 className="h-4 w-4 mr-1" />
                    Mark Selected Present
                  </Button>
                  <Button
                    size="sm"
                    className="bg-red-500 hover:bg-red-600"
                    onClick={() => handleBulkStatusChange("absent", "selected")}
                  >
                    <XCircle className="h-4 w-4 mr-1" />
                    Mark Selected Absent
                  </Button>
                  <Button
                    size="sm"
                    className="bg-yellow-500 hover:bg-yellow-600"
                    onClick={() =>
                      handleBulkStatusChange("excused", "selected")
                    }
                  >
                    Mark Selected Excused
                  </Button>
                  <Button
                    size="sm"
                    className="bg-orange-500 hover:bg-orange-600"
                    onClick={() => handleBulkStatusChange("late", "selected")}
                  >
                    Mark Selected Late
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search students by name or email..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="border rounded-md">
        <div className="bg-muted px-4 py-3 grid grid-cols-12 text-sm font-medium">
          {isEditing && (
            <div className="col-span-1">
              <Checkbox
                checked={selectAll}
                onCheckedChange={toggleSelectAll}
                aria-label="Select all students"
              />
            </div>
          )}
          <div className={isEditing ? "col-span-5" : "col-span-6"}>Student</div>
          <div className="col-span-3">Status</div>
          <div className="col-span-3">Actions</div>
        </div>

        {!filteredStudents || filteredStudents.length === 0 ? (
          <div className="px-4 py-6 text-center text-muted-foreground">
            No students found for this topic.
          </div>
        ) : (
          <div className="divide-y">
            {filteredStudents.map((student) => (
              <div
                key={student.userId}
                className="px-4 py-3 grid grid-cols-12 items-center hover:bg-muted/50"
              >
                {isEditing && (
                  <div className="col-span-1">
                    <Checkbox
                      checked={selectedStudents.includes(student.userId)}
                      onCheckedChange={() =>
                        toggleStudentSelection(student.userId)
                      }
                      aria-label={`Select ${student.name}`}
                    />
                  </div>
                )}
                <div className={isEditing ? "col-span-5" : "col-span-6"}>
                  <div className="flex items-center gap-2">
                    {student.image ? (
                      <img
                        src={student.image}
                        alt={student.name}
                        className="h-8 w-8 rounded-full"
                      />
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                        {student.name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <div className="font-medium">{student.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {student.email}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-span-3">
                  {isEditing ? (
                    <Select
                      value={attendanceForm[student.userId]?.status || "absent"}
                      onValueChange={(value) =>
                        handleStatusChange(
                          student.userId,
                          value as "present" | "absent" | "excused" | "late"
                        )
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="present">Present</SelectItem>
                        <SelectItem value="absent">Absent</SelectItem>
                        <SelectItem value="excused">Excused</SelectItem>
                        <SelectItem value="late">Late</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <div
                      className={getStatusColor(
                        attendanceForm[student.userId]?.status || "absent"
                      )}
                    >
                      {attendanceForm[student.userId]?.status === "present" && (
                        <div className="flex items-center">
                          <CheckCircle2 className="h-4 w-4 mr-1" />
                          <span className="capitalize">Present</span>
                        </div>
                      )}
                      {attendanceForm[student.userId]?.status === "absent" && (
                        <div className="flex items-center">
                          <XCircle className="h-4 w-4 mr-1" />
                          <span className="capitalize">Absent</span>
                        </div>
                      )}
                      {attendanceForm[student.userId]?.status === "excused" && (
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          <span className="capitalize">Excused</span>
                        </div>
                      )}
                      {attendanceForm[student.userId]?.status === "late" && (
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          <span className="capitalize">Late</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="col-span-3">
                  {isEditing ? (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openNoteDialog(student.userId)}
                    >
                      {attendanceForm[student.userId]?.notes
                        ? "Edit Note"
                        : "Add Note"}
                    </Button>
                  ) : (
                    attendanceForm[student.userId]?.notes && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openNoteDialog(student.userId)}
                      >
                        View Note
                      </Button>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Dialog open={noteDialogOpen} onOpenChange={setNoteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedStudent && attendanceForm[selectedStudent]?.notes
                ? "Edit Attendance Note"
                : "Add Attendance Note"}
            </DialogTitle>
            <DialogDescription>
              Add a note about this student's attendance status.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="note">Note</Label>
              <Textarea
                id="note"
                placeholder="Enter attendance note here..."
                value={currentNote}
                onChange={(e) => setCurrentNote(e.target.value)}
                rows={5}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setNoteDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={saveNote}>Save Note</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add dialog for saving defaults */}
      <Dialog
        open={saveDefaultDialogOpen}
        onOpenChange={setSaveDefaultDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save Default Settings</DialogTitle>
            <DialogDescription>
              Save the current attendance settings as a default that can be
              quickly applied to other classes.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="defaultName">Default Name</Label>
              <Input
                id="defaultName"
                placeholder="Enter a name for this setting..."
                value={defaultName}
                onChange={(e) => setDefaultName(e.target.value)}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setSaveDefaultDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleSaveDefault}>Save Default</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default TopicAttendancePage
