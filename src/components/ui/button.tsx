import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md";

type ButtonProps = {
  href?: string;
  children: ReactNode;
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
} & Omit<
  AnchorHTMLAttributes<HTMLAnchorElement> & ButtonHTMLAttributes<HTMLButtonElement>,
  "children" | "className" | "href"
>;

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-[color:var(--accent)] text-white shadow-[0_12px_28px_rgba(16,162,199,0.16)] hover:bg-[color:var(--accent-strong)]",
  secondary:
    "border border-[color:var(--accent-deep)] bg-[color:var(--accent-deep)] text-white shadow-[0_12px_28px_rgba(7,24,33,0.16)] hover:border-[color:var(--text)] hover:bg-[color:var(--text)]",
  ghost: "text-[color:var(--muted)] hover:text-[color:var(--text)]",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-10 px-4 text-[0.8125rem]",
  md: "h-12 px-5 text-sm",
};

export function Button({
  href,
  children,
  className,
  variant = "primary",
  size = "md",
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium tracking-[-0.01em] transition duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--background)]",
    variants[variant],
    sizes[size],
    className,
  );

  if (href) {
    const anchorProps = props as AnchorHTMLAttributes<HTMLAnchorElement>;
    const rel =
      anchorProps.target === "_blank"
        ? "noreferrer noopener"
        : anchorProps.rel;

    return (
      <a href={href} className={classes} rel={rel} {...anchorProps}>
        {children}
      </a>
    );
  }

  const buttonProps = props as ButtonHTMLAttributes<HTMLButtonElement>;

  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
