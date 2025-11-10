import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { TrendingUp, Phone } from "lucide-react";

interface UpgradePlanModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UpgradePlanModal({ open, onOpenChange }: UpgradePlanModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <TrendingUp className="h-6 w-6 text-primary" />
          </div>
          <DialogTitle className="text-center">Upgrade Your Plan</DialogTitle>
          <DialogDescription className="text-center">
            Ready for more speed?
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <p className="text-center text-muted-foreground">
            To discuss our latest plans and upgrade your service, please contact our support
            team.
          </p>

          <div className="flex items-center justify-center gap-2 rounded-lg bg-muted p-4">
            <Phone className="h-5 w-5 text-primary" />
            <span className="text-lg">
              (02) 8-000-0000
            </span>
          </div>

          <p className="text-center text-muted-foreground text-sm">
            Our team is available Monday - Friday, 8:00 AM - 6:00 PM
          </p>
        </div>

        <DialogFooter className="sm:justify-center">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
