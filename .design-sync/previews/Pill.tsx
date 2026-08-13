import { Pill } from "@lehlah/design-system";

export function StatusTonal() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Pill type="success">Confirmed</Pill>
      <Pill type="warning">Pending</Pill>
      <Pill type="error">Failed</Pill>
      <Pill type="info">Processing</Pill>
      <Pill type="teal">Live</Pill>
      <Pill type="grey">Draft</Pill>
      <Pill type="purple">Featured</Pill>
      <Pill type="brand">New</Pill>
    </div>
  );
}

export function StatusFill() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Pill type="success" weight="fill">Paid</Pill>
      <Pill type="error" weight="fill">Overdue</Pill>
      <Pill type="orange" weight="fill">Low stock</Pill>
      <Pill type="dark" weight="fill">Archived</Pill>
    </div>
  );
}
