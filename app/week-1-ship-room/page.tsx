import type { Metadata } from "next";
import Image from "next/image";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Download,
  ExternalLink,
  FileText,
  Instagram,
  Linkedin,
  PackageCheck,
  ShieldCheck,
  Sparkles,
  Twitter
} from "lucide-react";

const slides = [
  {
    title: "Hook with product proof",
    note: "Leads with the pain Ryan called out and shows a working dashboard visual.",
    src: "/instagram-first-post/crumblabz-first-post-slide-01.png"
  },
  {
    title: "The scattered workflow",
    note: "Makes the problem concrete: inboxes, sheets, memory, and unclear owners.",
    src: "/instagram-first-post/crumblabz-first-post-slide-02.png"
  },
  {
    title: "The useful version",
    note: "Shows the CrumbLabz answer: status, ownership, next action.",
    src: "/instagram-first-post/crumblabz-first-post-slide-03.png"
  },
  {
    title: "Fast build process",
    note: "Connects to the stronger site positioning: describe it Monday, use it Friday.",
    src: "/instagram-first-post/crumblabz-first-post-slide-04.png"
  },
  {
    title: "Clear CTA",
    note: "Ends with one simple ask: tell us one slow workflow.",
    src: "/instagram-first-post/crumblabz-first-post-slide-05.png"
  }
];

const fixes = [
  {
    title: "Removed the draft stamp",
    detail:
      "The carousel now looks like a client-facing review asset, not an internal placeholder."
  },
  {
    title: "Added product-first visuals",
    detail:
      "The first and third slides now show produced dashboard visuals instead of describing an asset that is not there."
  },
  {
    title: "Rewrote the hook",
    detail:
      "The opener now starts with a specific operational pain, not a logo and slogan."
  },
  {
    title: "Focused on Week 1",
    detail:
      "The page is built around one shippable post and one practical launch week, not a large unfinished backlog."
  }
];

const weekPlan = [
  {
    day: "Mon",
    platform: "LinkedIn",
    Icon: Linkedin,
    title: "Your spreadsheet is not the system",
    status: "Ready after LinkedIn page access",
    detail:
      "Anchor post using the carousel hook as a text-led founder education piece."
  },
  {
    day: "Tue",
    platform: "X / Facebook",
    Icon: Twitter,
    title: "Good internal software removes friction",
    status: "Ready to paste",
    detail:
      "Short repurpose post that keeps the same message without over-explaining."
  },
  {
    day: "Wed",
    platform: "LinkedIn",
    Icon: Linkedin,
    title: "The value of a working review link",
    status: "Needs one real screenshot when available",
    detail:
      "Proof-style post showing why CrumbLabz ships reviewable tools quickly."
  },
  {
    day: "Thu",
    platform: "Instagram",
    Icon: Instagram,
    title: "Product proof carousel",
    status: "Ready for Ryan review",
    detail:
      "Five-slide carousel rebuilt with stronger hook, product visuals, caption, and asset downloads."
  },
  {
    day: "Fri",
    platform: "LinkedIn",
    Icon: Linkedin,
    title: "Small tools can create big impact",
    status: "Ready to review",
    detail:
      "Education post explaining the kind of operational problems CrumbLabz should own."
  }
];

const caption = `Your spreadsheet is not the system. It is the symptom.

The real problem is usually the workflow behind it: scattered ownership, manual handoffs, slow reporting, and decisions waiting on someone to rebuild the truth by hand.

CrumbLabz turns operational headaches into working tools.

One clear place for status.
One owner for the next action.
One useful version the team can click, review, and improve.

Tell us one workflow that feels slower than it should.

Business Optimization + AI`;

export const metadata: Metadata = {
  title: "Week 1 Ship Room | CrumbLabz Social Engine",
  description:
    "Ryan review page for the polished Week 1 CrumbLabz social launch assets."
};

