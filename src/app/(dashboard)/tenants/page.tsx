'use client';

// This is a Super Admin page
import { TenantManagementPage } from "@/features/tenant/components/TenantManagementPage";

export default function TenantsPage() {
  // We can add role checks here if needed,
  // but the sidebar already hides the link.
  return <TenantManagementPage />;
}