"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft, CheckCircle2, Eye, EyeOff, Lock, Mail, TriangleAlert } from "lucide-react"
import { isValidEmail, saveSession } from "@/lib/session"
import { authClient } from "@/lib/auth-client"

// গাইড অনুযায়ী direct-prop (spread) প্যাটার্ন — delay সহ stagger-এর মতো ভেসবে
const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
})

// নতুন জেনারেশন লগইন পেজ — glassmorphism + animated gradient orbs
export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    const formData = new FormData(e.target as HTMLFormElement)
    const email = formData.get("login-email") as string
    const password = formData.get("login-password") as string
    // console.log("Form submitted:", { email, password })

    // ভ্যালিডেশন আগে করা দরকার — নাহলে ফাঁকা field দিয়েও API কল হয়
    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.")
      return
    }
    if (password.length < 1) {
      setError("Please enter your password.")
      return
    }

    setIsLoading(true)

    const { data, error } = await authClient.signIn.email({
    email: email, // required, The email address of the user.
    password: password, // required, The password of the user. It should be at least 8 characters long and max 128 by default.
    rememberMe: true, // If false, the user will be signed out when the browser is closed. (optional) (default: true)
    callbackURL: "/", // An optional URL to redirect to after the user signs in. (optional)
});

console.log("Sign-in response:", { data, error });

    // better-auth এরর হলে ফ্রেন্ডলি মেসেজ দেখাও
    if (error) {
      setError(
        error.status === 401 || error.code === "INVALID_EMAIL_OR_PASSWORD"
          ? "Invalid email or password."
          : error.message || "Something went wrong. Please try again."
      )
      setIsLoading(false)
      return
    }

    // সাকসেস — সেশন cookie-তে কাজ করছে, navbar chip-এর জন্য local copy
    saveSession({ name: data?.user?.name || email.split("@")[0], email, role: "seeker" })
    // callbackURL অনুযায়ী price destinations যাওয়া
    router.push("/companies")
  }

  return (
    <div className="relative flex min-h-svh items-center justify-center overflow-hidden bg-black px-4 py-16">
      {/* Animated gradient orbs ব্যাকগ্রাউন্ড */}
      <motion.div
        aria-hidden
        animate={{ x: [0, 60, -30, 0], y: [0, -40, 30, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -top-32 left-1/2 size-[480px] -translate-x-1/2 rounded-full bg-indigo-600/25 blur-[120px]"
      />
      <motion.div
        aria-hidden
        animate={{ x: [0, -50, 40, 0], y: [0, 50, -30, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -bottom-40 -left-24 size-[420px] rounded-full bg-fuchsia-600/20 blur-[120px]"
      />
      <motion.div
        aria-hidden
        animate={{ x: [0, 40, -60, 0], y: [0, -30, 40, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -right-24 top-1/3 size-[380px] rounded-full bg-blue-600/20 blur-[120px]"
      />

      <div
        className="relative z-10 w-full max-w-sm"
      >
        <motion.div {...fade(0)}>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-neutral-500 transition-colors hover:text-white"
          >
            <ArrowLeft className="size-4" />
            Back to home
          </Link>
        </motion.div>

        {/* Glass card */}
        <motion.div
          {...fade(0.08)}
          className="mt-5 rounded-3xl border border-white/10 bg-white/[0.06] p-7 shadow-2xl shadow-indigo-500/10 backdrop-blur-2xl sm:p-9"
        >
          <div className="flex justify-center">
            <Image src="/image/logo.png" alt="HireLoop" width={120} height={40} className="h-8 w-auto" />
          </div>

          <h1 className="mt-6 text-center text-2xl font-semibold text-white">
            Log into your{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-fuchsia-400 bg-clip-text text-transparent">
              account
            </span>
          </h1>
          <p className="mt-1.5 text-center text-sm text-neutral-400">
            Enter your details to continue
          </p>

          <form className="mt-8 space-y-4" onSubmit={handleSubmit} noValidate>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                role="alert"
                className="flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2.5 text-xs text-red-300"
              >
                <TriangleAlert className="size-4 shrink-0 text-red-400" />
                {error}
              </motion.div>
            )}

            <div>
              <label htmlFor="login-email" className="mb-1.5 block text-xs font-medium text-neutral-300">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-neutral-400" />
                <input
                  id="login-email"
                  name="login-email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    setError(null)
                  }}
                  placeholder="you@example.com"
                  required
                  className="w-full rounded-xl border border-white/10 bg-white/10 py-3 pl-10 pr-3 text-sm text-white outline-none transition-all duration-300 placeholder:text-neutral-500 focus:border-fuchsia-500/50 focus:bg-white/15 focus:ring-2 focus:ring-fuchsia-500/20"
                />
              </div>
            </div>

            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label htmlFor="login-password" className="block text-xs font-medium text-neutral-300">
                  Password
                </label>
                <a href="#" className="text-xs text-fuchsia-400 transition-colors hover:text-fuchsia-300">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-neutral-400" />
                <input
                  id="login-password"
                  name="login-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    setError(null)
                  }}
                  placeholder="••••••••"
                  required
                  className="w-full rounded-xl border border-white/10 bg-white/10 py-3 pl-10 pr-10 text-sm text-white outline-none transition-all duration-300 placeholder:text-neutral-500 focus:border-fuchsia-500/50 focus:bg-white/15 focus:ring-2 focus:ring-fuchsia-500/20"
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 transition-colors hover:text-white"
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="mt-2 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:from-indigo-400 hover:to-fuchsia-400 hover:shadow-lg hover:shadow-fuchsia-500/30 disabled:pointer-events-none disabled:opacity-60"
            >
              {isLoading ? (
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                  className="size-4 rounded-full border-2 border-white/30 border-t-white"
                />
              ) : null}
              {isLoading ? "Logging in..." : "Log in"}
            </button>
          </form>

          <div className="my-5 flex items-center gap-3 text-xs text-neutral-500">
            <span className="h-px flex-1 bg-white/10" />
            or continue with
            <span className="h-px flex-1 bg-white/10" />
          </div>

          {/* Google দিয়ে লগইন — পরে আসল OAuth এখানে যুক্ত হবে */}
          <button
            type="button"
            className="flex h-11 w-full items-center justify-center gap-2.5 rounded-xl border border-white/10 bg-white/10 text-sm font-medium text-white transition-all duration-300 hover:border-white/25 hover:bg-white/15"
          >
            <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1Z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z" />
              <path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84Z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15A11 11 0 0 0 2.18 7.06l3.66-2.84c.87-2.6 3.3-4.52 6.16-4.52Z" />
            </svg>
            Continue with Google
          </button>

          <p className="mt-6 text-center text-xs text-neutral-500">
            Demo note — any valid email and password works
          </p>

          <div className="mt-6 text-center text-sm text-neutral-400">
            New to HireLoop?{" "}
            <Link href="/signup" className="font-medium text-fuchsia-400 transition-colors hover:text-fuchsia-300">
              Create an account
            </Link>
          </div>
        </motion.div>

        {/* সাকসেস indicator */}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 flex items-center justify-center gap-2 text-xs text-neutral-300"
          >
            <CheckCircle2 className="size-4 text-indigo-400" />
            Logging you in — redirecting…
          </motion.div>
        )}
      </div>
    </div>
  )
}
