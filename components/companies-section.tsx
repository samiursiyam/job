"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowUpRight, MapPin } from "lucide-react"
import { companies } from "@/lib/data"

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
}

export function CompaniesSection() {
  return (
    <section className="bg-black py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <motion.div {...fadeInUp} className="text-center">
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">
            Top companies are already
            <br className="hidden sm:block" /> hiring here
          </h2>
          <p className="mt-3 text-sm text-neutral-400 sm:text-base">
            Explore open roles at the world's most trusted companies.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.06, delayChildren: 0.1 }}
          className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4"
        >
          {companies.map((company) => (
            <motion.div
              key={company.slug}
              {...fadeInUp}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Link
                href={`/companies#${company.slug}`}
                className="group flex h-full flex-col rounded-xl border border-neutral-800 bg-neutral-900/60 p-4 transition-colors duration-300 hover:border-indigo-500/40 sm:p-5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex size-11 items-center justify-center rounded-lg bg-white p-1.5">
                    <Image
                      src={company.logo}
                      alt={company.name}
                      width={36}
                      height={36}
                      className="size-full object-contain"
                    />
                  </div>
                  <ArrowUpRight className="size-4 text-neutral-600 transition-all duration-300 group-hover:text-indigo-400" />
                </div>
                <h3 className="mt-4 font-semibold text-white">{company.name}</h3>
                <p className="mt-0.5 text-xs text-neutral-500">{company.industry}</p>
                <p className="mt-2 flex items-center gap-1 text-xs text-neutral-500">
                  <MapPin className="size-3" />
                  {company.location}
                </p>
                <p className="mt-3 text-xs font-medium text-indigo-400">
                  {company.openJobs} open jobs
                </p>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div {...fadeInUp} className="mt-10 text-center">
          <Link
            href="/companies"
            className="inline-flex h-10 items-center rounded-lg border border-neutral-700 bg-neutral-900 px-6 text-sm font-medium text-neutral-100 transition-all duration-300 hover:-translate-y-0.5 hover:border-neutral-500 hover:text-white"
          >
            View All Companies
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
