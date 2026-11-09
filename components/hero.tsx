"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Briefcase, Building2, Search, Sparkles, TrendingUp, Users } from "lucide-react"
import { Button } from "@/components/ui/button"

const stats = [
  { icon: Briefcase, value: "65K+", label: "Active Jobs" },
  { icon: Building2, value: "15K+", label: "Companies" },
  { icon: Users, value: "90K+", label: "Job Seekers" },
  { icon: TrendingUp, value: "97%", label: "Satisfaction Rate" },
]

const popularTags = ["Software Engineer", "Product Designer", "Remote Jobs", "Marketing"]

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-black">
      {/* Hero content */}
      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-4 pt-14 text-center sm:pt-20">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900/80 px-3 py-1.5 text-xs text-neutral-300"
        >
          <Sparkles className="size-3.5 text-orange-400" />
          3,000+ new jobs added this week
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl"
        >
          Find Your Next Job Today
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 max-w-xl text-base text-neutral-400 sm:text-lg"
        >
          HireLoop connects you with thousands of verified jobs and top
          companies — search, apply and track everything in one place.
        </motion.p>

        {/* Search bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 flex w-full items-center gap-2 rounded-xl border border-neutral-800 bg-neutral-900/80 p-1.5 shadow-lg shadow-indigo-950/40 backdrop-blur sm:rounded-lg"
        >
          <input
            type="text"
            placeholder="Job title or keyword"
            className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm text-neutral-100 outline-none placeholder:text-neutral-500"
          />
          <div className="hidden h-6 w-px bg-neutral-800 sm:block" />
          <input
            type="text"
            placeholder="Location"
            className="hidden min-w-0 flex-1 bg-transparent px-3 py-2 text-sm text-neutral-100 outline-none placeholder:text-neutral-500 sm:block"
          />
          <Button aria-label="Search Jobs" className="size-10 shrink-0 rounded-lg bg-indigo-500 text-white hover:bg-indigo-400 sm:w-auto sm:px-5">
            <Search />
            <span className="sr-only">Search Jobs</span>
          </Button>
        </motion.div>

        {/* Popular tags */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-neutral-500"
        >
          <span>Popular:</span>
          {popularTags.map((tag) => (
            <a
              key={tag}
              href="#"
              className="rounded-full border border-neutral-800 bg-neutral-900/60 px-2.5 py-1 text-neutral-300 transition-colors duration-300 hover:border-indigo-500/50 hover:text-white"
            >
              {tag}
            </a>
          ))}
        </motion.div>
      </div>

      {/* Globe + stats */}
      <div className="relative mt-6 sm:mt-2">
        {/* Globe image */}
        <div className="relative h-64 w-full sm:h-96 md:h-[440px]">
          <Image
            src="/image/globe.png"
            alt=""
            fill
            priority
            className="object-cover object-[50%_62%] saturate-150 brightness-125"
          />
          {/* উপরের দিকে গ্রেডিয়েন্ট দিয়ে পিংক অংশ মিশিয়ে দেওয়া */}
          <div className="absolute inset-x-0 top-0 h-2/3 bg-gradient-to-b from-black via-black/50 to-transparent" />
        </div>

        {/* Stats cards — globe-এর উপর বসানো */}
        <div className="relative z-10 -mt-24 px-4 pb-10 sm:-mt-40 sm:pb-16">
          <motion.div
            initial="initial"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={{
              initial: {},
              show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
            }}
            className="mx-auto grid max-w-5xl grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4"
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={{
                  initial: { opacity: 0, y: 30 },
                  show: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
                  },
                }}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="rounded-xl border border-neutral-800 bg-neutral-900/90 p-4 backdrop-blur sm:p-5"
              >
                <div className="flex size-8 items-center justify-center rounded-lg border border-neutral-800 bg-neutral-800/50">
                  <stat.icon className="size-4 text-indigo-400" />
                </div>
                <p className="mt-4 text-2xl font-semibold text-white sm:text-3xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs text-neutral-400 sm:text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
