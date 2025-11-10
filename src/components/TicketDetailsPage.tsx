import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Separator } from "./ui/separator";
import { ArrowLeft, User, MapPin, Phone, Mail, ExternalLink, Clock, AlertTriangle } from "lucide-react";
import { EscalateTicketModal } from "./EscalateTicketModal";

interface TicketDetailsPageProps {
  onBack?: () => void;
  ticketId: string;
}

export function TicketDetailsPage({ onBack }: TicketDetailsPageProps) {
  const [status, setStatus] = useState("pending");
  const [priority, setPriority] = useState("high");
  const [assignedTo, setAssignedTo] = useState("");
  const [note, setNote] = useState("");
  const [isEscalateModalOpen, setIsEscalateModalOpen] = useState(false);

  const activityFeed = [
    {
      id: 1,
      type: "created",
      user: "John Smith",
      userType: "Customer",
      message: "Ticket created",
      timestamp: "2 hours ago",
    },
    {
      id: 2,
      type: "assigned",
      user: "Sarah Johnson",
      userType: "Support Agent",
      message: "Assigned to Mike Davis (Field Technician)",
      timestamp: "1 hour ago",
    },
    {
      id: 3,
      type: "note",
      user: "Mike Davis",
      userType: "Field Technician",
      message: "Customer confirmed availability for tomorrow 10 AM",
      timestamp: "30 minutes ago",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button size="icon" variant="ghost" onClick={onBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h2>Ticket Details</h2>
          <p className="text-muted-foreground">TKT-1047</p>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Column - Activity Feed */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>Installation Request</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    New fiber installation needed at residential address
                  </p>
                </div>
                <Badge variant="destructive">High Priority</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status</span>
                  <Badge>{status === "pending" ? "Pending" : status === "ongoing" ? "Ongoing" : "Resolved"}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Created</span>
                  <span>Nov 4, 2025 at 2:30 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Last Updated</span>
                  <span>30 minutes ago</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Activity Feed</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Add Note */}
              <div className="space-y-2">
                <Label htmlFor="note">Add Internal Note</Label>
                <Textarea
                  id="note"
                  placeholder="Add a note visible to staff only..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={3}
                />
                <Button size="sm">Post Note</Button>
              </div>

              <Separator />

              {/* Activity Items */}
              <div className="space-y-4">
                {activityFeed.map((activity) => (
                  <div key={activity.id} className="flex gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted flex-shrink-0">
                      <User className="h-4 w-4" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-sm">{activity.user}</span>
                          <Badge variant="outline" className="text-xs">
                            {activity.userType}
                          </Badge>
                        </div>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {activity.timestamp}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{activity.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Column */}
        <div className="space-y-6">
          {/* Actions Card */}
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="assign-to">Assign To</Label>
                <Select value={assignedTo} onValueChange={setAssignedTo}>
                  <SelectTrigger id="assign-to">
                    <SelectValue placeholder="Select technician..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mike">Mike Davis (Technician)</SelectItem>
                    <SelectItem value="sarah">Sarah Johnson (Support)</SelectItem>
                    <SelectItem value="alex">Alex Chen (Technician)</SelectItem>
                    <SelectItem value="unassigned">Unassigned</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Change Status</Label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger id="status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="ongoing">Ongoing</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="priority">Change Priority</Label>
                <Select value={priority} onValueChange={setPriority}>
                  <SelectTrigger id="priority">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button className="w-full">Save Changes</Button>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => setIsEscalateModalOpen(true)}
              >
                <AlertTriangle className="mr-2 h-4 w-4" />
                Escalate Ticket
              </Button>
            </CardContent>
          </Card>

          {/* Customer Details Card */}
          <Card>
            <CardHeader>
              <CardTitle>Customer Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <User className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground">Name</p>
                    <p className="text-sm">John Smith</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground">Phone</p>
                    <p className="text-sm">(555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground">Email</p>
                    <p className="text-sm">john.smith@email.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-xs text-muted-foreground">Address</p>
                    <p className="text-sm">123 Apple St, Suite 100</p>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs text-muted-foreground">Account Status</span>
                  <Badge variant="default" className="bg-green-600">Active</Badge>
                </div>
              </div>

              <Separator />

              <Button variant="outline" className="w-full">
                <ExternalLink className="mr-2 h-4 w-4" />
                View Full Customer Profile
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Escalate Modal */}
      <EscalateTicketModal
        isOpen={isEscalateModalOpen}
        onClose={() => setIsEscalateModalOpen(false)}
        ticketId="TKT-1047"
      />
    </div>
  );
}
