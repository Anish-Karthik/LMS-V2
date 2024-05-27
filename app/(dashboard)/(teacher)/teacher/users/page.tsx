import Link from "next/link"
import { redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs"

import { getUser, getUsersWhoHaveRoles } from "@/lib/actions/user.actions"
import { Button } from "@/components/ui/button"
import CurrentPathNavigator from "@/components/shared/current-pathname"

import CheckInput from "./_components/check-input"
import { SearchInput } from "./_components/search-input"
import UserCard from "./_components/user-card"

const page = async ({
  searchParams,
}: {
  searchParams: {
    courseId: string
    batchId: string
    role: string
    searchText: string
  }
}) => {
  // const courses = await
  const result = await getUsersWhoHaveRoles({
    courseId: searchParams?.courseId,
    batchId: searchParams?.batchId,
    role: searchParams?.role,
    searchText: searchParams?.searchText,
  })
  // console.log(result);

  const user = await currentUser()
  const userInfo = await getUser(user!.id)
  if (userInfo!.role === "teacher") {
    redirect("/teacher/announcements")
  }

  const resultSet = new Set(result.users.map((user) => user.id))
  const resultIds = result.users.map((user) => user.id)
  // console.log(resultIds)
  // console.log(resultSet)
  const userArr = Array.from(resultSet)
    .map((id) => result.users.find((user) => user!.id === id))
    .filter((a) => !!a)
    .sort((a, b) => {
      if (a!.createdAt < b!.createdAt) {
        return 1
      } else {
        return -1
      }
    })
  const userArrWithoutCurrent = userArr.filter((a) => a!.id !== userInfo!.id)

  // sort result array by created date
  const resultArr = [
    ...userArr.filter((a) => !!a).filter((a) => a!.id === userInfo!.id),
    ...userArrWithoutCurrent.filter(
      (a) =>
        a!.role !== "admin" && a!.role !== "teacher" && a!.role !== "student"
    ),
    ...userArrWithoutCurrent.filter(
      (a) => a!.role === "student" && a!.isBanned
    ),
    ...userArrWithoutCurrent.filter(
      (a) => a!.role === "student" && !a!.isBanned
    ),
    ...userArrWithoutCurrent.filter((a) => a!.role === "admin"),
    ...userArrWithoutCurrent.filter((a) => a!.role === "teacher"),
  ].filter((a) => !!a)

  // console.log(resultArr)
  return (
    <div>
      <CurrentPathNavigator />
      <div className="flex flex-wrap items-center justify-between gap-3 px-6 pt-6 sm:flex-nowrap md:mb-0">
        <div className="flex flex-wrap items-center justify-start gap-3 px-6 pt-6 md:mb-0 md:flex-nowrap">
          <SearchInput />
        </div>
        <div className="flex w-full items-center gap-2 px-6 pt-6 max-sm:justify-start sm:justify-end md:mb-0 md:justify-between">
          <CheckInput role={searchParams?.role || "all"} name={"role"} />
          <Link href="/teacher/users/invite">
            <Button className="!h-full">Invite User</Button>
          </Link>
        </div>
      </div>
      <div className="mt-14 grid grid-cols-1 gap-5 p-5">
        {resultArr.length === 0 ? (
          <p className="no-result mx-auto">No users</p>
        ) : (
          <>
            {resultArr.map((person) => (
              <UserCard key={person!.id} user={person!} viewer={userInfo!} />
            ))}
          </>
        )}
      </div>
    </div>
  )
}

export default page
