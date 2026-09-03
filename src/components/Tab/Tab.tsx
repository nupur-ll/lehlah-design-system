import type { ReactNode } from "react";

export type TabType = "pill" | "underlined";

export interface TabProps {
  children?: ReactNode;
  type?: TabType;
  selected?: boolean;
  icon?: ReactNode;
  className?: string;
  onClick?: () => void;
}

/**
 * Tab — LehLah Design System
 * Figma: component set `tab` (node 992:2900). Two visual families — `pill`
 * (rounded, filled when selected) and `underlined` (flat, bottom-border when
 * selected) — each with a default/selected state.
 * @category Navigation
 */
export default function Tab({
  children = "Tab Name",
  type = "pill",
  selected = false,
  icon,
  className = "",
  onClick,
}: TabProps) {
  const base = "inline-flex items-center justify-center gap-1 px-3 py-2 text-[12px] leading-[1.35]";
  const pill = selected
    ? "rounded-[20px] bg-[var(--selection-control-tab-background-selected)] text-[color:var(--selection-control-content-white)]"
    : "rounded-[20px] border border-solid border-[var(--selection-control-border-grey)] bg-[var(--selection-control-background)] text-[color:var(--selection-control-content-dark)]";
  const underlined = selected
    ? "border-b-2 border-solid border-[var(--selection-control-border-dark)] bg-[var(--surface-color-container-white)] text-[color:var(--selection-control-content-dark)]"
    : "border-b border-solid border-[var(--selection-control-border-grey)] bg-[var(--surface-color-container-white)] text-[color:var(--selection-control-content-grey)]";

  return (
    <button
      type="button"
      role="tab"
      aria-selected={selected}
      onClick={onClick}
      className={[base, type === "pill" ? pill : underlined, className].join(" ")}
    >
      {icon}
      {children}
    </button>
  );
}
