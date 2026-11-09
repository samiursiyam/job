"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import {
  Activity,
  ArrowRight,
  Bell,
  Bookmark,
  Building2,
  Coins,
  Search,
} from "lucide-react"
import { features } from "@/lib/data"

const iconMap = {
  search: Search,
  coins: Coins,
  building: Building2,
  bookmark: Bookmark,
  activity: Activity,
  bell: Bell,
} as const

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
}

export function FeaturesSection() {
  return (
    <section className="bg-black py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <motion.h2
          {...fadeInUp}
          className="text-center text-3xl font-semibold text-white sm:text-4xl"
        >
          Everything you need to land
          <br className="hidden sm:block" /> your next job
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.08, delayChildren: 0.1 }}
          className="mt-10 grid gap-4 sm:mt-14 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3"
        >
          {features.map((feature) => {
            const Icon = iconMap[feature.icon as keyof typeof iconMap]
            return (
              <motion.div
                key={feature.title}
                {...fadeInUp}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group rounded-xl border border-neutral-800 bg-neutral-900/60 p-5 transition-colors duration-300 hover:border-indigo-500/40 sm:p-6"
              >
                <div className="flex size-10 items-center justify-center rounded-lg border border-neutral-800 bg-neutral-800/50 transition-colors duration-300 group-hover:border-indigo-500/40">
                  <Icon className="size-5 text-indigo-400" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-white">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-400">
                  {feature.description}
                </p>
                <ul className="mt-4 space-y-2">
                  {feature.points.map((point) => (
                    <li key={point} className="flex items-center gap-2 text-xs text-neutral-400">
                      <span className="size-1.5 shrink-0 rounded-full bg-indigo-400" />
                      {point}
                    </li>
                  ))}
                </ul>
                <a
                  href="#"
                  className="mt-5 inline-flex items-center gap-1.5 text-sm text-indigo-400 transition-colors hover:text-indigo-300"
                >
                  Learn more
                  <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </motion.div>
            )
          })}
        </motion.div>

        <motion.div {...fadeInUp} className="mt-10 text-center">
          <Link
            href="/jobs"
            className="inline-flex h-10 items-center rounded-lg bg-indigo-500 px-6 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-indigo-400 hover:shadow-lg hover:shadow-indigo-500/40"
          >
            Browse All Jobs
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
