// পুরো সাইটের mock data — পরে ডেটাবেস/ব্যাকএন্ডে বদলানো যাবে
export const routes = {
  jobs: "/jobs",
  companies: "/companies",
  pricing: "/pricing",
  signin: "/signin",
}

export type Feature = {
  title: string
  description: string
  points: string[]
  icon: string
}

export const features: Feature[] = [
  {
    title: "Smart Search",
    description: "Find roles instantly with filters for skill, salary, location and job type.",
    points: ["Keyword + filter search", "Save and reuse searches", "Instant live results"],
    icon: "search",
  },
  {
    title: "Salary Insights",
    description: "See real pay data before you apply — no more guessing what a role pays.",
    points: ["Verified salary ranges", "Compare by city", "Trend by category"],
    icon: "coins",
  },
  {
    title: "Top Companies",
    description: "Explore detailed profiles for thousands of trusted, verified companies.",
    points: ["Company cards & bios", "Open roles per company", "Employee count & industry"],
    icon: "building",
  },
  {
    title: "Saved Jobs",
    description: "Bookmark jobs you love and get back to them from any device, anytime.",
    points: ["Unlimited bookmarks", "One-click apply later", "Synced everywhere"],
    icon: "bookmark",
  },
  {
    title: "Application Tracking",
    description: "Follow every application from Applied to Offered in a single timeline.",
    points: ["Status timeline", "Interview reminders", "Offer tracking"],
    icon: "activity",
  },
  {
    title: "Instant Alerts",
    description: "Fresh matching roles get delivered straight to your inbox every day.",
    points: ["Daily job alerts", "Application updates", "Deadline warnings"],
    icon: "bell",
  },
]

export type Company = {
  slug: string
  name: string
  logo: string
  industry: string
  location: string
  employees: string
  openJobs: number
}

export const companies: Company[] = [
  { slug: "google", name: "Google", logo: "/logo/google.png", industry: "AI", location: "Mountain View, CA", employees: "10,000+", openJobs: 42 },
  { slug: "meta", name: "Meta", logo: "/logo/meta.png", industry: "AI", location: "Menlo Park, CA", employees: "10,000+", openJobs: 67 },
  { slug: "amazon", name: "Amazon", logo: "/logo/amazon.png", industry: "E-Commerce", location: "Seattle, WA", employees: "10,000+", openJobs: 120 },
  { slug: "apple", name: "Apple", logo: "/logo/apple.png", industry: "Developer Tools", location: "Cupertino, CA", employees: "10,000+", openJobs: 53 },
  { slug: "microsoft", name: "Microsoft", logo: "/logo/microsoft.png", industry: "Developer Tools", location: "Redmond, WA", employees: "10,000+", openJobs: 88 },
  { slug: "netflix", name: "Netflix", logo: "/logo/netflix.png", industry: "Fintech", location: "Los Gatos, CA", employees: "5,000-10,000", openJobs: 29 },
  { slug: "tesla", name: "Tesla", logo: "/logo/tesla.png", industry: "E-Commerce", location: "Austin, TX", employees: "10,000+", openJobs: 74 },
  { slug: "nvidia", name: "NVIDIA", logo: "/logo/nvidia.png", industry: "AI", location: "Santa Clara, CA", employees: "5,000-10,000", openJobs: 61 },
  { slug: "spotify", name: "Spotify", logo: "/logo/spotify.png", industry: "Developer Tools", location: "Stockholm, SE", employees: "1,000-5,000", openJobs: 18 },
  { slug: "airbnb", name: "Airbnb", logo: "/logo/airbnb.png", industry: "E-Commerce", location: "San Francisco, CA", employees: "1,000-5,000", openJobs: 22 },
  { slug: "uber", name: "Uber", logo: "/logo/uber.png", industry: "Fintech", location: "San Francisco, CA", employees: "5,000-10,000", openJobs: 35 },
  { slug: "adobe", name: "Adobe", logo: "/logo/adobe.png", industry: "Developer Tools", location: "San Jose, CA", employees: "5,000-10,000", openJobs: 27 },
]

export const industries = ["All", "AI", "Fintech", "Developer Tools", "E-Commerce"]

export type Job = {
  id: string
  title: string
  company: string // company slug
  location: string
  type: string
  category: string
  salary: string
  posted: string
  description: string
  responsibilities: string[]
  requirements: string[]
  benefits: string[]
}

