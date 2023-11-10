import { redirect } from "next/navigation"
import { currentUser } from "@clerk/nextjs"
import { Purchase } from "@prisma/client"

import { KeysWithValsOfType } from "@/types/utils"
import { db } from "@/lib/db"
import { formatNumber, formatPrice, roundTo } from "@/lib/format"
import { mapDateToMonthYear, monthData } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import CurrentPathNavigator from "../../_components/current-pathname"
import { CalendarDateRangePicker } from "./_components/date-range-picker"
import OverviewCard from "./_components/overview-card"
import PromoPage from "./_components/promo-page"

const changeInPercent = (current: number, previous: number) => {
  if (current === previous) return 0
  if (previous === 0) return 100
  if (current === 0) return -100
  const change = current - previous
  return (change / previous) * 100
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

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: { from: string; to: string }
}) {
  const user = await currentUser()
  if (!user) {
    redirect("/sign-in")
    return <div>Redirecting...</div>
  }
  const promos = await db.promo.findMany({
    where: {
      type: "promo",
    },
  })
  const userInfo = await db.user.findUnique({
    where: {
      userId: user.id,
    },
  })
  if (!userInfo) redirect("/")
  if (userInfo.role === "teacher") {
    redirect("/teacher/announcements")
  }
  let startDate = new Date()
  let endDate = new Date()
  if (searchParams?.from) {
    startDate = new Date(searchParams.from)
  }
  if (searchParams?.to) {
    endDate = new Date(searchParams.to)
  }

  const yearlyPurchaseData = await db.purchase.findMany({
    where: {
      createdAt: {
        gte: startDate,
        lte: endDate,
      },
    },
  })
  const purchases = yearlyPurchaseData
  const currentMonthPurchaseData = await db.purchase.findMany({
    where: {
      createdAt: {
        gte: new Date(endDate.getFullYear(), endDate.getMonth(), 1),
        lte: new Date(endDate.getFullYear(), endDate.getMonth() + 1, 0),
      },
    },
  })
  const previousMonthPurchaseData = await db.purchase.findMany({
    where: {
      createdAt: {
        gte: new Date(endDate.getFullYear(), endDate.getMonth() - 1, 1),
        lte: new Date(endDate.getFullYear(), endDate.getMonth(), 0),
      },
    },
  })

  let monthlyPurchaseData: monthData[] = []
  // iterate through months from startDate to endDate
  for (
    let currentDate: Date = startDate;
    currentDate.getFullYear() < endDate.getFullYear() ||
    (currentDate.getFullYear() == endDate.getFullYear() &&
      currentDate.getMonth() <= endDate.getMonth());
    // increment month if month == 12 , then increment year
    currentDate.getMonth() == 11
      ? currentDate.setMonth(0) &&
        currentDate.setFullYear(currentDate.getFullYear() + 1)
      : currentDate.setMonth(currentDate.getMonth() + 1)
  ) {
    const monthYear = mapDateToMonthYear(currentDate)
    // if month is not in monthlyPurchaseData, add it
    if (!monthlyPurchaseData.find((p) => p.name === monthYear)) {
      monthlyPurchaseData.push({
        name: monthYear,
        price: 0,
        promo: 0,
        referred: 0,
        sales: 0,
      })
    }
    // add total of purchases in that month
    monthlyPurchaseData.forEach((monthData) => {
      const { name } = monthData
      const month = new Date(name)
      const year = month.getFullYear()
      const monthIndex = month.getMonth()

      const monthPurchases = yearlyPurchaseData.filter((purchase) => {
        const purchaseMonth = purchase.createdAt.getMonth()
        const purchaseYear = purchase.createdAt.getFullYear()
        return purchaseMonth === monthIndex && purchaseYear === year
      })

      monthData.price = monthPurchases.reduce(
        (acc, purchase) => acc + purchase.price,
        0
      )
      monthData.promo = monthPurchases.filter(
        (purchase) => purchase.promo
      ).length
      monthData.referred = monthPurchases.filter(
        (purchase) => purchase.referred
      ).length
      monthData.sales = monthPurchases.length
    })
  }
  return (
    <div>
      <CurrentPathNavigator />
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="md:no-wrap flex flex-wrap items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight max-md:pl-2">
            Dashboard
          </h2>
          <div className="sm:no-wrap flex flex-wrap items-center gap-2 space-x-2 ">
            {/* display endDate */}
            <div className="text-sm text-muted-foreground max-md:pl-2">
              Current Month: {searchParams?.to || ""}
            </div>
            <CalendarDateRangePicker />
            {/* <Button>Download</Button> */}
          </div>
        </div>
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
        <div className="flex flex-col gap-4 md:grid md:grid-cols-2 lg:grid-cols-7">
          <OverviewCard data={monthlyPurchaseData} />

          <PromoPage
            initialData={promos}
            userRole={userInfo.role}
            userId={user.id}
          />
        </div>
      </div>
    </div>
  )
}
