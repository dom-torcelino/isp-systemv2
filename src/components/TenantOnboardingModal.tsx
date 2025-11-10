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
import { Separator } from "./ui/separator";

interface TenantOnboardingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TenantOnboardingModal({ open, onOpenChange }: TenantOnboardingModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create New Tenant</DialogTitle>
          <DialogDescription>
            Set up a new ISP business and configure their system access
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* ISP Business Details */}
          <div className="space-y-4">
            <h4>ISP Business Details</h4>
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="company">ISP Company Name</Label>
                <Input id="company" placeholder="Enter company name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Business Address</Label>
                <Input id="address" placeholder="Enter business address" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="phone">Contact Phone</Label>
                  <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Contact Email</Label>
                  <Input id="email" type="email" placeholder="contact@isp.com" />
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* System Administrator */}
          <div className="space-y-4">
            <h4>Default System Administrator</h4>
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="admin-name">Admin Full Name</Label>
                <Input id="admin-name" placeholder="Enter admin name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="admin-email">Admin Email</Label>
                <Input id="admin-email" type="email" placeholder="admin@isp.com" />
              </div>
            </div>
          </div>

          <Separator />

          {/* Subscription & Billing */}
          <div className="space-y-4">
            <h4>Subscription & Billing</h4>
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="plan">Subscription Plan</Label>
                <Select>
                  <SelectTrigger id="plan">
                    <SelectValue placeholder="Select a plan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="starter">Starter - $99/month</SelectItem>
                    <SelectItem value="professional">Professional - $249/month</SelectItem>
                    <SelectItem value="enterprise">Enterprise - $499/month</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="payment-method">Payment Method</Label>
                <Input id="payment-method" placeholder="Credit card ending in ****" />
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={() => onOpenChange(false)}>Save and Activate</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
