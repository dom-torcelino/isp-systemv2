import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { MapPin, Navigation } from "lucide-react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";

interface JobPin {
  id: number;
  lat: number;
  lng: number;
  job: {
    type: string;
    customer: string;
    address: string;
  };
}

const jobPins: JobPin[] = [
  {
    id: 1,
    lat: 40.7128,
    lng: -74.006,
    job: {
      type: "Installation",
      customer: "John Smith",
      address: "123 Apple St",
    },
  },
  {
    id: 2,
    lat: 40.7589,
    lng: -73.9851,
    job: {
      type: "Repair",
      customer: "Jane Doe",
      address: "456 Main St",
    },
  },
  {
    id: 3,
    lat: 40.7614,
    lng: -73.9776,
    job: {
      type: "Transfer",
      customer: "Bob Johnson",
      address: "789 Oak Ave",
    },
  },
];

interface TechnicianMapViewProps {
  onViewDetails?: (id: string | number) => void;
}

export function TechnicianMapView({ onViewDetails }: TechnicianMapViewProps) {
  const [selectedJob, setSelectedJob] = useState<JobPin | null>(null);

  return (
    <div className="relative mx-auto h-screen max-w-md pb-20">
      <div className="absolute left-0 right-0 top-0 z-10 bg-card p-4 shadow-sm">
        <h2>Today's Jobs</h2>
        <p className="text-muted-foreground text-sm">Tap a pin to view details</p>
      </div>

      {/* Map Container - Placeholder for actual map */}
      <div className="relative h-full w-full bg-muted/20 pt-24">
        {/* Simulated Map Background */}
        <div className="absolute inset-0">
          <svg width="100%" height="100%" className="text-muted-foreground/10">
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Current Location Pin - Blue */}
        <div
          className="absolute"
          style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}
        >
          <div className="relative">
            <div className="absolute -left-3 -top-3 h-6 w-6 animate-pulse rounded-full bg-blue-500/30"></div>
            <MapPin className="h-8 w-8 fill-blue-500 text-white" />
            <div className="mt-1 text-center text-xs">You</div>
          </div>
        </div>

        {/* Job Pins - Red with Numbers */}
        {jobPins.map((pin, index) => {
          const offsetX = (index - 1) * 120 + 60;
          const offsetY = index * 80 - 100;

          return (
            <button
              key={pin.id}
              onClick={() => setSelectedJob(pin)}
              className="absolute hover:scale-110 transition-transform"
              style={{
                left: `calc(50% + ${offsetX}px)`,
                top: `calc(50% + ${offsetY}px)`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <div className="relative">
                <MapPin className="h-10 w-10 fill-red-500 text-white drop-shadow-lg" />
                <div className="absolute inset-0 flex items-center justify-center pb-2">
                  <span className="text-xs text-white">{pin.id}</span>
                </div>
                <div className="mt-1 text-center text-xs">
                  Job {pin.id}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Bottom Modal for Selected Job */}
      {selectedJob && (
        <div className="fixed bottom-16 left-0 right-0 z-20 mx-auto max-w-md px-4">
          <Card className="shadow-2xl">
            <CardContent className="p-4">
              <div className="space-y-4">
                <div>
                  <h3>Job {selectedJob.id}: {selectedJob.job.type}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {selectedJob.job.customer}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {selectedJob.job.address}
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1" size="sm">
                    <Navigation className="mr-2 h-4 w-4" />
                    Start Navigation
                  </Button>
                  <Button className="flex-1" variant="outline" size="sm" onClick={() => onViewDetails}>
                    View Job Details
                  </Button>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full"
                  onClick={() => setSelectedJob(null)}
                >
                  Close
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
