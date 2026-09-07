/**
 * Partner brand logo registry — LehLah Design System
 *
 * Figma: "lehlah-brand-assets" frame (node 1128:2688), `brand/logo/` namespace.
 *
 * These are the code equivalent of Figma's brand/logo/* PAINT STYLES. They are
 * image fills, not color variables — there are no hex values to put in
 * tokens.css, so the artwork is committed here instead and keyed by the same
 * slug Figma uses (`brand/logo/flipkart` -> `flipkart`).
 *
 * Each PNG is the 80x80 logo swatch exported from its Figma node at 2x
 * (160x160), so it stays crisp at the documented display sizes on retina.
 *
 * To add a partner: export its swatch from Figma, drop the PNG in
 * ../../assets/brand-logos/ named after the Figma slug, and add one row below.
 */

import ajio from "../../assets/brand-logos/ajio.png";
import amazon from "../../assets/brand-logos/amazon.png";
import arata from "../../assets/brand-logos/arata.png";
import blinkit from "../../assets/brand-logos/blinkit.png";
import flipkart from "../../assets/brand-logos/flipkart.png";
import foxtale from "../../assets/brand-logos/foxtale.png";
import instamart from "../../assets/brand-logos/instamart.png";
import karmicBeauty from "../../assets/brand-logos/karmic-beauty.png";
import lenskart from "../../assets/brand-logos/lenskart.png";
import meesho from "../../assets/brand-logos/meesho.png";
import moxie from "../../assets/brand-logos/moxie.png";
import myntra from "../../assets/brand-logos/myntra.png";
import nykaa from "../../assets/brand-logos/nykaa.png";
import nykaaFashion from "../../assets/brand-logos/nykaa-fashion.png";
import pilgrim from "../../assets/brand-logos/pilgrim.png";
import pluckk from "../../assets/brand-logos/pluckk.png";
import plum from "../../assets/brand-logos/plum.png";
import shopsy from "../../assets/brand-logos/shopsy.png";
import snitch from "../../assets/brand-logos/snitch.png";
import soulflower from "../../assets/brand-logos/soulflower.png";
import tira from "../../assets/brand-logos/tira.png";
import underneat from "../../assets/brand-logos/underneat.png";
import wishcare from "../../assets/brand-logos/wishcare.png";
import zepto from "../../assets/brand-logos/zepto.png";

/** The four categories Figma groups the partner logos into. */
export type BrandLogoCategory =
  | "e-commerce"
  | "beauty"
  | "quick-commerce"
  | "other";

export const BRAND_LOGO_CATEGORY_LABELS: Record<BrandLogoCategory, string> = {
  "e-commerce": "E-Commerce",
  beauty: "Beauty & Personal Care",
  "quick-commerce": "Quick Commerce & Grocery",
  other: "Other Partners",
};

export interface BrandLogoEntry {
  /** Display name, as written in Figma's quick-reference table. */
  label: string;
  category: BrandLogoCategory;
  /** Bundled asset URL (hashed by Vite at build time). */
  src: string;
  /** Recommended usage context, from Figma's quick-reference table. */
  usage: string;
}

/**
 * Every partner logo, keyed by its Figma `brand/logo/` slug.
 *
 * NB: Figma's frame header and footer both say "25 paint styles", but the file
 * actually defines 24 — 24 variables, 24 specimens and 24 quick-reference rows.
 * The count in the doc is off by one; this registry mirrors what exists.
 */
export const BRAND_LOGOS = {
  // --- E-Commerce: marketplace and e-commerce platform partners ---
  flipkart: { label: "Flipkart", category: "e-commerce", src: flipkart, usage: "Product listings, marketplace pages" },
  myntra: { label: "Myntra", category: "e-commerce", src: myntra, usage: "Fashion product cards, brand pages" },
  amazon: { label: "Amazon", category: "e-commerce", src: amazon, usage: "Partner listings, price comparison" },
  meesho: { label: "Meesho", category: "e-commerce", src: meesho, usage: "Social commerce, reseller listings" },
  ajio: { label: "Ajio", category: "e-commerce", src: ajio, usage: "Fashion marketplace integration" },
  shopsy: { label: "Shopsy", category: "e-commerce", src: shopsy, usage: "Value commerce, partner showcase" },
  snitch: { label: "Snitch", category: "e-commerce", src: snitch, usage: "Menswear product cards" },

  // --- Beauty & Personal Care ---
  nykaa: { label: "Nykaa", category: "beauty", src: nykaa, usage: "Product pages, review sections" },
  "nykaa-fashion": { label: "Nykaa Fashion", category: "beauty", src: nykaaFashion, usage: "Fashion vertical, brand pages" },
  tira: { label: "Tira", category: "beauty", src: tira, usage: "Premium beauty showcase" },
  plum: { label: "Plum", category: "beauty", src: plum, usage: "Skincare product cards" },
  foxtale: { label: "Foxtale", category: "beauty", src: foxtale, usage: "Skincare brand listings" },
  "karmic-beauty": { label: "Karmic Beauty", category: "beauty", src: karmicBeauty, usage: "Wellness product showcase" },
  soulflower: { label: "Soulflower", category: "beauty", src: soulflower, usage: "Clean beauty product cards" },
  pilgrim: { label: "Pilgrim", category: "beauty", src: pilgrim, usage: "Skincare product pages" },
  wishcare: { label: "Wishcare", category: "beauty", src: wishcare, usage: "Haircare product listings" },
  arata: { label: "Arata", category: "beauty", src: arata, usage: "Natural care brand showcase" },
  moxie: { label: "Moxie", category: "beauty", src: moxie, usage: "Beauty brand partner pages" },

  // --- Quick Commerce & Grocery ---
  blinkit: { label: "Blinkit", category: "quick-commerce", src: blinkit, usage: "Delivery screens, partner listings" },
  zepto: { label: "Zepto", category: "quick-commerce", src: zepto, usage: "Order tracking, delivery UI" },
  instamart: { label: "Instamart", category: "quick-commerce", src: instamart, usage: "Grocery integration screens" },
  pluckk: { label: "Pluckk", category: "quick-commerce", src: pluckk, usage: "Fresh produce partner UI" },

  // --- Other Partners ---
  lenskart: { label: "Lenskart", category: "other", src: lenskart, usage: "Brand partner showcases" },
  underneat: { label: "Underneat", category: "other", src: underneat, usage: "Innerwear brand listings" },
} as const satisfies Record<string, BrandLogoEntry>;

/** Every valid `brand/logo/` slug. */
export type BrandLogoName = keyof typeof BRAND_LOGOS;

export const BRAND_LOGO_NAMES = Object.keys(BRAND_LOGOS) as BrandLogoName[];

/** The slugs in one category, in the order Figma lists them. */
export function brandLogosByCategory(category: BrandLogoCategory): BrandLogoName[] {
  return BRAND_LOGO_NAMES.filter((name) => BRAND_LOGOS[name].category === category);
}
