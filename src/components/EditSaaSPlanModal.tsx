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
import { Textarea } from "./ui/textarea";

interface EditSaaSPlanModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  plan: any;
}

export function EditSaaSPlanModal({
  open,
  onOpenChange,
  plan,
}: EditSaaSPlanModalProps) {
  const [planName, setPlanName] = useState(plan?.name || "");
  const [price, setPrice] = useState(plan?.price || "");
  const [maxCustomers, setMaxCustomers] = useState(
    plan?.features?.find((f: string) => f.includes("Customer"))?.match(/\d+/)?.[0] || ""
  );
  const [features, setFeatures] = useState(
    plan?.features?.join("\n• ") || ""
  );

  const handleSave = () => {
    alert(`Plan "${planName}" has been updated successfully.`);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Edit SaaS Plan: {plan?.name}</DialogTitle>
          <DialogDescription>
            Update plan details and features
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="planName">Plan Name</Label>
            <Input
              id="planName"
              value={planName}
              onChange={(e) => setPlanName(e.target.value)}
              placeholder="e.g., Professional"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Price ($/mo)</Label>
            <Input
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="e.g., $299"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="maxCustomers">Max Customers</Label>
            <Input
              id="maxCustomers"
              type="number"
              value={maxCustomers}
              onChange={(e) => setMaxCustomers(e.target.value)}
              placeholder="e.g., 500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="features">Features</Label>
            <Textarea
              id="features"
              value={features}
              onChange={(e) => setFeatures(e.target.value)}
              placeholder="Enter features (one per line)"
              rows={8}
              className="font-mono text-sm"
            />
            <p className="text-xs text-muted-foreground">
              Enter one feature per line. Start each line with a bullet point.
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Plan</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
