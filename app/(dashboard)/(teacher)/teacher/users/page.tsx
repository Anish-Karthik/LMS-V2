import React from "react"
import { currentUser } from "@clerk/nextjs"

import { getUser, getUsersWhoHaveRoles } from "@/lib/actions/user.actions"

import CurrentPathNavigator from "../../_components/current-pathname"
import CheckInput from "./_components/check-input"
import { SearchInput } from "./_components/search-input"
import UserCard from "./_components/user-card"

type Trole = "admins" | "teachers" | "students" | "users" | "notEnrolled"

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
    courseId: searchParams.courseId,
    batchId: searchParams.batchId,
    role: searchParams.role,
    searchText: searchParams.searchText,
  })
  // console.log(result);
  const role: Trole = (
    ["admin", "teacher", "student", "user", "notEnrolled"].includes(
      searchParams.role
    )
      ? searchParams.role + "s"
      : "users"
  ) as Trole

  const user = await currentUser()
  const userInfo = await getUser(user!.id)
  return (
    <div>
      <CurrentPathNavigator />
      <div className="flex flex-wrap items-center justify-start gap-3 px-6 pt-6 md:mb-0 md:flex-nowrap">
        <SearchInput />
        <CheckInput role={searchParams.role} name={"role"} />
        {/* <CheckInput batchId={searchParams.batchId} name={"batchIds"} /> 
        <CheckInput courseId={searchParams.courseId} name={"courseIds"} />  */}
      </div>
      <div className="mt-14 grid grid-cols-1 gap-5 p-5">
        {result.users.length === 0 ? (
          <p className="no-result">No users</p>
        ) : (
          <>
            {/* @ts-ignore */}
            {result?.[role].map((person) => (
              <UserCard key={person.id} user={person} viewer={userInfo!} />
            ))}
          </>
        )}
      </div>
    </div>
  )
}

export default page
