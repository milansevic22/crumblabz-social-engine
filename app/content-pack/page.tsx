import type { Metadata } from "next";
import { ContentPackBoard } from "@/components/content-pack-board";
import {
  launchContentDrafts,
  profileKit
} from "@/lib/launch-control-data";

export const metadata: Metadata = {
  title: "Content Pack | CrumbLabz Social Engine",
  description:
    "Copy-ready profile text, first content batch, brand assets, and scheduler export for the CrumbLabz social launch."
};

export default function ContentPackPage() {
  return (
    <ContentPackBoard
      contentDrafts={launchContentDrafts}
      profileKit={profileKit}
    />
  );
}
