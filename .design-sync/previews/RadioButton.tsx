import { useState } from "react";
import { RadioButton } from "@lehlah/design-system";

export function Large() {
  const [plan, setPlan] = useState("creator");
  return (
    <div className="flex w-[220px] flex-col gap-3">
      <label className="flex items-center gap-2">
        <RadioButton
          size="large"
          name="plan-tier-large"
          checked={plan === "starter"}
          onChange={() => setPlan("starter")}
        />
        <span className="text-[color:var(--typography-color-primary)]">Starter — free</span>
      </label>
      <label className="flex items-center gap-2">
        <RadioButton
          size="large"
          name="plan-tier-large"
          checked={plan === "creator"}
          onChange={() => setPlan("creator")}
        />
        <span className="text-[color:var(--typography-color-primary)]">Creator — ₹499/mo</span>
      </label>
      <label className="flex items-center gap-2">
        <RadioButton
          size="large"
          name="plan-tier-large"
          checked={plan === "pro"}
          onChange={() => setPlan("pro")}
        />
        <span className="text-[color:var(--typography-color-primary)]">Pro — ₹1,499/mo</span>
      </label>
    </div>
  );
}

export function Small() {
  const [payout, setPayout] = useState("bank");
  return (
    <div className="flex w-[220px] flex-col gap-2">
      <label className="flex items-center gap-2">
        <RadioButton
          size="small"
          name="payout-method-small"
          checked={payout === "upi"}
          onChange={() => setPayout("upi")}
        />
        <span className="text-sm text-[color:var(--typography-color-primary)]">UPI</span>
      </label>
      <label className="flex items-center gap-2">
        <RadioButton
          size="small"
          name="payout-method-small"
          checked={payout === "bank"}
          onChange={() => setPayout("bank")}
        />
        <span className="text-sm text-[color:var(--typography-color-primary)]">Bank transfer</span>
      </label>
      <label className="flex items-center gap-2">
        <RadioButton
          size="small"
          name="payout-method-small"
          checked={payout === "wallet"}
          onChange={() => setPayout("wallet")}
        />
        <span className="text-sm text-[color:var(--typography-color-primary)]">Wallet</span>
      </label>
    </div>
  );
}
