// Client-safe auth helpers — client কম্পোনেন্টগুলো এখান থেকে import করবে
// (lib/auth.ts সার্ভার-অন্লি better-auth config, ক্লায়েন্টে ইমপোর্ট করা যাবে না)
export type Session = {
  name: string
  email: string
  role: "seeker" | "recruiter"
  signedInAt: string
}

const KEY = "hireloop_session"

export function saveSession(session: Omit<Session, "signedInAt">) {
  if (typeof window === "undefined") return
  localStorage.setItem(KEY, JSON.stringify({ ...session, signedInAt: new Date().toISOString() }))
}

export function getSession(): Session | null {
  if (typeof window === "undefined") return null
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as Session) : null
  } catch {
    return null
  }
}

export function clearSession() {
  if (typeof window === "undefined") return
  localStorage.removeItem(KEY)
}

export function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}
