"use client";

import { useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import {
  AlertTriangle,
  Archive,
  Bot,
  CalendarDays,
  Check,
  CheckCircle2,
  Clipboard,
  Download,
  ExternalLink,
  Facebook,
  Grid2X2,
  ImageIcon,
  Instagram,
  Linkedin,
  Plus,
  RefreshCw,
  Send,
  ShieldCheck,
  Sparkles,
  Twitter
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type ContentPost = {
  id: string;
  category: string;
  number: string;
  title: string;
  copy: string;
  hashtags: string[];
  platforms: string[];
  status: "Ready" | "Needs account" | "Needs screenshot" | "Scheduler next";
  assets: Array<{ src: string; alt: string }>;
  suggested?: string;
};

const navItems: Array<{ label: string; Icon: LucideIcon; active?: boolean }> = [
  { label: "Channel Setup", Icon: Grid2X2 },
  { label: "Content Strategy", Icon: Sparkles },
  { label: "Content Calendar", Icon: CalendarDays, active: true },
  { label: "Asset Library", Icon: ImageIcon },
  { label: "Automation Flow", Icon: Bot }
];

const stats = [
  {
    label: "Content prepared",
    value: "12",
    detail: "Week 1 captions and carousel assets"
  },
  {
    label: "Primary channel",
    value: "Instagram",
    detail: "@crumblabz created"
  },
  {
    label: "Automation stage",
    value: "Approval",
    detail: "Posting tokens still required"
  },
  {
    label: "Next connection",
    value: "Buffer",
    detail: "Scheduler and platform bridge"
  }
];

const channels = [
  {
    name: "Instagram",
    handle: "@crumblabz",
    status: "Account created",
    detail: "Ready for profile polish and first approved post.",
    Icon: Instagram,
    tone: "ready"
  },
  {
    name: "LinkedIn",
    handle: "CrumbLabz Company Page",
    status: "Needs admin access",
    detail: "Company page requires an eligible LinkedIn profile connection.",
    Icon: Linkedin,
    tone: "blocked"
  },
  {
    name: "Facebook",
    handle: "CrumbLabz Page",
    status: "Optional next",
    detail: "Useful once Meta Business Suite is set up.",
    Icon: Facebook,
    tone: "next"
  },
  {
    name: "X",
    handle: "@crumblabz",
    status: "Reserve next",
    detail: "Short proof snippets and repurposed LinkedIn ideas.",
    Icon: Twitter,
    tone: "next"
  }
];

const automationSteps = [
  {
    title: "Plan",
    detail: "Campaign themes, captions, assets, and status live in this app.",
    state: "Ready"
  },
  {
    title: "Approve",
    detail: "Bosses choose what is safe to post before anything is scheduled.",
    state: "Manual"
  },
  {
    title: "Schedule",
    detail: "Buffer or Meta Business Suite receives approved content.",
    state: "Next"
  },
  {
    title: "Publish",
    detail: "Protected API routes can post after account tokens are added.",
    state: "Pending tokens"
  },
  {
    title: "Report",
    detail: "UTM links and weekly results show what content is working.",
    state: "Planned"
  }
];

const posts: ContentPost[] = [
  {
    id: "brand-opener",
    category: "Brand opener",
    number: "1 / 12",
    title: "Describe it Monday. Use it Friday.",
    copy:
      "CrumbLabz turns operational headaches into working tools: dashboards, approval queues, outreach systems, reporting flows, and small internal software that saves real hours.\n\nStart with one slow process. We map it, build the useful version, and get it in front of the team fast.\n\nTell us your headache.",
    hashtags: [
      "#CustomSoftware",
      "#Operations",
      "#WorkflowAutomation",
      "#BusinessAutomation",
      "#CrumbLabz"
    ],
    platforms: ["Instagram", "LinkedIn"],
    status: "Ready",
    assets: [
      {
        src: "/instagram-first-post/crumblabz-website-carousel-01.png",
        alt: "Carousel slide 1"
      },
      {
        src: "/instagram-first-post/crumblabz-website-carousel-02.png",
        alt: "Carousel slide 2"
      },
      {
        src: "/instagram-first-post/crumblabz-website-carousel-03.png",
        alt: "Carousel slide 3"
      },
      {
        src: "/instagram-first-post/crumblabz-website-carousel-04.png",
        alt: "Carousel slide 4"
      },
      {
        src: "/instagram-first-post/crumblabz-website-carousel-05.png",
        alt: "Carousel slide 5"
      },
      {
        src: "/instagram-first-post/crumblabz-website-carousel-06.png",
        alt: "Carousel slide 6"
      }
    ]
  },
  {
    id: "real-tools",
    category: "Proof",
    number: "2 / 12",
    title: "Real tools, really shipped",
    copy:
      "The first post now follows the live website instead of trying to invent a separate social look.\n\nIt uses the homepage promise, real dashboard proof, the process-pain section, shipped-work proof, and the existing CTA.\n\nThat is the right first impression for CrumbLabz: simple, practical, and connected to the site.",
    hashtags: ["#Operations", "#Dashboards", "#WorkflowAutomation"],
    platforms: ["LinkedIn", "Instagram"],
    status: "Ready",
    assets: [
      {
        src: "/instagram-first-post/crumblabz-website-carousel-04.png",
        alt: "Dashboard proof slide"
      }
    ]
  },
  {
    id: "manual-entry",
    category: "Problem",
    number: "3 / 12",
    title: "Manual data entry is expensive",
    copy:
      "Manual data entry rarely looks urgent.\n\nBut it adds up: repeated fields, copied numbers, missed updates, stale reports, and time spent checking whether the latest version is actually the latest version.\n\nA small tool can remove that friction without replacing the whole business system.",
    hashtags: ["#BusinessAutomation", "#AdminAutomation", "#Operations"],
    platforms: ["LinkedIn", "X"],
    status: "Ready",
    assets: [
      {
        src: "/instagram-first-post/crumblabz-website-carousel-03.png",
        alt: "Problem list slide"
      }
    ]
  },
  {
    id: "process",
    category: "How it works",
    number: "4 / 12",
    title: "Describe. Map. Build. Deploy.",
    copy:
      "The CrumbLabz process is deliberately simple.\n\nDescribe the broken process.\nMap what should happen.\nBuild the first useful version.\nDeploy it and improve from real usage.\n\nNo giant transformation plan needed. Start with one workflow.",
    hashtags: ["#CustomSoftware", "#MVP", "#BusinessTools"],
    platforms: ["Instagram", "LinkedIn"],
    status: "Ready",
    assets: [
      {
        src: "/instagram-first-post/crumblabz-website-carousel-05.png",
        alt: "Process slide"
      }
    ]
  },
  {
    id: "site-proof",
    category: "Website proof",
    number: "5 / 12",
    title: "Tie social back to the website",
    copy:
      "Every post should point back to the same clear offer:\n\nCustom operations software for real businesses.\nDesigned and shipped in days.\nOne problem at a time.\n\nSocial should not feel separate from the website. It should repeat and prove the same message.",
    hashtags: ["#BrandStrategy", "#B2BMarketing", "#CrumbLabz"],
    platforms: ["LinkedIn"],
    status: "Needs screenshot",
    suggested: "Attach one current website screenshot or one real dashboard crop.",
    assets: []
  },
  {
    id: "scheduler",
    category: "Automation",
    number: "6 / 12",
    title: "What gets automated",
    copy:
      "The useful automation is not random posting.\n\nThe useful system is: draft ideas, review copy, attach the right asset, approve the post, schedule it, and track what happened.\n\nThat keeps the brand safe while removing the repeated admin.",
    hashtags: ["#SocialMediaAutomation", "#MarketingOps", "#Workflow"],
    platforms: ["LinkedIn", "Facebook"],
    status: "Scheduler next",
    suggested: "Connect Buffer once platform accounts are confirmed.",
    assets: [
      {
        src: "/brand/CrumbLabz_Signature.png",
        alt: "CrumbLabz logo"
      }
    ]
  }
];

function statusClasses(status: ContentPost["status"]) {
  if (status === "Ready") {
    return "border-emerald-200 bg-emerald-50 text-emerald-700";
  }

  if (status === "Needs screenshot") {
    return "border-amber-200 bg-amber-50 text-amber-700";
  }

  if (status === "Needs account") {
    return "border-red-200 bg-red-50 text-red-700";
  }

  return "border-[#e87a2e]/25 bg-[#e87a2e]/10 text-[#c75f18]";
}

function buildPostText(post: ContentPost) {
  return `${post.title}\n\n${post.copy}\n\n${post.hashtags.join(" ")}`;
}

function CopyButton({ post }: { post: ContentPost }) {
  const [copied, setCopied] = useState(false);

  async function copyPost() {
    await navigator.clipboard.writeText(buildPostText(post));
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  return (
    <button
      type="button"
      onClick={copyPost}
      className="inline-flex h-9 items-center justify-center gap-2 rounded-md border border-[#cdd8ea] bg-white px-3 text-sm font-semibold text-[#4f84c4] transition hover:border-[#9eb9dd] hover:bg-[#f7fbff]"
    >
      {copied ? (
        <Check className="h-4 w-4 text-emerald-600" />
      ) : (
        <Clipboard className="h-4 w-4" />
      )}
      {copied ? "Copied" : "Copy caption"}
    </button>
  );
}

function ContentCard({ post }: { post: ContentPost }) {
  return (
    <article className="rounded-2xl border border-[#d9e0ea] bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <span className="rounded-full bg-[#eef3f9] px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-[#31599a]">
          {post.category}
        </span>
        <span className="text-sm font-medium text-[#9aa7bb]">{post.number}</span>
      </div>

      <h3 className="mt-4 text-xl font-bold leading-6 text-[#29265f]">
        {post.title}
      </h3>
      <p className="mt-3 whitespace-pre-line text-base leading-7 text-[#3f4b5f]">
        {post.copy}
      </p>

      <div className="mt-4 flex flex-wrap gap-x-1.5 gap-y-1 text-sm font-medium text-[#4f84c4]">
        {post.hashtags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        {post.assets.map((asset) => (
          <a
            key={asset.src}
            href={asset.src}
            target="_blank"
            rel="noreferrer"
            className="group relative h-16 w-16 overflow-hidden rounded-lg border border-[#d9e0ea] bg-[#f7f8fb]"
            title={asset.alt}
          >
            <Image
              src={asset.src}
              alt={asset.alt}
              fill
              sizes="64px"
              className="object-cover"
            />
            <span className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#29265f] text-xs text-white opacity-90">
              x
            </span>
          </a>
        ))}
        {post.assets.length === 0 && post.suggested ? (
          <div className="inline-flex h-10 items-center gap-2 rounded-md border border-dashed border-[#cdd8ea] bg-[#f7fbff] px-3 text-sm font-semibold text-[#7b8798]">
            <ImageIcon className="h-4 w-4" />
            {post.suggested}
          </div>
        ) : null}
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-md border border-dashed border-[#cdd8ea] bg-[#f7fbff] text-[#31599a]"
          title="Attach asset placeholder"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-dashed border-[#d9e0ea] pt-4">
        <div className="flex flex-wrap gap-2">
          {post.platforms.map((platform) => (
            <span
              key={platform}
              className="rounded-full bg-[#f1f4f8] px-2.5 py-1 text-xs font-semibold text-[#566476]"
            >
              {platform}
            </span>
          ))}
          <span
            className={clsx(
              "rounded-full border px-2.5 py-1 text-xs font-bold",
              statusClasses(post.status)
            )}
          >
            {post.status}
          </span>
        </div>
        <CopyButton post={post} />
      </div>
    </article>
  );
}

export function SocialAutomationPlan() {
  return (
    <main className="min-h-screen bg-[#eef2f6] text-[#1b2433]">
      <header className="border-b border-[#dbe2ec] bg-white/95 px-5 py-3 backdrop-blur">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <Image
              src="/brand/CrumbLabz_Signature.png"
              alt="CrumbLabz"
              width={190}
              height={40}
              className="h-auto w-[190px]"
              priority
            />
            <div className="border-l border-[#dbe2ec] pl-4">
              <h1 className="text-2xl font-bold leading-7 text-[#1b1916]">
                Social Engine
              </h1>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#8793a5]">
                Social media automation dashboard
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-sm text-[#728096]">
            <button
              type="button"
              className="inline-flex h-9 items-center gap-2 rounded-md border border-[#d9e0ea] bg-[#f7f8fb] px-3 font-semibold text-[#566476]"
            >
              <RefreshCw className="h-4 w-4" />
              Refresh
            </button>
            <span className="inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Updated today
            </span>
            <span>Friday, July 24, 2026</span>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1600px] gap-6 px-5 py-6 lg:grid-cols-[260px_1fr]">
        <aside className="h-fit rounded-2xl bg-white p-3 shadow-sm">
          <nav className="grid gap-1">
            {navItems.map((item) => {
              const Icon = item.Icon;
              return (
                <button
                  key={item.label}
                  type="button"
                  className={clsx(
                    "flex h-12 items-center gap-3 rounded-lg px-4 text-left text-base font-bold transition",
                    item.active
                      ? "bg-[#29265f] text-white"
                      : "text-[#4b5565] hover:bg-[#f1f4f8]"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </button>
              );
            })}
          </nav>

          <div className="mt-5 rounded-xl border border-[#d9e0ea] bg-[#f7f8fb] p-4">
            <div className="flex items-center gap-2 text-sm font-bold text-[#1b2433]">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              Honest status
            </div>
            <p className="mt-2 text-sm leading-5 text-[#647084]">
              This plans and prepares content now. Real auto-posting starts only
              after platform accounts and scheduler tokens are connected.
            </p>
          </div>
        </aside>

        <section className="grid gap-6">
          <section
            className="overflow-hidden rounded-2xl border border-white/10 bg-[#16140f] p-6 text-white shadow-sm"
            style={{
              backgroundImage:
                "radial-gradient(62% 80% at 78% 18%, rgba(232,122,46,.22), transparent 60%), radial-gradient(54% 64% at 12% 92%, rgba(212,97,46,.18), transparent 58%)"
            }}
          >
            <div className="grid gap-6 xl:grid-cols-[1fr_420px]">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm font-semibold text-white/70">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#e87a2e]" />
                  Custom operations software
                </span>
                <h2 className="mt-5 max-w-3xl text-4xl font-bold leading-tight text-white md:text-5xl">
                  A social media system CrumbLabz can actually run.
                </h2>
                <p className="mt-4 max-w-3xl text-base leading-7 text-white/65">
                  The MVP is an approval-first social dashboard: plan the
                  content, attach assets, approve the copy, schedule through a
                  channel tool, then track what works.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                <div className="grid gap-3">
                  {automationSteps.map((step, index) => (
                    <div
                      key={step.title}
                      className="grid grid-cols-[36px_1fr_auto] items-start gap-3 rounded-xl bg-white/10 p-3"
                    >
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#e87a2e] text-sm font-bold text-white">
                        {index + 1}
                      </span>
                      <div>
                        <h3 className="font-bold text-white">{step.title}</h3>
                        <p className="text-sm leading-5 text-white/60">
                          {step.detail}
                        </p>
                      </div>
                      <span className="rounded-full bg-white/10 px-2 py-1 text-xs font-bold text-white/70">
                        {step.state}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {stats.map((item) => (
              <article
                key={item.label}
                className="rounded-2xl border border-[#d9e0ea] bg-white p-5 shadow-sm"
              >
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#8793a5]">
                  {item.label}
                </p>
                <p className="mt-2 text-2xl font-bold text-[#29265f]">
                  {item.value}
                </p>
                <p className="mt-1 text-sm text-[#647084]">{item.detail}</p>
              </article>
            ))}
          </section>

          <section className="grid gap-6 xl:grid-cols-[1fr_360px]">
            <div>
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-2xl font-bold text-[#1b2433]">
                    Content Calendar
                  </h2>
                  <p className="text-sm text-[#647084]">
                    Week 1 posts with captions, platform targets, assets, and
                    honest next actions.
                  </p>
                </div>
                <a
                  href="/instagram-first-post/crumblabz-website-carousel.zip"
                  download
                  className="hidden h-10 items-center gap-2 rounded-md border border-[#e87a2e] bg-[#e87a2e] px-3 text-sm font-bold text-white transition hover:bg-[#d46a1e] sm:inline-flex"
                >
                  <Download className="h-4 w-4" />
                  Download assets
                </a>
              </div>
              <div className="grid gap-5 xl:grid-cols-2">
                {posts.map((post) => (
                  <ContentCard key={post.id} post={post} />
                ))}
              </div>
            </div>

            <aside className="grid h-fit gap-5">
              <article className="rounded-2xl border border-[#d9e0ea] bg-white p-5 shadow-sm">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-[#e87a2e]" />
                  <h2 className="text-lg font-bold text-[#1b2433]">
                    Connection Status
                  </h2>
                </div>
                <div className="mt-4 grid gap-3">
                  {channels.map((channel) => {
                    const Icon = channel.Icon;
                    return (
                      <div
                        key={channel.name}
                        className="rounded-xl border border-[#d9e0ea] bg-[#f7f8fb] p-3"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-start gap-2">
                            <Icon className="mt-1 h-4 w-4 text-[#29265f]" />
                            <div>
                              <h3 className="font-bold text-[#1b2433]">
                                {channel.name}
                              </h3>
                              <p className="text-sm text-[#647084]">
                                {channel.handle}
                              </p>
                            </div>
                          </div>
                          <span
                            className={clsx(
                              "rounded-full px-2 py-1 text-xs font-bold",
                              channel.tone === "ready" &&
                                "bg-emerald-50 text-emerald-700",
                              channel.tone === "blocked" &&
                                "bg-amber-50 text-amber-700",
                              channel.tone === "next" &&
                                "bg-[#eef3f9] text-[#31599a]"
                            )}
                          >
                            {channel.status}
                          </span>
                        </div>
                        <p className="mt-2 text-sm leading-5 text-[#647084]">
                          {channel.detail}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </article>

              <article className="rounded-2xl border border-[#d9e0ea] bg-white p-5 shadow-sm">
                <div className="flex items-center gap-2">
                  <Archive className="h-5 w-5 text-[#e87a2e]" />
                  <h2 className="text-lg font-bold text-[#1b2433]">
                    Asset Library
                  </h2>
                </div>
                <div className="mt-4 grid gap-3">
                  {[
                    ["/brand/CrumbLabz_Signature.png", "Signature logo"],
                    ["/brand/CrumbLabz_Signature_Light.png", "Light logo"],
                    [
                      "/instagram-first-post/crumblabz-website-contact-sheet.png",
                      "Carousel contact sheet"
                    ]
                  ].map(([src, label]) => (
                    <a
                      key={src}
                      href={src}
                      target="_blank"
                      rel="noreferrer"
                      className="grid grid-cols-[72px_1fr_auto] items-center gap-3 rounded-xl border border-[#d9e0ea] bg-[#f7f8fb] p-2"
                    >
                      <span className="relative h-14 overflow-hidden rounded-lg bg-white">
                        <Image
                          src={src}
                          alt={label}
                          fill
                          sizes="72px"
                          className="object-contain p-1"
                        />
                      </span>
                      <span className="text-sm font-bold text-[#1b2433]">
                        {label}
                      </span>
                      <ExternalLink className="h-4 w-4 text-[#647084]" />
                    </a>
                  ))}
                </div>
              </article>

              <article className="rounded-2xl border border-[#e87a2e]/25 bg-[#fff7ef] p-5 shadow-sm">
                <div className="flex items-center gap-2">
                  <Send className="h-5 w-5 text-[#e87a2e]" />
                  <h2 className="text-lg font-bold text-[#1b2433]">
                    What happens after approval
                  </h2>
                </div>
                <p className="mt-3 text-sm leading-6 text-[#5f4c3e]">
                  Connect Buffer or Meta Business Suite, add the platform
                  tokens to Vercel, then use this dashboard as the planning and
                  approval layer before scheduled posting.
                </p>
                <a
                  href="/instagram-first-post"
                  className="mt-4 inline-flex h-10 items-center gap-2 rounded-md border border-[#e87a2e] bg-[#e87a2e] px-3 text-sm font-bold text-white transition hover:bg-[#d46a1e]"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  Review carousel
                </a>
              </article>
            </aside>
          </section>
        </section>
      </div>
    </main>
  );
}
