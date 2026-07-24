"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import {
  ArrowLeft,
  CalendarDays,
  Check,
  Clipboard,
  Download,
  ExternalLink,
  FileText,
  Filter,
  Globe2,
  ImageIcon,
  Instagram,
  Linkedin,
  PackageCheck,
  Sparkles,
  Twitter
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type {
  LaunchContentDraft,
  ProfileKitItem
} from "@/lib/launch-control-data";

type LaunchPlatform = LaunchContentDraft["platform"];
type ContentPackPlatform = "linkedin" | "instagram" | "facebook" | "x";
type PlatformFilter = ContentPackPlatform | "all";
type WeekFilter = LaunchContentDraft["week"] | "all";

type ContentPackBoardProps = {
  contentDrafts: LaunchContentDraft[];
  profileKit: ProfileKitItem[];
};

const siteUrl = "https://crumblabz.com";
type ContentPackDraft = LaunchContentDraft & { platform: ContentPackPlatform };

const platformMeta: Record<
  ContentPackPlatform,
  {
    label: string;
    Icon: LucideIcon;
    className: string;
    source: string;
  }
> = {
  linkedin: {
    label: "LinkedIn",
    Icon: Linkedin,
    className: "border-[#0a66c2]/20 bg-[#0a66c2]/10 text-[#0a66c2]",
    source: "linkedin"
  },
  instagram: {
    label: "Instagram",
    Icon: Instagram,
    className: "border-[#d62976]/20 bg-[#d62976]/10 text-[#b51f66]",
    source: "instagram"
  },
  facebook: {
    label: "Facebook",
    Icon: Globe2,
    className: "border-[#1877f2]/20 bg-[#1877f2]/10 text-[#145dbd]",
    source: "facebook"
  },
  x: {
    label: "X",
    Icon: Twitter,
    className: "border-zinc-200 bg-zinc-100 text-zinc-900",
    source: "x"
  }
};

const brandAssets = [
  {
    title: "Signature Logo",
    use: "Use this clean lockup for social graphics and review pages.",
    href: "/brand/CrumbLabz_Signature.png",
    imageClassName: "object-contain p-5"
  },
  {
    title: "Profile Icon",
    use: "Use for Instagram, X, and Facebook profile pictures.",
    href: "/brand/CrumbLabz_Instagram_Profile.png",
    imageClassName: "object-contain p-5"
  },
  {
    title: "Full Logo",
    use: "Use for LinkedIn banners, pitch decks, and header assets.",
    href: "/brand/CrumbLabz_LogoFull.png",
    imageClassName: "object-contain p-5"
  },
  {
    title: "Wordmark",
    use: "Use where the icon is already visible and the name needs emphasis.",
    href: "/brand/CrumbLabz_Wordmark.png",
    imageClassName: "object-contain p-5"
  }
];

const scheduleByDraftId: Record<string, { date: string; time: string }> = {
  "w1-linkedin-1": { date: "2026-07-20", time: "09:00" },
  "w1-linkedin-2": { date: "2026-07-22", time: "09:00" },
  "w1-linkedin-3": { date: "2026-07-24", time: "09:00" },
  "w1-x-1": { date: "2026-07-21", time: "12:30" },
  "w1-instagram-1": { date: "2026-07-23", time: "17:30" },
  "w2-linkedin-1": { date: "2026-07-27", time: "09:00" },
  "w2-linkedin-2": { date: "2026-07-29", time: "09:00" },
  "w2-linkedin-3": { date: "2026-07-31", time: "09:00" },
  "w2-facebook-1": { date: "2026-07-28", time: "12:30" },
  "w2-instagram-1": { date: "2026-07-30", time: "17:30" },
  "w3-linkedin-1": { date: "2026-08-03", time: "09:00" },
  "w3-linkedin-2": { date: "2026-08-05", time: "09:00" },
  "w3-linkedin-3": { date: "2026-08-07", time: "09:00" },
  "w3-x-1": { date: "2026-08-04", time: "12:30" },
  "w3-instagram-1": { date: "2026-08-06", time: "17:30" }
};

function escapeCsv(value: string) {
  return `"${value.replace(/"/g, '""')}"`;
}

function isContentPackPlatform(
  platform: LaunchPlatform
): platform is ContentPackPlatform {
  return ["linkedin", "instagram", "facebook", "x"].includes(platform);
}

