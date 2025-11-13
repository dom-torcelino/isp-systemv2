'use client';

import { useRouter } from 'next/navigation';
// Import the component that was rendered in your old switch statement
import { CustomerPortalDashboard } from "@/features/customer-portal/components/CustomerPortalDashboard";

// This is the landing page for the (customer) layout
export default function CustomerPortalPage() {
  const router = useRouter();

  const handleNavigateToBilling = () => {
    router.push('/billing-history'); // Example of real navigation
  };

  return <CustomerPortalDashboard onNavigateToBilling={handleNavigateToBilling} />;
}