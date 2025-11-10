import { useState } from "react";
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
import { Server, Globe, User, Lock } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { toast } from "sonner";

interface Modal_AddNetworkDeviceProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave?: (data: NetworkDeviceFormData) => void;
}

export interface NetworkDeviceFormData {
  deviceName: string;
  ipAddress: string;
  apiUsername: string;
  apiPassword: string;
}

export function Modal_AddNetworkDevice({
  open,
  onOpenChange,
  onSave,
}: Modal_AddNetworkDeviceProps) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<NetworkDeviceFormData>({
    deviceName: "",
    ipAddress: "",
    apiUsername: "",
    apiPassword: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof NetworkDeviceFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof NetworkDeviceFormData, string>> = {};

    if (!formData.deviceName.trim()) {
      newErrors.deviceName = t("Device name is required");
    }

    if (!formData.ipAddress.trim()) {
      newErrors.ipAddress = t("IP address or hostname is required");
    } else {
      // Simple IP or hostname validation
      const ipPattern = /^(\d{1,3}\.){3}\d{1,3}$/;
      const hostnamePattern = /^[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
      
      if (!ipPattern.test(formData.ipAddress) && !hostnamePattern.test(formData.ipAddress)) {
        newErrors.ipAddress = t("Please enter a valid IP address or hostname");
      }
    }

    if (!formData.apiUsername.trim()) {
      newErrors.apiUsername = t("API username is required");
    }

    if (!formData.apiPassword.trim()) {
      newErrors.apiPassword = t("API password is required");
    } else if (formData.apiPassword.length < 6) {
      newErrors.apiPassword = t("Password must be at least 6 characters");
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
      await new Promise((resolve) => setTimeout(resolve, 1500));

      if (onSave) {
        onSave(formData);
      }

      toast.success(
        t(`Device added successfully! Attempting to connect to ${{
          device: formData.deviceName,
        }}`)
      );

      // Reset form
      setFormData({
        deviceName: "",
        ipAddress: "",
        apiUsername: "",
        apiPassword: "",
      });
      setErrors({});
      onOpenChange(false);
    } catch (error) {
      toast.error(t("Failed to add device. Please check credentials and try again."));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      deviceName: "",
      ipAddress: "",
      apiUsername: "",
      apiPassword: "",
    });
    setErrors({});
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]" aria-describedby="add-device-description">
        <DialogHeader>
          <DialogTitle>{t("Add New Network Device")}</DialogTitle>
          <DialogDescription id="add-device-description">
            {t(
              "Connect a new Mikrotik device to the monitoring system. Ensure the device is accessible via the network."
            )}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            {/* Device Name */}
            <InputWithIcon
              label={t("Device Name")}
              type="text"
              placeholder={t("e.g., Main Router - Area 5")}
              value={formData.deviceName}
              onChange={(e) =>
                setFormData({ ...formData, deviceName: e.target.value })
              }
              leftIcon={<Server className="h-4 w-4" />}
              error={errors.deviceName}
              helperText={t("A friendly name to identify this device")}
              required
            />

            {/* IP Address / Hostname */}
            <InputWithIcon
              label={t("IP Address / Hostname")}
              type="text"
              placeholder={t("e.g., 192.168.1.1 or router.local")}
              value={formData.ipAddress}
              onChange={(e) =>
                setFormData({ ...formData, ipAddress: e.target.value })
              }
              leftIcon={<Globe className="h-4 w-4" />}
              error={errors.ipAddress}
              helperText={t("Network address of the device")}
              required
            />

            {/* API Username */}
            <InputWithIcon
              label={t("API Username")}
              type="text"
              placeholder={t("e.g., admin")}
              value={formData.apiUsername}
              onChange={(e) =>
                setFormData({ ...formData, apiUsername: e.target.value })
              }
              leftIcon={<User className="h-4 w-4" />}
              error={errors.apiUsername}
              helperText={t("Username for device API access")}
              required
            />

            {/* API Password */}
            <InputWithIcon
              label={t("API Password")}
              type="password"
              placeholder={t("Enter API password")}
              value={formData.apiPassword}
              onChange={(e) =>
                setFormData({ ...formData, apiPassword: e.target.value })
              }
              leftIcon={<Lock className="h-4 w-4" />}
              error={errors.apiPassword}
              helperText={t("Password for secure API access")}
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
              {isSubmitting ? t("Connecting...") : t("Save and Connect")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
