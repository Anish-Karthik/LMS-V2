"use client"

import {
  Bar,
  BarChart,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts"

import { formatPrice } from "@/lib/format"

export function Overview({
  data,
  typeOfChart = "bar",
  price = false,
}: {
  data: {
    name: string
    total: number
  }[]
  typeOfChart?: string
  price?: boolean
}) {
  const commonXAxis = (
    <XAxis
      dataKey="name"
      stroke="#888888"
      fontSize={12}
      tickLine={false}
      axisLine={false}
    />
  )
  const minTotal = Math.min(...data.map((item) => item.total))
  const maxTotal = Math.max(...data.map((item) => item.total))
  const domain = [Math.floor(minTotal), Math.ceil(maxTotal)]
  const commonYAxis = (
    <YAxis
      stroke="#888888"
      fontSize={12}
      tickLine={false}
      axisLine={false}
      domain={domain}
      tickFormatter={(value) =>
        price ? formatPrice(value).replace(".00", "") : value
      }
    />
  )
  return (
    <ResponsiveContainer width="100%" height={350}>
      {typeOfChart === "bar" ? (
        <BarChart data={data}>
          {commonXAxis}
          {commonYAxis}
          <Bar dataKey="total" fill="#adfa1d" radius={[4, 4, 0, 0]} />
        </BarChart>
      ) : (
        <LineChart data={data}>
          {commonXAxis}
          {commonYAxis}
          <Line type="monotone" dataKey="total" stroke="#8884d8" />
        </LineChart>
      )}
    </ResponsiveContainer>
  )
}
// <Bar dataKey="total" fill="#adfa1d" radius={[4, 4, 0, 0]} />
// <Line type="monotone" dataKey="total" stroke="#8884d8" />
