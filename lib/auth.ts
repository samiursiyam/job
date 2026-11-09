// সার্ভার-অন্লি ফাইল — ক্লায়েন্ট কম্পোনেন্ট থেকে ইমপোর্ট করবেন না!
// Client helpers পেতে lib/session.ts ব্যবহার করুন।
import { MongoClient } from "mongodb"
import { mongodbAdapter } from "@better-auth/mongo-adapter"
import { betterAuth } from "better-auth"

// Better Auth সার্ভার — app/api/auth/[...all]/route.ts এ ব্যবহৃত হয়
const client = new MongoClient(process.env.MONGODB_URI as string)
const db = client.db("hireloop")

export const auth = betterAuth({
  database: mongodbAdapter(db),
  emailAndPassword: {
    enabled: true,
  },
   user: {
       additionalFields: {
          role: {
              type: "string",
              input: false
            } 
        }
    },
  socialProviders: {
    google: {
      enabled: true,
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    },
  },
})
