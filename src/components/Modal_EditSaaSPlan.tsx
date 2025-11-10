import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { InputWithIcon } from "./InputWithIcon";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { DollarSign, Users, Package } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { toast } from "sonner";

interface Modal_EditSaaSPlanProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  planData?: SaaSPlanFormData | null;
  onSave?: (data: SaaSPlanFormData) => void;
}

export interface SaaSPlanFormData {
  planName: string;
  price: string;
  maxCustomers: string;
  features: string;
}

export function Modal_EditSaaSPlan({
  open,
  onOpenChange,
  planData,
  onSave,
}: Modal_EditSaaSPlanProps) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<SaaSPlanFormData>({
    planName: "",
    price: "",
    maxCustomers: "",
    features: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof SaaSPlanFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isEditMode = !!planData;

  // Load plan data when editing
  useEffect(() => {
    if (planData) {
      setFormData(planData);
    } else {
      setFormData({
        planName: "",
        price: "",
        maxCustomers: "",
        features: "",
      });
    }
    setErrors({});
  }, [planData, open]);

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof SaaSPlanFormData, string>> = {};

    if (!formData.planName.trim()) {
      newErrors.planName = t("Plan name is required");
    }

    if (!formData.price.trim()) {
      newErrors.price = t("Price is required");
    } else if (!/^\$?\d+(\.\d{2})?$/.test(formData.price.replace(/,/g, ""))) {
      newErrors.price = t("Please enter a valid price (e.g., $299 or 299.00)");
    }

    if (!formData.maxCustomers.trim()) {
      newErrors.maxCustomers = t("Max customers is required");
    } else if (
      formData.maxCustomers.toLowerCase() !== "unlimited" &&
      !/^\d+$/.test(formData.maxCustomers)
    ) {
      newErrors.maxCustomers = t("Please enter a number or 'Unlimited'");
    }

    if (!formData.features.trim()) {
      newErrors.features = t("Features are required");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800));

      if (onSave) {
        onSave(formData);
      }

      toast.success(
        isEditMode
          ? t("SaaS plan updated successfully!")
          : t("SaaS plan created successfully!")
      );

      onOpenChange(false);
    } catch (error) {
      toast.error(t("Failed to save plan. Please try again."));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (!planData) {
      setFormData({
        planName: "",
        price: "",
        maxCustomers: "",
        features: "",
      });
    }
    setErrors({});
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]" aria-describedby="edit-plan-description">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? t("Edit SaaS Plan") : t("Create SaaS Plan")}
          </DialogTitle>
          <DialogDescription id="edit-plan-description">
            {isEditMode
              ? t("Update the details of this subscription plan.")
              : t("Create a new subscription plan for tenants.")}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            {/* Plan Name */}
            <InputWithIcon
              label={t("Plan Name")}
              type="text"
              placeholder={t("e.g., Professional")}
              value={formData.planName}
              onChange={(e) =>
                setFormData({ ...formData, planName: e.target.value })
              }
              leftIcon={<Package className="h-4 w-4" />}
              error={errors.planName}
              required
            />

            {/* Price */}
            <InputWithIcon
              label={t("Price ($/mo)")}
              type="text"
              placeholder={t("e.g., $299")}
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              leftIcon={<DollarSign className="h-4 w-4" />}
              error={errors.price}
              helperText={t("Enter the monthly subscription price")}
              required
            />

            {/* Max Customers */}
            <InputWithIcon
              label={t("Max Customers")}
              type="text"
              placeholder={t("e.g., 500 or Unlimited")}
              value={formData.maxCustomers}
              onChange={(e) =>
                setFormData({ ...formData, maxCustomers: e.target.value })
              }
              leftIcon={<Users className="h-4 w-4" />}
              error={errors.maxCustomers}
              helperText={t("Maximum number of customers or 'Unlimited'")}
              required
            />

            {/* Features */}
            <div className="space-y-2">
              <Label htmlFor="features">
                {t("Features")}
                <span className="text-destructive ml-1" aria-label="required">
                  *
                </span>
              </Label>
              <Textarea
                id="features"
                placeholder={t(
                  "Enter features, one per line:\n• Unlimited tickets\n• 24/7 support\n• Advanced reporting\n• API access"
                )}
                value={formData.features}
                onChange={(e) =>
                  setFormData({ ...formData, features: e.target.value })
                }
                rows={6}
                className={errors.features ? "border-destructive" : ""}
                aria-invalid={!!errors.features}
                aria-describedby={
                  errors.features
                    ? "features-error"
                    : "features-helper"
                }
                required
              />
              {errors.features ? (
                <p
                  id="features-error"
                  className="text-sm text-destructive"
                  role="alert"
                >
                  {errors.features}
                </p>
              ) : (
                <p
                  id="features-helper"
                  className="text-sm text-muted-foreground"
                >
                  {t("List the features included in this plan (one per line)")}
                </p>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={isSubmitting}
            >
              {t("Cancel")}
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? t("Saving...")
                : isEditMode
                ? t("Save Plan")
                : t("Create Plan")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
