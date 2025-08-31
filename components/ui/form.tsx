"use client";

import * as React from "react";
import { FormProvider, useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";

export function Form({ children, methods, onSubmit }: { children: React.ReactNode; methods: any; onSubmit: any }) {
  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit} className="space-y-4">
        {children}
      </form>
    </FormProvider>
  );
}

export function FormField({ name, children }: { name: string; children: (field: any) => React.ReactNode }) {
  const { register, formState } = useFormContext();
  const error = (formState.errors as any)?.[name]?.message as string | undefined;
  return (
    <div className="space-y-2">
      {children(register(name))}
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}

export function FormItem({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("space-y-2", className)} {...props} />;
}

export function FormLabel(props: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return <label className="text-sm font-medium" {...props} />;
}

export function FormMessage({ children }: { children?: React.ReactNode }) {
  return children ? <p className="text-xs text-red-600">{children}</p> : null;
}