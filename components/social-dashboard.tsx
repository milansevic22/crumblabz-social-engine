"use client";

import { useMemo, useState } from "react";
import clsx from "clsx";
import {
  AlertTriangle,
  BarChart3,
  CalendarDays,
  Check,
  CheckCircle2,
  Clock3,
  BookOpen,
  FileText,
  Globe2,
  Flag,
  Instagram,
  LayoutDashboard,
  Linkedin,
  MessageCircle,
  Music2,
  Plus,
  RefreshCw,
  Send,
  ShieldCheck,
  Sparkles,
  Twitter,
  X as XIcon,
  Youtube
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type {
  BrandRule,
  Campaign,
  MetricSnapshot,
  Platform,
  PostStatus,
  SocialChannel,
  SocialPost,
  WeeklyPlaybookItem
} from "@/types";
import type { DashboardMode } from "@/lib/dashboard-data";

type SocialDashboardProps = {
  brandRules: BrandRule[];
  campaigns: Campaign[];
  channels: SocialChannel[];
  dataMode: DashboardMode;
  initialPosts: SocialPost[];
  metrics: MetricSnapshot[];
  weeklyPlaybook: WeeklyPlaybookItem[];
};

const statusConfig: Record<
  PostStatus,
  { label: string; className: string; dot: string }
> = {
  idea: {
    label: "Idea",
    className: "bg-stone-100 text-stone-700 border-stone-200",
    dot: "bg-stone-400"
  },
  draft: {
    label: "Draft",
    className: "bg-white text-graphite border-stone-200",
    dot: "bg-graphite"
  },
  needs_approval: {
    label: "Approval",
    className: "bg-amber/10 text-amber border-amber/30",
    dot: "bg-amber"
  },
  approved: {
    label: "Approved",
    className: "bg-mint/10 text-mint border-mint/30",
    dot: "bg-mint"
  },
  scheduled: {
    label: "Scheduled",
    className: "bg-plum/10 text-plum border-plum/25",
    dot: "bg-plum"
  },
  publishing: {
    label: "Publishing",
    className: "bg-coral/10 text-coral border-coral/30",
    dot: "bg-coral"
  },
  published: {
    label: "Published",
    className: "bg-emerald-100 text-emerald-800 border-emerald-200",
    dot: "bg-emerald-500"
  },
  failed: {
    label: "Failed",
    className: "bg-red-100 text-red-800 border-red-200",
    dot: "bg-red-500"
  }
};

const platformConfig: Record<
  Platform,
  {
    label: string;
    Icon: React.ComponentType<{ className?: string }>;
    className: string;
  }
> = {
  linkedin: {
    label: "LinkedIn",
    Icon: Linkedin,
    className: "bg-[#0a66c2]/10 text-[#0a66c2] border-[#0a66c2]/20"
  },
  instagram: {
    label: "Instagram",
    Icon: Instagram,
    className: "bg-[#d62976]/10 text-[#b51f66] border-[#d62976]/20"
  },
  tiktok: {
    label: "TikTok",
    Icon: Music2,
    className: "bg-ink/10 text-ink border-ink/15"
  },
  youtube: {
    label: "YouTube",
    Icon: Youtube,
    className: "bg-[#ff0033]/10 text-[#c60028] border-[#ff0033]/20"
  },
  threads: {
    label: "Threads",
    Icon: MessageCircle,
    className: "bg-graphite/10 text-graphite border-graphite/20"
  },
  bluesky: {
    label: "Bluesky",
    Icon: Globe2,
    className: "bg-sky-100 text-sky-800 border-sky-200"
  },
  x: {
    label: "X",
    Icon: Twitter,
    className: "bg-zinc-100 text-zinc-900 border-zinc-200"
  }
};

const campaignClasses: Record<string, string> = {
  mint: "border-l-mint",
  coral: "border-l-coral",
  plum: "border-l-plum"
};

const pipeline: Array<{
  title: string;
  statuses: PostStatus[];
  Icon: LucideIcon;
}> = [
  {
    title: "Drafts",
    statuses: ["idea", "draft"],
    Icon: Sparkles
  },
  {
    title: "Approval",
    statuses: ["needs_approval", "approved"],
    Icon: ShieldCheck
  },
  {
    title: "Scheduled",
    statuses: ["scheduled", "publishing"],
    Icon: CalendarDays
  },
  {
    title: "Published",
    statuses: ["published", "failed"],
    Icon: CheckCircle2
  }
];

function formatDate(value?: string) {
  if (!value) {
    return "Not scheduled";
  }

  return new Intl.DateTimeFormat("en-GB", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(value));
}

function createDefaultSchedule() {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  date.setHours(9, 0, 0, 0);
  return date.toISOString();
}

function StatusBadge({ status }: { status: PostStatus }) {
  const config = statusConfig[status];

  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold",
        config.className
      )}
    >
      <span className={clsx("h-1.5 w-1.5 rounded-full", config.dot)} />
      {config.label}
    </span>
  );
}

