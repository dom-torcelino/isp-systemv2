import { useState } from "react";
import {
  Bell,
  Check,
  CheckCheck,
  Trash2,
  AlertCircle,
  Info,
  CheckCircle,
  Clock,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import { useLanguage } from "../contexts/LanguageContext";

export interface Notification {
  id: string;
  type: "info" | "success" | "warning" | "error";
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionLabel?: string;
  onAction?: () => void;
}

interface NotificationsCenterProps {
  notifications: Notification[];
  onMarkAsRead?: (id: string) => void;
  onMarkAllAsRead?: () => void;
  onDelete?: (id: string) => void;
  onClearAll?: () => void;
}

export function NotificationsCenter({
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onDelete,
  onClearAll,
}: NotificationsCenterProps) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-success" aria-hidden="true" />;
      case "warning":
        return <AlertCircle className="h-5 w-5 text-warning" aria-hidden="true" />;
      case "error":
        return <AlertCircle className="h-5 w-5 text-destructive" aria-hidden="true" />;
      default:
        return <Info className="h-5 w-5 text-info" aria-hidden="true" />;
    }
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return t("Just now");
    if (diffMins < 60) return `${diffMins}m ${t("ago")}`;
    if (diffHours < 24) return `${diffHours}h ${t("ago")}`;
    if (diffDays === 1) return t("Yesterday");
    if (diffDays < 7) return `${diffDays}d ${t("ago")}`;
    return date.toLocaleDateString();
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative"
          aria-label={`Notifications ${unreadCount > 0 ? `(${unreadCount} new)` : ""}`}
        >
          <Bell className="h-5 w-5" aria-hidden="true" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
              aria-label={`${unreadCount} unread notifications`}
            >
              {unreadCount > 9 ? "9+" : unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-96 p-0"
        aria-label="Notifications"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold">{t("Notifications")}</h3>
            {unreadCount > 0 && (
              <Badge variant="secondary" aria-live="polite">
                {unreadCount} {t("new")}
              </Badge>
            )}
          </div>
          <div className="flex gap-1">
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onMarkAllAsRead}
                aria-label="Mark all as read"
              >
                <CheckCheck className="h-4 w-4" aria-hidden="true" />
              </Button>
            )}
            {notifications.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearAll}
                aria-label="Clear all notifications"
              >
                <Trash2 className="h-4 w-4" aria-hidden="true" />
              </Button>
            )}
          </div>
        </div>

        {/* Notifications List */}
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
            <p className="text-xs text-muted-foreground mt-1">
              {t("We'll notify you when something important happens")}
            </p>
          </div>
        ) : (
          <ScrollArea className="h-96">
            <div role="list">
              {notifications.map((notification, index) => (
                <div key={notification.id} role="listitem">
                  <div
                    className={`p-4 hover:bg-muted/50 transition-colors ${
                      !notification.read ? "bg-muted/30" : ""
                    }`}
                  >
                    <div className="flex gap-3">
                      <div className="flex-shrink-0 mt-0.5">{getIcon(notification.type)}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h4 className="text-sm font-medium">
                            {notification.title}
                          </h4>
                          {!notification.read && (
                            <div className="h-2 w-2 rounded-full bg-primary flex-shrink-0 mt-1.5" aria-label="Unread" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {notification.message}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3 w-3" aria-hidden="true" />
                            {formatTimestamp(notification.timestamp)}
                          </span>
                          <div className="flex gap-1">
                            {notification.actionLabel && notification.onAction && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  notification.onAction?.();
                                  setOpen(false);
                                }}
                              >
                                {notification.actionLabel}
                              </Button>
                            )}
                            {!notification.read && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => onMarkAsRead?.(notification.id)}
                                aria-label="Mark as read"
                              >
                                <Check className="h-4 w-4" aria-hidden="true" />
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => onDelete?.(notification.id)}
                              aria-label="Delete notification"
                            >
                              <Trash2 className="h-4 w-4" aria-hidden="true" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {index < notifications.length - 1 && <Separator />}
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
