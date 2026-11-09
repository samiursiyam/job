"use client"

// সিমুলেটেড Google অ্যাকাউন্ট চয়েজার মডাল
// (ব্যাকএন্ডে আসল Google OAuth যুক্ত হলে এখানে আসল ফ্লো বসবে)
import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { TriangleAlert, X } from "lucide-react"
import { isValidEmail } from "@/lib/session"

export type GoogleAccount = { name: string; email: string }

// ডেমো অ্যাকাউন্টগুলো — এগুলো বেছে নিলেই সাইন-ইন/সাইন-আপ হয়ে যায়
const demoAccounts: GoogleAccount[] = [
  { name: "Rafiq Ahmed", email: "rafiq.ahmed@gmail.com" },
  { name: "Amina Karim", email: "amina.karim@gmail.com" },
]

const panel = {
  hidden: { opacity: 0, scale: 0.92, y: 24 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const },
  },
  exit: { opacity: 0, scale: 0.95, y: 12, transition: { duration: 0.2, ease: "easeIn" as const } },
}

function GoogleLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1Z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z" />
      <path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84Z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15A11 11 0 0 0 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52Z" />
    </svg>
  )
}

// নামের প্রথম অক্ষর দিয়ে রঙিন avatar
function Avatar({ name }: { name: string }) {
  const colors = ["bg-indigo-500", "bg-fuchsia-500", "bg-amber-500", "bg-emerald-500"]
  const color = colors[name.charCodeAt(0) % colors.length]
  return (
    <span
      className={`flex size-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white ${color}`}
    >
      {name.charAt(0).toUpperCase()}
    </span>
  )
}

export function GoogleAuthModal({
  open,
  actionLabel,
  onClose,
  onSelect,
}: {
  open: boolean
  actionLabel: string
  onClose: () => void
  onSelect: (account: GoogleAccount) => void
}) {
  const [showOther, setShowOther] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState<string | null>(null)

  // মডাল বন্ধ হলে ভেতরের স্টেট রিসেট
  useEffect(() => {
    if (!open) {
      setShowOther(false)
      setName("")
      setEmail("")
      setError(null)
      setPending(null)
    }
  }, [open])

  function pick(account: GoogleAccount) {
    if (pending) return
    setPending(account.email)
    // সিমুলেটেড OAuth ফ্লো — ছোট বিলতে নেটওয়ার্ক কল
    setTimeout(() => onSelect(account), 800)
  }

  function submitOther(e: React.FormEvent) {
    e.preventDefault()
    const clean = name.trim()
    if (clean.length < 2) {
      setError("Please enter your full name.")
      return
    }
    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.")
      return
    }
    pick({ name: clean, email })
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            variants={panel}
            initial="hidden"
            animate="show"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm rounded-2xl bg-white p-6 text-neutral-900 shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-label="Google sign in"
          >
            <div className="flex items-start justify-between">
              <GoogleLogo className="size-6" />
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="-mr-1 rounded-full p-1.5 text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-900"
              >
                <X className="size-4" />
              </button>
            </div>

            <h2 className="mt-3 text-xl font-medium">Choose an account</h2>
            <p className="text-sm text-neutral-500">
              to continue to <span className="font-medium text-neutral-800">HireLoop</span> — {actionLabel}
            </p>

            <div className="mt-4 divide-y divide-neutral-100 border-y border-neutral-100">
              {demoAccounts.map((account) => (
                <button
                  key={account.email}
                  type="button"
                  onClick={() => pick(account)}
                  disabled={!!pending}
                  className="flex w-full items-center gap-3 py-3.5 pr-2 text-left transition-colors hover:bg-neutral-50 disabled:opacity-60"
                >
                  <Avatar name={account.name} />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium">{account.name}</span>
                    <span className="block truncate text-xs text-neutral-500">{account.email}</span>
                  </span>
                  {pending === account.email && (
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                      className="size-4 rounded-full border-2 border-neutral-300 border-t-neutral-700"
                    />
                  )}
                  {pending === account.email && <span className="sr-only">Connecting…</span>}
                </button>
              ))}
            </div>

            {!showOther ? (
              <button
                type="button"
                onClick={() => setShowOther(true)}
                disabled={!!pending}
                className="flex w-full items-center gap-3 py-3.5 pr-2 text-left transition-colors hover:bg-neutral-50 disabled:opacity-60"
              >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-neutral-200">
                  <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1Z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z" />
                    <path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84Z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15A11 11 0 0 0 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52Z" />
                  </svg>
                </span>
                <span className="text-sm font-medium">Use another account</span>
              </button>
            ) : (
              <form className="mt-3 space-y-2.5" onSubmit={submitOther} noValidate>
                {error && (
                  <div
                    role="alert"
                    className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-600"
                  >
                    <TriangleAlert className="size-3.5 shrink-0" />
                    {error}
                  </div>
                )}
                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value)
                    setError(null)
                  }}
                  placeholder="Full name"
                  className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2.5 text-sm outline-none transition-colors placeholder:text-neutral-400 focus:border-neutral-400 focus:bg-white"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    setError(null)
                  }}
                  placeholder="your@gmail.com"
                  className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2.5 text-sm outline-none transition-colors placeholder:text-neutral-400 focus:border-neutral-400 focus:bg-white"
                />
                <div className="flex items-center justify-end gap-1 pt-1">
                  <button
                    type="button"
                    onClick={() => setShowOther(false)}
                    className="rounded-lg px-3 py-2 text-xs font-medium text-neutral-600 transition-colors hover:bg-neutral-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-lg bg-indigo-500 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-indigo-400"
                  >
                    Continue
                  </button>
                </div>
              </form>
            )}

            <p className="mt-4 border-t border-neutral-100 pt-3 text-[11px] leading-relaxed text-neutral-400">
              Demo flow — a real Google OAuth will replace this once the backend is connected.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
