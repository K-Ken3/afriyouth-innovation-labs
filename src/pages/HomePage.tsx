import { usePageMeta } from "@/hooks/usePageMeta";
import { pageMeta } from "@/content/seo";
import { tickerItems } from "@/content/site";
import { Hero } from "@/components/sections/Hero";
import { Ticker } from "@/components/ui/Ticker";
import { Introduction } from "@/components/sections/Introduction";
import { MissionVision } from "@/components/sections/MissionVision";
import { ApproachSection } from "@/components/sections/ApproachSection";
import { AreasSection } from "@/components/sections/AreasSection";
import { ProgramsPreview } from "@/components/sections/ProgramsPreview";
import { InsightsPreview } from "@/components/sections/InsightsPreview";
import { ImpactPreview } from "@/components/sections/ImpactPreview";
import { Pathways } from "@/components/sections/Pathways";
import { ClosingCTA } from "@/components/sections/ClosingCTA";

export default function HomePage() {
  usePageMeta(pageMeta.home);

  return (
    <>
      <Hero />
      <Ticker items={tickerItems} />
      <Introduction />
      <MissionVision />
      <ApproachSection />
      <AreasSection />
      <ProgramsPreview />
      <InsightsPreview />
      <ImpactPreview />
      <Pathways />
      <ClosingCTA />
    </>
  );
}
