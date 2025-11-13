'use client';

import { CustomerProfilePage } from "@/features/customer/components/CustomerProfilePage";
import { useRouter } from 'next/navigation';

export default function CustomerProfile({ params }: { params: any }) {
  const router = useRouter();

  return (
    <CustomerProfilePage 
      customerId={params.id}
      onBack={() => router.back()} 
    />
  );
}