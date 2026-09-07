import { BRAND_LOGOS } from "./brandLogos";
import type { BrandLogoName } from "./brandLogos";

/**
 * Figma's documented display sizes for partner logos:
 *   s = 48px — the stated MINIMUM ("don't use logos below 48x48px, they lose
 *              clarity"); for compact list items only.
 *   m = 80px — the default, used on product cards and partner pages.
 */
export type BrandLogoSize = "s" | "m";

const SIZE_PX: Record<BrandLogoSize, number> = { s: 48, m: 80 };

export interface BrandLogoProps {
  /** Figma `brand/logo/` slug, e.g. "flipkart". */
  name: BrandLogoName;
  /** 48px (compact lists) or 80px (cards, partner pages). Default "m". */
  size?: BrandLogoSize;
  /** Overrides `size` when a layout genuinely needs a larger logo. Must be >= 48. */
  px?: number;
  className?: string;
}

/**
 * BrandLogo — LehLah Design System
 *
 * Renders an approved partner brand logo. This is the code counterpart of
 * applying a `brand/logo/*` paint style in Figma — the artwork is committed
 * under src/assets/brand-logos and looked up by the same slug.
 *
 * Figma: "lehlah-brand-assets" (node 1128:2688). Its usage rules are encoded
 * here rather than left to callers:
 *   - never recolored, never effected (no shadow/blur/filter is applied)
 *   - aspect ratio preserved (`object-contain` in a square box)
 *   - never below 48x48
 * Callers pick the brand and the size; everything else is fixed by design.
 *
 * @category Brand
 */
export default function BrandLogo({ name, size = "m", px, className = "" }: BrandLogoProps) {
  const entry = BRAND_LOGOS[name];
  const dimension = px ?? SIZE_PX[size];

  if (import.meta.env.DEV && dimension < 48) {
    console.warn(
      `BrandLogo "${name}": rendered at ${dimension}px. The design system sets a 48px ` +
        `minimum — partner logos lose clarity below it.`,
    );
  }

  return (
    <img
      src={entry.src}
      alt={`${entry.label} logo`}
      width={dimension}
      height={dimension}
      loading="lazy"
      decoding="async"
      className={["shrink-0 object-contain", className].join(" ")}
      style={{ width: dimension, height: dimension }}
    />
  );
}
