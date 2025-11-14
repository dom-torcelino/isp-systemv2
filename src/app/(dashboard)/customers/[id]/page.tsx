// src/app/(dashboard)/customers/[id]/page.tsx

'use client';
import { CustomerProfilePage } from "@/features/customer/components/CustomerProfilePage";
import { useRouter, useParams } from 'next/navigation';

export default function CustomerProfile() {
  const router = useRouter();
  // 3. Get the params by calling the hook
  const params = useParams();
  
  // 4. Ensure params.id is a string
  const customerId = Array.isArray(params.id) ? params.id[0] : params.id;

  // THIS IS THE FIX:
  if (!customerId) {
    return null; 
  }

  return (
    <CustomerProfilePage 
      customerId={customerId} // 5. Use the ID from the hook
      onBack={() => router.back()} 
    />
  );
}