import StatTile from "./StatTile";

export type AffiliateLinkCardType =
  | "default"
  | "collection"
  | "curated-collection"
  | "auto-dm"
  | "amazon";

export interface AffiliateLinkCardProps {
  type?: AffiliateLinkCardType;
  brand?: string;
  product?: string;
  price?: string;
  productImage?: string;
  commission?: string;
  clicks?: string;
  orders?: string;
  conversion?: string;
  sales?: string;
  aov?: string;
  onCopy?: () => void;
  onDelete?: () => void;
  className?: string;
}

/**
 * AffiliateLinkCard — LehLah Design System
 * Figma: component set `affiliate-link-card` (node 794:2052). 5 variants:
 * `default` (full stats grid), `collection` / `curated-collection` (adds a
 * "Product Analytics" accordion instead of showing stats inline — pass your
 * own expand/collapse UI as children if you need that), `auto-dm` (compact
 * row with drag handle + delete, no stats) and `amazon` (stats replaced by a
 * "no post-level analytics" notice, since Amazon doesn't expose that data).
 * @category Cards
 */
export default function AffiliateLinkCard({
  type = "default",
  brand = "Brand Name",
  product = "Product Name",
  price = "₹ XXX",
  productImage,
  commission = "1340",
  clicks = "2242",
  orders = "261",
  conversion = "34%",
  sales = "1.3 lac",
  aov = "1124",
  onCopy,
  onDelete,
  className = "",
}: AffiliateLinkCardProps) {
  const showStats = type === "default";
  const showCommissionPill = type === "default" || type === "collection" || type === "curated-collection";

  if (type === "auto-dm") {
    return (
      <div
        className={[
          "flex w-[358px] items-center gap-1 rounded-[var(--card-corner-radius-card)] border border-solid border-[var(--card-border)] bg-[var(--card-background)] py-[var(--card-padding)] pl-1 pr-[var(--card-padding)]",
          className,
        ].join(" ")}
      >
        <svg viewBox="0 0 20 20" fill="currentColor" className="size-5 shrink-0 text-[color:var(--card-text-secondary)]" aria-hidden>
          <circle cx="7" cy="4" r="1.2" />
          <circle cx="13" cy="4" r="1.2" />
          <circle cx="7" cy="10" r="1.2" />
          <circle cx="13" cy="10" r="1.2" />
          <circle cx="7" cy="16" r="1.2" />
          <circle cx="13" cy="16" r="1.2" />
        </svg>
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <div className="size-16 shrink-0 overflow-hidden rounded-[var(--card-corner-radius-image)] bg-[var(--card-tile-background)]">
            {productImage && <img src={productImage} alt="" className="size-full object-cover" />}
          </div>
          <div className="flex min-w-0 flex-1 flex-col gap-0.5">
            {/* body/small/500 */}
            <p className="truncate text-[length:var(--type-body-small-size)] leading-[var(--type-body-small-line-height)] font-medium text-[color:var(--card-text-secondary)]">
              {brand}
            </p>
            {/* body/medium/600 */}
            <p className="truncate text-[length:var(--type-body-medium-size)] leading-[var(--type-body-medium-line-height)] font-semibold text-[color:var(--card-text-primary)]">
              {product}
            </p>
            <p className="text-[length:var(--type-title-medium-size)] font-bold text-[color:var(--card-text-primary)]">{price}</p>
          </div>
        </div>
        <button type="button" onClick={onDelete} aria-label="Remove" className="flex size-6 items-center justify-center rounded text-[color:var(--card-text-secondary)]">
          <svg viewBox="0 0 20 20" fill="none" className="size-5" aria-hidden>
            <path d="M4 6h12M8 6V4.5A1.5 1.5 0 019.5 3h1A1.5 1.5 0 0112 4.5V6m2 0v9a1.5 1.5 0 01-1.5 1.5h-5A1.5 1.5 0 016 15V6" stroke="currentColor" strokeWidth={1.3} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    );
  }

  return (
    <div
      className={[
        "flex w-[358px] items-center overflow-hidden rounded-[var(--card-corner-radius-card)] border border-solid border-[var(--card-border)] bg-[var(--card-background)] p-[var(--card-padding)]",
        className,
      ].join(" ")}
    >
      <div className="flex w-full flex-1 flex-col items-start gap-2">
        <div className="flex w-full min-h-[84px] items-start gap-2">
          <div className="aspect-square size-[84px] shrink-0 overflow-hidden rounded-[var(--card-corner-radius-image)] bg-[var(--card-tile-background)]">
            {productImage && <img src={productImage} alt="" className="size-full object-cover" />}
          </div>
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <div className="flex w-full flex-col gap-0.5">
              {/* body/small/500 */}
              <p className="truncate text-[length:var(--type-body-small-size)] leading-[var(--type-body-small-line-height)] font-medium text-[color:var(--card-text-secondary)]">
                {brand}
              </p>
              {/* body/medium/600 */}
              <p className="truncate text-[length:var(--type-body-medium-size)] leading-[var(--type-body-medium-line-height)] font-semibold text-[color:var(--card-text-primary)]">
                {product}
              </p>
              <p className="text-[length:var(--type-title-medium-size)] font-bold text-[color:var(--card-text-primary)]">{price}</p>
            </div>
            {showCommissionPill && (
              <span className="inline-flex w-fit items-center gap-1 rounded-[var(--notification-corner-radius)] border border-solid border-[var(--notification-border-brand)] bg-[var(--notification-background-tonal-brand)] px-2 py-1 text-[length:var(--type-body-medium-size)] leading-[var(--type-body-medium-line-height)] font-semibold text-[color:var(--notification-content-brand)]">
                Estimated commissions: ₹{commission}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={onCopy}
            aria-label="Copy link"
            className="flex size-6 shrink-0 items-center justify-center rounded-[6px] border border-solid border-[var(--card-border)] text-[color:var(--card-text-secondary)]"
          >
            <svg viewBox="0 0 16 16" fill="none" className="size-4" aria-hidden>
              <rect x="4" y="3" width="8" height="10" rx="1" stroke="currentColor" strokeWidth={1.2} />
              <path d="M6 3V2.5A1 1 0 017 1.5h2a1 1 0 011 1V3" stroke="currentColor" strokeWidth={1.2} />
            </svg>
          </button>
        </div>

        {showStats && (
          <div className="flex w-full flex-col gap-1 text-center">
            <div className="flex w-full gap-1">
              <StatTile label="Clicks" value={clicks} />
              <StatTile label="Orders" value={orders} />
              <StatTile label="Conversion" value={conversion} />
            </div>
            <div className="flex w-full gap-1">
              <StatTile label="Sales" value={sales} prefix="₹" />
              <StatTile label="Commission" value={commission} prefix="₹" />
              <StatTile label="Avg. order" value={aov} prefix="₹" />
            </div>
          </div>
        )}

        {type === "amazon" && (
          <div className="flex w-full items-center gap-1.5 rounded-[var(--card-corner-radius-image)] bg-[var(--system-info-light)] p-3">
            <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-white text-[10px] font-bold">a</div>
            <div className="flex min-w-0 flex-1 flex-col gap-1">
              <p className="text-[length:var(--type-body-medium-size)] leading-[var(--type-body-medium-line-height)] text-[color:var(--card-text-primary)]">Amazon doesn’t provide post-level analytics</p>
              <a href="#" className="text-[length:var(--type-body-medium-size)] leading-[var(--type-body-medium-line-height)] font-semibold text-[color:var(--color-blue-500)] underline">
                View Total Earnings
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
