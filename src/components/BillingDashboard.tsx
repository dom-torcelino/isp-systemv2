import { useState } from "react";
import { KPICard } from "./KPICard";
import { DataTable } from "./DataTable";
import { DollarSign, AlertCircle, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { CollectionsPage } from "./CollectionsPage";
import { BillingSettingsPage } from "./BillingSettingsPage";
import { BillingInvoicesPage } from "./BillingInvoicesPage";
import { BillingRefundsPage } from "./BillingRefundsPage";

const revenueData = [
  { month: "Jun", revenue: 125000, collections: 118000 },
  { month: "Jul", revenue: 132000, collections: 128000 },
  { month: "Aug", revenue: 128000, collections: 125000 },
  { month: "Sep", revenue: 145000, collections: 139000 },
  { month: "Oct", revenue: 152000, collections: 148000 },
  { month: "Nov", revenue: 158000, collections: 152000 },
];

const recentTransactions = [
  {
    id: "PMT-3421",
    customer: "John Smith",
    amount: "$89.99",
    method: "Auto-Pay",
    status: "Completed",
    date: "Nov 4, 2025",
  },
  {
    id: "PMT-3420",
    customer: "Sarah Johnson",
    amount: "$129.99",
    method: "Credit Card",
    status: "Completed",
    date: "Nov 4, 2025",
  },
  {
    id: "PMT-3419",
    customer: "Mike Davis",
    amount: "$89.99",
    method: "Bank Transfer",
    status: "Pending",
    date: "Nov 4, 2025",
  },
  {
    id: "PMT-3418",
    customer: "Emily Brown",
    amount: "$159.99",
    method: "Cash",
    status: "Completed",
    date: "Nov 3, 2025",
  },
  {
    id: "PMT-3417",
    customer: "David Wilson",
    amount: "$89.99",
    method: "Auto-Pay",
    status: "Completed",
    date: "Nov 3, 2025",
  },
];

export function BillingDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const transactionColumns = [
    { label: "Transaction ID", key: "id" },
    { label: "Customer", key: "customer" },
    { label: "Amount", key: "amount" },
    { label: "Method", key: "method" },
    {
      label: "Status",
      key: "status",
      render: (value: string) => (
        <Badge variant={value === "Completed" ? "default" : "secondary"}>
          {value}
        </Badge>
      ),
    },
    { label: "Date", key: "date" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2>Billing Module</h2>
        <p className="text-muted-foreground">Manage billing, invoices, and collections</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="collections">Collections</TabsTrigger>
          <TabsTrigger value="refunds">Refunds</TabsTrigger>
          <TabsTrigger value="settings">Billing Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
          {/* KPI Cards */}
          <div className="grid gap-4 md:grid-cols-3">
            <KPICard
              title="Total Revenue (This Month)"
              value="$158,450"
              icon={DollarSign}
              trend={{ value: "4.2%", direction: "up" }}
              variant="success"
            />
            <KPICard
              title="Total Overdue"
              value="$12,350"
              icon={AlertCircle}
              trend={{ value: "1.8%", direction: "down" }}
              variant="warning"
            />
            <KPICard
              title="Accounts in Dispute"
              value="8"
              icon={FileText}
              trend={{ value: "2 resolved", direction: "down" }}
              variant="destructive"
            />
          </div>

          {/* Revenue Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Revenue vs. Collections (Last 6 Months)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="month" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#2563eb"
                    strokeWidth={2}
                    name="Revenue"
                  />
                  <Line
                    type="monotone"
                    dataKey="collections"
                    stroke="#14b8a6"
                    strokeWidth={2}
                    name="Collections"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Recent Transactions */}
          <DataTable
            title="Recent Transactions"
            columns={transactionColumns}
            data={recentTransactions}
          />
        </TabsContent>

        <TabsContent value="invoices">
          <BillingInvoicesPage />
        </TabsContent>

        <TabsContent value="collections">
          <CollectionsPage />
        </TabsContent>

        <TabsContent value="refunds">
          <BillingRefundsPage />
        </TabsContent>

        <TabsContent value="settings">
          <BillingSettingsPage />
        </TabsContent>
      </Tabs>
    </div>
  );
}