function createUtmLink(draft: ContentPackDraft) {
  const source = platformMeta[draft.platform].source;
  return `${siteUrl}/?utm_source=${source}&utm_medium=social&utm_campaign=90_day_launch&utm_content=${draft.id}`;
}

function buildCsv(drafts: ContentPackDraft[]) {
  const headings = [
    "Date",
    "Time",
    "Platform",
    "Post title",
    "Caption",
    "Asset direction",
    "UTM link",
    "Status"
  ];

  const rows = drafts.map((draft) => {
    const schedule = scheduleByDraftId[draft.id] ?? {
      date: "",
      time: ""
    };

    return [
      schedule.date,
      schedule.time,
      platformMeta[draft.platform].label,
      draft.title,
      draft.copy,
      draft.assetDirection,
      createUtmLink(draft),
      draft.status
    ];
  });

  return [headings, ...rows]
    .map((row) => row.map((value) => escapeCsv(value)).join(","))
    .join("\r\n");
}

function PlatformPill({ platform }: { platform: ContentPackPlatform }) {
  const meta = platformMeta[platform];
  const Icon = meta.Icon;

  return (
    <span
      className={clsx(
        "inline-flex h-8 items-center gap-1.5 rounded-full border px-2.5 text-xs font-semibold",
        meta.className
      )}
    >
      <Icon className="h-3.5 w-3.5" />
      {meta.label}
    </span>
  );
}

