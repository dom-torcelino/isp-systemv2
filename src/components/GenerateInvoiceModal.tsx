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

interface GenerateInvoiceModalProps {
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

export function GenerateInvoiceModal({
  isOpen,
  onClose,
}: GenerateInvoiceModalProps) {
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(
      `Invoice Generated:\nCustomer: ${selectedCustomer}\nDescription: ${description}\nAmount: $${amount}\nDue Date: ${dueDate}`
    );
    onClose();
    // Reset form
    setSelectedCustomer("");
    setDescription("");
    setAmount("");
    setDueDate("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Generate Manual Invoice</DialogTitle>
          <DialogDescription>
            Create a custom invoice for one-time charges or services.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="customer">Select Customer</Label>
              <Select
                value={selectedCustomer}
                onValueChange={setSelectedCustomer}
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
              <Label htmlFor="description">Line Item Description</Label>
              <Input
                id="description"
                placeholder="e.g., On-site service fee"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">Amount ($)</Label>
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
              <Label htmlFor="dueDate">Due Date</Label>
              <Input
                id="dueDate"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Generate and Send Invoice</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
