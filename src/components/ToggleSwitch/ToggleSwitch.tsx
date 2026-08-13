import type { InputHTMLAttributes } from "react";

export type ToggleSize = "small" | "large";

export interface ToggleSwitchProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  size?: ToggleSize;
}

/**
 * ToggleSwitch — LehLah Design System
 * Figma: component set `Toggle Switch` (node 223:1408).
 */
export default function ToggleSwitch({
  size = "large",
  className = "",
  disabled,
  checked,
  ...rest
}: ToggleSwitchProps) {
  const track =
    size === "large" ? "w-[52px] h-8 p-1" : "w-9 h-[18px] p-0.5";
  const handle = size === "large" ? "size-6" : "size-[14px]";
  const translate =
    size === "large"
      ? checked
        ? "translate-x-5"
        : "translate-x-0"
      : checked
        ? "translate-x-[18px]"
        : "translate-x-0";

  return (
    <label
      className={[
        "inline-flex cursor-pointer",
        disabled ? "cursor-not-allowed opacity-50" : "",
        className,
      ].join(" ")}
    >
      <input
        type="checkbox"
        role="switch"
        className="peer sr-only"
        disabled={disabled}
        checked={checked}
        {...rest}
      />
      <span
        className={[
          track,
          "flex items-center rounded-full border-2 border-solid transition-colors",
          checked
            ? "border-[var(--selection-control-action-selected)] bg-[var(--selection-control-action-selected)]"
            : "border-[var(--selection-control-action-default)] bg-[var(--selection-control-background)]",
          "peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-[var(--selection-control-action-selected)]",
        ].join(" ")}
      >
        <span
          className={[
            handle,
            "rounded-full transition-transform",
            checked ? "bg-[var(--selection-control-background)]" : "bg-[var(--selection-control-action-default)]",
            translate,
          ].join(" ")}
        />
      </span>
    </label>
  );
}
