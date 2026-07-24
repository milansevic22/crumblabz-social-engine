"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import {
  AlertTriangle,
  BarChart3,
  Bot,
  CalendarClock,
  Check,
  CheckCircle2,
  Clipboard,
  Download,
  ExternalLink,
  FileCheck2,
  ImageIcon,
  Instagram,
  Linkedin,
  Lock,
  MessageSquareText,
  Radio,
  Send,
  Settings2,
  ShieldCheck,
  Sparkles,
  UploadCloud
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type QueueStatus = "Ready for review" | "Needs account" | "Needs approval" | "Scheduler next";

type QueuePost = {
  id: string;
  date: string;
  channel: string;
  format: string;
  title: string;
  copy: string;
  status: QueueStatus;
  asset: string;
  assetAlt: string;
};

type ChannelStatus = "Ready" | "Blocked" | "Next";

const carouselSlides = Array.from({ length: 7 }, (_, index) => ({
  src: `/instagram-first-post/crumblabz-native-carousel-${String(index + 1).padStart(2, "0")}.png`,
  alt: `CrumbLabz native Instagram carousel slide ${index + 1}`
}));

const navItems: Array<{ label: string; Icon: LucideIcon; active?: boolean }> = [
  { label: "Command Center", Icon: Radio, active: true },
  { label: "Content Queue", Icon: MessageSquareText },
  { label: "Approvals", Icon: FileCheck2 },
  { label: "Scheduler", Icon: CalendarClock },
  { label: "Reporting", Icon: BarChart3 },
  { label: "Settings", Icon: Settings2 }
];

const metrics = [
  { label: "Launch pack", value: "7 slides", detail: "Native Instagram carousel" },
  { label: "Posts drafted", value: "12", detail: "Week 1 and Week 2 queue" },
  { label: "Live channel", value: "@crumblabz", detail: "Instagram account created" },
  { label: "Automation mode", value: "Approval", detail: "No autoposting without tokens" }
];

const channels: Array<{
  name: string;
  handle: string;
  Icon: LucideIcon;
  status: ChannelStatus;
  detail: string;
}> = [
  {
    name: "Instagram",
    handle: "@crumblabz",
    Icon: Instagram,
    status: "Ready",
    detail: "Ready for profile polish, first post approval, and Meta scheduling."
  },
  {
    name: "LinkedIn",
    handle: "CrumbLabz company page",
    Icon: Linkedin,
    status: "Blocked",
    detail: "Needs eligible admin profile or page owner before posting can start."
  },
  {
    name: "Scheduler",
    handle: "Buffer or Meta Business Suite",
    Icon: CalendarClock,
    status: "Next",
    detail: "Connect after account ownership is confirmed."
  },
  {
    name: "Publishing API",
    handle: "Protected server route",
    Icon: Lock,
    status: "Next",
    detail: "Vercel secrets and platform tokens required before real posting."
  }
];

const workflow = [
  {
    title: "Brief",
    detail: "Capture theme, platform, audience, CTA, and asset direction.",
    state: "Ready"
  },
  {
    title: "Draft",
    detail: "Create captions and carousel copy in a consistent brand voice.",
    state: "Ready"
  },
  {
    title: "Review",
    detail: "Bosses approve wording, visual, timing, and risk before scheduling.",
    state: "Manual"
  },
  {
    title: "Schedule",
    detail: "Approved posts move into Buffer or Meta Business Suite.",
    state: "Next"
  },
  {
    title: "Report",
    detail: "Track reach, clicks, engagement, and useful inbound conversations.",
    state: "Planned"
  }
];

const queue: QueuePost[] = [
  {
    id: "launch-carousel",
    date: "Today",
    channel: "Instagram + LinkedIn",
    format: "Carousel",
    title: "Describe it Monday. Use it Friday.",
    copy:
      "CrumbLabz builds practical operations software for real businesses - dashboards, approval queues, reporting flows, outreach systems, and internal tools that remove the repetitive work.\n\nStart with one slow workflow. We map it, build the useful version, get it approved, and ship it fast.\n\nTell us your headache.\n\n#CustomSoftware #Operations #WorkflowAutomation #BusinessAutomation #CrumbLabz",
    status: "Ready for review",
    asset: "/instagram-first-post/crumblabz-native-carousel-01.png",
    assetAlt: "Native CrumbLabz launch carousel"
  },
  {
    id: "manual-entry",
    date: "Week 1",
    channel: "LinkedIn",
    format: "Text post",
    title: "Manual data entry is not harmless",
    copy:
      "Manual data entry rarely looks urgent, but it quietly slows the business down.\n\nRepeated fields, copied numbers, stale reports, and missed updates all add up. A small internal tool can remove that friction without replacing every system.",
    status: "Needs approval",
    asset: "/instagram-first-post/crumblabz-native-carousel-02.png",
    assetAlt: "Operational pain point slide"
  },
  {
    id: "approval-system",
    date: "Week 1",
    channel: "Instagram Story",
    format: "Proof snippet",
    title: "Automation with approval built in",
    copy:
      "Useful social automation is not random posting. It is a controlled workflow: idea, draft, asset, approval, schedule, report. Nothing goes live until the team approves it.",
    status: "Scheduler next",
    asset: "/instagram-first-post/crumblabz-native-carousel-06.png",
    assetAlt: "Automation with approval slide"
  }
];

