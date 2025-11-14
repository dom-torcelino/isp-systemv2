// src/features/notifications/components/Panel_Notifications.tsx
import { useState } from "react";
import {
  Bell,
  CheckCheck,
  Trash2,
} from "lucide-react";
// 1. UPDATED import paths
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/contexts/LanguageContext";

// (The rest of this file is copied from your src/components/Panel_Notifications.tsx)

interface NotificationItem {
  id: string;
  title: string;
  isRead: boolean;
  dotColor: "red" | "blue" | "none";
}

const sampleNotifications: NotificationItem[] = [
  {
    id: "1",
    title: "SLA Breach: Ticket TKT-1047 has breached its SLA.",
    isRead: false,
    dotColor: "red",
  },
  {
    id: "2",
    title: "New Tenant: SpeedNet ISP has been successfully onboarded.",
    isRead: false,
    dotColor: "blue",
  },
  {
    id: "3",
    title: "Device Offline: Router Mikrotik-02 has been offline for 15 minutes.",
    isRead: true,
    dotColor: "none",
  },
];

interface Panel_NotificationsProps {
  /** Optional custom trigger button. If not provided, uses default bell icon */
  trigger?: React.ReactNode;
}

export function Panel_Notifications({ trigger }: Panel_NotificationsProps) {
  const { t } = useLanguage();
  const [notifications, setNotifications] = useState(sampleNotifications);
  const [open, setOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleMarkAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, isRead: true }))
    );
  };

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, isRead: true } : notification
      )
    );
  };

  const getDotColorClass = (color: "red" | "blue" | "none") => {
    switch (color) {
      case "red":
        return "bg-destructive";
      case "blue":
        return "bg-primary";
      default:
        return "";
    }
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        {trigger || (
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            aria-label={`${t("Notifications")} ${
              unreadCount > 0 ? `(${unreadCount} ${t("unread")})` : ""
            }`}
          >
            <Bell className="h-5 w-5" aria-hidden="true" />
            {unreadCount > 0 && (
              <span
                className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-xs text-white"
                aria-label={`${unreadCount} ${t("unread notifications")}`}
              >
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-96 p-0"
        aria-label={t("Notifications")}
      >
        {/* Header */}
        <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 pb-3">
          <CardTitle className="text-base">{t("Notifications")}</CardTitle>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleMarkAllAsRead}
              aria-label={t("Mark all as read")}
            >
              <CheckCheck className="mr-2 h-4 w-4" />
              {t("Mark all as read")}
            </Button>
          )}
        </CardHeader>

        <Separator />

        {/* Notifications List */}
        <ScrollArea className="h-80">
          <CardContent className="p-0">
            {notifications.length === 0 ? (
              <div
                className="flex flex-col items-center justify-center py-12 px-4 text-center"
                role="status"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted mb-3">
                  <Bell className="h-8 w-8 text-muted-foreground" aria-hidden="true" />
                </div>
                <p className="text-sm text-muted-foreground">
                  {t("No notifications yet")}
                </p>
              </div>
            ) : (
              <div role="list">
                {notifications.map((notification, index) => (
                  <div key={notification.id} role="listitem">
                    <button
                      onClick={() => {
                        if (!notification.isRead) {
                          handleMarkAsRead(notification.id);
                        }
                      }}
                      className={`w-full text-left p-4 hover:bg-muted/50 transition-colors ${
                        !notification.isRead ? "bg-muted/30" : ""
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {/* Dot indicator */}
                        <div className="flex-shrink-0 pt-1.5">
                          {notification.dotColor !== "none" && !notification.isRead && (
                            <div
                              className={`h-2 w-2 rounded-full ${getDotColorClass(
                                notification.dotColor
                              )}`}
                              aria-label={
                                notification.dotColor === "red"
                                  ? t("Critical notification")
                                  : t("Information notification")
                              }
                            />
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <p
                            className={`text-sm ${
                              !notification.isRead
                                ? "font-medium text-foreground"
                                : "text-muted-foreground"
                            }`}
                          >
                            {notification.title}
                          </p>
                        </div>

                        {/* Unread indicator */}
                        {!notification.isRead && (
                          <div
                            className="flex-shrink-0 h-2 w-2 rounded-full bg-primary mt-1.5"
                            aria-label={t("Unread")}
                          />
                        )}
                      </div>
                    </button>
                    {index < notifications.length - 1 && <Separator />}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}