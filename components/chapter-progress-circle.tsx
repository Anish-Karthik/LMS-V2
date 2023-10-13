// write a circle progress bar in react

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export function CircleProgress({
  value,
  variant = "default",
  size = "default",
}: {
  value: number;
  variant?: "default" | "success";
  size?: "default" | "sm";
}) {
  const percentage = value;
  const strokeWidth = size === "sm" ? 8 : 10;
  const styles = buildStyles({
    strokeLinecap: "round",
    textSize: size === "sm" ? "26px" : "48px",
    pathTransitionDuration: 0.5,
    // 4 120 87 to hex is #007855
    pathColor: variant === "success" ? "#007855" : "#007855",
    textColor: variant === "success" ? "#007855" : "#007855",
    // darker green for trailColor are #00b300, #008000, #004d00, 
    trailColor:  "#006633",
    backgroundColor: "#006633",
  });

  return (
    <div style={{ width: size === "sm" ? 20 : 10 }}>
      <CircularProgressbar
        value={percentage}
        text={`${percentage}%`}
        strokeWidth={strokeWidth}
        styles={styles}
      />
    </div>
  );
}