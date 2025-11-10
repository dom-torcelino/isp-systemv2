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
import { useState } from "react";

interface CustomerCreateTicketModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CustomerCreateTicketModal({
  open,
  onOpenChange,
}: CustomerCreateTicketModalProps) {
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    // In a real application, this would submit the ticket to the backend
    alert("Ticket submitted successfully! Our team will respond shortly.");
    setCategory("");
    setDescription("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Submit New Service Request</DialogTitle>
          <DialogDescription>
            Our team will respond to your request as soon as possible.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="category">What do you need help with?</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger id="category">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="repair">Repair (Internet Down)</SelectItem>
                <SelectItem value="transfer">Transfer (Move Service)</SelectItem>
                <SelectItem value="it-support">IT Support (Other)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">
              Please describe the issue <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="description"
              placeholder="Tell us more about your request..."
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!category || !description.trim()}
          >
            Submit Request
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
