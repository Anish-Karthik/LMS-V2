import { randomInt } from "crypto"

export const gradients = [
  {
    id: "orange",
    colors: ["#FF7170", "#FFE57F"],
  },
  {
    id: "blue",
    colors: ["#4C73FF", "#389BFF"],
  },
  {
    id: "pink",
    colors: ["#FF4CC2", "#F87393"],
  },
  {
    id: "green",
    colors: ["#7AFFD7", "#00FFB2"],
  },
  {
    id: "gold",
    colors: ["#FF7170", "#FFE57F"],
  },
  {
    id: "purple",
    colors: ["#854CFF", "#B673F8"],
  },
]
export const gradientStars = gradients.map((gradient) => (
  <linearGradient
    key={gradient.id}
    id={gradient.id}
    x1="2.55563"
    y1="10.5169"
    x2="88.9626"
    y2="10.5169"
    gradientUnits="userSpaceOnUse"
  >
    <animate
      attributeName="x1"
      dur="1.8s"
      values="80%; 0%; 80%"
      calcMode="spline"
      keySplines="0.4 0 0.6 1; 0.4 0 0.6 1"
      repeatCount="indefinite"
    ></animate>
    {gradient.colors.map((color, index) => (
      <stop key={index} stop-color={color}></stop>
    ))}
  </linearGradient>
))
export const colors = ["red", "pink", "purple", "blue", "green", "orange"]

export function getStars(color: string) {
  return [
    <path
      d="M5.35352 18.3333L6.70768 12.4792L2.16602 8.54167L8.16602 8.02083L10.4993 2.5L12.8327 8.02083L18.8327 8.54167L14.291 12.4792L15.6452 18.3333L10.4993 15.2292L5.35352 18.3333Z"
      fill={`url(#${color})`}
    ></path>,
    <path
      d="M25.35352 18.3333L26.70768 12.4792L22.16602 8.54167L28.16602 8.02083L30.4993 2.5L32.8327 8.02083L38.8327 8.54167L34.291 12.4792L35.6452 18.3333L30.4993 15.2292L25.35352 18.3333Z"
      fill={`url(#${color})`}
    ></path>,
    <path
      d="M45.35352 18.3333L46.70768 12.4792L42.16602 8.54167L48.16602 8.02083L50.4993 2.5L52.8327 8.02083L58.8327 8.54167L54.291 12.4792L55.6452 18.3333L50.4993 15.2292L45.35352 18.3333Z"
      fill={`url(#${color})`}
    ></path>,
    <path
      d="M65.35352 18.3333L66.70768 12.4792L62.16602 8.54167L68.16602 8.02083L70.4993 2.5L72.8327 8.02083L78.8327 8.54167L74.291 12.4792L75.6452 18.3333L70.4993 15.2292L65.35352 18.3333Z"
      fill={`url(#${color})`}
    ></path>,
    <path
      d="M85.35352 18.3333L86.70768 12.4792L82.16602 8.54167L88.16602 8.02083L90.4993 2.5L92.8327 8.02083L98.8327 8.54167L94.291 12.4792L95.6452 18.3333L90.4993 15.2292L85.35352 18.3333Z"
      fill={`url(#${color})`}
    ></path>,
  ]
}

export function getSvg(starCount: number, number?: number) {
  const num = number || randomInt(0, colors.length - 1)
  const stars = getStars(colors[num % colors.length])
  return (
    <svg
      width="101"
      height="20"
      viewBox="0 0 101 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {stars.slice(0, starCount).map((star) => star)}
      <defs>{gradientStars.map((gradientStar) => gradientStar)}</defs>
    </svg>
  )
}
