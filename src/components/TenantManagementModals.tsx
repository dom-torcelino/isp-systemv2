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
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { AlertTriangle, AlertOctagon } from "lucide-react";

// Edit Tenant Modal
interface EditTenantModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tenant: any;
}

export function EditTenantModal({
  open,
  onOpenChange,
  tenant,
}: EditTenantModalProps) {
  const [companyName, setCompanyName] = useState(tenant?.companyName || "");
  const [subscriptionPlan, setSubscriptionPlan] = useState(tenant?.subscriptionPlan || "");

  const handleSave = () => {
    alert(`Tenant "${companyName}" has been updated.`);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Tenant: {tenant?.companyName}</DialogTitle>
          <DialogDescription>
            Update tenant information and subscription plan
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="companyName">ISP Company Name</Label>
            <Input
              id="companyName"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Enter company name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="adminEmail">System Admin Email</Label>
            <Input
              id="adminEmail"
              value={tenant?.adminEmail || ""}
              disabled
              className="bg-muted cursor-not-allowed"
            />
            <p className="text-xs text-muted-foreground">
              Email address cannot be changed
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subscriptionPlan">Subscription Plan</Label>
            <Select value={subscriptionPlan} onValueChange={setSubscriptionPlan}>
              <SelectTrigger id="subscriptionPlan">
                <SelectValue placeholder="Select a plan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Starter">Starter - $99/mo</SelectItem>
                <SelectItem value="Professional">Professional - $299/mo</SelectItem>
                <SelectItem value="Enterprise">Enterprise - $799/mo</SelectItem>
                <SelectItem value="Custom">Custom - Contact Us</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Suspend Tenant Modal
interface SuspendTenantModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tenant: any;
}

export function SuspendTenantModal({
  open,
  onOpenChange,
  tenant,
}: SuspendTenantModalProps) {
  const handleSuspend = () => {
    alert(`Tenant "${tenant?.companyName}" has been suspended. All users are now locked out.`);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-warning/10">
            <AlertTriangle className="h-6 w-6 text-warning" />
          </div>
          <DialogTitle className="text-center">Suspend Tenant?</DialogTitle>
          <DialogDescription className="text-center">
            Are you sure you want to suspend this tenant?
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 text-center">
          <p className="text-muted-foreground">
            All their users will be locked out immediately, but their data will be preserved.
            You can reactivate this tenant at any time.
          </p>
        </div>

        <DialogFooter className="sm:justify-center gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleSuspend}>
            Suspend Tenant
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Deactivate Tenant Modal
interface DeactivateTenantModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tenant: any;
}

export function DeactivateTenantModal({
  open,
  onOpenChange,
  tenant,
}: DeactivateTenantModalProps) {
  const [confirmText, setConfirmText] = useState("");
  const isConfirmed = confirmText === "DEACTIVATE";

  const handleDeactivate = () => {
    alert(`Tenant "${tenant?.companyName}" has been permanently deactivated. Data deletion scheduled.`);
    setConfirmText("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
            <AlertOctagon className="h-6 w-6 text-destructive" />
          </div>
          <DialogTitle className="text-center">Deactivate Tenant?</DialogTitle>
          <DialogDescription className="text-center text-destructive">
            This action is permanent and cannot be undone
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <p className="text-center text-muted-foreground">
            All tenant data (users, tickets, customers) will be scheduled for deletion.
            This action is irreversible.
          </p>

          <div className="space-y-2">
            <Label htmlFor="confirmText">
              Type <span className="font-mono text-destructive">DEACTIVATE</span> to confirm
            </Label>
            <Input
              id="confirmText"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder="Type DEACTIVATE"
              className="font-mono"
            />
          </div>
        </div>

        <DialogFooter className="sm:justify-center gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDeactivate}
            disabled={!isConfirmed}
          >
            Confirm Deactivation
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
