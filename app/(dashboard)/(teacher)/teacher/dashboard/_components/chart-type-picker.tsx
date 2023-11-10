"use client"

import React from "react"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const ChartTypePicker = ({
  chartType,
  setChartType,
}: {
  chartType: string
  setChartType: (value: string) => void
}) => {
  return (
    <Select
      onValueChange={(value) => setChartType(value)}
      defaultValue={chartType}
    >
      <SelectTrigger>
        <SelectValue placeholder="Bar or Line" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="bar">Bar</SelectItem>
        <SelectItem value="line">Line</SelectItem>
      </SelectContent>
    </Select>
  )
}

export default ChartTypePicker
