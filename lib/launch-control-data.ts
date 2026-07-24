import type { Platform } from "@/types";

export type LaunchChecklistItem = {
  id: string;
  label: string;
  detail: string;
  owner: string;
  status: "ready" | "next" | "blocked";
};

export type ProfileKitItem = {
  platform: Platform | "facebook";
  name: string;
  handle: string;
  cadence: string;
  role: string;
  setupCopy: string;
  cta: string;
  notes: string;
};

export type LaunchContentDraft = {
  id: string;
  week: "Week 1" | "Week 2" | "Week 3";
  platform: Platform | "facebook";
  format: "Text post" | "Carousel" | "Short video" | "Proof post";
  theme: string;
  title: string;
  copy: string;
  assetDirection: string;
  status: "Ready to review" | "Needs visual" | "Needs founder input";
};

export type KpiTarget = {
  metric: string;
  baseline: string;
  target: string;
  stretch: string;
  notes: string;
};

export type EngagementPrompt = {
  audience: string;
  where: string;
  commentAngle: string;
};

export const launchChecklist: LaunchChecklistItem[] = [
  {
    id: "profiles",
    label: "Create all required profiles",
    detail:
      "LinkedIn company page, X, Instagram, and Facebook page using a consistent CrumbLabz handle and the new admin email.",
    owner: "Milan",
    status: "next"
  },
  {
    id: "linkedin",
    label: "Build LinkedIn as the anchor channel",
    detail:
      "Logo, banner, tagline, About section, services list, website link, and first pinned post.",
    owner: "Milan + bosses for approval",
    status: "next"
  },
  {
    id: "scheduler",
    label: "Stand up scheduler flow",
    detail:
      "Use Buffer first for the MVP. The app remains the planning and approval layer; Buffer handles distribution.",
    owner: "Milan",
    status: "ready"
  },
  {
    id: "content-batch",
    label: "Batch 2-3 weeks of content",
    detail:
      "Prepare LinkedIn anchor posts plus repurposed Instagram, X, and Facebook versions before live posting starts.",
    owner: "Milan",
    status: "ready"
  },
  {
    id: "tracking",
    label: "Wire tracking and baselines",
    detail:
      "Start every metric from zero, use UTM links on outbound URLs, and track weekly movement against the day-90 targets.",
    owner: "Milan",
    status: "ready"
  },
  {
    id: "engagement",
    label: "Manual engagement routine",
    detail:
      "Log at least 20 genuine comments per week on relevant posts. This is not automated because the brief says it is the growth lever.",
    owner: "Milan",
    status: "next"
  }
];

export const profileKit: ProfileKitItem[] = [
  {
    platform: "linkedin",
    name: "LinkedIn Company Page",
    handle: "CrumbLabz",
    cadence: "3 posts / week",
    role: "Anchor channel",
    setupCopy:
      "CrumbLabz helps businesses turn operational headaches into working tools. We design and build practical custom software for teams dealing with repetitive tasks, slow workflows, disconnected systems, and inefficient reporting.",
    cta: "Tell us your headache.",
    notes:
      "Use the strongest About section here. LinkedIn is where the 90-day target is graded most heavily."
  },
  {
    platform: "x",
    name: "X",
    handle: "@crumblabz",
    cadence: "2 posts / week",
    role: "Short thoughts and proof snippets",
    setupCopy:
      "Turning operational headaches into working tools. Custom software for smarter business operations. Built in days, not months.",
    cta: "crumblabz.com",
    notes:
      "Keep this concise. Repurpose one useful idea from each LinkedIn post."
  },
  {
    platform: "instagram",
    name: "Instagram",
    handle: "@crumblabz",
    cadence: "2 posts / week",
    role: "Visual proof and carousels",
    setupCopy:
      "Custom operations software for real businesses, designed and shipped in days. One problem at a time.",
    cta: "Describe your business headache.",
    notes:
      "Use carousels, screenshots, and short reels. Avoid generic AI art."
  },
  {
    platform: "facebook",
    name: "Facebook Page",
    handle: "CrumbLabz",
    cadence: "2 posts / week",
    role: "Business presence and local trust",
    setupCopy:
      "CrumbLabz builds practical software tools that help businesses run smoother. If a process is slow, repetitive, or hard to track, we can help turn it into a working tool.",
    cta: "Visit crumblabz.com",
    notes:
      "Mirror the strongest LinkedIn updates. Do not over-invest here at the start."
  }
];

