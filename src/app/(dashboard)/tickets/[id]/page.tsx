'use client';

import { TicketDetailsPage } from '@/features/ticket/components/TicketDetailsPage'; 
import { useRouter } from 'next/navigation';

// This is a dynamic route page.
// The `[id]` in the folder name becomes a prop.
export default function TicketDetails({ params }: { params: any }) {
  const router = useRouter();

  return (
    <TicketDetailsPage 
      ticketId={params.id} // You can pass the ID to the component
      onBack={() => router.back()} // Use router.back() for navigation
    />
  );
}