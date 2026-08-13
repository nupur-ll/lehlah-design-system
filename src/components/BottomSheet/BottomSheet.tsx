import type { ReactNode } from "react";
import Checkbox from "../Checkbox/Checkbox";

export interface FilterGroup {
  name: string;
  options: string[];
}

export interface BottomSheetProps {
  open: boolean;
  onClose: () => void;
  headerText?: string;
  showHeader?: boolean;
  showResetButton?: boolean;
  onReset?: () => void;
  showSearch?: boolean;
  searchPlaceholder?: string;
  /** left-hand filter categories + right-hand option list, as in the Figma "filter" bottom-sheet */
  filters?: FilterGroup[];
  activeFilter?: string;
  onFilterSelect?: (name: string) => void;
  selectedOptions?: string[];
  onOptionToggle?: (option: string) => void;
  showActions?: boolean;
  secondaryActionLabel?: string;
  primaryActionLabel?: string;
  onSecondaryAction?: () => void;
  onPrimaryAction?: () => void;
  children?: ReactNode;
  className?: string;
}

/**
 * BottomSheet — LehLah Design System
 * Figma: `bottom-sheet` (node 938:124) plus its nested filter-list content
 * (935:8109, 930:1298, 930:1354). Modeled here as a mobile-style filter
 * sheet: drag handle, optional header (title + "Reset Filters"), optional
 * search, a two-pane filter-category / checkbox-option list, and a sticky
 * Close/Apply action row. Pass `children` instead of `filters` to render
 * fully custom content in the scrollable area.
 */
export default function BottomSheet({
  open,
  onClose,
  headerText = "Filter By",
  showHeader = true,
  showResetButton = true,
  onReset,
  showSearch = true,
  searchPlaceholder = "Search here",
  filters = [],
  activeFilter,
  onFilterSelect,
  selectedOptions = [],
  onOptionToggle,
  showActions = true,
  secondaryActionLabel = "Close",
  primaryActionLabel = "Apply",
  onSecondaryAction,
  onPrimaryAction,
  children,
  className = "",
}: BottomSheetProps) {
  if (!open) return null;

  const active = filters.find((f) => f.name === activeFilter) ?? filters[0];

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40" role="dialog" aria-modal>
      <button
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 cursor-default"
      />
      <div
        className={[
          "relative flex w-[390px] max-w-full flex-col items-center rounded-t-[20px] bg-[var(--surface-color-page)] pt-3",
          className,
        ].join(" ")}
      >
        <div className="flex h-6 w-full items-center justify-center">
          <div className="h-2 w-[72px] rounded-full bg-[var(--color-grey-70)]" />
        </div>

        {showHeader && (
          <div className="flex w-full items-center border-b-[0.5px] border-solid border-[var(--border-color-grey)] px-5 pb-3 pt-2">
            <p className="flex-1 text-[length:var(--type-title-medium-size)] font-semibold leading-[var(--type-title-medium-line-height)] text-[color:var(--typography-color-primary)]">
              {headerText}
            </p>
            {showResetButton && (
              <button
                type="button"
                onClick={onReset}
                className="rounded-[var(--button-radius-small)] p-1 text-[length:var(--type-body-medium-size)] leading-[var(--type-body-medium-line-height)] font-medium text-[color:var(--button-color-ghost-content)]"
              >
                Reset Filters
              </button>
            )}
          </div>
        )}

        {showSearch && (
          <div className="w-full px-4 py-3">
            <div className="flex w-full items-center gap-1 rounded-lg border-[1.5px] border-solid border-[var(--input-field-color-border-default)] bg-[var(--input-field-color-surface)] py-3 pl-3 pr-2">
              <svg viewBox="0 0 24 24" fill="none" className="size-6 shrink-0 text-[color:var(--input-field-color-icon)]" aria-hidden>
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth={1.5} />
                <path d="M21 21l-4-4" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
              </svg>
              <input
                placeholder={searchPlaceholder}
                className="w-full bg-transparent text-[length:var(--type-body-medium-size)] leading-[var(--type-body-medium-line-height)] text-[color:var(--input-field-color-input-text)] outline-none placeholder:text-[color:var(--input-field-color-input-label)]"
              />
            </div>
          </div>
        )}

        <div className="max-h-[50vh] w-full overflow-y-auto">
          {children ??
            (filters.length > 0 && (
              <div className="flex w-full items-start bg-[var(--surface-color-container-white)]">
                <div className="flex w-[132px] max-w-[150px] shrink-0 flex-col gap-2 self-stretch border-r-[0.5px] border-solid border-[var(--border-color-grey)]">
                  {filters.map((f) => (
                    <button
                      key={f.name}
                      type="button"
                      onClick={() => onFilterSelect?.(f.name)}
                      className={[
                        "flex h-10 w-[132px] items-center px-4 py-2 text-center text-[length:var(--type-title-medium-size)] leading-[var(--type-title-medium-line-height)]",
                        f.name === active?.name
                          ? "border-l-4 border-solid border-[var(--typography-color-primary)] font-semibold text-[color:var(--typography-color-primary)]"
                          : "font-medium text-[color:var(--typography-color-primary)]",
                      ].join(" ")}
                    >
                      {f.name}
                    </button>
                  ))}
                </div>
                <div className="flex flex-1 flex-col items-start py-2">
                  {active?.options.map((opt) => {
                    const checked = selectedOptions.includes(opt);
                    return (
                      <label
                        key={opt}
                        className="flex h-12 w-full items-center gap-3 px-4 py-2"
                      >
                        <Checkbox checked={checked} onChange={() => onOptionToggle?.(opt)} />
                        <span className="text-[length:var(--type-title-medium-size)] leading-[var(--type-title-medium-line-height)] font-medium text-[color:var(--typography-color-primary)]">
                          {opt}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
            ))}
        </div>

        {showActions && (
          <div className="flex w-full items-center justify-center gap-2 border-t-[0.5px] border-solid border-[var(--border-color-grey)] bg-[var(--surface-color-container-white)] p-4">
            <button
              type="button"
              onClick={onSecondaryAction ?? onClose}
              className="flex-1 rounded-[var(--button-radius-small)] border-[1.5px] border-solid border-[var(--button-color-outlined-border)] bg-[var(--button-color-outlined-background)] px-5 py-3 text-[length:var(--type-title-medium-size)] font-medium leading-[var(--type-title-medium-line-height)] text-[color:var(--button-color-outlined-content)]"
            >
              {secondaryActionLabel}
            </button>
            <button
              type="button"
              onClick={onPrimaryAction}
              className="flex-1 rounded-[var(--button-radius-small)] bg-[var(--button-color-filled-background)] px-5 py-3 text-[length:var(--type-title-medium-size)] font-medium leading-[var(--type-title-medium-line-height)] text-[color:var(--button-color-filled-content)]"
            >
              {primaryActionLabel}
            </button>
          </div>
        )}

        <div className="flex w-full flex-col items-center justify-end border-t border-solid border-[var(--color-grey-200)] py-3">
          <div className="h-[5px] w-[164px] rounded-full bg-[var(--color-grey-black)]" />
        </div>
      </div>
    </div>
  );
}
