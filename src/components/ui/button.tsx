import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "glow";
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
  glow:
    "relative isolate overflow-hidden border border-transparent bg-[linear-gradient(135deg,#0b4d66_0%,#0a3d52_48%,#0f6f8c_100%)] text-white shadow-[0_0_0_1px_rgba(255,255,255,0.12),0_0_28px_rgba(16,162,199,0.28)] before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:p-[1.5px] before:content-[''] before:bg-[linear-gradient(90deg,#24d8ff_0%,#8b5cf6_25%,#ff4fd8_50%,#ffd166_75%,#24d8ff_100%)] before:bg-[length:220%_100%] before:animate-[borderSweep_3.2s_linear_infinite] before:[mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] before:[mask-composite:exclude] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.18),0_0_40px_rgba(16,162,199,0.42)]",
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
        <span className="relative z-10">{children}</span>
      </a>
    );
  }

  const buttonProps = props as ButtonHTMLAttributes<HTMLButtonElement>;

  return (
    <button className={classes} {...buttonProps}>
      <span className="relative z-10">{children}</span>
    </button>
  );
}
