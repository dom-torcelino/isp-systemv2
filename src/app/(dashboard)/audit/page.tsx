// src/app/(dashboard)/audit/page.tsx
'use client';

import { useAuth } from '@/contexts/AuthContext';
import { GlobalAuditLogsPage } from '@/features/saas/components/GlobalAuditLogsPage'; 
import { TenantAuditLogPage } from '@/features/tenant/components/TenantAuditLogPage';

export default function AuditPage() {
  const { currentRole } = useAuth();

  // This page renders the correct component based on the user's role
  switch (currentRole) {
    case 'Super Admin':
      return <GlobalAuditLogsPage />;
    case 'System Admin':
      return <TenantAuditLogPage />;
    default:
      return null;
  }
}