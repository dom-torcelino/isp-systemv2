'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, CreditCard, Ticket, Bell } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { PaymentConfirmationModal } from "@/features/customer-portal/components/PaymentConfirmationModal";
import { CustomerCreateTicketModal } from "@/features/customer-portal/components/CustomerCreateTicketModal";
import { UpgradePlanModal } from "@/features/customer-portal/components/UpgradePlanModal";
import { useState } from "react";

interface CustomerPortalDashboardProps {
  onNavigateToBilling?: () => void;
}

export function CustomerPortalDashboard({ onNavigateToBilling }: CustomerPortalDashboardProps) {
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [createTicketModalOpen, setCreateTicketModalOpen] = useState(false);
  const [upgradePlanModalOpen, setUpgradePlanModalOpen] = useState(false);
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h2>My Account</h2>
        <p className="text-muted-foreground">Welcome back, John Smith</p>
      </div>

      {/* Billing Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Billing Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm">Current Balance</p>
              <h3 className="mt-1 text-4xl">$89.99</h3>
            </div>
            <div className="text-right">
              <p className="text-muted-foreground text-sm">Due Date</p>
              <p className="mt-1">November 15, 2025</p>
            </div>
          </div>

          <Separator />

          <div className="flex gap-3">
            <Button className="flex-1" onClick={() => setPaymentModalOpen(true)}>
              <CreditCard className="mr-2 h-4 w-4" />
              Pay Now
            </Button>
            <Button variant="outline" className="flex-1" onClick={onNavigateToBilling}>
              View Billing History
            </Button>
          </div>

          <div className="rounded-lg bg-muted p-3">
            <div className="flex items-start gap-3">
              <AlertCircle className="mt-0.5 h-4 w-4 text-muted-foreground" />
              <div className="flex-1 text-sm">
                <p>Your payment method ending in ****4532 will be automatically charged on the
                due date.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Active Tickets */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Ticket className="h-5 w-5" />
            My Active Tickets
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg border border-border p-4">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <p>Ticket #TKT-1039</p>
                  <Badge>In Progress</Badge>
                </div>
                <p className="text-muted-foreground text-sm">
                  Issue: Internet connection intermittent
                </p>
                <p className="text-muted-foreground text-sm">Created: 2 days ago</p>
              </div>
            </div>
            <Separator className="my-3" />
            <div className="flex items-center gap-2 text-sm">
              <AlertCircle className="h-4 w-4 text-accent" />
              <span>Technician assigned - Mike Johnson</span>
            </div>
            <p className="mt-2 text-muted-foreground text-sm">
              Scheduled visit: November 6, 2025, 10:00 AM - 12:00 PM
            </p>
          </div>

          <Button
            variant="outline"
            className="w-full"
            onClick={() => setCreateTicketModalOpen(true)}
          >
            Create New Ticket
          </Button>
        </CardContent>
      </Card>

      {/* Service Details */}
      <Card>
        <CardHeader>
          <CardTitle>My Service Plan</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-muted-foreground text-sm">Plan</p>
              <p>Fiber 1 Gbps</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Monthly Rate</p>
              <p>$89.99/month</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Service Address</p>
              <p>123 Main St, Suite 100</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Account Status</p>
              <Badge variant="outline" className="text-success">
                Active
              </Badge>
            </div>
          </div>
          <Separator />
          <Button
            variant="outline"
            className="w-full"
            onClick={() => setUpgradePlanModalOpen(true)}
          >
            Upgrade Plan
          </Button>
        </CardContent>
      </Card>

      {/* Service Announcements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Service Announcements
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="rounded-lg border border-border p-3">
            <div className="flex items-start gap-3">
              <AlertCircle className="mt-0.5 h-4 w-4 text-accent" />
              <div className="flex-1">
                <p>Scheduled Maintenance</p>
                <p className="text-muted-foreground text-sm">
                  Network maintenance scheduled for November 10, 2025, 2:00 AM - 4:00 AM.
                  Brief service interruption may occur.
                </p>
                <p className="mt-1 text-muted-foreground text-xs">Posted: November 1, 2025</p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-border p-3">
            <div className="flex items-start gap-3">
              <AlertCircle className="mt-0.5 h-4 w-4 text-success" />
              <div className="flex-1">
                <p>Network Upgrade Complete</p>
                <p className="text-muted-foreground text-sm">
                  We've completed network upgrades in your area. You may experience improved
                  speeds and reliability.
                </p>
                <p className="mt-1 text-muted-foreground text-xs">Posted: October 28, 2025</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Modals */}
      <PaymentConfirmationModal
        open={paymentModalOpen}
        onOpenChange={setPaymentModalOpen}
        amount="$89.99"
      />
      <CustomerCreateTicketModal
        open={createTicketModalOpen}
        onOpenChange={setCreateTicketModalOpen}
      />
      <UpgradePlanModal
        open={upgradePlanModalOpen}
        onOpenChange={setUpgradePlanModalOpen}
      />
    </div>
  );
}
