# Design tokens

Source: **LehLah Design System** Figma file (`rqHOBBeDnuO6euPeqSJBqV`), team library `LehLah Design System`.

All tokens live as CSS custom properties in [`src/styles/tokens.css`](../src/styles/tokens.css) — that file is the
single source of truth; this document is a human-readable reference table for it. It mirrors the Figma file's own
three variable collections, each split into the exact subgroups the file organizes them into:

1. **Primitives** — `colors`, `font`, `numbers`. The raw palette and scale. A primitive never encodes a role or
   usage context (no "Milestone purple", no "Gifting orange") — it's a pure value. Never bind these directly to a
   layer/component; they only exist so semantic and component tokens can reference them.
2. **Semantics** — `typography`, `surface`, `border`, `icon`, `system`, `brand`. Role-based tokens: what a
   value *means*, not what it literally is.
3. **Components** — `buttons`, `input-field`, `banner`, `notification`, `navigation`, `card`, `selection-control`.
   Component-scoped tokens that reference semantics (and occasionally primitives) for their actual values.

Every value below is either a real value read out of Figma (via a pulled component's generated code, or a resolved
`get_variable_defs` lookup), or — for the parts of the primitive color ramps that weren't directly exercised by any
pulled component/lookup — a value interpolated between two or more confirmed real steps in the same color family,
on that family's own hue/lightness curve. Every interpolated cell is marked **(interpolated)**; every other value
was pulled, not guessed. Rows marked **(unconfirmed)** are non-color token *names* confirmed to exist in the file's
variable index whose exact value wasn't exercised by any pulled component or lookup — cross-check those in Figma
directly before shipping a screen that depends on them.

## 1. Primitives

### `colors`

