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
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface EscalateTicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  ticketId?: string;
}

export function EscalateTicketModal({
  isOpen,
  onClose,
  ticketId = "TKT-1047",
}: EscalateTicketModalProps) {
  const [escalateTo, setEscalateTo] = useState("");
  const [reason, setReason] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(
      `Ticket Escalated!\nTicket ID: ${ticketId}\nEscalated To: ${escalateTo}\nReason: ${reason}`
    );
    onClose();
    setEscalateTo("");
    setReason("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Escalate Ticket {ticketId}</DialogTitle>
          <DialogDescription>
            Escalate this ticket to a higher support tier or specialized department.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="escalateTo">Escalate To</Label>
              <Select value={escalateTo} onValueChange={setEscalateTo}>
                <SelectTrigger id="escalateTo">
                  <SelectValue placeholder="Select department..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="System Admin">System Admin</SelectItem>
                  <SelectItem value="IT Department">IT Department</SelectItem>
                  <SelectItem value="Billing Department">Billing Department</SelectItem>
                  <SelectItem value="Senior Support">Senior Support</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="reason">Reason for Escalation *</Label>
              <Textarea
                id="reason"
                placeholder="Explain why this ticket needs to be escalated..."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows={4}
                required
              />
              <p className="text-xs text-muted-foreground">
                Provide details to help the receiving team understand the situation.
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Escalate Ticket</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
