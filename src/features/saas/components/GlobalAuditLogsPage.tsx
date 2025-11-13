import { useState } from "react";
import { Search, Filter, Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DataTable } from "@/components/DataTable";
import { Badge } from "@/components/ui/badge";

const auditLogData = [
  {
    timestamp: "2025-11-04 10:23:45",
    tenantId: "TN-001",
    tenantName: "FastNet ISP",
    user: "admin@fastnet.com",
    role: "System Admin",
    action: "User Role Changed: tech@fastnet.com to Field Technician",
  },
  {
    timestamp: "2025-11-04 10:15:22",
    tenantId: "TN-002",
    tenantName: "SpeedLink ISP",
    user: "owner@speedlink.com",
    role: "System Admin",
    action: "Billing Plan Updated: Professional → Enterprise",
  },
  {
    timestamp: "2025-11-04 09:47:11",
    tenantId: "TN-003",
    tenantName: "ConnectPro ISP",
    user: "support@connectpro.com",
    role: "Customer Support",
    action: "Customer Account Created: John Doe (ACC-5021)",
  },
  {
    timestamp: "2025-11-04 09:32:08",
    tenantId: "TN-001",
    tenantName: "FastNet ISP",
    user: "admin@fastnet.com",
    role: "System Admin",
    action: "Tenant Settings Updated: SLA Response Time changed to 2 hours",
  },
  {
    timestamp: "2025-11-04 09:12:55",
    tenantId: "TN-004",
    tenantName: "NetWave ISP",
    user: "tech@netwave.com",
    role: "Field Technician",
    action: "Ticket Completed: TKT-1042 - Installation at 456 Oak St",
  },
  {
    timestamp: "2025-11-04 08:58:33",
    tenantId: "TN-002",
    tenantName: "SpeedLink ISP",
    user: "billing@speedlink.com",
    role: "System Admin",
    action: "Invoice Generated: INV-2847 for $299.00",
  },
  {
    timestamp: "2025-11-04 08:41:19",
    tenantId: "TN-005",
    tenantName: "HyperConnect ISP",
    user: "admin@hyperconnect.com",
    role: "System Admin",
    action: "Payment Received: $499.00 for INV-2834",
  },
  {
    timestamp: "2025-11-04 08:27:44",
    tenantId: "TN-003",
    tenantName: "ConnectPro ISP",
    user: "support@connectpro.com",
    role: "Customer Support",
    action: "Ticket Created: TKT-1056 - Service Outage Reported",
  },
];

export function GlobalAuditLogsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [actionFilter, setActionFilter] = useState("all");

  const columns = [
    { label: "Timestamp", key: "timestamp" },
    {
      label: "Tenant ID",
      key: "tenantId",
      render: (value: string, row: any) => (
        <div>
          <div>{value}</div>
          <div className="text-xs text-muted-foreground">{row.tenantName}</div>
        </div>
      ),
    },
    { label: "User", key: "user" },
    {
      label: "Role",
      key: "role",
      render: (value: string) => (
        <Badge variant="outline">{value}</Badge>
      ),
    },
    { label: "Action", key: "action" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2>Global Audit Logs</h2>
        <p className="text-muted-foreground">
          View all system activity across all tenants
        </p>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col gap-4 rounded-lg border border-border bg-card p-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by User or Tenant..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={actionFilter} onValueChange={setActionFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Filter by Action" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Actions</SelectItem>
            <SelectItem value="user">User Changes</SelectItem>
            <SelectItem value="billing">Billing Actions</SelectItem>
            <SelectItem value="ticket">Ticket Actions</SelectItem>
            <SelectItem value="settings">Settings Changes</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" className="w-full sm:w-auto">
          <Calendar className="mr-2 h-4 w-4" />
          Date Range
        </Button>
      </div>

      {/* Audit Table */}
      <DataTable
        title="Audit Log Entries"
        columns={columns}
        data={auditLogData}
      />
    </div>
  );
}
