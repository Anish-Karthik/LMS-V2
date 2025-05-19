import Link from "next/link"
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-purple-900/20 bg-black py-12 md:py-16">
      <div className="container px-4 md:px-6">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-600"></div>
              <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-xl font-bold text-transparent">
                Clovers
              </span>
            </div>
            <p className="text-sm text-purple-200">
              Transforming corporate learning with powerful, intuitive tools for
              modern businesses.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-purple-300 hover:text-pink-400">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-purple-300 hover:text-pink-400">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-purple-300 hover:text-pink-400">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-purple-300 hover:text-pink-400">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium text-white">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-sm text-purple-200 transition-colors hover:text-pink-400"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-purple-200 transition-colors hover:text-pink-400"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-purple-200 transition-colors hover:text-pink-400"
                >
                  Integrations
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-purple-200 transition-colors hover:text-pink-400"
                >
                  Case Studies
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-purple-200 transition-colors hover:text-pink-400"
                >
                  Documentation
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium text-white">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-sm text-purple-200 transition-colors hover:text-pink-400"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-purple-200 transition-colors hover:text-pink-400"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-sm text-purple-200 transition-colors hover:text-pink-400"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-purple-200 transition-colors hover:text-pink-400"
                >
                  Press
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-purple-200 transition-colors hover:text-pink-400"
                >
                  Partners
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium text-white">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-sm text-purple-200 transition-colors hover:text-pink-400"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-purple-200 transition-colors hover:text-pink-400"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-purple-200 transition-colors hover:text-pink-400"
                >
                  Status
                </Link>
              </li>
              <li>
                <Link
                  href="/policies#privacy"
                  className="text-sm text-purple-200 transition-colors hover:text-pink-400"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/policies#terms"
                  className="text-sm text-purple-200 transition-colors hover:text-pink-400"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between border-t border-purple-900/20 pt-6 md:flex-row">
          <p className="text-xs text-purple-300">
            © {new Date().getFullYear()} Clovers LMS. All rights reserved.
          </p>
          <div className="mt-4 flex gap-4 md:mt-0">
            <Link
              href="/policies#privacy"
              className="text-xs text-purple-300 transition-colors hover:text-pink-400"
            >
              Privacy Policy
            </Link>
            <Link
              href="/policies#terms"
              className="text-xs text-purple-300 transition-colors hover:text-pink-400"
            >
              Terms of Service
            </Link>
            <Link
              href="/policies#cookie"
              className="text-xs text-purple-300 transition-colors hover:text-pink-400"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
