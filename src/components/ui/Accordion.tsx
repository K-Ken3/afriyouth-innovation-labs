import { useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/cn";
import type { Faq } from "@/content/types";

export function Accordion({
  items,
  className,
  theme = "light",
}: {
  items: Faq[];
  className?: string;
  theme?: "light" | "dark";
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const dark = theme === "dark";

  return (
    <div className={cn("border-t", dark ? "border-ivory/18" : "border-forest/15", className)}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={item.question}
            className={cn("border-b", dark ? "border-ivory/18" : "border-forest/15")}
          >
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${index}`}
                id={`faq-button-${index}`}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="group flex w-full items-start justify-between gap-6 py-5 text-left"
              >
                <span
                  className={cn(
                    "font-display text-lg leading-snug tracking-[-0.02em] transition-colors sm:text-xl",
                    dark ? "text-ivory group-hover:text-lime" : "text-forest group-hover:text-forest/65",
                  )}
                >
                  {item.question}
                </span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "mt-0.5 flex h-8 w-8 flex-none items-center justify-center rounded-full border transition-transform duration-300 ease-editorial",
                    dark ? "border-ivory/25" : "border-forest/20",
                    isOpen && "rotate-45",
                  )}
                >
                  <Plus className="h-4 w-4" strokeWidth={1.6} />
                </span>
              </button>
            </h3>
            <div
              id={`faq-panel-${index}`}
              role="region"
              aria-labelledby={`faq-button-${index}`}
              hidden={!isOpen}
              className="pb-6 pr-10"
            >
              <p
                className={cn(
                  "max-w-2xl text-sm leading-relaxed",
                  dark ? "text-ivory/70" : "text-forest/70",
                )}
              >
                {item.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
