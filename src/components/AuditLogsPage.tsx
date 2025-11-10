import { useState } from "react";
import { DataTable } from "./DataTable";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";
import { Search, CalendarIcon } from "lucide-react";
import { Button } from "./ui/button";

const auditLogsData = [
  {
    id: "1",
    timestamp: "Nov 4, 2025 10:23 AM",
    tenantId: "TNT-001",
    user: "admin@fastnet.com",
    role: "System Admin",
    action: "User Role Changed",
    status: "Success",
  },
  {
    id: "2",
    timestamp: "Nov 4, 2025 09:15 AM",
    tenantId: "TNT-002",
    user: "owner@speedlink.com",
    role: "System Admin",
    action: "Billing Plan Updated",
    status: "Success",
  },
  {
    id: "3",
    timestamp: "Nov 4, 2025 08:47 AM",
    tenantId: "TNT-003",
    user: "unknown@connectpro.com",
    role: "Unknown",
    action: "Failed Login Attempt",
    status: "Failed",
  },
  {
    id: "4",
    timestamp: "Nov 4, 2025 07:32 AM",
    tenantId: "TNT-004",
    user: "contact@netwave.com",
    role: "System Admin",
    action: "Tenant Suspended",
    status: "Success",
  },
  {
    id: "5",
    timestamp: "Nov 3, 2025 11:54 PM",
    tenantId: "TNT-005",
    user: "admin@quickconnect.com",
    role: "System Admin",
    action: "Ticket Escalated",
    status: "Success",
  },
  {
    id: "6",
    timestamp: "Nov 3, 2025 10:21 PM",
    tenantId: "TNT-001",
    user: "alice.cooper@fastnet.com",
    role: "Support",
    action: "Ticket Created",
    status: "Success",
  },
  {
    id: "7",
    timestamp: "Nov 3, 2025 09:45 PM",
    tenantId: "TNT-006",
    user: "owner@cityfiber.com",
    role: "System Admin",
    action: "Customer Account Created",
    status: "Success",
  },
  {
    id: "8",
    timestamp: "Nov 3, 2025 08:33 PM",
    tenantId: "TNT-007",
    user: "admin@homenet.com",
    role: "System Admin",
    action: "Tenant Deactivated",
    status: "Success",
  },
  {
    id: "9",
    timestamp: "Nov 3, 2025 07:18 PM",
    tenantId: "TNT-002",
    user: "mike.johnson@speedlink.com",
    role: "Technician",
    action: "Ticket Completed",
    status: "Success",
  },
  {
    id: "10",
    timestamp: "Nov 3, 2025 06:02 PM",
    tenantId: "TNT-001",
    user: "admin@fastnet.com",
    role: "System Admin",
    action: "SLA Rule Modified",
    status: "Success",
  },
];

export function AuditLogsPage() {

  const auditColumns = [
    { label: "Timestamp", key: "timestamp" },
    { label: "Tenant ID", key: "tenantId" },
    { label: "User", key: "user" },
    {
      label: "Role",
      key: "role",
      render: (value: string) => (
        <Badge variant="outline">{value}</Badge>
      ),
    },
    { label: "Action", key: "action" },
    {
      label: "Status",
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
      <div>
        <h2>Global Audit Logs</h2>
        <p className="text-muted-foreground">Monitor all system-wide activity and actions</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search by user or tenant ID..." className="pl-10" />
        </div>

        <Select>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Action Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Actions</SelectItem>
            <SelectItem value="tenant-created">Tenant Created</SelectItem>
            <SelectItem value="tenant-suspended">Tenant Suspended</SelectItem>
            <SelectItem value="tenant-deactivated">Tenant Deactivated</SelectItem>
            <SelectItem value="user-created">User Created</SelectItem>
            <SelectItem value="role-changed">User Role Changed</SelectItem>
            <SelectItem value="ticket-escalated">Ticket Escalated</SelectItem>
            <SelectItem value="login-failed">Failed Login Attempt</SelectItem>
            <SelectItem value="billing-updated">Billing Plan Updated</SelectItem>
          </SelectContent>
        </Select>

        <div>
          <Button variant="outline" className="justify-start text-left">
            <CalendarIcon className="mr-2 h-4 w-4" />
            Date Range
          </Button>
        </div>
      </div>

      {/* Audit Logs Table */}
      <DataTable columns={auditColumns} data={auditLogsData} />
    </div>
  );
}