export const launchContentDrafts: LaunchContentDraft[] = [
  {
    id: "w1-linkedin-1",
    week: "Week 1",
    platform: "linkedin",
    format: "Text post",
    theme: "Positioning",
    title: "Describe it Monday. Use it Friday.",
    copy:
      "Describe it Monday. Use it Friday.\n\nCustom operations software for real businesses, designed and shipped in days. One problem at a time.\n\nEvery business has a process that quietly eats hours. CrumbLabz builds focused tools for the workflows that slow teams down: manual data entry, slow reporting, disconnected tools, slow customer response, repetitive admin tasks, and no visibility into data.\n\nTell us your headache.",
    assetDirection:
      "Use the minimal website-matched launch carousel with the live hero-sky image and exact CrumbLabz logo.",
    status: "Ready to review"
  },
  {
    id: "w1-linkedin-2",
    week: "Week 1",
    platform: "linkedin",
    format: "Proof post",
    theme: "Build proof",
    title: "The value of a working review link",
    copy:
      "A working review link changes the conversation.\n\nInstead of debating an abstract idea, the team can click through the workflow, react to what is missing, and decide what should happen next.\n\nThat is why CrumbLabz favours fast MVPs over long planning cycles.\n\nGet the useful version live. Learn from it. Refine what matters.",
    assetDirection:
      "Use the website-inspired delivered dashboard proof visual for review, then replace it with a real client-safe screenshot when available.",
    status: "Ready to review"
  },
  {
    id: "w1-linkedin-3",
    week: "Week 1",
    platform: "linkedin",
    format: "Text post",
    theme: "Founder education",
    title: "Small tools can create big impact",
    copy:
      "Not every operational problem needs a giant platform.\n\nSometimes the highest-value tool is small:\n\n- a dashboard that replaces a weekly manual report\n- a tracker that keeps every follow-up in one place\n- an approval queue that stops work getting lost\n- a document generator that turns call notes into usable next steps\n\nSmall tools work when they remove a real point of friction.",
    assetDirection:
      "Text-only post or a four-tile graphic showing examples of small tools.",
    status: "Ready to review"
  },
  {
    id: "w1-x-1",
    week: "Week 1",
    platform: "x",
    format: "Text post",
    theme: "Repurposed insight",
    title: "Software should remove friction",
    copy:
      "Good internal software does not need to be impressive.\n\nIt needs to remove friction from the way the business already works.",
    assetDirection: "No asset needed.",
    status: "Ready to review"
  },
  {
    id: "w1-instagram-1",
    week: "Week 1",
    platform: "instagram",
    format: "Carousel",
    theme: "Website-inspired launch carousel",
    title: "Describe it Monday. Use it Friday.",
    copy:
      "Slide 1: Describe it Monday. Use it Friday.\nSlide 2: One problem at a time.\nSlide 3: Every business has a process that quietly eats hours.\nSlide 4: Less waiting. More working.\nSlide 5: Real tools, really shipped.\nSlide 6: Tell us your headache.",
    assetDirection:
      "Six finished 1080x1080 carousel slides using the live website hero image, official logo, minimal colours, and homepage copy.",
    status: "Ready to review"
  },
  {
    id: "w2-linkedin-1",
    week: "Week 2",
    platform: "linkedin",
    format: "Text post",
    theme: "Process",
    title: "Start with the problem, not the tech",
    copy:
      "The best software conversations do not start with the tech stack.\n\nThey start with the workflow.\n\nWhat happens today?\nWhere does it slow down?\nWho touches the process?\nWhat gets missed?\nWhat would make the work easier next week?\n\nOnce that is clear, the tool becomes much easier to design.",
    assetDirection:
      "Simple checklist graphic: current workflow, pain point, users, desired outcome.",
    status: "Ready to review"
  },
  {
    id: "w2-linkedin-2",
    week: "Week 2",
    platform: "linkedin",
    format: "Proof post",
    theme: "Portfolio proof",
    title: "From scattered process to single source of truth",
    copy:
      "A common pattern we see:\n\nThe work is happening, but the truth is scattered.\n\nSome of it is in spreadsheets. Some of it is in inboxes. Some of it is in someone's memory. Some of it is in a tool nobody fully trusts.\n\nA focused dashboard can turn that into one place to see status, ownership, and next action.\n\nThat is often the first useful version.",
    assetDirection:
      "Use an anonymized dashboard screenshot or abstract table preview.",
    status: "Needs visual"
  },
  {
    id: "w2-linkedin-3",
    week: "Week 2",
    platform: "linkedin",
    format: "Text post",
    theme: "AI without hype",
    title: "Let AI handle the busywork",
    copy:
      "AI is most useful when it handles the busywork around a process.\n\nDraft the document.\nSummarize the call.\nExtract the fields.\nSuggest the next step.\nPrepare the first version.\n\nThe human still reviews judgment, context, and voice.\n\nThat is the line CrumbLabz cares about: automate the repetitive work, not the responsibility.",
    assetDirection:
      "Text-only post. Strong candidate for LinkedIn discussion.",
    status: "Ready to review"
  },
  {
    id: "w2-facebook-1",
    week: "Week 2",
    platform: "facebook",
    format: "Text post",
    theme: "Business overview",
    title: "What CrumbLabz does",
    copy:
      "CrumbLabz helps businesses solve everyday operational problems with practical custom software.\n\nIf your team is stuck with repetitive tasks, slow reporting, scattered data, or manual handoffs, we help turn that headache into a working tool.",
    assetDirection:
      "Use logo or simple branded visual with the website CTA.",
    status: "Ready to review"
  },
  {
    id: "w2-instagram-1",
    week: "Week 2",
    platform: "instagram",
    format: "Short video",
    theme: "Behind the scenes",
    title: "How a tool starts",
    copy:
      "Short video script:\n\nA CrumbLabz project usually starts with one sentence: 'This part of our business is taking too long.'\n\nFrom there, we map the workflow, find the friction, and build the smallest useful tool to fix it.\n\nThe first version does not need to do everything. It needs to solve the real problem.",
    assetDirection:
      "Screen recording or talking-head video over a workflow sketch.",
    status: "Needs visual"
  },
  {
    id: "w3-linkedin-1",
    week: "Week 3",
    platform: "linkedin",
    format: "Text post",
    theme: "Trust building",
    title: "Why we build first and refine later",
    copy:
      "A long spec can still miss the point.\n\nA working tool exposes the truth quickly.\n\nUsers click the wrong thing. A missing field becomes obvious. A report needs a different breakdown. The handoff is not quite right.\n\nThat feedback is valuable.\n\nBuild the first useful version, then refine it against real usage.",
    assetDirection:
      "Text-only post or side-by-side: spec vs working tool.",
    status: "Ready to review"
  },
  {
    id: "w3-linkedin-2",
    week: "Week 3",
    platform: "linkedin",
    format: "Carousel",
    theme: "Client education",
    title: "What to bring to a discovery call",
    copy:
      "Slide 1: What to bring to a CrumbLabz discovery call\nSlide 2: The process that feels slow\nSlide 3: The tools you use today\nSlide 4: The people involved\nSlide 5: The part that creates the most mistakes\nSlide 6: What success would look like\nSlide 7: We turn that into a solution design",
    assetDirection:
      "Seven-slide carousel. Keep each slide very sparse.",
    status: "Needs visual"
  },
  {
    id: "w3-linkedin-3",
    week: "Week 3",
    platform: "linkedin",
    format: "Proof post",
    theme: "Offer",
    title: "Describe one headache",
    copy:
      "If you are not sure whether a process is worth automating, start with one operational headache.\n\nNot the whole business.\nNot a giant transformation plan.\nJust one workflow that is slower, messier, or more manual than it should be.\n\nThat is enough to design the first useful tool.",
    assetDirection:
      "Branded CTA graphic: 'Tell us your headache'.",
    status: "Ready to review"
  },
  {
    id: "w3-x-1",
    week: "Week 3",
    platform: "x",
    format: "Text post",
    theme: "Repurposed insight",
    title: "One workflow is enough",
    copy:
      "You do not need to automate the whole business.\n\nStart with one workflow that is slower than it should be.",
    assetDirection: "No asset needed.",
    status: "Ready to review"
  },
  {
    id: "w3-instagram-1",
    week: "Week 3",
    platform: "instagram",
    format: "Carousel",
    theme: "Brand positioning",
    title: "Days, not months",
    copy:
      "Slide 1: Days, not months\nSlide 2: Identify the operational headache\nSlide 3: Map the current workflow\nSlide 4: Build the first useful tool\nSlide 5: Review it with the team\nSlide 6: Improve what matters\nSlide 7: CrumbLabz builds custom tools for smarter operations",
    assetDirection:
      "Carousel with navy background, orange section numbers, and simple diagrams.",
    status: "Needs visual"
  }
];

