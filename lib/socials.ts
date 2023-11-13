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
    title: "Facebook",
    href: process.env.FACEBOOK!,
    icon: Facebook,
    alt: "Facebook Icon",
  },
  {
    title: "Instagram",
    href: process.env.INSTAGRAM!,
    icon: Instagram,
    alt: "Instagram Icon",
  },
  {
    title: "Phone",
    href: `tel:${process.env.PHONE!}`,

    icon: Phone,
    alt: "Phone Icon",
  },
  {
    title: "Linkedin",
    href: process.env.LINKEDIN!,

    icon: Linkedin,
    alt: "Linkedin Icon",
  },
  {
    title: "Github",
    href: process.env.GITHUB!,

    icon: Github,
    alt: "Github Icon",
  },
  {
    title: "Mail Me",
    href: process.env.EMAIL!,

    icon: Mail,
    alt: "Email Icon",
  },
  {
    title: "Twitter",
    href: process.env.TWITTER!,

    icon: Twitter,
    alt: "Twitter Icon",
  },
]
