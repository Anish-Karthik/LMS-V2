import { clsx, type ClassValue } from "clsx"
import { ICity, ICountry, IState } from "country-state-city"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function isBase64Image(imageData: string) {
  const base64Regex = /^data:image\/(png|jpe?g|gif|webp);base64,/
  return base64Regex.test(imageData)
}

export type OnboardingType = {
  name: string
  email: string
  phoneNo: string
  dob: string
  gender: string
  country: string
  state: string
  city: string
  employmentStatus: string
  howDidHear: string
  ICountry: ICountry | null
  IState: IState | null
  ICity: ICity | null
  image: string
  userId: string
}
export type ObjectType = {
  [key: string]: string
}

export function callOnce(fn: () => void, delay: number) {
  let called = false

  return function () {
    if (!called) {
      fn()
      called = true

      setTimeout(() => {
        called = false
      }, delay + 1000)
    }
  }
}
export const emptyState: IState = {
  name: "None",
  isoCode: "",
  countryCode: "",
}
export const emptyCity: ICity = {
  name: "None",
  stateCode: "",
  countryCode: "",
}

export const selectClassNames = {
  container: () =>
    "bg-background border-2 border-secondary border-solid rounded-md text-primary",
  control: () => "pl-2",
  menuList: () =>
    "bg-background z-20 border-2 border-gray border-solid rounded-md",
  option: (state: any) =>
    cn(
      "bg-background p-1",
      state.isSelected && "!bg-foreground font-bold !text-black",
      state.isFocused && "bg-slate-400 font-bold !text-black"
    ),
  indicatorSeparator: () => "bg-slate-800 mr-2 my-2",
  dropdownIndicator: () => "text-slate-800 pr-2",
}

export const mapDateToMonthYear = (date: Date) => {
  return `${mapMonthToName(date.getMonth())} ${date.getFullYear()}`
}
export const mapMonthToName = (month: number) => {
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
export type monthData = {
  name: ReturnType<typeof mapDateToMonthYear>
  price: number
  promo: number
  referred: number
  sales: number
}

// export function checkImage(url: string) : boolean{
//   var image = new Image();
//   let res = false;
//   image.onload = function() {
//     if (this.width > 0) {
//       console.log("image exists");
//       res = true;
//     }
//   }
//   image.onerror = function() {
//     console.log("image doesn't exist");
//     res = false;
//   }
//   image.src = url;

//   return res;
// }

export async function checkImageAsync(url: string) {
  const res = await fetch(url)
  const buff = await res.blob()
  const ans = buff.type.startsWith("image/")
  console.log(ans)
  return ans
}

export function checkImage(url: string): boolean {
  const fileFormatsmages = [
    ".jpg",
    ".jpeg",
    ".png",
    ".gif",
    ".svg",
    ".webp",
    ".bmp",
    ".tiff",
  ]
  const ext = url.substring(url.lastIndexOf("."))
  return fileFormatsmages.includes(ext)
}
