export type BufferPublishInput = {
  text: string;
  channelId: string;
  dueAt?: string;
};

export type BufferPublishResult = {
  id: string;
  text: string;
  dueAt?: string;
  channelId?: string;
  status?: string;
};

type BufferGraphqlResponse = {
  data?: {
    createPost?: {
      message?: string;
      post?: BufferPublishResult;
    };
  };
  errors?: Array<{ message: string }>;
};

const createPostMutation = `
  mutation CreatePost($input: CreatePostInput!) {
    createPost(input: $input) {
      ... on PostActionSuccess {
        post {
          id
          text
          dueAt
          channelId
          status
        }
      }
      ... on MutationError {
        message
      }
    }
  }
`;

export function hasBufferConfig(): boolean {
  return Boolean(process.env.BUFFER_API_KEY);
}

export async function createBufferPost(
  input: BufferPublishInput
): Promise<BufferPublishResult> {
  if (!process.env.BUFFER_API_KEY) {
    throw new Error("BUFFER_API_KEY is not configured.");
  }

  const variables = {
    input: {
      text: input.text,
      channelId: input.channelId,
      schedulingType: "automatic",
      mode: input.dueAt ? "customScheduled" : "addToQueue",
      ...(input.dueAt ? { dueAt: input.dueAt } : {})
    }
  };

  const response = await fetch("https://api.buffer.com", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.BUFFER_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      query: createPostMutation,
      variables
    })
  });

  const payload = (await response.json()) as BufferGraphqlResponse;

  if (!response.ok) {
    throw new Error(`Buffer returned ${response.status}.`);
  }

  if (payload.errors?.length) {
    throw new Error(payload.errors.map((error) => error.message).join("; "));
  }

  const result = payload.data?.createPost;

  if (result?.message) {
    throw new Error(result.message);
  }

  if (!result?.post) {
    throw new Error("Buffer did not return a post.");
  }

  return result.post;
}
