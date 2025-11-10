import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { ArrowLeft, MapPin, User, Phone, AlertCircle } from "lucide-react";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { useState } from "react";

interface JobDetailsScreenProps {
  onBack?: () => void;
}

export function JobDetailsScreen({ onBack }: JobDetailsScreenProps) {
  const [status, setStatus] = useState<"pending" | "onsite" | "completed">("pending");

  return (
    <div className="mx-auto max-w-md space-y-6 pb-20">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button size="icon" variant="ghost" onClick={onBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h2>Job Details</h2>
          <p className="text-muted-foreground text-sm">TKT-1047</p>
        </div>
      </div>

      {/* Customer Info */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Info</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-muted-foreground text-sm">Name</p>
              <p>John Smith</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-muted-foreground text-sm">Phone</p>
              <p>+1 (555) 123-4567</p>
            </div>
          </div>
          <Separator />
          <div className="flex items-start gap-2">
            <MapPin className="mt-1 h-4 w-4 text-muted-foreground" />
            <div className="flex-1">
              <p className="text-muted-foreground text-sm">Address</p>
              <p>123 Main St, Suite 100</p>
              <p className="text-muted-foreground text-sm">Springfield, IL 62701</p>
            </div>
          </div>
          <Button className="w-full" variant="outline">
            <MapPin className="mr-2 h-4 w-4" />
            Get Directions
          </Button>
        </CardContent>
      </Card>

      {/* Issue Info */}
      <Card>
        <CardHeader>
          <CardTitle>Issue Info</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm">Job Type</p>
              <p>Installation</p>
            </div>
            <Badge variant="destructive">High Priority</Badge>
          </div>
          <Separator />
          <div>
            <p className="text-muted-foreground text-sm">Issue Description</p>
            <p className="mt-1">
              Customer requires new fiber optic internet installation. Service plan: 1 Gbps
              fiber. Equipment: Router and ONT provided by ISP. Customer requests installation
              on ground floor near main office area.
            </p>
          </div>
          <div>
            <p className="text-muted-foreground text-sm">Scheduled Time</p>
            <p className="mt-1">Today, 2:00 PM - 4:00 PM</p>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <Card>
        <CardHeader>
          <CardTitle>Job Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {status === "pending" && (
            <Button className="w-full" onClick={() => setStatus("onsite")}>
              Mark as Onsite
            </Button>
          )}

          {status === "onsite" && (
            <>
              <div className="flex items-center gap-2 rounded-lg bg-accent/10 p-3 text-accent text-sm">
                <AlertCircle className="h-4 w-4" />
                <span>You are currently onsite</span>
              </div>
              <Button className="w-full" onClick={() => setStatus("completed")}>
                Mark as Completed
              </Button>
            </>
          )}

          {status === "completed" && (
            <div className="flex items-center gap-2 rounded-lg bg-success/10 p-3 text-success text-sm">
              <AlertCircle className="h-4 w-4" />
              <span>Job marked as completed</span>
            </div>
          )}

          <Button className="w-full" variant="outline">
            Escalate / Cannot Complete
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
