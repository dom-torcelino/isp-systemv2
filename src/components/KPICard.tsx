import { Card, CardContent } from "./ui/card";
import { LucideIcon } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: string;
    direction: "up" | "down";
  };
  variant?: "default" | "success" | "warning" | "destructive";
}

export function KPICard({ title, value, icon: Icon, trend, variant = "default" }: KPICardProps) {
  const variantClasses = {
    default: "text-primary",
    success: "text-success",
    warning: "text-warning",
    destructive: "text-destructive",
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-muted-foreground text-sm">{title}</p>
            <h3 className="mt-2 text-3xl">{value}</h3>
            {trend && (
              <div className="mt-2 flex items-center gap-1">
                <span className={`text-sm ${trend.direction === "up" ? "text-success" : "text-destructive"}`}>
                  {trend.direction === "up" ? "↑" : "↓"} {trend.value}
                </span>
              </div>
            )}
          </div>
          <div className={`rounded-lg bg-secondary/50 p-3 ${variantClasses[variant]}`}>
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
