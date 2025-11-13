import { DataTable } from "@/components/DataTable";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";

const auditLogsData = [
  {
    id: "1",
    timestamp: "Nov 4, 2025 12:05:30 PM",
    user: "admin@fastnet.com",
    role: "System Admin",
    action: "Suspension manually overridden for CUST-00451",
    target: "CUST-00451",
  },
  {
    id: "2",
    timestamp: "Nov 4, 2025 11:42:15 AM",
    user: "alice.cooper@fastnet.com",
    role: "Support",
    action: "Ticket Created",
    target: "TKT-1047",
  },
  {
    id: "3",
    timestamp: "Nov 4, 2025 11:28:03 AM",
    user: "System",
    role: "System",
    action: "Payment logged automatically",
    target: "CUST-00392",
  },
  {
    id: "4",
    timestamp: "Nov 4, 2025 10:55:47 AM",
    user: "bob.wilson@fastnet.com",
    role: "Support",
    action: "Customer account status changed to Active",
    target: "CUST-00451",
  },
  {
    id: "5",
    timestamp: "Nov 4, 2025 10:33:22 AM",
    user: "mike.johnson@fastnet.com",
    role: "Technician",
    action: "Ticket marked as Completed",
    target: "TKT-1045",
  },
  {
    id: "6",
    timestamp: "Nov 4, 2025 10:12:08 AM",
    user: "admin@fastnet.com",
    role: "System Admin",
    action: "User role changed from Support to System Admin",
    target: "alice.cooper@fastnet.com",
  },
  {
    id: "7",
    timestamp: "Nov 4, 2025 09:48:33 AM",
    user: "System",
    role: "System",
    action: "Automatic suspension executed",
    target: "CUST-00298",
  },
  {
    id: "8",
    timestamp: "Nov 4, 2025 09:25:19 AM",
    user: "sarah.williams@fastnet.com",
    role: "Technician",
    action: "Ticket assigned to self",
    target: "TKT-1046",
  },
  {
    id: "9",
    timestamp: "Nov 4, 2025 08:54:42 AM",
    user: "admin@fastnet.com",
    role: "System Admin",
    action: "Login",
    target: "N/A",
  },
  {
    id: "10",
    timestamp: "Nov 4, 2025 08:31:17 AM",
    user: "bob.wilson@fastnet.com",
    role: "Support",
    action: "Password reset performed",
    target: "CUST-00412",
  },
];

export function TenantAuditLogPage() {
  const auditColumns = [
    { 
      label: "Timestamp", 
      key: "timestamp",
      render: (value: string) => (
        <span className="text-sm">{value}</span>
      ),
    },
    { label: "User", key: "user" },
    {
      label: "Role",
      key: "role",
      render: (value: string) => {
        const variant = value === "System" ? "secondary" : "outline";
        return <Badge variant={variant}>{value}</Badge>;
      },
    },
    { 
      label: "Action", 
      key: "action",
      render: (value: string) => (
        <span className="text-sm">{value}</span>
      ),
    },
    { 
      label: "Target", 
      key: "target",
      render: (value: string) => (
        <span className="text-sm font-mono">{value}</span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2>Tenant Audit Log</h2>
        <p className="text-muted-foreground">
          A read-only log of all significant actions taken by your users and the system
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search by user email or customer ID..." className="pl-10" />
        </div>

        <Select>
          <SelectTrigger className="w-[220px]">
            <SelectValue placeholder="Filter by Action Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Actions</SelectItem>
            <SelectItem value="login">Login</SelectItem>
            <SelectItem value="ticket-created">Ticket Created</SelectItem>
            <SelectItem value="ticket-completed">Ticket Completed</SelectItem>
            <SelectItem value="payment-logged">Payment Logged</SelectItem>
            <SelectItem value="suspension">Suspension Override</SelectItem>
            <SelectItem value="auto-suspension">Automatic Suspension</SelectItem>
            <SelectItem value="status-change">Account Status Changed</SelectItem>
            <SelectItem value="role-change">User Role Changed</SelectItem>
          </SelectContent>
        </Select>

        <Input type="date" className="w-[180px]" placeholder="Start Date" />
        <Input type="date" className="w-[180px]" placeholder="End Date" />
      </div>

      {/* Audit Logs Table */}
      <DataTable columns={auditColumns} data={auditLogsData} />
    </div>
  );
}
