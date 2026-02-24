"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Car, LayoutDashboard, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface SidebarProps {
    onNavigate?: () => void;
}

export default function Sidebar({ onNavigate }: SidebarProps) {
    const pathname = usePathname();

    const navItems = [
        {
            href: "/inventory",
            label: "Inventory",
            icon: LayoutGrid,
        },
    ];

    return (
        <div className="flex h-full flex-col bg-card">
            {/* Logo */}
            <div className="border-b px-6 py-5">
                <Link
                    href="/inventory"
                    className="flex items-center gap-3"
                >
                    <Image
                        src="/apple-touch-icon.png"
                        alt="Carlux Logo"
                        width={28}
                        height={28}
                        priority
                    />
                    <span className="text-lg font-semibold tracking-tight">
                        Carlux
                    </span>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-1 p-4">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;

                    return (
                        <Button
                            key={item.href}
                            variant={isActive ? "default" : "ghost"}
                            className="w-full justify-start gap-3"
                            asChild
                        >
                            <Link href={item.href} onClick={onNavigate}>
                                <item.icon className="h-5 w-5" />
                                {item.label}
                            </Link>
                        </Button>
                    );
                })}
            </nav>
        </div>
    );
}