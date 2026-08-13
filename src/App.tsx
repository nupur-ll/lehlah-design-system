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
import type { ButtonVariant, PillType } from "./components";

const BUTTON_VARIANTS: ButtonVariant[] = [
  "filled",
  "outlined",
  "subtle",
  "ghost",
  "destructive",
  "success",
  "disabled",
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

      <Section title="Input field">
        <div className="flex w-[358px] flex-col gap-4">
          <InputField label="Input Label" placeholder="Input Text" />
          <InputField label="Input Label" error="Input error message" mandatory />
          <InputField type="search-input" label="" placeholder="Search here" />
        </div>
      </Section>

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
