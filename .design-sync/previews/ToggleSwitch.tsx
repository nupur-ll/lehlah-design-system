import { useState } from "react";
import { ToggleSwitch } from "@lehlah/design-system";

export function Large() {
  const [autoDm, setAutoDm] = useState(true);
  const [publicProfile, setPublicProfile] = useState(false);
  const [collabRequests, setCollabRequests] = useState(true);
  return (
    <div className="flex w-[260px] flex-col gap-4">
      <label className="flex items-center justify-between gap-3">
        <span className="text-[color:var(--typography-color-primary)]">Auto-DM on new followers</span>
        <ToggleSwitch size="large" checked={autoDm} onChange={(e) => setAutoDm(e.target.checked)} />
      </label>
      <label className="flex items-center justify-between gap-3">
        <span className="text-[color:var(--typography-color-primary)]">Public storefront</span>
        <ToggleSwitch size="large" checked={publicProfile} onChange={(e) => setPublicProfile(e.target.checked)} />
      </label>
      <label className="flex items-center justify-between gap-3">
        <span className="text-[color:var(--typography-color-primary)]">Accept collab requests</span>
        <ToggleSwitch size="large" checked={collabRequests} onChange={(e) => setCollabRequests(e.target.checked)} />
      </label>
    </div>
  );
}

export function Small() {
  const [lowStock, setLowStock] = useState(true);
  const [priceDrops, setPriceDrops] = useState(false);
  return (
    <div className="flex w-[220px] flex-col gap-3">
      <label className="flex items-center justify-between gap-3">
        <span className="text-sm text-[color:var(--typography-color-primary)]">Low-stock alerts</span>
        <ToggleSwitch size="small" checked={lowStock} onChange={(e) => setLowStock(e.target.checked)} />
      </label>
      <label className="flex items-center justify-between gap-3">
        <span className="text-sm text-[color:var(--typography-color-primary)]">Price-drop alerts</span>
        <ToggleSwitch size="small" checked={priceDrops} onChange={(e) => setPriceDrops(e.target.checked)} />
      </label>
    </div>
  );
}
