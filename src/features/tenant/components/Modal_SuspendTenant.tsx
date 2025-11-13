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
import { AlertTriangle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";

interface Modal_SuspendTenantProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tenantName?: string;
  onConfirm?: () => void;
}

export function Modal_SuspendTenant({
  open,
  onOpenChange,
  tenantName = "this tenant",
  onConfirm,
}: Modal_SuspendTenantProps) {
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

      toast.success(t("Tenant suspended successfully. All users have been locked out."));
      onOpenChange(false);
    } catch (error) {
      toast.error(t("Failed to suspend tenant. Please try again."));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="sm:max-w-[500px]" aria-describedby="suspend-tenant-description">
        <AlertDialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-warning/10 flex-shrink-0">
              <AlertTriangle className="h-6 w-6 text-warning" aria-hidden="true" />
            </div>
            <AlertDialogTitle className="text-xl">
              {t("Suspend Tenant?")}
            </AlertDialogTitle>
          </div>
          <AlertDialogDescription id="suspend-tenant-description" className="text-base space-y-3">
            <p>
              {t(
                `Are you sure you want to suspend  ${ tenantName }?`,
               
              )}
            </p>
            <div className="rounded-lg bg-warning/10 border border-warning/20 p-4 space-y-2">
              <p className="font-medium text-foreground">
                {t("What will happen:")}
              </p>
              <ul className="space-y-1.5 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-warning mt-0.5" aria-hidden="true">•</span>
                  <span>
                    {t("All tenant users will be locked out immediately")}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-warning mt-0.5" aria-hidden="true">•</span>
                  <span>
                    {t("No one will be able to access the system")}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-warning mt-0.5" aria-hidden="true">•</span>
                  <span>
                    {t("All data will be preserved and can be restored")}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-warning mt-0.5" aria-hidden="true">•</span>
                  <span>
                    {t("You can reactivate the tenant at any time")}
                  </span>
                </li>
              </ul>
            </div>
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
            {isSubmitting ? t("Suspending...") : t("Suspend Tenant")}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
