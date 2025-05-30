"use client"

import Image from "next/image"
import Link from "next/link"
import { Purchase, User } from "@prisma/client"
import { toast } from "react-hot-toast"

import { Button } from "@/components/ui/button"
import { trpc } from "@/app/_trpc/client"

import JoinOrLeave from "./join-or-leave"

interface UserCardProps {
  user: User & { purchases?: Purchase[] }
  viewer: User & { purchases?: Purchase[] }
}

const UserCard = ({ user, viewer }: UserCardProps) => {
  const banUserHook = trpc.user.ban.useMutation({
    onSuccess: () => {
      toast.success("User banned successfully")
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })
  const unBanUserHook = trpc.user.unBan.useMutation({
    onSuccess: () => {
      toast.success("User unbanned successfully")
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })
  const toAdminHook = trpc.user.toAdmin.useMutation({
    onSuccess: () => {
      toast.success("User promoted to admin successfully")
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })
  const toTeacherHook = trpc.user.toTeacher.useMutation({
    onSuccess: () => {
      toast.success("User promoted to teacher successfully")
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })
  const toUserHook = trpc.user.toUser.useMutation({
    onSuccess: () => {
      toast.success("User demoted to user successfully")
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const banUser = async (userId: string) =>
    await banUserHook.mutateAsync(userId)
  const unBanUser = async (userId: string) =>
    await unBanUserHook.mutateAsync(userId)
  const toAdmin = async (userId: string) =>
    await toAdminHook.mutateAsync(userId)
  const toTeacher = async (userId: string) =>
    await toTeacherHook.mutateAsync(userId)
  const toUser = async (userId: string) => await toUserHook.mutateAsync(userId)

  return (
    <article className="user-card mx-auto w-full max-w-4xl">
      <div className="user-card_avatar">
        <div className="relative h-12 w-12">
          <Image
            src={user.image!}
            alt="user_logo"
            fill
            className="h-12 w-12 rounded-full object-cover"
          />
        </div>

        <div className="flex-1 text-ellipsis">
          <div className="flex items-center justify-start gap-1">
            <h4 className="md:text-md !mr-6 w-fit text-xs font-bold">
              {user.name}
            </h4>
            <p className="sm:text-md bg-text-secondary dark:bg-background-color flex items-center justify-center rounded-md px-2 text-xs">
              {user.role === "user" ? "notEnrolled" : user.role}
            </p>
          </div>
          <div className="max-w-[180px] sm:max-w-none">
            <p className="overflow-hidden text-ellipsis text-xs md:text-sm">
              @{user.email}
            </p>
          </div>
          <p className="text-xs md:text-sm">{user.phoneNo}</p>
        </div>
      </div>
      <div className="flex justify-start gap-1">
        <Link href={`users/profile/${user.id}`} className="h-full">
          <Button className="user-card_btn !h-full">View</Button>
        </Link>

        {/* Community members view */}
        {!user.isSuperAdmin &&
          viewer.id !== user.id &&
          viewer.role === "admin" &&
          user.role === "student" && (
            // Remove user from community if viewer is moderator
            <JoinOrLeave
              onActionCallback={user.isBanned ? unBanUser : banUser}
              memberId={user.userId}
              memberRole={user.role}
              action={user.isBanned ? "unBan" : "ban"}
            />
          )}
        {/* teacher promotion */}
        {!user.isSuperAdmin &&
          viewer.id !== user.id &&
          viewer.role === "admin" &&
          user.role !== "student" &&
          user.role !== "admin" && (
            // Promote/Demote user to/from moderator if viewer is moderator
            <JoinOrLeave
              onActionCallback={user.role === "teacher" ? toUser : toTeacher}
              memberId={user.userId}
              memberRole={user.role}
              action={user.role === "teacher" ? "toUser" : "toTeacher"}
            />
          )}
        {!user.isSuperAdmin &&
          viewer.id !== user.id &&
          viewer.role === "admin" &&
          user.role !== "student" && (
            // Promote/Demote user to/from moderator if viewer is moderator
            <JoinOrLeave
              onActionCallback={user.role === "admin" ? toUser : toAdmin}
              memberId={user.userId}
              memberRole={user.role}
              action={user.role === "admin" ? "toUser" : "toAdmin"}
            />
          )}
      </div>
    </article>
  )
}

export default UserCard
