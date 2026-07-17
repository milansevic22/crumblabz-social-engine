"use client";

import { useMemo, useState } from "react";
import clsx from "clsx";
import {
  ArrowLeft,
  BarChart3,
  CalendarDays,
  Check,
  Clipboard,
  Filter,
  Flag,
  Link as LinkIcon,
  MessageSquare,
  MonitorUp,
  ShieldCheck,
  Sparkles,
  Target
} from "lucide-react";
import type {
  EngagementPrompt,
  KpiTarget,
  LaunchChecklistItem,
  LaunchContentDraft,
  ProfileKitItem
} from "@/lib/launch-control-data";
import type { Platform } from "@/types";

const platformLabels: Record<Platform | "facebook", string> = {
  linkedin: "LinkedIn",
  instagram: "Instagram",
  tiktok: "TikTok",
  youtube: "YouTube Shorts",
  threads: "Threads",
  bluesky: "Bluesky",
  x: "X",
  facebook: "Facebook"
};

const statusStyles: Record<LaunchChecklistItem["status"], string> = {
  ready: "border-[#2f8f83]/25 bg-[#2f8f83]/10 text-[#2f8f83]",
  next: "border-[#e87a2e]/30 bg-[#e87a2e]/10 text-[#c75f18]",
  blocked: "border-red-200 bg-red-50 text-red-700"
};

const draftStatusStyles: Record<LaunchContentDraft["status"], string> = {
  "Ready to review": "border-[#2f8f83]/25 bg-[#2f8f83]/10 text-[#2f8f83]",
  "Needs visual": "border-[#e87a2e]/30 bg-[#e87a2e]/10 text-[#c75f18]",
  "Needs founder input": "border-[#1E2A5E]/20 bg-[#1E2A5E]/10 text-[#1E2A5E]"
};

type LaunchControlBoardProps = {
  checklist: LaunchChecklistItem[];
  contentDrafts: LaunchContentDraft[];
  engagementPrompts: EngagementPrompt[];
  kpiTargets: KpiTarget[];
  profileKit: ProfileKitItem[];
};

