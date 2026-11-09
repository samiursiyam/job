"use client"

import Image from "next/image"
import Link from "next/link"
import { Bookmark } from "lucide-react"
import { companies, jobList } from "@/lib/data"

export function JobCard({ jobId }: { jobId: string }) {
  const job = jobList.find((j) => j.id === jobId)
  if (!job) return null
  const company = companies.find((c) => c.slug === job.company)

  return (
    <Link
      href={`/jobs/${job.id}`}
      className="group flex flex-col rounded-xl border border-neutral-800 bg-neutral-900/60 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/40 hover:shadow-lg hover:shadow-indigo-500/10"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-white p-1.5">
            <Image
              src={company?.logo ?? "/image/logo.png"}
              alt={company?.name ?? ""}
              width={36}
              height={36}
              className="size-full object-contain"
            />
          </div>
          <div>
            <h3 className="font-semibold text-white transition-colors group-hover:text-indigo-300">
              {job.title}
            </h3>
            <p className="text-xs text-neutral-500">{company?.name}</p>
          </div>
        </div>
        <button
          aria-label="Save job"
          className="shrink-0 rounded-lg border border-neutral-800 p-2 text-neutral-500 transition-colors duration-300 hover:border-indigo-500/50 hover:text-indigo-400"
        >
          <Bookmark className="size-4" />
        </button>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {Array.from(new Set([job.location, job.type, job.salary])).map((badge) => (
          <span
            key={badge}
            className="rounded-full border border-neutral-800 bg-neutral-800/40 px-2.5 py-1 text-xs text-neutral-300"
          >
            {badge}
          </span>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-neutral-800 pt-4 text-xs text-neutral-500">
        <span>{job.posted}</span>
        <span className="font-medium text-indigo-400 transition-colors group-hover:text-indigo-300">
          View details →
        </span>
      </div>
    </Link>
  )
}
