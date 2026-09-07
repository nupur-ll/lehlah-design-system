import {
  BrandLogo,
  BRAND_LOGO_CATEGORY_LABELS,
  BRAND_LOGOS,
  brandLogosByCategory,
} from "@lehlah/design-system";
import type { BrandLogoCategory, BrandLogoName } from "@lehlah/design-system";

// BrandLogo renders a committed PNG at a fixed square footprint (48 or 80px) —
// it has no fill, border or label of its own, so a bare row of logos on a white
// card reads as floating artwork. Each story below gives the logos the kind of
// container they actually sit in (a labelled specimen cell, a list row, a
// partner tile) so the card shows the component in use rather than in isolation.
//
// The `px` prop is deliberately not swept: the component's own docs set 48px as
// a hard minimum and `size` already covers both documented display sizes.

/** One labelled specimen — mirrors how src/App.tsx's gallery presents them. */
function Specimen({ name, size }: { name: BrandLogoName; size?: "s" | "m" }) {
  return (
    <div className="flex w-[100px] flex-col items-center gap-1">
      <BrandLogo name={name} size={size} />
      <span className="w-full truncate text-center text-[10px] text-[color:var(--typography-color-secondary)]">
        {BRAND_LOGOS[name].label}
      </span>
    </div>
  );
}

export function Sizes() {
  // The primary variant axis: s = 48px (the stated minimum, for compact list
  // items), m = 80px (the default, for cards and partner pages).
  return (
    <div className="flex items-end gap-8">
      <div className="flex flex-col items-center gap-2">
        <BrandLogo name="flipkart" size="s" />
        <span className="text-[10px] font-semibold uppercase tracking-[1px] text-[color:var(--typography-color-secondary)]">
          s — 48px
        </span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <BrandLogo name="flipkart" size="m" />
        <span className="text-[10px] font-semibold uppercase tracking-[1px] text-[color:var(--typography-color-secondary)]">
          m — 80px (default)
        </span>
      </div>
    </div>
  );
}

export function PartnerDirectory() {
  // The canonical composition, ported from this repo's own gallery
  // (src/App.tsx): every approved partner logo, grouped by the four categories
  // Figma defines, at the default 80px. Also the reference for how the two
  // exported helpers (BRAND_LOGO_CATEGORY_LABELS, brandLogosByCategory) pair up.
  const categories = Object.keys(BRAND_LOGO_CATEGORY_LABELS) as BrandLogoCategory[];
  return (
    <div className="flex w-full flex-col gap-5">
      {categories.map((category) => (
        <div key={category} className="flex flex-col gap-2">
          <p className="text-[10px] font-semibold uppercase tracking-[1px] text-[color:var(--typography-color-secondary)]">
            {BRAND_LOGO_CATEGORY_LABELS[category]}
          </p>
          <div className="flex flex-wrap items-start gap-3">
            {brandLogosByCategory(category).map((name) => (
              <Specimen key={name} name={name} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function CompactListRows() {
  // size="s" is documented as "for compact list items only" — this is that
  // context: a 48px logo leading a partner row with its Figma usage note.
  const rows: BrandLogoName[] = ["blinkit", "zepto", "instamart", "pluckk"];
  return (
    <div className="flex w-full max-w-[420px] flex-col">
      {rows.map((name) => (
        <div
          key={name}
          className="flex items-center gap-3 border-b border-solid border-[var(--color-grey-200)] py-2 last:border-b-0"
        >
          <BrandLogo name={name} size="s" />
          <div className="flex min-w-0 flex-1 flex-col gap-0.5">
            <p className="truncate text-[length:var(--type-body-medium-size)] leading-[var(--type-body-medium-line-height)] font-semibold text-[color:var(--card-text-primary)]">
              {BRAND_LOGOS[name].label}
            </p>
            <p className="truncate text-[length:var(--type-body-small-size)] leading-[var(--type-body-small-line-height)] text-[color:var(--card-text-secondary)]">
              {BRAND_LOGOS[name].usage}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function PartnerTiles() {
  // The 80px default on a surface — how a logo reads on a partner/brand tile
  // rather than free-floating on the card background.
  const tiles: BrandLogoName[] = ["nykaa", "myntra", "lenskart"];
  return (
    <div className="flex flex-wrap gap-3">
      {tiles.map((name) => (
        <div
          key={name}
          className="flex w-[140px] flex-col items-center gap-2 rounded-[var(--surface-radius-m)] border border-solid border-[var(--color-grey-200)] bg-[var(--color-grey-white)] p-4"
        >
          <BrandLogo name={name} />
          <p className="w-full truncate text-center text-[length:var(--type-body-medium-size)] leading-[var(--type-body-medium-line-height)] font-semibold text-[color:var(--card-text-primary)]">
            {BRAND_LOGOS[name].label}
          </p>
        </div>
      ))}
    </div>
  );
}
