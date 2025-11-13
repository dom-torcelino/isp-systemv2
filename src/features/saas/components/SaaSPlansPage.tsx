import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Check } from "lucide-react";
import { Modal_EditSaaSPlan, SaaSPlanFormData } from "@/features/saas/components/Modal_EditSaaSPlan";
import { useLanguage } from "@/contexts/LanguageContext"; 

const plans = [
  {
    id: 1,
    name: "Starter",
    price: "$99",
    period: "month",
    description: "Perfect for small ISPs getting started",
    features: [
      "Up to 100 Customers",
      "2 Support Agents",
      "5 Field Technicians",
      "Basic Reporting",
      "Email Support",
    ],
    popular: false,
  },
  {
    id: 2,
    name: "Professional",
    price: "$299",
    period: "month",
    description: "Ideal for growing ISP businesses",
    features: [
      "Up to 500 Customers",
      "10 Support Agents",
      "Unlimited Technicians",
      "Advanced Reporting",
      "Billing Module",
      "Priority Support",
    ],
    popular: true,
  },
  {
    id: 3,
    name: "Enterprise",
    price: "$799",
    period: "month",
    description: "For large-scale ISP operations",
    features: [
      "Unlimited Customers",
      "Unlimited Support Agents",
      "Unlimited Technicians",
      "Custom Reporting",
      "Full API Access",
      "Dedicated Account Manager",
      "White Label Option",
    ],
    popular: false,
  },
  {
    id: 4,
    name: "Custom",
    price: "Contact Us",
    period: "",
    description: "Tailored solutions for unique needs",
    features: [
      "Custom User Limits",
      "Bespoke Features",
      "On-Premise Deployment",
      "Advanced Security",
      "24/7 Phone Support",
      "SLA Guarantees",
    ],
    popular: false,
  },
];

export function SaaSPlansPage() {
  const { t } = useLanguage();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<SaaSPlanFormData | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2>SaaS Subscription Plans</h2>
          <p className="text-muted-foreground">Manage the subscription plans you sell to tenants</p>
        </div>
        <Button onClick={() => setShowCreateModal(true)}>
          <Plus className="mr-2 h-4 w-4" aria-hidden="true" />
          {t("Create New Plan")}
        </Button>
      </div>

      {/* Plans Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {plans.map((plan) => (
          <Card key={plan.id} className={plan.popular ? "border-primary shadow-lg" : ""}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription className="mt-2">{plan.description}</CardDescription>
                </div>
                {plan.popular && (
                  <Badge className="bg-primary">Popular</Badge>
                )}
              </div>
              <div className="mt-4">
                <span className="text-3xl">{plan.price}</span>
                {plan.period && (
                  <span className="text-muted-foreground ml-1">/ {plan.period}</span>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => {
                  // Convert plan to form data format
                  const planData: SaaSPlanFormData = {
                    planName: plan.name,
                    price: plan.price,
                    maxCustomers: plan.features[0], // First feature is the customer limit
                    features: plan.features.slice(1).join("\n• "), // Rest are features
                  };
                  setSelectedPlan(planData);
                  setShowEditModal(true);
                }}
              >
                <Edit className="mr-2 h-4 w-4" aria-hidden="true" />
                {t("Edit Plan")}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Stats Section */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Active Subscriptions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl text-primary">47</div>
            <p className="text-sm text-muted-foreground mt-1">Across all plans</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Monthly Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl text-primary">$14,053</div>
            <p className="text-sm text-muted-foreground mt-1">+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Most Popular Plan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl text-primary">Professional</div>
            <p className="text-sm text-muted-foreground mt-1">62% of tenants</p>
          </CardContent>
        </Card>
      </div>

      {/* Create Plan Modal */}
      <Modal_EditSaaSPlan
        open={showCreateModal}
        onOpenChange={setShowCreateModal}
        planData={null}
      />

      {/* Edit Plan Modal */}
      <Modal_EditSaaSPlan
        open={showEditModal}
        onOpenChange={setShowEditModal}
        planData={selectedPlan}
      />
    </div>
  );
}
