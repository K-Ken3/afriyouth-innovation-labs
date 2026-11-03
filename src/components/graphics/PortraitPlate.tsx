import { useId } from "react";
import { cn } from "@/lib/cn";

type PortraitPlateProps = {
  variant?: 0 | 1 | 2;
  className?: string;
  label: string;
  index?: string;
  title?: string;
};

/**
 * Original abstract "systems portrait" plates — an illustration-led visual
 * language that avoids unverifiable stock photography. Official AfriYouth
 * photography can replace these components without changing page layout.
 */
export function PortraitPlate({
  variant = 0,
  className,
  label,
  index = "01",
  title = "Systems portrait",
}: PortraitPlateProps) {
  const rawId = useId();
  const id = rawId.replace(/[:]/g, "");
  const dotId = `dots-${id}`;
  const gradientId = `sphere-${id}`;

  return (
    <figure className={cn("relative overflow-hidden bg-forest", className)}>
      <svg
        viewBox="0 0 480 600"
        preserveAspectRatio="xMidYMid slice"
        role="img"
        aria-label={label}
        className="h-full w-full"
      >
        <defs>
          <pattern id={dotId} width="14" height="14" patternUnits="userSpaceOnUse">
            <circle cx="1.4" cy="1.4" r="1.1" fill="#F5F3EB" opacity="0.34" />
          </pattern>
          <radialGradient id={gradientId} cx="38%" cy="30%" r="75%">
            <stop offset="0%" stopColor="#EDFFC4" />
            <stop offset="55%" stopColor="#C9F36A" />
            <stop offset="100%" stopColor="#9DBE4F" />
          </radialGradient>
        </defs>

        {variant === 0 ? (
          <g>
            <rect width="480" height="600" fill="#153D32" />
            <rect width="480" height="600" fill={`url(#${dotId})`} opacity="0.28" />
            <circle cx="348" cy="198" r="168" fill={`url(#${gradientId})`} opacity="0.95" />
            <circle cx="348" cy="198" r="168" fill="none" stroke="#F5F3EB" strokeOpacity="0.25" />
            <path
              d="M96 600c-14-118-6-190 34-262 40-73 108-108 168-82 66 29 81 104 48 160-24 40-70 63-88 108-12 30-12 50-6 76"
              fill="none"
              stroke="#F5F3EB"
              strokeOpacity="0.82"
              strokeWidth="1.4"
            />
            <path
              d="M116 600c-10-110 0-180 36-246 36-66 96-96 150-74 58 24 70 92 42 142-22 38-66 60-84 102-10 25-10 50-4 76"
              fill="none"
              stroke="#C9F36A"
              strokeOpacity="0.45"
              strokeWidth="1"
            />
            <path d="M56 0v600M424 0v600" stroke="#F5F3EB" strokeOpacity="0.12" />
            <path d="M0 80h480M0 520h480" stroke="#F5F3EB" strokeOpacity="0.12" />
            <g fill="#F5F3EB" opacity="0.8">
              <circle cx="56" cy="80" r="3" />
              <circle cx="424" cy="80" r="3" />
              <circle cx="56" cy="520" r="3" />
              <circle cx="424" cy="520" r="3" />
            </g>
            <text
              x="56"
              y="556"
              fill="#F5F3EB"
              fontSize="10"
              letterSpacing="3.4"
              fontFamily="DM Sans, sans-serif"
            >
              {title.toUpperCase()}
            </text>
            <text
              x="424"
              y="556"
              fill="#C9F36A"
              fontSize="10"
              letterSpacing="3"
              textAnchor="end"
              fontFamily="DM Sans, sans-serif"
            >
              {index}
            </text>
          </g>
        ) : null}

        {variant === 1 ? (
          <g>
            <rect width="480" height="600" fill="#DCE6DB" />
            <rect x="176" width="304" height="600" fill="#153D32" />
            <rect x="176" width="304" height="600" fill={`url(#${dotId})`} opacity="0.22" />
            <circle cx="132" cy="438" r="126" fill={`url(#${gradientId})`} />
            <path
              d="M24 128h128M24 144h84M24 160h104"
              stroke="#153D32"
              strokeOpacity="0.4"
            />
            <path
              d="M240 600V300c0-58 46-104 104-104s104 46 104 104v300"
              fill="none"
              stroke="#F5F3EB"
              strokeOpacity="0.7"
              strokeWidth="1.4"
            />
            <path
              d="M262 600V308c0-46 36-82 82-82s82 36 82 82v292"
              fill="none"
              stroke="#C9F36A"
              strokeOpacity="0.55"
            />
            <rect x="386" y="84" width="26" height="26" fill="#C9F36A" />
            <path d="M0 60h480M0 540h480" stroke="#153D32" strokeOpacity="0.25" />
            <text
              x="24"
              y="556"
              fill="#153D32"
              fontSize="10"
              letterSpacing="3.4"
              fontFamily="DM Sans, sans-serif"
            >
              {title.toUpperCase()}
            </text>
            <text
              x="456"
              y="556"
              fill="#F5F3EB"
              fontSize="10"
              letterSpacing="3"
              textAnchor="end"
              fontFamily="DM Sans, sans-serif"
            >
              {index}
            </text>
          </g>
        ) : null}

        {variant === 2 ? (
          <g>
            <rect width="480" height="600" fill="#171B18" />
            <rect width="480" height="600" fill={`url(#${dotId})`} opacity="0.16" />
            <path
              d="M120 600V232c0-66 54-120 120-120s120 54 120 120v368"
              fill="none"
              stroke="#DCE6DB"
              strokeOpacity="0.78"
              strokeWidth="1.5"
            />
            <path
              d="M150 600V240c0-50 40-90 90-90s90 40 90 90v360"
              fill="none"
              stroke="#C9F36A"
              strokeOpacity="0.35"
            />
            <circle cx="240" cy="300" r="52" fill={`url(#${gradientId})`} />
            <rect x="44" y="120" width="58" height="58" fill="#C4734C" />
            <path d="M0 476h480" stroke="#F5F3EB" strokeOpacity="0.18" />
            <path d="M386 476v124M240 476v124M94 476v124" stroke="#F5F3EB" strokeOpacity="0.18" />
            <path d="M36 60h34v34" fill="none" stroke="#F5F3EB" strokeOpacity="0.55" />
            <text
              x="36"
              y="552"
              fill="#F5F3EB"
              fontSize="10"
              letterSpacing="3.4"
              fontFamily="DM Sans, sans-serif"
            >
              {title.toUpperCase()}
            </text>
            <text
              x="444"
              y="552"
              fill="#C9F36A"
              fontSize="10"
              letterSpacing="3"
              textAnchor="end"
              fontFamily="DM Sans, sans-serif"
            >
              {index}
            </text>
          </g>
        ) : null}
      </svg>
    </figure>
  );
}