export function LaunchControlBoard({
  checklist,
  contentDrafts,
  engagementPrompts,
  kpiTargets,
  profileKit
}: LaunchControlBoardProps) {
  const [platform, setPlatform] = useState<"all" | Platform | "facebook">(
    "all"
  );
  const [copied, setCopied] = useState<string | null>(null);

  const visibleDrafts = useMemo(() => {
    return contentDrafts.filter(
      (draft) => platform === "all" || draft.platform === platform
    );
  }, [contentDrafts, platform]);

  async function copyText(id: string, text: string) {
    await navigator.clipboard.writeText(text);
    setCopied(id);
    window.setTimeout(() => setCopied(null), 1400);
  }

  const readyDrafts = contentDrafts.filter(
    (draft) => draft.status === "Ready to review"
  ).length;
  const visualDrafts = contentDrafts.filter(
    (draft) => draft.status === "Needs visual"
  ).length;

  return (
    <main className="min-h-screen px-4 py-4 text-ink sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-5">
        <header className="overflow-hidden rounded-lg border border-white/70 bg-[#1E2A5E] text-white shadow-panel">
          <div className="grid gap-6 p-5 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white/10 text-white">
                <Flag className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#f6a15f]">
                  90-day organic launch
                </p>
                <h1 className="text-2xl font-bold tracking-0 text-white sm:text-3xl">
                  CrumbLabz Launch Control
                </h1>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-white/75">
                  A same-day control centre for the brief: profile setup,
                  content batching, tracking, and the weekly human engagement
                  routine. The principle is simple: automate distribution,
                  never judgment.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <a
                href="/"
                className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-white/15 bg-white/10 px-3 text-sm font-semibold text-white transition hover:bg-white/15"
              >
                <ArrowLeft className="h-4 w-4" />
                Dashboard
              </a>
              <a
                href="/tech-docs.html"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-white/15 bg-white/10 px-3 text-sm font-semibold text-white transition hover:bg-white/15"
              >
                <MonitorUp className="h-4 w-4" />
                Tech Docs
              </a>
            </div>
          </div>
        </header>

        <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            label="Week 1 checklist"
            value={`${checklist.length}/6`}
            note="pass/fail sprint items"
            Icon={ShieldCheck}
          />
          <MetricCard
            label="Content batch"
            value={`${contentDrafts.length}`}
            note={`${readyDrafts} ready, ${visualDrafts} need visuals`}
            Icon={CalendarDays}
          />
          <MetricCard
            label="Manual engagement"
            value="20/wk"
            note="genuine comments, not automated"
            Icon={MessageSquare}
          />
          <MetricCard
            label="Tracking"
            value="UTM"
            note="baselines start at zero"
            Icon={BarChart3}
          />
        </section>

        <section className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
          <article className="rounded-lg border border-white/70 bg-white p-4 shadow-panel">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-[#e87a2e]" />
              <h2 className="text-lg font-bold">Week 1 Pass / Fail Checklist</h2>
            </div>
            <p className="mt-1 text-sm text-stone-500">
              This is the launch sprint from the brief converted into trackable
              work.
            </p>
            <div className="mt-4 grid gap-3">
              {checklist.map((item) => (
                <div
                  key={item.id}
                  className="rounded-lg border border-stone-200 bg-paper p-3"
                >
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="text-sm font-bold">{item.label}</h3>
                      <p className="mt-1 text-sm leading-6 text-stone-600">
                        {item.detail}
                      </p>
                    </div>
                    <span
                      className={clsx(
                        "inline-flex w-fit rounded-full border px-2.5 py-1 text-xs font-bold",
                        statusStyles[item.status]
                      )}
                    >
                      {item.status}
                    </span>
                  </div>
                  <div className="mt-3 text-xs font-semibold text-stone-500">
                    Owner: {item.owner}
                  </div>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-lg border border-white/70 bg-white p-4 shadow-panel">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-[#e87a2e]" />
              <h2 className="text-lg font-bold">Profile Setup Kit</h2>
            </div>
            <p className="mt-1 text-sm text-stone-500">
              Company-owned setup copy for the new admin email and social
              accounts.
            </p>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {profileKit.map((profile) => (
                <div
                  key={profile.name}
                  className="flex flex-col gap-3 rounded-lg border border-stone-200 bg-paper p-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-sm font-bold">{profile.name}</h3>
                      <p className="text-xs text-stone-500">
                        {profile.handle} - {profile.role}
                      </p>
                    </div>
                    <span className="rounded-full bg-white px-2 py-1 text-xs font-bold text-[#1E2A5E]">
                      {profile.cadence}
                    </span>
                  </div>
                  <p className="text-sm leading-6 text-stone-700">
                    {profile.setupCopy}
                  </p>
                  <div className="rounded-md border border-[#e87a2e]/25 bg-white p-2 text-xs">
                    <strong className="text-[#1E2A5E]">CTA:</strong>{" "}
                    {profile.cta}
                  </div>
                  <p className="text-xs leading-5 text-stone-500">
                    {profile.notes}
                  </p>
                  <button
                    type="button"
                    onClick={() =>
                      copyText(
                        `profile-${profile.name}`,
                        `${profile.setupCopy}\n\n${profile.cta}`
                      )
                    }
                    className="inline-flex h-9 items-center justify-center gap-2 rounded-md border border-stone-200 bg-white px-3 text-sm font-semibold text-graphite transition hover:border-stone-300 hover:bg-stone-50"
                  >
                    {copied === `profile-${profile.name}` ? (
                      <Check className="h-4 w-4 text-[#2f8f83]" />
                    ) : (
                      <Clipboard className="h-4 w-4" />
                    )}
                    {copied === `profile-${profile.name}` ? "Copied" : "Copy"}
                  </button>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="rounded-lg border border-white/70 bg-white p-4 shadow-panel">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <CalendarDays className="h-5 w-5 text-[#e87a2e]" />
                <h2 className="text-lg font-bold">2-3 Week Draft Content Batch</h2>
              </div>
              <p className="mt-1 text-sm text-stone-500">
                LinkedIn is the anchor. Other channels are repurposed from the
                same ideas so the system is maintainable.
              </p>
            </div>
            <label className="flex h-10 items-center gap-2 rounded-md border border-stone-200 bg-paper px-3 text-sm font-semibold text-graphite">
              <Filter className="h-4 w-4 text-stone-500" />
              <select
                value={platform}
                onChange={(event) =>
                  setPlatform(event.target.value as "all" | Platform | "facebook")
                }
                className="bg-transparent outline-none"
              >
                <option value="all">All platforms</option>
                {Object.entries(platformLabels).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="mt-4 grid gap-4 lg:grid-cols-3">
            {visibleDrafts.map((draft) => (
              <article
                key={draft.id}
                className="flex flex-col gap-3 rounded-lg border border-stone-200 bg-paper p-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#e87a2e]">
                      {draft.week} - {platformLabels[draft.platform]}
                    </p>
                    <h3 className="mt-1 text-sm font-bold">{draft.title}</h3>
                  </div>
                  <span
                    className={clsx(
                      "inline-flex w-fit rounded-full border px-2 py-1 text-xs font-bold",
                      draftStatusStyles[draft.status]
                    )}
                  >
                    {draft.status}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  <span className="rounded-full border border-stone-200 bg-white px-2 py-1 text-xs font-bold text-graphite">
                    {draft.format}
                  </span>
                  <span className="rounded-full border border-[#1E2A5E]/20 bg-white px-2 py-1 text-xs font-bold text-[#1E2A5E]">
                    {draft.theme}
                  </span>
                </div>
                <p className="line-clamp-6 whitespace-pre-line text-sm leading-6 text-stone-700">
                  {draft.copy}
                </p>
                <div className="rounded-md bg-white p-2 text-xs leading-5 text-stone-600">
                  <strong className="text-graphite">Asset:</strong>{" "}
                  {draft.assetDirection}
                </div>
                <button
                  type="button"
                  onClick={() => copyText(draft.id, draft.copy)}
                  className="mt-auto inline-flex h-9 items-center justify-center gap-2 rounded-md border border-stone-200 bg-white px-3 text-sm font-semibold text-graphite transition hover:border-stone-300 hover:bg-stone-50"
                >
                  {copied === draft.id ? (
                    <Check className="h-4 w-4 text-[#2f8f83]" />
                  ) : (
                    <Clipboard className="h-4 w-4" />
                  )}
                  {copied === draft.id ? "Copied" : "Copy post"}
                </button>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-5 xl:grid-cols-[1fr_0.85fr]">
          <article className="rounded-lg border border-white/70 bg-white p-4 shadow-panel">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-[#e87a2e]" />
              <h2 className="text-lg font-bold">90-Day KPI Tracker</h2>
            </div>
            <div className="mt-4 overflow-hidden rounded-lg border border-stone-200">
              <div className="grid grid-cols-[1.2fr_0.55fr_0.55fr_0.55fr_1.2fr] bg-paper text-xs font-bold uppercase text-stone-500">
                <div className="p-3">Metric</div>
                <div className="p-3">Base</div>
                <div className="p-3">Target</div>
                <div className="p-3">Stretch</div>
                <div className="p-3">Note</div>
              </div>
              {kpiTargets.map((target) => (
                <div
                  key={target.metric}
                  className="grid grid-cols-[1.2fr_0.55fr_0.55fr_0.55fr_1.2fr] border-t border-stone-200 text-sm"
                >
                  <div className="p-3 font-semibold">{target.metric}</div>
                  <div className="p-3 text-stone-600">{target.baseline}</div>
                  <div className="p-3 font-bold text-[#1E2A5E]">
                    {target.target}
                  </div>
                  <div className="p-3 font-bold text-[#e87a2e]">
                    {target.stretch}
                  </div>
                  <div className="p-3 text-stone-600">{target.notes}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-lg border border-[#1E2A5E]/15 bg-[#1E2A5E]/5 p-3 text-sm leading-6 text-stone-700">
              <div className="mb-1 flex items-center gap-2 font-bold text-[#1E2A5E]">
                <LinkIcon className="h-4 w-4" />
                UTM format
              </div>
              Use:
              <code className="ml-1 rounded bg-white px-1.5 py-0.5 text-xs">
                ?utm_source=linkedin&amp;utm_medium=organic&amp;utm_campaign=90_day_launch
              </code>
            </div>
          </article>

          <article className="rounded-lg border border-white/70 bg-white p-4 shadow-panel">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-[#e87a2e]" />
              <h2 className="text-lg font-bold">Human Engagement Tracker</h2>
            </div>
            <p className="mt-1 text-sm text-stone-500">
              The brief is explicit: scheduled posts alone will not grow the
              accounts. This is the manual work to log each week.
            </p>
            <div className="mt-4 grid gap-3">
              {engagementPrompts.map((prompt) => (
                <div
                  key={prompt.audience}
                  className="rounded-lg border border-stone-200 bg-paper p-3"
                >
                  <h3 className="text-sm font-bold">{prompt.audience}</h3>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.1em] text-stone-500">
                    Where
                  </p>
                  <p className="text-sm leading-6 text-stone-700">
                    {prompt.where}
                  </p>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-[0.1em] text-stone-500">
                    Comment angle
                  </p>
                  <p className="text-sm leading-6 text-stone-700">
                    {prompt.commentAngle}
                  </p>
                </div>
              ))}
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}

function MetricCard({
  Icon,
  label,
  note,
  value
}: {
  Icon: React.ComponentType<{ className?: string }>;
  label: string;
  note: string;
  value: string;
}) {
  return (
    <article className="rounded-lg border border-white/70 bg-white p-4 shadow-panel">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-medium text-stone-500">{label}</p>
        <Icon className="h-4 w-4 text-[#e87a2e]" />
      </div>
      <div className="mt-3 flex items-end justify-between gap-3">
        <strong className="text-3xl font-bold tracking-0">{value}</strong>
        <span className="text-xs font-semibold text-stone-500">{note}</span>
      </div>
    </article>
  );
}
