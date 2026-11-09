"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { cn } from "cn"
import { Button } from "@/components/ui/button"
import { clearSession, getSession, type Session } from "@/lib/session"
import { authClient } from "@/lib/auth-client"

const navLinks = [
  { label: "Browse Jobs", href: "/jobs" },
  { label: "Company", href: "/companies" },
  { label: "Pricing", href: "/pricing" },
]

export function Navbar({ className }: { className?: string }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [session, setSession] = useState<Session | null>(null)

  // সেশন লোড করা (client-only)
  useEffect(() => {
    setSession(getSession())
  }, [])

  async function handleSignOut() {
    // better-auth এর সেশন cookie মুছি + লোকাল chip state বদলাই
    await authClient.signOut()
    clearSession()
    setSession(null)
    setMenuOpen(false)
  }

  // Escape চাপলে বা বাইরে ক্লিক করলে মেনু বন্ধ হবে
  // (মেনু টগল বাটনের ক্লিকে listener আটকে গেলে X কাজ করবে না — বাদ দিচ্ছি)
  useEffect(() => {
    if (!menuOpen) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false)
    }
    const onMouseDown = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest("#menu-toggle") || target.closest("#menu-panel")) return
      setMenuOpen(false)
    }

    document.addEventListener("keydown", onKeyDown)
    document.addEventListener("mousedown", onMouseDown)
    return () => {
      document.removeEventListener("keydown", onKeyDown)
      document.removeEventListener("mousedown", onMouseDown)
    }
  }, [menuOpen])

  return (
    <header
      className={cn(
        "relative z-50 rounded-xl bg-neutral-900 pr-3 pl-4 sm:h-16 sm:pr-4 sm:pl-6",
        "flex min-h-14 flex-col justify-center sm:flex-row sm:items-center sm:justify-between",
        className
      )}
    >
        <div className="flex h-14 items-center justify-between sm:h-16">
          {/* Logo */}
          <Link href="/" className="shrink-0 transition-transform duration-300 hover:scale-105">
            <Image
              src="/image/logo.png"
              alt="HireLoop"
              width={140}
              height={40}
              priority
              className="h-7 w-auto sm:h-8 md:h-9"
            />
          </Link>

          <div className="flex items-center gap-2">
            {/* মোবাইলেও Sign In / ইউজার চিপ দৃশ্যমান */}
            {session ? (
              <div className="flex items-center rounded-full border border-neutral-700 bg-neutral-800/60 md:hidden">
                <span className="m-0.5 flex size-8 items-center justify-center rounded-full bg-indigo-500 text-sm font-semibold text-white">
                  {session.name.charAt(0).toUpperCase()}
                </span>
              </div>
            ) : (
              <Button
                variant="ghost"
                className="h-9 rounded-lg px-3 whitespace-nowrap text-sm text-indigo-400 hover:bg-neutral-800 hover:text-indigo-300 md:hidden"
              >
                <Link href="/login">Sign In</Link>
              </Button>
            )}

            {/* Mobile menu button */}
            <Button
              id="menu-toggle"
              variant="ghost"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}
              className="size-9 rounded-lg text-neutral-100 transition-all duration-300 hover:bg-neutral-800 hover:shadow-lg hover:shadow-indigo-500/10 active:scale-90 md:hidden"
            >
              <Menu
                className={cn(
                  "absolute transition-all duration-300",
                  menuOpen ? "scale-0 -rotate-90 opacity-0" : "scale-100 rotate-0 opacity-100"
                )}
              />
              <X
                className={cn(
                  "absolute transition-all duration-300",
                  menuOpen ? "scale-100 rotate-0 opacity-100" : "scale-0 rotate-90 opacity-0"
                )}
              />
            </Button>
          </div>
        </div>

      {/* Desktop nav (md থেকে) */}
      <nav className="hidden shrink-0 items-center md:flex">
        <ul className="flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="relative text-sm whitespace-nowrap text-neutral-100 transition-colors duration-300 hover:text-white after:absolute after:-bottom-1.5 after:left-0 after:h-0.5 after:w-full after:origin-right after:scale-x-0 after:rounded-full after:bg-indigo-400 after:transition-transform after:duration-300 after:ease-out hover:after:origin-left hover:after:scale-x-100"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Divider */}
        <div className="mx-6 h-5 w-px bg-neutral-600" />

        {session ? (
          <>
            <div className="flex items-center gap-2 rounded-full border border-neutral-700 bg-neutral-800/60 py-1 pl-1 pr-1">
              <span className="flex size-8 items-center justify-center rounded-full bg-indigo-500 text-sm font-semibold text-white">
                {session.name.charAt(0).toUpperCase()}
              </span>
              <span className="max-w-28 truncate pr-1 text-sm text-white">
                {session.name}
              </span>
            </div>
            <button
              onClick={handleSignOut}
              className="ml-1 h-8 rounded-lg px-3 text-sm text-neutral-400 transition-colors hover:text-white"
            >
              Sign Out
            </button>
          </>
        ) : (
          <>
            <Button
              variant="ghost"
              className="h-8 rounded-lg px-3 whitespace-nowrap text-sm text-indigo-400 transition-all duration-300 hover:-translate-y-0.5 hover:bg-neutral-800 hover:text-indigo-300 hover:shadow-lg hover:shadow-indigo-500/10"
            >
              <Link href="/login">Sign In</Link>
            </Button>
            <Button className="ml-3 h-10 rounded-lg bg-indigo-500 px-5 whitespace-nowrap text-sm text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-indigo-400 hover:shadow-lg hover:shadow-indigo-500/40 active:translate-y-0">
              <Link href="/signup">Get Started</Link>
            </Button>
          </>
        )}
      </nav>

      {/* Tablet nav — শুধু বাটন (sm–md) */}
      <div className="hidden shrink-0 items-center sm:flex md:hidden">
        <Button
          variant="ghost"
          className="h-8 rounded-lg px-3 whitespace-nowrap text-sm text-indigo-400 transition-all duration-300 hover:bg-neutral-800 hover:text-indigo-300"
        >
          <Link href="/login">Sign In</Link>
        </Button>
        <Button
          onClick={() => setMenuOpen((open) => !open)}
          className="ml-2 h-10 rounded-lg bg-indigo-500 px-4 whitespace-nowrap text-sm text-white transition-all duration-300 hover:bg-indigo-400 hover:shadow-lg hover:shadow-indigo-500/40 active:scale-95"
        >
          <Link href="/signup">Get Started</Link>
        </Button>
      </div>

      {/* Mobile dropdown menu */}
      <div
        id="menu-panel"
        className={cn(
          "grid overflow-hidden transition-[grid-template-rows,opacity] duration-300 ease-out md:hidden",
          menuOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <nav className="min-h-0">
          <ul className="flex flex-col gap-1 rounded-lg bg-neutral-800/60 p-2">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-sm text-neutral-100 transition-colors duration-200 hover:bg-neutral-700 hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="mt-1 border-t border-neutral-700 pt-2">
              {session ? (
                <button
                  onClick={handleSignOut}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-red-300 transition-colors duration-200 hover:bg-neutral-700"
                >
                  Sign Out ({session.name})
                </button>
              ) : (
                <div className="flex flex-col gap-2 px-1 py-1">
                  <Link
                    href="/login"
                    onClick={() => setMenuOpen(false)}
                    className="flex h-9 items-center justify-center rounded-lg border border-neutral-700 text-sm text-indigo-300 transition-colors hover:bg-neutral-700"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setMenuOpen(false)}
                    className="flex h-9 items-center justify-center rounded-lg bg-indigo-500 text-sm font-medium text-white transition-colors hover:bg-indigo-400"
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
