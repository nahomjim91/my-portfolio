"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { resolvedTheme, toggle } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  // Only render the icon after mounting to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = resolvedTheme === "dark";

  return (
    <Button variant="outline" size="icon" aria-label="Toggle theme" onClick={toggle}>
      {/* Render a placeholder or both icons with visibility control during SSR */}
      {!mounted ? (
        // Render a neutral state during SSR - you can use Sun as default
        <Sun className="h-4 w-4" />
      ) : (
        // Render the actual theme icon after hydration
        isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />
      )}
    </Button>
  );
}