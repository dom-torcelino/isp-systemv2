import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

export function GlobalSettingsPage() {
  // Security tab state
  const [enforce2FA, setEnforce2FA] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState("30");

  // SaaS Billing tab state
  const [paymentGatewayKey, setPaymentGatewayKey] = useState("");

  // API Keys tab state
  const [smsGatewayKey, setSmsGatewayKey] = useState("");

  // Platform Defaults tab state
  const [minimumSLA, setMinimumSLA] = useState("4");

  const handleSaveChanges = () => {
    alert("Global settings saved successfully!");
  };

  return (
    <div className="space-y-6">
      <div>
        <h2>Global Platform Settings</h2>
        <p className="text-muted-foreground">
          Configure platform-wide settings and defaults for all tenants
        </p>
      </div>

      <Tabs defaultValue="security" className="space-y-6">
        <TabsList>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="billing">SaaS Billing</TabsTrigger>
          <TabsTrigger value="api">API Keys</TabsTrigger>
          <TabsTrigger value="defaults">Platform Defaults</TabsTrigger>
        </TabsList>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Mandatory Security</CardTitle>
              <CardDescription>
                Enforce security policies across all tenants
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1 flex-1">
                  <Label htmlFor="enforce2FA">
                    Enforce Two-Factor Authentication for all System Admins
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    All ISP owners will be required to enable 2FA on their accounts
                  </p>
                </div>
                <Switch
                  id="enforce2FA"
                  checked={enforce2FA}
                  onCheckedChange={setEnforce2FA}
                />
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="sessionTimeout">Session Timeout (in minutes)</Label>
                <Input
                  id="sessionTimeout"
                  type="number"
                  value={sessionTimeout}
                  onChange={(e) => setSessionTimeout(e.target.value)}
                  placeholder="30"
                  className="max-w-[200px]"
                />
                <p className="text-sm text-muted-foreground">
                  Users will be automatically logged out after this period of inactivity
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button onClick={handleSaveChanges}>Save Security Settings</Button>
          </div>
        </TabsContent>

        {/* SaaS Billing Tab */}
        <TabsContent value="billing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Payment Gateway Configuration</CardTitle>
              <CardDescription>
                Configure payment processing for tenant subscriptions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="paymentGateway">Stripe/Payment Gateway API Key</Label>
                <Input
                  id="paymentGateway"
                  type="password"
                  value={paymentGatewayKey}
                  onChange={(e) => setPaymentGatewayKey(e.target.value)}
                  placeholder="sk_live_xxxxxxxxxxxxxxxx"
                />
                <p className="text-sm text-muted-foreground">
                  Your secret API key for processing subscription payments
                </p>
              </div>

              <div className="rounded-lg border border-border bg-muted/50 p-4">
                <h4 className="mb-2 text-sm">Current Status</h4>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-success"></div>
                  <span className="text-sm text-muted-foreground">
                    Payment gateway is connected and active
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button onClick={handleSaveChanges}>Save Billing Settings</Button>
          </div>
        </TabsContent>

        {/* API Keys Tab */}
        <TabsContent value="api" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Global Service Keys</CardTitle>
              <CardDescription>
                Manage API keys for platform-wide integrations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="smsGateway">Global SMS Gateway API Key</Label>
                <Input
                  id="smsGateway"
                  type="password"
                  value={smsGatewayKey}
                  onChange={(e) => setSmsGatewayKey(e.target.value)}
                  placeholder="Enter SMS gateway API key"
                />
                <p className="text-sm text-muted-foreground">
                  Used for sending OTP and notification messages to all tenant customers
                </p>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Email Service Provider</Label>
                <Input
                  type="password"
                  placeholder="Enter email service API key"
                />
                <p className="text-sm text-muted-foreground">
                  Used for transactional emails across all tenants
                </p>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Google Maps API Key</Label>
                <Input
                  type="password"
                  placeholder="Enter Google Maps API key"
                />
                <p className="text-sm text-muted-foreground">
                  Used for technician tracking and location services
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button onClick={handleSaveChanges}>Save API Settings</Button>
          </div>
        </TabsContent>

        {/* Platform Defaults Tab */}
        <TabsContent value="defaults" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Tenant Minimums</CardTitle>
              <CardDescription>
                Set minimum values that tenants cannot go below
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="minimumSLA">Minimum SLA for High Priority (in hours)</Label>
                <Input
                  id="minimumSLA"
                  type="number"
                  value={minimumSLA}
                  onChange={(e) => setMinimumSLA(e.target.value)}
                  placeholder="4"
                  className="max-w-[200px]"
                />
                <p className="text-sm text-muted-foreground">
                  Tenants cannot set their SLA rules lower than this value
                </p>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Minimum Response Time for Medium Priority (in hours)</Label>
                <Input
                  type="number"
                  placeholder="8"
                  defaultValue="8"
                  className="max-w-[200px]"
                />
                <p className="text-sm text-muted-foreground">
                  Default minimum response time for medium priority tickets
                </p>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Maximum Session Duration (in hours)</Label>
                <Input
                  type="number"
                  placeholder="24"
                  defaultValue="24"
                  className="max-w-[200px]"
                />
                <p className="text-sm text-muted-foreground">
                  Maximum time a user can stay logged in before forced re-authentication
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button onClick={handleSaveChanges}>Save Platform Defaults</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
