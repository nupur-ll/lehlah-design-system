import { useId, useRef, useState } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";
import BottomSheet from "../BottomSheet/BottomSheet";

export type InputFieldType =
  | "text-input"
  | "action-input"
  | "dropdown-input"
  | "prefix-input"
  | "otp-input"
  | "search-input";

export type InputFieldState = "default" | "focused" | "filled" | "error" | "disabled";

/**
 * Which states actually exist per type in the Figma `input-field` component
 * set (node 724:1449). Not every type has all 5 states — only text-input
 * carries a "disabled" variant, and search-input only ever shows
 * default/focused/filled.
 */
const STATES_BY_TYPE: Record<InputFieldType, InputFieldState[]> = {
  "text-input": ["default", "focused", "filled", "error", "disabled"],
  "action-input": ["default", "focused", "filled", "error"],
  "dropdown-input": ["default", "focused", "filled", "error"],
  "prefix-input": ["default", "focused", "filled", "error"],
  "otp-input": ["default", "focused", "filled", "error"],
  "search-input": ["default", "focused", "filled"],
};

export interface InputFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "prefix" | "size"> {
  type?: InputFieldType;
  label?: string;
  mandatory?: boolean;
  error?: string;
  /**
   * Force a specific visual state. Mainly for documentation/galleries that
   * need to reproduce Figma's exact variant grid — omit this in real usage
   * and the state is derived automatically from disabled / error / focus /
   * value. Ignored if the requested state doesn't exist for this `type`
   * (see STATES_BY_TYPE).
   */
  state?: InputFieldState;
  /** icon rendered in the trailing 36x36 slot for `action-input` */
  actionIcon?: ReactNode;
  onAction?: () => void;
  /** dropdown options for `dropdown-input` */
  options?: string[];
  /** called when an option is picked from the `dropdown-input` bottom sheet */
  onOptionSelect?: (value: string) => void;
  /** overrides the bottom sheet's header text for `dropdown-input` (defaults to `label`) */
  sheetTitle?: string;
  /** country calling code prefix for `prefix-input`, e.g. "+91" */
  prefix?: string;
  /** number of digit boxes for `otp-input` (default 6) */
  otpLength?: number;
  otpValue?: string;
  onOtpChange?: (value: string) => void;
  /** called when the trailing clear (×) button on a filled `search-input` is pressed */
  onClear?: () => void;
}

const CaretDownIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="size-6 shrink-0 text-[color:var(--input-field-color-icon)]" aria-hidden>
    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="size-5 shrink-0 text-[color:var(--input-field-color-icon)]" aria-hidden>
    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth={1.5} />
    <path d="M21 21l-4-4" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
  </svg>
);

const ClearIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="size-full" aria-hidden>
    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="size-5 shrink-0 text-[color:var(--input-field-color-icon)]" aria-hidden>
    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/**
 * InputField — LehLah Design System
 * Figma: component set `input-field` (node 724:1449). Covers all 6 types —
 * text, action (icon affordance, e.g. a date-picker trigger), dropdown,
 * prefix (phone number), otp (digit boxes), and search — and gates the
 * available states per type to match the file exactly (see STATES_BY_TYPE).
 *
 * Important quirks carried over from the source file:
 * - For text/action/dropdown/prefix-input, the **default** state shows only
 *   the small label — there is no visible value/placeholder line until the
 *   field becomes focused, filled, in error, or disabled. The underlying
 *   control is always mounted (so label-click-to-focus and real typing still
 *   work), just visually collapsed while in the default state.
 * - **otp-input** is the opposite: it has no label row at all — the digit
 *   boxes themselves (each showing a "-" placeholder when empty) are always
 *   visible in every state.
 * - **search-input** always shows its single line; its trailing icon swaps
 *   from a magnifier to a clear (×) button once the field is filled.
 * - **dropdown-input** doesn't use a native `<select>` — tapping it opens a
 *   `BottomSheet` listing every option (matching the app's actual mobile
 *   picker pattern), and picking one selects it and closes the sheet.
 */
