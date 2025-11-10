'use client';

import { useAuth } from "@/contexts/AuthContext";
// Import all your dashboard components
import { SuperAdminDashboard } from "@/components/SuperAdminDashboard";
import { SystemAdminDashboard } from "@/components/SystemAdminDashboard";
import { CustomerSupportDashboard } from "@/components/CustomerSupportDashboard";
import { ITOperationsDashboard } from "@/components/ITOperationsDashboard";

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