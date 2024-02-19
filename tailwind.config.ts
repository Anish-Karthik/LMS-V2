// const { fontFamily } = require("tailwindcss/defaultTheme")
// const { withUt } = require("uploadthing/tw");
import { fontFamily } from "tailwindcss/defaultTheme"
import { withUt } from "uploadthing/tw"

// import { fontMono, fontSans, fontSerif } from "./lib/fonts"

/** @type {import('tailwindcss').Config} */
module.exports = withUt({
  darkMode: ["class"],
  content: ["app/**/*.{ts,tsx}", "components/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        "pink-color": "hsl(var(--pink-color) / <alpha-value>)",
        "purple-color": "hsl(var(--purple-color) / <alpha-value>)",
        "background-color": "rgb(var(--background-color) / <alpha-value>)",
        "text-primary": "rgb(var(--text-primary) / <alpha-value>)",
        "text-secondary": "rgb(var(--text-secondary) / <alpha-value>)",
        "primary-color": "rgb(var(--primary-color) / <alpha-value>)",
        "secondary-color": "rgb(var(--secondary-color) / <alpha-value>)",
        "tertiary-color": "rgb(var(--tertiary-color) / <alpha-value>)",
        "quaternary-color": "rgb(var(--quaternary-color) / <alpha-value>)",
        "dark-background": "hsl(var(--dark-background) / <alpha-value>)",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      screens: {
        xs: "400px",
        "2xs": "280px",
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: "calc(var(--radius) - 4px)",
      },
      maxWidth: {
        "8xl": "88rem",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
        orbitron: ["Orbitron", "sans-serif"],
        abeezee: ["ABeeZee", "sans-serif"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
})
