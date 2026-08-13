import { useState } from "react";
import {
  Button,
  RadioButton,
  Checkbox,
  ToggleSwitch,
  Pill,
  Notification,
  Toast,
  Tab,
  Banner,
  IconButton,
  InputField,
  AffiliateLinkCard,
  CollectionCard,
  BottomSheet,
} from "./components";
import type {
  ButtonVariant,
  ButtonSize,
  PillType,
  PillWeight,
  NotificationType,
  TabType,
  BannerColor,
  BannerWeight,
  AffiliateLinkCardType,
  InputFieldType,
  InputFieldState,
} from "./components";

const BUTTON_VARIANTS: ButtonVariant[] = [
  "filled",
  "outlined",
  "subtle",
  "ghost",
  "destructive",
  "success",
  "disabled",
];
const BUTTON_SIZES: ButtonSize[] = ["large", "medium", "small"];

const PILL_TYPES: PillType[] = [
  "brand",
  "grey",
  "info",
  "teal",
  "purple",
  "magenta",
  "orange",
  "success",
  "warning",
  "error",
  "dark",
];
const PILL_WEIGHTS: PillWeight[] = ["tonal", "fill"];

const NOTIFICATION_TYPES: NotificationType[] = ["info", "success", "warning", "error"];

const BANNER_COLORS: BannerColor[] = ["purple", "teal", "orange", "magenta", "lime", "blue"];
const BANNER_WEIGHTS: BannerWeight[] = ["dark", "default", "light"];

const AFFILIATE_CARD_TYPES: AffiliateLinkCardType[] = [
  "default",
  "collection",
  "curated-collection",
  "auto-dm",
  "amazon",
];

// Mirrors STATES_BY_TYPE in InputField.tsx — the exact type x state matrix
// that exists in the Figma file (not every type has all 5 states).
const INPUT_FIELD_MATRIX: { type: InputFieldType; states: InputFieldState[] }[] = [
  { type: "text-input", states: ["default", "focused", "filled", "error", "disabled"] },
  { type: "action-input", states: ["default", "focused", "filled", "error"] },
  { type: "dropdown-input", states: ["default", "focused", "filled", "error"] },
  { type: "prefix-input", states: ["default", "focused", "filled", "error"] },
  { type: "otp-input", states: ["default", "focused", "filled", "error"] },
  { type: "search-input", states: ["default", "focused", "filled"] },
];

// --- Foundations data (Primitives + Semantics) --------------------------
// Mirrors src/styles/tokens.css exactly — see docs/TOKENS.md for the full
// reference table with descriptions/provenance.

const PRIMITIVE_GROUPS: { name: string; swatches: { label: string; token: string }[] }[] = [
  {
    name: "Grey",
    swatches: [
      { label: "white", token: "--color-grey-white" },
      { label: "100", token: "--color-grey-100" },
      { label: "200", token: "--color-grey-200" },
      { label: "400", token: "--color-grey-400" },
      { label: "700", token: "--color-grey-700" },
      { label: "1000", token: "--color-grey-1000" },
      { label: "black", token: "--color-grey-black" },
      { label: "70", token: "--color-grey-70" },
    ],
  },
  {
    name: "Lime (Brand)",
    swatches: [
      { label: "300", token: "--color-lime-300" },
      { label: "400", token: "--color-lime-400" },
      { label: "500", token: "--color-lime-500" },
      { label: "600", token: "--color-lime-600" },
    ],
  },
  {
    name: "Purple (Milestone)",
    swatches: [
      { label: "400", token: "--color-purple-400" },
      { label: "500", token: "--color-purple-500" },
      { label: "600", token: "--color-purple-600" },
      { label: "700", token: "--color-purple-700" },
    ],
  },
  {
    name: "Magenta (Contest)",
    swatches: [
      { label: "400", token: "--color-magenta-400" },
      { label: "500", token: "--color-magenta-500" },
      { label: "600", token: "--color-magenta-600" },
      { label: "700", token: "--color-magenta-700" },
    ],
  },
  {
    name: "Orange (Gifting)",
    swatches: [
      { label: "300", token: "--color-orange-300" },
      { label: "500", token: "--color-orange-500" },
      { label: "600", token: "--color-orange-600" },
    ],
  },
  {
    name: "Blue (Paid Collabs)",
    swatches: [
      { label: "400", token: "--color-blue-400" },
      { label: "500", token: "--color-blue-500" },
      { label: "600", token: "--color-blue-600" },
      { label: "700", token: "--color-blue-700" },
    ],
  },
  {
    name: "Teal (Opportunities)",
    swatches: [
      { label: "400", token: "--color-teal-400" },
      { label: "500", token: "--color-teal-500" },
      { label: "600", token: "--color-teal-600" },
      { label: "700", token: "--color-teal-700" },
    ],
  },
  {
    name: "Green (Success)",
    swatches: [
      { label: "600", token: "--color-green-600" },
      { label: "solid", token: "--color-green-solid" },
    ],
  },
  {
    name: "Amber (Warning)",
    swatches: [{ label: "600", token: "--color-amber-600" }],
  },
  {
    name: "Red (Error/Destructive)",
    swatches: [{ label: "600", token: "--color-red-600" }],
  },
];

