import { StatTile } from "@lehlah/design-system";

// StatTile is `flex-1` internally (it's designed to sit in a row of 3 inside
// CollectionCard/AffiliateLinkCard's stats grid, ~110-130px wide each). Rendered
// truly standalone with no width constraint it stretches to fill the whole sheet
// cell, which reads as a thin bar rather than a tile — wrap each in a fixed-width
// box (plain Tailwind scale, no arbitrary token values) to match its real footprint.

export function Plain() {
  return (
    <div className="w-40">
      <StatTile label="Conversion" value="34%" />
    </div>
  );
}

export function WithPrefix() {
  return (
    <div className="w-40">
      <StatTile label="Sales" value="1.3 lac" prefix="₹" />
    </div>
  );
}

export function LongLabel() {
  // The real label is truncated with a `truncate` class — a label long enough to
  // overflow a realistic ~160px tile should ellipsize cleanly on one line rather
  // than wrap or spill out of the tile.
  return (
    <div className="w-40">
      <StatTile label="Average Order Value (30 days)" value="1,124" prefix="₹" />
    </div>
  );
}
