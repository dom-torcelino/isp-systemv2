import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface DeactivateStaffModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userName: string;
}

export function DeactivateStaffModal({
  open,
  onOpenChange,
  userName,
}: DeactivateStaffModalProps) {
  const handleDeactivate = () => {
    // In a real application, this would call the API to deactivate the user
    alert(`${userName} has been deactivated and logged out.`);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
            <AlertTriangle className="h-6 w-6 text-destructive" />
          </div>
          <DialogTitle className="text-center">Deactivate Staff Member?</DialogTitle>
          <DialogDescription className="text-center">
            Are you sure you want to deactivate {userName}?
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 text-center">
          <p className="text-muted-foreground">
            Their account will be locked, and they will be logged out immediately. They will
            no longer be able to log in unless you reactivate them.
          </p>
        </div>

        <DialogFooter className="sm:justify-center gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDeactivate}>
            Deactivate Account
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
