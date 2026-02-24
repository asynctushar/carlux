"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

const ThemeToggle = () => {
    const { setTheme, resolvedTheme } = useTheme();

    const onToggle = () => {
        setTheme(resolvedTheme === "light" ? "dark" : "light");
    };

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            className="h-8 w-8 cursor-pointer text-muted-foreground hover:text-foreground hover:bg-accent"
            aria-label="Toggle theme"
        >
            {resolvedTheme === "light" ? (
                <Moon className="h-4 w-4 transition-transform duration-200" />
            ) : (
                <Sun className="h-4 w-4 transition-transform duration-200" />
            )}
            <span className="sr-only">Toggle theme</span>
        </Button>
    );
};

export default ThemeToggle;