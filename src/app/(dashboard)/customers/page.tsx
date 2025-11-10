'use client';

import { useAuth } from '@/contexts/AuthContext';
import { CustomerManagementPage } from '@/components/CustomerManagementPage';
import { SupportCustomersPage } from '@/components/SupportCustomersPage';
import { useRouter } from 'next/navigation';

export default function CustomersPage() {
  const { currentRole } = useAuth();
  const router = useRouter();

  const handleNavigateToProfile = (customerId: string) => {
    router.push(`/customers/${customerId}`);
  };

  switch (currentRole) {
    case 'System Admin':
      return <CustomerManagementPage onNavigateToCustomerProfile={handleNavigateToProfile} />;
    case 'Customer Support':
      return <SupportCustomersPage onNavigateToCustomerProfile={handleNavigateToProfile} />;
    default:
      return null;
  }
}