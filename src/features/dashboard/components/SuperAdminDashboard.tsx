import { useState } from "react";
import { KPICard } from "@/components/KPICard";
import { DataTable } from "@/components/DataTable";
import { DollarSign, Users, TrendingDown, Activity, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Modal_CreateTenant } from "@/features/tenant/components/Modal_CreateTenant";

const revenueData = [
  { month: "Jan", revenue: 45000 },
  { month: "Feb", revenue: 52000 },
  { month: "Mar", revenue: 48000 },
  { month: "Apr", revenue: 61000 },
  { month: "May", revenue: 55000 },
  { month: "Jun", revenue: 67000 },
  { month: "Jul", revenue: 72000 },
  { month: "Aug", revenue: 78000 },
  { month: "Sep", revenue: 81000 },
  { month: "Oct", revenue: 87000 },
  { month: "Nov", revenue: 92000 },
  { month: "Dec", revenue: 98000 },
];

const auditData = [
  {
    id: "AUD-001",
    tenant: "FastNet ISP",
    action: "User Role Changed",
    user: "admin@fastnet.com",
    timestamp: "2025-11-04 10:23 AM",
    status: "Success",
  },
  {
    id: "AUD-002",
    tenant: "SpeedLink ISP",
    action: "Billing Plan Updated",
    user: "owner@speedlink.com",
    timestamp: "2025-11-04 09:15 AM",
    status: "Success",
  },
  {
    id: "AUD-003",
    tenant: "ConnectPro ISP",
    action: "Failed Login Attempt",
    user: "unknown@connectpro.com",
    timestamp: "2025-11-04 08:47 AM",
    status: "Failed",
  },
];

export function SuperAdminDashboard() {
  const { t } = useLanguage();
  const [showCreateTenantModal, setShowCreateTenantModal] = useState(false);
  
  const auditColumns = [
    { label: "Audit ID", key: "id" },
    { label: "Tenant", key: "tenant" },
    { label: t("Actions"), key: "action" },
    { label: "User", key: "user" },
    { label: t("Time"), key: "timestamp" },
    {
      label: t("Status"),
      key: "status",
      render: (value: string) => (
        <Badge variant={value === "Success" ? "default" : "destructive"}>
          {value}
        </Badge>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 >Global Dashboard</h2>
          <p className="text-muted-foreground">Monitor all tenants and system-wide metrics</p>
        </div>
        <Button onClick={() => setShowCreateTenantModal(true)}>
          <Plus className="h-4 w-4 mr-2" aria-hidden="true" />
          {t("Create New Tenant")}
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <KPICard
          title="Total SaaS Revenue"
          value="$98,450"
          icon={DollarSign}
          trend={{ value: "12.5%", direction: "up" }}
          variant="success"
        />
        <KPICard
          title="Total Active Tenants"
          value="247"
          icon={Users}
          trend={{ value: "8.2%", direction: "up" }}
          variant="default"
        />
        <KPICard
          title="Tenant Churn Rate"
          value="2.3%"
          icon={TrendingDown}
          trend={{ value: "0.5%", direction: "down" }}
          variant="warning"
        />
      </div>

      {/* Growth Chart */}
      <Card>
        <CardHeader>
          <CardTitle>New Tenant Growth (Last 12 Months)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip />
              <Line type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Audit Table */}
      <DataTable title="Recent System-Wide Audits" columns={auditColumns} data={auditData} />

      {/* Create Tenant Modal */}
      <Modal_CreateTenant
        open={showCreateTenantModal}
        onOpenChange={setShowCreateTenantModal}
      />
    </div>
  );
}
