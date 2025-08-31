"use client";

import * as React from "react";
import * as RadixSwitch from "@radix-ui/react-switch";
import { cn } from "@/lib/utils";

export function Switch({ className, ...props }: React.ComponentPropsWithoutRef<typeof RadixSwitch.Root>) {
  return (
    <RadixSwitch.Root
      className={cn(
        "peer inline-flex h-6 w-10 shrink-0 cursor-pointer items-center rounded-full border border-[var(--border)] bg-[var(--primary)] p-0.5 transition-colors data-[state=checked]:bg-accent dark:bg-[var(--dark-primary)]",
        className
      )}
      {...props}
    >
      <RadixSwitch.Thumb className="block h-5 w-5 rounded-full bg-[var(--secondary)] transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0 dark:bg-[var(--dark-secondary)]" />
    </RadixSwitch.Root>
  );
}