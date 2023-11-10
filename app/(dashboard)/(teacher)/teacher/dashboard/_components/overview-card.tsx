"use client"

import React from "react"

import { monthData } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import ChartTypePicker from "./chart-type-picker"
import ChartYAxisPicker from "./chart-y-axis-picker"
import { Overview } from "./overview"

const OverviewCard = ({ data }: { data: monthData[] }) => {
  const [chartYAxis, setChartYAxis] =
    React.useState<Exclude<keyof monthData, "name">>("price")
  const [chartType, setChartType] = React.useState("bar")
  return (
    <Card className="col-span-4 md:max-w-none">
      <CardHeader className="sm:!flex sm:!flex-row sm:items-center sm:!justify-between sm:gap-5">
        <CardTitle className="!w-fit">Overview</CardTitle>
        <div className="flex w-full max-w-4xl gap-1">
          <ChartYAxisPicker
            chartYAxis={chartYAxis}
            setChartYAxis={setChartYAxis}
          />
          <ChartTypePicker chartType={chartType} setChartType={setChartType} />
        </div>
      </CardHeader>
      <CardContent className="pl-2">
        <Overview
          data={data.map((d) => ({ name: d.name, total: d[chartYAxis] }))}
          typeOfChart={chartType}
          price={chartYAxis === "price"}
        />
      </CardContent>
    </Card>
  )
}

export default OverviewCard