const SEMANTIC_COLOR_GROUPS: { name: string; swatches: { label: string; token: string }[] }[] = [
  {
    name: "Typography",
    swatches: [
      { label: "primary", token: "--typography-color-primary" },
      { label: "secondary", token: "--typography-color-secondary" },
      { label: "grey", token: "--typography-color-grey" },
      { label: "grey-dark", token: "--typography-color-grey-dark" },
    ],
  },
  {
    name: "Surface",
    swatches: [
      { label: "page", token: "--surface-color-page" },
      { label: "container-white", token: "--surface-color-container-white" },
    ],
  },
  {
    name: "Selection control",
    swatches: [
      { label: "action-default", token: "--selection-control-action-default" },
      { label: "action-selected", token: "--selection-control-action-selected" },
      { label: "border-dark", token: "--selection-control-border-dark" },
      { label: "border-grey", token: "--selection-control-border-grey" },
    ],
  },
  {
    name: "System role (light tints)",
    swatches: [
      { label: "info-light", token: "--system-info-light" },
      { label: "success-light", token: "--system-success-light" },
      { label: "warning-light", token: "--system-warning-light" },
      { label: "error-light", token: "--system-error-light" },
      { label: "brand-primary-light", token: "--brand-primary-light" },
      { label: "brand-purple-light", token: "--brand-purple-light" },
      { label: "brand-teal-light", token: "--brand-teal-light" },
    ],
  },
];

const TYPE_SCALE: { name: string; sizeToken: string; lineHeightToken: string; weight: string }[] = [
  { name: "title/large", sizeToken: "--type-title-large-size", lineHeightToken: "--type-title-large-line-height", weight: "600" },
  { name: "title/medium", sizeToken: "--type-title-medium-size", lineHeightToken: "--type-title-medium-line-height", weight: "500" },
  { name: "body/large", sizeToken: "--type-body-large-size", lineHeightToken: "--type-body-large-line-height", weight: "400" },
  { name: "body/medium", sizeToken: "--type-body-medium-size", lineHeightToken: "--type-body-medium-line-height", weight: "400" },
  { name: "body/small", sizeToken: "--type-body-small-size", lineHeightToken: "--type-body-small-line-height", weight: "400" },
  { name: "body/extra-small", sizeToken: "--type-body-extra-small-size", lineHeightToken: "--type-body-extra-small-line-height", weight: "400" },
];

const SPACING_SCALE = [
  { label: "spacing-xs", token: "--surface-spacing-xs" },
  { label: "spacing-s", token: "--surface-spacing-s" },
  { label: "padding-s", token: "--surface-padding-s" },
  { label: "padding-m", token: "--surface-padding-m" },
];

const RADIUS_SCALE = [
  { label: "radius-s", token: "--surface-radius-s" },
  { label: "input-field radius", token: "--input-field-corner-radius" },
  { label: "button radius (s/m)", token: "--button-radius-small" },
  { label: "button radius (l)", token: "--button-radius-large" },
  { label: "card radius", token: "--card-corner-radius-card" },
  { label: "pill radius", token: "--notification-corner-radius" },
];

function CaretIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-full" aria-hidden>
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-full" aria-hidden>
      <path d="M5 7h14M9 7V5a1 1 0 011-1h4a1 1 0 011 1v2m2 0v13a1.5 1.5 0 01-1.5 1.5h-9A1.5 1.5 0 016 20V7" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Section({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-4 border-b border-solid border-[var(--color-grey-200)] py-8">
      <div className="flex flex-col gap-1">
        <h2 className="text-[length:var(--type-title-large-size)] font-bold text-[color:var(--typography-color-primary)]">
          {title}
        </h2>
        {description && (
          <p className="max-w-2xl text-sm text-[color:var(--typography-color-secondary)]">{description}</p>
        )}
      </div>
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </section>
  );
}

