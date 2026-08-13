import type { ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonSize = "small" | "medium" | "large";
export type ButtonVariant =
  | "filled"
  | "outlined"
  | "subtle"
  | "ghost"
  | "destructive"
  | "success"
  | "disabled";

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type" | "children"> {
  /** Visible label. */
  children?: ReactNode;
  /** Visual style — maps 1:1 to the Figma `type` variant on the `button` component set. */
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Optional icon rendered before/after the label (pass any glyph — LinkSimple in Figma is a placeholder). */
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const RADIUS: Record<ButtonSize, string> = {
  small: "rounded-[var(--button-radius-small)]",
  medium: "rounded-[var(--button-radius-small)]",
  large: "rounded-[var(--button-radius-large)]",
};

const PADDING: Record<ButtonSize, string> = {
  small:
    "px-[var(--button-padding-horizontal-small)] py-[var(--button-padding-vertical-small)]",
  medium:
    "px-[var(--button-padding-horizontal-medium)] py-[var(--button-padding-vertical-medium)]",
  large:
    "px-[var(--button-padding-horizontal-large)] py-[var(--button-padding-vertical-large)]",
};

const TEXT_SIZE: Record<ButtonSize, string> = {
  small: "text-[length:var(--type-body-medium-size)] leading-[var(--type-body-medium-line-height)]",
  medium: "text-[length:var(--type-title-medium-size)] leading-[var(--type-title-medium-line-height)]",
  large: "text-[length:var(--type-title-large-size)] leading-[var(--type-title-large-line-height)]",
};

const VARIANT: Record<ButtonVariant, string> = {
  filled:
    "bg-[var(--button-color-filled-background)] text-[color:var(--button-color-filled-content)] hover:brightness-110 active:brightness-90",
  outlined:
    "bg-[var(--button-color-outlined-background)] text-[color:var(--button-color-outlined-content)] border-[1.5px] border-[var(--button-color-outlined-border)] border-solid hover:bg-black/[0.03] active:bg-black/[0.08]",
  subtle:
    "bg-[var(--button-color-subtle-background)] text-[color:var(--button-color-subtle-content)] hover:brightness-95 active:brightness-90",
  ghost:
    "bg-transparent text-[color:var(--button-color-ghost-content)] hover:bg-black/[0.04] active:bg-black/[0.08]",
  destructive:
    "bg-[var(--button-color-destructive-background)] text-[color:var(--button-color-destructive-content)] hover:brightness-110 active:brightness-90",
  success:
    "bg-[var(--button-color-success-background)] text-[color:var(--button-color-success-content)] hover:brightness-110 active:brightness-90",
  disabled:
    "bg-[var(--button-color-disabled-background)] text-[color:var(--button-color-disabled-content)] cursor-not-allowed",
};

/**
 * Button — LehLah Design System
 *
 * Figma: component set `button` (node 302:641). 3 sizes x 7 visual variants,
 * default/pressed states are expressed here via native `:hover`/`:active`
 * instead of a separate `state` prop, since that maps better to real DOM usage.
 */
export default function Button({
  children = "Button Text",
  variant = "filled",
  size = "large",
  leftIcon,
  rightIcon,
  className = "",
  disabled,
  ...rest
}: ButtonProps) {
  const isDisabled = disabled || variant === "disabled";
  return (
    <button
      type="button"
      disabled={isDisabled}
      className={[
        "inline-flex items-center justify-center gap-[var(--surface-spacing-s)]",
        "font-medium whitespace-nowrap transition-[filter,background-color]",
        RADIUS[size],
        PADDING[size],
        TEXT_SIZE[size],
        VARIANT[isDisabled ? "disabled" : variant],
        className,
      ].join(" ")}
      {...rest}
    >
      {leftIcon}
      {children}
      {rightIcon}
    </button>
  );
}
