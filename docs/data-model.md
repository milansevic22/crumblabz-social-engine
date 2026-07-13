# Data Model

## Collections

### campaigns

Stores campaign planning information.

Fields:

- `id`
- `name`
- `goal`
- `owner`
- `stage`
- `startDate`
- `endDate`
- `color`
- `updatedAt`

### channels

Stores social channels.

Fields:

- `id`
- `platform`
- `name`
- `handle`
- `audience`
- `cadence`
- `status`
- `bufferChannelId`
- `updatedAt`

### posts

Stores content drafts and scheduled posts.

Fields:

- `id`
- `campaignId`
- `title`
- `caption`
- `format`
- `owner`
- `status`
- `targetPlatforms`
- `scheduledAt`
- `assetHint`
- `approvalNotes`
- `externalUrl`
- `bufferPostId`
- `failureReason`
- `updatedAt`

### publishLogs

Stores publishing attempts.

Fields:

- `postId`
- `provider`
- `externalId`
- `status`
- `createdAt`

## Status Flow

```text
idea -> draft -> needs_approval -> approved -> scheduled -> publishing -> published
```

Failure path:

```text
scheduled -> failed
```

## First Production Improvement

The MVP has a default Buffer channel ID. The next step is to store a Buffer
channel ID on every `channels` document and publish one post per selected
target platform.