export const jobList: Job[] = [
  {
    id: "senior-frontend-engineer",
    title: "Senior Frontend Engineer",
    company: "google",
    location: "Mountain View, CA",
    type: "Full-time",
    category: "Development",
    salary: "$150K - $210K",
    posted: "2 days ago",
    description:
      "We are looking for a Senior Frontend Engineer to build delightful, performant web experiences used by billions of people. You will work closely with design, product and backend teams to ship polished features end-to-end.",
    responsibilities: [
      "Build and maintain high-performance React interfaces",
      "Collaborate with designers on pixel-perfect implementations",
      "Mentor junior engineers and review code",
      "Drive frontend architecture decisions",
    ],
    requirements: [
      "6+ years of frontend experience",
      "Expert React, TypeScript and modern CSS",
      "Strong grasp of performance and accessibility",
      "Experience with large-scale codebases",
    ],
    benefits: ["Health & dental insurance", "Annual learning budget", "Stock grants", "Flexible schedule"],
  },
  {
    id: "product-designer",
    title: "Product Designer",
    company: "spotify",
    location: "Remote",
    type: "Remote",
    category: "Design",
    salary: "$110K - $160K",
    posted: "3 days ago",
    description:
      "Join Spotify's product design team to craft listening experiences loved by hundreds of millions of users. You will lead design flows from discovery to polished handoff.",
    responsibilities: [
      "Design flows, wireframes and high-fidelity UI",
      "Run user research and usability tests",
      "Maintain and extend the design system",
      "Partner with product and engineering",
    ],
    requirements: [
      "4+ years of product design experience",
      "Mastery of Figma and prototyping",
      "Strong visual design fundamentals",
      "Music passion is a plus",
    ],
    benefits: ["Fully remote", "Spotify Premium family", "Wellness stipend", "28 days PTO"],
  },
  {
    id: "data-scientist",
    title: "Data Scientist",
    company: "nvidia",
    location: "Santa Clara, CA",
    type: "Full-time",
    category: "Data",
    salary: "$140K - $200K",
    posted: "1 day ago",
    description:
      "NVIDIA is hiring a Data Scientist to turn massive GPU telemetry into product insights. You will build models and dashboards that power decision-making across the company.",
    responsibilities: [
      "Analyze large-scale telemetry datasets",
      "Build predictive and recommendation models",
      "Design experiments and measure impact",
      "Present findings to product leadership",
    ],
    requirements: [
      "MS in a quantitative field",
      "Python, SQL and deep learning frameworks",
      "Strong statistics foundation",
      "Experience with GPU data pipelines a plus",
    ],
    benefits: ["Relocation support", "Stock purchase plan", "Free gym access", "Annual bonus"],
  },
  {
    id: "devops-engineer",
    title: "DevOps Engineer",
    company: "amazon",
    location: "Seattle, WA",
    type: "Full-time",
    category: "Infrastructure",
    salary: "$130K - $180K",
    posted: "5 days ago",
    description:
      "Amazon Web Services team is looking for a DevOps Engineer to automate and scale the infrastructure behind Amazon's e-commerce platform.",
    responsibilities: [
      "Automate CI/CD pipelines",
      "Monitor and improve system reliability",
      "Manage Kubernetes and cloud infrastructure",
      "On-call rotation and incident reviews",
    ],
    requirements: [
      "5+ years DevOps/SRE experience",
      "Deep AWS and Terraform knowledge",
      "Strong Linux scripting skills",
      "Experience at high scale",
    ],
    benefits: ["Amazon RSUs", "Comprehensive health plan", "Tuition reimbursement", "Relocation package"],
  },
  {
    id: "marketing-manager",
    title: "Marketing Manager",
    company: "netflix",
    location: "Los Gatos, CA",
    type: "Full-time",
    category: "Marketing",
    salary: "$100K - $140K",
    posted: "1 week ago",
    description:
      "Netflix is seeking a Marketing Manager to craft creative campaigns for original content launches across global markets.",
    responsibilities: [
      "Own end-to-end campaign planning",
      "Partner with creative and content teams",
      "Analyze campaign performance data",
      "Coordinate multi-market launches",
    ],
    requirements: [
      "6+ years in consumer marketing",
      "Entertainment or streaming background",
      "Strong data-driven mindset",
      "Excellent storytelling skills",
    ],
    benefits: ["Netflix premium plan", "Flexible hours", "Quarterly bonuses", "Parental leave policy"],
  },
  {
    id: "mobile-engineer",
    title: "Mobile Engineer (iOS)",
    company: "airbnb",
    location: "San Francisco, CA",
    type: "Contract",
    category: "Development",
    salary: "$90 - $130 /hr",
    posted: "4 days ago",
    description:
      "Help shape the future of travel on iOS. You'll build the Airbnb app experiences used by hosts and guests around the world.",
    responsibilities: [
      "Develop new features in Swift/SwiftUI",
      "Improve app performance and stability",
      "Collaborate in an iOS guild of 50+ engineers",
      "Ship weekly with confidence",
    ],
    requirements: [
      "4+ years iOS development",
      "Swift, SwiftUI and Combine",
      "App Store architecture knowledge",
      "CI/CD familiarity (Xcode Cloud)",
    ],
    benefits: ["Travel stipend", "Flexible contract terms", "Top-tier hardware", "Team retreats"],
  },
  {
    id: "growth-analyst",
    title: "Growth Analyst",
    company: "meta",
    location: "Remote",
    type: "Remote",
    category: "Data",
    salary: "$95K - $135K",
    posted: "6 days ago",
    description:
      "Meta's growth team is hiring analysts to identify and model growth opportunities across Meta's family of apps.",
    responsibilities: [
      "Model funnel performance across products",
      "Identify and quantify growth levers",
      "Build A/B testing programs",
      "Partner with growth engineering squads",
    ],
    requirements: [
      "3+ years in growth/product analytics",
      "SQL and advanced statistics",
      "Experiment design experience",
      "Great communication skills",
    ],
    benefits: ["Remote-first", "Meta wellness allowance", "Learning stipend", "Generous PTO"],
  },
  {
    id: "backend-engineer",
    title: "Backend Engineer (Payments)",
    company: "uber",
    location: "San Francisco, CA",
    type: "Full-time",
    category: "Development",
    salary: "$135K - $190K",
    posted: "New",
    description:
      "Uber's payments platform processes billions of dollars every year. Join the Backend team building the ledger and payout systems trusted by drivers and merchants worldwide.",
    responsibilities: [
      "Design and ship scalable payment services",
      "Ensure correctness and auditability of flows",
      "Optimize for latency and reliability",
      "Review and mentor teammates",
    ],
    requirements: [
      "5+ years backend engineering",
      "Go or Java microservices at scale",
      "Payments or fintech experience",
      "Strong system design skills",
    ],
    benefits: ["Uber credits", "RSU grants", "Health insurance", "Commuter benefits"],
  },
]

