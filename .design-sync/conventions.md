## Styling idiom — real `var(--token)` arbitrary values, NOT the Tailwind theme shorthands

This design system is Tailwind + React, but its actual styling idiom is **not** ordinary Tailwind theme
classes. Every real component in this repo (192 occurrences checked) styles itself with Tailwind's
**arbitrary-value bracket syntax bound directly to CSS custom properties** — `bg-[var(--token-name)]`,
`text-[color:var(--token-name)]`, `rounded-[var(--token-name)]`, `text-[length:var(--token-name)]`,
`gap-[var(--token-name)]`, `px-[var(--surface-spacing-s)]`, `border-[var(--border-width-thin)]`. There
ARE a few named Tailwind theme colors/radii declared in `tailwind.config.ts` (e.g. `gray`, `brand`,
`typography`, `rounded-card`) — **do not use them**: the shipped components never do, and mixing the two
styles produces visibly inconsistent output. Style new compositions the same way real components do: pick
the token by name, drop it straight into a bracket arbitrary value.

Real token families to build with (full catalog: `guidelines/docs/TOKENS.md`, full list: `styles.css`
custom properties on `:root`):
- **Buttons**: `--button-color-{filled,outlined,subtle,ghost,destructive,success,disabled}-{background,content,border,overlay}`, `--button-radius-{small,large}`, `--button-padding-{horizontal,vertical}-{small,medium,large}`
- **Typography**: `--typography-color-{primary,secondary,grey,grey-dark,white}`, `--type-{heading,title,body}-{large,medium,small}-{size,line-height}`
- **Surface / layout**: `--surface-color-{page,container-white}`, `--surface-spacing-{xs,s}`, `--surface-padding-{s,m}`, `--surface-radius-s`
- **Cards**: `--card-{background,border,padding,icon,text-label,text-primary,text-secondary}`, `--card-corner-radius-{card,image,tile}`, `--card-tile-background`
- **Inputs**: `--input-field-color-{border-default,border-error,border-focused,error-message,surface,input-text,input-label,icon}`, `--input-field-corner-radius`
- **Selection controls / notifications / borders / icons**: `--selection-control-*`, `--notification-*`, `--border-{color-grey,width-thin,width-thick}`, `--icon-color-{grey,dark,light}`

## No provider or root wrapper needed

Nothing in this library reads from React context — there's no `ThemeProvider`/`DesignSystemProvider` to
wrap anything in. Every component is a plain, self-contained function that reads tokens straight from CSS
custom properties already defined on `:root` in the bound `styles.css`. Just import and render.

## Where the truth lives

- `styles.css` (bound copy at the design-system root) — every real token, already resolved to values.
  Read this before inventing a token name; if it's not a custom property here, it doesn't exist.
- `guidelines/docs/TOKENS.md` — the full token catalog with Figma provenance and descriptions.
- `guidelines/docs/COMPONENTS.md` — the component-by-component reference table (Figma source, "not
  included" list, and the repo's own "Always / Never" composition rules).
- Each component's own `.prompt.md` — usage notes and the JSDoc pulled straight from its real props.

## Font

`font-family: Poppins, ui-sans-serif, system-ui, sans-serif` is the only type family — every text element
in every component uses it (via `--font-name` or the Tailwind `font-sans` mapping). Don't introduce another
family.

## One idiomatic build snippet

A real composition, in this system's actual idiom (no theme shorthands, tokens straight from `var()`):

```tsx
import { Button, InputField, Pill } from "@lehlah/design-system";

function CreatorPayoutCard() {
  return (
    <div className="flex flex-col gap-[var(--surface-spacing-s)] rounded-[var(--card-corner-radius-card)] border border-solid border-[var(--card-border)] bg-[var(--card-background)] p-[var(--card-padding)]">
      <div className="flex items-center justify-between">
        <span className="text-[length:var(--type-title-medium-size)] font-semibold text-[color:var(--typography-color-primary)]">
          This month's payout
        </span>
        <Pill type="success" weight="tonal">Paid</Pill>
      </div>
      <InputField type="text-input" label="Bank account" state="filled" value="•••• 4821" disabled />
      <Button variant="filled" size="medium">View statement</Button>
    </div>
  );
}
```
