import type { Metadata } from "next";
import { SocialAutomationPlan } from "@/components/social-automation-plan";

export const metadata: Metadata = {
  title: "Social Automation Plan | CrumbLabz Social Engine",
  description:
    "A polished social media automation plan and content calendar for CrumbLabz."
};

export default function SocialAutomationPlanPage() {
  return <SocialAutomationPlan />;
}
