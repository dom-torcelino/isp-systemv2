'use client';

import { useAuth } from "@/contexts/AuthContext";
// Import all your dashboard components
import { SuperAdminDashboard } from "@/features/dashboard/components/SuperAdminDashboard";
import { SystemAdminDashboard } from "@/features/dashboard/components/SystemAdminDashboard";
import { CustomerSupportDashboard } from "@/features/dashboard/components/CustomerSupportDashboard";
import { ITOperationsDashboard } from "@/features/dashboard/components/ITOperationsDashboard";

export default function DashboardHomePage() {
  const { currentRole } = useAuth();

  // This page now renders the correct dashboard based on the user's role
  // This replaces the "dashboard" case in your old switch statement
  switch (currentRole) {
    case "Super Admin":
      return <SuperAdminDashboard />;
    case "System Admin":
      return <SystemAdminDashboard />;
    case "Customer Support":
      return <CustomerSupportDashboard />;
    case "IT":
      return <ITOperationsDashboard />;
    default:
      // This can be a loading spinner or skeleton component
      return <div>Loading...</div>; 
  }
}