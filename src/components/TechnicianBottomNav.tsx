import { Briefcase, Calendar, MapPin, User } from "lucide-react";

type TechnicianView = "jobs" | "details" | "schedule" | "map" | "profile";

interface TechnicianBottomNavProps {
  currentView: TechnicianView;
  onNavigate: (view: TechnicianView) => void;
}

export function TechnicianBottomNav({ currentView, onNavigate }: TechnicianBottomNavProps) {
  const navItems = [
    { view: "jobs" as TechnicianView, icon: Briefcase, label: "My Jobs" },
    { view: "schedule" as TechnicianView, icon: Calendar, label: "Schedule" },
    { view: "map" as TechnicianView, icon: MapPin, label: "Map View" },
    { view: "profile" as TechnicianView, icon: User, label: "Profile" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t border-border bg-card z-50">
      <div className="mx-auto flex max-w-md items-center justify-around py-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.view || 
            (currentView === "details" && item.view === "jobs");
          
          return (
            <button
              key={item.view}
              onClick={() => onNavigate(item.view)}
              className={`flex flex-col items-center gap-1 transition-colors ${
                isActive ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
