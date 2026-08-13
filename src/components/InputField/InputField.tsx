import { useId, useState } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";

export type InputFieldType =
  | "text-input"
  | "action-input"
  | "dropdown-input"
  | "prefix-input"
  | "search-input";

export interface InputFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "prefix"> {
  type?: InputFieldType;
  label?: string;
  mandatory?: boolean;
  error?: string;
  /** icon rendered in the trailing 36x36 slot for `action-input` */
  actionIcon?: ReactNode;
  onAction?: () => void;
  /** dropdown options for `dropdown-input` */
  options?: string[];
  /** country calling code prefix for `prefix-input`, e.g. "+91" */
  prefix?: string;
}

/**
 * InputField — LehLah Design System
 * Figma: component set `input-field` (node 724:1449). Covers text, action
 * (icon affordance, e.g. a date-picker trigger), dropdown, prefix (phone
 * number) and search variants. The OTP variant is intentionally left out of
 * this generic component — build a dedicated <OtpInput /> from the same
 * tokens if/when that flow is needed, since its 4/6-box layout doesn't fit
 * this component's single-field shape.
 */
export default function InputField({
  type = "text-input",
  label = "Input Label",
  mandatory = false,
  error,
  actionIcon,
  onAction,
  options = [],
  prefix = "+91",
  className = "",
  disabled,
  id,
  onFocus,
  onBlur,
  ...rest
}: InputFieldProps) {
  const [focused, setFocused] = useState(false);
  const autoId = useId();
  const inputId = id ?? autoId;
  const hasError = Boolean(error);

  const borderColor = disabled
    ? "border-[var(--input-field-color-border-default)]"
    : hasError
      ? "border-[var(--input-field-color-border-error)]"
      : focused
        ? "border-[var(--input-field-color-border-focused)]"
        : "border-[var(--input-field-color-border-default)]";

  const containerClasses = [
    "flex h-[52px] w-full items-center gap-1 overflow-hidden rounded-[var(--input-field-corner-radius)]",
    "border-[1.5px] border-solid px-[var(--surface-padding-m)] py-[var(--surface-padding-s)]",
    "bg-[var(--input-field-color-surface)]",
    disabled ? "opacity-60" : "",
    borderColor,
  ].join(" ");

  return (
    <div className={["flex w-full flex-col items-start gap-1", className].join(" ")}>
      <div className={containerClasses}>
        {type === "prefix-input" && (
          <span className="shrink-0 text-[length:var(--type-title-medium-size)] leading-[var(--type-title-medium-line-height)] text-[color:var(--input-field-color-input-text)]">
            {prefix}
          </span>
        )}
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <label
            htmlFor={inputId}
            className="flex items-center gap-0.5 text-[length:var(--type-body-medium-size)] leading-[var(--type-body-medium-line-height)] text-[color:var(--input-field-color-input-label)]"
          >
            {label}
            {mandatory && (
              <span className="text-[color:var(--input-field-color-mandatory-indicator)]">*</span>
            )}
          </label>
          {type === "dropdown-input" ? (
            <select
              id={inputId}
              disabled={disabled}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              className="w-full truncate bg-transparent text-[length:var(--type-title-medium-size)] leading-[var(--type-title-medium-line-height)] text-[color:var(--input-field-color-input-text)] outline-none"
            >
              {options.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          ) : (
            <input
              id={inputId}
              disabled={disabled}
              onFocus={(e) => {
                setFocused(true);
                onFocus?.(e);
              }}
              onBlur={(e) => {
                setFocused(false);
                onBlur?.(e);
              }}
              className="w-full truncate bg-transparent text-[length:var(--type-title-medium-size)] leading-[var(--type-title-medium-line-height)] text-[color:var(--input-field-color-input-text)] outline-none placeholder:text-[color:var(--input-field-color-input-label)]"
              {...rest}
            />
          )}
        </div>
        {type === "action-input" && (
          <button
            type="button"
            onClick={onAction}
            aria-label="Input action"
            className="flex size-9 shrink-0 items-center justify-center rounded [&_svg]:size-7 text-[color:var(--input-field-color-icon)]"
          >
            {actionIcon}
          </button>
        )}
        {type === "dropdown-input" && (
          <svg viewBox="0 0 24 24" fill="none" className="size-6 shrink-0 text-[color:var(--input-field-color-icon)]" aria-hidden>
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
        {type === "search-input" && (
          <svg viewBox="0 0 24 24" fill="none" className="size-5 shrink-0 text-[color:var(--input-field-color-icon)]" aria-hidden>
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth={1.5} />
            <path d="M21 21l-4-4" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
          </svg>
        )}
      </div>
      {hasError && (
        <div className="flex items-center gap-1 text-[color:var(--input-field-color-error-message)]">
          <svg viewBox="0 0 24 24" fill="none" className="size-4 shrink-0" aria-hidden>
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth={1.5} />
            <path d="M12 7v6" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
            <circle cx="12" cy="16.5" r="1" fill="currentColor" />
          </svg>
          <p className="text-[length:var(--type-body-medium-size)] leading-[var(--type-body-medium-line-height)] font-medium">
            {error}
          </p>
        </div>
      )}
    </div>
  );
}
