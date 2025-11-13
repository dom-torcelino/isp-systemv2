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

interface RebootDeviceModalProps {
  deviceName: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export function RebootDeviceModal({
  deviceName,
  open,
  onOpenChange,
  onConfirm,
}: RebootDeviceModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Are you sure?
          </DialogTitle>
          <DialogDescription>
            This action requires confirmation
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center gap-4 py-6">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10">
            <AlertTriangle className="h-10 w-10 text-destructive" />
          </div>
          
          <div className="space-y-2 text-center">
            <p className="text-sm">
              You are about to reboot <span className="font-semibold">{deviceName}</span>.
            </p>
            <p className="text-sm">
              This will cause a <span className="font-semibold">temporary service interruption</span> for 
              all connected customers.
            </p>
            <p className="text-sm text-muted-foreground">
              This action will be logged for audit purposes.
            </p>
          </div>
        </div>

        <DialogFooter className="sm:justify-between">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
          >
            Confirm Reboot
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
