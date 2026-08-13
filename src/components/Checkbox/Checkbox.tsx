import type { InputHTMLAttributes } from "react";

export type CheckboxSize = "small" | "large";

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  size?: CheckboxSize;
}

/**
 * Checkbox — LehLah Design System
 * Figma: component set `CheckBox` (node 223:1391).
 * Native <input type="checkbox"> for real semantics; visuals mirror the
 * Figma "container" (2px radius square, 2px border) + "CheckSquare" glyph.
 */
export default function Checkbox({
  size = "large",
  className = "",
  disabled,
  checked,
  ...rest
}: CheckboxProps) {
  const box = size === "large" ? "size-[18px]" : "size-3";
  const radius = size === "large" ? "rounded-[2px]" : "rounded-[1.4px]";
  const pad = size === "large" ? "p-2" : "p-1";

  return (
    <label
      className={[
        "relative inline-flex items-center justify-center",
        pad,
        disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
        className,
      ].join(" ")}
    >
      <input
        type="checkbox"
        className="peer sr-only"
        disabled={disabled}
        checked={checked}
        {...rest}
      />
      <span
        aria-hidden
        className={[
          box,
          radius,
          "flex items-center justify-center border-2 border-solid transition-colors",
          checked
            ? "border-[var(--selection-control-action-selected)] bg-[var(--selection-control-action-selected)]"
            : "border-[var(--selection-control-action-default)] bg-[var(--selection-control-background)]",
          "peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-[var(--selection-control-action-selected)]",
        ].join(" ")}
      >
        {checked && (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className={size === "large" ? "size-3.5" : "size-2.5"}
            aria-hidden
          >
            <path
              d="M5 13l4 4L19 7"
              stroke="var(--selection-control-background)"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
    </label>
  );
}
