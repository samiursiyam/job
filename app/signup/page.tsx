
"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  Briefcase,
  Check,
  CheckCircle2,
  Eye,
  EyeOff,
  Lock,
  Mail,
  TriangleAlert,
  Upload,
  User,
  Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { isValidEmail, saveSession } from "@/lib/session"
import { authClient } from "@/lib/auth-client"

type Role = "seeker" | "recruiter"

const roles = [
  {
    value: "seeker" as Role,
    title: "Job Seeker",
    description: "I want to find and apply to jobs",
    icon: User,
  },
  {
    value: "recruiter" as Role,
    title: "Recruiter",
    description: "I want to post jobs and hire talent",
    icon: Users,
  },
]

const perks = ["Free forever plan", "No credit card required", "Cancel anytime"]

// গাইড অনুযায়ী direct-prop (spread) প্যাটার্ন — delay সহ stagger-এর মতো ভেসে যাবে
const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
})

function passwordStrength(pw: string): { label: string; color: string; score: number } {
  let score = 0
  if (pw.length >= 8) score++
  if (/[A-Z]/.test(pw)) score++
  if (/[0-9]/.test(pw)) score++
  if (/[^A-Za-z0-9]/.test(pw)) score++

  const levels = [
    { label: "", color: "bg-neutral-700" },
    { label: "Weak", color: "bg-red-400" },
    { label: "Okay", color: "bg-amber-400" },
    { label: "Good", color: "bg-lime-400" },
    { label: "Strong", color: "bg-indigo-400" },
  ]

  return { ...levels[score], score }
}

