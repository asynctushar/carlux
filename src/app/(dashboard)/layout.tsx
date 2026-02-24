import type { ReactNode } from "react";
import DashboardLayout from "@/components/layout/dashboard-layout";

interface DashboardLayoutWrapperProps {
    children: ReactNode;
}

export default function Layout({ children }: DashboardLayoutWrapperProps) {
    return <DashboardLayout>{children}</DashboardLayout>;
}