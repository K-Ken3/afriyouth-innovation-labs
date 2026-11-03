import { useState } from "react";
import { cn } from "@/lib/cn";
import { PortraitPlate } from "@/components/graphics/PortraitPlate";
import type { Photo } from "@/content/photos";

type PhotoPlateProps = {
  photo: Photo;
  variant?: 0 | 1 | 2;
  className?: string;
  index?: string;
  title?: string;
  position?: string;
};

/**
 * Fills the same aspect-ratio slot as PortraitPlate. If the photograph fails
 * to load, the original illustrated plate is rendered instead.
 */
export function PhotoPlate({
  photo,
  variant = 0,
  className,
  index = "01",
  title = "Systems portrait",
  position = "center",
}: PhotoPlateProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <PortraitPlate
        variant={variant}
        className={className}
        label={photo.alt}
        index={index}
        title={title}
      />
    );
  }

  return (
    <figure className={cn("relative overflow-hidden bg-forest", className)}>
      <img
        src={photo.src}
        alt={photo.alt}
        width={photo.width}
        height={photo.height}
        loading="lazy"
        decoding="async"
        onError={() => setFailed(true)}
        className="absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: position }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-forest/85 via-forest/5 to-transparent"
      />
      <span className="pointer-events-none absolute left-3 top-3 rounded-full border border-ivory/25 bg-forest/60 px-2.5 py-1 text-[0.5rem] uppercase tracking-[0.16em] text-ivory/80 backdrop-blur-sm">
        Placeholder · {photo.credit}
      </span>
      <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-4 sm:p-5">
        <span className="text-[0.6rem] uppercase tracking-[0.18em] text-ivory/85">
          {title}
        </span>
        <span className="text-[0.6rem] tracking-[0.18em] text-lime">{index}</span>
      </figcaption>
    </figure>
  );
}