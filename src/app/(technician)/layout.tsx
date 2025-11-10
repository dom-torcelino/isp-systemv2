'use client';

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { TechnicianBottomNav } from "@/components/layout/TechnicianBottomNav";
import { TopHeader } from "@/components/layout/TopHeader"; // We can reuse the header for role-switching demo

export default function TechnicianLayout({ children }: { children: ReactNode }) {
  const { currentRole } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Auth guard
    if (currentRole !== "Field Technician") {
      router.push("/"); // Redirect non-techs away
    }
  }, [currentRole, router]);

  if (currentRole !== "Field Technician") {
    return null; // or loading
  }

  // This is the minimal layout from your App.tsx
  return (
    <div className="min-h-screen bg-background">
      {/* We add TopHeader just for the demo role-switcher */}
      <TopHeader pageTitle="Field Technician" />
      <main className="p-4 md:p-6 pb-20">{children}</main>
      <TechnicianBottomNav />
    </div>
  );
}