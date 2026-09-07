import type { ReactNode } from "react";

export type PillType =
  | "brand"
  | "grey"
  | "info"
  | "teal"
  | "purple"
  | "magenta"
  | "orange"
  | "success"
  | "warning"
  | "error"
  | "dark";
export type PillWeight = "tonal" | "fill";

export interface PillProps {
  children?: ReactNode;
  type?: PillType;
  weight?: PillWeight;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  className?: string;
}

/** tonal weight always uses the tonal background/border/content triplet for its color group */
const TONAL: Record<PillType, string> = {
  brand:
    "bg-[var(--notification-background-tonal-brand)] border border-solid border-[var(--notification-border-brand)] text-[color:var(--notification-content-brand)]",
  grey: "bg-[var(--notification-background-tonal-grey)] border border-solid border-[var(--notification-border-grey)] text-[color:var(--notification-content-grey)]",
  info: "bg-[var(--notification-background-tonal-info)] border border-solid border-[var(--notification-border-info)] text-[color:var(--notification-content-info)]",
  teal: "bg-[var(--notification-background-tonal-teal)] border border-solid border-[var(--notification-border-teal)] text-[color:var(--notification-content-teal)]",
  purple:
    "bg-[var(--notification-background-tonal-purple)] border border-solid border-[var(--notification-border-purple)] text-[color:var(--notification-content-purple)]",
  magenta:
    "bg-[var(--notification-background-tonal-magenta)] border border-solid border-[var(--notification-border-magenta)] text-[color:var(--notification-content-magenta)]",
  orange:
    "bg-[var(--notification-background-tonal-orange)] border border-solid border-[var(--notification-border-orange)] text-[color:var(--notification-content-orange)]",
  success:
    "bg-[var(--notification-background-tonal-success)] border border-solid border-[var(--notification-border-success)] text-[color:var(--notification-content-success)]",
  warning:
    "bg-[var(--notification-background-tonal-warning)] border border-solid border-[var(--notification-border-warning)] text-[color:var(--notification-content-warning)]",
  error:
    "bg-[var(--notification-background-tonal-error)] border border-solid border-[var(--notification-border-error)] text-[color:var(--notification-content-error)]",
  dark: "bg-[var(--notification-background-tonal-grey)] border border-solid border-[var(--notification-border-grey)] text-[color:var(--notification-content-solid-black)]",
};

/** fill weight always uses a solid background with white (or black, for brand/grey) content */
const FILL: Record<PillType, string> = {
  brand:
    "bg-[var(--notification-background-solid-brand)] text-[color:var(--notification-content-solid-black)]",
  grey: "bg-[var(--notification-background-solid-grey)] text-[color:var(--notification-content-solid-white)]",
  info: "bg-[var(--notification-background-solid-info)] text-[color:var(--notification-content-solid-white)]",
  teal: "bg-[var(--notification-background-solid-teal)] text-[color:var(--notification-content-solid-white)]",
  purple:
    "bg-[var(--notification-background-solid-purple)] text-[color:var(--notification-content-solid-white)]",
  magenta:
    "bg-[var(--notification-background-solid-magenta)] text-[color:var(--notification-content-solid-white)]",
  orange:
    "bg-[var(--notification-background-solid-orange)] text-[color:var(--notification-content-solid-white)]",
  success:
    "bg-[var(--notification-background-solid-success)] text-[color:var(--notification-content-solid-white)]",
  warning:
    "bg-[var(--notification-background-solid-warning)] text-[color:var(--notification-content-solid-white)]",
  error:
    "bg-[var(--notification-background-solid-error)] text-[color:var(--notification-content-solid-white)]",
  dark: "bg-[var(--notification-background-solid-dark)] text-[color:var(--notification-content-solid-white)]",
};

/**
 * Pill — LehLah Design System
 * Figma: component set `pill` (node 786:389). 11 colors x 2 weights.
 * @category Tags
 */
export default function Pill({
  children = "Pill Text",
  type = "brand",
  weight = "tonal",
  leftIcon,
  rightIcon,
  className = "",
}: PillProps) {
  return (
    <span
      className={[
        // Figma pins pill icons to 16px (icon/size/s); without this an icon
        // that sizes itself in em would inherit the 12px label size instead.
        "inline-flex items-center gap-[var(--notification-spacing)] [&_svg]:size-[var(--icon-size-s)]",
        "px-[var(--notification-padding-horizontal)] py-[var(--notification-padding-vertical)]",
        "rounded-[var(--notification-corner-radius)]",
        "text-[length:var(--type-body-medium-size)] leading-[var(--type-body-medium-line-height)] font-medium whitespace-nowrap",
        weight === "tonal" ? TONAL[type] : FILL[type],
        className,
      ].join(" ")}
    >
      {leftIcon}
      {children}
      {rightIcon}
    </span>
  );
}
