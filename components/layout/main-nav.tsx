/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import React, { useEffect, useState } from "react";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ModeToggle } from "@/components/mode-toggle";
import { cn } from "@/lib/utils";

export default function MainNav() {
  const pathname = usePathname();
  return (
    <header className="fixed top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav
        className="flex items-center justify-between px-3 py-3"
        aria-label="Global"
      >
        <div className="flex items-center gap-x-4  sm:gap-x-2 md:gap-x-4 lg:gap-x-4">
          <h1 className="text-xl font-bold text-foreground">OPIN</h1>
          <div className="flex items-center pl-3 gap-x-4">
            <Link
              href="/"
              className={cn(
                "text-sm font-light transition-colors hover:text-foreground/80",
                pathname === "/" ? "text-foreground" : "text-foreground/60"
              )}
            >
              Search
            </Link>
            <Link
              href="/about"
              className={cn(
                "text-sm font-light transition-colors hover:text-foreground/80",
                pathname === "/resume"
                  ? "text-foreground"
                  : "text-foreground/60"
              )}
            >
              About
            </Link>
          </div>
        </div>

        <ModeToggle />
      </nav>
    </header>
  );
}
