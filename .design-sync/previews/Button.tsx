import { Button } from "@lehlah/design-system";

export function Variants() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="filled">Filled</Button>
      <Button variant="outlined">Outlined</Button>
      <Button variant="subtle">Subtle</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="success">Success</Button>
      <Button variant="disabled">Disabled</Button>
    </div>
  );
}

export function Sizes() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button size="large">Large</Button>
      <Button size="medium">Medium</Button>
      <Button size="small">Small</Button>
    </div>
  );
}

function CaretIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-full" aria-hidden>
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function WithIcons() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="filled" leftIcon={<span className="size-4"><CaretIcon /></span>}>
        Get started
      </Button>
      <Button variant="outlined" rightIcon={<span className="size-4"><CaretIcon /></span>}>
        View more
      </Button>
    </div>
  );
}
