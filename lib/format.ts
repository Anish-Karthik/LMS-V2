export const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "INR",
  }).format(price)
}
export const roundTo = (num: number, precision: number = 2) => {
  const factor = Math.pow(10, precision)
  return Math.round(num * factor) / factor
}

export const formatNumber = (
  num: number,
  standard?: "Indian" | "International"
) => {
  if (standard === "International") {
    return new Intl.NumberFormat("en-US").format(num)
  }
  return new Intl.NumberFormat("en-IN").format(num)
}

export const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
  }).format(new Date(date))
}

export const randomString = (size: number) => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  const randomChars = [...Array(size)].map(
    (_) => characters[Math.floor(Math.random() * characters.length)]
  )
  return randomChars.join("")
}

export const formatDate_YYYYMMDD = (date: Date) => {
  // need date format in yyyy-mm-dd format with leading zeros if necessary
  const d = new Date(date)
  const year = d.getFullYear()
  const month = d.getMonth() + 1
  const day = d.getDate()
  const monthString = month < 10 ? `0${month}` : `${month}`
  const dayString = day < 10 ? `0${day}` : `${day}`

  return `${year}-${monthString}-${dayString}`
}
