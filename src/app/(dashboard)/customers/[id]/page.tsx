'use client';

import { CustomerProfilePage } from "@/components/CustomerProfilePage";
import { useRouter } from 'next/navigation';

export default function CustomerProfile({ params }: { params: { id: string } }) {
  const router = useRouter();

  return (
    <CustomerProfilePage 
      customerId={params.id}
      onBack={() => router.back()} 
    />
  );
}