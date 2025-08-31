"use client";

import * as React from "react";
import * as RadixDialog from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";

export const Sheet = RadixDialog.Root;
export const SheetTrigger = RadixDialog.Trigger;
export const SheetClose = RadixDialog.Close;

export function SheetContent({ side = "right", className, children }: { side?: "left" | "right"; className?: string; children: React.ReactNode }) {
  return (
    <RadixDialog.Portal>
      <RadixDialog.Overlay className="fixed inset-0 z-40 bg-black/30" />
      <RadixDialog.Content
        className={cn(
          "fixed z-50 h-full w-[85vw] max-w-sm border border-[var(--border)] bg-[var(--primary)] p-6 shadow-lg outline-none dark:bg-[var(--dark-primary)]",
          side === "right" ? "right-0 top-0" : "left-0 top-0",
          className
        )}
      >
        {children}
      </RadixDialog.Content>
    </RadixDialog.Portal>
  );
}