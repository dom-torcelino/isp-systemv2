'use client';

import { TechnicianSchedulePage } from "@/components/TechnicianSchedulePage";
import { useRouter } from 'next/navigation';

export default function SchedulePage() {
  const router = useRouter();
  
  const handleViewDetails = (jobId: string) => {
    // You would navigate to a dynamic job page
    // router.push(`/jobs/${jobId}`);
    alert(`Viewing job ${jobId}`);
  };

  return <TechnicianSchedulePage onViewDetails={() => handleViewDetails} />;
}