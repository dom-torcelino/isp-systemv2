import { useState } from "react";
import { MapPin, Calendar } from "lucide-react";
import { DataTable } from "@/components/DataTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ViewTechnicianScheduleModal } from "@/components/ViewTechnicianScheduleModal";

const technicianData = [
  {
    id: "TECH-001",
    name: "James Rodriguez",
    status: "On-Job",
    activeJob: "TKT-1047",
    jobsCompletedToday: 3,
    location: { lat: 37.7749, lng: -122.4194 },
  },
  {
    id: "TECH-002",
    name: "Maria Garcia",
    status: "On-Duty",
    activeJob: "-",
    jobsCompletedToday: 5,
    location: { lat: 37.7849, lng: -122.4094 },
  },
  {
    id: "TECH-003",
    name: "Robert Chen",
    status: "On-Job",
    activeJob: "TKT-1052",
    jobsCompletedToday: 2,
    location: { lat: 37.7649, lng: -122.4294 },
  },
  {
    id: "TECH-004",
    name: "Jennifer Smith",
    status: "Offline",
    activeJob: "-",
    jobsCompletedToday: 4,
    location: null,
  },
  {
    id: "TECH-005",
    name: "David Kim",
    status: "On-Duty",
    activeJob: "-",
    jobsCompletedToday: 1,
    location: { lat: 37.7549, lng: -122.4394 },
  },
];

const unassignedJobs = [
  { id: "TKT-1056", location: { lat: 37.7699, lng: -122.4144 }, priority: "High" },
  { id: "TKT-1055", location: { lat: 37.7799, lng: -122.4244 }, priority: "Medium" },
  { id: "TKT-1054", location: { lat: 37.7599, lng: -122.4344 }, priority: "Low" },
];

export function TechnicianOpsPage() {
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [selectedTechName, setSelectedTechName] = useState("");

  const handleViewSchedule = (techId: string, techName: string) => {
    setSelectedTech(techId);
    setSelectedTechName(techName);
    setScheduleModalOpen(true);
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "On-Job":
        return "default";
      case "On-Duty":
        return "secondary";
      case "Offline":
        return "outline";
      default:
        return "outline";
    }
  };

  const columns = [
    { label: "Technician Name", key: "name" },
    {
      label: "Status",
      key: "status",
      render: (value: string) => (
        <Badge variant={getStatusVariant(value)}>{value}</Badge>
      ),
    },
    {
      label: "Active Job",
      key: "activeJob",
      render: (value: string) => (
        <span className={value === "-" ? "text-muted-foreground" : ""}>
          {value}
        </span>
      ),
    },
    { label: "Jobs Completed Today", key: "jobsCompletedToday" },
    {
      label: "Actions",
      key: "id",
      render: (value: string, row: any) => (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleViewSchedule(value, row.name)}
        >
          <Calendar className="h-4 w-4 mr-1" />
          View Schedule
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2>Technician Operations</h2>
        <p className="text-muted-foreground">
          Real-time view of technician locations and job assignments
        </p>
      </div>

      {/* Map View */}
      <Card>
        <CardHeader>
          <CardTitle>Live Technician & Job Map</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative h-96 w-full overflow-hidden rounded-lg border border-border bg-muted">
            {/* Map Placeholder - In production, use Google Maps API */}
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-50 to-teal-50">
              <div className="text-center">
                <MapPin className="mx-auto h-12 w-12 text-muted-foreground" />
                <p className="mt-2 text-muted-foreground">
                  Interactive Map View
                </p>
                <p className="text-xs text-muted-foreground">
                  Showing {technicianData.filter(t => t.location).length} active technicians and{" "}
                  {unassignedJobs.length} unassigned jobs
                </p>
              </div>
            </div>

            {/* Map Pins Overlay - Visual Representation */}
            <div className="absolute inset-0">
              {/* On-Duty Technicians (Green Pins) */}
              {technicianData
                .filter((tech) => tech.location && tech.status === "On-Duty")
                .map((tech, index) => (
                  <div
                    key={tech.id}
                    className="absolute"
                    style={{
                      left: `${20 + index * 15}%`,
                      top: `${30 + index * 10}%`,
                    }}
                  >
                    <div className="relative">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-success shadow-lg border-2 border-white cursor-pointer hover:scale-110 transition-transform">
                        <MapPin className="h-4 w-4 text-white" />
                      </div>
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-card px-2 py-1 text-xs shadow-lg border border-border">
                        {tech.name}
                      </div>
                    </div>
                  </div>
                ))}

              {/* On-Job Technicians (Blue Pins) */}
              {technicianData
                .filter((tech) => tech.location && tech.status === "On-Job")
                .map((tech, index) => (
                  <div
                    key={tech.id}
                    className="absolute"
                    style={{
                      left: `${50 + index * 12}%`,
                      top: `${20 + index * 15}%`,
                    }}
                  >
                    <div className="relative">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary shadow-lg border-2 border-white cursor-pointer hover:scale-110 transition-transform">
                        <MapPin className="h-4 w-4 text-white" />
                      </div>
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-card px-2 py-1 text-xs shadow-lg border border-border">
                        {tech.name} - {tech.activeJob}
                      </div>
                    </div>
                  </div>
                ))}

              {/* Unassigned Jobs (Orange Pins) */}
              {unassignedJobs.map((job, index) => (
                <div
                  key={job.id}
                  className="absolute"
                  style={{
                    left: `${25 + index * 20}%`,
                    top: `${60 + index * 8}%`,
                  }}
                >
                  <div className="relative">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-warning shadow-lg border-2 border-white cursor-pointer hover:scale-110 transition-transform">
                      <MapPin className="h-4 w-4 text-white" />
                    </div>
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-card px-2 py-1 text-xs shadow-lg border border-border">
                      {job.id} ({job.priority})
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="absolute bottom-4 left-4 rounded-lg border border-border bg-card p-3 shadow-lg">
              <h4 className="mb-2 text-xs">Map Legend</h4>
              <div className="space-y-1 text-xs">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-success"></div>
                  <span>On-Duty Technician</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-primary"></div>
                  <span>On-Job Technician</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-warning"></div>
                  <span>Unassigned Job</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Technician Table */}
      <DataTable
        title="All Technicians"
        columns={columns}
        data={technicianData}
      />

      {/* View Schedule Modal */}
      <ViewTechnicianScheduleModal
        open={scheduleModalOpen}
        onOpenChange={setScheduleModalOpen}
        technicianName={selectedTechName}
      />
    </div>
  );
}