const guardrails = [
  "No live posting until Ryan or the team approves the post.",
  "No fake case studies, inflated numbers, or invented clients.",
  "Every outbound post links back to the same website offer.",
  "Weekly reporting separates vanity metrics from useful conversations."
];

function channelStatusClasses(status: ChannelStatus) {
  if (status === "Ready") {
    return "border-emerald-200 bg-emerald-50 text-emerald-700";
  }
  if (status === "Blocked") {
    return "border-amber-200 bg-amber-50 text-amber-700";
  }
  return "border-slate-200 bg-slate-50 text-slate-700";
}

function queueStatusClasses(status: QueueStatus) {
  if (status === "Ready for review") {
    return "border-emerald-200 bg-emerald-50 text-emerald-700";
  }
  if (status === "Needs account") {
    return "border-red-200 bg-red-50 text-red-700";
  }
  if (status === "Needs approval") {
    return "border-amber-200 bg-amber-50 text-amber-700";
  }
  return "border-[#f2d4bd] bg-[#fff4e9] text-[#b85500]";
}

function CopyButton({ post }: { post: QueuePost }) {
  const [copied, setCopied] = useState(false);

  async function copyPost() {
    await navigator.clipboard.writeText(`${post.title}\n\n${post.copy}`);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  return (
    <button
      type="button"
      onClick={copyPost}
      className="inline-flex h-9 items-center justify-center gap-2 rounded-md border border-[#d9e0ea] bg-white px-3 text-sm font-semibold text-[#344051] transition hover:bg-[#f7f8f4]"
    >
      {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Clipboard className="h-4 w-4" />}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

function QueueCard({ post }: { post: QueuePost }) {
  return (
    <article className="grid gap-4 rounded-lg border border-[#dfe4dd] bg-white p-4 shadow-sm lg:grid-cols-[132px_1fr_auto]">
      <a
        href={post.asset}
        target="_blank"
        rel="noreferrer"
        className="relative aspect-square overflow-hidden rounded-md border border-[#e2e2dc] bg-[#f7f6f0]"
      >
        <Image src={post.asset} alt={post.assetAlt} fill sizes="132px" className="object-cover" />
      </a>
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-[#f7f6f0] px-2.5 py-1 text-xs font-bold uppercase text-[#687080]">
            {post.date}
          </span>
          <span className="rounded-full bg-[#eef4f3] px-2.5 py-1 text-xs font-bold text-[#2f8f83]">
            {post.channel}
          </span>
          <span className="rounded-full bg-[#fff1e5] px-2.5 py-1 text-xs font-bold text-[#b85500]">
            {post.format}
          </span>
        </div>
        <h3 className="mt-3 text-lg font-bold text-[#171717]">{post.title}</h3>
        <p className="mt-2 line-clamp-3 whitespace-pre-line text-sm leading-6 text-[#515965]">
          {post.copy}
        </p>
      </div>
      <div className="flex flex-row items-center justify-between gap-3 lg:flex-col lg:items-end">
        <span className={clsx("rounded-full border px-3 py-1 text-xs font-bold", queueStatusClasses(post.status))}>
          {post.status}
        </span>
        <CopyButton post={post} />
      </div>
    </article>
  );
}

export function SocialAutomationPlan() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#eef1ea] text-[#171717]">
      <header className="border-b border-[#dce2dc] bg-[#fbfbf8]/95 px-4 py-3 backdrop-blur sm:px-5">
        <div className="mx-auto flex max-w-[1500px] flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <Image
              src="/brand/CrumbLabz_Signature.png"
              alt="CrumbLabz"
              width={184}
              height={42}
              className="h-auto w-44 max-w-full shrink-0"
              priority
            />
            <div className="min-w-0 max-w-full border-[#dce2dc] sm:border-l sm:pl-4">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#b85500]">
                Social Automation MVP
              </p>
              <h1 className="text-2xl font-bold leading-7">Launch Control</h1>
            </div>
          </div>
          <div className="grid w-full grid-cols-1 gap-2 text-sm min-[420px]:grid-cols-2 lg:w-auto">
            <a
              href="/instagram-first-post/crumblabz-native-carousel.zip"
              download
              className="inline-flex h-10 min-w-0 items-center justify-center gap-2 rounded-md border border-[#f27405] bg-[#f27405] px-3 font-bold text-white transition hover:bg-[#d76000]"
            >
              <Download className="h-4 w-4" />
              Download carousel
            </a>
            <Link
              href="/instagram-first-post"
              className="inline-flex h-10 min-w-0 items-center justify-center gap-2 rounded-md border border-[#d9e0d7] bg-white px-3 font-bold text-[#344051] transition hover:bg-[#f7f8f4]"
            >
              <ExternalLink className="h-4 w-4" />
              Review post
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1500px] gap-5 px-4 py-5 sm:px-5 lg:grid-cols-[240px_1fr]">
        <aside className="h-fit w-full min-w-0 overflow-hidden rounded-lg border border-[#dfe4dd] bg-white p-3 shadow-sm">
          <nav className="grid gap-1">
            {navItems.map((item) => {
              const Icon = item.Icon;
              return (
                <button
                  key={item.label}
                  type="button"
                  className={clsx(
                    "flex h-11 items-center gap-3 rounded-md px-3 text-left text-sm font-bold transition",
                    item.active ? "bg-[#171717] text-white" : "text-[#4b5565] hover:bg-[#f5f5ef]"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </button>
              );
            })}
          </nav>

          <div className="mt-4 rounded-md border border-[#f0d7c4] bg-[#fff5eb] p-3">
            <div className="flex items-center gap-2 text-sm font-bold text-[#171717]">
              <ShieldCheck className="h-4 w-4 text-[#f27405]" />
              Honest status
            </div>
            <p className="mt-2 text-sm leading-5 text-[#68574a]">
              This is a working planning and approval layer. Auto-posting is next, after accounts and tokens are connected.
            </p>
          </div>
        </aside>

        <section className="grid min-w-0 gap-5">
          <section className="grid gap-5 xl:grid-cols-[1fr_420px]">
            <div className="min-w-0 overflow-hidden rounded-lg border border-[#dfe4dd] bg-white p-5 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="min-w-0 max-w-full">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#b85500]">
                    Approval-first automation
                  </p>
                  <h2 className="mt-2 max-w-full text-balance text-[1.75rem] font-bold leading-tight sm:max-w-3xl sm:text-4xl">
                    Plan the post. Approve the message. Schedule the channel.
                  </h2>
                  <p className="mt-3 max-w-full text-base leading-7 text-[#515965] sm:max-w-3xl">
                    The platform is designed to keep CrumbLabz consistent and safe: content briefs, generated drafts, brand assets, human approval, scheduler handoff, and weekly performance review.
                  </p>
                </div>
                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-sm font-bold text-emerald-700">
                  <CheckCircle2 className="h-4 w-4" />
                  MVP deployed
                </span>
              </div>

              <div className="mt-6 grid gap-3 md:grid-cols-4">
                {metrics.map((item) => (
                  <article key={item.label} className="rounded-md border border-[#e3e6df] bg-[#fbfbf8] p-4">
                    <p className="text-xs font-bold uppercase text-[#7a8290]">{item.label}</p>
                    <p className="mt-2 text-2xl font-bold text-[#171717]">{item.value}</p>
                    <p className="mt-1 text-sm text-[#626b78]">{item.detail}</p>
                  </article>
                ))}
              </div>
            </div>

            <article className="min-w-0 overflow-hidden rounded-lg border border-[#dfe4dd] bg-[#171717] p-5 text-white shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-lg font-bold">Publishing Workflow</h2>
                <Bot className="h-5 w-5 text-[#f27405]" />
              </div>
              <div className="mt-4 grid gap-3">
                {workflow.map((step, index) => (
                  <div key={step.title} className="grid grid-cols-[34px_1fr_auto] items-start gap-3 rounded-md bg-white/8 p-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-md bg-[#f27405] text-sm font-bold">
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="font-bold">{step.title}</h3>
                      <p className="mt-1 text-sm leading-5 text-white/65">{step.detail}</p>
                    </div>
                    <span className="rounded-full bg-white/10 px-2 py-1 text-xs font-bold text-white/75">
                      {step.state}
                    </span>
                  </div>
                ))}
              </div>
            </article>
          </section>

          <section className="grid gap-5 xl:grid-cols-[1fr_360px]">
            <div className="grid gap-5">
              <article className="min-w-0 overflow-hidden rounded-lg border border-[#dfe4dd] bg-white p-5 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h2 className="text-xl font-bold">Launch Carousel</h2>
                    <p className="mt-1 text-sm text-[#626b78]">
                      Designed for Instagram using website colours, language, logo, sky asset, and product UI cues.
                    </p>
                  </div>
                  <span className="rounded-full border border-[#f0d7c4] bg-[#fff5eb] px-3 py-1 text-xs font-bold text-[#b85500]">
                    Not screenshots
                  </span>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4 xl:grid-cols-7">
                  {carouselSlides.map((slide, index) => (
                    <a
                      key={slide.src}
                      href={slide.src}
                      target="_blank"
                      rel="noreferrer"
                      className="group overflow-hidden rounded-md border border-[#dfe4dd] bg-[#fbfbf8]"
                    >
                      <div className="relative aspect-square">
                        <Image src={slide.src} alt={slide.alt} fill sizes="160px" className="object-cover" />
                      </div>
                      <div className="flex items-center justify-between px-2 py-1.5 text-xs font-bold text-[#515965]">
                        <span>Slide {index + 1}</span>
                        <ImageIcon className="h-3.5 w-3.5 opacity-60 transition group-hover:opacity-100" />
                      </div>
                    </a>
                  ))}
                </div>
              </article>

              <article className="min-w-0 overflow-hidden rounded-lg border border-[#dfe4dd] bg-white p-5 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h2 className="text-xl font-bold">Content Queue</h2>
                    <p className="mt-1 text-sm text-[#626b78]">
                      These are prepared posts, not live scheduled posts. Approval comes first.
                    </p>
                  </div>
                  <button
                    type="button"
                    className="inline-flex h-10 items-center gap-2 rounded-md border border-[#d9e0d7] bg-[#fbfbf8] px-3 text-sm font-bold text-[#344051]"
                  >
                    <UploadCloud className="h-4 w-4" />
                    Add draft
                  </button>
                </div>
                <div className="mt-4 grid gap-3">
                  {queue.map((post) => (
                    <QueueCard key={post.id} post={post} />
                  ))}
                </div>
              </article>
            </div>

            <aside className="grid h-fit gap-5">
              <article className="rounded-lg border border-[#dfe4dd] bg-white p-5 shadow-sm">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-[#f27405]" />
                  <h2 className="text-lg font-bold">Channel Connections</h2>
                </div>
                <div className="mt-4 grid gap-3">
                  {channels.map((channel) => {
                    const Icon = channel.Icon;
                    return (
                      <div key={channel.name} className="rounded-md border border-[#e3e6df] bg-[#fbfbf8] p-3">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-start gap-2">
                            <Icon className="mt-1 h-4 w-4 text-[#171717]" />
                            <div>
                              <h3 className="font-bold">{channel.name}</h3>
                              <p className="text-sm text-[#626b78]">{channel.handle}</p>
                            </div>
                          </div>
                          <span className={clsx("rounded-full border px-2 py-1 text-xs font-bold", channelStatusClasses(channel.status))}>
                            {channel.status}
                          </span>
                        </div>
                        <p className="mt-2 text-sm leading-5 text-[#626b78]">{channel.detail}</p>
                      </div>
                    );
                  })}
                </div>
              </article>

              <article className="rounded-lg border border-[#dfe4dd] bg-white p-5 shadow-sm">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-[#f27405]" />
                  <h2 className="text-lg font-bold">Guardrails</h2>
                </div>
                <div className="mt-4 grid gap-2">
                  {guardrails.map((item) => (
                    <div key={item} className="flex gap-2 rounded-md bg-[#fbfbf8] p-3 text-sm leading-5 text-[#515965]">
                      <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#2f8f83]" />
                      {item}
                    </div>
                  ))}
                </div>
              </article>

              <article className="rounded-lg border border-[#f0d7c4] bg-[#fff5eb] p-5 shadow-sm">
                <div className="flex items-center gap-2">
                  <Send className="h-5 w-5 text-[#f27405]" />
                  <h2 className="text-lg font-bold">Next Real Build Step</h2>
                </div>
                <p className="mt-3 text-sm leading-6 text-[#68574a]">
                  After Ryan approves the content direction, connect Meta Business Suite or Buffer. Then this app can move approved posts into a real scheduler instead of only preparing them.
                </p>
              </article>
            </aside>
          </section>
        </section>
      </div>
    </main>
  );
}
