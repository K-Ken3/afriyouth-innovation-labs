import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Brand } from "@/components/navigation/Brand";
import { footerNav, site } from "@/content/site";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";

export function Footer() {
  return (
    <footer className="on-dark grain relative overflow-hidden bg-forest text-ivory">
      <div className="container-editorial relative z-10">
        <div className="grid gap-10 border-b border-ivory/15 py-12 sm:py-16 lg:grid-cols-12 lg:items-start lg:gap-8">
          <div className="lg:col-span-5">
            <Brand theme="dark" />
            <p className="mt-5 max-w-md text-sm leading-relaxed text-ivory/72">
              {site.description}
            </p>
            <p className="mt-4 max-w-md text-xs leading-relaxed text-ivory/45">
              {site.provisionalNotice}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <ButtonLink to="/partner-with-us" variant="lime">
                Partner With Us
              </ButtonLink>
              <ButtonLink to="/get-involved" variant="light">
                Get Involved
              </ButtonLink>
            </div>
          </div>

          <div className="grid gap-9 sm:grid-cols-3 lg:col-span-7 lg:gap-6">
            {footerNav.map((section) => (
              <div key={section.title}>
                <p className="mb-4 text-[0.6875rem] uppercase tracking-[0.18em] text-ivory/45">
                  {section.title}
                </p>
                <ul className="space-y-2">
                  {section.items.map((item) => (
                    <li key={item.to + item.label}>
                      <Link
                        to={item.to}
                        className="group inline-flex items-center gap-2 text-sm text-ivory/72 transition-colors hover:text-lime"
                      >
                        {item.label}
                        <ArrowUpRight
                          aria-hidden="true"
                          className="h-3.5 w-3.5 opacity-0 transition-[transform,opacity] duration-300 ease-editorial group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                          strokeWidth={1.7}
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-5 py-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-[0.6875rem] uppercase tracking-[0.18em] text-ivory/45">
              © {site.copyrightYear} {site.name}
            </p>
            <Badge variant="provisional" className="border-ivory/25 text-ivory/60">
              Prototype
            </Badge>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-[0.6875rem] uppercase tracking-[0.16em] text-ivory/40">
            <span>Research · Design · Enterprise · Policy · Foresight</span>
            <span className="hidden sm:inline">·</span>
            <span>Contact channels pending verification</span>
          </div>
        </div>
      </div>

      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 -top-16 select-none font-display text-[14rem] leading-none tracking-tighter text-ivory/[0.035] sm:text-[20rem]"
      >
        AIL
      </span>
    </footer>
  );
}
