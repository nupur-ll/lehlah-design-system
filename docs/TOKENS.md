# Design tokens

Source: **LehLah Design System** Figma file (`rqHOBBeDnuO6euPeqSJBqV`), team library `LehLah Design System`.

All tokens live as CSS custom properties in [`src/styles/tokens.css`](../src/styles/tokens.css) — that file is the
single source of truth; this document is a human-readable reference table for it. Figma organizes its variables
into three collections, and this file mirrors that structure exactly:

1. **Primitives** — the raw palette. Never bind these directly to a layer/component; they only exist so
   semantic and component tokens can reference them.
2. **Semantics** — role-based tokens (what a color/size *means*, not what hue it is).
3. **Components** — component-scoped tokens (`button/*`, `card/*`, `input-field/*`, `banner/*`, `notification/*`).

Every value below was read directly out of the real generated code Figma's MCP server returns for each pulled
component (e.g. the fallback in `bg-[var(--button/color/filled/background,#191919)]`), so these are exact,
not estimated from a screenshot. Rows marked **(unconfirmed)** are token *names* confirmed to exist in the file's
variable index, but whose exact value wasn't exercised by any of the 14 component pages this library was built
from — cross-check those in Figma directly before shipping a screen that depends on them.

## 1. Primitives

| Token | Value | Notes |
|---|---|---|
| `color/grey/white` | `#FFFFFF` | |
| `color/grey/100` | `#F5F5F5` | |
| `color/grey/200` | `#E6E6E6` | |
| `color/grey/400` | `#CCCCCC` | |
| `color/grey/700` | `#999999` | |
| `color/grey/1000` | `#191919` | darkest neutral — primary text, filled-button background |
| `color/grey/black` | `#000000` | |
| `greys/grey-70` | `#B2B2B2` | drag handles, disabled handle fills |
| `color/lime/300` | `#F8F6D3` | Brand Yellow, lightest |
| `color/lime/400` | `#EBE57A` | |
| `color/lime/500` (`Brand/500`) | `#E2D939` | primary brand shade — identity only (logo, LEHLAH Score) |
| `color/lime/600` | `#DED421` | |
| `color/purple/400` | `#AF7AEB` | Milestone earning type |
| `color/purple/500` | `#944EE4` | |
| `color/purple/600` (`Purple/600`) | `#6E1EC8` | primary shade |
| `color/purple/700` | `#611BB1` | |
| `color/magenta/400` | `#EA7BD0` | Contest earning type |
| `color/magenta/500` (`Magenta/500`) | `#E142BC` | primary shade |
| `color/magenta/600` | `#DC23B1` | |
| `color/magenta/700` | `#84156A` | |
| `color/orange/300` | `#F0C2A8` | Gifting earning type |
| `color/orange/500` | `#DE7C45` | |
| `color/orange/600` (`Orange/600`) | `#D96726` | primary shade |
| `color/blue/400` | `#6292EA` | Paid Collabs earning type |
| `color/blue/500` | `#3572E3` | |
| `color/blue/600` (`Blue/600`) | `#1F63E0` | primary shade (quick-reference table) |
| `color/blue/700` | `#184FB4` | |
| `color/teal/400` | `#78E3ED` | Opportunities |
| `color/teal/500` | `#17A6B4` | |
| `color/teal/600` (`Teal/600`) | `#1DD0E2` | primary shade |
| `color/teal/700` | `#127D87` | |
| `color/green/600` (`Green/600`) | `#21DE83` | primary shade — Success |
| `color/green/solid` | `#1AAD66` | solid success fill (buttons, pills, toasts) |
| `color/amber/600` (`Amber/600`) | `#E59533` | Pending / Warning |
| `color/red/600` (`Red/600`) | `#E43A25` | Error / destructive — use sparingly |
| `font/name` | `Poppins` | family primitive; weights used: Regular, Medium, SemiBold, Bold |

## 2. Semantics

### Typography colors
| Token | Value |
|---|---|
| `typography/color/primary` | `#191919` |
| `typography/color/secondary` | `#808080` |
| `typography/color/grey` | `#808080` |
| `typography/color/grey-dark` | `#666666` |
| `typography/color/white` | `#FFFFFF` |

