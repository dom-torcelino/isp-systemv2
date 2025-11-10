import { KPICard } from "./KPICard";
import { DataTable } from "./DataTable";
import { Ticket, DollarSign, AlertCircle, Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useLanguage } from "../contexts/LanguageContext";

const ticketVolumeData = [
  { category: "Installation", count: 45 },
  { category: "Repair", count: 67 },
  { category: "Billing", count: 23 },
  { category: "Transfer", count: 31 },
  { category: "Upgrade", count: 19 },
];

const unassignedTickets = [
  {
    id: "TKT-1047",
    customer: "John Smith",
    category: "Installation",
    priority: "High",
    created: "2 hours ago",
  },
  {
    id: "TKT-1046",
    customer: "Sarah Johnson",
    category: "Repair",
    priority: "Medium",
    created: "3 hours ago",
  },
  {
    id: "TKT-1045",
    customer: "Mike Davis",
    category: "Billing",
    priority: "Low",
    created: "5 hours ago",
  },
  {
    id: "TKT-1044",
    customer: "Emily Brown",
    category: "Transfer",
    priority: "High",
    created: "6 hours ago",
  },
];

export function SystemAdminDashboard() {
  const { t } = useLanguage();
  
  const ticketColumns = [
    { label: "Ticket ID", key: "id" },
    { label: t("Customer"), key: "customer" },
    { label: t("Category"), key: "category" },
    {
      label: t("Priority"),
      key: "priority",
      render: (value: string) => {
        const variant =
          value === "High" ? "destructive" : value === "Medium" ? "default" : "secondary";
        return <Badge variant={variant}>{value}</Badge>;
      },
    },
    { label: t("Created"), key: "created" },
    {
      label: t("Actions"),
      key: "id",
      render: () => (
        <Button size="sm" variant="outline">
          Assign
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2>{t("My ISP Dashboard")}</h2>
        <p className="text-muted-foreground">Manage your ISP operations and customer support</p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <KPICard
          title="Total Active Tickets"
          value="127"
          icon={Ticket}
          trend={{ value: "3.2%", direction: "up" }}
          variant="default"
        />
        <KPICard
          title="Total Customer Revenue"
          value="$87,250"
          icon={DollarSign}
          trend={{ value: "5.4%", direction: "up" }}
          variant="success"
        />
        <KPICard
          title="Overdue Accounts"
          value="23"
          icon={AlertCircle}
          trend={{ value: "2.1%", direction: "down" }}
          variant="warning"
        />
        <KPICard
          title="Technician Performance"
          value="94.2%"
          icon={Activity}
          trend={{ value: "1.8%", direction: "up" }}
          variant="success"
        />
      </div>

      {/* Two Column Layout */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Unassigned Tickets */}
        <div>
          <DataTable
            title={t("New Unassigned Tickets")}
            columns={ticketColumns}
            data={unassignedTickets}
          />
        </div>

        {/* Ticket Volume Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Ticket Volume by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={ticketVolumeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="category" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip />
                <Bar dataKey="count" fill="#2563eb" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Network Latency Chart - Static Image Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            Network Latency (Last 24 Hours)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative w-full overflow-hidden rounded-lg border border-border bg-muted/30">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1741447096161-a6b4e3398d0e?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1332"
              alt="Network Latency Chart"
              className="h-[300px] w-full object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-center">
              <p className="text-sm text-muted-foreground">
                Average Latency: <span className="text-foreground">18.3ms</span> • 
                Peak: <span className="text-foreground">45ms</span> • 
                Min: <span className="text-foreground">12ms</span>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
