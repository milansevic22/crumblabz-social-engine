import { SocialDashboard } from "@/components/social-dashboard";
import { getDashboardData } from "@/lib/dashboard-data";
import {
  brandRules,
  metrics,
  weeklyPlaybook
} from "@/lib/sample-data";

export const dynamic = "force-dynamic";

export default async function Home() {
  const dashboardData = await getDashboardData();

  return (
    <SocialDashboard
      brandRules={brandRules}
      campaigns={dashboardData.campaigns}
      channels={dashboardData.channels}
      dataMode={dashboardData.mode}
      initialPosts={dashboardData.posts}
      metrics={metrics}
      weeklyPlaybook={weeklyPlaybook}
    />
  );
}
