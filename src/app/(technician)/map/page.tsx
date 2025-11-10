'use client';

import { TechnicianMapView } from "@/components/TechnicianMapView";
import { useRouter } from 'next/navigation';

export default function MapPage() {
  const router = useRouter();

  const handleViewDetails = (jobId: string) => {
    // router.push(`/jobs/${jobId}`);
    alert(`Viewing job ${jobId}`);
  };
  
  return <TechnicianMapView onViewDetails={() => handleViewDetails} />;
}