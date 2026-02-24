"use client";

import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/theme/theme-toggler";

interface DashboardNavbarProps {
    onMenuClick: () => void;
}

export default function DashboardNavbar({ onMenuClick }: DashboardNavbarProps) {
    const pathname = usePathname();

    const titleMap: Record<string, string> = {
        "/inventory": "Inventory",
    };

    const pageTitle = titleMap[pathname] ?? "Dashboard";

    return (
        <header className="sticky top-0 z-40 border-b border-border bg-sidebar backdrop-blur-sm">
            <div className="flex h-18 items-center gap-3 px-4 lg:px-8">
                {/* Mobile menu toggle */}
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={onMenuClick}
                    className="lg:hidden h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-accent"
                >
                    <Menu className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                </Button>

                {/* Page title */}
                <div className="flex-1">
                    <h1 className="text-base font-semibold tracking-tight text-foreground">
                        {pageTitle}
                    </h1>
                </div>

                {/* Right side actions */}
                <div className="flex items-center gap-2">
                    <ThemeToggle />
                </div>
            </div>
        </header>
    );
}