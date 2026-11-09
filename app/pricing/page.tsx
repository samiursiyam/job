"use client"

import { Navbar } from "@/components/navbar"
import { PricingSection } from "@/components/pricing-section"
import { CtaSection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

export default function PricingPage() {
  return (
    <div className="min-h-svh bg-black text-neutral-100">
      <div className="p-4 pb-0">
        <Navbar />
      </div>
      <div className="pt-10 text-center">
        <h1 className="text-3xl font-semibold text-white sm:text-4xl">Pricing</h1>
        <p className="mt-2 px-4 text-sm text-neutral-400">
          Simple plans for both sides of hiring — 14-day money-back guarantee on all paid plans.
        </p>
      </div>
      <PricingSection />
      <CtaSection />
      <Footer />
    </div>
  )
}
