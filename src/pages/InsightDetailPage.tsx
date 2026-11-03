import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, Clock, Info } from "lucide-react";
import { usePageMeta } from "@/hooks/usePageMeta";
import { notFoundMeta } from "@/content/seo";
import { getInsight, insights } from "@/content/insights";
import { Badge } from "@/components/ui/Badge";
import { MaskReveal } from "@/components/motion/MaskReveal";
import { PhotoPlate } from "@/components/graphics/PhotoPlate";
import { photos } from "@/content/photos";
import { Reveal } from "@/components/motion/Reveal";
import { PageCTA } from "@/components/sections/PageCTA";
import NotFoundPage from "./NotFoundPage";

export default function InsightDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const insight = slug ? getInsight(slug) : undefined;

  usePageMeta(
    insight
      ? {
          title: insight.title,
          description: insight.excerpt,
          path: `/insights/${insight.slug}`,
        }
      : notFoundMeta,
    { type: "article", noindex: !insight },
  );

  if (!insight) return <NotFoundPage />;

  const related = insights
    .filter((item) => item.slug !== insight.slug)
    .sort((a, b) => (a.category === insight.category ? -1 : b.category === insight.category ? 1 : 0))
    .slice(0, 2);

  return (
    <article>
      <header className="relative overflow-hidden border-b border-forest/15 bg-ivory pb-10 pt-8 sm:pb-14">
        <div className="container-editorial">
          <nav aria-label="Breadcrumb" className="mb-10 border-b border-forest/15 pb-4">
            <ol className="flex flex-wrap items-center gap-2 text-[0.625rem] uppercase tracking-[0.16em] text-forest/45">
              <li>
                <Link to="/" className="transition-colors hover:text-forest">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link to="/insights" className="transition-colors hover:text-forest">
                  Insights
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-forest/70">{insight.kind}</li>
            </ol>
          </nav>

          <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-8">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="soft">{insight.category}</Badge>
                <Badge variant="provisional" dot>
                  Provisional editorial
                </Badge>
              </div>
              <h1 className="display-xl mt-6 max-w-4xl text-forest">{insight.title}</h1>
              <p className="lede mt-6 max-w-2xl text-forest/70">{insight.excerpt}</p>
              <div className="mt-7 flex flex-wrap items-center gap-5 border-t border-forest/15 pt-4 text-[0.625rem] uppercase tracking-[0.14em] text-forest/45">
                <span>{insight.kind}</span>
                <span className="flex items-center gap-1.5">
                  <Clock aria-hidden="true" className="h-3 w-3" />
                  {insight.readingTime} min read
                </span>
                <span>{insight.edition}</span>
                <span>No author attribution supplied</span>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="rounded-2xl border border-forest/15 bg-sage/35 p-5">
                <div className="flex items-start gap-3">
                  <Info aria-hidden="true" className="mt-0.5 h-4 w-4 flex-none text-forest/60" />
                  <div>
                    <p className="text-[0.625rem] font-semibold uppercase tracking-[0.15em] text-forest/60">
                      About this essay
                    </p>
                    <p className="mt-2 text-xs leading-relaxed text-forest/65">
                      A prototype perspective piece written to demonstrate the
                      editorial platform. It will be replaced by official
                      AfriYouth publications, with verified authorship and dates.
                    </p>
                    <Link
                      to="/insights"
                      className="link-underline group mt-4 inline-flex items-center gap-2 text-xs font-medium text-forest"
                    >
                      <ArrowLeft aria-hidden="true" className="h-3.5 w-3.5" />
                      Back to insights
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container-editorial mt-8">
        <MaskReveal className="rounded-2xl">
          <PhotoPlate
            photo={photos.meetingPresentation}
            variant={0}
            className="aspect-[16/7] w-full"
            title={insight.category}
            index="R1"
          />
        </MaskReveal>
      </div>

      <div className="section bg-ivory">
        <div className="container-editorial grid gap-10 lg:grid-cols-12 lg:gap-8">
          <aside className="lg:col-span-3">
            <div className="lg:sticky lg:top-28">
              <p className="text-[0.625rem] uppercase tracking-[0.18em] text-forest/40">
                Reading note
              </p>
              <p className="mt-3 text-xs leading-relaxed text-forest/55">
                This essay argues from practice rather than reporting research
                findings. It contains no statistics, named programmes or claims
                about AfriYouth's results.
              </p>
              <div className="mt-6 border-t border-forest/15 pt-4">
                <p className="text-[0.625rem] uppercase tracking-[0.16em] text-forest/35">
                  Category
                </p>
                <p className="mt-1 text-sm text-forest/75">{insight.category}</p>
              </div>
            </div>
          </aside>

          <div className="lg:col-span-8 lg:col-start-5">
            {insight.body.map((paragraph, index) => (
              <Reveal key={paragraph} delay={index * 0.02}>
                <p
                  className={
                    index === 0
                      ? "text-lg leading-relaxed text-forest/85 first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:font-display first-letter:text-[4.4rem] first-letter:leading-[0.72] first-letter:tracking-[-0.05em] first-letter:text-forest sm:text-xl"
                      : "body-copy mt-5 text-base"
                  }
                >
                  {paragraph}
                </p>
              </Reveal>
            ))}

            {insight.pullQuote ? (
              <Reveal className="my-10 border-y border-forest/20 py-8">
                <blockquote className="font-display text-2xl leading-snug tracking-[-0.035em] text-forest sm:text-3xl">
                  <span aria-hidden="true" className="mr-1 text-lime [text-shadow:0_0_1px_#153d32]">
                    “
                  </span>
                  {insight.pullQuote}
                  <span aria-hidden="true" className="text-lime [text-shadow:0_0_1px_#153d32]">
                    ”
                  </span>
                </blockquote>
              </Reveal>
            ) : null}

            <div className="mt-10 rounded-xl border border-forest/15 bg-sage/25 p-5">
              <p className="text-[0.625rem] uppercase tracking-[0.15em] text-forest/45">
                Provisional publication
              </p>
              <p className="mt-2 text-sm leading-relaxed text-forest/65">
                This essay is part of the prototype knowledge platform. Official
                publications will include verified authorship, methodology and
                publication details.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-forest/15 pt-5">
              <Link
                to="/insights"
                className="link-underline group inline-flex items-center gap-2 text-sm text-forest/70"
              >
                <ArrowLeft aria-hidden="true" className="h-4 w-4" />
                All insights
              </Link>
              <Link
                to="/partner-with-us"
                className="link-underline group inline-flex items-center gap-2 text-sm text-forest"
              >
                Discuss this theme
                <ArrowUpRight
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <section className="border-t border-forest/15 bg-sage/30">
        <div className="container-editorial section-tight">
          <div className="flex items-center justify-between gap-4">
            <h2 className="display-md text-forest">Keep reading</h2>
            <Link to="/insights" className="link-underline text-sm text-forest/60">
              View all
            </Link>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {related.map((item) => (
              <Reveal key={item.slug}>
                <Link
                  to={`/insights/${item.slug}`}
                  className="group flex h-full flex-col justify-between gap-6 border-t border-forest/20 pt-5"
                >
                  <div>
                    <p className="text-[0.625rem] uppercase tracking-[0.15em] text-forest/45">
                      {item.category} · {item.kind}
                    </p>
                    <h3 className="mt-3 font-display text-2xl leading-snug tracking-[-0.035em] text-forest transition-colors group-hover:text-forest/65">
                      {item.title}
                    </h3>
                  </div>
                  <span className="flex items-center gap-2 text-[0.625rem] uppercase tracking-[0.14em] text-forest/40">
                    Read
                    <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <PageCTA
        eyebrow="From essay to practice"
        title="Put the question into a real engagement."
        body="If a theme here connects to a decision you are facing, bring it to a scoping conversation. We will be explicit about what can be known, what cannot, and what we would measure."
        primary={{ label: "Partner With Us", to: "/partner-with-us" }}
        secondary={{ label: "Contact", to: "/contact" }}
      />
    </article>
  );
}
