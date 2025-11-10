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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";

interface EditCustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  customer?: {
    name: string;
    email: string;
    phone: string;
    address: string;
    servicePlan: string;
    status: string;
  };
}

export function EditCustomerModal({
  isOpen,
  onClose,
  customer,
}: EditCustomerModalProps) {
  const [name, setName] = useState(customer?.name || "");
  const [email, setEmail] = useState(customer?.email || "");
  const [phone, setPhone] = useState(customer?.phone || "");
  const [address, setAddress] = useState(customer?.address || "");
  const [servicePlan, setServicePlan] = useState(customer?.servicePlan || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(
      `Customer Updated!\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nAddress: ${address}\nService Plan: ${servicePlan}`
    );
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Customer: {customer?.name}</DialogTitle>
          <DialogDescription>
            Update customer information and service details.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <Tabs defaultValue="contact" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="contact">Contact Info</TabsTrigger>
              <TabsTrigger value="service">Service & Billing</TabsTrigger>
            </TabsList>

            <TabsContent value="contact" className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Service Address</Label>
                <Input
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>
            </TabsContent>

            <TabsContent value="service" className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="servicePlan">Service Plan</Label>
                <Select value={servicePlan} onValueChange={setServicePlan}>
                  <SelectTrigger id="servicePlan">
                    <SelectValue placeholder="Select a plan..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Fiber 1 Gbps">Fiber 1 Gbps - $129.99/mo</SelectItem>
                    <SelectItem value="Fiber 500 Mbps">Fiber 500 Mbps - $89.99/mo</SelectItem>
                    <SelectItem value="Cable 250 Mbps">Cable 250 Mbps - $59.99/mo</SelectItem>
                    <SelectItem value="DSL 100 Mbps">DSL 100 Mbps - $39.99/mo</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Account Status</Label>
                <div className="flex items-center gap-2 rounded-lg border border-border bg-muted p-3">
                  <Badge variant="default">{customer?.status || "Active"}</Badge>
                  <span className="text-sm text-muted-foreground">
                    Cannot be changed here. Use account actions.
                  </span>
                </div>
              </div>

              <div className="rounded-lg bg-muted p-3 text-sm text-muted-foreground">
                <p>
                  <strong>Note:</strong> Changing the service plan will be reflected in the next billing cycle.
                </p>
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter className="mt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
