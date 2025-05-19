import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

import { Button } from "@/components/ui/button"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-purple-900/20 backdrop-blur-lg">
      <div className="container flex h-16 items-center px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-600"></div>
          <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-xl font-bold text-transparent">
            Clovers
          </span>
        </Link>

        <nav className="ml-auto hidden gap-6 md:flex">
          <Link
            href="#features"
            className="text-sm font-medium text-purple-200 transition-colors hover:text-pink-400"
          >
            Features
          </Link>
          <Link
            href="#pricing"
            className="text-sm font-medium text-purple-200 transition-colors hover:text-pink-400"
          >
            Pricing
          </Link>
          <Link
            href="#testimonials"
            className="text-sm font-medium text-purple-200 transition-colors hover:text-pink-400"
          >
            Testimonials
          </Link>
          <Link
            href="#contact"
            className="text-sm font-medium text-purple-200 transition-colors hover:text-pink-400"
          >
            Contact
          </Link>
        </nav>

        <div className="ml-6 hidden items-center gap-4 md:flex">
          <Button
            variant="ghost"
            className="text-purple-200 hover:bg-purple-900/50 hover:text-white"
          >
            Log In
          </Button>
          <Button className="rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700">
            Get Started
          </Button>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="ml-auto md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
          <span className="sr-only">Toggle menu</span>
        </Button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 top-16 z-50 bg-black/95 backdrop-blur-sm md:hidden">
          <nav className="container flex flex-col gap-6 p-6">
            <Link
              href="#features"
              className="text-lg font-medium text-purple-200 transition-colors hover:text-pink-400"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              href="#pricing"
              className="text-lg font-medium text-purple-200 transition-colors hover:text-pink-400"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link
              href="#testimonials"
              className="text-lg font-medium text-purple-200 transition-colors hover:text-pink-400"
              onClick={() => setIsMenuOpen(false)}
            >
              Testimonials
            </Link>
            <Link
              href="#contact"
              className="text-lg font-medium text-purple-200 transition-colors hover:text-pink-400"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="mt-6 flex flex-col gap-4">
              <Button
                variant="ghost"
                className="w-full text-purple-200 hover:bg-purple-900/50 hover:text-white"
              >
                Log In
              </Button>
              <Button className="w-full rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700">
                Get Started
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
