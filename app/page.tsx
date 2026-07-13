import { SocialDashboard } from "@/components/social-dashboard";
import {
  brandRules,
  campaigns,
  channels,
  metrics,
  posts,
  weeklyPlaybook
} from "@/lib/sample-data";

export default function Home() {
  return (
    <SocialDashboard
      brandRules={brandRules}
      campaigns={campaigns}
      channels={channels}
      initialPosts={posts}
      metrics={metrics}
      weeklyPlaybook={weeklyPlaybook}
    />
  );
}
