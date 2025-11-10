import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { MapPin, Calendar, Briefcase, User } from "lucide-react";
import { Badge } from "./ui/badge";

const jobs = [
  {
    id: "TKT-1047",
    type: "Installation",
    customer: "John Smith",
    address: "123 Main St, Suite 100",
    scheduled: "Today, 2:00 PM",
    priority: "High",
  },
  {
    id: "TKT-1042",
    type: "Repair",
    customer: "Sarah Johnson",
    address: "456 Oak Avenue, Apt 5B",
    scheduled: "Today, 4:30 PM",
    priority: "Medium",
  },
  {
    id: "TKT-1038",
    type: "Transfer",
    customer: "Mike Davis",
    address: "789 Pine Road, Building C",
    scheduled: "Tomorrow, 10:00 AM",
    priority: "Low",
  },
];

export function FieldTechnicianDashboard() {
  return (
    <div className="mx-auto max-w-md space-y-6 pb-20">
      <div>
        <h2>My Jobs</h2>
        <p className="text-muted-foreground">Your scheduled service appointments</p>
      </div>

      {/* Job Cards */}
      <div className="space-y-4">
        {jobs.map((job) => (
          <Card key={job.id}>
            <CardContent className="p-4">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-muted-foreground text-sm">{job.id}</p>
                      <Badge
                        variant={
                          job.priority === "High"
                            ? "destructive"
                            : job.priority === "Medium"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {job.priority}
                      </Badge>
                    </div>
                    <h4 className="mt-1">{job.type}</h4>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span>{job.customer}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{job.address}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{job.scheduled}</span>
                  </div>
                </div>

                <Button className="w-full" variant="outline">
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>


    </div>
  );
}
