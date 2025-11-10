import { useState, useEffect } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { AlertCircle } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { toast } from "sonner";

interface Modal_DeactivateTenantProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tenantName?: string;
  onConfirm?: () => void;
}

export function Modal_DeactivateTenant({
  open,
  onOpenChange,
  tenantName = "this tenant",
  onConfirm,
}: Modal_DeactivateTenantProps) {
  const { t } = useLanguage();
  const [confirmText, setConfirmText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const CONFIRMATION_TEXT = "DEACTIVATE";
  const isConfirmEnabled = confirmText === CONFIRMATION_TEXT;

  // Reset confirmation text when modal opens/closes
  useEffect(() => {
    if (!open) {
      setConfirmText("");
    }
  }, [open]);

  const handleConfirm = async () => {
    if (!isConfirmEnabled) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (onConfirm) {
        onConfirm();
      }

      toast.success(
        t("Tenant deactivated. Data deletion has been scheduled.")
      );
      setConfirmText("");
      onOpenChange(false);
    } catch (error) {
      toast.error(t("Failed to deactivate tenant. Please try again."));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setConfirmText("");
    onOpenChange(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="sm:max-w-[500px]" aria-describedby="deactivate-tenant-description">
        <AlertDialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 flex-shrink-0">
              <AlertCircle className="h-6 w-6 text-destructive" aria-hidden="true" />
            </div>
            <AlertDialogTitle className="text-xl">
              {t("Deactivate Tenant?")}
            </AlertDialogTitle>
          </div>
          <AlertDialogDescription id="deactivate-tenant-description" className="text-base space-y-4">
            <div className="rounded-lg bg-destructive/10 border border-destructive/20 p-4 space-y-2">
              <p className="font-semibold text-destructive">
                {t("⚠️ This action is permanent and cannot be undone!")}
              </p>
            </div>

            <p className="text-foreground font-medium">
              {t("You are about to deactivate {{tenantName}}.", { tenantName })}
            </p>

            <div className="space-y-2">
              <p className="font-medium text-foreground">
                {t("The following will happen:")}
              </p>
              <ul className="space-y-1.5 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-destructive mt-0.5" aria-hidden="true">✕</span>
                  <span>
                    {t("All tenant users will be permanently deleted")}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-destructive mt-0.5" aria-hidden="true">✕</span>
                  <span>
                    {t("All customer records will be permanently deleted")}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-destructive mt-0.5" aria-hidden="true">✕</span>
                  <span>
                    {t("All support tickets will be permanently deleted")}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-destructive mt-0.5" aria-hidden="true">✕</span>
                  <span>
                    {t("All billing data will be permanently deleted")}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-destructive mt-0.5" aria-hidden="true">✕</span>
                  <span className="font-semibold text-destructive">
                    {t("This action CANNOT be reversed")}
                  </span>
                </li>
              </ul>
            </div>

            <div className="space-y-2 pt-2">
              <Label htmlFor="confirm-deactivate" className="text-foreground">
                {t('Type "{{text}}" to confirm', { text: CONFIRMATION_TEXT })}
              </Label>
              <Input
                id="confirm-deactivate"
                type="text"
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                placeholder={CONFIRMATION_TEXT}
                className={
                  confirmText && !isConfirmEnabled
                    ? "border-destructive"
                    : ""
                }
                aria-invalid={confirmText && !isConfirmEnabled}
                aria-describedby="confirm-deactivate-hint"
                autoComplete="off"
              />
              <p
                id="confirm-deactivate-hint"
                className="text-xs text-muted-foreground"
              >
                {t("Enter the word exactly as shown above (all caps)")}
              </p>
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
            disabled={!isConfirmEnabled || isSubmitting}
          >
            {isSubmitting ? t("Deactivating...") : t("Confirm Deactivation")}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
