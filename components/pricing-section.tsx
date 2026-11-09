"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Check, ChevronDown } from "lucide-react"
import { pricingForRecruiters, pricingForSeekers, faqs, type PricingTier } from "@/lib/data"

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
}

function TierCard({ tier }: { tier: PricingTier }) {
  return (
    <motion.div
      {...fadeInUp}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`relative flex flex-col rounded-xl border p-6 ${
        tier.popular
          ? "border-indigo-500/60 bg-neutral-900 shadow-lg shadow-indigo-500/20"
          : "border-neutral-800 bg-neutral-900/60"
      }`}
    >
      {tier.popular && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-indigo-500 px-3 py-1 text-xs font-medium text-white">
          Most Popular
        </span>
      )}
      <h3 className="font-semibold text-white">{tier.name}</h3>
      <p className="mt-1 text-xs text-neutral-500">{tier.description}</p>
      <div className="mt-4 flex items-baseline gap-1">
        <span className="text-4xl font-semibold text-white">{tier.price}</span>
        <span className="text-sm text-neutral-500">{tier.period}</span>
      </div>
      <ul className="mt-6 flex-1 space-y-3">
        {tier.points.map((point) => (
          <li key={point} className="flex items-start gap-2 text-sm text-neutral-300">
            <Check className="mt-0.5 size-4 shrink-0 text-indigo-400" />
            {point}
          </li>
        ))}
      </ul>
      <a
        href="/login"
        className={`mt-6 inline-flex h-10 items-center justify-center rounded-lg text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 ${
          tier.popular
            ? "bg-indigo-500 text-white hover:bg-indigo-400 hover:shadow-lg hover:shadow-indigo-500/40"
            : "border border-neutral-700 bg-neutral-800/60 text-neutral-100 hover:border-neutral-500 hover:text-white"
        }`}
      >
        Get Started
      </a>
    </motion.div>
  )
}

export function PricingSection() {
  const [tab, setTab] = useState<"seekers" | "recruiters">("seekers")
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  const tiers = tab === "seekers" ? pricingForSeekers : pricingForRecruiters

  return (
    <section className="bg-black py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <motion.div {...fadeInUp} className="text-center">
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">
            Flexible financing,
            <br className="hidden sm:block" /> perfect offerings
          </h2>
          <p className="mt-3 text-sm text-neutral-400 sm:text-base">
            Simple plans for both job seekers and recruiters. Upgrade or cancel anytime.
          </p>
        </motion.div>

        {/* Toggle */}
        <motion.div {...fadeInUp} className="mt-8 flex justify-center">
          <div className="inline-flex rounded-full border border-neutral-800 bg-neutral-900 p-1">
            <button
              onClick={() => setTab("seekers")}
              className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                tab === "seekers" ? "text-white" : "text-neutral-400 hover:text-neutral-200"
              }`}
            >
              {tab === "seekers" && (
                <motion.span
                  layoutId="tab-pill"
                  className="absolute inset-0 rounded-full bg-indigo-500"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative">For Job Seekers</span>
            </button>
            <button
              onClick={() => setTab("recruiters")}
              className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                tab === "recruiters" ? "text-white" : "text-neutral-400 hover:text-neutral-200"
              }`}
            >
              {tab === "recruiters" && (
                <motion.span
                  layoutId="tab-pill"
                  className="absolute inset-0 rounded-full bg-indigo-500"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative">For Recruiters</span>
            </button>
          </div>
        </motion.div>

        {/* Tier cards */}
        <div className="mt-10 grid gap-4 sm:gap-5 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {tiers.map((tier) => (
              <TierCard key={`${tab}-${tier.name}`} tier={tier} />
            ))}
          </AnimatePresence>
        </div>

        {/* FAQ */}
        <motion.h3
          {...fadeInUp}
          className="mt-20 text-center text-2xl font-semibold text-white sm:text-3xl"
        >
          Frequently asked questions
        </motion.h3>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.08 }}
          className="mx-auto mt-8 max-w-2xl space-y-3"
        >
          {faqs.map((faq, i) => (
            <motion.div
              key={faq.question}
              {...fadeInUp}
              className="overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900/60"
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              >
                <span className="text-sm font-medium text-white sm:text-base">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`size-4 shrink-0 text-neutral-400 transition-transform duration-300 ${
                    openFaq === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              <motion.div
                initial={false}
                animate={{
                  height: openFaq === i ? "auto" : 0,
                  opacity: openFaq === i ? 1 : 0,
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="overflow-hidden"
              >
                <p className="px-5 pb-4 text-sm text-neutral-400">{faq.answer}</p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