export const kpiTargets: KpiTarget[] = [
  {
    metric: "LinkedIn followers",
    baseline: "0",
    target: "200",
    stretch: "350",
    notes: "Anchor channel"
  },
  {
    metric: "Cumulative impressions",
    baseline: "0",
    target: "30k",
    stretch: "50k",
    notes: "All channels combined"
  },
  {
    metric: "Average engagement rate",
    baseline: "0%",
    target: "4%",
    stretch: "6%",
    notes: "Good organic benchmark is around 2-3%"
  },
  {
    metric: "Posts clearing 1k impressions",
    baseline: "0",
    target: "5",
    stretch: "10",
    notes: "Find what works and repeat it"
  },
  {
    metric: "Social-attributed site clicks",
    baseline: "0",
    target: "250",
    stretch: "400",
    notes: "UTM every outbound URL"
  },
  {
    metric: "Qualified inbound conversations",
    baseline: "0",
    target: "3-5",
    stretch: "-",
    notes: "Lagging indicator, judged on contribution"
  }
];

export const engagementPrompts: EngagementPrompt[] = [
  {
    audience: "Operations leaders",
    where: "LinkedIn posts about manual reporting, spreadsheets, or process bottlenecks",
    commentAngle:
      "Add a practical observation about where small internal tools can remove friction."
  },
  {
    audience: "Founders and small business owners",
    where: "Posts about scaling, delegation, or messy internal systems",
    commentAngle:
      "Ask what process is still too dependent on one person remembering every step."
  },
  {
    audience: "AI operators",
    where: "Posts about AI automation and workflow tools",
    commentAngle:
      "Reinforce the CrumbLabz view: automate busywork, keep human judgment."
  },
  {
    audience: "Local/service businesses",
    where: "Updates about hiring, growth, admin load, or customer operations",
    commentAngle:
      "Point toward simple tools that reduce repetitive admin without sounding salesy."
  }
];
