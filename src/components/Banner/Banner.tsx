export type BannerColor = "purple" | "teal" | "orange" | "magenta" | "lime" | "blue";
export type BannerWeight = "dark" | "default" | "light";

export interface BannerProps {
  header?: string;
  subtext?: string;
  cta?: string;
  onCtaClick?: () => void;
  color?: BannerColor;
  weight?: BannerWeight;
  /** Optional visual/illustration to render in the 150x150 creative slot. */
  creative?: React.ReactNode;
  className?: string;
}

const BG: Record<BannerColor, Record<BannerWeight, string>> = {
  blue: {
    light: "bg-[var(--banner-blue-light)]",
    default: "bg-[var(--banner-blue-default)]",
    dark: "bg-[var(--banner-blue-dark)]",
  },
  lime: {
    light: "bg-[var(--banner-lime-light)]",
    default: "bg-[var(--banner-lime-default)]",
    dark: "bg-[var(--banner-lime-dark)]",
  },
  purple: {
    light: "bg-[var(--banner-purple-light)]",
    default: "bg-[var(--banner-purple-default)]",
    dark: "bg-[var(--banner-purple-dark)]",
  },
  teal: {
    light: "bg-[var(--banner-teal-light)]",
    default: "bg-[var(--banner-teal-default)]",
    dark: "bg-[var(--banner-teal-dark)]",
  },
  magenta: {
    light: "bg-[var(--banner-magenta-light)]",
    default: "bg-[var(--banner-magenta-default)]",
    dark: "bg-[var(--banner-magenta-dark)]",
  },
  orange: {
    light: "bg-[var(--banner-orange-light)]",
    default: "bg-[var(--banner-orange-default)]",
    dark: "bg-[var(--banner-orange-dark)]",
  },
};

// "light" weight (and lime at any weight) always uses dark text/border; everything else is light-on-color.
function isDarkText(color: BannerColor, weight: BannerWeight) {
  return weight === "light" || color === "lime";
}

/**
 * Banner — LehLah Design System
 * Figma: component set `banner` (node 752:1504). 6 colors x 3 weights, each
 * a 350x150 card with header/subtext/CTA on the left and a 150x150 creative
 * slot on the right.
 * @category Marketing
 */
export default function Banner({
  header = "Header Text",
  subtext = "Subtext",
  cta = "Banner CTA",
  onCtaClick,
  color = "purple",
  weight = "dark",
  creative,
  className = "",
}: BannerProps) {
  const dark = isDarkText(color, weight);
  const textColor = dark ? "text-[color:var(--banner-text-dark)]" : "text-[color:var(--banner-text-light)]";
  const borderColor = dark ? "border-[var(--banner-border-dark)]" : "border-[var(--banner-border-light)]";

  return (
    <div
      className={[
        "flex h-[150px] w-[350px] items-center gap-[var(--surface-spacing-s)] overflow-hidden",
        "rounded-[var(--surface-radius-m)]",
        BG[color][weight],
        className,
      ].join(" ")}
    >
      <div className="flex h-full flex-1 flex-col items-start justify-between p-3">
        <div className={["flex flex-col gap-[7px]", textColor].join(" ")}>
          {/* title/large/700 */}
          <p className="w-full truncate text-[length:var(--type-title-large-size)] font-bold leading-[var(--type-title-large-line-height)]">
            {header}
          </p>
          {/* body/medium/400 */}
          <p className="w-full truncate text-[length:var(--type-body-medium-size)] leading-[var(--type-body-medium-line-height)]">
            {subtext}
          </p>
        </div>
        <button
          type="button"
          onClick={onCtaClick}
          className={[
            /* body/medium/600 */
            "rounded-[var(--surface-radius-full)] border-[length:var(--border-width-default)] border-solid px-2 py-1",
            "text-[length:var(--type-body-medium-size)] font-semibold leading-[var(--type-body-medium-line-height)]",
            borderColor,
            textColor,
          ].join(" ")}
        >
          {cta}
        </button>
      </div>
      <div className="size-[150px] shrink-0">{creative}</div>
    </div>
  );
}
