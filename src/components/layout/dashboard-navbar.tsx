"use client";

import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import React from "react";

interface DashboardNavbarProps {
    onMenuClick: () => void;
}

const DashboardNavbar = ({ onMenuClick }: DashboardNavbarProps) => {
    return (
        <header className="sticky lg:hidden top-0 z-40 border-b border-border bg-primary backdrop-blur-sm">
            <div className="flex h-18 items-center gap-3 px-4 lg:px-8">
                {/* Mobile menu toggle */}
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={onMenuClick}
                    className="lg:hidden h-8 w-8 text-primary-foreground/80 hover:text-accent hover:bg-primary/70"
                >
                    <Menu className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                </Button>

                {/* site name */}
                <div className="flex-1">
                    <h1 className="text-base font-semibold tracking-tight text-primary-foreground">
                        Carlux
                    </h1>
                </div>
            </div>
        </header>
    );
};

export default React.memo(DashboardNavbar);;