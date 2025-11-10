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
import { Alert, AlertDescription } from "./ui/alert";
import { Send } from "lucide-react";

interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user?: {
    name: string;
    email: string;
    role: string;
  };
}

export function EditUserModal({ isOpen, onClose, user }: EditUserModalProps) {
  const [name, setName] = useState(user?.name || "");
  const [role, setRole] = useState(user?.role || "");
  const email = user?.email || "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`User Updated!\nName: ${name}\nRole: ${role}`);
    onClose();
  };

  const handleSendPasswordReset = () => {
    alert(`Password reset link sent to: ${email}`);
  };

  const handleDeactivateUser = () => {
    if (
      confirm(
        `Are you sure you want to deactivate ${name}? They will no longer be able to access the system.`
      )
    ) {
      alert(`User ${name} has been deactivated.`);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit User: {user?.name}</DialogTitle>
          <DialogDescription>
            Update user information and manage their account.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
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
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={email}
                disabled
                className="bg-muted cursor-not-allowed"
              />
              <p className="text-xs text-muted-foreground">
                Email cannot be changed for security reasons.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger id="role">
                  <SelectValue placeholder="Choose a role..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Customer Support">Customer Support</SelectItem>
                  <SelectItem value="Field Technician">Field Technician</SelectItem>
                  <SelectItem value="IT">IT</SelectItem>
                  <SelectItem value="System Admin">System Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Alert>
              <Send className="h-4 w-4" />
              <AlertDescription>
                <Button
                  type="button"
                  variant="link"
                  className="h-auto p-0"
                  onClick={handleSendPasswordReset}
                >
                  Send Password Reset Link
                </Button>{" "}
                to this user's email.
              </AlertDescription>
            </Alert>
          </div>

          <DialogFooter className="flex-col gap-2 sm:flex-row sm:justify-between">
            <Button
              type="button"
              variant="destructive"
              onClick={handleDeactivateUser}
              className="sm:mr-auto"
            >
              Deactivate User
            </Button>
            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
