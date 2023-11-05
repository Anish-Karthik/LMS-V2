"use client"

import Image from "next/image"
import Link from "next/link"
import { WhatsApp } from "@mui/icons-material"
import {
  FacebookIcon,
  Link2Icon,
  LinkedinIcon,
  MailCheckIcon,
  MessageSquareIcon,
  TwitterIcon,
} from "lucide-react"
import toast from "react-hot-toast"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const ShareCard = ({ url }: { url: string }) => {
  const handleCopy = () => {
    try {
      navigator.clipboard.writeText(url)
      toast.success("Link copied")
    } catch (error) {
      toast.error("Failed to copy link")
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-[#68D597] text-[#310A3E] hover:bg-[#E32D57] hover:text-[#310A3E]">
          <div className="flex items-center gap-2">
            <p>Invite</p>
            <Image
              src="/assets/share.svg"
              alt="share"
              width={24}
              height={24}
              className="cursor-pointer object-contain text-[#68D597] "
            />
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-dark-2 text-light-2 max-w-[21rem] sm:max-w-sm">
        <DialogHeader className="!max-w-[18rem] sm:!max-w-[21rem]">
          <DialogTitle className="v text-heading4-medium mt-3">
            Share
          </DialogTitle>
          <DialogDescription className="">
            <div className="text-light-2 mt-3 flex flex-col gap-2 ">
              <section className="flex items-center justify-between ">
                <div className="flex !w-[60%] items-center justify-start gap-1">
                  <MessageSquareIcon />
                  <p className="!w-[80%] !overflow-hidden !overflow-ellipsis">
                    {url}
                  </p>
                </div>
                <div
                  className="flex cursor-pointer items-center justify-start gap-1 rounded-md bg-slate-500/20 p-1 hover:bg-slate-600/20"
                  onClick={handleCopy}
                >
                  <Link2Icon className="mr-2 h-4 w-4" />
                  <span className="text-small-medium">Copy Link</span>
                </div>
              </section>

              <section className="border-light-4 border"></section>

              <section>
                <div>Share with others</div>
                <div className="mt-3 grid grid-cols-5 gap-2">
                  <Link
                    href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
                  >
                    <div className="flex flex-col items-center justify-center gap-1 ">
                      <FacebookIcon />
                      <p className="text-tiny-medium">Facebook</p>
                    </div>
                  </Link>
                  <Link
                    href={`https://twitter.com/intent/tweet?text=&url=${url}`}
                  >
                    <div className="flex flex-col items-center justify-center gap-1 ">
                      <TwitterIcon />
                      <p className="text-tiny-medium">Twitter</p>
                    </div>
                  </Link>
                  <Link
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${url}`}
                  >
                    <div className="flex flex-col items-center justify-center gap-1 ">
                      <LinkedinIcon />
                      <p className="text-tiny-medium">LinkedIn</p>
                    </div>
                  </Link>

                  <Link href={`https://web.whatsapp.com/send?text=${url}`}>
                    <div className="flex flex-col items-center justify-center gap-1 ">
                      {/* <Image src={"/whatsapp.svg"} alt="whatsapp" /> */}
                      <WhatsApp />
                      <p className="text-tiny-medium">Whatsapp</p>
                    </div>
                  </Link>

                  <Link href={`mailto:?subject=&body=${url}`}>
                    <div className="flex flex-col items-center justify-center gap-1 ">
                      <MailCheckIcon />
                      <p className="text-tiny-medium">Email</p>
                    </div>
                  </Link>
                </div>
              </section>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default ShareCard
