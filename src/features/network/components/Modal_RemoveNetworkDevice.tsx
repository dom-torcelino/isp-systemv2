import { useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";

interface Modal_RemoveNetworkDeviceProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  deviceName?: string;
  onConfirm?: () => void;
}

export function Modal_RemoveNetworkDevice({
  open,
  onOpenChange,
  deviceName = "this device",
  onConfirm,
}: Modal_RemoveNetworkDeviceProps) {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleConfirm = async () => {
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800));

      if (onConfirm) {
        onConfirm();
      }

      toast.success(
        t("Device removed successfully. This action has been logged.")
      );
      onOpenChange(false);
    } catch (error) {
      toast.error(t("Failed to remove device. Please try again."));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="sm:max-w-[500px]" aria-describedby="remove-device-description">
        <AlertDialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 flex-shrink-0">
              <AlertCircle className="h-6 w-6 text-destructive" aria-hidden="true" />
            </div>
            <AlertDialogTitle className="text-xl">
              {t("Remove Device?")}
            </AlertDialogTitle>
          </div>
          <AlertDialogDescription id="remove-device-description" className="text-base space-y-3">
            <p>
              {t(
                `Are you sure you want to remove ${ deviceName }`
              )}
            </p>
            <div className="rounded-lg bg-destructive/10 border border-destructive/20 p-4 space-y-2">
              <p className="font-medium text-foreground">
                {t("What will happen:")}
              </p>
              <ul className="space-y-1.5 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-destructive mt-0.5" aria-hidden="true">✕</span>
                  <span>
                    {t("The system will no longer be able to monitor this device")}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-destructive mt-0.5" aria-hidden="true">✕</span>
                  <span>
                    {t("Remote management capabilities will be disabled")}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-destructive mt-0.5" aria-hidden="true">✕</span>
                  <span>
                    {t("Historical data will be preserved for audit purposes")}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-destructive mt-0.5" aria-hidden="true">•</span>
                  <span className="font-medium text-foreground">
                    {t("This action will be logged in the audit trail")}
                  </span>
                </li>
              </ul>
            </div>
            <p className="text-sm text-muted-foreground">
              {t("You can re-add this device later if needed.")}
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button
            variant="outline"
            onClick={handleCancel}
            disabled={isSubmitting}
          >
            {t("Cancel")}
          </Button>
          <Button
            variant="destructive"
            onClick={handleConfirm}
            disabled={isSubmitting}
          >
            {isSubmitting ? t("Removing...") : t("Remove Device")}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
