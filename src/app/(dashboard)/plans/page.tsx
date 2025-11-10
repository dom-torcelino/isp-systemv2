// src/app/(dashboard)/plans/page.tsx
'use client';

// This is a Super Admin page
import { SaaSPlansPage } from "@/components/SaaSPlansPage";

export default function PlansPage() {
  // We can add role checks here if needed,
  // but the sidebar already hides the link.
  return <SaaSPlansPage />;
}