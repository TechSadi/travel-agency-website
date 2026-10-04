import clsx from "clsx";
import type { ComponentPropsWithoutRef, ElementType } from "react";

type ContainerProps<T extends ElementType> = {
  as?: T;
} & ComponentPropsWithoutRef<T>;

/** Page-width wrapper: 1280px content width with the responsive gutter from `container-page` in globals.css. */
export function Container<T extends ElementType = "div">({ as, className, ...rest }: ContainerProps<T>) {
  const Component: ElementType = as ?? "div";
  return <Component className={clsx("container-page", className)} {...rest} />;
}
