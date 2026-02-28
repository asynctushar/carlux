"use client";

import React, { useState } from "react";
import type { ReactNode } from "react";
import Sidebar from "./sidebar";
import DashboardNavbar from "./dashboard-navbar";
import { Sheet, SheetContent } from "@/components/ui/sheet";

interface DashboardLayoutProps {
    children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const closeMobile = () => setMobileOpen(false);

    return (
        <div className="flex h-screen bg-background lg:p-4 lg:gap-4">

            {/* Desktop Sidebar — fixed height, never scrolls */}
            <aside className="hidden lg:flex w-64 shrink-0 flex-col rounded-xl overflow-hidden">
                <Sidebar />
            </aside>

            {/* Mobile Sidebar Drawer */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                <SheetContent side="left" className="p-0 w-64 bg-sidebar border-r border-sidebar-border">
                    <Sidebar onNavigate={closeMobile} />
                </SheetContent>
            </Sheet>

            <div className="flex flex-1 flex-col overflow-hidden lg:rounded-xl">
                <DashboardNavbar onMenuClick={() => setMobileOpen(true)} />

                {/* Scrollable content area */}
                <main className="flex-1 overflow-y-auto bg-sidebar">
                    {children}
                </main>

            </div>
        </div>
    );
};

export default React.memo(DashboardLayout);