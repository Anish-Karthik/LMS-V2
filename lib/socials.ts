import {
  Facebook,
  Github,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  Twitter,
} from "lucide-react"

export const socials = [
  {
    id: 1,
    title: "Facebook",
    href: process.env.MAIL_USER!,
    icon: Facebook,
    alt: "Facebook Icon",
  },
  {
    id: 2,
    title: "Instagram",
    href: process.env.INSTAGRAM!,
    icon: Instagram,
    alt: "Instagram Icon",
  },
  {
    id: 3,
    title: "Phone",
    href: `tel:${process.env.PHONE!}`,

    icon: Phone,
    alt: "Phone Icon",
  },
  {
    id: 4,
    title: "Linkedin",
    href: process.env.LINKEDIN!,

    icon: Linkedin,
    alt: "Linkedin Icon",
  },
  {
    id: 5,
    title: "Github",
    href: process.env.GITHUB!,
    icon: Github,
    alt: "Github Icon",
  },
  {
    id: 6,
    title: "Mail Me",
    href: process.env.EMAIL!,
    icon: Mail,
    alt: "Email Icon",
  },
  {
    id: 7,
    title: "Twitter",
    href: process.env.TWITTER!,
    icon: Twitter,
    alt: "Twitter Icon",
  },
]