/** Groups a set of demo rows under a small uppercase sub-label within a Section. */
function SubRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex w-full flex-col gap-2">
      <span className="text-[11px] font-semibold uppercase tracking-[0.5px] text-[color:var(--typography-color-secondary)]">
        {label}
      </span>
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </div>
  );
}

/** One color swatch — background pulled live from the CSS variable, so it can never drift from tokens.css. */
function Swatch({ label, token }: { label: string; token: string }) {
  return (
    <div className="flex w-20 flex-col items-center gap-1">
      <div
        className="size-12 rounded-lg border border-solid border-[var(--color-grey-200)]"
        style={{ background: `var(${token})` }}
      />
      <span className="text-center text-[10px] leading-tight text-[color:var(--typography-color-secondary)]">{label}</span>
    </div>
  );
}

/** One row of a Foundations color group: group name + its swatches. */
function ColorGroupRow({ name, swatches }: { name: string; swatches: { label: string; token: string }[] }) {
  return (
    <div className="flex w-full flex-col gap-2">
      <span className="text-[12px] font-semibold text-[color:var(--typography-color-primary)]">{name}</span>
      <div className="flex flex-wrap gap-3">
        {swatches.map((s) => (
          <Swatch key={s.token} label={s.label} token={s.token} />
        ))}
      </div>
    </div>
  );
}

/** One type-scale specimen: sample text rendered at the real token size/line-height, plus a caption. */
function TypeSpecimen({ name, sizeToken, lineHeightToken, weight }: { name: string; sizeToken: string; lineHeightToken: string; weight: string }) {
  return (
    <div className="flex w-full items-baseline gap-4 border-b border-solid border-[var(--color-grey-100)] py-2">
      <span className="w-40 shrink-0 font-mono text-[10px] text-[color:var(--typography-color-secondary)]">
        {name}
        <br />
        var({sizeToken}) / var({lineHeightToken})
      </span>
      <p
        className="text-[color:var(--typography-color-primary)]"
        style={{
          fontSize: `var(${sizeToken})`,
          lineHeight: `var(${lineHeightToken})`,
          fontWeight: weight,
        }}
      >
        The quick brown fox jumps
      </p>
    </div>
  );
}

