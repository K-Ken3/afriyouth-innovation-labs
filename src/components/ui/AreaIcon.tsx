import {
  GraduationCap,
  Landmark,
  Microscope,
  PenTool,
  Rocket,
  Target,
  Telescope,
  type LucideIcon,
} from "lucide-react";
import type { AreaIconName } from "@/content/types";
import { cn } from "@/lib/cn";

const icons: Record<AreaIconName, LucideIcon> = {
  research: Microscope,
  policy: Landmark,
  innovation: PenTool,
  entrepreneurship: Rocket,
  professional: GraduationCap,
  foresight: Telescope,
  impact: Target,
};

export function AreaIcon({
  name,
  className,
  strokeWidth = 1.35,
}: {
  name: AreaIconName;
  className?: string;
  strokeWidth?: number;
}) {
  const Icon = icons[name];
  return <Icon aria-hidden="true" className={cn("h-6 w-6", className)} strokeWidth={strokeWidth} />;
}
