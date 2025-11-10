'use client';

// Import the component that was rendered in your old switch statement
import { FieldTechnicianDashboardWrapper } from "@/components/FieldTechnicianDashboardWrapper";

// This is the landing page for the (technician) layout
export default function TechnicianJobsPage() {
  // We can add navigation logic here if needed
  const handleViewDetails = () => {
    // In a real app, you'd navigate to /jobs/[id]
    alert("Navigating to job details...");
  };

  return <FieldTechnicianDashboardWrapper onViewDetails={handleViewDetails} />;
}