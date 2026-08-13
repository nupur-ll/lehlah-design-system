import { useState } from "react";
import { Checkbox } from "@lehlah/design-system";

export function Large() {
  const [orders, setOrders] = useState(true);
  const [comments, setComments] = useState(false);
  const [payouts, setPayouts] = useState(true);
  return (
    <div className="flex w-[260px] flex-col gap-3">
      <label className="flex items-center gap-2">
        <Checkbox size="large" checked={orders} onChange={(e) => setOrders(e.target.checked)} />
        <span className="text-[color:var(--typography-color-primary)]">Notify me on new orders</span>
      </label>
      <label className="flex items-center gap-2">
        <Checkbox size="large" checked={comments} onChange={(e) => setComments(e.target.checked)} />
        <span className="text-[color:var(--typography-color-primary)]">Notify me on new comments</span>
      </label>
      <label className="flex items-center gap-2">
        <Checkbox size="large" checked={payouts} onChange={(e) => setPayouts(e.target.checked)} />
        <span className="text-[color:var(--typography-color-primary)]">Notify me on payouts</span>
      </label>
    </div>
  );
}

export function Small() {
  const [skincare, setSkincare] = useState(true);
  const [makeup, setMakeup] = useState(false);
  const [haircare, setHaircare] = useState(true);
  return (
    <div className="flex w-[220px] flex-col gap-2">
      <label className="flex items-center gap-2">
        <Checkbox size="small" checked={skincare} onChange={(e) => setSkincare(e.target.checked)} />
        <span className="text-sm text-[color:var(--typography-color-primary)]">Skincare</span>
      </label>
      <label className="flex items-center gap-2">
        <Checkbox size="small" checked={makeup} onChange={(e) => setMakeup(e.target.checked)} />
        <span className="text-sm text-[color:var(--typography-color-primary)]">Makeup</span>
      </label>
      <label className="flex items-center gap-2">
        <Checkbox size="small" checked={haircare} onChange={(e) => setHaircare(e.target.checked)} />
        <span className="text-sm text-[color:var(--typography-color-primary)]">Haircare</span>
      </label>
    </div>
  );
}
