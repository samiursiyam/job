"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Briefcase, Upload } from "lucide-react"

export function CtaSection() {
  return (
    <section className="relative overflow-hidden bg-black py-20 sm:py-32">
      {/* Background globe */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-96 sm:h-[480px]">
        <Image
          src="/image/globe.png"
          alt=""
          fill
          className="rotate-180 object-cover object-[50%_35%] opacity-70 saturate-150 brightness-125"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/30 to-black/60" />
      </div>

      <div className="relative mx-auto max-w-2xl px-4 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-3xl font-semibold text-white sm:text-5xl"
        >
          Your next role is
          <br /> already looking for you
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 text-sm text-neutral-300 sm:text-base"
        >
          Create your free account today — your dream job is just one
          search away.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Link
            href="/jobs"
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-indigo-500 px-6 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-indigo-400 hover:shadow-lg hover:shadow-indigo-500/40 sm:w-auto"
          >
            <Briefcase className="size-4" />
            Search Jobs
          </Link>
          <Link
            href="/signup"
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-neutral-700 bg-neutral-900/80 px-6 text-sm font-medium text-white backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-neutral-500 sm:w-auto"
          >
            <Upload className="size-4" />
            Post a Job
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
