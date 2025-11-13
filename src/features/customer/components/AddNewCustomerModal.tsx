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
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

interface AddNewCustomerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddNewCustomerModal({
  open,
  onOpenChange,
}: AddNewCustomerModalProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [serviceAddress, setServiceAddress] = useState("");
  const [servicePlan, setServicePlan] = useState("");
  const [billingCycle, setBillingCycle] = useState("");
  const [createTicket, setCreateTicket] = useState(false);

  const handleSubmit = () => {
    // In a real application, this would call the API
    alert(`Customer ${fullName} created successfully!${createTicket ? " Installation ticket has been created." : ""}`);
    
    // Reset form
    setFullName("");
    setEmail("");
    setPhoneNumber("");
    setServiceAddress("");
    setServicePlan("");
    setBillingCycle("");
    setCreateTicket(false);
    
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>+ Add New Customer</DialogTitle>
          <DialogDescription>
            Create a new customer account with service details
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Section 1: Account Details */}
          <div className="space-y-4">
            <h4>Account Details</h4>
            <Separator />

            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter customer's full name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="customer@email.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="+1 (555) 123-4567"
              />
            </div>
          </div>

          {/* Section 2: Service & Billing */}
          <div className="space-y-4">
            <h4>Service & Billing</h4>
            <Separator />

            <div className="space-y-2">
              <Label htmlFor="serviceAddress">Service Address</Label>
              <Input
                id="serviceAddress"
                value={serviceAddress}
                onChange={(e) => setServiceAddress(e.target.value)}
                placeholder="123 Main St, City, State ZIP"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="servicePlan">Service Plan</Label>
              <Select value={servicePlan} onValueChange={setServicePlan}>
                <SelectTrigger id="servicePlan">
                  <SelectValue placeholder="Select a plan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fiber-1gbps">Fiber 1 Gbps</SelectItem>
                  <SelectItem value="fiber-500mbps">Fiber 500 Mbps</SelectItem>
                  <SelectItem value="fiber-200mbps">Fiber 200 Mbps</SelectItem>
                  <SelectItem value="cable-200mbps">Cable 200 Mbps</SelectItem>
                  <SelectItem value="cable-100mbps">Cable 100 Mbps</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="billingCycle">Billing Cycle</Label>
              <Select value={billingCycle} onValueChange={setBillingCycle}>
                <SelectTrigger id="billingCycle">
                  <SelectValue placeholder="Select billing cycle" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1st">1st of Month</SelectItem>
                  <SelectItem value="15th">15th of Month</SelectItem>
                  <SelectItem value="custom">Custom Date</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Section 3: First Ticket (Optional) */}
          <div className="space-y-4">
            <h4>First Ticket (Optional)</h4>
            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="createTicket">Create installation ticket for this customer?</Label>
                <p className="text-sm text-muted-foreground">
                  Automatically creates a new installation ticket
                </p>
              </div>
              <Switch
                id="createTicket"
                checked={createTicket}
                onCheckedChange={setCreateTicket}
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            Save and Create Customer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
