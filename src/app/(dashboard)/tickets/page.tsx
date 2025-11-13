'use client';

import { useAuth } from '@/contexts/AuthContext';
import { TicketManagementPage } from '@/features/ticket/components/TicketManagementPage';
import { SupportTicketsPage } from '@/features/ticket/components/SupportTicketsPage';
import { useRouter } from 'next/navigation';

export default function TicketsPage() {
  const { currentRole } = useAuth();
  const router = useRouter();

  // This page handles navigation to ticket details
  const handleNavigateToDetails = (ticketId: string) => {
    router.push(`/tickets/${ticketId}`);
  };

  // This page renders the correct component based on the user's role
  switch (currentRole) {
    case 'System Admin':
      return <TicketManagementPage onNavigateToTicketDetails={handleNavigateToDetails} />;
    case 'Customer Support':
      return <SupportTicketsPage onNavigateToTicketDetails={handleNavigateToDetails} />;
    default:
      // You can add a loading state or redirect if a user lands here by mistake
      return null;
  }
}