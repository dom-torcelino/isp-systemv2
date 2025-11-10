import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Calendar, Clock, MapPin, Ticket } from "lucide-react";
import { useState } from "react";
import { Badge } from "./ui/badge";

interface ViewTechnicianScheduleModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  technicianName: string;
}

// Mock schedule data
const scheduleData = {
  "Mon 4": [
    {
      time: "9:00 AM - 11:00 AM",
      ticketId: "TKT-1045",
      category: "Installation",
      customer: "Alice Brown",
      address: "789 Oak Ave.",
    },
    {
      time: "1:00 PM - 3:00 PM",
      ticketId: "TKT-1046",
      category: "Repair",
      customer: "Bob Wilson",
      address: "321 Elm St.",
    },
  ],
  "Tue 5": [
    {
      time: "9:00 AM - 11:00 AM",
      ticketId: "TKT-1047",
      category: "Installation",
      customer: "John Smith",
      address: "123 Apple St.",
    },
    {
      time: "1:00 PM - 2:00 PM",
      ticketId: "TKT-1049",
      category: "Repair",
      customer: "Sarah Johnson",
      address: "456 Main St.",
    },
  ],
  "Wed 6": [
    {
      time: "10:00 AM - 12:00 PM",
      ticketId: "TKT-1050",
      category: "Transfer",
      customer: "Mike Davis",
      address: "555 Park Blvd.",
    },
  ],
  "Thu 7": [],
  "Fri 8": [
    {
      time: "9:00 AM - 11:00 AM",
      ticketId: "TKT-1051",
      category: "Installation",
      customer: "Emily Chen",
      address: "888 River Rd.",
    },
    {
      time: "2:00 PM - 4:00 PM",
      ticketId: "TKT-1052",
      category: "Repair",
      customer: "David Lee",
      address: "999 Lake Dr.",
    },
  ],
  "Sat 9": [],
  "Sun 10": [],
};

export function ViewTechnicianScheduleModal({
  open,
  onOpenChange,
  technicianName,
}: ViewTechnicianScheduleModalProps) {
  const [selectedDay, setSelectedDay] = useState("Tue 5");
  const days = Object.keys(scheduleData);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>View Schedule: {technicianName}</DialogTitle>
          <DialogDescription>
            Weekly schedule for the selected technician
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* 7-Day Horizontal Date Picker */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {days.map((day) => {
              const appointmentCount = scheduleData[day as keyof typeof scheduleData].length;
              return (
                <Button
                  key={day}
                  variant={selectedDay === day ? "default" : "outline"}
                  className="min-w-[80px] flex-col h-auto py-2"
                  onClick={() => setSelectedDay(day)}
                >
                  <span className="text-xs">{day.split(" ")[0]}</span>
                  <span className="mt-1">{day.split(" ")[1]}</span>
                  {appointmentCount > 0 && (
                    <Badge className="mt-1 h-5 px-1.5 text-xs" variant="secondary">
                      {appointmentCount}
                    </Badge>
                  )}
                </Button>
              );
            })}
          </div>

          {/* Selected Day Display */}
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>
              {selectedDay.split(" ")[0]}, November {selectedDay.split(" ")[1]}, 2025
            </span>
          </div>

          {/* Agenda List */}
          <div className="space-y-3">
            {scheduleData[selectedDay as keyof typeof scheduleData].length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border py-12 text-center">
                <Calendar className="h-8 w-8 text-muted-foreground mb-2" />
                <p className="text-muted-foreground">No appointments scheduled</p>
              </div>
            ) : (
              scheduleData[selectedDay as keyof typeof scheduleData].map((appointment, index) => (
                <Card key={index}>
                  <CardContent className="pt-4">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-primary" />
                          <span>{appointment.time}</span>
                        </div>
                        <Badge variant="outline">{appointment.category}</Badge>
                      </div>

                      <div className="grid gap-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Ticket className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">Ticket:</span>
                          <span>{appointment.ticketId}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">Customer:</span>
                          <span>
                            {appointment.customer}, {appointment.address}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
