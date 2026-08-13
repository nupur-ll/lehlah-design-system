import { AffiliateLinkCard } from "@lehlah/design-system";

const SAMPLE = {
  // `price` is a plain string the component renders as-is, but sales/commission/aov
  // get a "₹" prepended internally (see StatTile prefix="₹" in AffiliateLinkCard.tsx)
  // — including it here too would double it up.
  brand: "Nykaa",
  product: "Matte Lip Crayon — Coral Sunset",
  price: "₹ 499",
  commission: "1,340",
  clicks: "2,242",
  orders: "261",
  conversion: "34%",
  sales: "1.3 lac",
  aov: "1,124",
};

export function Default() {
  return <AffiliateLinkCard type="default" {...SAMPLE} />;
}

export function Collection() {
  return <AffiliateLinkCard type="collection" {...SAMPLE} />;
}

export function CuratedCollection() {
  return <AffiliateLinkCard type="curated-collection" {...SAMPLE} />;
}

export function AutoDm() {
  return <AffiliateLinkCard type="auto-dm" brand={SAMPLE.brand} product={SAMPLE.product} price={SAMPLE.price} />;
}

export function Amazon() {
  return <AffiliateLinkCard type="amazon" brand="Amazon" product={SAMPLE.product} price="₹ 899" />;
}