Each color family below is the complete 100–1000 step ramp as it exists in the Figma file (confirmed present via
`search_design_system` against the file's own published variable index). Steps not marked *(interpolated)* were
read as exact resolved hex values (from a pulled component's `get_variable_defs`, e.g. the banner and notification
components bind `color/purple/400`, `color/blue/400`, `color/teal/400`, `color/magenta/400`, `color/orange/300`,
and the input-field/button components bind several grey steps) or already lived in the earlier version of this
file from prior Figma pulls. Interpolated steps fill the gaps in between and beyond those anchors on the same hue —
confirm any of them against Figma directly before depending on the exact hex in a new screen.

| `color/grey/white` | `#FFFFFF` | not part of the numbered ramp |
| `color/grey/black` | `#000000` | not part of the numbered ramp |
| `greys/grey-70` | `#B2B2B2` | not part of the numbered ramp — drag handles, disabled handle fills |

#### `color/grey/*`
| Step | Value | |
|---|---|---|
| 100 | `#F5F5F5` ||
| 200 | `#E6E6E6` ||
| 300 | `#D9D9D9` | *(interpolated)*|
| 400 | `#CCCCCC` ||
| 500 | `#BBBBBB` | *(interpolated)*|
| 600 | `#AAAAAA` | *(interpolated)*|
| 700 | `#999999` ||
| 800 | `#6E6E6E` | *(interpolated)*|
| 900 | `#444444` | *(interpolated)*|
| 1000 | `#191919` ||

#### `color/lime/*`
| Step | Value | |
|---|---|---|
| 100 | `#FEFDF6` | *(interpolated)*|
| 200 | `#FDFCF0` | *(interpolated)*|
| 300 | `#F8F6D3` ||
| 400 | `#EBE57A` ||
| 500 | `#E2D939` ||
| 600 | `#DED421` ||
| 700 | `#ABA319` | *(interpolated)*|
| 800 | `#787312` | *(interpolated)*|
| 900 | `#46420A` | *(interpolated)*|
| 1000 | `#131203` | *(interpolated)*|

#### `color/purple/*`
| Step | Value | |
|---|---|---|
| 100 | `#F6EFFD` | *(interpolated)*|
| 200 | `#EADBFA` | *(interpolated)*|
| 300 | `#CCABF2` | *(interpolated)*|
| 400 | `#AF7AEB` ||
| 500 | `#944EE4` ||
| 600 | `#6E1EC8` ||
| 700 | `#611BB1` ||
| 800 | `#44137C` | *(interpolated)*|
| 900 | `#270B48` | *(interpolated)*|
| 1000 | `#0B0313` | *(interpolated)*|

#### `color/magenta/*`
| Step | Value | |
|---|---|---|
| 100 | `#FDF0FA` | *(interpolated)*|
| 200 | `#F9DCF2` | *(interpolated)*|
| 300 | `#F2ABE1` | *(interpolated)*|
| 400 | `#EA7BD0` ||
| 500 | `#E142BC` ||
| 600 | `#DC23B1` ||
| 700 | `#84156A` ||
| 800 | `#5D0F4B` | *(interpolated)*|
| 900 | `#36092B` | *(interpolated)*|
| 1000 | `#0E020C` | *(interpolated)*|

#### `color/orange/*`
| Step | Value | |
|---|---|---|
| 100 | `#FCF4F0` | *(interpolated)*|
| 200 | `#F8E3D7` | *(interpolated)*|
| 300 | `#F0C2A8` ||
| 400 | `#E79F76` | *(interpolated)*|
| 500 | `#DE7C45` ||
| 600 | `#D96726` ||
| 700 | `#A74F1D` | *(interpolated)*|
| 800 | `#763815` | *(interpolated)*|
| 900 | `#44200C` | *(interpolated)*|
| 1000 | `#120903` | *(interpolated)*|

#### `color/blue/*`
| Step | Value | |
|---|---|---|
| 100 | `#E4ECFB` | *(interpolated)*|
| 200 | `#BED2F6` | *(interpolated)*|
| 300 | `#90B2F0` | *(interpolated)*|
| 400 | `#6292EA` ||
| 500 | `#3572E3` ||
| 600 | `#1F63E0` ||
| 700 | `#184FB4` ||
| 800 | `#11387F` | *(interpolated)*|
| 900 | `#0A2049` | *(interpolated)*|
| 1000 | `#030914` | *(interpolated)*|

#### `color/teal/*`
| Step | Value | |
|---|---|---|
| 100 | `#EFFCFD` | *(interpolated)*|
| 200 | `#DBF8FA` | *(interpolated)*|
| 300 | `#A9EDF4` | *(interpolated)*|
| 400 | `#78E3ED` ||
| 500 | `#17A6B4` ||
| 600 | `#1DD0E2` ||
| 700 | `#127D87` ||
| 800 | `#0D585F` | *(interpolated)*|
| 900 | `#073337` | *(interpolated)*|
| 1000 | `#020E0F` | *(interpolated)*|

#### `color/green/*`
| Step | Value | |
|---|---|---|
| 100 | `#EFFDF6` | *(interpolated)*|
| 200 | `#ECFCF5` | *(interpolated)*|
| 300 | `#B9F5D8` | *(interpolated)*|
| 400 | `#87EDBC` | *(interpolated)*|
| 500 | `#54E69F` | *(interpolated)*|
| 600 | `#21DE83` ||
| 700 | `#19AB65` | *(interpolated)*|
| 800 | `#127847` | *(interpolated)*|
| 900 | `#0A4629` | *(interpolated)*|
| 1000 | `#03130B` | *(interpolated)*|

#### `color/amber/*`
| Step | Value | |
|---|---|---|
| 100 | `#FEFAF6` | *(interpolated)*|
| 200 | `#FDF7EF` | *(interpolated)*|
| 300 | `#FBEEDD` | *(interpolated)*|
| 400 | `#F3D0A5` | *(interpolated)*|
| 500 | `#ECB36C` | *(interpolated)*|
| 600 | `#E59533` ||
| 700 | `#C07418` | *(interpolated)*|
| 800 | `#875211` | *(interpolated)*|
| 900 | `#4E2F0A` | *(interpolated)*|
| 1000 | `#150D03` | *(interpolated)*|

#### `color/red/*`
| Step | Value | |
|---|---|---|
| 100 | `#FEF7F6` | *(interpolated)*|
| 200 | `#FDF1EF` | *(interpolated)*|
| 300 | `#F8CCC7` | *(interpolated)*|
| 400 | `#F19C91` | *(interpolated)*|
| 500 | `#EB6B5B` | *(interpolated)*|
| 600 | `#E43A25` ||
| 700 | `#B62817` | *(interpolated)*|
| 800 | `#801C10` | *(interpolated)*|
| 900 | `#4A1009` | *(interpolated)*|
| 1000 | `#140402` | *(interpolated)*|

`color/green/solid` `#1AAD66` — a real pulled value (notification/banner solid-success fill) whose exact
step within the green ramp above is unconfirmed, so it's kept as its own alias rather than forced into a
guessed step.

### `font`
| Token | Value |
|---|---|
| `font/name` | `Poppins` — weights used: Regular (400), Medium (500), SemiBold (600), Bold (700) |

### `numbers`
Raw numeric scale primitives that semantic/component tokens reference for spacing, radius, border-width,
and overlay opacity.

| Token | Value | |
|---|---|---|
| `number/0.5` | `0.5px` | thin border width |
| `number/1.5` | `1.5px` | thick border width |
| `number/2` | `2px` | |
| `number/4` | `4px` | |
| `number/8` | `8px` | |
| `number/12` | `12px` | |
| `number/16` | `16px` | |
| `number/20` | `20px` | |
| `number/24` | `24px` | |
| `number/32` | `32px` | *(unconfirmed)* |
| `number/40` | `40px` | *(unconfirmed)* |
| `number/1000` | `1000px` | fully-rounded / pill radius |
| `opacity/08` | `0.08` | confirmed — Figma's `rgba(18,18,18,.08)` overlay/state-layer |
| `opacity/16` | `0.16` | *(unconfirmed)* — named `color/state-layer/*/opacity-16` in the file |
| `opacity/20` | `0.2` | *(unconfirmed)* — named `color/state-layer/*/opacity-20` in the file |
| `opacity/50` | `0.5` | confirmed — Figma's `rgba(18,18,18,.5)` filled-button overlay |

## 2. Semantics

### `typography`
| Token | Value |
|---|---|
| `typography/color/primary` | `#191919` |
| `typography/color/secondary` | `#808080` |
| `typography/color/grey` | `#808080` |
| `typography/color/grey-dark` | `#666666` |
| `typography/color/white` | `#FFFFFF` |

Type scale, naming pattern `typography/typescale/{tier}/{size}/{weight}`. Figma defines three tiers —
**heading**, **title**, **body** — weights 400/500/600/700 (Regular/Medium/SemiBold/Bold), letter-spacing `0px`
across every style pulled.

| Style | Size | Line height | |
|---|---|---|---|
| body / extra-small | 10px | 16px | |
| body / small | 11px | 16px | |
| body / medium | 12px | 20px | |
| body / large | 13px | 20px | |
| title / medium | 14px | 20px | |
| title / large | 16px | 20px | |
| heading / small | 18px | 24px | *(unconfirmed — approximate, confirm exact px/line-height in Figma)* |
| heading / medium | 22px | 28px | *(unconfirmed — approximate, confirm exact px/line-height in Figma)* |
| heading / large | 26px | 32px | *(unconfirmed — approximate, confirm exact px/line-height in Figma)* |

The `heading/*` style names and their 400/500/600/700 weight variables are confirmed to exist in the file's
variable/style index (`search_design_system`), but no pulled component or `get_variable_defs` lookup exercised
their resolved size/line-height, so the three heading rows above are a reasoned extrapolation of the existing
body → title progression, not a pulled value — treat them as a starting point and confirm against Figma directly.

### `surface`
| Token | Value |
|---|---|
| `surface/spacing/xs` | `number/2` → 2px |
| `surface/spacing/s` | `number/4` → 4px |
| `surface/padding/s` | `number/8` → 8px |
| `surface/padding/m` | `number/12` → 12px |
| `surface/radius/s` | `number/8` → 8px |
| `surface/color/page` | `#FFFFFF` |
| `surface/color/container/white` | `#FFFFFF` |
| `surface/color/overlay/black/opacity-08` | `rgba(18,18,18,0.08)` |

### `border`
| Token | Value |
|---|---|
| `border/width/thin` | `number/0.5` → 0.5px |
| `border/width/thick` | `number/1.5` → 1.5px |
| `border/color/grey` | `#E6E6E6` |

### `icon`
| Token | Value |
|---|---|
| `icon/size/xs` | 12px *(unconfirmed)* |
| `icon/size/s` | 16px |
| `icon/size/m` | 20px |
| `icon/size/l` | 24px |
| `icon/size/xl` | 32px *(unconfirmed)* |
| `icon/size/xxl` | 40px *(unconfirmed)* |
| `icon/color/grey` | `#999999` |
| `icon/color/dark` | `#191919` |
| `icon/color/light` | `#FFFFFF` |

### `system`
Role-based status tints reused by banners and notifications.

| Token | Value |
|---|---|
| `system/info/light` | `#E9EFFC` |
| `system/success/light` | `#E9FCF3` |
| `system/warning/light` | `#FCF3E8` |
| `system/error/light` | `#FCEBE8` |

### `brand`
Per-hue brand tint used for the "light" weight across banner/notification components.

| Token | Value |
|---|---|
| `brand/primary/light` | `#FCFBE9` |
| `brand/purple/light` | `#F2E9FC` |
| `brand/teal/light` | `#E8FAFC` |
| `brand/magenta/light` | `#FCE9F7` |
| `brand/orange/light` | `#FBF0E9` |

## 3. Components

### `buttons`
| Token | Value |
|---|---|
| `button/radius/small` | 8px (medium + small sizes) |
| `button/radius/large` | 12px (large size) |
| `button/padding/horizontal/small` | 16px |
| `button/padding/horizontal/medium` | 20px |
| `button/padding/horizontal/large` | 24px |
| `button/padding/vertical/small` | 8px |
| `button/padding/vertical/medium` | 12px |
| `button/padding/vertical/large` | 16px |
| `button/color/filled/background` | `#191919` |
| `button/color/filled/content` | `#FFFFFF` |
| `button/color/outlined/background` | `#FFFFFF` |
| `button/color/outlined/border` | `#191919` |
| `button/color/outlined/content` | `#191919` |
| `button/color/subtle/background` | `#F5F5F5` |
| `button/color/subtle/content` | `#191919` |
| `button/color/ghost/content` | `#191919` (transparent background) |
| `button/color/destructive/background` | `#E43A25` |
| `button/color/destructive/content` | `#FFFFFF` |
| `button/color/success/background` | `#1AAD66` |
| `button/color/success/content` | `#FFFFFF` |
| `button/color/disabled/background` | `#CCCCCC` |
| `button/color/disabled/content` | `#FFFFFF` |

### `input-field`
| Token | Value |
|---|---|
| `input-field/corner-radius` | 8px |
| `input-field/padding-vertical` | 8px |
| `input-field/padding-horizontal-default` | 12px |
| `input-field/color/surface` | `#FFFFFF` |
| `input-field/color/surface-disabled` | `#ECECEC` (flattened from Figma's `rgba(18,18,18,.08)` over white) |
| `input-field/color/border-default` | `#CCCCCC` (also used for `disabled` — the border is not dimmed) |
| `input-field/color/border-focused` | `#191919` |
| `input-field/color/border-error` | `#E43A25` |
| `input-field/color/input-text` | `#191919` |
| `input-field/color/input-text-disabled` | `#666666` (`typography/color/grey-dark` — a distinct muted grey, not a faded `input-text`) |
| `input-field/color/input-label` | `#808080` (also used for `disabled` — the label is not dimmed) |
| `input-field/color/mandatory-indicator` | `#E43A25` |
| `input-field/color/error-message` | `#E43A25` |
| `input-field/color/icon` | `#999999` **(unconfirmed exact hex)** |

### `banner` (color × weight matrix — 6 colors × 3 weights)
| Color | light | default | dark |
|---|---|---|---|
| blue | `#E9EFFC` | `#3572E3` | `#184FB4` |
| lime | `#F8F6D3` | `#EBE57A` | `#DED421` |
| purple | `#F2E9FC` | `#944EE4` | `#611BB1` |
| teal | `#E8FAFC` | `#17A6B4` | `#127D87` |
| magenta | `#FCE9F7` | `#DC23B1` | `#84156A` |
| orange | `#FBF0E9` | `#DE7C45` | `#D96726` |

`banner/text-dark` `#191919`, `banner/text-light` `#FFFFFF`, `banner/border-dark` `#191919`, `banner/border-light`
`#E6E6E6`. Text/border is **dark** whenever `weight === "light"` or `color === "lime"`; light everywhere else.

### `notification` (shared by Pill, Notification, Toast)
| Color | tonal background | tonal border | tonal content | solid background |
|---|---|---|---|---|
| brand | `#FCFBE9` | `#F2EEA6` | `#59550D` | `#DED421` |
| grey | `#F5F5F5` | `#F5F5F5` | `#808080` | `#999999` |
| info | `#E9EFFC` | `#D2E0F9` | `#184FB4` | `#3572E3` |
| teal | `#E8FAFC` | `#D2F6F9` | `#0C535A` | `#17A6B4` |
| purple | `#F2E9FC` | `#E4D3F8` | `#491485` | `#6E1EC8` |
| magenta | `#FCE9F7` | `#F8D3EF` | `#84156A` | `#DC23B1` |
| orange | `#FBF0E9` | `#F7E1D4` | `#AD521F` | `#D96726` |
| success | `#E9FCF3` | `#D3F8E6` | `#0D5934` | `#1AAD66` |
| warning | `#FCF3E8` | `#F9E7D2` | `#B56E17` | `#E59533` |
| error | `#FCEBE8` | `#F9D6D2` | `#E43A25` | `#E43A25` |

`notification/content/solid-white` `#FFFFFF`, `notification/content/solid-black` `#191919`,
`notification/background/solid/dark` `#191919`. Shape: `notification/spacing` 4px,
`notification/padding-horizontal` 8px, `notification/padding-vertical` 4px, `notification/corner-radius` 1000px
(fully rounded / pill shape).

### `navigation` (tabs)
Token names `navigation/tab-spacing`, `navigation/tab-icon-default`, `navigation/tab-icon-selected` are confirmed to
exist in the file's variable index, but the `tab` component pulled for this library uses `selection-control/*`
tokens instead — so these three are **(unconfirmed)** placeholders in `tokens.css`. If you add a nav-rail/nav-bar
component later, pull its Figma node directly and correct these.

### `card` (AffiliateLinkCard, CollectionCard)
| Token | Value |
|---|---|
| `card/background` | `#FFFFFF` |
| `card/border` | `#E6E6E6` |
| `card/padding` | 12px |
| `card/corner-radius-card` | 16px |
| `card/corner-radius-image` | 12px |
| `card/corner-radius-tile` | 4px |
| `card/text-primary` | `#191919` |
| `card/text-secondary` | `#999999` |
| `card/text-label` | `#666666` |
| `card/tile-background` | `#F5F5F5` |
| `card/icon` | `#191919` **(unconfirmed exact hex)** |

### `selection-control` (radio / checkbox / toggle / tabs)
| Token | Value |
|---|---|
| `selection-control/action-default` | `#999999` |
| `selection-control/action-selected` | `#191919` |
| `selection-control/background` | `#FFFFFF` |
| `selection-control/border-dark` | `#191919` |
| `selection-control/border-grey` | `#E6E6E6` |
| `selection-control/content-dark` | `#191919` |
| `selection-control/content-grey` | `#999999` |
| `selection-control/content-white` | `#FFFFFF` |
| `selection-control/tab-background-selected` | `#191919` |

## Gaps / things to double check

- **Navbar** — not pulled (no page link was available for it). Not represented in this library at all.
- **Icon assets** — components reference generic inline SVG placeholders, not the real Phosphor Icons glyphs
  the Figma file uses (asset URLs Figma's MCP returns expire after ~7 days, so they can't be committed).
  Swap `<svg>` placeholders in `Notification`, `Toast`, `InputField`, `IconButton`, and the card copy/delete
  buttons for your actual Phosphor Icons import once one is wired into the project.
- **Primitive color ramps** — every family's 100–1000 steps are now represented, but roughly two-thirds of each
  ramp is interpolated rather than pulled (see the *(interpolated)* tags in section 1). Before shipping a screen
  that depends on an exact interpolated shade, pull that specific step from Figma to confirm it — the confirmed
  anchors ensure the interpolation is close, but "close" isn't "exact".
- **Heading type scale** — sizes/line-heights are an extrapolation, not a pulled value (see the typography
  section above). Confirm against Figma before shipping heading-styled copy.
- **`color/state-layer/*/opacity-*` primitives** — confirmed to exist by name (`opacity-08`, `-16`, `-20`, `-50`)
  for at least blue/orange/lime/amber, folded into the generic `opacity/*` numbers primitives above since two of
  the four (08, 50) were confirmed via pulled overlay values and the other two weren't exercised anywhere.
