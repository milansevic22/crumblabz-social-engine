import { NextResponse, type NextRequest } from "next/server";
import { isAdminRequest } from "@/lib/auth";
import { getAdminDb, hasFirebaseAdminConfig } from "@/lib/firebase/admin";
import { createBufferPost, hasBufferConfig } from "@/lib/publishing/buffer";

type PublishRequestBody = {
  postId: string;
  text: string;
  channelId?: string;
  dueAt?: string;
};

export async function POST(request: NextRequest) {
  if (!isAdminRequest(request)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as PublishRequestBody;
  const channelId = body.channelId || process.env.BUFFER_DEFAULT_CHANNEL_ID;

  if (!body.postId || !body.text) {
    return NextResponse.json(
      { message: "postId and text are required." },
      { status: 400 }
    );
  }

  if (!channelId) {
    return NextResponse.json(
      {
        mode: "review",
        provider: "mock",
        message:
          "No Buffer channel is configured. Add BUFFER_DEFAULT_CHANNEL_ID or pass channelId."
      },
      { status: 200 }
    );
  }

  if (!hasBufferConfig()) {
    return NextResponse.json({
      mode: "review",
      provider: "mock",
      externalId: `mock-buffer-${body.postId}`,
      message: "BUFFER_API_KEY is not configured, so this was simulated."
    });
  }

  const result = await createBufferPost({
    text: body.text,
    channelId,
    dueAt: body.dueAt
  });

  if (hasFirebaseAdminConfig()) {
    const db = getAdminDb();
    await db.collection("publishLogs").add({
      postId: body.postId,
      provider: "buffer",
      externalId: result.id,
      status: "scheduled",
      createdAt: new Date().toISOString()
    });
    await db.collection("posts").doc(body.postId).set(
      {
        status: "scheduled",
        bufferPostId: result.id,
        updatedAt: new Date().toISOString()
      },
      { merge: true }
    );
  }

  return NextResponse.json({
    mode: "buffer",
    provider: "buffer",
    externalId: result.id,
    message: "Post sent to Buffer."
  });
}
