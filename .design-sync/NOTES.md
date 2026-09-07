# design-sync notes for @lehlah/design-system

## Repo shape
- No Storybook, no `*.stories.*` files — confirmed with the user this repo has none anywhere. Package shape.
- `package.json` has no real library build: `main` points straight at `src/components/index.ts` (TS source,
  never compiled), no `types`/`typings` field, no `dist/`. The `build` script (`tsc -b && vite build`) builds
  the demo app in `index.html`/`src/App.tsx`, not a library entry — `tsc -b` also can't emit anything since
  `tsconfig.json` sets `"noEmit": true`.
- `cfg.buildCmd` compensates with two one-off commands (do NOT rely on `npm run build` for this repo):
  1. A standalone `tsc --declaration --emitDeclarationOnly` pass over `src/components/index.ts`, rooted at
     <!-- 2026-09-07: this pass now also needs `--types vite/client,react,react-dom` — see
          "BrandLogo needs vite/client types in the tsc pass" below. -->

     `src/components` so `dist/index.d.ts` lands at the top level of `dist/` (required for the converter's
     `findTypesRoot` fallback heuristic to find `dist` as the types root — see `lib/dts.mjs` `hasDts`, which
     only checks the immediate directory, not recursively). This is what makes real prop extraction work at
     all instead of falling back to hand-written `dtsPropsFor` for all 15 components.
  2. A Tailwind CLI pass (`npx tailwindcss -i src/styles/index.css -o dist/styles.css`) to get REAL compiled
     CSS. This DS writes components with Tailwind arbitrary-value classes bound to CSS vars (e.g.
     `bg-[var(--button-color-filled-background)]`) — `src/styles/tokens.css` alone only has the raw
     `--variable: value` declarations, not the utility classes that reference them. `tailwind.config.ts`'s
     `content` glob (`./src/**/*.{ts,tsx}`) already covers every component file, so this one pass produces a
     complete stylesheet regardless of what the demo `App.tsx` gallery happens to render.