export default function SignUpPage() {
  const router = useRouter()
  const [role, setRole] = useState<Role>("seeker")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [agreed, setAgreed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // নতুন state: Agree না করলে checkbox-এর নিচে message দেখাবে
  const [agreeError, setAgreeError] = useState(false)

  const strength = passwordStrength(password)
  const canSubmit = isValidEmail(email) && password.length >= 8 && name.trim().length >= 2 && agreed

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    // Agree না করলে API call হবে না
    if (!agreed) {
      setAgreeError(true)
      return
    }

    setAgreeError(false)
    setError(null)

    const formData = new FormData(e.target as HTMLFormElement)
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    // console.log("Form submitted:", { name, email, password, role })

    // ভ্যালিডেশন আগে — নাহলে ভুল field দিয়েও API কল হয়
    if (name.trim().length < 2) {
      setError("Please enter your full name.")
      return
    }

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.")
      return
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.")
      return
    }

    setIsLoading(true)

    const { data, error } = await authClient.signUp.email({
      name: name, // required, The name of the user.
      email: email, // required, The email address of the user.
      password: password, // required, The password of the user. It should be at least 8 characters long and max 128 by default.

      // callbackURL: "/",
    })

    console.log("SignUp response:", { data, error })

    // better-auth এরর হলে ফ্রেন্ডলি মেসেজ দেখাও
    if (error) {
      setError(
        error.code === "USER_ALREADY_EXISTS"
          ? "This email is already registered. Try logging in instead."
          : error.message || "Something went wrong. Please try again."
      )
      setIsLoading(false)
      return
    }

    // সাকসেস — অ্যাকাউন্ট সত্যিই তৈরি হয়েছে (সেশন cookie-তে)
    saveSession({ name: name.trim(), email, role })

    // সাকসেস স্ক্রিন দেখানোর পর redirect
    setTimeout(() => {
      router.push(role === "recruiter" ? "/" : "/jobs")
    }, 1200)
  }

  return (
    <div className="relative min-h-svh overflow-hidden bg-black px-4 py-14 text-neutral-100">
      {/* Background globe glow */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-80 opacity-35">
        <Image
          src="/image/globe.png"
          alt=""
          fill
          priority
          className="object-cover object-[50%_45%] saturate-150 brightness-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/40 to-black/85" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-xl">
        <motion.div {...fade(0)}>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-neutral-400 transition-colors hover:text-white"
          >
            <ArrowLeft className="size-4" />
            Back to home
          </Link>
        </motion.div>

        {/* Logo */}
        <motion.div {...fade(0.08)} className="mt-4 flex justify-center">
          <Image src="/image/logo.png" alt="HireLoop" width={130} height={40} className="h-9 w-auto" />
        </motion.div>

        {/* Card */}
        <motion.div
          {...fade(0.16)}
          className="mt-8 rounded-2xl border border-neutral-800 bg-neutral-900/90 p-6 shadow-2xl shadow-indigo-950/30 backdrop-blur sm:p-10"
        >
          {/* সাকসেস স্টেট */}
          {isLoading ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center py-10 text-center"
            >
              <div className="flex size-16 items-center justify-center rounded-full bg-indigo-500/15">
                <CheckCircle2 className="size-8 text-indigo-400" />
              </div>
              <h2 className="mt-5 text-2xl font-semibold text-white">Account created! 🎉</h2>
              <p className="mt-2 text-sm text-neutral-400">
                {role === "recruiter"
                  ? "Setting up your recruiter workspace…"
                  : "Loading your job feed…"}
              </p>
              <div className="mt-6 h-1 w-44 overflow-hidden rounded-full bg-neutral-800">
                <motion.div
                  className="h-full rounded-full bg-indigo-500"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                />
              </div>
            </motion.div>
          ) : (
            <>
              <h1 className="text-center text-2xl font-semibold text-white sm:text-3xl">
                Get started with HireLoop
              </h1>
              <p className="mt-2 text-center text-sm text-neutral-400">
                Create your free account in under a minute.
              </p>

              {/* Role selector */}
              <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {roles.map((r) => (
                  <button
                    key={r.value}
                    type="button"
                    onClick={() => setRole(r.value)}
                    className={`relative flex items-start gap-3 rounded-xl border p-4 text-left transition-all duration-300 ${
                      role === r.value
                        ? "border-indigo-500/60 bg-indigo-500/10 shadow-lg shadow-indigo-500/10"
                        : "border-neutral-800 bg-neutral-800/30 hover:border-neutral-600"
                    }`}
                  >
                    {role === r.value && (
                      <motion.span
                        layoutId="role-check"
                        className="absolute right-3 top-3 flex size-5 items-center justify-center rounded-full bg-indigo-500"
                      >
                        <Check className="size-3 text-white" />
                      </motion.span>
                    )}
                    <div
                      className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${
                        role === r.value ? "bg-indigo-500/20" : "bg-neutral-800"
                      }`}
                    >
                      <r.icon className={`size-4 ${role === r.value ? "text-indigo-400" : "text-neutral-400"}`} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{r.title}</p>
                      <p className="mt-0.5 text-xs text-neutral-400">{r.description}</p>
                    </div>
                  </button>
                ))}
              </div>

              <form className="mt-6 space-y-4" onSubmit={handleSubmit} noValidate>
                {/* এরর মেসেজ */}
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

                {/* Name */}
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-xs font-medium text-neutral-300">
                    Full name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-neutral-500" />
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value)
                        setError(null)
                      }}
                      placeholder={role === "recruiter" ? "Your full name" : "e.g. Rafiq Ahmed"}
                      required
                      className="w-full rounded-lg border border-neutral-800 bg-neutral-800/50 py-2.5 pl-9 pr-3 text-sm text-white outline-none transition-colors duration-300 placeholder:text-neutral-600 focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/20"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="mb-1.5 block text-xs font-medium text-neutral-300">
                    Work email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-neutral-500" />
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value)
                        setError(null)
                      }}
                      placeholder="you@company.com"
                      required
                      className="w-full rounded-lg border border-neutral-800 bg-neutral-800/50 py-2.5 pl-9 pr-3 text-sm text-white outline-none transition-colors duration-300 placeholder:text-neutral-600 focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/20"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label htmlFor="password" className="mb-1.5 block text-xs font-medium text-neutral-300">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-neutral-500" />
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value)
                        setError(null)
                      }}
                      placeholder="At least 8 characters"
                      required
                      minLength={8}
                      className="w-full rounded-lg border border-neutral-800 bg-neutral-800/50 py-2.5 pl-9 pr-10 text-sm text-white outline-none transition-colors duration-300 placeholder:text-neutral-600 focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/20"
                    />
                    <button
                      type="button"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 transition-colors hover:text-neutral-300"
                    >
                      {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                    </button>
                  </div>

                  {/* Strength meter */}
                  {password.length > 0 && (
                    <div className="mt-2">
                      <div className="flex gap-1.5">
                        {[0, 1, 2, 3].map((i) => (
                          <span
                            key={i}
                            className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                              i < strength.score ? strength.color : "bg-neutral-700"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="mt-1 text-[11px] text-neutral-500">
                        Password strength: <span className="text-neutral-300">{password.length ? strength.label || "Too short" : ""}</span>
                      </p>
                    </div>
                  )}
                </div>

                {/* Terms */}
                <div>
                  <label className="flex cursor-pointer items-start gap-2 text-xs text-neutral-400">
                    <input
                      checked={agreed}
                      onChange={(e) => {
                        setAgreed(e.target.checked)
                        setAgreeError(false)
                      }}
                      type="checkbox"
                      required
                      className="mt-0.5 size-3.5 rounded-sm accent-indigo-500"
                    />
                    <span>
                      I agree to the{" "}
                      <a href="#" className="text-indigo-400 transition-colors hover:text-indigo-300">Terms of Service</a>{" "}
                      and{" "}
                      <a href="#" className="text-indigo-400 transition-colors hover:text-indigo-300">Privacy Policy</a>.
                    </span>
                  </label>

                  {/* Agree না করলে checkbox-এর নিচে message */}
                  {agreeError && (
                    <p className="mt-2 ml-5 text-xs text-red-400">
                      Please agree to the Terms of Service and Privacy Policy.
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  isDisabled={isLoading}
                  className="h-11 w-full gap-2 rounded-lg bg-indigo-500 text-sm text-white transition-all duration-300 hover:bg-indigo-400 hover:shadow-lg hover:shadow-indigo-500/40 disabled:pointer-events-none disabled:opacity-60"
                >
                  {isLoading ? (
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                      className="size-4 rounded-full border-2 border-white/30 border-t-white"
                    />
                  ) : role === "recruiter" ? (
                    <Upload className="size-4" />
                  ) : (
                    <Briefcase className="size-4" />
                  )}
                  {isLoading
                    ? "Creating account..."
                    : role === "recruiter"
                      ? "Start Hiring"
                      : "Start Job Hunting"}
                </Button>
              </form>

              <div className="my-5 flex items-center gap-3 text-xs text-neutral-600">
                <span className="h-px flex-1 bg-neutral-800" />
                or continue with
                <span className="h-px flex-1 bg-neutral-800" />
              </div>

              {/* Google দিয়ে সাইন আপ — পরে আসল OAuth এখানে যুক্ত হবে */}
              <button
                type="button"
                className="flex h-10 w-full items-center justify-center gap-2.5 rounded-lg border border-neutral-700 bg-neutral-800/50 text-sm text-neutral-200 transition-all duration-300 hover:border-neutral-600 hover:bg-neutral-800"
              >
                <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1Z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z" />
                  <path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84Z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15A11 11 0 0 0 2.18 7.06l3.66-2.84c.87-2.6 3.3-4.52 6.16-4.52Z" />
                </svg>
                Continue with Google
              </button>

              {/* Perks */}
              <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 border-t border-neutral-800 pt-5 text-xs text-neutral-500">
                {perks.map((perk) => (
                  <span key={perk} className="inline-flex items-center gap-1.5">
                    <Check className="size-3 text-indigo-400" />
                    {perk}
                  </span>
                ))}
              </div>

              <p className="mt-6 text-center text-sm text-neutral-400">
                Already have an account?{" "}
                <Link href="/login" className="font-medium text-indigo-400 transition-colors hover:text-indigo-300">
                  Sign in
                </Link>
              </p>
            </>
          )}
        </motion.div>
      </div>
    </div>
  )
}
