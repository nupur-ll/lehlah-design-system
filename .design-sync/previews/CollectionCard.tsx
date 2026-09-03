import { CollectionCard } from "@lehlah/design-system";

// `sales`, `commission`, and `aov` get a "₹" prepended INTERNALLY by CollectionCard
// (it passes prefix="₹" to its inner StatTile for exactly those three fields — see
// src/components/Card/CollectionCard.tsx). Keep these plain, unprefixed numbers/units
// or the rendered card doubles up the currency symbol ("₹₹1.3 lac").
const STATS = {
  clicks: "3,108",
  orders: "342",
  cvr: "28%",
  sales: "1.6 lac",
  commission: "1,780",
  aov: "1,462",
};

export function Curated() {
  return (
    <CollectionCard
      curatedCollection
      collectionName="Monsoon Skincare Picks"
      productQuantity="8 products"
      date="18 Jun 2026"
      {...STATS}
    />
  );
}

export function Regular() {
  return (
    <CollectionCard
      curatedCollection={false}
      collectionName="Nykaa Best Sellers"
      productQuantity="12 products"
      date="2 Jul 2026"
      {...STATS}
    />
  );
}
