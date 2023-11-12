"use server"

import { db } from "@/lib/db"

import {
  CreateOrUpdateInviteProps,
  createOrUpdateInvite,
  getInviteByInvite,
  isUniqueInvite,
} from "../invite.action"

export const createOrUpdateInviteClient = async ({
  id,
  invite,
  uses,
  expiresAt,
  userId,
  role,
}: CreateOrUpdateInviteProps) => {
  return createOrUpdateInvite({
    id,
    invite,
    uses,
    expiresAt,
    userId,
    role,
  })
}

export async function isUniqueInviteClient(invite: string) {
  return await isUniqueInvite(invite)
}

export const isValidInvite = async (invite: string) => {
  try {
    const inviteLink = await db.invite.findUnique({
      where: { invite },
    })
    if (!inviteLink) {
      return false
    }
    return true
  } catch (error: any) {
    console.error(error.message)
    throw new Error(error)
  }
}

export const isInviteExpired = async (invite: string) => {
  try {
    const inviteLink = await db.invite.findUnique({
      where: { invite },
    })
    if (!inviteLink) {
      return false
    }
    if (inviteLink.expiresAt && inviteLink.expiresAt < new Date()) {
      return true
    }
    return false
  } catch (error: any) {
    console.error(error.message)
    throw new Error(error)
  }
}

export const getInviteByInviteClient = async (invite: string) => {
  return await getInviteByInvite(invite)
}