export function ContentPackBoard({
  contentDrafts,
  profileKit
}: ContentPackBoardProps) {
  const [selectedPlatform, setSelectedPlatform] =
    useState<PlatformFilter>("all");
  const [selectedWeek, setSelectedWeek] = useState<WeekFilter>("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const supportedDrafts = useMemo(
    () =>
      contentDrafts.filter(
        (draft): draft is ContentPackDraft =>
          isContentPackPlatform(draft.platform)
      ),
    [contentDrafts]
  );

  const filteredDrafts = useMemo(() => {
    return supportedDrafts.filter((draft) => {
      const platformMatches =
        selectedPlatform === "all" || draft.platform === selectedPlatform;
      const weekMatches = selectedWeek === "all" || draft.week === selectedWeek;

      return platformMatches && weekMatches;
    });
  }, [supportedDrafts, selectedPlatform, selectedWeek]);

  const readyCount = supportedDrafts.filter(
    (draft) => draft.status === "Ready to review"
  ).length;

  async function copyToClipboard(id: string, value: string) {
    await navigator.clipboard.writeText(value);
    setCopiedId(id);
    window.setTimeout(() => setCopiedId(null), 1400);
  }

  function downloadCsv() {
    const csv = buildCsv(filteredDrafts);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "crumblabz-90-day-launch-scheduler.csv";
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  }

  function buildProfileCopy(item: ProfileKitItem) {
    return [
      `Profile: ${item.name}`,
      `Handle: ${item.handle}`,
      `Cadence: ${item.cadence}`,
      `Role: ${item.role}`,
      "",
      "Bio / About copy:",
      item.setupCopy,
      "",
      `CTA: ${item.cta}`,
      `Notes: ${item.notes}`
    ].join("\n");
  }

  return (
    <main className="min-h-screen px-4 py-4 text-ink sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-5">
        <header className="rounded-lg border border-white/70 bg-white/85 p-4 shadow-panel backdrop-blur">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#1E2A5E] text-white">
                <PackageCheck className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#e87a2e]">
                  CrumbLabz
                </p>
                <h1 className="text-2xl font-bold tracking-0 text-ink sm:text-3xl">
                  Content Pack
                </h1>
                <p className="mt-1 max-w-3xl text-sm text-stone-600">
                  Copy-ready profile text, first 2-3 weeks of posts, brand
                  assets, and scheduler export for the Week 1 launch sprint.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <a
                href="/"
                className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-stone-200 bg-white px-3 text-sm font-semibold text-graphite transition hover:bg-stone-50"
              >
                <ArrowLeft className="h-4 w-4" />
                Dashboard
              </a>
              <a
                href="/launch-control"
                className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-[#1E2A5E]/20 bg-[#1E2A5E] px-3 text-sm font-semibold text-white transition hover:bg-[#263875]"
              >
                <CalendarDays className="h-4 w-4" />
                Launch Control
              </a>
            </div>
          </div>
        </header>

        <section className="grid gap-3 md:grid-cols-4">
          {[
            {
              label: "Drafts prepared",
              value: supportedDrafts.length.toString(),
              detail: "2-3 week launch batch"
            },
            {
              label: "Ready copy",
              value: readyCount.toString(),
              detail: "Can be pasted after review"
            },
            {
              label: "Profile kits",
              value: profileKit.length.toString(),
              detail: "LinkedIn, Instagram, X, Facebook"
            },
            {
              label: "Automation status",
              value: "CSV",
              detail: "Export for Buffer, Publer, or Metricool"
            }
          ].map((item) => (
            <article
              key={item.label}
              className="rounded-lg border border-white/70 bg-white p-4 shadow-panel"
            >
              <p className="text-xs font-semibold uppercase text-stone-500">
                {item.label}
              </p>
              <p className="mt-2 text-2xl font-bold text-ink">{item.value}</p>
              <p className="text-sm text-stone-600">{item.detail}</p>
            </article>
          ))}
        </section>

        <section className="rounded-lg border border-[#e87a2e]/25 bg-[#e87a2e]/10 p-4 text-sm text-graphite shadow-panel">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <strong className="text-ink">Account status:</strong>
              <span className="ml-2">
                Instagram is live. LinkedIn is blocked by the profile connection
                requirement, so it needs a boss or established account to create
                the company page and add Milan as an admin.
              </span>
            </div>
            <a
              href="/social-automation-plan"
              className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-md border border-[#1E2A5E]/20 bg-[#1E2A5E] px-3 text-sm font-semibold text-white transition hover:bg-[#263875]"
            >
              <ExternalLink className="h-4 w-4" />
              Open social plan
            </a>
          </div>
        </section>

        <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {brandAssets.map((asset) => (
            <article
              key={asset.title}
              className="overflow-hidden rounded-lg border border-white/70 bg-white shadow-panel"
            >
              <div className="relative h-40 bg-paper">
                <Image
                  src={asset.href}
                  alt={asset.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className={asset.imageClassName}
                />
              </div>
              <div className="space-y-3 p-4">
                <div className="flex items-center gap-2">
                  <ImageIcon className="h-4 w-4 text-[#e87a2e]" />
                  <h2 className="font-bold text-ink">{asset.title}</h2>
                </div>
                <p className="text-sm text-stone-600">{asset.use}</p>
                <a
                  href={asset.href}
                  download
                  className="inline-flex h-9 items-center justify-center gap-2 rounded-md border border-stone-200 bg-white px-3 text-sm font-semibold text-graphite transition hover:bg-stone-50"
                >
                  <Download className="h-4 w-4" />
                  Download
                </a>
              </div>
            </article>
          ))}
        </section>

        <section className="rounded-lg border border-white/70 bg-white p-4 shadow-panel">
          <div className="mb-4 flex items-center gap-2">
            <FileText className="h-5 w-5 text-[#1E2A5E]" />
            <h2 className="text-lg font-bold text-ink">Profile Copy</h2>
          </div>
          <div className="grid gap-3 lg:grid-cols-2">
            {profileKit.map((item) => (
              <article
                key={item.name}
                className="rounded-lg border border-stone-200 bg-paper p-4"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="font-bold text-ink">{item.name}</h3>
                    <p className="text-sm text-stone-600">
                      {item.handle} - {item.cadence}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      copyToClipboard(
                        `profile-${item.name}`,
                        buildProfileCopy(item)
                      )
                    }
                    className="inline-flex h-9 items-center justify-center gap-2 rounded-md border border-stone-200 bg-white px-3 text-sm font-semibold text-graphite transition hover:bg-stone-50"
                  >
                    {copiedId === `profile-${item.name}` ? (
                      <Check className="h-4 w-4 text-mint" />
                    ) : (
                      <Clipboard className="h-4 w-4" />
                    )}
                    Copy
                  </button>
                </div>
                <p className="mt-3 text-sm leading-6 text-graphite">
                  {item.setupCopy}
                </p>
                <div className="mt-3 rounded-md border border-white bg-white p-3 text-sm">
                  <strong>CTA:</strong> {item.cta}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-lg border border-white/70 bg-white p-4 shadow-panel">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-[#e87a2e]" />
              <div>
                <h2 className="text-lg font-bold text-ink">
                  First Content Batch
                </h2>
                <p className="text-sm text-stone-600">
                  Filter, copy, or export the posts that are ready for review.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={downloadCsv}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-mint bg-mint px-3 text-sm font-semibold text-white transition hover:bg-mint/90"
            >
              <Download className="h-4 w-4" />
              Export Scheduler CSV
            </button>
          </div>

          <div className="mt-4 flex flex-col gap-3 lg:flex-row lg:items-center">
            <div className="flex items-center gap-2 text-sm font-semibold text-stone-600">
              <Filter className="h-4 w-4" />
              Filters
            </div>
            <div className="flex flex-wrap gap-2">
              {(["all", "Week 1", "Week 2", "Week 3"] as WeekFilter[]).map(
                (week) => (
                  <button
                    key={week}
                    type="button"
                    onClick={() => setSelectedWeek(week)}
                    className={clsx(
                      "h-9 rounded-md border px-3 text-sm font-semibold transition",
                      selectedWeek === week
                        ? "border-[#1E2A5E] bg-[#1E2A5E] text-white"
                        : "border-stone-200 bg-white text-graphite hover:bg-stone-50"
                    )}
                  >
                    {week === "all" ? "All weeks" : week}
                  </button>
                )
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {(
                ["all", "linkedin", "instagram", "facebook", "x"] as PlatformFilter[]
              ).map((platform) => (
                <button
                  key={platform}
                  type="button"
                  onClick={() => setSelectedPlatform(platform)}
                  className={clsx(
                    "h-9 rounded-md border px-3 text-sm font-semibold transition",
                    selectedPlatform === platform
                      ? "border-[#e87a2e] bg-[#e87a2e] text-white"
                      : "border-stone-200 bg-white text-graphite hover:bg-stone-50"
                  )}
                >
                  {platform === "all" ? "All platforms" : platformMeta[platform].label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 grid gap-3">
            {filteredDrafts.map((draft) => {
              const schedule = scheduleByDraftId[draft.id];
              const exportText = [
                draft.title,
                "",
                draft.copy,
                "",
                `UTM link: ${createUtmLink(draft)}`,
                `Asset direction: ${draft.assetDirection}`
              ].join("\n");

              return (
                <article
                  key={draft.id}
                  className="rounded-lg border border-stone-200 bg-paper p-4"
                >
                  <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <PlatformPill platform={draft.platform} />
                        <span className="rounded-full border border-stone-200 bg-white px-2.5 py-1 text-xs font-semibold text-stone-600">
                          {draft.week}
                        </span>
                        <span className="rounded-full border border-stone-200 bg-white px-2.5 py-1 text-xs font-semibold text-stone-600">
                          {draft.format}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-ink">
                        {draft.title}
                      </h3>
                      <p className="text-sm text-stone-600">
                        {draft.theme} - {draft.status}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(draft.id, exportText)}
                      className="inline-flex h-9 items-center justify-center gap-2 rounded-md border border-stone-200 bg-white px-3 text-sm font-semibold text-graphite transition hover:bg-stone-50"
                    >
                      {copiedId === draft.id ? (
                        <Check className="h-4 w-4 text-mint" />
                      ) : (
                        <Clipboard className="h-4 w-4" />
                      )}
                      Copy post
                    </button>
                  </div>
                  <p className="mt-4 whitespace-pre-line text-sm leading-6 text-graphite">
                    {draft.copy}
                  </p>
                  <div className="mt-4 grid gap-3 md:grid-cols-[1fr_1fr_auto]">
                    <div className="rounded-md border border-white bg-white p-3 text-sm">
                      <strong>Asset:</strong> {draft.assetDirection}
                    </div>
                    <div className="rounded-md border border-white bg-white p-3 text-sm">
                      <strong>UTM:</strong>{" "}
                      <span className="break-all text-stone-600">
                        {createUtmLink(draft)}
                      </span>
                    </div>
                    <div className="rounded-md border border-white bg-white p-3 text-sm">
                      <strong>Slot:</strong>{" "}
                      {schedule ? `${schedule.date} ${schedule.time}` : "TBC"}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
