import type {
  BrandRule,
  Campaign,
  MetricSnapshot,
  SocialChannel,
  SocialPost,
  WeeklyPlaybookItem
} from "@/types";

export const channels: SocialChannel[] = [
  {
    id: "linkedin-company",
    platform: "linkedin",
    name: "LinkedIn Company Page",
    handle: "CrumbLabz",
    audience: "Founders, operators, hiring teams",
    cadence: "3 posts / week",
    status: "ready"
  },
  {
    id: "instagram-main",
    platform: "instagram",
    name: "Instagram",
    handle: "@crumblabz",
    audience: "Builders, students, visual proof",
    cadence: "4 posts / week",
    status: "needs_auth"
  },
  {
    id: "tiktok-main",
    platform: "tiktok",
    name: "TikTok",
    handle: "@crumblabz",
    audience: "Short-form discovery",
    cadence: "3 clips / week",
    status: "manual_review"
  },
  {
    id: "youtube-shorts",
    platform: "youtube",
    name: "YouTube Shorts",
    handle: "@crumblabz",
    audience: "Searchable product lessons",
    cadence: "2 shorts / week",
    status: "manual_review"
  },
  {
    id: "threads-main",
    platform: "threads",
    name: "Threads",
    handle: "@crumblabz",
    audience: "Fast product updates",
    cadence: "2 posts / week",
    status: "needs_auth"
  },
  {
    id: "bluesky-main",
    platform: "bluesky",
    name: "Bluesky",
    handle: "@crumblabz.com",
    audience: "Technical builders",
    cadence: "2 posts / week",
    status: "needs_auth"
  }
];

export const campaigns: Campaign[] = [
  {
    id: "build-in-public",
    name: "Build in Public",
    goal: "Show how CrumbLabz turns rough ideas into shipped MVPs.",
    owner: "Product",
    stage: "active",
    startDate: "2026-07-15",
    endDate: "2026-08-14",
    color: "mint"
  },
  {
    id: "founder-education",
    name: "Founder Education",
    goal: "Teach practical startup systems in short, useful posts.",
    owner: "Growth",
    stage: "planning",
    startDate: "2026-07-22",
    endDate: "2026-08-30",
    color: "coral"
  },
  {
    id: "proof-of-work",
    name: "Proof of Work",
    goal: "Turn shipped prototypes, dashboards, and experiments into credibility.",
    owner: "Delivery",
    stage: "active",
    startDate: "2026-07-10",
    endDate: "2026-09-01",
    color: "plum"
  }
];

export const posts: SocialPost[] = [
  {
    id: "post-001",
    campaignId: "build-in-public",
    title: "From messy client idea to useful dashboard",
    caption:
      "Most MVPs fail before the build starts because the idea is still too foggy. Our process turns the first call into a scoped dashboard, live data model, and deployable review link before momentum disappears.",
    format: "carousel",
    owner: "Milan",
    status: "needs_approval",
    targetPlatforms: ["linkedin", "instagram"],
    scheduledAt: "2026-07-15T09:00:00.000Z",
    assetHint: "5-slide carousel: idea, workflow, data, dashboard, result",
    approvalNotes: "Needs final client-safe wording before posting."
  },
  {
    id: "post-002",
    campaignId: "proof-of-work",
    title: "30-second build recap",
    caption:
      "A fast product recap: problem, system, deployment, what we learned. Keep the proof tight and the lesson practical.",
    format: "short_video",
    owner: "Milan",
    status: "scheduled",
    targetPlatforms: ["tiktok", "instagram", "youtube"],
    scheduledAt: "2026-07-16T17:30:00.000Z",
    assetHint: "Vertical video with captions and project screenshots",
    approvalNotes: "Approved for demo account; do not mention client names."
  },
  {
    id: "post-003",
    campaignId: "founder-education",
    title: "The cheapest automation is a checklist",
    caption:
      "Before adding AI, write the approval checklist. If the team cannot agree what good looks like, automation only makes bad content faster.",
    format: "text",
    owner: "Growth",
    status: "draft",
    targetPlatforms: ["linkedin", "threads", "bluesky"],
    assetHint: "Text-only with one strong opening line",
    approvalNotes: "Add one example from the social engine."
  },
  {
    id: "post-004",
    campaignId: "build-in-public",
    title: "Social engine launch thread",
    caption:
      "We are building a CrumbLabz-owned social engine: campaign calendar, approvals, scheduled publishing, and reporting in one internal dashboard.",
    format: "founder_note",
    owner: "Milan",
    status: "approved",
    targetPlatforms: ["linkedin", "x", "threads"],
    scheduledAt: "2026-07-17T12:00:00.000Z",
    assetHint: "Founder note with product screenshot",
    approvalNotes: "Approved once the first screenshot is added."
  }
];

export const metrics: MetricSnapshot[] = [
  {
    label: "Approved this week",
    value: "8",
    change: "+3 vs plan",
    tone: "good"
  },
  {
    label: "Scheduled coverage",
    value: "11 days",
    change: "target 14",
    tone: "watch"
  },
  {
    label: "Ready channels",
    value: "1 / 6",
    change: "Buffer auth next",
    tone: "neutral"
  },
  {
    label: "Posting health",
    value: "Review",
    change: "mock mode",
    tone: "neutral"
  }
];

export const brandRules: BrandRule[] = [
  {
    label: "Practical first",
    detail: "Every post should teach, show proof, or open a useful conversation."
  },
  {
    label: "No vague hype",
    detail: "Avoid generic AI claims, exaggerated ROI, or fake certainty."
  },
  {
    label: "Founder-safe",
    detail: "Do not publish client names, private data, or screenshots without approval."
  },
  {
    label: "One CTA",
    detail: "Use a single action: reply, book, read, watch, or save."
  }
];

export const weeklyPlaybook: WeeklyPlaybookItem[] = [
  {
    day: "Monday",
    focus: "Founder lesson",
    platforms: ["linkedin", "threads", "bluesky"]
  },
  {
    day: "Wednesday",
    focus: "Build proof",
    platforms: ["instagram", "tiktok", "youtube"]
  },
  {
    day: "Friday",
    focus: "Offer or case study",
    platforms: ["linkedin", "instagram"]
  }
];
