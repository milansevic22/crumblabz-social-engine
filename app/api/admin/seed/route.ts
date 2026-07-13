import { NextResponse, type NextRequest } from "next/server";
import { isAdminRequest } from "@/lib/auth";
import { getAdminDb, hasFirebaseAdminConfig } from "@/lib/firebase/admin";
import { campaigns, channels, posts } from "@/lib/sample-data";

export async function POST(request: NextRequest) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  if (!hasFirebaseAdminConfig()) {
    return NextResponse.json({
      mode: "review",
      message:
        "Firebase Admin is not configured. The dashboard is using local sample data.",
      campaigns: campaigns.length,
      channels: channels.length,
      posts: posts.length
    });
  }

  const db = getAdminDb();
  const batch = db.batch();
  const now = new Date().toISOString();

  for (const campaign of campaigns) {
    batch.set(db.collection("campaigns").doc(campaign.id), {
      ...campaign,
      updatedAt: now
    });
  }

  for (const channel of channels) {
    batch.set(db.collection("channels").doc(channel.id), {
      ...channel,
      updatedAt: now
    });
  }

  for (const post of posts) {
    batch.set(db.collection("posts").doc(post.id), {
      ...post,
      updatedAt: now
    });
  }

  await batch.commit();

  return NextResponse.json({
    mode: "firebase",
    message: "Firebase seeded.",
    campaigns: campaigns.length,
    channels: channels.length,
    posts: posts.length
  });
}
