import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Building2, Package, AlertTriangle, AlertCircle } from "lucide-react";
import { Modal_CreateTenant } from "../Modal_CreateTenant";
import { Modal_EditSaaSPlan } from "../Modal_EditSaaSPlan";
import { Modal_SuspendTenant } from "../Modal_SuspendTenant";
import { Modal_DeactivateTenant } from "../Modal_DeactivateTenant";
import { Badge } from "../ui/badge";

export function SuperAdminModalsDemo() {
  const [showCreateTenant, setShowCreateTenant] = useState(false);
  const [showEditPlan, setShowEditPlan] = useState(false);
  const [showSuspend, setShowSuspend] = useState(false);
  const [showDeactivate, setShowDeactivate] = useState(false);

  const samplePlan = {
    planName: "Professional",
    price: "$299",
    maxCustomers: "500",
    features:
      "• Unlimited tickets\n• 10 Support Agents\n• Advanced reporting\n• Billing Module\n• Priority Support",
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl mb-3">Super Admin Modals</h1>
          <p className="text-muted-foreground">
            Interactive demo of all Super Admin tenant and plan management modals
          </p>
        </div>

        {/* Modal Demos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Create Tenant Modal */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Building2 className="h-6 w-6 text-primary" aria-hidden="true" />
                </div>
                <div>
                  <CardTitle>Create New Tenant</CardTitle>
                  <Badge variant="secondary" className="mt-1">
                    Form Modal
                  </Badge>
                </div>
              </div>
              <CardDescription>
                Medium-width modal with form fields for creating a new ISP tenant.
                Includes validation and accessible error messages.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm space-y-1">
                <p className="font-medium">Features:</p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-2">
                  <li>ISP Company Name input</li>
                  <li>Business Address input</li>
                  <li>Subscription Plan dropdown</li>
                  <li>Admin Name & Email inputs</li>
                  <li>Email validation</li>
                  <li>Form validation with error states</li>
                  <li>Loading state on submit</li>
                </ul>
              </div>
              <Button onClick={() => setShowCreateTenant(true)} className="w-full">
                Open Create Tenant Modal
              </Button>
            </CardContent>
          </Card>

          {/* Edit SaaS Plan Modal */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                  <Package className="h-6 w-6 text-accent" aria-hidden="true" />
                </div>
                <div>
                  <CardTitle>Edit SaaS Plan</CardTitle>
                  <Badge variant="secondary" className="mt-1">
                    Form Modal
                  </Badge>
                </div>
              </div>
              <CardDescription>
                Small-width modal for creating or editing subscription plans.
                Supports both create and edit modes.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm space-y-1">
                <p className="font-medium">Features:</p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-2">
                  <li>Plan Name input</li>
                  <li>Price input with validation</li>
                  <li>Max Customers input (number or "Unlimited")</li>
                  <li>Features textarea (multiline)</li>
                  <li>Edit mode pre-fills data</li>
                  <li>Create mode starts empty</li>
                  <li>Dynamic button labels</li>
                </ul>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => setShowEditPlan(true)}
                  variant="outline"
                  className="flex-1"
                >
                  Open Create Mode
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Suspend Tenant Modal */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-warning/10">
                  <AlertTriangle className="h-6 w-6 text-warning" aria-hidden="true" />
                </div>
                <div>
                  <CardTitle>Suspend Tenant</CardTitle>
                  <Badge variant="outline" className="mt-1 border-warning text-warning">
                    Warning Modal
                  </Badge>
                </div>
              </div>
              <CardDescription>
                Small confirmation modal with warning styling for suspending a
                tenant. Reversible action.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm space-y-1">
                <p className="font-medium">Features:</p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-2">
                  <li>Warning icon and styling</li>
                  <li>Consequences list in highlighted box</li>
                  <li>Destructive "Suspend" button</li>
                  <li>Cancel button to abort</li>
                  <li>Loading state during action</li>
                  <li>Success toast on confirm</li>
                  <li>Tenant name displayed in message</li>
                </ul>
              </div>
              <Button
                onClick={() => setShowSuspend(true)}
                variant="outline"
                className="w-full border-warning text-warning hover:bg-warning/10"
              >
                Open Suspend Modal
              </Button>
            </CardContent>
          </Card>

          {/* Deactivate Tenant Modal */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-destructive/10">
                  <AlertCircle className="h-6 w-6 text-destructive" aria-hidden="true" />
                </div>
                <div>
                  <CardTitle>Deactivate Tenant</CardTitle>
                  <Badge variant="destructive" className="mt-1">
                    Destructive Modal
                  </Badge>
                </div>
              </div>
              <CardDescription>
                Two-step confirmation modal requiring user to type "DEACTIVATE"
                to enable the confirm button. Permanent action.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm space-y-1">
                <p className="font-medium">Features:</p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-2">
                  <li>Danger icon and styling</li>
                  <li>Strong warning messages</li>
                  <li>Detailed consequences list</li>
                  <li>Type-to-confirm input field</li>
                  <li>Button disabled until "DEACTIVATE" typed</li>
                  <li>Real-time validation feedback</li>
                  <li>Destructive action button</li>
                </ul>
              </div>
              <Button
                onClick={() => setShowDeactivate(true)}
                variant="destructive"
                className="w-full"
              >
                Open Deactivate Modal
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Implementation Notes */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Implementation Notes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Accessibility Features (WCAG AA):</h4>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside ml-2">
                <li>All modals have proper ARIA labels and descriptions</li>
                <li>Form fields have associated labels and error messages</li>
                <li>Required fields marked visually and semantically</li>
                <li>Keyboard navigation support (Tab, Enter, Escape)</li>
                <li>Focus trap within modal (can't tab outside)</li>
                <li>Screen reader announcements for dynamic content</li>
                <li>4.5:1 color contrast ratio maintained</li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-2">Usage in Application:</h4>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside ml-2">
                <li>
                  <strong>SuperAdminDashboard:</strong> "Create New Tenant" button →
                  Modal_CreateTenant
                </li>
                <li>
                  <strong>TenantManagementPage:</strong> "⋮" menu → Suspend/Deactivate
                  actions
                </li>
                <li>
                  <strong>SaaSPlansPage:</strong> "Create New Plan" and "Edit Plan" →
                  Modal_EditSaaSPlan
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-2">Component Files:</h4>
              <ul className="text-sm font-mono text-muted-foreground space-y-1 list-disc list-inside ml-2">
                <li>/components/Modal_CreateTenant.tsx</li>
                <li>/components/Modal_EditSaaSPlan.tsx</li>
                <li>/components/Modal_SuspendTenant.tsx</li>
                <li>/components/Modal_DeactivateTenant.tsx</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Modals */}
        <Modal_CreateTenant
          open={showCreateTenant}
          onOpenChange={setShowCreateTenant}
        />

        <Modal_EditSaaSPlan
          open={showEditPlan}
          onOpenChange={setShowEditPlan}
          planData={null} // null for create mode
        />

        <Modal_SuspendTenant
          open={showSuspend}
          onOpenChange={setShowSuspend}
          tenantName="FastNet ISP"
        />

        <Modal_DeactivateTenant
          open={showDeactivate}
          onOpenChange={setShowDeactivate}
          tenantName="FastNet ISP"
        />
      </div>
    </div>
  );
}
