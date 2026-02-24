"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

const ThemeToggle = () => {
    const { setTheme, resolvedTheme } = useTheme();
    const isDark = resolvedTheme === "dark";

    return (
        <div className="flex items-center justify-between rounded-lg bg-sidebar-accent/50 px-3 py-2.5">
            <span className="text-xs font-medium text-muted-foreground">
                Appearance
            </span>

            <button
                onClick={() => setTheme(isDark ? "light" : "dark")}
                aria-label="Toggle theme"
                className={cn(
                    "relative flex h-7 w-13 items-center rounded-full border transition-colors duration-300 cursor-pointer",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
                    isDark
                        ? "border-sidebar-border bg-primary/20"
                        : "border-sidebar-border bg-background"
                )}
            >
                {/* Sliding thumb */}
                <span
                    className={cn(
                        "absolute flex h-5 w-5 items-center justify-center rounded-full shadow-sm transition-all duration-300",
                        isDark
                            ? "left-6 bg-primary text-primary-foreground"
                            : "left-1 bg-foreground text-background"
                    )}
                >
                    {isDark ? (
                        <Moon className="h-3 w-3" />
                    ) : (
                        <Sun className="h-3 w-3" />
                    )}
                </span>

                {/* Track ghost icons */}
                <Sun className={cn(
                    "absolute left-1 h-3 w-3 transition-opacity duration-200",
                    isDark ? "opacity-40 text-muted-foreground" : "opacity-0"
                )} />
                <Moon className={cn(
                    "absolute right-1 h-3 w-3 transition-opacity duration-200",
                    isDark ? "opacity-0" : "opacity-40 text-muted-foreground"
                )} />
            </button>
        </div>
    );
};

export default ThemeToggle;