"use client"

import { monthData } from "@/lib/utils"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const ChartYAxisPicker = ({
  chartYAxis,
  setChartYAxis,
}: {
  chartYAxis: Exclude<keyof monthData, "name">
  setChartYAxis: (value: Exclude<keyof monthData, "name">) => void
}) => {
  return (
    <Select
      onValueChange={(value) =>
        setChartYAxis(value as Exclude<keyof monthData, "name">)
      }
      defaultValue={chartYAxis}
    >
      <SelectTrigger>
        <SelectValue placeholder="choose a type" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="price">Revenue</SelectItem>
        <SelectItem value="sales">Sales</SelectItem>
        <SelectItem value="promo">Promo</SelectItem>
        <SelectItem value="referred">Referrals</SelectItem>
      </SelectContent>
    </Select>
  )
}

export default ChartYAxisPicker
