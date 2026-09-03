import { NotificationTypeIcon } from "../Notification/Notification";
import type { NotificationType } from "../Notification/Notification";

export interface ToastProps {
  text?: string;
  type?: NotificationType;
  icon?: boolean;
  cta?: string | false;
  onCtaClick?: () => void;
  className?: string;
}

/**
 * Toast — LehLah Design System
 * Figma: component set `Toast` (node 824:240). Dark, floating, single-line
 * snackbar with an optional icon + CTA button. Use for transient feedback;
 * use <Notification /> for anything that should stay inline on the page.
 * @category Feedback
 */
export default function Toast({
  text = "Toast title text",
  type = "success",
  icon = true,
  cta = "CTA",
  onCtaClick,
  className = "",
}: ToastProps) {
  return (
    <div
      role="status"
      className={[
        "flex max-w-[358px] items-center gap-1 rounded-[var(--notification-corner-radius)]",
        "bg-[var(--notification-content-solid-black)] px-[var(--notification-padding-horizontal)] py-[var(--notification-padding-vertical)]",
        className,
      ].join(" ")}
    >
      {icon && (
        <span className="shrink-0 text-[color:var(--notification-content-solid-white)] [&_svg]:size-4">
          <NotificationTypeIcon type={type} />
        </span>
      )}
      <p className="flex-1 truncate text-[length:var(--type-body-medium-size)] leading-[var(--type-body-medium-line-height)] font-medium text-[color:var(--notification-content-solid-white)]">
        {text}
      </p>
      {cta && (
        <button
          type="button"
          onClick={onCtaClick}
          className="shrink-0 rounded-[var(--button-radius-small)] bg-[#333333] px-2 py-0.5 text-[length:var(--type-body-medium-size)] leading-[var(--type-body-medium-line-height)] font-medium text-[color:var(--notification-content-solid-white)]"
        >
          {cta}
        </button>
      )}
    </div>
  );
}
