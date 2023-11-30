import { Promo } from "@prisma/client"
import { atom } from "recoil"

export const promosState = atom<Promo[]>({
  key: "promosState",
  default: [],
})
