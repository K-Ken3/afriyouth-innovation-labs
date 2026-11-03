import { CheckCircle2 } from "lucide-react";
import { Button } from "./Button";

export function FormSuccess({
  title,
  body,
  onReset,
  resetLabel = "Start again",
}: {
  title: string;
  body: string;
  onReset: () => void;
  resetLabel?: string;
}) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="rounded-2xl border border-forest/15 bg-sage/40 p-7 sm:p-9"
    >
      <CheckCircle2 aria-hidden="true" className="h-8 w-8 text-forest" strokeWidth={1.3} />
      <h3 className="mt-5 font-display text-2xl tracking-[-0.03em] text-forest">{title}</h3>
      <p className="mt-3 max-w-lg text-sm leading-relaxed text-forest/70">{body}</p>
      <Button variant="outline" className="mt-6" arrow={false} onClick={onReset}>
        {resetLabel}
      </Button>
    </div>
  );
}
