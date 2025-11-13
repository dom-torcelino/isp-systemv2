import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Textarea } from "../../../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { Search } from "lucide-react";
import { useState } from "react";
import { Separator } from "../../../components/ui/separator";

interface CreateTicketModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateTicketModal({ open, onOpenChange }: CreateTicketModalProps) {
  const [selectedCustomer, setSelectedCustomer] = useState(false);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create New Ticket</DialogTitle>
          <DialogDescription>
            Search for a customer and create a support ticket
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Customer Search */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="customer-search">Search Customer</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="customer-search"
                  placeholder="Search by name, phone, or account ID..."
                  className="pl-10"
                  onFocus={() => setSelectedCustomer(true)}
                />
              </div>
            </div>
          </div>

          {selectedCustomer && (
            <>
              <Separator />

              {/* Customer Info */}
              <div className="space-y-4">
                <h4>Customer Information</h4>
                <div className="grid gap-4 rounded-lg bg-muted p-4">
                  <div className="grid gap-2 sm:grid-cols-2">
                    <div>
                      <p className="text-muted-foreground text-sm">Customer Name</p>
                      <p>John Smith</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm">Account ID</p>
                      <p>ACC-10472</p>
                    </div>
                  </div>
                  <div className="grid gap-2 sm:grid-cols-2">
                    <div>
                      <p className="text-muted-foreground text-sm">Service Address</p>
                      <p>123 Main St, Suite 100</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-sm">Account Status</p>
                      <p className="text-success">Active</p>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Ticket Details */}
              <div className="space-y-4">
                <h4>Ticket Details</h4>
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select>
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="installation">Installation</SelectItem>
                        <SelectItem value="repair">Repair</SelectItem>
                        <SelectItem value="transfer">Transfer</SelectItem>
                        <SelectItem value="billing">Billing</SelectItem>
                        <SelectItem value="upgrade">Upgrade</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority</Label>
                    <Select>
                      <SelectTrigger id="priority">
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Issue Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe the customer's issue..."
                      rows={4}
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={() => onOpenChange(false)} disabled={!selectedCustomer}>
            Create Ticket
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
