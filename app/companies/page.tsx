"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowUpRight, MapPin, Users } from "lucide-react"
import { companies, industries } from "@/lib/data"

export default function CompaniesPage() {
  const [tab, setTab] = useState("All")

  const filtered = tab === "All" ? companies : companies.filter((c) => c.industry === tab)

  return (
    <div className="min-h-svh bg-black text-neutral-100">
      <div className="mx-auto max-w-6xl px-4 pb-20 pt-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="text-3xl font-semibold text-white sm:text-4xl">Companies</h1>
          <p className="mt-2 text-sm text-neutral-400">
            {companies.length} verified companies hiring on HireLoop.
          </p>
        </motion.div>

        {/* Industry filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 flex flex-wrap gap-2"
        >
          {industries.map((ind) => (
            <button
              key={ind}
              onClick={() => setTab(ind)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                tab === ind
                  ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/25"
                  : "border border-neutral-800 text-neutral-400 hover:border-neutral-600 hover:text-white"
              }`}
            >
              {ind}
            </button>
          ))}
        </motion.div>

        {/* Company grid */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {filtered.map((company, i) => (
            <motion.div
              key={company.slug}
              id={company.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <a
                href={`/companies#${company.slug}`}
                className="group flex h-full flex-col rounded-xl border border-neutral-800 bg-neutral-900/60 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/40 hover:shadow-lg hover:shadow-indigo-500/10 scroll-mt-24"
              >
                <div className="flex items-start justify-between">
                  <div className="flex size-14 items-center justify-center rounded-xl bg-white p-2">
                    <Image
                      src={company.logo}
                      alt={company.name}
                      width={44}
                      height={44}
                      className="size-full object-contain"
                    />
                  </div>
                  <span className="rounded-full border border-indigo-500/40 bg-indigo-500/10 px-2.5 py-1 text-xs text-indigo-300">
                    {company.openJobs} open jobs
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-white">{company.name}</h3>
                <p className="text-xs text-neutral-500">{company.industry}</p>
                <div className="mt-4 space-y-2 border-t border-neutral-800 pt-4 text-xs text-neutral-400">
                  <p className="flex items-center gap-1.5">
                    <MapPin className="size-3.5 text-neutral-500" />
                    {company.location}
                  </p>
                  <p className="flex items-center gap-1.5">
                    <Users className="size-3.5 text-neutral-500" />
                    {company.employees} employees
                  </p>
                </div>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-indigo-400 transition-colors group-hover:text-indigo-300">
                  View company profile
                  <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
