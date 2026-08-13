import { InputField } from "@lehlah/design-system";

function CaretIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-full" aria-hidden>
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Types() {
  return (
    <div className="flex flex-wrap gap-4">
      <div className="w-[220px]">
        <InputField type="text-input" label="Input Label" state="filled" value="Input value" />
      </div>
      <div className="w-[220px]">
        <InputField
          type="action-input"
          label="Input Label"
          state="filled"
          value="Input value"
          actionIcon={<span className="size-4"><CaretIcon /></span>}
        />
      </div>
      <div className="w-[220px]">
        <InputField
          type="dropdown-input"
          label="City"
          state="filled"
          value="Bengaluru"
          options={["Bengaluru", "Mumbai", "Delhi"]}
        />
      </div>
      <div className="w-[220px]">
        <InputField type="prefix-input" label="Phone" state="filled" value="98765 43210" prefix="+91" />
      </div>
      <div className="w-[288px]">
        <InputField type="otp-input" state="filled" otpValue="192" />
      </div>
      <div className="w-[220px]">
        <InputField type="search-input" label="Search here" state="filled" value="sneakers" />
      </div>
    </div>
  );
}

export function States() {
  return (
    <div className="flex flex-wrap gap-4">
      <div className="w-[220px]">
        <span className="mb-1 block text-[11px] text-[color:var(--typography-color-secondary)]">default</span>
        <InputField type="text-input" label="Input Label" state="default" />
      </div>
      <div className="w-[220px]">
        <span className="mb-1 block text-[11px] text-[color:var(--typography-color-secondary)]">focused</span>
        <InputField type="text-input" label="Input Label" state="focused" />
      </div>
      <div className="w-[220px]">
        <span className="mb-1 block text-[11px] text-[color:var(--typography-color-secondary)]">filled</span>
        <InputField type="text-input" label="Input Label" state="filled" value="Input value" />
      </div>
      <div className="w-[220px]">
        <span className="mb-1 block text-[11px] text-[color:var(--typography-color-secondary)]">error</span>
        <InputField type="text-input" label="Input Label" state="error" value="Input value" error="Input error message" />
      </div>
      <div className="w-[220px]">
        <span className="mb-1 block text-[11px] text-[color:var(--typography-color-secondary)]">disabled</span>
        <InputField type="text-input" label="Input Label" state="disabled" disabled />
      </div>
    </div>
  );
}

export function Mandatory() {
  return (
    <div className="w-[220px]">
      <InputField type="text-input" label="Email" mandatory state="default" />
    </div>
  );
}
