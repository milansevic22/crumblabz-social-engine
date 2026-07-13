import { NextResponse, type NextRequest } from "next/server";
import { isCronRequest } from "@/lib/auth";
import { getAdminDb, hasFirebaseAdminConfig } from "@/lib/firebase/admin";
import { createBufferPost, hasBufferConfig } from "@/lib/publishing/buffer";

export async function GET(request: NextRequest) {
  if (!isCronRequest(request)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  if (!hasFirebaseAdminConfig()) {
    return NextResponse.json({
      mode: "review",
      message:
        "Cron route is wired. Add Firebase Admin credentials to publish due posts."
    });
  }

  if (!hasBufferConfig() && !process.env.BUFFER_DEFAULT_CHANNEL_ID) {
    return NextResponse.json({
      mode: "review",
      message:
        "Firebase is configured, but Buffer credentials are missing. No posts were sent."
    });
  }

  const db = getAdminDb();
  const duePosts = await db
    .collection("posts")
    .where("status", "==", "scheduled")
    .where("scheduledAt", "<=", new Date().toISOString())
    .limit(10)
    .get();

  const results: Array<{ postId: string; status: string; detail: string }> = [];

  for (const postDoc of duePosts.docs) {
    const post = postDoc.data() as {
      caption?: string;
      scheduledAt?: string;
      bufferChannelId?: string;
    };
    const channelId = post.bufferChannelId || process.env.BUFFER_DEFAULT_CHANNEL_ID;

    if (!post.caption || !channelId || !hasBufferConfig()) {
      await postDoc.ref.set(
        {
          status: "failed",
          updatedAt: new Date().toISOString(),
          failureReason: "Missing caption, Buffer channel, or Buffer API key."
        },
        { merge: true }
      );
      results.push({
        postId: postDoc.id,
        status: "failed",
        detail: "Missing required publishing configuration."
      });
      continue;
    }

    try {
      const result = await createBufferPost({
        text: post.caption,
        channelId,
        dueAt: post.scheduledAt
      });

      await postDoc.ref.set(
        {
          status: "publishing",
          bufferPostId: result.id,
          updatedAt: new Date().toISOString()
        },
        { merge: true }
      );

      results.push({
        postId: postDoc.id,
        status: "sent_to_buffer",
        detail: result.id
      });
    } catch (error) {
      const detail = error instanceof Error ? error.message : "Unknown error";
      await postDoc.ref.set(
        {
          status: "failed",
          updatedAt: new Date().toISOString(),
          failureReason: detail
        },
        { merge: true }
      );
      results.push({ postId: postDoc.id, status: "failed", detail });
    }
  }

  return NextResponse.json({
    mode: "firebase",
    checked: duePosts.size,
    results
  });
}