export type PricingTier = {
  name: string
  price: string
  period: string
  description: string
  points: string[]
  popular?: boolean
}

export const pricingForSeekers: PricingTier[] = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for getting started with your job hunt.",
    points: ["Browse & save up to 10 jobs", "Apply to up to 3 jobs / month", "Basic profile", "Email alerts"],
  },
  {
    name: "Pro",
    price: "$19",
    period: "/month",
    description: "Everything a serious job seeker needs.",
    points: ["Apply to up to 30 jobs / month", "Unlimited saved jobs", "Application tracking", "Salary insights"],
    popular: true,
  },
  {
    name: "Premium",
    price: "$39",
    period: "/month",
    description: "Maximum power for maximum results.",
    points: ["Unlimited applications", "Profile boost to recruiters", "Early access to new jobs", "Priority support"],
  },
]

export const pricingForRecruiters: PricingTier[] = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Great for a company's first year of hiring.",
    points: ["Up to 3 active job posts", "Basic applicant management", "Standard listing visibility"],
  },
  {
    name: "Growth",
    price: "$49",
    period: "/month",
    description: "Scale your hiring as demand grows.",
    points: ["Up to 10 active job posts", "Applicant tracking", "Basic analytics", "Email support"],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "$149",
    period: "/month",
    description: "Hire at scale with the full toolkit.",
    points: ["Up to 50 active job posts", "Advanced analytics dashboard", "Featured listings", "Priority support"],
  },
]

export const faqs = [
  {
    question: "Can I cancel my plan at any time?",
    answer: "Yes — you can cancel anytime from your billing page. Your plan stays active until the end of the current billing period.",
  },
  {
    question: "Do you offer refunds?",
    answer: "All paid plans include a 14-day money-back guarantee. Just contact support within 14 days of payment.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit and debit cards via Stripe, including Visa, Mastercard and Amex.",
  },
  {
    question: "Can I switch between plans later?",
    answer: "Absolutely. You can upgrade or downgrade at any time, and the billing is prorated automatically.",
  },
]

export const jobTypes = ["All", "Full-time", "Part-time", "Remote", "Contract", "Internship"]
