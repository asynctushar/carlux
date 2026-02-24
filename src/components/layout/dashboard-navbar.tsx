"use client";

import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/theme/theme-toggler";

interface DashboardNavbarProps {
    onMenuClick: () => void;
}

export default function DashboardNavbar({
    onMenuClick,
}: DashboardNavbarProps) {
    const pathname = usePathname();

    const titleMap: Record<string, string> = {
        "/inventory": "Inventory",
    };

    const pageTitle = titleMap[pathname] ?? "Dashboard";

    return (
        <nav className="sticky top-0 z-40 border-b bg-background">
            <div className="flex h-17 items-center px-4 lg:px-6">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={onMenuClick}
                    className="lg:hidden"
                >
                    <Menu className="h-5 w-5" />
                </Button>

                <div className="flex-1">
                    <h1 className="text-lg font-semibold tracking-tight">
                        {pageTitle}
                    </h1>
                </div>

                <ThemeToggle />
            </div>
        </nav>
    );
}