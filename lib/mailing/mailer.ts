"use server"

import nodemailer from "nodemailer"

const sender = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
})

export async function sendmail({
  from,
  to,
  subject,
  text,
  html,
}: {
  from?: string
  to: string[]
  subject?: string
  text?: string
  html?: any
}) {
  const info = await sender.sendMail({
    from: from || process.env.MAIL_USER,
    to,
    subject,
    text,
    html,
  })
  console.log("Message sent: %s", info.messageId)
}
