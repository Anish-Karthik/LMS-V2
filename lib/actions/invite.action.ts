import { db } from "../db"
import { sendmail } from "../mailing/mailer"
import { toAdmin, toTeacher } from "./server/user.server.action"

export type CreateOrUpdateInviteProps = {
  id?: string
  invite: string
  uses: number
  expiresAt?: Date
  userId: string
  role: string
}

export const createOrUpdateInvite = async ({
  id,
  invite,
  uses,
  expiresAt,
  userId,
  role,
}: CreateOrUpdateInviteProps) => {
  try {
    const adminInfo = await db.admin.findUnique({
      where: { userId },
    })
    if (!adminInfo) {
      throw new Error("User not found")
    }

    if (id) {
      const inviteLink = await db.invite.findUnique({
        where: { id },
      })
      if (inviteLink) {
        return db.invite.update({
          where: { id: inviteLink.id },
          data: {
            invite,
            uses,
            expiresAt,
            role,
          },
        })
      }
    }

    const inviteLink = await db.invite.create({
      data: {
        userId,
        invite,
        uses: uses,
        expiresAt:
          expiresAt ?? new Date(Date.now() + 1000 * 60 * 60 * 24 * 30 * 1),
        adminId: adminInfo.id,
        role,
      },
    })

    await db.admin.update({
      where: {
        userId,
      },
      data: {
        invites: {
          connect: {
            id: inviteLink.id,
          },
        },
      },
    })

    return invite
  } catch (error: any) {
    console.error(error.message)
    throw new Error(error.message)
  }
}

export const isUniqueInvite = async (invite: string) => {
  try {
    const inviteLink = await db.invite.findUnique({
      where: { invite },
    })
    return !!!inviteLink
  } catch (error: any) {
    console.error(error.message)
    throw new Error(error)
  }
}

export const getInviteByInvite = async (invite: string) => {
  try {
    const inviteLink = await db.invite.findUnique({
      where: { invite },
    })
    if (!inviteLink) {
      throw new Error("Invite not found")
    }
    return inviteLink
  } catch (error: any) {
    console.error(error.message)
    throw new Error(error)
  }
}

export const acceptInvite = async (invite: string, userId: string) => {
  try {
    const inviteLink = await db.invite.findUnique({
      where: { invite },
    })
    if (!inviteLink) {
      throw new Error("Invite not found")
    }
    if (inviteLink.uses <= 0) {
      throw new Error("Invite Link Limit Reached")
    }
    if (inviteLink.expiresAt && inviteLink.expiresAt < new Date()) {
      throw new Error("Invite Link Expired")
    }

    const creatorInfo = await db.user.findFirst({
      where: {
        admin: {
          invites: {
            some: {
              id: inviteLink.id,
            },
          },
        },
      },
    })

    if (!creatorInfo) {
      throw new Error("Admin not found")
    }

    const userInfo = await db.user.findUnique({
      where: { userId },
    })
    if (!userInfo) {
      throw new Error("User not found")
    }

    if (inviteLink.role === "admin") {
      await toAdmin(userId)
    } else {
      await toTeacher(userId)
    }
    sendmail({
      to: [creatorInfo.email],
      subject: "Invite Accepted",
      html: `<p>${userInfo.name} with email Id ${userInfo.email} has accepted your invite for the role ${inviteLink.role}</p>`,
    })
    return inviteLink
  } catch (error: any) {
    console.error(error.message)
    throw new Error(error)
  }
}
