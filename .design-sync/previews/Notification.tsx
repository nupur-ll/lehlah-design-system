import { Notification } from "@lehlah/design-system";

export function AllTypes() {
  return (
    <div className="flex flex-col gap-2">
      <Notification
        type="info"
        headline="New: Auto-DM is live"
        subtext="Turn comments into checkout links."
      />
      <Notification
        type="success"
        headline="Payout processed"
        subtext="₹4,200 sent to your linked bank account."
      />
      <Notification
        type="warning"
        headline="Affiliate link expiring soon"
        subtext="Your Summer Sale link ends in 2 days."
      />
      <Notification
        type="error"
        headline="Product upload failed"
        subtext="Check the image size and try again."
      />
    </div>
  );
}
