import clsx from "clsx";
import type { ComponentPropsWithoutRef, ElementType } from "react";

type ContainerProps<T extends ElementType> = {
  as?: T;
} & ComponentPropsWithoutRef<T>;

/** Page-width wrapper: max-width 1280px with 24px side padding (DESIGN.md section 3). */
export function Container<T extends ElementType = "div">({ as, className, ...rest }: ContainerProps<T>) {
  const Component: ElementType = as ?? "div";
  return <Component className={clsx("container-page", className)} {...rest} />;
}
