'use client';

import { TechnicianMapView } from '@/features/technician-mobile/component/TechnicianMapView'; 
import { useRouter } from 'next/navigation';

export default function MapPage() {
  const router = useRouter();

  const handleViewDetails = (jobId: string) => {
    // router.push(`/jobs/${jobId}`);
    alert(`Viewing job ${jobId}`);
  };
  
  return <TechnicianMapView onViewDetails={() => handleViewDetails} />;
}