export default function App() {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [radioValue, setRadioValue] = useState("a");
  const [checked, setChecked] = useState(true);
  const [toggled, setToggled] = useState(true);
  const [tab, setTab] = useState("one");
  const [underlinedTab, setUnderlinedTab] = useState("one");
  const [selectedOptions, setSelectedOptions] = useState<string[]>(["Option A"]);
  const [city, setCity] = useState("");

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <header className="mb-8">
        <p className="text-[12px] font-semibold uppercase tracking-[1px] text-[color:var(--typography-color-secondary)]">
          LehLah Design System
        </p>
        <h1 className="text-3xl font-bold text-[color:var(--typography-color-primary)]">
          Component gallery
        </h1>
        <p className="mt-2 max-w-2xl text-[color:var(--typography-color-secondary)]">
          Live preview of every component and every documented variant in this library, built
          directly from the LehLah Design System Figma file's tokens. See docs/TOKENS.md and
          docs/COMPONENTS.md for the full reference tables.
        </p>
      </header>

      <Section
        title="Foundations — Primitives"
        description="Raw palette values. Never used directly by a component — they only exist so semantic/component tokens can reference them."
      >
        <div className="flex w-full flex-col gap-5">
          {PRIMITIVE_GROUPS.map((g) => (
            <ColorGroupRow key={g.name} name={g.name} swatches={g.swatches} />
          ))}
        </div>
      </Section>

      <Section
        title="Foundations — Semantics"
        description="Role-based tokens that reference the primitives above — typography, surface, selection-control, and system-role colors."
      >
        <div className="flex w-full flex-col gap-5">
          {SEMANTIC_COLOR_GROUPS.map((g) => (
            <ColorGroupRow key={g.name} name={g.name} swatches={g.swatches} />
          ))}
        </div>
      </Section>

      <Section
        title="Foundations — Text styles"
        description="The full type scale (font: Poppins). Every component's text traces back to one of these six styles."
      >
        <div className="flex w-full flex-col">
          {TYPE_SCALE.map((t) => (
            <TypeSpecimen key={t.name} {...t} />
          ))}
        </div>
      </Section>

      <Section
        title="Foundations — Spacing & radius"
        description="4px-multiple spacing scale and the corner-radius scale used across components."
      >
        <div className="flex w-full flex-col gap-5">
          <div className="flex w-full flex-col gap-2">
            <span className="text-[12px] font-semibold text-[color:var(--typography-color-primary)]">Spacing</span>
            <div className="flex flex-wrap items-end gap-4">
              {SPACING_SCALE.map((s) => (
                <div key={s.token} className="flex flex-col items-center gap-1">
                  <div className="flex h-12 items-end">
                    <div className="w-6 bg-[var(--color-grey-1000)]" style={{ height: `var(${s.token})` }} />
                  </div>
                  <span className="text-[10px] text-[color:var(--typography-color-secondary)]">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex w-full flex-col gap-2">
            <span className="text-[12px] font-semibold text-[color:var(--typography-color-primary)]">Radius</span>
            <div className="flex flex-wrap gap-4">
              {RADIUS_SCALE.map((r) => (
                <div key={r.label} className="flex flex-col items-center gap-1">
                  <div
                    className="size-14 border-[1.5px] border-solid border-[var(--color-grey-1000)] bg-[var(--color-grey-100)]"
                    style={{ borderRadius: `var(${r.token})` }}
                  />
                  <span className="text-center text-[10px] leading-tight text-[color:var(--typography-color-secondary)]">
                    {r.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section title="Button" description="3 sizes × 7 variants (component tokens: button/*).">
        <div className="flex w-full flex-col gap-4">
          {BUTTON_SIZES.map((size) => (
            <SubRow key={size} label={size}>
              {BUTTON_VARIANTS.map((v) => (
                <Button key={v} variant={v} size={size}>
                  {v}
                </Button>
              ))}
            </SubRow>
          ))}
        </div>
      </Section>

      <Section title="Selection controls" description="Radio, checkbox, and toggle — both sizes.">
        <div className="flex w-full flex-col gap-4">
          <SubRow label="large">
            <RadioButton size="large" checked={radioValue === "a"} onChange={() => setRadioValue("a")} name="demo-radio-l" />
            <RadioButton size="large" checked={radioValue === "b"} onChange={() => setRadioValue("b")} name="demo-radio-l" />
            <Checkbox size="large" checked={checked} onChange={(e) => setChecked(e.target.checked)} />
            <ToggleSwitch size="large" checked={toggled} onChange={(e) => setToggled(e.target.checked)} />
          </SubRow>
          <SubRow label="small">
            <RadioButton size="small" checked={radioValue === "a"} onChange={() => setRadioValue("a")} name="demo-radio-s" />
            <RadioButton size="small" checked={radioValue === "b"} onChange={() => setRadioValue("b")} name="demo-radio-s" />
            <Checkbox size="small" checked={checked} onChange={(e) => setChecked(e.target.checked)} />
            <ToggleSwitch size="small" checked={toggled} onChange={(e) => setToggled(e.target.checked)} />
          </SubRow>
        </div>
      </Section>

      <Section title="Pill" description="11 colors × 2 weights (tonal / fill).">
        <div className="flex w-full flex-col gap-4">
          {PILL_WEIGHTS.map((weight) => (
            <SubRow key={weight} label={weight}>
              {PILL_TYPES.map((t) => (
                <Pill key={t} type={t} weight={weight}>
                  {t}
                </Pill>
              ))}
            </SubRow>
          ))}
        </div>
      </Section>

      <Section title="Notification" description="Inline alert banner, 4 types.">
        <div className="flex flex-col gap-2">
          {NOTIFICATION_TYPES.map((t) => (
            <Notification key={t} type={t} />
          ))}
        </div>
      </Section>

      <Section title="Toast" description="Dark floating snackbar, all 4 icon types.">
        <div className="flex flex-col gap-2">
          {NOTIFICATION_TYPES.map((t) => (
            <Toast key={t} type={t} text={`Toast — ${t}`} />
          ))}
        </div>
      </Section>

      <Section title="Tab" description="Both families — pill and underlined — default/selected.">
        <div className="flex w-full flex-col gap-4">
          <SubRow label="pill">
            <Tab type="pill" selected={tab === "one"} onClick={() => setTab("one")}>
              Tab One
            </Tab>
            <Tab type="pill" selected={tab === "two"} onClick={() => setTab("two")}>
              Tab Two
            </Tab>
          </SubRow>
          <SubRow label="underlined">
            <Tab type="underlined" selected={underlinedTab === "one"} onClick={() => setUnderlinedTab("one")}>
              Tab One
            </Tab>
            <Tab type="underlined" selected={underlinedTab === "two"} onClick={() => setUnderlinedTab("two")}>
              Tab Two
            </Tab>
          </SubRow>
        </div>
      </Section>

      <Section title="Banner" description="6 colors × 3 weights (dark / default / light).">
        <div className="flex w-full flex-col gap-4">
          {BANNER_COLORS.map((color) => (
            <SubRow key={color} label={color}>
              {BANNER_WEIGHTS.map((weight) => (
                <Banner key={weight} color={color} weight={weight} />
              ))}
            </SubRow>
          ))}
        </div>
      </Section>

      <Section title="Icon button" description="Bare 36×36 icon tap target used inline in inputs/cards/toolbars.">
        <IconButton icon={<TrashIcon />} aria-label="Delete" />
        <IconButton icon={<CaretIcon />} aria-label="Expand" />
      </Section>

      <section className="flex flex-col gap-4 border-b border-solid border-[var(--color-grey-200)] py-8">
        <h2 className="text-[length:var(--type-title-large-size)] font-bold text-[color:var(--typography-color-primary)]">
          Input field
        </h2>
        <p className="max-w-2xl text-sm text-[color:var(--typography-color-secondary)]">
          Every type × state combination that actually exists in the Figma file (node
          724:1449) — 6 types, each gated to the states it really has. "default" is
          label-only by design; the value line only appears once a field is focused,
          filled, in error, or disabled.
        </p>
        <div className="w-[220px]">
          <p className="mb-1 text-[11px] text-[color:var(--typography-color-secondary)]">
            try it — dropdown-input opens a real bottom sheet
          </p>
          <InputField
            type="dropdown-input"
            label="City"
            value={city}
            onOptionSelect={setCity}
            options={["Bengaluru", "Mumbai", "Delhi", "Hyderabad", "Chennai"]}
          />
        </div>
        <div className="flex flex-col gap-8">
          {INPUT_FIELD_MATRIX.map(({ type, states }) => (
            <div key={type} className="flex flex-col gap-2">
              <h3 className="text-xs font-semibold uppercase tracking-[0.5px] text-[color:var(--typography-color-secondary)]">
                {type}
              </h3>
              <div className="flex flex-wrap gap-4">
                {states.map((state) => (
                  <div
                    key={state}
                    className={["flex flex-col gap-1", type === "otp-input" ? "w-[288px]" : "w-[220px]"].join(" ")}
                  >
                    <span className="text-[11px] text-[color:var(--typography-color-secondary)]">
                      {state}
                    </span>
                    <InputField
                      type={type}
                      state={state}
                      label={type === "search-input" ? "Search here" : "Input Label"}
                      value={
                        state !== "filled" && state !== "error" && state !== "disabled"
                          ? undefined
                          : type === "dropdown-input"
                            ? "Option A"
                            : "Input value"
                      }
                      otpValue={type === "otp-input" && (state === "filled" || state === "error") ? "192" : ""}
                      error={state === "error" ? "Input error message" : undefined}
                      disabled={state === "disabled"}
                      options={type === "dropdown-input" ? ["Option A", "Option B", "Option C"] : undefined}
                      actionIcon={type === "action-input" ? <CaretIcon /> : undefined}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Section title="Cards — AffiliateLinkCard" description="All 5 variants.">
        <div className="flex w-full flex-col gap-4">
          {AFFILIATE_CARD_TYPES.map((t) => (
            <SubRow key={t} label={t}>
              <AffiliateLinkCard type={t} />
            </SubRow>
          ))}
        </div>
      </Section>

      <Section title="Cards — CollectionCard" description="Curated vs. regular collection.">
        <SubRow label="curated">
          <CollectionCard curatedCollection />
        </SubRow>
        <SubRow label="regular">
          <CollectionCard curatedCollection={false} />
        </SubRow>
      </Section>

      <Section title="Bottom sheet">
        <Button onClick={() => setSheetOpen(true)}>Open filter sheet</Button>
        <BottomSheet
          open={sheetOpen}
          onClose={() => setSheetOpen(false)}
          filters={[
            { name: "Category", options: ["Option A", "Option B", "Option C"] },
            { name: "Status", options: ["Active", "Paused"] },
          ]}
          selectedOptions={selectedOptions}
          onOptionToggle={(opt) =>
            setSelectedOptions((prev) =>
              prev.includes(opt) ? prev.filter((o) => o !== opt) : [...prev, opt],
            )
          }
          onPrimaryAction={() => setSheetOpen(false)}
        />
      </Section>
    </main>
  );
}
