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
  InputField,
  AffiliateLinkCard,
  CollectionCard,
  BottomSheet,
} from "./components";
import type { ButtonVariant, PillType, InputFieldType, InputFieldState } from "./components";

const BUTTON_VARIANTS: ButtonVariant[] = [
  "filled",
  "outlined",
  "subtle",
  "ghost",
  "destructive",
  "success",
  "disabled",
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

function CaretIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-full" aria-hidden>
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-4 border-b border-solid border-[var(--color-grey-200)] py-8">
      <h2 className="text-[length:var(--type-title-large-size)] font-bold text-[color:var(--typography-color-primary)]">
        {title}
      </h2>
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </section>
  );
}

export default function App() {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [radioValue, setRadioValue] = useState("a");
  const [checked, setChecked] = useState(true);
  const [toggled, setToggled] = useState(true);
  const [tab, setTab] = useState("one");
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
          Live preview of every component in this library, built directly from the
          LehLah Design System Figma file's tokens. See docs/TOKENS.md and
          docs/COMPONENTS.md for the full reference.
        </p>
      </header>

      <Section title="Button">
        {BUTTON_VARIANTS.map((v) => (
          <Button key={v} variant={v}>
            {v}
          </Button>
        ))}
      </Section>

      <Section title="Selection controls">
        <div className="flex items-center gap-1">
          <RadioButton checked={radioValue === "a"} onChange={() => setRadioValue("a")} name="demo-radio" />
          <RadioButton checked={radioValue === "b"} onChange={() => setRadioValue("b")} name="demo-radio" />
        </div>
        <Checkbox checked={checked} onChange={(e) => setChecked(e.target.checked)} />
        <ToggleSwitch checked={toggled} onChange={(e) => setToggled(e.target.checked)} />
      </Section>

      <Section title="Pill">
        {PILL_TYPES.map((t) => (
          <Pill key={t} type={t} weight="tonal">
            {t}
          </Pill>
        ))}
      </Section>

      <Section title="Notification">
        <div className="flex flex-col gap-2">
          <Notification type="info" />
          <Notification type="success" />
          <Notification type="warning" />
          <Notification type="error" />
        </div>
      </Section>

      <Section title="Toast">
        <Toast type="success" />
      </Section>

      <Section title="Tab">
        <div className="flex gap-2">
          <Tab type="pill" selected={tab === "one"} onClick={() => setTab("one")}>
            Tab One
          </Tab>
          <Tab type="pill" selected={tab === "two"} onClick={() => setTab("two")}>
            Tab Two
          </Tab>
        </div>
      </Section>

      <Section title="Banner">
        <Banner color="purple" weight="dark" />
        <Banner color="teal" weight="light" />
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
                        state !== "filled" && state !== "error"
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

      <Section title="Cards">
        <AffiliateLinkCard />
        <CollectionCard />
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
