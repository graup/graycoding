"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";

export function NavLink(props: ComponentProps<typeof Link>) {
  const currentPath = usePathname();

  return (
    <Link
      {...props}
      aria-current={currentPath === props.href ? "page" : undefined}
    />
  );
}
