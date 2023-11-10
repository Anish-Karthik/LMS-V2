import Link from "next/link"
import { ArrowDownIcon } from "lucide-react"

import { Button } from "../ui/button"

const ButtonCard = ({
  scrollTo = "#id",
  text = "",
  isPurchase = false,
}: {
  scrollTo?: string
  text?: string
  isPurchase?: boolean
}) => {
  return (
    <div className="max-w-2xl">
      <Link href={scrollTo} className="">
        <Button
          variant={"none"}
          size={"lg"}
          className="shadow-2xl-[red] relative rounded-sm bg-primary-color bg-gradient-to-r from-indigo-500 p-7 text-2xl text-text-primary"
        >
          <div className="flex items-center gap-2">
            {text}
            {!isPurchase && <ArrowDownIcon width={25} />}
          </div>
          <div className="absolute -bottom-1 -right-1.5 -z-50 flex h-[52px] w-full rounded-[5px] bg-white"></div>
        </Button>
      </Link>
    </div>
  )
}

export default ButtonCard
