"use client"

import React from "react"
import { Promo } from "@prisma/client"
import { Bitcoin, CoinsIcon, Copy } from "lucide-react"
import { toast } from "react-hot-toast"

import { Button } from "../ui/button"
import ShareCard from "./share-card"

const ReferralCard = ({
  promo,
  referralBonus,
  referralCount,
  coins,
}: {
  promo: Promo | null
  referralBonus: number
  referralCount: number
  coins: number
}) => {
  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(`${promo?.code}`)
    toast.success("Copied to clipboard")
  }
  const url = `${window.location.host}/purchase?promo=${promo?.code}`

  const copyToClipboardLink = async () => {
    await navigator.clipboard.writeText(url)
    toast.success("Copied to clipboard")
  }

  return (
    <div className="flex h-full flex-col rounded-lg bg-[#323232] p-4 max-md:w-full">
      <div className="mt-4 flex flex-row gap-4">
        <div className="flex gap-1">
          <p className="text-sm text-[#FAF8F1]">Referral Code</p>
        </div>
        <div className="flex gap-1">
          <div className="flex flex-row gap-2">
            <p className="text-sm text-[#FAF8F1]">{promo?.code}</p>
            <button
              title="copy"
              type="button"
              className="rounded-sm p-1 hover:bg-[#E32D57]"
              onClick={copyToClipboard}
            >
              <Copy className="bg-transparent" width={16} height={16} />
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-4">
        <div className="flex flex-col gap-1">
          <p className="text-sm text-[#FAF8F1]">
            Referral Link &#8203; &#8203;
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex flex-row gap-2">
            <p className="text-sm text-[#FAF8F1]">
              {url.substring(0, 12) + "..."}
            </p>
            <button
              title="copy"
              type="button"
              className="rounded-sm p-1 hover:bg-[#E32D57]"
              onClick={copyToClipboardLink}
            >
              <Copy className="bg-transparent" width={16} height={16} />
            </button>
          </div>
        </div>
      </div>
      <div className="mt-4 flex flex-row gap-4">
        <div className="flex gap-1">
          <p className="text-sm text-[#FAF8F1]">Referral Bonus</p>
        </div>
        <div className="flex gap-1">
          <p className="text-sm text-[#FAF8F1]">{referralBonus}</p>
          <CoinsIcon className="text-[#FDB900]" width={16} height={16} />
        </div>
      </div>
      <div className="mt-4 flex flex-row gap-4">
        <div className="flex gap-1">
          <p className="text-sm text-[#FAF8F1]">Referral Count</p>
        </div>
        <div className="flex gap-1">
          <p className="text-sm text-[#FAF8F1]">{referralCount}</p>
        </div>
      </div>
      <div className="mt-4 flex gap-4">
        <div className="flex gap-1">
          <p className="text-sm text-[#FAF8F1]">Coins</p>
        </div>
        <div className="flex gap-1">
          <p className="text-sm text-[#FAF8F1]">{coins}</p>
          <CoinsIcon className="text-[#FDB900]" width={16} height={16} />
        </div>
      </div>
      <div className="mt-4 flex flex-row gap-4">
        <Button className="bg-[#FDB900] text-[#310A3E] hover:bg-[#76DDEA] hover:text-[#310A3E]">
          Redeem
        </Button>
        <ShareCard url={url} />
      </div>
    </div>
  )
}

export default ReferralCard
