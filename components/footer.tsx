import Image from "next/image"
import Link from "next/link"

const columns = [
  {
    title: "Job Seekers",
    links: [
      { label: "Browse Jobs", href: "/jobs" },
      { label: "Saved Jobs", href: "/jobs" },
      { label: "My Applications", href: "/signin" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    title: "Employers",
    links: [
      { label: "Post a Job", href: "/signup" },
      { label: "Find Candidates", href: "/companies" },
      { label: "Recruiter Dashboard", href: "/signin" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/" },
      { label: "Contact", href: "/" },
      { label: "Privacy Policy", href: "/" },
      { label: "Terms of Service", href: "/" },
    ],
  },
]

export function Footer() {
  return (
    <footer className="border-t border-neutral-800 bg-black">
      <div className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {/* Logo + tagline */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block">
              <Image
                src="/image/logo.png"
                alt="HireLoop"
                width={130}
                height={40}
                className="h-8 w-auto"
              />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-neutral-500">
              HireLoop simplifies job discovery, application management and
              company recruitment — all in one platform.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-white">{col.title}</h4>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-neutral-500 transition-colors duration-300 hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-neutral-800 pt-8 sm:flex-row">
          <p className="text-xs text-neutral-600">
            © {new Date().getFullYear()} HireLoop. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-neutral-600">
            <a href="#" className="transition-colors hover:text-neutral-400">
              Privacy
            </a>
            <a href="#" className="transition-colors hover:text-neutral-400">
              Terms
            </a>
            <a href="#" className="transition-colors hover:text-neutral-400">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
