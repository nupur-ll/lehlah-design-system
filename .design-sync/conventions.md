## Styling idiom — real `var(--token)` arbitrary values, NOT the Tailwind theme shorthands

This design system is Tailwind + React, but its actual styling idiom is **not** ordinary Tailwind theme
classes. Every real component in this repo (342 occurrences checked) styles itself with Tailwind's
**arbitrary-value bracket syntax bound directly to CSS custom properties** — `bg-[var(--token-name)]`,
`text-[color:var(--token-name)]`, `rounded-[var(--token-name)]`, `text-[length:var(--token-name)]`,
`gap-[var(--token-name)]`, `px-[var(--surface-spacing-s)]`, `border-[var(--border-width-thin)]`. There
ARE a few named Tailwind theme colors/radii declared in `tailwind.config.ts` (e.g. `gray`, `brand`,
`typography`, `rounded-card`) — **do not use them**: the shipped components never do, and mixing the two
styles produces visibly inconsistent output. Style new compositions the same way real components do: pick
the token by name, drop it straight into a bracket arbitrary value.

Real token families to build with (full catalog: `guidelines/docs/TOKENS.md`, full list: `styles.css`
custom properties on `:root`):
- **Buttons**: the suffix set differs per variant — `filled`/`subtle`/`destructive` have
  `-{background,content,overlay}`, `outlined` has `-{background,content,border,overlay}`,
  `success`/`disabled` have `-{background,content}`, and `ghost` has **only** `--button-color-ghost-content`.
  Prefixed `--button-color-<variant>-<suffix>`; there is no `-border` on any variant but `outlined`.
  Plus `--button-radius-{small,large}`, `--button-padding-{horizontal,vertical}-{small,medium,large}`
- **Typography**: `--typography-color-{primary,secondary,grey,grey-dark,white}`;
  `--type-heading-{large,medium,small}-*`, `--type-title-{large,medium}-*` (no `title-small`),
  `--type-body-{large,medium,small,extra-small}-*` — each tier carrying
  `-{size,line-height}` and a weight axis `-weight-{regular,medium,semibold,bold}`.
  Also `--type-letter-spacing`, `--font-name`, `--font-letter-spacing-{none,compressed,relaxed}`
- **Surface / layout**: `--surface-color-{page,container-white,container-grey,container-grey-light,container-grey-dark,container-black}`;
  full `none,xs,s,m,l,xl,xxl` scales on `--surface-spacing-*`, `--surface-padding-*` and `--surface-radius-*`
  (plus `--surface-radius-full`); drop shadows as
  `--surface-effect-drop-shadow-{low,medium,high}-{position-x,position-y,blur,spread,color}`
- **Cards**: `--card-{background,border,padding,icon,text-label,text-primary,text-secondary}`, `--card-corner-radius-{card,image,tile}`, `--card-tile-background`
- **Inputs**: `--input-field-color-{border-default,border-error,border-focused,error-message,surface,input-text,input-label,icon}`, `--input-field-corner-radius`
- **Selection controls / notifications / borders / icons**: `--selection-control-*`, `--notification-*`,
  `--border-color-{grey,grey-light,grey-dark,black}`, `--border-width-{thin,default,thick}`,
  `--icon-color-{grey,dark,light}`, `--icon-size-{xs,s,m,l,xl,xxl}`

## No provider or root wrapper needed

Nothing in this library reads from React context — there's no `ThemeProvider`/`DesignSystemProvider` to
wrap anything in. Every component is a plain, self-contained function that reads tokens straight from CSS
custom properties already defined on `:root` in the bound `styles.css`. Just import and render.

## Selection controls are real inputs — drive them with `checked` + `onChange`

`Checkbox`, `RadioButton`, and `ToggleSwitch` each render a genuine `<input>` (visually hidden) inside a
wrapping `<label>`, with the visuals drawn in CSS off the `--selection-control-*` tokens. Two consequences
worth getting right:

- **They are controlled the React way**: pass `checked` and an `onChange` that reads
  `event.target.checked` (or use `defaultChecked` uncontrolled). There is no `value`-as-label prop and no
  `onToggle`. `disabled` dims the control to 50% opacity and blocks interaction.
- **They render no children.** The label text is a *sibling* element, not a child of the control — put the
  control and its text in a flex row. Passing children does nothing. Group mutually-exclusive
  `RadioButton`s by giving each the same `name`.
- `className` lands on the wrapping `<label>`, not on the hidden input, so layout classes work as expected.

```tsx
<label className="flex items-center gap-[var(--surface-spacing-s)]">
  <Checkbox size="large" checked={notify} onChange={(e) => setNotify(e.target.checked)} />
  <span className="text-[length:var(--type-body-medium-size)] text-[color:var(--typography-color-primary)]">
    Notify me on new orders
  </span>
</label>
```

## `BrandLogo` takes a fixed slug — never invent a brand name

`BrandLogo`'s `name` prop is a closed set of 24 approved partner slugs, and an unknown slug **throws**
(the component looks the entry up in `BRAND_LOGOS` and reads `.src` off it). Don't guess: the valid slugs
are `flipkart, myntra, amazon, meesho, ajio, shopsy, snitch, nykaa, nykaa-fashion, tira, plum, foxtale,
karmic-beauty, soulflower, pilgrim, wishcare, arata, moxie, blinkit, zepto, instamart, pluckk, lenskart,
underneat` — or read them at runtime from the exported `BRAND_LOGO_NAMES` / `brandLogosByCategory(cat)`
helpers, with display names in `BRAND_LOGOS[name].label` and section headings in
`BRAND_LOGO_CATEGORY_LABELS`. Sizes are `size="s"` (48px, compact list rows only) and `size="m"`
(80px, the default for cards and partner pages); 48px is a hard floor. The logos are image assets, so
never recolor, filter or distort them — the component already pins aspect ratio and a square footprint.

```tsx
{brandLogosByCategory("quick-commerce").map((name) => (
  <BrandLogo key={name} name={name} size="s" />
))}
```

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