- `dist/` is already gitignored by the repo's own `.gitignore` — no changes needed there.
- **`cfg.entry` is required — a bare build crashes.** `resolveDistEntry` falls back to looking for
  `node_modules/@lehlah/design-system/package.json`, which never exists (npm won't self-install), so
  `package-build.mjs` dies with `ENOENT ... node_modules/@lehlah/design-system/package.json` in
  `lib/dts.mjs projectFor()`. Fixed permanently by pinning `"entry": "./src/components/index.ts"` in the
  config (2026-09-03) — from there PKG_DIR walks up to the repo-root `package.json` (which has a `name`)
  and `findTypesRoot` then picks `dist` because `dist/index.d.ts` sits at its top level. No `--entry` flag
  needed on the command line any more.
- Since `package.json` `main` already resolves to an existing file (`src/components/index.ts`), the
  converter's dist-detection (`resolveDistEntry`) uses it directly and never falls into synth-entry mode —
  this is *why* step 1 above (a real `.d.ts` tree) was necessary; synth-entry's `deriveComponentsFromSrc`
  fallback never triggers here.

## Grouping
- Directory-based grouping would have dumped 12 of 15 components into one generic "general" bucket (most
  `src/components/<Name>/` folders are named after the component itself, which the heuristic filters out as
  a non-informative segment). With the user's explicit OK, added a one-line `@category <Group>` tag to each
  component's existing leading JSDoc comment (additive only, no behavior change) — this is the converter's
  documented fallback grouping signal.
- **That tag turned out to be a dead end and is NOT what actually drives grouping today.** The converter's
  src-enrichment (`.ds-sync/lib/common.mjs` `leadingJsdoc`) associates a doc comment with a declaration via a
  regex (`(?:export\s+)?(?:declare\s+)?(?:const|let|function|...)\s+<Name>\b`) that requires the comment's
  `*/` to be followed *immediately* by that keyword sequence. Every component here is
  `export default function Name(...)` — the literal word `default` sits between `export` and `function`, so
  the regex match starts at `function` and the whitespace-only gap check between `*/` and the match fails.
  `leadingJsdoc` returns `''` for all 15 components, so `@category` is never read (verified directly with a
  small Node repro — this isn't a guess). The `.prompt.md` synthesis is UNAFFECTED — that path
  (`.ds-sync/lib/dts.mjs` `jsdocFor`) reads JSDoc off the real ts-morph AST of the generated `.d.ts`, which
  doesn't care about the `export default` text pattern.
- **What actually grouped the components**: `cfg.componentSrcMap` pins each non-Card component to a tiny
  re-export stub under `.design-sync/group-stubs/<group>/<Name>.ts` (e.g.
  `group-stubs/actions/Button.ts` → `export { default, ... } from "../../../src/components/Button"`). The
  converter derives group from `dirname()` of whatever path `componentSrcMap` points at, so the stub's
  *directory name* becomes the group, without touching `src/` at all. The stubs are never imported by
  anything real — Vite/tsc never see them; they exist purely for this heuristic. Groups: Actions (Button,
  IconButton), Selection Controls (RadioButton, Checkbox, ToggleSwitch), Tags (Pill), Feedback (Notification,
  Toast), Navigation (Tab), Marketing (Banner), Forms (InputField), Overlays (BottomSheet); Cards
  (AffiliateLinkCard, CollectionCard, StatTile) needed no stub — `src/components/Card/` already groups
  correctly by real directory name.
- The `@category` tags are left in place anyway (harmless, truthful, and would kick in automatically if the
  converter's regex is ever fixed upstream) — but don't rely on them; the stubs are the load-bearing
  mechanism right now.
- Re-sync risk: a future component added under its own same-named directory needs a NEW stub +
  `componentSrcMap` entry (not just an `@category` tag) to land anywhere but "general".

## Fonts
- `tailwind.config.ts` declares `fontFamily.sans: ["Poppins", ...]` and it's used everywhere via
  `font-family: var(--font-name), ...` in `src/styles/index.css`, but the repo never actually loads Poppins
  anywhere — no `@font-face`, no `<link>`, no Google Fonts `@import`. The whole app has been silently
  rendering in a fallback sans-serif. **This is a real gap in the repo, not just a sync artifact** — worth
  fixing at the source (e.g. a `<link>` in `index.html`) independent of this sync.
- Resolved for the sync per the user's explicit choice: self-hosted the actual Poppins files. Downloaded
  latin + latin-ext subsets, weights 400/500/600/700 (the only weights the components use, via
  `font-normal`/`font-medium`/`font-semibold`/`font-bold`) from Google Fonts (Poppins, Open Font License) into
  `.design-sync/fonts/*.woff2`, with `@font-face` rules in `.design-sync/fonts/poppins.css`, wired via
  `cfg.extraFonts`.

## Preview `.tsx` files need their own Tailwind content glob entry
`tailwind.config.ts`'s `content` glob was originally `["./index.html", "./src/**/*.{ts,tsx}"]` — it did NOT
cover `.design-sync/previews/**`. Since `cfg.cssEntry` (`dist/styles.css`) is produced by actually running the
Tailwind CLI against this repo's own config (see `cfg.buildCmd` above), any utility class used ONLY inside a
preview `.tsx` and not already present somewhere under `src/**` compiled to nothing — silently, no error. This
was caught mid-sync: a `StatTile` preview's `w-32` wrapper had zero visual effect (that string doesn't appear
in `src/`) while `w-40` (used in `src/App.tsx`) worked immediately. **Fixed at the root** by adding
`"./.design-sync/previews/**/*.{ts,tsx}"` to `tailwind.config.ts`'s `content` array — this is a real repo file
change (not `.design-sync/`-scoped), so it survives independently of this sync, and also means anyone authoring
previews outside of a sync won't hit this trap either. After the fix, a full rebuild + re-capture of all 15
components confirmed no other preview was silently affected (Checkbox's `w-[260px]`/`w-[220px]` wrappers were
the only other pre-existing instance, and it turned out to not matter visually — Checkbox already wrapped its
label text before hitting either width).
- Re-sync risk: if `.design-sync/previews/` is ever renamed/moved without updating this glob entry too, this
  silent-no-op failure mode returns.

## Known render warns
- `[RENDER_THIN] components/actions/IconButton/IconButton.html` — "mounts have no text and paint nothing".
  Confirmed benign by looking at the actual screenshot: `IconButton` is a bare 36×36 icon-only tap target by
  design (no text ever, per its own doc comment) — its authored `Toolbar` preview renders 3 icon buttons with
  visible icon glyphs and correct hover/active token colors, just no text content for the heuristic to detect.
  Triage as expected on every re-sync unless the preview's actual rendering changes.

## Native HTML props are filtered out of the emitted `.d.ts` — `dtsPropsFor` restores them
Six components declare their props as `extends Omit<InputHTMLAttributes<...>>` /
`extends ButtonHTMLAttributes<...>`: **Button, IconButton, InputField, Checkbox, RadioButton,
ToggleSwitch**. Everything inherited that way comes from `@types/react`, and `lib/dts.mjs`'s
`keepProp` deliberately drops it — `fp.includes('/@types/react/')` returns false, and a second rule
drops every `on[A-Z]*`/`aria-*` prop inherited from another package. The result (found 2026-09-03, and
it was silently true of the *previous* sync's upload too):
- `Button`/`IconButton` had **no `onClick`, no `disabled`**.
- `Checkbox`/`RadioButton`/`ToggleSwitch` were reduced to **`size` alone** — no `checked`, `onChange`,
  or `disabled`, i.e. no way to build a working control.
- `InputField` had **no `value`, `onChange`, `placeholder`, or `disabled`** despite the component
  destructuring all of them and forwarding `...rest` to a real `<input>`.
- All three selection controls *also* advertised a `children` prop they never render (native attr
  leaking through); same for `InputField`. The hand-written bodies drop it.

This matters more than a cosmetic docs gap: `<Name>.d.ts` IS the API contract the claude.ai/design agent
codes against, so every design built from the old contracts had inert controls. Fixed with
`cfg.dtsPropsFor` for those six components — each body restates the component's own props verbatim
(JSDoc included) **plus** the genuinely-real native subset, verified against the source destructure and
against `.design-sync/previews/*.tsx`, which already used `checked`/`onChange` and rendered correctly.
- Re-sync risk: `dtsPropsFor` bodies are hand-maintained and will NOT track source prop changes. If a
  component's own props change, update its `dtsPropsFor` entry too, or the contract silently goes stale.
  Cross-check with `git diff src/components/<Name>` on any re-sync that touches these six.
- Do NOT "fix" this by deleting the `dtsPropsFor` entries — the filtering is upstream converter
  behavior, not a config mistake, and it will just silently strip the props again.

## Known validate warns (checked every re-sync)
- `tokens: ... (2 missing, below threshold)` — **benign, not a real gap**, but note the PAIR CHANGED
  on 2026-09-07. It is now `--color-green-solid` and `--tw-shadow-color`:
  - `--color-green-solid` — occurs only inside a CSS *comment* in `src/styles/tokens.css` (documents a
    token that was never defined). The validator's reference scan doesn't strip comments.
  - `--tw-shadow-color` — **Tailwind's own internal machinery**, not a DS token. Tailwind v3 emits
    `--tw-shadow-colored: ... var(--tw-shadow-color) ...` rules; `--tw-shadow-color` is only ever set by
    a `shadow-<color>` utility, and the default `--tw-shadow` path never reads it. Nothing to fix.
  - `--button` (previously one of the two) **no longer appears at all** — the 2026-09-07 `tokens.css`
    rewrite removed the prose comment that mentioned it. If a future re-sync reports 2 missing, expect
    THIS pair; a third name is new and worth checking.
  Zero live `var()` references are undefined — re-verified 2026-09-07 by diffing defined-vs-referenced
  custom properties across `_ds_bundle.css` + `fonts/fonts.css`.

## Component-specific preview-authoring gotchas
- **AffiliateLinkCard / CollectionCard** — `sales`, `commission`, and `aov` get a "₹" prefix prepended
  INTERNALLY (the component passes `prefix="₹"` to a shared `StatTile`). Sample values must be plain numbers
  ("1.3 lac", "1,340") with no currency symbol, or the rendered card shows a double "₹₹". `clicks`/`orders`/
  `conversion` (or `cvr`) take no prefix — pass those as-is. Caught only by looking at the rendered
  screenshot, not the code.
- **Banner** — `header`/`subtext` are `truncate` (single-line, no wrap) inside a ~176px-wide column (the
  350×150 card minus the 150px `creative` slot minus padding). Keep sample copy short (header ≲17 chars,
  subtext ≲22 chars) or it reads as cut off in the preview. `header`/`subtext`/`cta` are plain passthrough
  props otherwise — no internal formatting.
- **Notification / Toast** — `headline`/`subtext`/`text` are plain passthrough props, no internal formatting.

## BrandLogo needs `vite/client` types in the tsc pass (added 2026-09-07)
`BrandLogo` (component #16, added 2026-09-07) is the first component to import non-TS assets:
`brandLogos.ts` does `import ajio from "../../assets/brand-logos/ajio.png"` × 24, and `BrandLogo.tsx`
reads `import.meta.env.DEV`. Both rely on Vite's ambient types, which the repo supplies through the
untracked-then-committed `src/vite-env.d.ts` (`/// <reference types="vite/client" />`).
**`cfg.buildCmd`'s tsc pass never loads that file** — it passes `src/components/index.ts` as its only
input, so the `.d.ts` isn't in the program. Result was 25 hard errors:
- `TS2307: Cannot find module '../../assets/brand-logos/*.png'` × 24
- `TS2339: Property 'env' does not exist on type 'ImportMeta'` × 1

Fixed by adding **`--types vite/client,react,react-dom`** to the tsc invocation in `cfg.buildCmd`
(2026-09-07). `--types` injects the ambient declarations globally without adding an input file, which
matters because `--rootDir src/components` would reject `src/vite-env.d.ts` as being outside the root.
Do NOT "fix" this instead by adding the file to the input list or widening `rootDir` — widening rootDir
moves `dist/index.d.ts` down a level and breaks `findTypesRoot` (see "Repo shape" above).
- Re-sync risk: any future component importing a new asset type (`.svg`, `.json`, `.css?inline`) is
  covered by `vite/client` already; one importing something Vite doesn't type will need its own
  declaration reachable from the tsc program.

## BrandLogo: PNG assets inline into the bundle (72 KB → 412 KB)
The converter's esbuild config (`lib/bundle.mjs`) already maps `.png`/`.svg`/`.woff`/`.woff2` to the
`dataurl` loader, so the 24 committed brand PNGs (292 KB on disk) inline as base64 data URIs with no
config needed — nothing extra ships in `_vendor/` or as loose files, and the cards render the real
artwork. Cost: `_ds_bundle.js` went from 72 KB to **412 KB**. That is fine today but it is now the
dominant term in bundle size.
- Re-sync risk: **each new partner logo adds ~1.5-2× its PNG size to every consumer of the bundle.**
  The registry's own doc comment tells contributors to "drop the PNG in and add one row" — at ~24 logos
  that's ~340 KB of the bundle; at 100 it would be well over a megabyte. If the set keeps growing,
  consider serving the artwork rather than inlining it (the `src` field is just a string, so a CDN URL
  would work unchanged) and re-check the `bundle:` line in the build log.
- `import.meta.env.DEV` renders safely: the converter's `IIFE_IMPORT_META_DEFINE` (in `lib/common.mjs`)
  defines `import.meta.env` as `{"MODE":"development","DEV":true,...}` for the IIFE build, so
  `BrandLogo`'s dev-only sub-48px warning branch compiles and never throws. Without that define the
  `{}.env.DEV` lookup would crash every BrandLogo render — don't assume Vite-isms are automatically safe,
  but this specific one is handled upstream.

## BrandLogo grouping + card mode
- Grouped via a stub like every other non-Card component: `.design-sync/group-stubs/brand/BrandLogo.ts`
  pinned in `cfg.componentSrcMap` → group **"Brand"**. Its `@category Brand` JSDoc tag is present but,
  as with all 15 others, is NOT what groups it (see "Grouping" above).
- `cfg.overrides.BrandLogo = {"cardMode": "column"}` — the `PartnerDirectory` story renders all 24 logos
  in wrapped category rows and is far wider than a multi-column grid cell.
- The sibling exports (`BRAND_LOGOS`, `BRAND_LOGO_NAMES`, `BRAND_LOGO_CATEGORY_LABELS`,
  `brandLogosByCategory`) are correctly NOT picked up as components — none is PascalCase — while still
  being importable from `window.LehlahDesignSystem` (20 exports for 16 components). The authored preview
  uses them, which is also how the design agent learns they exist.
- **An unknown slug throws**: `BRAND_LOGOS[name]` returns `undefined` and the component reads `.src` off
  it. `conventions.md` now enumerates all 24 valid slugs for exactly this reason.

## conventions.md drift found and corrected (2026-09-07)
The standing validation pass (base SKILL.md "Author the conventions header" — run on every re-sync,
never a rewrite) found the header naming **12 tokens that do not exist in the build**:
- `--button-color-{filled,subtle,ghost,destructive,success,disabled}-border`,
  `--button-color-ghost-{background,overlay}`, `--button-color-{success,disabled}-overlay` — the header
  used a brace-cartesian `{7 variants}-{background,content,border,overlay}` (28 names) but only 18 exist;
  the suffix set genuinely differs per variant, and `ghost` has ONLY `--button-color-ghost-content`.
- `--type-title-small-{size,line-height}` — there is no `title-small` tier (heading has large/medium/small,
  title has large/medium only, body has large/medium/small/extra-small).
Corrected to the real per-variant/per-tier sets, and the families the 2026-09-03 rewrite added but the
header never documented were filled in: full `none,xs,s,m,l,xl,xxl` scales on `--surface-{spacing,padding,radius}-*`
plus `--surface-radius-full`, `--surface-effect-drop-shadow-{low,medium,high}-*`, `--border-width-default`,
`--border-color-{black,grey-light,grey-dark}`, `--icon-size-{xs,s,m,l,xl,xxl}`, and the
`--type-*-weight-{regular,medium,semibold,bold}` axis. Verified: every token, brand slug and component
name the header now claims resolves against `_ds_bundle.css` / the `components/` tree.
- **Why this matters more than a docs nit**: the header is inlined into the design agent's system prompt.
  A token name that doesn't resolve produces silently unstyled CSS in every design built from it — no
  error anywhere. Re-run this validation every sync; brace-shorthand families are the trap, because one
  compact pattern can assert dozens of names nobody checked.
- Content belongs to its authors — the structure, voice and "do not use the Tailwind theme shorthands"
  guidance were left as-is; only false or missing names were touched.

## Not yet in this design system
- Per `docs/COMPONENTS.md`'s own "Not included" section: **Navbar** (Figma component set exists but no page
  link was available to source it) and the 8-icon **feature icon** set are intentionally not built as
  components in this repo — nothing to sync for them; not a converter miss.

## Project target history (read this before assuming the pin is valid)
- **2026-09-03: the previously pinned project `adac91b4-2772-4151-bbed-ccea8b53d84f` was DELETED**
  (`get_project` → HTTP 404, and it no longer appears in `list_projects`). Re-synced into a newly created
  project instead: **`791d95e5-9f41-419a-8dba-4f83ed20cc8e` ("LehLah Design System")**, now pinned in
  `config.json`. Because the target was fresh/empty, this ran as a first-sync-shaped upload (no anchor,
  full verification scope, all 15 components re-uploaded) rather than an incremental diff.
- ⚠️ **Do NOT sync into project `7ab30ef7-f76b-44e9-8c4a-4d2e6406a097` (named just "Design System").**
  It holds a *different* LehLah design system — the web-app kit (Navbar, Table, Modal, CreatorCard,
  Pagination, `ui_kits/lehlah-app/`, `assets/icons/lehlah/`, lehlah-logo.png). It has no `_ds_sync.json`,
  so this skill did not produce it, and none of its components overlap this repo's 15 mobile components.
  Uploading there would replace/delete that separate work. There is also an empty leftover project
  `10468529-acdc-465b-8c7f-e309e4fa0e84`, likewise named "Design System" — harmless but easy to confuse.
- Lesson for next time: the generic name "Design System" is ambiguous across this account. The pinned
  project is now explicitly named "LehLah Design System"; keep that name so `list_projects` stays readable.
- **2026-09-07: pin verified still valid** (`get_project` → "LehLah Design System",
  `PROJECT_TYPE_DESIGN_SYSTEM`, `canEdit`). Ran as a proper anchored re-sync — the project's
  `_ds_sync.json` gave 15 verified-by-upload skips, so only the new `BrandLogo` needed capture+grading.
  This is what the fast path looks like; if a re-sync ever re-verifies all 16 for no obvious reason,
  suspect the anchor (`anchorReason` in `.sync-diff.json` should read `ok`) or a `scriptsSha` bump from
  a newer bundled converter.

## Re-sync risks
- `cfg.buildCmd`'s two commands must both keep succeeding — if `tsconfig.json` or `tailwind.config.ts` change
  shape (e.g. real `noEmit`/content-glob edits), re-check that `dist/index.d.ts` still lands directly at
  `dist/`'s top level and that `dist/styles.css` still has zero `@import` lines left unresolved.
- The Poppins self-host is pinned to specific Google Fonts CDN URLs (captured on 2026-08-14, Poppins v24) —
  if the repo starts shipping its own font strategy, replace `.design-sync/fonts/poppins.css` accordingly.
- The `@category` JSDoc tags are hand-added and will NOT auto-propagate to new components — remember to tag
  new components' leading JSDoc when they're added, or they land in "general".
- **New runtime dep as of 2026-09-03: `@phosphor-icons/react` (^2.1.10).** `BottomSheet` imports
  `MagnifyingGlass` from it. esbuild inlines it into `_ds_bundle.js` (build log: `inlined npm packages: 1`),
  so nothing extra needs shipping — but the dep must be installed before the converter runs, or the bundle
  step fails to resolve it. If more components adopt Phosphor glyphs, watch the bundle size (72 KB → check
  the `bundle:` line); tree-shaking keeps only the icons actually imported.
- **The 2026-09-07 component sweep was styling-only — verified, not assumed.** 11 components had
  hardcoded values swapped for token references (`text-[12px]` → `text-[length:var(--type-body-medium-size)]`,
  `rounded-xl` → `rounded-[var(--surface-radius-m)]`, `bg-[#333333]` → `bg-[var(--color-grey-900)]`,
  `--color-grey-70` → `--color-grey-400`, Notification's subtext → `--typography-color-grey-dark`,
  Pill gained `[&_svg]:size-[var(--icon-size-s)]`, BottomSheet's inline search `<svg>` → Phosphor
  `MagnifyingGlass`). **No prop signature changed**, so the six hand-written `cfg.dtsPropsFor` bodies
  stayed valid — re-checked against `git diff src/components/<Name>` per the rule below. The driver
  correctly classified all 15 as `unchanged` (grades follow the authored `.tsx` + preview-affecting
  config, not component styling) and the contact sheet confirmed every one still renders styled.
- The 2026-09-03 `src/styles/tokens.css` rewrite was **purely additive** for anything the conventions header
  names (523 tokens defined now; every family enumerated in `conventions.md` re-verified present). It did
  rename some raw primitives (`--color-grey-70` → `--color-grey-400`) and add new families
  (`--surface-radius-m`, `--border-width-default`, `--icon-size-s`, `--typography-color-grey-dark`,
  `--type-body-{small,extra-small}-*`). Component styling churn like this does NOT invalidate preview
  grades by design — but re-read the contact sheet after any token rewrite, since a renamed token that a
  component still references would render as an unstyled fallback with no error anywhere.
