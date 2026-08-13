export interface StatTileProps {
  label: string;
  value: string;
  prefix?: string;
}

/** Shared stat tile used by AffiliateLinkCard + CollectionCard's stats grid. */
export default function StatTile({ label, value, prefix }: StatTileProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-0 rounded-[var(--card-corner-radius-tile)] bg-[var(--card-tile-background)] p-1">
      <p className="w-full truncate text-center text-[10px] font-semibold uppercase tracking-[1px] text-[color:var(--card-text-label)]">
        {label}
      </p>
      <p className="flex items-start justify-center gap-0.5 text-[length:var(--type-title-medium-size)] leading-[var(--type-title-medium-line-height)] font-bold text-[color:var(--card-text-primary)]">
        {prefix}
        {value}
      </p>
    </div>
  );
}
