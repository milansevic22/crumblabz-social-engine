import { getAdminDb, hasFirebaseAdminConfig } from "@/lib/firebase/admin";
import {
  campaigns as sampleCampaigns,
  channels as sampleChannels,
  posts as samplePosts
} from "@/lib/sample-data";
import type { Campaign, SocialChannel, SocialPost } from "@/types";

export type DashboardMode = "sample" | "firebase";

export type DashboardData = {
  mode: DashboardMode;
  campaigns: Campaign[];
  channels: SocialChannel[];
  posts: SocialPost[];
};

async function readCollection<T extends { id: string }>(
  collectionName: string
): Promise<T[]> {
  const snapshot = await getAdminDb().collection(collectionName).get();

  return snapshot.docs.map((document) => ({
    id: document.id,
    ...document.data()
  })) as T[];
}

export async function getDashboardData(): Promise<DashboardData> {
  if (!hasFirebaseAdminConfig()) {
    return {
      mode: "sample",
      campaigns: sampleCampaigns,
      channels: sampleChannels,
      posts: samplePosts
    };
  }

  try {
    const [campaigns, channels, posts] = await Promise.all([
      readCollection<Campaign>("campaigns"),
      readCollection<SocialChannel>("channels"),
      readCollection<SocialPost>("posts")
    ]);

    if (!campaigns.length || !channels.length || !posts.length) {
      return {
        mode: "sample",
        campaigns: sampleCampaigns,
        channels: sampleChannels,
        posts: samplePosts
      };
    }

    return {
      mode: "firebase",
      campaigns,
      channels,
      posts
    };
  } catch {
    return {
      mode: "sample",
      campaigns: sampleCampaigns,
      channels: sampleChannels,
      posts: samplePosts
    };
  }
}
