import Link from "next/link"
import { ArrowDownIcon } from "lucide-react"

import { Button } from "../../../../components/ui/button"

const ButtonCard = ({
  scrollTo = "#id",
  text = "",
  isPurchase = false,
  arrowIcon = <ArrowDownIcon width={25} />,
}: {
  arrowIcon?: React.ReactNode
  scrollTo?: string
  text?: string
  isPurchase?: boolean
}) => {
  return (
    <div className="max-w-2xl">
      <Link href={scrollTo} className="">
        {/* <Button
          variant={"none"}
          size={"lg"}
          className="shadow-2xl-[red] bg-primary-color text-text-primary relative rounded-sm bg-gradient-to-r from-indigo-500 p-7 text-2xl"
        > */}
        <button className="relative p-[3px]">
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500" />
          <div className="group relative  rounded-[6px] bg-black  px-8 py-2 text-white transition duration-200 hover:bg-transparent">
            <div className="flex items-center gap-2">
              {text}
              {!isPurchase && arrowIcon}
            </div>
            {/* <div className="absolute -bottom-1 -right-1.5 -z-50 flex h-[52px] w-full rounded-[5px] bg-gradient-to-r from-indigo-500 to-purple-500"></div> */}
          </div>
        </button>
      </Link>
    </div>
  )
}

export default ButtonCard
