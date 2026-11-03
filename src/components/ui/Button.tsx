import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "lime" | "outline" | "light" | "ghost";

const base =
  "group inline-flex min-h-12 items-center justify-center gap-3 rounded-full px-6 py-3 text-sm font-medium tracking-[-0.01em] transition-[background-color,color,border-color,transform] duration-300 ease-editorial disabled:pointer-events-none disabled:opacity-55 active:translate-y-px";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-forest text-ivory hover:bg-ink",
  lime: "bg-lime text-forest hover:bg-ivory",
  outline:
    "border border-forest/25 text-forest hover:border-forest hover:bg-forest hover:text-ivory",
  light:
    "border border-ivory/35 text-ivory hover:border-ivory hover:bg-ivory hover:text-forest",
  ghost: "text-forest hover:bg-forest/[0.06]",
};

type SharedProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
  arrow?: boolean;
  icon?: ReactNode;
};

function Inner({ children, arrow, icon }: Pick<SharedProps, "children" | "arrow" | "icon">) {
  return (
    <>
      <span>{children}</span>
      {icon ?? null}
      {arrow ? (
        <ArrowUpRight
          aria-hidden="true"
          className="h-4 w-4 flex-none transition-transform duration-300 ease-editorial group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          strokeWidth={1.8}
        />
      ) : null}
    </>
  );
}

type ButtonLinkProps = SharedProps & {
  to: string;
  onClick?: () => void;
  "aria-label"?: string;
};

export function ButtonLink({
  to,
  children,
  variant = "primary",
  className,
  arrow = true,
  icon,
  onClick,
  ...rest
}: ButtonLinkProps) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={cn(base, variants[variant], className)}
      {...rest}
    >
      <Inner arrow={arrow} icon={icon}>
        {children}
      </Inner>
    </Link>
  );
}

type ButtonProps = SharedProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "className">;

export function Button({
  children,
  variant = "primary",
  className,
  arrow = true,
  icon,
  type = "button",
  ...rest
}: ButtonProps) {
  return (
    <button type={type} className={cn(base, variants[variant], className)} {...rest}>
      <Inner arrow={arrow} icon={icon}>
        {children}
      </Inner>
    </button>
  );
}