export default function InputField({
  type = "text-input",
  label = "Input Label",
  mandatory = false,
  error,
  state: stateOverride,
  actionIcon,
  onAction,
  options = [],
  onOptionSelect,
  sheetTitle,
  prefix = "+91",
  otpLength = 6,
  otpValue = "",
  onOtpChange,
  className = "",
  disabled,
  id,
  value,
  defaultValue,
  onFocus,
  onBlur,
  onClear,
  ...rest
}: InputFieldProps) {
  const [focused, setFocused] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [internalDropdownValue, setInternalDropdownValue] = useState(
    typeof defaultValue === "string" ? defaultValue : "",
  );
  const autoId = useId();
  const inputId = id ?? autoId;
  const otpRefs = useRef<Array<HTMLInputElement | null>>([]);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const hasError = Boolean(error);
  // dropdown-input is never a native controlled/uncontrolled <input> — it's
  // either fully controlled via `value`, or tracks its own pick internally.
  const dropdownValue = typeof value === "string" ? value : internalDropdownValue;
  const hasValue =
    type === "otp-input"
      ? otpValue.length > 0
      : type === "dropdown-input"
        ? Boolean(dropdownValue)
        : Boolean(value ?? defaultValue);

  const derivedState: InputFieldState = disabled
    ? "disabled"
    : hasError
      ? "error"
      : focused
        ? "focused"
        : hasValue
          ? "filled"
          : "default";

  const validStates = STATES_BY_TYPE[type];
  const state: InputFieldState =
    stateOverride && validStates.includes(stateOverride) ? stateOverride : derivedState;

  // search-input and otp-input never collapse to label-only — the others do.
  const showValueRow =
    type === "search-input" || type === "otp-input" ? true : state !== "default";
  const isDisabled = state === "disabled";

  const borderColor =
    state === "disabled"
      ? "border-[var(--input-field-color-border-default)]"
      : state === "error"
        ? "border-[var(--input-field-color-border-error)]"
        : state === "focused"
          ? "border-[var(--input-field-color-border-focused)]"
          : "border-[var(--input-field-color-border-default)]";

  // Every type shares one fixed 52px row height — matching the Figma
  // file's own container size exactly, rather than letting any type (e.g.
  // prefix-input's 2-line focused/filled/error state) grow taller than its
  // siblings. The label+value stack below uses tightened line-heights so
  // both lines actually fit inside the fixed box instead of being clipped.
  const containerClasses = [
    "flex h-[52px] w-full items-center gap-1 rounded-[var(--input-field-corner-radius)]",
    "border-[1.5px] border-solid px-[var(--surface-padding-m)] py-[var(--surface-padding-s)]",
    "bg-[var(--input-field-color-surface)]",
    isDisabled ? "opacity-60" : "",
    borderColor,
  ].join(" ");

  // Classes that visually collapse a still-mounted, still-focusable control
  // to nothing — used for the label-only default state.
  const collapse = "h-0 overflow-hidden opacity-0 pointer-events-none";

  const controlTextClasses =
    "w-full truncate bg-transparent text-[length:var(--type-title-medium-size)] leading-[18px] text-[color:var(--input-field-color-input-text)] outline-none";

  const labelRow = (
    <label
      htmlFor={inputId}
      className="flex items-center gap-0.5 text-[length:var(--type-body-medium-size)] leading-[13px] text-[color:var(--input-field-color-input-label)]"
    >
      {label}
      {mandatory && (
        <span className="text-[color:var(--input-field-color-mandatory-indicator)]">*</span>
      )}
    </label>
  );

  const focusHandlers = {
    onFocus: (e: React.FocusEvent<HTMLInputElement>) => {
      setFocused(true);
      onFocus?.(e);
    },
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => {
      setFocused(false);
      onBlur?.(e);
    },
  };

  let control: ReactNode;
  let trailingIcon: ReactNode = null;
  let leadingPersistent: ReactNode = null;

  if (type === "dropdown-input") {
    // Tapping the field opens a bottom sheet listing every option instead of
    // a native <select> popup — matches the app's real mobile picker pattern.
    control = (
      <button
        type="button"
        id={inputId}
        disabled={isDisabled}
        onClick={() => {
          setFocused(true);
          setSheetOpen(true);
        }}
        className={[controlTextClasses, "text-left", showValueRow ? "" : collapse].join(" ")}
      >
        {dropdownValue || " "}
      </button>
    );
    trailingIcon = <CaretDownIcon />;
  } else if (type === "otp-input") {
    // No label row and no wrapping bordered container for this type — the
    // boxes themselves are the whole control, always visible, each with a
    // "-" placeholder when empty. Only the box a user is actually focused
    // in gets the focused border (native :focus), independent of the
    // overall computed `state` — matches the file, where only "error"
    // recolors every box at once.
    const otpBoxBorder =
      state === "error"
        ? "border-[var(--input-field-color-border-error)]"
        : "border-[var(--input-field-color-border-default)]";
    const digits = Array.from({ length: otpLength }, (_, i) => otpValue[i] ?? "");
    control = (
      <div className="flex gap-2">
        {digits.map((digit, i) => (
          <input
            key={i}
            id={i === 0 ? inputId : `${inputId}-${i}`}
            ref={(el) => (otpRefs.current[i] = el)}
            disabled={isDisabled}
            inputMode="numeric"
            maxLength={1}
            placeholder="-"
            value={digit}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onChange={(e) => {
              const char = e.target.value.replace(/\D/g, "").slice(-1);
              const next = digits.slice();
              next[i] = char;
              onOtpChange?.(next.join(""));
              if (char && i < otpLength - 1) otpRefs.current[i + 1]?.focus();
            }}
            onKeyDown={(e) => {
              if (e.key === "Backspace" && !digits[i] && i > 0) {
                otpRefs.current[i - 1]?.focus();
              }
            }}
            className={[
              // Fixed height matches every other type's 52px row exactly —
              // only the width is narrower, so the whole grid lines up.
              "h-[52px] w-10 shrink-0 rounded-[var(--input-field-corner-radius)] border-[1.5px] border-solid",
              "bg-[var(--input-field-color-surface)] text-center text-[length:var(--type-title-medium-size)]",
              "text-[color:var(--input-field-color-input-text)] outline-none",
              "placeholder:text-[color:var(--input-field-color-input-label)]",
              "focus:border-[var(--input-field-color-border-focused)]",
              otpBoxBorder,
            ].join(" ")}
          />
        ))}
      </div>
    );
  } else if (type === "prefix-input") {
    // Persistent country selector (flag + caret) — always visible regardless
    // of state.
    leadingPersistent = (
      <span className="flex shrink-0 items-center gap-0.5 pr-1 text-[color:var(--input-field-color-input-text)]">
        <span aria-hidden>🇮🇳</span>
        <CaretDownIcon />
      </span>
    );
    control = (
      <div className={["flex items-center gap-1", showValueRow ? "" : collapse].join(" ")}>
        <span className="shrink-0 text-[length:var(--type-title-medium-size)] leading-[18px] text-[color:var(--input-field-color-input-text)]">
          {prefix}
        </span>
        <input
          id={inputId}
          disabled={isDisabled}
          value={value}
          defaultValue={defaultValue}
          {...focusHandlers}
          className={controlTextClasses}
          {...rest}
        />
      </div>
    );
  } else if (type === "search-input") {
    control = (
      <input
        id={inputId}
        ref={searchInputRef}
        disabled={isDisabled}
        placeholder={label}
        value={value}
        defaultValue={defaultValue}
        {...focusHandlers}
        className={[
          controlTextClasses,
          "placeholder:text-[color:var(--input-field-color-input-label)]",
          state === "filled" ? "font-medium" : "font-normal",
        ].join(" ")}
        {...rest}
      />
    );
    // Filled swaps the magnifier for a clear (×) button, matching the file.
    trailingIcon =
      state === "filled" ? (
        <button
          type="button"
          aria-label="Clear search"
          className="flex size-5 shrink-0 items-center justify-center text-[color:var(--input-field-color-icon)]"
          onClick={() => {
            const el = searchInputRef.current;
            if (el) {
              const setter = Object.getOwnPropertyDescriptor(
                window.HTMLInputElement.prototype,
                "value",
              )?.set;
              setter?.call(el, "");
              el.dispatchEvent(new Event("input", { bubbles: true }));
              el.focus();
            }
            onClear?.();
          }}
        >
          <ClearIcon />
        </button>
      ) : (
        <SearchIcon />
      );
  } else {
    // text-input / action-input
    control = (
      <input
        id={inputId}
        disabled={isDisabled}
        value={value}
        defaultValue={defaultValue}
        {...focusHandlers}
        className={[controlTextClasses, showValueRow ? "" : collapse].join(" ")}
        {...rest}
      />
    );
    if (type === "action-input") {
      trailingIcon = (
        <button
          type="button"
          onClick={onAction}
          disabled={isDisabled}
          aria-label="Input action"
          className="flex size-9 shrink-0 items-center justify-center rounded [&_svg]:size-7 text-[color:var(--input-field-color-icon)]"
        >
          {actionIcon}
        </button>
      );
    }
  }

  return (
    <div className={["flex w-full flex-col items-start gap-1", className].join(" ")}>
      {type === "otp-input" ? (
        // No wrapping bordered container here — Figma just lays the boxes
        // out directly, each box carrying its own border.
        control
      ) : (
        <div className={containerClasses}>
          {leadingPersistent}
          <div className="flex min-w-0 flex-1 flex-col justify-center gap-0">
            {type === "search-input" ? control : labelRow}
            {type !== "search-input" && control}
          </div>
          {trailingIcon}
        </div>
      )}
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
      {type === "dropdown-input" && (
        <BottomSheet
          open={sheetOpen}
          onClose={() => {
            setSheetOpen(false);
            setFocused(false);
          }}
          headerText={sheetTitle ?? label}
          showResetButton={false}
          showSearch={false}
          showActions={false}
        >
          <div className="flex w-full flex-col items-start py-2">
            {options.map((opt) => {
              const isSelected = opt === dropdownValue;
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => {
                    if (typeof value !== "string") setInternalDropdownValue(opt);
                    onOptionSelect?.(opt);
                    setSheetOpen(false);
                    setFocused(false);
                  }}
                  className="flex h-12 w-full items-center justify-between px-4 py-2 text-left text-[length:var(--type-title-medium-size)] leading-[var(--type-title-medium-line-height)] font-medium text-[color:var(--typography-color-primary)]"
                >
                  <span>{opt}</span>
                  {isSelected && <CheckIcon />}
                </button>
              );
            })}
          </div>
        </BottomSheet>
      )}
    </div>
  );
}
