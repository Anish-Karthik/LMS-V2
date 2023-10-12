import { LandingContent } from "@/components/shared/LandingContent";
import { LandingHero } from "@/components/shared/LandingHero";
import LandingNavbar from "@/components/shared/LandingNavbar";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
export default function LandingPage() {
  return (
    <div className="h-full" >
      <LandingNavbar />
      <LandingHero />
      <LandingContent />
    </div>
  )
}