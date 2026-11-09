import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { FeaturesSection } from "@/components/features-section"
import { CompaniesSection } from "@/components/companies-section"
import { PricingSection } from "@/components/pricing-section"
import { CtaSection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

export default function Page() {
  return (
    <div className="min-h-svh bg-black text-neutral-100">
      <div className="p-4 pb-0">
        <Navbar />
      </div>
      <Hero />
      <FeaturesSection />
      <CompaniesSection />
      <PricingSection />
      <CtaSection />
      <Footer />
    </div>
  )
}
