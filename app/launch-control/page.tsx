import type { Metadata } from "next";
import { LaunchControlBoard } from "@/components/launch-control-board";
import {
  engagementPrompts,
  kpiTargets,
  launchChecklist,
  launchContentDrafts,
  profileKit
} from "@/lib/launch-control-data";

export const metadata: Metadata = {
  title: "90-Day Launch Control | CrumbLabz Social Engine",
  description:
    "Week 1 launch sprint, profile setup kit, content batch, KPI targets, and engagement tracker for CrumbLabz social media."
};

export default function LaunchControlPage() {
  return (
    <LaunchControlBoard
      checklist={launchChecklist}
      contentDrafts={launchContentDrafts}
      engagementPrompts={engagementPrompts}
      kpiTargets={kpiTargets}
      profileKit={profileKit}
    />
  );
}
