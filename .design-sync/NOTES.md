# design-sync notes for @lehlah/design-system

## Repo shape
- No Storybook, no `*.stories.*` files — confirmed with the user this repo has none anywhere. Package shape.
- `package.json` has no real library build: `main` points straight at `src/components/index.ts` (TS source,
  never compiled), no `types`/`typings` field, no `dist/`. The `build` script (`tsc -b && vite build`) builds
  the demo app in `index.html`/`src/App.tsx`, not a library entry — `tsc -b` also can't emit anything since
  `tsconfig.json` sets `"noEmit": true`.
- `cfg.buildCmd` compensates with two one-off commands (do NOT rely on `npm run build` for this repo):
  1. A standalone `tsc --declaration --emitDeclarationOnly` pass over `src/components/index.ts`, rooted at
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
- `tokens: ... (2 missing, below threshold)` — **benign, not a real gap.** The two names are
  `--color-green-solid` and `--button`, and both occur only inside CSS *comments* in
  `src/styles/tokens.css` (one documents a token that was never defined; the other appears in prose
  describing `bg-[var(--button/color/filled/background,#191919)]`). The validator's reference scan
  doesn't strip comments. Zero live `var()` references are undefined — re-verified 2026-09-03 by diffing
  defined-vs-referenced custom properties across `_ds_bundle.css` + `fonts/fonts.css`.

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
- The 2026-09-03 `src/styles/tokens.css` rewrite was **purely additive** for anything the conventions header
  names (523 tokens defined now; every family enumerated in `conventions.md` re-verified present). It did
  rename some raw primitives (`--color-grey-70` → `--color-grey-400`) and add new families
  (`--surface-radius-m`, `--border-width-default`, `--icon-size-s`, `--typography-color-grey-dark`,
  `--type-body-{small,extra-small}-*`). Component styling churn like this does NOT invalidate preview
  grades by design — but re-read the contact sheet after any token rewrite, since a renamed token that a
  component still references would render as an unstyled fallback with no error anywhere.
