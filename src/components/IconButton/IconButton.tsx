import type { ButtonHTMLAttributes, ReactNode } from "react";

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  "aria-label": string;
}

/**
 * IconButton — LehLah Design System
 * Figma: `action` component set (node referenced inside input-field's
 * action-input variant) — a bare 36x36 icon-only tap target used inline in
 * inputs, cards (copy/delete affordances), and toolbars.
 * @category Actions
 */
export default function IconButton({ icon, className = "", ...rest }: IconButtonProps) {
  return (
    <button
      type="button"
      className={[
        "flex size-9 items-center justify-center rounded [&_svg]:size-7",
        "text-[color:var(--typography-color-primary)] hover:bg-black/[0.04] active:bg-black/[0.08]",
        className,
      ].join(" ")}
      {...rest}
    >
      {icon}
    </button>
  );
}
