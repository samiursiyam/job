"use client"

import { useMemo, useState } from "react"
import { motion } from "framer-motion"
import { MapPin, Search, SlidersHorizontal } from "lucide-react"
import { jobList, jobTypes, industries } from "@/lib/data"
import { JobCard } from "@/components/job-card"

export default function JobsPage() {
  const [query, setQuery] = useState("")
  const [type, setType] = useState("All")
  const [category, setCategory] = useState("All")

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(jobList.map((j) => j.category)))],
    []
  )

  const filtered = jobList.filter((job) => {
    const matchesQuery =
      query.trim() === "" ||
      job.title.toLowerCase().includes(query.toLowerCase()) ||
      job.location.toLowerCase().includes(query.toLowerCase())
    const matchesType = type === "All" || job.type === type
    const matchesCategory = category === "All" || job.category === category
    return matchesQuery && matchesType && matchesCategory
  })

  return (
    <div className="min-h-svh bg-black text-neutral-100">
      <div className="mx-auto max-w-6xl px-4 pb-20 pt-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="text-3xl font-semibold text-white sm:text-4xl">Browse Jobs</h1>
          <p className="mt-2 text-sm text-neutral-400">
            {jobList.length} curated roles from top companies — updated daily.
          </p>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 flex items-center gap-2 rounded-xl border border-neutral-800 bg-neutral-900/80 p-1.5"
        >
          <Search className="ml-3 size-4 shrink-0 text-neutral-500" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title, keyword or location..."
            className="min-w-0 flex-1 bg-transparent py-2 text-sm text-white outline-none placeholder:text-neutral-500"
          />
        </motion.div>

        <div className="mt-8 flex flex-col gap-8 lg:flex-row">
          {/* Filters sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="h-fit shrink-0 rounded-xl border border-neutral-800 bg-neutral-900/60 p-5 lg:w-64"
          >
            <div className="flex items-center gap-2 text-sm font-semibold text-white">
              <SlidersHorizontal className="size-4 text-indigo-400" />
              Filters
            </div>

            <div className="mt-5">
              <h4 className="text-xs font-medium text-neutral-400">Job Type</h4>
              <div className="mt-2 flex flex-wrap gap-2">
                {jobTypes.map((t) => (
                  <button
                    key={t}
                    onClick={() => setType(t)}
                    className={`rounded-full px-3 py-1.5 text-xs transition-all duration-300 ${
                      type === t
                        ? "bg-indigo-500 text-white"
                        : "border border-neutral-800 text-neutral-400 hover:border-neutral-600 hover:text-white"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <h4 className="text-xs font-medium text-neutral-400">Category</h4>
              <div className="mt-2 flex flex-wrap gap-2">
                {categories.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCategory(c)}
                    className={`rounded-full px-3 py-1.5 text-xs transition-all duration-300 ${
                      category === c
                        ? "bg-indigo-500 text-white"
                        : "border border-neutral-800 text-neutral-400 hover:border-neutral-600 hover:text-white"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <h4 className="text-xs font-medium text-neutral-400">Salary Range</h4>
              <div className="mt-2 space-y-2 text-xs text-neutral-400">
                {["$0 - $100", "$100 - $150", "$150+"].map((range) => (
                  <label key={range} className="flex cursor-pointer items-center gap-2">
                    <input type="checkbox" className="size-3.5 rounded-sm accent-indigo-500" />
                    {range}K
                  </label>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <h4 className="text-xs font-medium text-neutral-400">Popular Locations</h4>
              <div className="mt-2 space-y-1.5 text-xs">
                {["Remote", "San Francisco, CA", "New York, NY"].map((loc) => (
                  <button
                    key={loc}
                    className="flex w-full items-center gap-1.5 rounded-lg px-2 py-1.5 text-left text-neutral-400 transition-colors hover:bg-neutral-800 hover:text-white"
                  >
                    <MapPin className="size-3" />
                    {loc}
                  </button>
                ))}
              </div>
            </div>
          </motion.aside>

          {/* Job list */}
          <div className="min-w-0 flex-1">
            <p className="text-xs text-neutral-500">
              Showing {filtered.length} of {jobList.length} jobs
            </p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {filtered.map((job) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <JobCard jobId={job.id} />
                </motion.div>
              ))}
            </div>
            {filtered.length === 0 && (
              <div className="rounded-xl border border-dashed border-neutral-800 py-20 text-center text-sm text-neutral-500">
                No jobs match your filters. Try changing them!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
