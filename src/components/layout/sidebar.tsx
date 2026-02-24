"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import ThemeToggle from "../theme/theme-toggler";
import React from "react";

interface SidebarProps {
    onNavigate?: () => void;
}

const Sidebar = ({ onNavigate }: SidebarProps) => {
    const pathname = usePathname();

    const navItems = [
        {
            href: "/inventory",
            label: "Inventory",
            icon: LayoutGrid,
        },
    ];


    return (
        <div className="flex h-full flex-col bg-sidebar text-sidebar-foreground">
            {/* Logo */}
            <div className="flex items-center gap-3 border-b border-sidebar-border px-5 py-5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary shadow-sm">
                    <Image
                        src="/apple-touch-icon.png"
                        alt="Carlux Logo"
                        width={20}
                        height={20}
                        priority
                        className="rounded"
                    />
                </div>
                <span className="text-base font-semibold tracking-tight text-sidebar-foreground">
                    Carlux
                </span>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-0.5 px-3 py-6">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={onNavigate}
                            className={cn(
                                "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-all duration-150",
                                isActive
                                    ? "bg-primary text-primary-foreground shadow-sm"
                                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                            )}
                        >
                            <item.icon
                                className={cn(
                                    "h-4 w-4 shrink-0",
                                    isActive ? "text-primary-foreground" : "text-muted-foreground"
                                )}
                            />
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            {/* Theme Toggle */}
            <div className="border-t border-sidebar-border px-4 py-4">
                <ThemeToggle />
            </div>
        </div>
    );
};

export default React.memo(Sidebar);