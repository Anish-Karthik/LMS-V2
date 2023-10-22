import { Batch, Purchase, User } from "@prisma/client"

export interface NavItem {
  title: string
  href?: string
  disabled?: boolean
  external?: boolean
}

export type ComplexBatch = Batch & { purchases: (Purchase & { user: User })[] }
