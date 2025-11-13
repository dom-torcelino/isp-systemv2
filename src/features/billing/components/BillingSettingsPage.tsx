import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

export function BillingSettingsPage() {
  const [gracePeriod, setGracePeriod] = useState("7");
  const [autoSuspension, setAutoSuspension] = useState(true);
  const [partialPayments, setPartialPayments] = useState(true);
  const [invoiceFooter, setInvoiceFooter] = useState(
    "Payment can be made via bank transfer to:\nBank Name: First National Bank\nAccount Number: 1234567890\nRouting Number: 987654321\n\nFor questions, contact billing@isp.com"
  );

  return (
    <div className="space-y-6">
      <div>
        <h3>Billing Configuration</h3>
        <p className="text-muted-foreground text-sm">
          Set the automated rules for your billing and collections
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Automated Collections</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Grace Period */}
          <div className="space-y-2">
            <Label htmlFor="grace-period">Billing Grace Period (in days)</Label>
            <Input
              id="grace-period"
              type="number"
              value={gracePeriod}
              onChange={(e) => setGracePeriod(e.target.value)}
              className="max-w-xs"
            />
            <p className="text-muted-foreground text-sm">
              Number of days after the due date before service is automatically suspended
            </p>
          </div>

          <Separator />

          {/* Auto Suspension */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="auto-suspension">Enable Automatic Suspension</Label>
            </div>
            <Switch
              id="auto-suspension"
              checked={autoSuspension}
              onCheckedChange={setAutoSuspension}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Payment Options</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="partial-payments">Allow Partial Payments</Label>
            </div>
            <Switch
              id="partial-payments"
              checked={partialPayments}
              onCheckedChange={setPartialPayments}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Invoice Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="invoice-footer">Invoice Footer Text</Label>
            <Textarea
              id="invoice-footer"
              value={invoiceFooter}
              onChange={(e) => setInvoiceFooter(e.target.value)}
              rows={6}
              placeholder="Add your bank details or custom messages here..."
            />
            <p className="text-muted-foreground text-sm">
              Add your bank details or custom messages here. This will appear on all customer invoices.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button>Save Billing Settings</Button>
      </div>
    </div>
  );
}
