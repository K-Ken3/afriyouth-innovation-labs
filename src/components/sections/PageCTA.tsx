import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";

export function PageCTA({
  eyebrow = "Next step",
  title,
  body,
  primary,
  secondary,
}: {
  eyebrow?: string;
  title: string;
  body: string;
  primary: { label: string; to: string };
  secondary?: { label: string; to: string };
}) {
  return (
    <section className="border-t border-forest/15 bg-sage/35">
      <div className="container-editorial section-tight">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-7">
            <p className="eyebrow text-forest/55">{eyebrow}</p>
            <h2 className="display-lg mt-4 max-w-2xl text-forest">{title}</h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-forest/65">{body}</p>
          </Reveal>
          <Reveal delay={0.08} className="flex flex-wrap gap-3 lg:col-span-5 lg:justify-end">
            <ButtonLink to={primary.to}>{primary.label}</ButtonLink>
            {secondary ? (
              <ButtonLink to={secondary.to} variant="outline">
                {secondary.label}
              </ButtonLink>
            ) : null}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function InlineLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link
      to={to}
      className="link-underline group inline-flex items-center gap-2 text-sm font-medium text-forest"
    >
      {children}
      <ArrowUpRight
        aria-hidden="true"
        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </Link>
  );
}
