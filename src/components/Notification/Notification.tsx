import type { ReactNode } from "react";

export type NotificationType = "info" | "success" | "warning" | "error";

export interface NotificationProps {
  headline?: string;
  subtext?: string;
  type?: NotificationType;
  className?: string;
}

const STYLE: Record<NotificationType, { bg: string; border: string; content: string }> = {
  info: {
    bg: "bg-[var(--notification-background-tonal-info)]",
    border: "border-[var(--notification-border-info)]",
    content: "text-[color:var(--notification-content-info)]",
  },
  success: {
    bg: "bg-[var(--notification-background-tonal-success)]",
    border: "border-[var(--notification-border-success)]",
    content: "text-[color:var(--notification-content-success)]",
  },
  warning: {
    bg: "bg-[var(--notification-background-tonal-warning)]",
    border: "border-[var(--notification-border-warning)]",
    content: "text-[color:var(--notification-content-warning)]",
  },
  error: {
    bg: "bg-[var(--notification-background-tonal-error)]",
    border: "border-[var(--notification-border-error)]",
    content: "text-[color:var(--notification-content-error)]",
  },
};

/**
 * Placeholder glyphs. Swap for the real Phosphor Icons set (Info, CheckCircle,
 * Warning, XCircle) per the design system's iconography rule ("never mix icon
 * styles" — see docs/COMPONENTS.md).
 */
function TypeIcon({ type }: { type: NotificationType }) {
  const common = "size-6 shrink-0";
  if (type === "success")
    return (
      <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden>
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth={1.5} />
        <path d="M8 12.5l2.5 2.5L16 9.5" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  if (type === "warning" || type === "error")
    return (
      <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden>
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth={1.5} />
        <path d="M12 7v6" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
        <circle cx="12" cy="16.5" r="1" fill="currentColor" />
      </svg>
    );
  return (
    <svg viewBox="0 0 24 24" fill="none" className={common} aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth={1.5} />
      <path d="M12 11v5" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
      <circle cx="12" cy="7.5" r="1" fill="currentColor" />
    </svg>
  );
}

/**
 * Notification — LehLah Design System
 * Figma: component set `notification` (node 793:37). Inline banner-style
 * alert with icon + headline + subtext. For the toast/snackbar variant, see
 * the separate <Toast /> component.
 * @category Feedback
 */
export default function Notification({
  headline = "Notification headline text",
  subtext = "Notification subtext",
  type = "info",
  className = "",
}: NotificationProps) {
  const s = STYLE[type];
  return (
    <div
      className={[
        // the 0/0/4 @ 2% shadow is a raw value in Figma too — deliberately NOT
        // one of the surface/effect/drop-shadow tokens (those are 4/4/8 @ 8%).
        "flex w-[358px] items-center gap-2 rounded-[var(--surface-radius-m)] border border-solid px-3 py-2 shadow-[0px_0px_4px_rgba(0,0,0,0.02)]",
        s.bg,
        s.border,
        className,
      ].join(" ")}
    >
      <span className={s.content}>
        <TypeIcon type={type} />
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        {/* body/large/600 */}
        <p
          className={[
            "truncate font-semibold",
            "text-[length:var(--type-body-large-size)] leading-[var(--type-body-large-line-height)]",
            s.content,
          ].join(" ")}
        >
          {headline}
        </p>
        {/* body/medium/400 in typography/color/grey-dark — #666666, not the
            #808080 secondary this previously used */}
        <p className="truncate text-[length:var(--type-body-medium-size)] leading-[var(--type-body-medium-line-height)] text-[color:var(--typography-color-grey-dark)]">
          {subtext}
        </p>
      </div>
    </div>
  );
}

export { TypeIcon as NotificationTypeIcon };
