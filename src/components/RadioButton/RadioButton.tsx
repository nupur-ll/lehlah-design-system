import type { InputHTMLAttributes } from "react";

export type RadioSize = "small" | "large";

export interface RadioButtonProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  size?: RadioSize;
}

/**
 * RadioButton — LehLah Design System
 * Figma: component set `Radio Buttons` (node 223:1386).
 * Native <input type="radio"> under the hood for real form semantics/a11y;
 * the ring/dot visuals are drawn with CSS against the selection-control tokens.
 */
export default function RadioButton({
  size = "large",
  className = "",
  disabled,
  checked,
  ...rest
}: RadioButtonProps) {
  const box = size === "large" ? "size-6" : "size-[18px]";
  const dot = size === "large" ? "size-2.5" : "size-2";
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
        type="radio"
        className="peer sr-only"
        disabled={disabled}
        checked={checked}
        {...rest}
      />
      <span
        aria-hidden
        className={[
          box,
          "rounded-full border-2 border-solid transition-colors",
          "border-[var(--selection-control-action-default)]",
          "peer-checked:border-[var(--selection-control-action-selected)]",
          "peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-[var(--selection-control-action-selected)]",
          "flex items-center justify-center",
        ].join(" ")}
      >
        <span
          aria-hidden
          className={[
            dot,
            "rounded-full bg-[var(--selection-control-action-selected)] transition-transform",
            checked ? "scale-100" : "scale-0",
          ].join(" ")}
        />
      </span>
    </label>
  );
}
