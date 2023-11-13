import {
  Book,
  HomeIcon,
  InfoIcon,
  MessageSquareIcon,
  MusicIcon,
  Newspaper,
  Pen,
  SettingsIcon,
  Speaker,
  User,
  VideoIcon,
} from "lucide-react"

// give type to routes
export type Trole = "admin" | "moderator" | "teacher" | "student"
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
    href: "/teacher/announcements",
    roles: ["admin", "moderator", "teacher", "student"],
  },
  {
    label: "Recordings",
    icon: VideoIcon,
    href: "/student/courses",
    color: "text-orange-700",
    bgColor: "bg-orange-500/10",
    roles: ["admin", "moderator", "teacher", "student"],
  },
  {
    label: "Analytics",
    icon: MusicIcon,
    href: "/teacher/analytics",
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
    roles: ["admin", "moderator", "teacher"],
  },
  {
    label: "Course Details",
    icon: Pen,
    href: "/teacher/courses",
    color: "text-white-500",
    bgColor: "bg-white-500/10",
    roles: ["admin", "moderator", "teacher"],
  },
  {
    label: "Approval",
    icon: MessageSquareIcon,
    href: "/teacher/approve",
    color: "text-white-500",
    bgColor: "bg-white-500/10",
    roles: ["admin", "moderator"],
  },
  {
    label: "Profile",
    icon: SettingsIcon,
    href: "/teacher/settings",
    color: "text-white-500",
    bgColor: "bg-white-500/10",
    roles: ["admin", "moderator", "teacher", "student"],
  },
]

export const sidebarLinksTeacher = [
  {
    imgUrl: "/assets/home.svg",
    icon: HomeIcon,
    route: "/teacher/dashboard",
    label: "Home",
    role: ["admin"],
  },
  {
    imgUrl: "/assets/community.svg",
    icon: User,
    route: "/teacher/users",
    label: "Users",
    role: ["admin"],
  },
  {
    imgUrl: "/assets/courses.svg",
    icon: Book,
    route: "/teacher/courses",
    label: "Products",
    role: ["teacher", "admin"],
  },
  {
    imgUrl: "/assets/reply.svg",
    icon: Speaker,
    route: "/teacher/announcements",
    label: "Announcements",
    role: ["teacher", "admin"],
  },
  {
    imgUrl: "/assets/edit.svg",
    icon: Pen,
    route: "/teacher/blog",
    label: "Blog",
    role: ["teacher", "admin"],
  },
  {
    imgUrl: "/assets/edit.svg",
    icon: SettingsIcon,
    route: "/teacher/settings",
    label: "Profile",
    role: ["teacher", "admin"],
  },
]
export const sidebarLinksTeacherMobile = [
  {
    imgUrl: "/assets/community.svg",
    icon: User,
    route: "/teacher/users",
    label: "Users",
    role: ["admin"],
  },
  {
    imgUrl: "/assets/courses.svg",
    icon: Book,
    route: "/teacher/courses",
    label: "Products",
    role: ["admin"],
  },
  {
    imgUrl: "/assets/home.svg",
    icon: HomeIcon,
    route: "/teacher/dashboard",
    label: "Home",
    role: ["teacher", "admin"],
  },
  {
    imgUrl: "/assets/reply.svg",
    icon: Newspaper,
    route: "/teacher/announcements",
    label: "Announcements",
    role: ["teacher", "admin"],
  },
  {
    imgUrl: "/assets/edit.svg",
    icon: Pen,
    route: "/teacher/blog",
    label: "Blog",
    role: ["teacher", "admin"],
  },
  {
    imgUrl: "/assets/edit.svg",
    icon: SettingsIcon,
    route: "/teacher/settings",
    label: "Profile",
    role: ["teacher", "admin"],
  },
]

export const sidebarLinksStudentMobile = [
  {
    imgUrl: "/assets/courses.svg",
    icon: Book,
    route: "/student/courses",
    label: "Course",
  },
  {
    imgUrl: "/assets/reply.svg",
    icon: Newspaper,
    route: "/student/announcements",
    label: "Announcements",
  },
  {
    imgUrl: "/assets/edit.svg",
    icon: SettingsIcon,
    route: "/student/settings",
    label: "Profile",
  },
]

export const landingRoutes = [
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Contact",
    href: "/contact",
  },
  {
    label: "Blog",
    href: "/blog",
  },
  {
    label: "Testimonials",
    href: "/testimonials",
  },
]

export type TsideBar = typeof sidebarLinksTeacher

export const communityTabs = [
  { value: "batch 1", label: "batch 1", icon: "/assets/members.svg" },
  { value: "batch 2", label: "batch 2", icon: "/assets/members.svg" },
  { value: "batch 3", label: "batch 3", icon: "/assets/members.svg" },
  { value: "batch 4", label: "batch 4", icon: "/assets/members.svg" },
]

export const chapters = [
  {
    id: 1,
    title: "1. Introduction",
    isCompleted: true,
    subTopics: [
      {
        id: 1,
        title: "Introduction to the course",
        type: "video",
        videoUrl:
          "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      },
      {
        id: 2,
        title: "Introduction to the course",
        type: "video",
        videoUrl:
          "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      },
      {
        id: 3,
        title: "Introduction to the course",
        type: "video",
        videoUrl:
          "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      },
    ],
  },
  {
    id: 2,
    title: "2. What is Trading",
    isCompleted: false,
    subTopics: [
      {
        id: 1,
        title: "Introduction to trading",
        type: "video",
        videoUrl:
          "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      },
      {
        id: 2,
        title: "Why trading is important",
        type: "video",
        videoUrl:
          "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      },
      {
        id: 3,
        title: "Knowledge check 2.1",
        type: "quiz",
        quiz: [
          {
            question: "What is use of trading?",
            options: ["Earn", "Lose", "Nothing"],
          },
        ],
      },
    ],
  },
  {
    id: 3,
    title: "3. Why Trade",
    isCompleted: false,
    subTopics: [
      {
        id: 1,
        title: "Introduction to trading",
        type: "video",
        videoUrl:
          "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      },
      {
        id: 2,
        title: "Why trading is important",
        type: "lab",
        videoUrl:
          "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      },
      {
        id: 3,
        title: "Knowledge check 2.1",
        type: "assignment",
        quiz: [
          {
            question: "What is use of trading?",
            options: ["Earn", "Lose", "Nothing"],
          },
        ],
      },
    ],
  },
]
export type Tchapters = typeof chapters
