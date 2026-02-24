"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import Sidebar from "./sidebar";
import DashboardNavbar from "./dashboard-navbar";
import { Sheet, SheetContent } from "@/components/ui/sheet";

interface DashboardLayoutProps {
    children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    const [mobileOpen, setMobileOpen] = useState(false);
    const closeMobile = () => setMobileOpen(false);

    return (
        <div className="flex h-screen overflow-hidden bg-background">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:flex w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar">
                <Sidebar />
            </aside>

            {/* Mobile Sidebar Drawer */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                <SheetContent side="left" className="p-0 w-64 bg-sidebar border-r border-sidebar-border">
                    <Sidebar onNavigate={closeMobile} />
                </SheetContent>
            </Sheet>

            {/* Main Content Area */}
            <div className="flex flex-1 flex-col overflow-hidden">
                <DashboardNavbar onMenuClick={() => setMobileOpen(true)} />
                <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-background">
                    {children}
                </main>
            </div>
        </div>
    );
}