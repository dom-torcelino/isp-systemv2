import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { InputWithIcon } from "@/components/InputWithIcon";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Building2, MapPin, User, Mail } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";

interface Modal_CreateTenantProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave?: (data: TenantFormData) => void;
}

export interface TenantFormData {
  companyName: string;
  businessAddress: string;
  subscriptionPlan: string;
  adminName: string;
  adminEmail: string;
}

export function Modal_CreateTenant({
  open,
  onOpenChange,
  onSave,
}: Modal_CreateTenantProps) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<TenantFormData>({
    companyName: "",
    businessAddress: "",
    subscriptionPlan: "",
    adminName: "",
    adminEmail: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof TenantFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof TenantFormData, string>> = {};

    if (!formData.companyName.trim()) {
      newErrors.companyName = t("Company name is required");
    }

    if (!formData.businessAddress.trim()) {
      newErrors.businessAddress = t("Business address is required");
    }

    if (!formData.subscriptionPlan) {
      newErrors.subscriptionPlan = t("Subscription plan is required");
    }

    if (!formData.adminName.trim()) {
      newErrors.adminName = t("Admin name is required");
    }

    if (!formData.adminEmail.trim()) {
      newErrors.adminEmail = t("Admin email is required");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.adminEmail)) {
      newErrors.adminEmail = t("Please enter a valid email address");
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
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (onSave) {
        onSave(formData);
      }

      toast.success(
        t(`Tenant created successfully! Activation email sent to ${{
          email: formData.adminEmail}}`)
      );

      // Reset form
      setFormData({
        companyName: "",
        businessAddress: "",
        subscriptionPlan: "",
        adminName: "",
        adminEmail: "",
      });
      setErrors({});
      onOpenChange(false);
    } catch (error) {
      toast.error(t("Failed to create tenant. Please try again."));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      companyName: "",
      businessAddress: "",
      subscriptionPlan: "",
      adminName: "",
      adminEmail: "",
    });
    setErrors({});
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]" aria-describedby="create-tenant-description">
        <DialogHeader>
          <DialogTitle>{t("Create New Tenant")}</DialogTitle>
          <DialogDescription id="create-tenant-description">
            {t(
              "Add a new ISP company to the platform. An activation email will be sent to the admin."
            )}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            {/* ISP Company Name */}
            <InputWithIcon
              label={t("ISP Company Name")}
              type="text"
              placeholder={t("e.g., FastNet Internet Services")}
              value={formData.companyName}
              onChange={(e) =>
                setFormData({ ...formData, companyName: e.target.value })
              }
              leftIcon={<Building2 className="h-4 w-4" />}
              error={errors.companyName}
              required
            />

            {/* Business Address */}
            <InputWithIcon
              label={t("Business Address")}
              type="text"
              placeholder={t("e.g., 123 Main St, Quezon City, Metro Manila")}
              value={formData.businessAddress}
              onChange={(e) =>
                setFormData({ ...formData, businessAddress: e.target.value })
              }
              leftIcon={<MapPin className="h-4 w-4" />}
              error={errors.businessAddress}
              required
            />

            {/* Subscription Plan */}
            <div className="space-y-2">
              <Label htmlFor="subscription-plan">
                {t("Subscription Plan")}
                <span className="text-destructive ml-1" aria-label="required">
                  *
                </span>
              </Label>
              <Select
                value={formData.subscriptionPlan}
                onValueChange={(value) =>
                  setFormData({ ...formData, subscriptionPlan: value })
                }
              >
                <SelectTrigger
                  id="subscription-plan"
                  className={errors.subscriptionPlan ? "border-destructive" : ""}
                  aria-invalid={!!errors.subscriptionPlan}
                  aria-describedby={
                    errors.subscriptionPlan ? "subscription-plan-error" : undefined
                  }
                >
                  <SelectValue placeholder={t("Select a plan")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="starter">
                    {t("Starter")} - {t("Up to 100 customers")}
                  </SelectItem>
                  <SelectItem value="professional">
                    {t("Professional")} - {t("Up to 500 customers")}
                  </SelectItem>
                  <SelectItem value="enterprise">
                    {t("Enterprise")} - {t("Unlimited customers")}
                  </SelectItem>
                </SelectContent>
              </Select>
              {errors.subscriptionPlan && (
                <p
                  id="subscription-plan-error"
                  className="text-sm text-destructive"
                  role="alert"
                >
                  {errors.subscriptionPlan}
                </p>
              )}
            </div>

            {/* Default System Admin Name */}
            <InputWithIcon
              label={t("Default System Admin Name")}
              type="text"
              placeholder={t("e.g., Juan Dela Cruz")}
              value={formData.adminName}
              onChange={(e) =>
                setFormData({ ...formData, adminName: e.target.value })
              }
              leftIcon={<User className="h-4 w-4" />}
              error={errors.adminName}
              helperText={t("This person will have full administrative access")}
              required
            />

            {/* Default System Admin Email */}
            <InputWithIcon
              label={t("Default System Admin Email")}
              type="email"
              placeholder={t("e.g., admin@fastnet.com")}
              value={formData.adminEmail}
              onChange={(e) =>
                setFormData({ ...formData, adminEmail: e.target.value })
              }
              leftIcon={<Mail className="h-4 w-4" />}
              error={errors.adminEmail}
              helperText={t("Activation instructions will be sent to this email")}
              required
            />
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
              {isSubmitting ? t("Creating...") : t("Save and Activate")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
