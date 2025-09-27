"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

type NavLinkProps = {
  href: string;
  children: ReactNode;
  className: string
};

export function NavLink({ href, children    }: NavLinkProps) {
  const pathname = usePathname();
  // const isActive = pathname === href ;
   const isActive= pathname === href || (href !== "/dashboard" && pathname.startsWith(href));
  return (
    <Link
      href={href}
      className={`px-3 py-2 rounded w-full flex gap-1
        text-gray-500 hover:text-blue-600 hover:bg-blue-100
        ${isActive ? "bg-blue-500 text-white" : ""}`}
    >
      {children}
    </Link>
  );
}
