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
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "./ui/alert";

interface EditTenantModalProps {
  open: boolean;
  onClose: () => void;
  tenantName: string;
}

export function EditTenantModal({ open, onClose, tenantName }: EditTenantModalProps) {
  const [companyName, setCompanyName] = useState(tenantName);
  const [adminEmail, setAdminEmail] = useState("admin@fastnet.com");
  const [subscriptionPlan, setSubscriptionPlan] = useState("professional");

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Tenant: {tenantName}</DialogTitle>
          <DialogDescription>
            Update tenant information and subscription details
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="company-name">ISP Company Name</Label>
            <Input
              id="company-name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="admin-email">System Admin Email</Label>
            <Input
              id="admin-email"
              type="email"
              value={adminEmail}
              onChange={(e) => setAdminEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="subscription-plan">Subscription Plan</Label>
            <Select value={subscriptionPlan} onValueChange={setSubscriptionPlan}>
              <SelectTrigger id="subscription-plan">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="starter">Starter - $99/month</SelectItem>
                <SelectItem value="professional">Professional - $299/month</SelectItem>
                <SelectItem value="enterprise">Enterprise - $799/month</SelectItem>
                <SelectItem value="custom">Custom Plan</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onClose}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

interface SuspendTenantModalProps {
  open: boolean;
  onClose: () => void;
  tenantName: string;
}

export function SuspendTenantModal({ open, onClose, tenantName }: SuspendTenantModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Suspend Tenant?</DialogTitle>
          <DialogDescription>
            Are you sure you want to suspend {tenantName}?
          </DialogDescription>
        </DialogHeader>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            All users of this tenant will be locked out immediately. The tenant can be reactivated later.
          </AlertDescription>
        </Alert>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onClose}>
            Suspend Tenant
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

interface DeactivateTenantModalProps {
  open: boolean;
  onClose: () => void;
  tenantName: string;
}

export function DeactivateTenantModal({ open, onClose, tenantName }: DeactivateTenantModalProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [confirmText, setConfirmText] = useState("");

  const handleClose = () => {
    setStep(1);
    setConfirmText("");
    onClose();
  };

  const handleConfirmStep1 = () => {
    if (confirmText === "DEACTIVATE") {
      setStep(2);
      setConfirmText("");
    }
  };

  const handleFinalDeactivate = () => {
    // Perform deactivation
    handleClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Deactivate Tenant {step === 1 ? "(Step 1 of 2)" : "(Step 2 of 2)"}
          </DialogTitle>
          <DialogDescription>
            {step === 1 ? `Permanently delete ${tenantName}` : "Final confirmation required"}
          </DialogDescription>
        </DialogHeader>

        {step === 1 ? (
          <>
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                This action is permanent and cannot be undone. All tenant data will be deleted immediately.
              </AlertDescription>
            </Alert>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="confirm-text">
                  Type <span className="font-mono">DEACTIVATE</span> to proceed
                </Label>
                <Input
                  id="confirm-text"
                  value={confirmText}
                  onChange={(e) => setConfirmText(e.target.value)}
                  placeholder="DEACTIVATE"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button 
                variant="destructive" 
                onClick={handleConfirmStep1}
                disabled={confirmText !== "DEACTIVATE"}
              >
                Confirm Deactivation
              </Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Last chance! Are you absolutely sure you want to permanently delete {tenantName} and all associated data?
              </AlertDescription>
            </Alert>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="final-confirm">
                  Type the tenant name <span className="font-mono">{tenantName}</span> to confirm
                </Label>
                <Input
                  id="final-confirm"
                  value={confirmText}
                  onChange={(e) => setConfirmText(e.target.value)}
                  placeholder={tenantName}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button 
                variant="destructive" 
                onClick={handleFinalDeactivate}
                disabled={confirmText !== tenantName}
              >
                Permanently Delete Tenant
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
