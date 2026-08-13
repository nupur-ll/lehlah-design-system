import StatTile from "./StatTile";

export interface CollectionCardProps {
  collectionName?: string;
  productQuantity?: string;
  date?: string;
  curatedCollection?: boolean;
  images?: string[];
  clicks?: string;
  orders?: string;
  cvr?: string;
  sales?: string;
  commission?: string;
  aov?: string;
  onCopy?: () => void;
  className?: string;
}

/**
 * CollectionCard — LehLah Design System
 * Figma: component `collection-card` (node 794:2053). A 2x2 image grid +
 * collection metadata + the same 2-row stats grid used by AffiliateLinkCard.
 */
export default function CollectionCard({
  collectionName = "Collection Name",
  productQuantity = "8 products",
  date = "18 Jun 2026",
  curatedCollection = true,
  images = [],
  clicks = "2242",
  orders = "261",
  cvr = "34%",
  sales = "1.3 lac",
  commission = "1340",
  aov = "1124",
  onCopy,
  className = "",
}: CollectionCardProps) {
  return (
    <div
      className={[
        "flex w-[358px] items-center overflow-hidden rounded-[var(--card-corner-radius-card)] border border-solid border-[var(--card-border)] bg-[var(--card-background)] p-[var(--card-padding)]",
        className,
      ].join(" ")}
    >
      <div className="flex w-full flex-1 flex-col gap-2">
        <div className="flex w-full items-start gap-2">
          <div className="grid size-[84px] shrink-0 grid-cols-2 grid-rows-2 gap-1">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="overflow-hidden rounded-[var(--card-corner-radius-tile)] bg-[var(--card-tile-background)]">
                {images[i] && <img src={images[i]} alt="" className="size-full object-cover" />}
              </div>
            ))}
          </div>
          <div className="flex w-[210px] shrink-0 flex-col gap-1 self-stretch">
            <div className="flex w-full items-center gap-1 text-[11px] text-[color:var(--card-text-secondary)]">
              <span>Created on</span>
              <span>{date}</span>
            </div>
            <div className="flex w-full flex-col gap-0.5">
              <p className="truncate text-[12px] font-semibold text-[color:var(--card-text-primary)]">{collectionName}</p>
              <p className="text-[length:var(--type-body-medium-size)] text-[color:var(--card-text-secondary)]">{productQuantity}</p>
            </div>
            {curatedCollection && (
              <span className="inline-flex w-fit items-center gap-1 rounded-[var(--notification-corner-radius)] border border-solid border-[var(--notification-border-brand)] bg-[var(--notification-background-tonal-brand)] px-2 py-1 text-[12px] font-semibold text-[color:var(--notification-content-brand)]">
                Added from Curated Collection
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

        <div className="flex w-full flex-col gap-1 text-center">
          <div className="flex w-full gap-1">
            <StatTile label="Clicks" value={clicks} />
            <StatTile label="Orders" value={orders} />
            <StatTile label="Conversion" value={cvr} />
          </div>
          <div className="flex w-full gap-1">
            <StatTile label="Sales" value={sales} prefix="₹" />
            <StatTile label="Commission" value={commission} prefix="₹" />
            <StatTile label="Avg. order" value={aov} prefix="₹" />
          </div>
        </div>
      </div>
    </div>
  );
}
