# Components

Every component below has a matching Figma node this library was built from. All are exported from
[`src/components`](../src/components/index.ts) as named exports, and are plain React + Tailwind — no extra
runtime dependency beyond React itself.

| Component | Figma source | Notes |
|---|---|---|
| `Button` | `button` component set (node `302:641`) | 3 sizes × 7 variants (`filled`, `outlined`, `subtle`, `ghost`, `destructive`, `success`, `disabled`). Hover/active are real CSS states rather than a `state` prop. |
| `RadioButton` | `Radio Buttons` (node `223:1386`) | Wraps a native `<input type="radio">`; controlled via `checked`/`onChange`. |
| `Checkbox` | `CheckBox` (node `223:1391`) | Wraps a native `<input type="checkbox">`; controlled via `checked`/`onChange`. |
| `ToggleSwitch` | `Toggle Switch` (node `223:1408`) | Wraps `<input type="checkbox" role="switch">`; controlled via `checked`/`onChange`. |
| `Pill` | `pill` (node `786:389`) | 11 colors × 2 weights (`tonal` / `fill`). Used standalone or inside cards (e.g. "Estimated commissions" chip). |
| `Notification` | `notification` (node `793:37`) | Inline alert banner: icon + headline + subtext, 4 types. |
| `Toast` | `Toast` (node `824:240`) | Dark floating snackbar: icon + single-line text + optional CTA button. |
| `Tab` | `tab` (node `992:2900`) | `pill` and `underlined` families, each default/selected. |
| `Banner` | `banner` (node `752:1504`) | 6 colors × 3 weights, 350×150 promo card with a `creative` slot for artwork. |
| `IconButton` | `action` sub-component (seen nested in `input-field`) | Bare 36×36 icon tap target, used inline in inputs/cards/toolbars. |
| `InputField` | `input-field` (node `724:1449`) | All 6 types: `text-input`, `action-input`, `dropdown-input`, `prefix-input`, `otp-input`, `search-input`. States are gated per type to match the file exactly — only `text-input` has a `disabled` variant, `search-input` has no `error`/`disabled` variant, and every other type has `default`/`focused`/`filled`/`error`. The plain `default` state renders label-only (no visible value line) for every type except `search-input`, matching the file's own conditional rendering. |
| `AffiliateLinkCard` | `affiliate-link-card` (node `794:2052`) | 5 variants: `default`, `collection`, `curated-collection`, `auto-dm`, `amazon`. |
| `CollectionCard` | `collection-card` (node `794:2053`) | 2×2 image grid + metadata + stats grid. |
| `BottomSheet` | `bottom-sheet` + nested filter list (nodes `938:124`, `935:8109`, `930:1298`, `930:1354`) | Mobile filter sheet: drag handle, header, search, two-pane filter/option list, sticky action row. |

## Not included

- **Navbar** — a `navbar` component set exists in the Figma file's published library, but no page link was
  available to pull its exact spec, so it isn't built here. Grab its Figma URL (Figma → right-click the frame →
  Copy link) and it can be added the same way as everything else.
- **Feature icons** (`feature=opportunities`, `whitelisting`, `collections`, `auto-dm`, `rewards`, `collab`,
  `gifting`, `link-generator`) — this is an 8-icon symbol set (node `794:310`), not a component with variants.
  Export those 8 SVGs from Figma directly (Export → SVG) rather than re-drawing them here.

## Usage

```tsx
import { Button, Pill, InputField } from "@lehlah/design-system";

function Example() {
  return (
    <div className="flex flex-col gap-4">
      <Button variant="filled" size="large">
        Get started
      </Button>
      <Pill type="success" weight="tonal">
        Confirmed
      </Pill>
      <InputField label="Email" mandatory placeholder="you@brand.com" />
    </div>
  );
}
```

Every component reads its colors/spacing/radii from the CSS custom properties in
[`src/styles/tokens.css`](../src/styles/tokens.css) (see [TOKENS.md](./TOKENS.md)) — so re-theming the whole
library is a matter of editing that one file, never the component source.

## Design rules encoded in these components

Carried over from the Figma file's own "Always / Never" rules, where they affect implementation:

- **Semantic tokens only** — no component below reaches for a raw hex/primitive; every color is a `--button-*`,
  `--card-*`, `--notification-*`, etc. custom property.
- **Destructive actions never use the Primary/filled style** — use `variant="destructive"` on `Button`.
- **Icons must all be one style** — the inline SVG placeholders here are *not* final; swap them for a single
  consistent icon set (Phosphor Icons, per the Figma file) before shipping.
- **Spacing is a multiple of 4** — every padding/gap value in these components traces back to a 4px-multiple
  token.
