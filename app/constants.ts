import {
  Code2Icon,
  CodeIcon,
  ImageIcon,
  InfoIcon,
  LayoutDashboardIcon,
  MessageSquareIcon,
  MusicIcon,
  SettingsIcon,
  VideoIcon,
} from "lucide-react"
import { type } from "os"

// give type to routes
export type Trole = "admin" | "moderator" | "teacher" | "user";
export interface Route {
  label: string
  icon: any
  color: string
  bgColor: string
  href: string
  roles: Trole[]
}
export const routes: Route[] = [
  // {
  //   label: "Dashboard",
  //   icon: LayoutDashboardIcon,
  //   color: "text-sky-500",
  //   bgColor: "bg-sky-500/10",
  //   href: "/dashboard",
  // },
  {
    label: "Announcements",
    icon: InfoIcon,
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
    href: "/annoucements",
    roles: ["admin", "moderator", "teacher", "user"],
  },
  {
    label: "Recordings",
    icon: VideoIcon,
    href: "/recordings",
    color: "text-orange-700",
    bgColor: "bg-orange-500/10",
    roles: ["admin", "moderator", "teacher", "user"],
  },
  {
    label: "Analytics",
    icon: MusicIcon,
    href: "/analytics",
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
    roles: ["admin", "moderator", "teacher"],
  },
  {
    label: "Settings",
    icon: SettingsIcon,
    href: "/settings",
    color: "text-white-500",
    bgColor: "bg-white-500/10",
    roles: ["admin", "moderator", "teacher", "user"],
  },
  {
    label: "Create a new batch",
    icon: ImageIcon,
    href: "/create-batch",
    color: "text-white-500",
    bgColor: "bg-white-500/10",
    roles: ["admin", "moderator", "teacher"],
  },
  {
    label: "Edit a batch",
    icon: ImageIcon,
    href: "/edit-batch",
    color: "text-white-500",
    bgColor: "bg-white-500/10",
    roles: ["admin", "moderator", "teacher"],
  },
]

export const communityTabs = [
  { value: "batch 1", label: "batch 1", icon: "/assets/members.svg" },
  { value: "batch 2", label: "batch 2", icon: "/assets/members.svg" },
  { value: "batch 3", label: "batch 3", icon: "/assets/members.svg" },
  { value: "batch 4", label: "batch 4", icon: "/assets/members.svg" },
]
