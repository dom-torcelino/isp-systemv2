'use client';

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

export default function CustomerLayout({ children }: { children: ReactNode }) {
  const { currentRole, userName, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Auth guard
    if (currentRole !== "Customer") {
      router.push("/"); // Redirect non-customers away
    }
  }, [currentRole, router]);

  if (currentRole !== "Customer") {
    return null; // or loading
  }

  // This is the customer portal header from your App.tsx
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 md:px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              ISP
            </div>
            <h2 className="text-lg font-semibold">Customer Portal</h2>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={logout}>Log Out</Button>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
              {userName.charAt(0)}
            </div>
          </div>
        </div>
      </header>
      <main className="p-4 md:p-6">{children}</main>
    </div>
  );
}