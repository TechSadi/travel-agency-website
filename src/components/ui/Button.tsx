import Link from "next/link";
import clsx from "clsx";
import type { ComponentProps, ReactNode } from "react";

export type ButtonVariant = "primary" | "outline" | "ghost-dark" | "white" | "whatsapp";
export type ButtonSize = "sm" | "md" | "lg";

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-brand border-brand text-white hover:bg-brand-dark hover:border-brand-dark hover:text-white",
  outline: "bg-transparent border-ink text-ink hover:bg-ink hover:text-white",
  "ghost-dark": "bg-white/8 border-white/70 text-white hover:bg-white/16 hover:text-white",
  white: "bg-white border-white text-ink hover:bg-paper hover:text-ink",
  whatsapp: "bg-whatsapp border-whatsapp text-white hover:brightness-95 hover:text-white",
};

// sm is 44px rather than DESIGN.md's 40px, the minimum touch target size.
const sizeClasses: Record<ButtonSize, string> = {
  sm: "min-h-11 px-4",
  md: "min-h-12 px-[22px]",
  lg: "min-h-[54px] px-7",
};

type CommonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  className?: string;
  children: ReactNode;
};

type ButtonAsLink = CommonProps & { href: string } & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">;
type ButtonAsButton = CommonProps & { href?: undefined } & Omit<ComponentProps<"button">, "className" | "children">;

export function buttonClasses(variant: ButtonVariant = "primary", size: ButtonSize = "md", className?: string) {
  return clsx(
    "inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-control border font-sans text-[1rem] font-medium no-underline transition-[color,background-color,border-color,scale] duration-(--duration-base) ease-out motion-safe:active:scale-[0.98]",
    variantClasses[variant],
    sizeClasses[size],
    className,
  );
}

export function Button(props: ButtonAsLink | ButtonAsButton) {
  const { variant, size, icon, className, children } = props;
  const classes = buttonClasses(variant, size, className);
  const content = (
    <>
      {icon}
      {children}
    </>
  );

  if (props.href !== undefined) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { variant: _v, size: _s, icon: _i, className: _c, children: _ch, ...rest } = props;
    return (
      <Link {...rest} className={classes}>
        {content}
      </Link>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { variant: _v, size: _s, icon: _i, className: _c, children: _ch, type = "button", ...rest } = props;
  return (
    <button {...rest} type={type} className={classes}>
      {content}
    </button>
  );
}
