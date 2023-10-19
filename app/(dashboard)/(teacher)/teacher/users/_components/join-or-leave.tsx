"use client"

import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import toast from "react-hot-toast"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const positiveActions = new Set(["unBan", "toTeacher", "toAdmin"])
const negativeActions = new Set(["ban", "toUser"])

type TAction = "ban" | "unBan" | "toTeacher" | "toAdmin" | "toUser"

// const mapAction = {
//   "unBan": "ban",
//   "toTeacher": "toUser",
//   "toAdmin": "toUser",
//   "toUser": "toTeacher",
//   "ban": "unBan",
// }

type props = {
  memberRole: string
  memberId: string
  onActionCallback: (userId: string) => Promise<void>
  action: TAction
  notJoinedCommunities?: string[]
}

const JoinOrLeave = ({
  memberRole,
  memberId,
  onActionCallback,
  action,
}: props) => {
  const pathname = usePathname()
  const router = useRouter()
  const [isSubmiting, setIsSubmiting] = useState(false)
  const [value, setValue] = useState<TAction>(action)

  const handleAction = async () => {
    setIsSubmiting(true)
    try {
      await onActionCallback(memberId)
      // setValue(action)
      router.refresh()
    } catch (error: any) {
      toast.error(error.message)
    }
    setIsSubmiting(false)
  }

  useEffect(() => {
    setValue(action)
  }, [action])

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={
            negativeActions.has(action)
              ? "destructive"
              : positiveActions.has(action)
              ? "success"
              : "default"
          }
          className="user-card_btn cursor-pointer !py-0 text-xs md:text-sm"
        >
          {value}
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-dark-2 text-light-2 max-w-[300px] sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-light-2">{value + " user"}</DialogTitle>
          <DialogDescription>
            {["ban", "unBan"].includes(value) &&
              `are you sure you want to ${value} this user?`}
            {["toTeacher", "toAdmin", "toUser"].includes(value) &&
              `are you sure you want to make this user ${action}?`}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <div className="flex flex-wrap justify-end gap-5">
            <DialogPrimitive.Close>
              <Button variant={"secondary"}>Cancel</Button>
            </DialogPrimitive.Close>
            <DialogPrimitive.Close>
              <Button
                variant={
                  negativeActions.has(value) ? "destructive" : "secondary"
                }
                disabled={isSubmiting}
                onClick={handleAction}
              >
                <p className="!text-xs md:text-sm">{value}</p>
              </Button>
            </DialogPrimitive.Close>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default JoinOrLeave