export default function WeekOneShipRoomPage() {
  return (
    <main className="min-h-screen px-4 py-4 text-ink sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-5">
        <header className="rounded-lg border border-white/70 bg-white/90 p-4 shadow-panel backdrop-blur">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#1E2A5E] text-white">
                <PackageCheck className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#e87a2e]">
                  Ryan review pass
                </p>
                <h1 className="text-2xl font-bold tracking-0 text-ink sm:text-3xl">
                  Week 1 Ship Room
                </h1>
                <p className="mt-1 max-w-3xl text-sm leading-6 text-stone-600">
                  A tighter version of the MVP: one finished carousel, real
                  product-style visuals, a clear Week 1 posting plan, and the
                  exact approval points needed before anything goes live.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <a
                href="/"
                className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-stone-200 bg-white px-3 text-sm font-semibold text-graphite transition hover:bg-stone-50"
              >
                <ArrowLeft className="h-4 w-4" />
                Dashboard
              </a>
              <a
                href="/instagram-first-post"
                className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-[#e87a2e]/25 bg-[#e87a2e] px-3 text-sm font-semibold text-white transition hover:bg-[#cf6821]"
              >
                <Instagram className="h-4 w-4" />
                Carousel Review
              </a>
            </div>
          </div>
        </header>

        <section className="grid gap-3 md:grid-cols-4">
          {[
            ["Primary deliverable", "1 carousel", "Finished review asset"],
            ["Slides", "5", "1080x1080 PNGs"],
            ["Week 1 scope", "5 posts", "Instagram, LinkedIn, X, Facebook"],
            ["Approval state", "Review", "Ready for Ryan feedback"]
          ].map(([label, value, detail]) => (
            <article
              key={label}
              className="rounded-lg border border-white/70 bg-white p-4 shadow-panel"
            >
              <p className="text-xs font-semibold uppercase text-stone-500">
                {label}
              </p>
              <p className="mt-2 text-2xl font-bold text-ink">{value}</p>
              <p className="text-sm text-stone-600">{detail}</p>
            </article>
          ))}
        </section>

        <section className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <article className="rounded-lg border border-white/70 bg-white p-4 shadow-panel">
            <div className="mb-4 flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-[#2f8f83]" />
              <h2 className="text-lg font-bold text-ink">
                Feedback Addressed
              </h2>
            </div>
            <div className="grid gap-3">
              {fixes.map((fix) => (
                <div
                  key={fix.title}
                  className="rounded-lg border border-stone-200 bg-paper p-3"
                >
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#2f8f83]" />
                    <div>
                      <h3 className="text-sm font-bold text-ink">
                        {fix.title}
                      </h3>
                      <p className="mt-1 text-sm leading-5 text-stone-600">
                        {fix.detail}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-lg border border-white/70 bg-white p-4 shadow-panel">
            <div className="mb-4 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-[#e87a2e]" />
              <h2 className="text-lg font-bold text-ink">
                Meeting Talk Track
              </h2>
            </div>
            <div className="rounded-lg border border-[#1E2A5E]/15 bg-[#1E2A5E]/5 p-4 text-sm leading-6 text-graphite">
              <p>
                I took the feedback directly and rebuilt Week 1 instead of
                adding more backlog. The main change is that the first post now
                behaves like a real CrumbLabz proof asset: it opens on a pain,
                shows a product-style dashboard, explains the workflow problem,
                and ends with a simple CTA.
              </p>
              <p className="mt-3">
                The decision I need from Ryan is whether this is now close
                enough to approve as the first Instagram post, and what real
                screenshots or case-study visuals should replace the produced
                dashboard visuals as soon as those are available.
              </p>
            </div>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              <a
                href="/instagram-first-post/crumblabz-instagram-first-post.zip"
                download
                className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-[#2f8f83] bg-[#2f8f83] px-3 text-sm font-semibold text-white transition hover:bg-[#287c72]"
              >
                <Download className="h-4 w-4" />
                Download carousel
              </a>
              <a
                href="https://www.instagram.com/crumblabz/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-stone-200 bg-white px-3 text-sm font-semibold text-graphite transition hover:bg-stone-50"
              >
                <ExternalLink className="h-4 w-4" />
                Open Instagram
              </a>
            </div>
          </article>
        </section>

        <section className="rounded-lg border border-white/70 bg-white p-4 shadow-panel">
          <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Instagram className="h-5 w-5 text-[#b51f66]" />
                <h2 className="text-lg font-bold text-ink">
                  Post 1: Product Proof Carousel
                </h2>
              </div>
              <p className="mt-1 text-sm text-stone-600">
                Final-looking review asset. Nothing is posted until copy and
                visuals are approved.
              </p>
            </div>
            <a
              href="/instagram-first-post/caption.txt"
              download
              className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-stone-200 bg-paper px-3 text-sm font-semibold text-graphite transition hover:bg-white"
            >
              <FileText className="h-4 w-4" />
              Download caption
            </a>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {slides.map((slide, index) => (
              <article
                key={slide.src}
                className="overflow-hidden rounded-lg border border-stone-200 bg-paper"
              >
                <div className="relative aspect-square">
                  <Image
                    src={slide.src}
                    alt={slide.title}
                    fill
                    sizes="(min-width: 1280px) 20vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-3">
                  <p className="text-xs font-semibold uppercase text-stone-500">
                    Slide {index + 1}
                  </p>
                  <h3 className="mt-1 text-sm font-bold text-ink">
                    {slide.title}
                  </h3>
                  <p className="mt-1 text-xs leading-5 text-stone-600">
                    {slide.note}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="rounded-lg border border-white/70 bg-white p-4 shadow-panel">
            <div className="mb-4 flex items-center gap-2">
              <CalendarDays className="h-5 w-5 text-[#1E2A5E]" />
              <h2 className="text-lg font-bold text-ink">Week 1 Calendar</h2>
            </div>
            <div className="grid gap-3">
              {weekPlan.map((item) => {
                const Icon = item.Icon;
                return (
                  <div
                    key={`${item.day}-${item.title}`}
                    className="grid gap-3 rounded-lg border border-stone-200 bg-paper p-3 md:grid-cols-[72px_1fr]"
                  >
                    <div className="flex items-center gap-2 md:flex-col md:items-start">
                      <span className="rounded-md bg-[#1E2A5E] px-2.5 py-1 text-sm font-bold text-white">
                        {item.day}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-600">
                        <Icon className="h-3.5 w-3.5" />
                        {item.platform}
                      </span>
                    </div>
                    <div>
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                        <h3 className="text-sm font-bold text-ink">
                          {item.title}
                        </h3>
                        <span className="rounded-full border border-[#2f8f83]/25 bg-[#2f8f83]/10 px-2.5 py-1 text-xs font-bold text-[#2f8f83]">
                          {item.status}
                        </span>
                      </div>
                      <p className="mt-2 text-sm leading-5 text-stone-600">
                        {item.detail}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </article>

          <aside className="flex flex-col gap-5">
            <article className="rounded-lg border border-white/70 bg-white p-4 shadow-panel">
              <div className="mb-3 flex items-center gap-2">
                <FileText className="h-5 w-5 text-[#e87a2e]" />
                <h2 className="text-lg font-bold text-ink">Caption</h2>
              </div>
              <p className="whitespace-pre-line text-sm leading-6 text-graphite">
                {caption}
              </p>
            </article>

            <article className="rounded-lg border border-[#e87a2e]/25 bg-[#e87a2e]/10 p-4 shadow-panel">
              <h2 className="text-lg font-bold text-ink">
                Decision Needed In Meeting
              </h2>
              <div className="mt-3 grid gap-2 text-sm leading-5 text-graphite">
                <p>1. Is this hook strong enough for CrumbLabz?</p>
                <p>2. Which real product screenshots should replace mockups?</p>
                <p>3. Should the CTA be website-first or DM-first?</p>
                <p>4. Once approved, which account posts first?</p>
              </div>
            </article>
          </aside>
        </section>
      </div>
    </main>
  );
}