### Type scale
Naming pattern: `typography/typescale/{group}/{size}/{weight}`. Confirmed sizes/line-heights:

| Style | Size | Line height |
|---|---|---|
| body / extra-small | 10px | 16px |
| body / small | 11px | 16px |
| body / medium | 12px | 20px |
| body / large | 13px | 20px |
| title / medium | 14px | 20px |
| title / large | 16px | 20px |

Weights seen in use: 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold). Letter-spacing is `0px` across every
style pulled.

### Icon
| Token | Value |
|---|---|
| `icon/size/s` | 16px |
| `icon/size/m` | 20px |
| `icon/size/l` | 24px |
| `icon/size/xs` | 12px **(unconfirmed)** |
| `icon/size/xl` | 32px **(unconfirmed)** |
| `icon/size/xxl` | 40px **(unconfirmed)** |
| `icon/color/grey` | `#999999` |
| `icon/color/dark` | `#191919` |
| `icon/color/light` | `#FFFFFF` |

### Borders & surfaces
| Token | Value |
|---|---|
| `border/width/thin` | 0.5px |
| `border/width/thick` | 1.5px |
| `border/color/grey` | `#E6E6E6` |
| `surface/spacing/xs` | 2px |
| `surface/spacing/s` | 4px |
| `surface/padding/s` | 8px |
| `surface/padding/m` | 12px |
| `surface/radius/s` | 8px |
| `surface/color/page` | `#FFFFFF` |
| `surface/color/container/white` | `#FFFFFF` |
| `number/4` | 4px |

### Selection controls (radio / checkbox / toggle / tabs)
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

### System role tints
| Token | Value |
|---|---|
| `system/info/light` | `#E9EFFC` |
| `system/success/light` | `#E9FCF3` |
| `system/warning/light` | `#FCF3E8` |
| `system/error/light` | `#FCEBE8` |
| `brand/primary/light` | `#FCFBE9` |
| `brand/purple/light` | `#F2E9FC` |
| `brand/teal/light` | `#E8FAFC` |

## 3. Components

### `button/*`
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

### `card/*` (AffiliateLinkCard, CollectionCard)
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

### `input-field/*`
| Token | Value |
|---|---|
| `input-field/corner-radius` | 8px |
| `input-field/padding-vertical` | 8px |
| `input-field/padding-horizontal-default` | 12px |
| `input-field/color/surface` | `#FFFFFF` |
| `input-field/color/border-default` | `#CCCCCC` |
| `input-field/color/border-focused` | `#191919` |
| `input-field/color/border-error` | `#E43A25` |
| `input-field/color/input-text` | `#191919` |
| `input-field/color/input-label` | `#808080` |
| `input-field/color/mandatory-indicator` | `#E43A25` |
| `input-field/color/error-message` | `#E43A25` |
| `input-field/color/icon` | `#999999` **(unconfirmed exact hex)** |

### `banner/*` (color × weight matrix — 6 colors × 3 weights)
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

### `notification/*` (shared by Pill, Notification, Toast)
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

### `navigation/*` (tabs)
Token names `navigation/tab-spacing`, `navigation/tab-icon-default`, `navigation/tab-icon-selected` are confirmed to
exist in the file's variable index, but the `tab` component pulled for this library uses `selection-control/*`
tokens instead — so these three are **(unconfirmed)** placeholders in `tokens.css`. If you add a nav-rail/nav-bar
component later, pull its Figma node directly and correct these.

## Gaps / things to double check

- **Navbar** — not pulled (no page link was available for it). Not represented in this library at all.
- **Icon assets** — components reference generic inline SVG placeholders, not the real Phosphor Icons glyphs
  the Figma file uses (asset URLs Figma's MCP returns expire after ~7 days, so they can't be committed).
  Swap `<svg>` placeholders in `Notification`, `Toast`, `InputField`, `IconButton`, and the card copy/delete
  buttons for your actual Phosphor Icons import once one is wired into the project.
- **Full 50–1000 primitive ramps** — only the shades actually exercised by a pulled component (plus the
  "primary shade" row from the colors page's quick-reference table) are captured. If a future component needs
  an intermediate shade not listed here, pull it from Figma rather than interpolating.
