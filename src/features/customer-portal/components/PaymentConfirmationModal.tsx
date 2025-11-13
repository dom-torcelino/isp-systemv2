import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";

interface PaymentConfirmationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  amount: string;
}

export function PaymentConfirmationModal({
  open,
  onOpenChange,
  amount,
}: PaymentConfirmationModalProps) {
  const handleProceedToPayment = () => {
    // In a real application, this would redirect to the payment gateway
    // For now, we'll just show a success message
    alert("Redirecting to secure payment gateway...");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Lock className="h-6 w-6 text-primary" />
          </div>
          <DialogTitle className="text-center">Complete Your Payment</DialogTitle>
          <DialogDescription className="text-center">
            You are being redirected to our secure payment partner.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 text-center">
          <p className="text-muted-foreground">
            You will be securely redirected to complete your payment for{" "}
            <span className="text-primary">{amount}</span>. Please have your GCash/PayMaya ready.
          </p>
        </div>

        <DialogFooter className="sm:justify-center">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleProceedToPayment}>Proceed to Payment</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
