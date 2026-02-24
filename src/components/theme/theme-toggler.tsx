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
        <Button variant="default" size="icon" onClick={onToggle} className="cursor-pointer">
            {resolvedTheme === "light" ? (
                <Sun className="h-4 w-4" />
            ) : (
                <Moon className="h-4 w-4" />
            )}
            <span className="sr-only">Toggle theme</span>
        </Button>
    );
};

export default ThemeToggle;