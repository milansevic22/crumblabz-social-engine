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
    title: "Describe it Monday. Use it Friday.",
    src: "/instagram-first-post/crumblabz-native-carousel-01.png"
  },
  {
    title: "Your ops are leaking hours",
    src: "/instagram-first-post/crumblabz-native-carousel-02.png"
  },
  {
    title: "One workflow. One useful tool.",
    src: "/instagram-first-post/crumblabz-native-carousel-03.png"
  },
  {
    title: "Real tools, really shipped",
    src: "/instagram-first-post/crumblabz-native-carousel-04.png"
  },
  {
    title: "From headache to working tool",
    src: "/instagram-first-post/crumblabz-native-carousel-05.png"
  },
  {
    title: "Automation with approval built in",
    src: "/instagram-first-post/crumblabz-native-carousel-06.png"
  },
  {
    title: "Tell us your headache",
    src: "/instagram-first-post/crumblabz-native-carousel-07.png"
  }
];

const caption = `Describe it Monday. Use it Friday.

CrumbLabz builds practical operations software for real businesses - dashboards, approval queues, reporting flows, outreach systems, and internal tools that remove the repetitive work.

Start with one slow workflow. We map it, build the useful version, get it approved, and ship it fast.

Tell us your headache.

#CustomSoftware #Operations #WorkflowAutomation #BusinessAutomation #CrumbLabz`;

export const metadata: Metadata = {
  title: "First Instagram Post Review | CrumbLabz Social Engine",
  description:
    "Review page for the first CrumbLabz native Instagram carousel, including slides, caption, and downloadable assets."
};

export default function InstagramFirstPostPage() {
  return (
    <main className="min-h-screen overflow-x-hidden px-4 py-4 text-ink sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-5">
        <header className="rounded-lg border border-white/70 bg-white/85 p-4 shadow-panel backdrop-blur">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-start">
              <Image
                src="/brand/CrumbLabz_Signature.png"
                alt="CrumbLabz"
                width={176}
                height={37}
                className="mt-1 h-auto w-44 max-w-full shrink-0"
                priority
              />
              <div className="w-full min-w-0 max-w-full">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#e87a2e]">
                  CrumbLabz Instagram
                </p>
                <h1 className="max-w-full text-balance text-[1.6rem] font-bold leading-tight tracking-0 text-ink sm:text-3xl">
                  Native Instagram Launch Carousel
                </h1>
                <p className="mt-1 max-w-3xl text-sm leading-6 text-stone-600">
                  A launch-ready asset for the CrumbLabz social automation
                  plan: website colours, brand assets, product UI cues, and
                  Instagram-native slide design instead of screenshots.
                </p>
              </div>
            </div>
            <div className="grid w-full gap-2 sm:w-auto sm:grid-cols-3">
              <a
                href="/content-pack"
                className="inline-flex h-10 min-w-0 items-center justify-center gap-2 rounded-md border border-stone-200 bg-white px-3 text-sm font-semibold text-graphite transition hover:bg-stone-50"
              >
                <ArrowLeft className="h-4 w-4" />
                Content Pack
              </a>
              <a
                href="/social-automation-plan"
                className="inline-flex h-10 min-w-0 items-center justify-center gap-2 rounded-md border border-[#1E2A5E]/20 bg-[#1E2A5E] px-3 text-sm font-semibold text-white transition hover:bg-[#263875]"
              >
                <PackageCheck className="h-4 w-4" />
                Social Plan
              </a>
              <a
                href="https://www.instagram.com/crumblabz/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-10 min-w-0 items-center justify-center gap-2 rounded-md border border-stone-200 bg-white px-3 text-sm font-semibold text-graphite transition hover:bg-stone-50"
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
              detail: "Ready for internal approval"
            },
            {
              label: "Format",
              value: "7 slides",
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
            This version directly addresses the design feedback: the carousel
            uses CrumbLabz website colours, logo, messaging, and product-style
            UI fragments, but it is designed as a native Instagram carousel
            rather than a copy of the website.
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
                  href="/instagram-first-post/crumblabz-native-carousel.zip"
                  download
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-mint bg-mint px-3 text-sm font-semibold text-white transition hover:bg-mint/90"
                >
                  <Download className="h-4 w-4" />
                  Download all assets
                </a>
                <a
                  href="/instagram-first-post/crumblabz-native-caption.txt"
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
