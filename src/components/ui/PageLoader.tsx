import { Loader2 } from "lucide-react";

export function PageLoader() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-[65vh] items-center justify-center bg-ivory px-6"
    >
      <div className="flex flex-col items-center gap-4">
        <Loader2 aria-hidden="true" className="h-5 w-5 animate-spin text-forest/50" strokeWidth={1.5} />
        <p className="text-[0.6875rem] uppercase tracking-[0.22em] text-forest/45">
          Loading page
        </p>
      </div>
    </div>
  );
}
