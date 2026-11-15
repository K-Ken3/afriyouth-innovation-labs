import { cn } from "@/lib/cn";

/**
 * Official AfriYouth figure mark.
 *
 * Geometry is extracted from the supplied brand-guidelines PDF
 * ("Afri Youth Innovation Lab Branding - Logo & Guidelines"), page 3, so the
 * adolescent figure with raised hands is reproduced from the official artwork
 * rather than approximated. The mark is monochrome and inherits currentColor.
 */
export function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 89 123.56"
      aria-hidden="true"
      focusable="false"
      className={cn("h-9 w-auto", className)}
      fill="currentColor"
    >
      <path d="M3.92 49.65C1.46 52 0 54.68 2.73 57.09c13.12 9.59 26.8 18.2 30.11 35.33 1.81 11.23-1.13 31.14 4.05 30.24 43.46-7.57 52.11-84.51 34.02-80.09-7.35 1.8-18.11 10.76-25.03 11.23-26.23 1.79-24.83-18.49-38.66-7.59-1.25.99-2.17 2.36-3.3 3.44Z" />
      <path d="M53.98 35.78c0 6.94-5.63 12.57-12.58 12.57-6.94 0-12.58-5.63-12.58-12.57 0-6.94 5.64-12.56 12.58-12.56 6.95 0 12.58 5.62 12.58 12.56Z" />
      <path d="m9.35 13.6.36-.42a5.02 5.02 0 0 1 6.54-.54l5.07 4.28a5.02 5.02 0 0 1 .54 6.54l-.36.42a5.02 5.02 0 0 1-6.54.54L9.9 20.14a5.02 5.02 0 0 1-.55-6.54Z" />
      <path d="m75.88 13.6-.36-.42a5.02 5.02 0 0 0-6.55-.54l-5.06 4.28a5.02 5.02 0 0 0-.55 6.54l.36.42a5.02 5.02 0 0 0 6.55.54l5.06-4.28a5.02 5.02 0 0 0 .55-6.54Z" />
      <path d="M43.27 0h-.55a4.64 4.64 0 0 0-4.65 4.64v6.63a4.64 4.64 0 0 0 4.64 4.64h.56a4.64 4.64 0 0 0 4.64-4.64V4.64A4.64 4.64 0 0 0 43.27 0Z" />
    </svg>
  );
}
