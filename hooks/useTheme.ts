"use client";

import { useTheme as useNextTheme } from "next-themes";

export const useTheme = () => {
  const { theme, setTheme, systemTheme, resolvedTheme } = useNextTheme();
  const toggle = () => setTheme(resolvedTheme === "dark" ? "light" : "dark");
  return { theme, setTheme, systemTheme, resolvedTheme, toggle };
};