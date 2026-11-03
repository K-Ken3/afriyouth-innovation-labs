import { usePageMeta } from "@/hooks/usePageMeta";
import { pageMeta } from "@/content/seo";
import { programs } from "@/content/programs";
import { PageHero } from "@/components/ui/PageHero";
import { ProgramBoard } from "@/components/sections/ProgramBoard";
import { PageCTA } from "@/components/sections/PageCTA";
import { Badge } from "@/components/ui/Badge";

export default function ProgramsPage() {
  usePageMeta(pageMeta.programs);
  const publishedCount = programs.length;
  const openCount = programs.filter((program) => program.status === "open").length;

  return (
    <>
      <PageHero
        eyebrow="Programs & opportunities"
        chapter="03"
        title={["The opportunity", "board."]}
        intro="Fellowships, research calls, innovation challenges, learning opportunities and enterprise support will appear here with eligibility, deadline, format and a direct application route — only when verified."
        meta={[
          {
            label: "Status",
            value: publishedCount === 0 ? "Board in preparation" : `${openCount} open`,
          },
          {
            label: "Published calls",
            value: String(publishedCount).padStart(2, "0"),
          },
          { label: "Updates", value: "Only when confirmed" },
          { label: "Format", value: "Filterable board" },
        ]}
      />

      <section className="section bg-ivory">
        <div className="container-editorial">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <p className="eyebrow text-forest/55">Live board</p>
              <Badge variant="provisional" dot>
                {publishedCount === 0
                  ? "No published calls"
                  : `${publishedCount} published ${publishedCount === 1 ? "call" : "calls"}`}
              </Badge>
            </div>
            <p className="text-xs text-forest/45">
              {publishedCount === 0
                ? "Prototype behaviour only — no programs are listed"
                : "Official listings only — updated when information is confirmed"}
            </p>
          </div>
          <ProgramBoard />
        </div>
      </section>

      <PageCTA
        eyebrow="Can't see a fit yet?"
        title="Register your interest for future calls."
        body="Tell us which areas you're curious about. This prototype form validates locally and does not send or store your details; official interest channels will be published with verified information."
        primary={{ label: "Get Involved", to: "/get-involved" }}
        secondary={{ label: "What we do", to: "/what-we-do" }}
      />
    </>
  );
}
