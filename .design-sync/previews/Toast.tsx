import { Toast } from "@lehlah/design-system";

export function AllTypes() {
  return (
    <div className="flex flex-col gap-2">
      <Toast type="info" text="New order received" cta="View" />
      <Toast type="success" text="Link copied to clipboard" cta={false} />
      <Toast type="warning" text="Session expires in 5 minutes" cta="Extend" />
      <Toast type="error" text="Payout failed — try again" cta="Retry" />
    </div>
  );
}
