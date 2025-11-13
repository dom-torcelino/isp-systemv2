// src/app/(dashboard)/layout.tsx
'use client';

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { NavigationSidebar } from "@/components/layout/NavigationSidebar";
import { TopHeader } from "@/components/layout/TopHeader";

// These roles use the (dashboard) layout
const DASHBOARD_ROLES = ["Super Admin", "System Admin", "Customer Support", "IT"];

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { currentRole } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Auth guard for this layout
    if (currentRole === "Field Technician") {
      router.push("/jobs"); // Redirect to technician app
    } else if (currentRole === "Customer") {
      router.push("/portal"); // Redirect to customer portal
    }
  }, [currentRole, router]);

  // Don't render layout if role is not for this dashboard
  if (!DASHBOARD_ROLES.includes(currentRole)) {
    return null; // or a loading spinner
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden md:block ">
        <NavigationSidebar />
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <TopHeader />

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-4 md:p-6" role="main">
          {children}
        </main>
      </div>
    </div>
  );
}