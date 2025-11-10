import { useState, useEffect } from "react";
import { Clock, LogOut } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { useLanguage } from "../../contexts/LanguageContext";

interface SessionTimeoutModalProps {
  open: boolean;
  onContinue?: () => void;
  onLogout?: () => void;
  countdown?: number; // seconds until auto-logout
}

export function SessionTimeoutModal({
  open,
  onContinue,
  onLogout,
  countdown: initialCountdown = 60,
}: SessionTimeoutModalProps) {
  const { t } = useLanguage();
  const [countdown, setCountdown] = useState(initialCountdown);

  useEffect(() => {
    if (open && countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            onLogout?.();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    } else if (!open) {
      setCountdown(initialCountdown);
    }
  }, [open, countdown, initialCountdown, onLogout]);

  const handleContinue = () => {
    setCountdown(initialCountdown);
    onContinue?.();
  };

  const handleLogout = () => {
    onLogout?.();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-warning/10">
              <Clock className="h-6 w-6 text-warning" aria-hidden="true" />
            </div>
            <AlertDialogTitle className="text-xl">
              {t("Session Timeout Warning")}
            </AlertDialogTitle>
          </div>
          <AlertDialogDescription>
            {t(
              "Your session is about to expire due to inactivity. You will be automatically logged out in"
            )}{" "}
            <span className="font-semibold text-foreground" aria-live="polite">
              {formatTime(countdown)}
            </span>
            .
          </AlertDialogDescription>
          <AlertDialogDescription>
            {t("Would you like to continue your session?")}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" aria-hidden="true" />
            {t("Log Out")}
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleContinue}>
            {t("Continue Session")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
