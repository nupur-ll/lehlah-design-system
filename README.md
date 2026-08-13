# LehLah Design System

React + Tailwind component library generated from the **LehLah Design System** Figma file, with the full design
token set (primitives, semantics, and component tokens) documented and wired up as CSS custom properties.

- **Live component gallery**: `npm run dev` and open the app — every component in the library is rendered with
  its variants at `src/App.tsx`.
- **Tokens**: [`docs/TOKENS.md`](./docs/TOKENS.md) — full reference table for every color, spacing, radius, and
  type-scale value, organized the same way Figma organizes them (Primitives / Semantics / Components).
- **Components**: [`docs/COMPONENTS.md`](./docs/COMPONENTS.md) — one row per component, its Figma source node,
  and what's intentionally out of scope.

## Getting started

```bash
npm install
npm run dev      # component gallery at localhost:5173
npm run build    # type-check + production build
```

## Using the components in another project

Copy `src/components` and `src/styles/tokens.css` into your project (or depend on this repo directly / publish it
to your own npm registry — nothing here is LehLah-specific plumbing beyond the tokens), then:

```tsx
import { Button, InputField, Pill } from "@lehlah/design-system";
import "@lehlah/design-system/src/styles/tokens.css";
```

Tailwind must be configured to scan wherever you copy the component files to (see `tailwind.config.ts`'s
`content` array), since the components use Tailwind's arbitrary-value syntax (`bg-[var(--button-color-filled-background)]`)
rather than pre-defined utility classes.

## Project structure

```
src/
  components/         one folder per component, each with Component.tsx + index.ts
  styles/
    tokens.css        design tokens as CSS custom properties — the source of truth
    index.css         Tailwind entrypoint, imports tokens.css
  App.tsx             component gallery / visual regression reference
docs/
  TOKENS.md           full token reference table
  COMPONENTS.md       component-by-component reference + Figma source nodes
```

## Where this came from

Built by walking the LehLah Design System Figma file (`rqHOBBeDnuO6euPeqSJBqV`) node by node — pulling design
context (reference code + screenshot) for each component's documentation page, extracting its exact token names
and fallback values, and hand-adapting the result into clean, typed React components rather than shipping the
raw generated markup. See [`docs/TOKENS.md`](./docs/TOKENS.md#gaps--things-to-double-check) and
[`docs/COMPONENTS.md#not-included`](./docs/COMPONENTS.md#not-included) for an honest list of what wasn't
captured (Navbar, OTP input, feature icon assets) and why.

## License

MIT — see [LICENSE](./LICENSE). Adjust if LehLah wants this kept private.
