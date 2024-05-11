/* eslint-disable @next/next/no-page-custom-font */
import "@/styles/globals.css"
import React from "react"
import { Metadata } from "next"
import Head from "next/head"
import { ClerkProvider } from "@clerk/nextjs"
import { dark, neobrutalism } from "@clerk/themes"

import { siteConfig } from "@/config/site"
import { fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { Toaster } from "@/components/ui/toaster"
import { CloudinaryContext } from "@/components/providers/cloudinary-context"
import { ConfettiProvider } from "@/components/providers/confetti-provider"
import { ToastProvider } from "@/components/providers/toaster-provider"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeProvider } from "@/components/theme-provider"

import TRPCProvider from "./_trpc/Provider"

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
  },
}
export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <TRPCProvider>
        <html lang="en" suppressHydrationWarning>
          <head>
            <meta charSet="utf-8" />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link
              href="https://fonts.googleapis.com/css2?family=Orbitron&display=swap"
              rel="stylesheet"
            />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link
              href="https://fonts.googleapis.com/css2?family=ABeeZee:ital@0;1&family=Orbitron&display=swap"
              rel="stylesheet"
            />
          </head>
          <body
            className={cn(
              "bg-background min-h-screen font-sans antialiased",
              fontSans.variable
            )}
          >
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              forcedTheme="dark"
            >
              <ConfettiProvider />
              <ToastProvider />
              <Toaster />
              <CloudinaryContext>
                <div className="relative flex min-h-screen flex-col ">
                  {/* <SiteHeader /> */}
                  {children}
                </div>
              </CloudinaryContext>
              <TailwindIndicator />
            </ThemeProvider>
          </body>
        </html>
      </TRPCProvider>
    </ClerkProvider>
  )
}
