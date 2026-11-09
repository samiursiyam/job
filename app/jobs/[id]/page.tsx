import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Briefcase, Clock, MapPin, Users } from "lucide-react"
import { companies, jobList } from "@/lib/data"

export function generateStaticParams() {
  return jobList.map((job) => ({ id: job.id }))
}

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const job = jobList.find((j) => j.id === id)
  if (!job) notFound()

  const company = companies.find((c) => c.slug === job.company)
  const similar = jobList.filter((j) => j.id !== job.id && j.category === job.category).slice(0, 3)

  return (
    <div className="min-h-svh bg-black text-neutral-100">
      <div className="mx-auto max-w-6xl px-4 pb-20 pt-16">
        {/* Breadcrumb */}
        <Link
          href="/jobs"
          className="text-sm text-neutral-400 transition-colors hover:text-white"
        >
          ← Back to all jobs
        </Link>

        <div className="mt-6 flex flex-col gap-8 lg:flex-row">
          {/* Main */}
          <div className="min-w-0 flex-1">
            <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-6 sm:p-8">
              <div className="flex flex-wrap items-start gap-4">
                <div className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-white p-2">
                  <Image
                    src={company?.logo ?? "/image/logo.png"}
                    alt={company?.name ?? ""}
                    width={44}
                    height={44}
                    className="size-full object-contain"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h1 className="text-2xl font-semibold text-white sm:text-3xl">
                    {job.title}
                  </h1>
                  <p className="mt-1 text-sm text-neutral-400">
                    {company?.name} · {job.category}
                  </p>
                </div>
                <span className="rounded-full bg-indigo-500/10 px-3 py-1.5 text-xs font-medium text-indigo-300">
                  {job.posted}
                </span>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {[
                  { icon: MapPin, text: job.location },
                  { icon: Briefcase, text: job.type },
                  { icon: Users, text: job.salary },
                ].map((badge) => (
                  <span
                    key={badge.text}
                    className="inline-flex items-center gap-1.5 rounded-full border border-neutral-800 bg-neutral-800/40 px-3 py-1.5 text-xs text-neutral-300"
                  >
                    <badge.icon className="size-3.5 text-indigo-400" />
                    {badge.text}
                  </span>
                ))}
              </div>

              <div className="mt-8 space-y-8">
                <section>
                  <h2 className="text-lg font-semibold text-white">Job Description</h2>
                  <p className="mt-3 text-sm leading-relaxed text-neutral-400">
                    {job.description}
                  </p>
                </section>

                <section>
                  <h2 className="text-lg font-semibold text-white">Responsibilities</h2>
                  <ul className="mt-3 space-y-2">
                    {job.responsibilities.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-neutral-400">
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-indigo-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h2 className="text-lg font-semibold text-white">Requirements</h2>
                  <ul className="mt-3 space-y-2">
                    {job.requirements.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-neutral-400">
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-indigo-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h2 className="text-lg font-semibold text-white">Benefits</h2>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {job.benefits.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-neutral-800 bg-neutral-800/40 px-3 py-1.5 text-xs text-neutral-300"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </section>
              </div>

              <div className="mt-8 flex gap-3 border-t border-neutral-800 pt-6">
                <Link
                  href="/login"
                  className="inline-flex h-11 items-center justify-center rounded-lg bg-indigo-500 px-8 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-indigo-400 hover:shadow-lg hover:shadow-indigo-500/40"
                >
                  Apply Now
                </Link>
                <Link
                  href="/login"
                  className="inline-flex h-11 items-center justify-center rounded-lg border border-neutral-700 px-6 text-sm font-medium text-neutral-200 transition-all duration-300 hover:border-neutral-500 hover:text-white"
                >
                  Save Job
                </Link>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="h-fit shrink-0 space-y-4 lg:w-80">
            <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-6">
              <h3 className="font-semibold text-white">About {company?.name}</h3>
              <div className="mt-4 flex items-center gap-3">
                <div className="flex size-12 items-center justify-center rounded-xl bg-white p-2">
                  <Image
                    src={company?.logo ?? "/image/logo.png"}
                    alt={company?.name ?? ""}
                    width={36}
                    height={36}
                    className="size-full object-contain"
                  />
                </div>
                <div>
                  <p className="font-medium text-white">{company?.name}</p>
                  <p className="text-xs text-neutral-500">{company?.industry}</p>
                </div>
              </div>
              <div className="mt-4 space-y-2 text-xs text-neutral-400">
                <p className="flex items-center gap-1.5">
                  <MapPin className="size-3.5 text-neutral-500" />
                  {company?.location}
                </p>
                <p className="flex items-center gap-1.5">
                  <Users className="size-3.5 text-neutral-500" />
                  {company?.employees} employees
                </p>
                <p className="flex items-center gap-1.5">
                  <Clock className="size-3.5 text-neutral-500" />
                  {company?.openJobs} open jobs
                </p>
              </div>
              <Link
                href="/companies"
                className="mt-4 inline-flex h-9 w-full items-center justify-center rounded-lg border border-neutral-700 text-sm text-neutral-200 transition-all duration-300 hover:border-neutral-500 hover:text-white"
              >
                View Company Profile
              </Link>
            </div>
          </aside>
        </div>

        {/* Similar jobs */}
        {similar.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-semibold text-white">Similar Jobs</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {similar.map((s) => {
                const sCompany = companies.find((c) => c.slug === s.company)
                return (
                  <Link
                    key={s.id}
                    href={`/jobs/${s.id}`}
                    className="group rounded-xl border border-neutral-800 bg-neutral-900/60 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/40"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-white p-1.5">
                        <Image
                          src={sCompany?.logo ?? "/image/logo.png"}
                          alt={sCompany?.name ?? ""}
                          width={28}
                          height={28}
                          className="size-full object-contain"
                        />
                      </div>
                      <div className="min-w-0">
                        <h3 className="truncate font-medium text-white group-hover:text-indigo-300">
                          {s.title}
                        </h3>
                        <p className="text-xs text-neutral-500">{sCompany?.name}</p>
                      </div>
                    </div>
                    <p className="mt-3 text-xs text-neutral-400">{s.salary}</p>
                    <p className="mt-1 text-xs text-neutral-500">{s.location} · {s.type}</p>
                  </Link>
                )
              })}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
