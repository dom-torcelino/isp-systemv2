import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import { User, Bell, LogOut } from "lucide-react";

export function zTechnicianProfilePage() {
  const [onDuty, setOnDuty] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);

  return (
    <div className="mx-auto max-w-md space-y-6 pb-20">
      <div>
        <h2>Profile & Status</h2>
        <p className="text-muted-foreground">Manage your work status and settings</p>
      </div>

      {/* Profile Details */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <User className="h-8 w-8 text-primary" />
            </div>
            <div>
              <CardTitle>Mike Johnson</CardTitle>
              <CardDescription className="flex items-center gap-2 mt-1">
                <Badge variant="outline">Field Technician</Badge>
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Email</span>
              <span>mike.johnson@fastnet.com</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Phone</span>
              <span>(555) 123-4567</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Employee ID</span>
              <span>TECH-0042</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Work Status */}
      <Card>
        <CardHeader>
          <CardTitle>My Status</CardTitle>
          <CardDescription>
            Go "On-Duty" to appear as "Available" on the admin's dispatch dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <Label htmlFor="duty-status" className="text-base">
                  Work Status
                </Label>
                <Badge variant={onDuty ? "default" : "secondary"} className={onDuty ? "bg-green-600" : ""}>
                  {onDuty ? "On-Duty" : "Off-Duty"}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                {onDuty 
                  ? "You are currently available for job assignments" 
                  : "You are not available for new job assignments"}
              </p>
            </div>
            <Switch
              id="duty-status"
              checked={onDuty}
              onCheckedChange={setOnDuty}
            />
          </div>
        </CardContent>
      </Card>

      {/* App Settings */}
      <Card>
        <CardHeader>
          <CardTitle>App Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Push Notifications */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="h-5 w-5 text-muted-foreground" />
              <div className="space-y-0.5">
                <Label htmlFor="notifications">Push Notifications</Label>
                <p className="text-xs text-muted-foreground">
                  Receive alerts for new job assignments
                </p>
              </div>
            </div>
            <Switch
              id="notifications"
              checked={pushNotifications}
              onCheckedChange={setPushNotifications}
            />
          </div>

          <Separator />

          {/* Logout */}
          <Button variant="outline" className="w-full" size="lg">
            <LogOut className="mr-2 h-4 w-4" />
            Log Out
          </Button>
        </CardContent>
      </Card>

      {/* Stats Card */}
      <Card>
        <CardHeader>
          <CardTitle>This Month's Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl text-primary">24</div>
              <div className="text-xs text-muted-foreground">Jobs Completed</div>
            </div>
            <div>
              <div className="text-2xl text-primary">4.8</div>
              <div className="text-xs text-muted-foreground">Avg Rating</div>
            </div>
            <div>
              <div className="text-2xl text-primary">96%</div>
              <div className="text-xs text-muted-foreground">On-Time Rate</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
