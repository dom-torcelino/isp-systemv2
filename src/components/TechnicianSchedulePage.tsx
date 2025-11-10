import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { MapPin, Calendar, User } from "lucide-react";

interface DayOption {
  date: number;
  dayName: string;
  isToday: boolean;
}

const weekDays: DayOption[] = [
  { date: 3, dayName: "Mon", isToday: false },
  { date: 4, dayName: "Tue", isToday: true },
  { date: 5, dayName: "Wed", isToday: false },
  { date: 6, dayName: "Thu", isToday: false },
  { date: 7, dayName: "Fri", isToday: false },
  { date: 8, dayName: "Sat", isToday: false },
  { date: 9, dayName: "Sun", isToday: false },
];

const jobsByDate: Record<number, any[]> = {
  4: [
    {
      id: "1",
      time: "9:00 AM",
      type: "Installation",
      customer: "John Smith",
      address: "123 Apple St",
      priority: "High",
    },
    {
      id: "2",
      time: "11:00 AM",
      type: "Repair",
      customer: "Jane Doe",
      address: "456 Main St",
      priority: "Medium",
    },
    {
      id: "3",
      time: "2:00 PM",
      type: "Transfer",
      customer: "Bob Johnson",
      address: "789 Oak Ave",
      priority: "Low",
    },
  ],
  5: [
    {
      id: "4",
      time: "10:00 AM",
      type: "Repair",
      customer: "Alice Cooper",
      address: "321 Pine Rd",
      priority: "High",
    },
    {
      id: "5",
      time: "1:00 PM",
      type: "Installation",
      customer: "Mike Wilson",
      address: "654 Elm St",
      priority: "Medium",
    },
  ],
  6: [
    {
      id: "6",
      time: "8:00 AM",
      type: "Transfer",
      customer: "Sarah Davis",
      address: "987 Maple Dr",
      priority: "Low",
    },
  ],
};

interface TechnicianSchedulePageProps {
  onViewDetails?: () => void;
}

export function TechnicianSchedulePage({ onViewDetails }: TechnicianSchedulePageProps) {
  const [selectedDate, setSelectedDate] = useState(4);

  const selectedJobs = jobsByDate[selectedDate] || [];
  const selectedDay = weekDays.find(d => d.date === selectedDate);

  const getDateDisplay = () => {
    const monthName = "November";
    const getDaySuffix = (day: number) => {
      if (day >= 11 && day <= 13) return "th";
      switch (day % 10) {
        case 1: return "st";
        case 2: return "nd";
        case 3: return "rd";
        default: return "th";
      }
    };
    return `${selectedDay?.dayName}, ${monthName} ${selectedDate}${getDaySuffix(selectedDate)}`;
  };

  return (
    <div className="mx-auto max-w-md space-y-6 pb-20">
      <div>
        <h2>My Schedule</h2>
        <p className="text-muted-foreground">Your upcoming service appointments</p>
      </div>

      {/* 7-Day Horizontal Date Picker */}
      <div className="overflow-x-auto">
        <div className="flex gap-2 pb-2">
          {weekDays.map((day) => (
            <button
              key={day.date}
              onClick={() => setSelectedDate(day.date)}
              className={`flex min-w-[60px] flex-col items-center gap-1 rounded-lg border px-4 py-3 transition-colors ${
                selectedDate === day.date
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card hover:bg-muted"
              }`}
            >
              <span className="text-xs">{day.dayName}</span>
              <span className="text-lg">{day.date}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Agenda List */}
      <div className="space-y-4">
        <h3 className="text-muted-foreground">{getDateDisplay()}</h3>

        {selectedJobs.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center text-muted-foreground">
              <Calendar className="mx-auto mb-2 h-8 w-8" />
              <p>No jobs scheduled for this day</p>
            </CardContent>
          </Card>
        ) : (
          selectedJobs.map((job) => (
            <Card key={job.id}>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-primary">{job.time}</span>
                      <Badge
                        variant={
                          job.priority === "High"
                            ? "destructive"
                            : job.priority === "Medium"
                            ? "default"
                            : "secondary"
                        }
                        className="text-xs"
                      >
                        {job.priority}
                      </Badge>
                    </div>
                  </div>

                  <div>
                    <h4>{job.type}</h4>
                  </div>

                  <div className="space-y-1.5 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <User className="h-4 w-4" />
                      <span>{job.customer}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{job.address}</span>
                    </div>
                  </div>

                  <Button className="w-full" size="sm" onClick={onViewDetails}>
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
