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
import { Separator } from "./ui/separator";

interface LogPaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  customer?: any;
}

export function LogPaymentModal({ open, onOpenChange, customer }: LogPaymentModalProps) {
  const [paymentType, setPaymentType] = useState("full");
  const [amountPaid, setAmountPaid] = useState("");

  const amountDue = customer?.amountDue || "$0.00";
  const amountDueNumber = parseFloat(amountDue.replace("$", ""));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Log Payment</DialogTitle>
          <DialogDescription>
            Record a payment received from customer via cash or over the counter
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Customer Info */}
          {customer && (
            <div className="rounded-lg bg-muted p-4">
              <div className="grid gap-2">
                <div>
                  <p className="text-muted-foreground text-sm">Customer</p>
                  <p>{customer.customerName}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">Account Status</p>
                  <p className="text-destructive">{customer.accountStatus}</p>
                </div>
              </div>
            </div>
          )}

          <Separator />

          {/* Payment Details */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="amount-due">Amount Due</Label>
              <Input id="amount-due" value={amountDue} readOnly className="bg-muted" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="payment-type">Payment Type</Label>
              <Select value={paymentType} onValueChange={setPaymentType}>
                <SelectTrigger id="payment-type">
                  <SelectValue placeholder="Select payment type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full">Full Payment</SelectItem>
                  <SelectItem value="partial">Partial Payment</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount-paid">Amount Paid</Label>
              <Input
                id="amount-paid"
                type="number"
                placeholder="0.00"
                value={paymentType === "full" ? amountDueNumber : amountPaid}
                onChange={(e) => setAmountPaid(e.target.value)}
                disabled={paymentType === "full"}
              />
              {paymentType === "full" && (
                <p className="text-muted-foreground text-xs">
                  Full payment amount is automatically filled
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="payment-method">Payment Method</Label>
              <Select>
                <SelectTrigger id="payment-method">
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="bank">Bank Transfer</SelectItem>
                  <SelectItem value="check">Check</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="reference">Reference # (Optional)</Label>
              <Input id="reference" placeholder="Enter reference number" />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={() => onOpenChange(false)}>Log Payment</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
