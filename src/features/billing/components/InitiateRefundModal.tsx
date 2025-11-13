import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface InitiateRefundModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const customerOptions = [
  { id: "ACC-10472", name: "John Smith" },
  { id: "ACC-10471", name: "Sarah Johnson" },
  { id: "ACC-10469", name: "Michael Chen" },
  { id: "ACC-10468", name: "Emily Davis" },
  { id: "ACC-10467", name: "David Wilson" },
];

const invoicesByCustomer: Record<string, Array<{ id: string; amount: string }>> = {
  "ACC-10472": [
    { id: "INV-2847", amount: "$129.99" },
    { id: "INV-2831", amount: "$129.99" },
  ],
  "ACC-10471": [
    { id: "INV-2846", amount: "$89.99" },
    { id: "INV-2830", amount: "$89.99" },
  ],
  "ACC-10469": [
    { id: "INV-2845", amount: "$149.99" },
    { id: "INV-2829", amount: "$149.99" },
  ],
  "ACC-10468": [
    { id: "INV-2844", amount: "$99.99" },
  ],
  "ACC-10467": [
    { id: "INV-2843", amount: "$129.99" },
  ],
};

export function InitiateRefundModal({
  isOpen,
  onClose,
}: InitiateRefundModalProps) {
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [selectedInvoice, setSelectedInvoice] = useState("");
  const [amount, setAmount] = useState("");
  const [reason, setReason] = useState("");

  const availableInvoices = selectedCustomer
    ? invoicesByCustomer[selectedCustomer] || []
    : [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(
      `Refund Request Submitted:\nCustomer: ${selectedCustomer}\nInvoice: ${selectedInvoice}\nAmount: $${amount}\nReason: ${reason}`
    );
    onClose();
    // Reset form
    setSelectedCustomer("");
    setSelectedInvoice("");
    setAmount("");
    setReason("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Initiate Refund Request</DialogTitle>
          <DialogDescription>
            Create a refund request that requires System Admin approval before processing.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="customer">Select Customer</Label>
              <Select
                value={selectedCustomer}
                onValueChange={(value) => {
                  setSelectedCustomer(value);
                  setSelectedInvoice("");
                }}
              >
                <SelectTrigger id="customer">
                  <SelectValue placeholder="Search by name or ID..." />
                </SelectTrigger>
                <SelectContent>
                  {customerOptions.map((customer) => (
                    <SelectItem key={customer.id} value={customer.id}>
                      {customer.name} ({customer.id})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="invoice">Original Invoice #</Label>
              <Select
                value={selectedInvoice}
                onValueChange={setSelectedInvoice}
                disabled={!selectedCustomer}
              >
                <SelectTrigger id="invoice">
                  <SelectValue placeholder="Select an invoice..." />
                </SelectTrigger>
                <SelectContent>
                  {availableInvoices.map((invoice) => (
                    <SelectItem key={invoice.id} value={invoice.id}>
                      {invoice.id} - {invoice.amount}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {!selectedCustomer && (
                <p className="text-xs text-muted-foreground">
                  Select a customer first to see available invoices
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">Refund Amount ($)</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="reason">Reason for Refund *</Label>
              <Textarea
                id="reason"
                placeholder="Enter the reason for this refund request..."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows={3}
                required
              />
              <p className="text-xs text-muted-foreground">
                This will create a refund request. It must be approved by a System Admin before processing.
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Submit for Approval</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