function PlatformPill({ platform }: { platform: Platform }) {
  const config = platformConfig[platform];
  const Icon = config.Icon;

  return (
    <span
      className={clsx(
        "inline-flex h-8 items-center gap-1.5 rounded-full border px-2.5 text-xs font-semibold",
        config.className
      )}
      title={config.label}
    >
      <Icon className="h-3.5 w-3.5" />
      {config.label}
    </span>
  );
}

function IconButton({
  children,
  onClick,
  title,
  variant = "default"
}: {
  children: React.ReactNode;
  onClick: () => void;
  title: string;
  variant?: "default" | "primary" | "danger";
}) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className={clsx(
        "inline-flex h-9 items-center justify-center gap-2 rounded-md border px-3 text-sm font-semibold transition",
        variant === "primary" &&
          "border-mint bg-mint text-white hover:bg-mint/90",
        variant === "danger" &&
          "border-red-200 bg-red-50 text-red-700 hover:bg-red-100",
        variant === "default" &&
          "border-stone-200 bg-white text-graphite hover:border-stone-300 hover:bg-stone-50"
      )}
    >
      {children}
    </button>
  );
}

export function SocialDashboard({
  brandRules,
  campaigns,
  channels,
  dataMode,
  initialPosts,
  metrics,
  weeklyPlaybook
}: SocialDashboardProps) {
  const [posts, setPosts] = useState(initialPosts);
  const [selectedCampaignId, setSelectedCampaignId] = useState(
    campaigns[0]?.id ?? ""
  );
  const [selectedPlatform, setSelectedPlatform] =
    useState<Platform>("linkedin");
  const [draftTitle, setDraftTitle] = useState("New build note");
  const [draftCaption, setDraftCaption] = useState(
    "We shipped a small system that turns social ideas into approved, scheduled posts. The real value is not automation alone; it is a clear approval process."
  );
  const [adminSecret, setAdminSecret] = useState("");
  const [notice, setNotice] = useState(
    dataMode === "firebase"
      ? "Firebase data loaded. Live publishing still needs Buffer credentials."
      : "Demo data is loaded until Firebase is seeded and connected."
  );

  const selectedCampaign = campaigns.find(
    (campaign) => campaign.id === selectedCampaignId
  );

  const stats = useMemo(() => {
    const pending = posts.filter((post) => post.status === "needs_approval");
    const scheduled = posts.filter((post) => post.status === "scheduled");
    const published = posts.filter((post) => post.status === "published");

    return {
      pending: pending.length,
      scheduled: scheduled.length,
      published: published.length,
      readyChannels: channels.filter((channel) => channel.status === "ready")
        .length
    };
  }, [channels, posts]);

  const nextPost = useMemo(() => {
    return posts
      .filter((post) => post.scheduledAt && post.status !== "published")
      .sort(
        (left, right) =>
          new Date(left.scheduledAt ?? "").getTime() -
          new Date(right.scheduledAt ?? "").getTime()
      )[0];
  }, [posts]);

  function updatePost(postId: string, updates: Partial<SocialPost>) {
    setPosts((currentPosts) =>
      currentPosts.map((post) =>
        post.id === postId ? { ...post, ...updates } : post
      )
    );
  }

  function addDraft() {
    if (!draftCaption.trim() || !draftTitle.trim()) {
      setNotice("Add a title and caption before creating a draft.");
      return;
    }

    const newPost: SocialPost = {
      id: `post-${Date.now()}`,
      campaignId: selectedCampaignId,
      title: draftTitle,
      caption: draftCaption,
      format: selectedPlatform === "linkedin" ? "text" : "short_video",
      owner: "Milan",
      status: "draft",
      targetPlatforms: [selectedPlatform],
      assetHint:
        selectedPlatform === "linkedin"
          ? "Text post or screenshot crop"
          : "Vertical asset, 9:16, captions burned in",
      approvalNotes: "New draft created in review mode."
    };

    setPosts((currentPosts) => [newPost, ...currentPosts]);
    setNotice("Draft created. Move it into approval when the wording is ready.");
  }

  function approvePost(postId: string) {
    updatePost(postId, { status: "approved", approvalNotes: "Approved today." });
    setNotice("Post approved. Schedule it before publishing.");
  }

  function schedulePost(postId: string) {
    updatePost(postId, {
      status: "scheduled",
      scheduledAt: createDefaultSchedule()
    });
    setNotice("Post scheduled for the next morning slot.");
  }

  function simulatePublish(postId: string) {
    updatePost(postId, { status: "publishing" });
    setNotice("Publishing simulation started.");

    window.setTimeout(() => {
      updatePost(postId, {
        status: "published",
        bufferPostId: `mock-buffer-${postId}`,
        externalUrl: "https://buffer.com"
      });
      setNotice(
        "Demo publish completed in this browser only. No social account was used."
      );
    }, 700);
  }

  function failPost(postId: string) {
    updatePost(postId, {
      status: "failed",
      approvalNotes: "Marked for manual review."
    });
    setNotice("Post marked for manual review.");
  }

  return (
    <main className="min-h-screen px-4 py-4 text-ink sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-5">
        <header className="flex flex-col gap-4 rounded-lg border border-white/70 bg-white/80 p-4 shadow-panel backdrop-blur lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-ink text-white">
              <LayoutDashboard className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-mint">
                CrumbLabz
              </p>
              <h1 className="text-2xl font-bold tracking-0 text-ink sm:text-3xl">
                Social Engine
              </h1>
              <p className="mt-1 max-w-2xl text-sm text-stone-600">
                Review dashboard for campaign planning, approvals, scheduled posts,
                and reporting.
              </p>
            </div>
          </div>

          <div className="grid gap-3 lg:min-w-[460px]">
            <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
              <div className="rounded-md border border-stone-200 bg-paper p-3">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase text-stone-500">
                  <Clock3 className="h-4 w-4" />
                  Next post
                </div>
                <p className="mt-1 text-sm font-semibold text-ink">
                  {nextPost ? nextPost.title : "No scheduled post"}
                </p>
                <p className="text-xs text-stone-500">
                  {nextPost ? formatDate(nextPost.scheduledAt) : "Queue is empty"}
                </p>
              </div>
              <div className="rounded-md border border-mint/25 bg-mint/10 p-3 text-sm">
                <div className="font-bold text-mint">
                  {dataMode === "firebase" ? "Firebase mode" : "Demo mode"}
                </div>
                <div className="text-xs text-stone-600">
                  {stats.readyChannels} / {channels.length} channels connected
                </div>
              </div>
            </div>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              <a
                href="/week-1-ship-room"
                title="Open the polished Week 1 Ryan review page"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-mint/25 bg-mint px-3 text-sm font-semibold text-white transition hover:bg-mint/90"
              >
                <Sparkles className="h-4 w-4" />
                Ship Room
              </a>
              <a
                href="/launch-control"
                title="Open 90-day launch control"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-[#1E2A5E]/20 bg-[#1E2A5E] px-3 text-sm font-semibold text-white transition hover:bg-[#263875]"
              >
                <Flag className="h-4 w-4" />
                Launch Control
              </a>
              <a
                href="/content-pack"
                title="Open copy-ready content pack"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-[#e87a2e]/25 bg-[#e87a2e] px-3 text-sm font-semibold text-white transition hover:bg-[#cf6821]"
              >
                <FileText className="h-4 w-4" />
                Content Pack
              </a>
              <a
                href="/tech-docs.html"
                target="_blank"
                rel="noreferrer"
                title="Open technical documentation"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-stone-200 bg-white px-3 text-sm font-semibold text-graphite transition hover:border-stone-300 hover:bg-stone-50"
              >
                <BookOpen className="h-4 w-4" />
                Tech Docs
              </a>
            </div>
          </div>
        </header>

        <section className="rounded-lg border border-amber/30 bg-amber/10 p-4 text-sm text-graphite shadow-panel">
          <strong className="text-ink">
            {dataMode === "firebase" ? "Connected data" : "Review demo"}
          </strong>
          <span className="ml-2">
            {dataMode === "firebase"
              ? "The dashboard is reading Firestore records. Platform posting only becomes live after Buffer/channel credentials are added."
              : "These posts, metrics, and channel statuses are examples. They show the workflow before real social accounts are connected."}
          </span>
        </section>

        <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {metrics.map((metric) => (
            <article
              key={metric.label}
              className="rounded-lg border border-white/70 bg-white p-4 shadow-panel"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-medium text-stone-500">
                  {metric.label}
                </p>
                <BarChart3
                  className={clsx(
                    "h-4 w-4",
                    metric.tone === "good" && "text-mint",
                    metric.tone === "watch" && "text-amber",
                    metric.tone === "neutral" && "text-stone-400"
                  )}
                />
              </div>
              <div className="mt-3 flex items-end justify-between gap-3">
                <strong className="text-3xl font-bold tracking-0">
                  {metric.value}
                </strong>
                <span className="text-xs font-semibold text-stone-500">
                  {metric.change}
                </span>
              </div>
            </article>
          ))}
        </section>

        <section className="grid gap-5 xl:grid-cols-[1.4fr_0.8fr]">
          <div className="flex flex-col gap-5">
            <article className="rounded-lg border border-white/70 bg-white p-4 shadow-panel">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h2 className="text-lg font-bold">Create Draft</h2>
                  <p className="text-sm text-stone-500">
                    Turn one idea into one platform-specific post.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(["linkedin", "instagram", "tiktok", "youtube"] as Platform[]).map(
                    (platform) => (
                      <button
                        key={platform}
                        type="button"
                        onClick={() => setSelectedPlatform(platform)}
                        className={clsx(
                          "rounded-full border px-3 py-1.5 text-xs font-bold transition",
                          selectedPlatform === platform
                            ? "border-ink bg-ink text-white"
                            : "border-stone-200 bg-white text-stone-600 hover:bg-stone-50"
                        )}
                      >
                        {platformConfig[platform].label}
                      </button>
                    )
                  )}
                </div>
              </div>

              <div className="mt-4 grid gap-3 lg:grid-cols-[0.7fr_1fr_auto]">
                <label className="flex flex-col gap-1 text-sm font-semibold text-graphite">
                  Campaign
                  <select
                    value={selectedCampaignId}
                    onChange={(event) => setSelectedCampaignId(event.target.value)}
                    className="h-11 rounded-md border border-stone-200 bg-paper px-3 text-sm"
                  >
                    {campaigns.map((campaign) => (
                      <option key={campaign.id} value={campaign.id}>
                        {campaign.name}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="flex flex-col gap-1 text-sm font-semibold text-graphite">
                  Title
                  <input
                    value={draftTitle}
                    onChange={(event) => setDraftTitle(event.target.value)}
                    className="h-11 rounded-md border border-stone-200 bg-paper px-3 text-sm"
                  />
                </label>
                <div className="flex items-end">
                  <IconButton title="Create draft" onClick={addDraft} variant="primary">
                    <Plus className="h-4 w-4" />
                    Create
                  </IconButton>
                </div>
              </div>

              <label className="mt-3 flex flex-col gap-1 text-sm font-semibold text-graphite">
                Caption
                <textarea
                  value={draftCaption}
                  onChange={(event) => setDraftCaption(event.target.value)}
                  rows={4}
                  className="resize-none rounded-md border border-stone-200 bg-paper px-3 py-3 text-sm leading-6"
                />
              </label>
            </article>

            <section className="grid gap-4 xl:grid-cols-4">
              {pipeline.map((group) => {
                const groupPosts = posts.filter((post) =>
                  group.statuses.includes(post.status)
                );
                const Icon = group.Icon;

                return (
                  <div
                    key={group.title}
                    className="min-h-[360px] rounded-lg border border-white/70 bg-white/70 p-3 shadow-panel"
                  >
                    <div className="mb-3 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4 text-mint" />
                        <h2 className="text-sm font-bold">{group.title}</h2>
                      </div>
                      <span className="rounded-full bg-paper px-2 py-1 text-xs font-bold text-stone-500">
                        {groupPosts.length}
                      </span>
                    </div>

                    <div className="flex flex-col gap-3">
                      {groupPosts.map((post) => {
                        const campaign = campaigns.find(
                          (item) => item.id === post.campaignId
                        );
                        return (
                          <article
                            key={post.id}
                            className={clsx(
                              "rounded-lg border border-stone-200 border-l-4 bg-white p-3 shadow-sm",
                              campaignClasses[campaign?.color ?? "mint"]
                            )}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <h3 className="text-sm font-bold leading-5">
                                {post.title}
                              </h3>
                              <StatusBadge status={post.status} />
                            </div>
                            <p className="mt-2 line-clamp-4 text-sm leading-5 text-stone-600">
                              {post.caption}
                            </p>
                            <div className="mt-3 flex flex-wrap gap-1.5">
                              {post.targetPlatforms.map((platform) => (
                                <PlatformPill key={platform} platform={platform} />
                              ))}
                            </div>
                            <div className="mt-3 rounded-md bg-paper p-2 text-xs text-stone-600">
                              <strong className="text-graphite">Asset:</strong>{" "}
                              {post.assetHint}
                            </div>
                            <div className="mt-3 flex items-center justify-between gap-2 text-xs text-stone-500">
                              <span>{campaign?.name ?? "No campaign"}</span>
                              <span>{formatDate(post.scheduledAt)}</span>
                            </div>
                            <div className="mt-3 flex flex-wrap gap-2">
                              {post.status === "draft" && (
                                <IconButton
                                  title="Move to approval"
                                  onClick={() =>
                                    updatePost(post.id, {
                                      status: "needs_approval"
                                    })
                                  }
                                >
                                  <ShieldCheck className="h-4 w-4" />
                                  Review
                                </IconButton>
                              )}
                              {post.status === "needs_approval" && (
                                <IconButton
                                  title="Approve post"
                                  onClick={() => approvePost(post.id)}
                                  variant="primary"
                                >
                                  <Check className="h-4 w-4" />
                                  Approve
                                </IconButton>
                              )}
                              {post.status === "approved" && (
                                <IconButton
                                  title="Schedule post"
                                  onClick={() => schedulePost(post.id)}
                                >
                                  <CalendarDays className="h-4 w-4" />
                                  Schedule
                                </IconButton>
                              )}
                              {post.status === "scheduled" && (
                                <IconButton
                                  title="Demo publish"
                                  onClick={() => simulatePublish(post.id)}
                                  variant="primary"
                                >
                                  <Send className="h-4 w-4" />
                                  Demo
                                </IconButton>
                              )}
                              {post.status !== "published" &&
                                post.status !== "failed" && (
                                  <IconButton
                                    title="Mark for manual review"
                                    onClick={() => failPost(post.id)}
                                    variant="danger"
                                  >
                                    <XIcon className="h-4 w-4" />
                                  </IconButton>
                                )}
                            </div>
                          </article>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </section>
          </div>

          <aside className="flex flex-col gap-5">
            <article className="rounded-lg border border-white/70 bg-white p-4 shadow-panel">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-bold">Publishing Control</h2>
                  <p className="text-sm text-stone-500">{notice}</p>
                </div>
                <RefreshCw className="h-5 w-5 text-mint" />
              </div>
              <div className="mt-4 grid gap-2 sm:grid-cols-[1fr_auto] xl:grid-cols-1">
                <input
                  value={adminSecret}
                  onChange={(event) => setAdminSecret(event.target.value)}
                  placeholder="Admin secret"
                  type="password"
                  className="h-11 rounded-md border border-stone-200 bg-paper px-3 text-sm"
                />
                <IconButton
                  title="Store admin secret in this browser session"
                  onClick={() =>
                    setNotice(
                      adminSecret
                        ? "Admin secret stored for this session."
                        : "Paste the admin secret first."
                    )
                  }
                >
                  <ShieldCheck className="h-4 w-4" />
                  Check
                </IconButton>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                <div className="rounded-md bg-paper p-3">
                  <div className="text-xl font-bold">{stats.pending}</div>
                  <div className="text-xs text-stone-500">Pending</div>
                </div>
                <div className="rounded-md bg-paper p-3">
                  <div className="text-xl font-bold">{stats.scheduled}</div>
                  <div className="text-xs text-stone-500">Queued</div>
                </div>
                <div className="rounded-md bg-paper p-3">
                  <div className="text-xl font-bold">{stats.published}</div>
                  <div className="text-xs text-stone-500">Sent</div>
                </div>
              </div>
            </article>

            <article className="rounded-lg border border-white/70 bg-white p-4 shadow-panel">
              <h2 className="text-lg font-bold">Channels</h2>
              <div className="mt-4 flex flex-col gap-3">
                {channels.map((channel) => {
                  const config = platformConfig[channel.platform];
                  const Icon = config.Icon;
                  return (
                    <div
                      key={channel.id}
                      className="rounded-lg border border-stone-200 bg-paper p-3"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-2">
                          <div
                            className={clsx(
                              "flex h-9 w-9 items-center justify-center rounded-md border",
                              config.className
                            )}
                          >
                            <Icon className="h-4 w-4" />
                          </div>
                          <div>
                            <h3 className="text-sm font-bold">{channel.name}</h3>
                            {channel.profileUrl ? (
                              <a
                                href={channel.profileUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="text-xs font-semibold text-mint underline-offset-2 hover:underline"
                              >
                                {channel.handle}
                              </a>
                            ) : (
                              <p className="text-xs text-stone-500">
                                {channel.handle}
                              </p>
                            )}
                          </div>
                        </div>
                        <span
                          className={clsx(
                            "rounded-full px-2 py-1 text-xs font-bold",
                            channel.status === "ready" &&
                              "bg-mint/10 text-mint",
                            channel.status === "needs_auth" &&
                              "bg-amber/10 text-amber",
                            channel.status === "manual_review" &&
                              "bg-coral/10 text-coral"
                          )}
                        >
                          {channel.status.replace("_", " ")}
                        </span>
                      </div>
                      <div className="mt-3 flex items-center justify-between gap-3 text-xs text-stone-500">
                        <span>{channel.audience}</span>
                        <span className="font-semibold">{channel.cadence}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </article>

            <article className="rounded-lg border border-white/70 bg-white p-4 shadow-panel">
              <h2 className="text-lg font-bold">Campaigns</h2>
              <div className="mt-4 flex flex-col gap-3">
                {campaigns.map((campaign) => (
                  <button
                    type="button"
                    key={campaign.id}
                    onClick={() => setSelectedCampaignId(campaign.id)}
                    className={clsx(
                      "rounded-lg border border-l-4 bg-paper p-3 text-left transition hover:bg-white",
                      campaignClasses[campaign.color],
                      selectedCampaignId === campaign.id
                        ? "border-ink"
                        : "border-stone-200"
                    )}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-sm font-bold">{campaign.name}</h3>
                      <span className="rounded-full bg-white px-2 py-1 text-xs font-bold text-stone-500">
                        {campaign.stage}
                      </span>
                    </div>
                    <p className="mt-2 text-xs leading-5 text-stone-600">
                      {campaign.goal}
                    </p>
                  </button>
                ))}
              </div>
            </article>
          </aside>
        </section>

        <section className="grid gap-5 lg:grid-cols-[0.7fr_1fr]">
          <article className="rounded-lg border border-white/70 bg-white p-4 shadow-panel">
            <h2 className="text-lg font-bold">Weekly Pattern</h2>
            <div className="mt-4 grid gap-3">
              {weeklyPlaybook.map((item) => (
                <div
                  key={item.day}
                  className="grid gap-3 rounded-lg border border-stone-200 bg-paper p-3 sm:grid-cols-[110px_1fr]"
                >
                  <div className="text-sm font-bold">{item.day}</div>
                  <div>
                    <div className="text-sm font-semibold text-graphite">
                      {item.focus}
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {item.platforms.map((platform) => (
                        <PlatformPill key={platform} platform={platform} />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-lg border border-white/70 bg-white p-4 shadow-panel">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber" />
              <h2 className="text-lg font-bold">Brand Rules</h2>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {brandRules.map((rule) => (
                <div
                  key={rule.label}
                  className="rounded-lg border border-stone-200 bg-paper p-3"
                >
                  <h3 className="text-sm font-bold">{rule.label}</h3>
                  <p className="mt-1 text-sm leading-5 text-stone-600">
                    {rule.detail}
                  </p>
                </div>
              ))}
            </div>
          </article>
        </section>

        <footer className="rounded-lg border border-white/70 bg-white/80 p-4 text-sm text-stone-600 shadow-panel">
          <strong className="text-ink">Selected campaign:</strong>{" "}
          {selectedCampaign?.name ?? "None"}.
          <span className="ml-2">
            Real publishing is handled by protected API routes and Vercel Cron
            after Firebase Admin, Buffer credentials, and real channel IDs are
            configured.
          </span>
        </footer>
      </div>
    </main>
  );
}
