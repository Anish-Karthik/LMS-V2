// write a circle progress bar in react

import { CircularProgressbar, buildStyles } from "react-circular-progressbar"

import "react-circular-progressbar/dist/styles.css"

export function CircleProgress({
  value,
  variant = "success",
  size = "default",
}: {
  value: number
  variant?: "default" | "success"
  size?: "default" | "sm"
}) {
  const percentage = value
  const strokeWidth = size === "sm" ? 8 : 10
  const styles = buildStyles({
    strokeLinecap: "round",
    textSize: size === "sm" ? "36px" : "48px",
    pathTransitionDuration: 1.5,
    // 4 120 87 to hex is #007855
    pathColor: variant === "success" ? "#007855" : "#77ff7a",
    textColor: variant === "success" ? "#007855" : "#687855",
    // darker green for trailColor are #00b300, #008000, #004d00,
    trailColor: "#007855",
    backgroundColor: "#ff0000",
  })

  return (
    <div style={{ width: size === "sm" ? 24 : 10 }}>
      <CircularProgressbar
        value={percentage}
        text={`${percentage}%`}
        strokeWidth={strokeWidth}
        styles={styles}
      />
    </div>
  )
}
