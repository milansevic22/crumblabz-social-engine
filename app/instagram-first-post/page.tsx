import type { Metadata } from "next";
import Image from "next/image";
import {
  ArrowLeft,
  Download,
  ExternalLink,
  FileText,
  Instagram,
  PackageCheck
} from "lucide-react";

const slides = [
  {
    title: "Hook with product proof",
    src: "/instagram-first-post/crumblabz-first-post-slide-01.png"
  },
  {
    title: "The scattered workflow",
    src: "/instagram-first-post/crumblabz-first-post-slide-02.png"
  },
  {
    title: "The useful version",
    src: "/instagram-first-post/crumblabz-first-post-slide-03.png"
  },
  {
    title: "Fast build process",
    src: "/instagram-first-post/crumblabz-first-post-slide-04.png"
  },
  {
    title: "Clear CTA",
    src: "/instagram-first-post/crumblabz-first-post-slide-05.png"
  }
];

const caption = `Your spreadsheet is not the system. It is the symptom.

The real problem is usually the workflow behind it: scattered ownership, manual handoffs, slow reporting, and decisions waiting on someone to rebuild the truth by hand.

CrumbLabz turns operational headaches into working tools.

One clear place for status.
One owner for the next action.
One useful version the team can click, review, and improve.

Tell us one workflow that feels slower than it should.

Business Optimization + AI

#BusinessAutomation #AIForBusiness #Operations #WorkflowAutomation #BusinessOptimization #CustomSoftware #CrumbLabz`;

export const metadata: Metadata = {
  title: "First Instagram Post Review | CrumbLabz Social Engine",
  description:
    "Review page for the first CrumbLabz Instagram product-proof carousel, including slides, caption, and downloadable assets."
};

export default function InstagramFirstPostPage() {
  return (
    <main className="min-h-screen px-4 py-4 text-ink sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-5">
        <header className="rounded-lg border border-white/70 bg-white/85 p-4 shadow-panel backdrop-blur">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#1E2A5E] text-white">
                <Instagram className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#e87a2e]">
                  CrumbLabz Instagram
                </p>
                <h1 className="text-2xl font-bold tracking-0 text-ink sm:text-3xl">
                  Product Proof Carousel
                </h1>
                <p className="mt-1 max-w-3xl text-sm text-stone-600">
                  A rebuilt first post for Ryan review: stronger hook, visible
                  product-style visuals, no draft stamp, and a clearer CTA.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <a
                href="/content-pack"
                className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-stone-200 bg-white px-3 text-sm font-semibold text-graphite transition hover:bg-stone-50"
              >
                <ArrowLeft className="h-4 w-4" />
                Content Pack
              </a>
              <a
                href="/week-1-ship-room"
                className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-[#1E2A5E]/20 bg-[#1E2A5E] px-3 text-sm font-semibold text-white transition hover:bg-[#263875]"
              >
                <PackageCheck className="h-4 w-4" />
                Ship Room
              </a>
              <a
                href="https://www.instagram.com/crumblabz/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-stone-200 bg-white px-3 text-sm font-semibold text-graphite transition hover:bg-stone-50"
              >
                <ExternalLink className="h-4 w-4" />
                Instagram
              </a>
            </div>
          </div>
        </header>

        <section className="grid gap-3 md:grid-cols-3">
          {[
            {
              label: "Status",
              value: "Review",
              detail: "Ready for Ryan feedback"
            },
            {
              label: "Format",
              value: "5 slides",
              detail: "1080x1080 carousel"
            },
            {
              label: "Account",
              value: "@crumblabz",
              detail: "Instagram created"
            }
          ].map((item) => (
            <article
              key={item.label}
              className="rounded-lg border border-white/70 bg-white p-4 shadow-panel"
            >
              <p className="text-xs font-semibold uppercase text-stone-500">
                {item.label}
              </p>
              <p className="mt-2 text-2xl font-bold text-ink">{item.value}</p>
              <p className="text-sm text-stone-600">{item.detail}</p>
            </article>
          ))}
        </section>

        <section className="rounded-lg border border-[#e87a2e]/25 bg-[#e87a2e]/10 p-4 text-sm text-graphite shadow-panel">
          <strong className="text-ink">Review note:</strong>
          <span className="ml-2">
            This version directly addresses the feedback: no draft stamp, a
            pain-led hook, product visuals on the opener, and finished carousel
            assets ready for approval.
          </span>
        </section>

        <section className="grid gap-5 lg:grid-cols-[1fr_0.48fr]">
          <div className="rounded-lg border border-white/70 bg-white p-4 shadow-panel">
            <div className="mb-4 flex items-center gap-2">
              <PackageCheck className="h-5 w-5 text-[#1E2A5E]" />
              <h2 className="text-lg font-bold text-ink">Carousel Slides</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
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
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex items-center justify-between gap-3 p-3">
                    <div>
                      <p className="text-xs font-semibold uppercase text-stone-500">
                        Slide {index + 1}
                      </p>
                      <h3 className="text-sm font-bold text-ink">
                        {slide.title}
                      </h3>
                    </div>
                    <a
                      href={slide.src}
                      download
                      className="inline-flex h-9 items-center justify-center gap-2 rounded-md border border-stone-200 bg-white px-3 text-sm font-semibold text-graphite transition hover:bg-stone-50"
                    >
                      <Download className="h-4 w-4" />
                      PNG
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>

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

            <article className="rounded-lg border border-white/70 bg-white p-4 shadow-panel">
              <h2 className="text-lg font-bold text-ink">Downloads</h2>
              <div className="mt-4 grid gap-2">
                <a
                  href="/instagram-first-post/crumblabz-instagram-first-post.zip"
                  download
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-mint bg-mint px-3 text-sm font-semibold text-white transition hover:bg-mint/90"
                >
                  <Download className="h-4 w-4" />
                  Download all assets
                </a>
                <a
                  href="/instagram-first-post/caption.txt"
                  download
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-stone-200 bg-white px-3 text-sm font-semibold text-graphite transition hover:bg-stone-50"
                >
                  <FileText className="h-4 w-4" />
                  Download caption
                </a>
              </div>
            </article>
          </aside>
        </section>
      </div>
    </main>
  );
}
