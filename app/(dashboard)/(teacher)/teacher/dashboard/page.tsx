import { Metadata } from "next"
import { redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs"
import { Purchase } from "@prisma/client"

import { KeysWithValsOfType } from "@/types/utils"
import { db } from "@/lib/db"
import { formatNumber, formatPrice, roundTo } from "@/lib/format"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import CurrentPathNavigator from "../../_components/current-pathname"
import { CalendarDateRangePicker } from "./_components/date-range-picker"
import { Overview } from "./_components/overview"
import PromoPage from "./_components/promo-page"

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Example dashboard app built using the components.",
}
const changeInPercent = (current: number, previous: number) => {
  const change = current - previous
  return previous ? (change / previous) * 100 : 0
}
const changeInPercentSigned = (current: number, previous: number) => {
  const change = current - previous
  return change >= 0
    ? `+${formatNumber(roundTo(changeInPercent(current, previous)))}%`
    : `${formatNumber(roundTo(changeInPercent(current, previous)))}%`
}
const sumOfPurchases = (
  purchases: Purchase[],
  onField: KeysWithValsOfType<Purchase, number | boolean>
) => {
  return purchases.reduce((acc, purchase) => {
    if (typeof purchase[onField] == "number") {
      acc += purchase[onField] as number
    } else {
      acc += purchase[onField] ? 1 : 0
    }
    return acc
  }, 0)
}
const mapMonthToName = (month: number) => {
  switch (month) {
    case 0:
      return "Jan"
    case 1:
      return "Feb"
    case 2:
      return "Mar"
    case 3:
      return "Apr"
    case 4:
      return "May"
    case 5:
      return "Jun"
    case 6:
      return "Jul"
    case 7:
      return "Aug"
    case 8:
      return "Sep"
    case 9:
      return "Oct"
    case 10:
      return "Nov"
    default:
      return "Dec"
  }
}

export default async function DashboardPage() {
  const promos = await db.promo.findMany({
    where: {
      type: "promo",
    },
  })
  const user = await currentUser()
  const userInfo = await db.user.findUnique({
    where: {
      userId: user?.id,
    },
  })
  if (!userInfo || !user) redirect("/sign-in")
  if (userInfo.role === "teacher") {
    redirect("/teacher/announcements")
  }
  const purchases = await db.purchase.findMany()

  const yearlyPurchaseData = await db.purchase.findMany({
    where: {
      createdAt: {
        gte: new Date(new Date().getFullYear(), 0, 1),
        lte: new Date(new Date().getFullYear(), 11, 31),
      },
    },
  })
  const currentMonthPurchaseData = await db.purchase.findMany({
    where: {
      createdAt: {
        gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        lte: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
      },
    },
  })
  const previousMonthPurchaseData = await db.purchase.findMany({
    where: {
      createdAt: {
        gte: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1),
        lte: new Date(new Date().getFullYear(), new Date().getMonth(), 0),
      },
    },
  })
  type monthData = {
    name: ReturnType<typeof mapMonthToName>
    total: number
  }
  const monthlyPurchaseData: monthData[] = yearlyPurchaseData.reduce(
    (acc: monthData[], purchase) => {
      const month = purchase.createdAt.getMonth()
      if (!acc[month]) {
        acc[month] = {
          name: mapMonthToName(month),
          total: 0,
        }
      }
      acc[month].total += purchase.price
      return acc
    },
    []
  )
  // replace undefined values with default values of type monthData
  for (let index = 0; index < 12; index++) {
    console.log(`monthlyPurchaseData[${index}]`, monthlyPurchaseData[index])
    if (!monthlyPurchaseData[index]) {
      monthlyPurchaseData[index] = {
        name: mapMonthToName(index),
        total: 0,
      }
    }
  }

  console.log(monthlyPurchaseData)
  return (
    <>
      <CurrentPathNavigator />
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="md:no-wrap flex flex-wrap items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <div className="sm:no-wrap flex flex-wrap items-center gap-2 space-x-2 ">
            <CalendarDateRangePicker />
            {/* <Button>Download</Button> */}
          </div>
        </div>
        {/* <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics" disabled>
            Analytics
          </TabsTrigger>
          <TabsTrigger value="reports" disabled>
            Reports
          </TabsTrigger>
          <TabsTrigger value="notifications" disabled>
            Notifications
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4"> */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatPrice(sumOfPurchases(purchases, "price"))}
              </div>
              <p className="text-xs text-muted-foreground">
                {changeInPercentSigned(
                  sumOfPurchases(currentMonthPurchaseData, "price"),
                  sumOfPurchases(previousMonthPurchaseData, "price")
                )}{" "}
                from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <rect width="20" height="14" x="2" y="5" rx="2" />
                <path d="M2 10h20" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+{purchases.length}</div>
              <p className="text-xs text-muted-foreground">
                {changeInPercentSigned(
                  currentMonthPurchaseData.length,
                  previousMonthPurchaseData.length
                )}{" "}
                from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Promo Purchases
              </CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                +{formatNumber(sumOfPurchases(purchases, "promo"))}
              </div>
              <p className="text-xs text-muted-foreground">
                {changeInPercentSigned(
                  sumOfPurchases(currentMonthPurchaseData, "promo"),
                  sumOfPurchases(previousMonthPurchaseData, "promo")
                )}{" "}
                from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Referrals</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                +{formatNumber(sumOfPurchases(purchases, "referred"))}
              </div>
              <p className="text-xs text-muted-foreground">
                {changeInPercentSigned(
                  sumOfPurchases(currentMonthPurchaseData, "referred"),
                  sumOfPurchases(previousMonthPurchaseData, "referred")
                )}{" "}
                since last month
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4 max-w-[90vw] 2xs:max-w-[80vw]">
            <CardHeader>
              <CardTitle>Overview</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <Overview data={monthlyPurchaseData} />
            </CardContent>
          </Card>
          <Card className="col-span-3 max-w-[90vw] 2xs:max-w-[80vw]">
            <PromoPage
              initialData={promos}
              userRole={userInfo.role}
              userId={user.id}
            />
          </Card>
        </div>
        {/* </TabsContent>
      </Tabs> */}
      </div>
    </>
  )
}
