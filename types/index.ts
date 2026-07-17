export type Platform =
  | "linkedin"
  | "instagram"
  | "tiktok"
  | "youtube"
  | "threads"
  | "bluesky"
  | "x";

export type PostStatus =
  | "idea"
  | "draft"
  | "needs_approval"
  | "approved"
  | "scheduled"
  | "publishing"
  | "published"
  | "failed";

export type ContentFormat =
  | "text"
  | "image"
  | "carousel"
  | "short_video"
  | "case_study"
  | "founder_note";

export type SocialChannel = {
  id: string;
  platform: Platform;
  name: string;
  handle: string;
  profileUrl?: string;
  audience: string;
  cadence: string;
  status: "ready" | "needs_auth" | "manual_review";
  bufferChannelId?: string;
};

export type Campaign = {
  id: string;
  name: string;
  goal: string;
  owner: string;
  stage: "planning" | "active" | "reporting";
  startDate: string;
  endDate: string;
  color: string;
};

export type SocialPost = {
  id: string;
  campaignId: string;
  title: string;
  caption: string;
  format: ContentFormat;
  owner: string;
  status: PostStatus;
  targetPlatforms: Platform[];
  scheduledAt?: string;
  assetHint: string;
  approvalNotes: string;
  externalUrl?: string;
  bufferPostId?: string;
};

export type MetricSnapshot = {
  label: string;
  value: string;
  change: string;
  tone: "good" | "watch" | "neutral";
};

export type BrandRule = {
  label: string;
  detail: string;
};

export type WeeklyPlaybookItem = {
  day: string;
  focus: string;
  platforms: Platform[];
};
