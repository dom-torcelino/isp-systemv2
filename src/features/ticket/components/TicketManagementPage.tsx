import { useState } from "react";
import { DataTable } from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, CalendarIcon } from "lucide-react";
import { CreateTicketModal } from "./CreateTicketModal"; 

interface TicketManagementPageProps {
  onNavigateToTicketDetails?: (ticketId: string) => void;
}

const ticketsData = [
  {
    id: "TKT-1047",
    customer: "John Smith",
    category: "Installation",
    priority: "High",
    assignedTo: "Mike Johnson",
    status: "In Progress",
    lastUpdated: "2 hours ago",
  },
  {
    id: "TKT-1046",
    customer: "Sarah Johnson",
    category: "Repair",
    priority: "Medium",
    assignedTo: "Sarah Williams",
    status: "Assigned",
    lastUpdated: "3 hours ago",
  },
  {
    id: "TKT-1045",
    customer: "Mike Davis",
    category: "Billing",
    priority: "Low",
    assignedTo: "Support Team",
    status: "Pending",
    lastUpdated: "5 hours ago",
  },
  {
    id: "TKT-1044",
    customer: "Emily Brown",
    category: "Transfer",
    priority: "High",
    assignedTo: "David Brown",
    status: "Completed",
    lastUpdated: "1 day ago",
  },
  {
    id: "TKT-1043",
    customer: "David Wilson",
    category: "Upgrade",
    priority: "Medium",
    assignedTo: "Mike Johnson",
    status: "In Progress",
    lastUpdated: "1 day ago",
  },
  {
    id: "TKT-1042",
    customer: "Lisa Anderson",
    category: "Repair",
    priority: "High",
    assignedTo: "Sarah Williams",
    status: "Assigned",
    lastUpdated: "2 days ago",
  },
];

export function TicketManagementPage({ onNavigateToTicketDetails }: TicketManagementPageProps) {
  const [showCreateModal, setShowCreateModal] = useState(false);

  const ticketColumns = [
    { label: "Ticket ID", key: "id" },
    { label: "Customer", key: "customer" },
    { label: "Category", key: "category" },
    {
      label: "Priority",
      key: "priority",
      render: (value: string) => {
        const variant =
          value === "High" ? "destructive" : value === "Medium" ? "default" : "secondary";
        return <Badge variant={variant}>{value}</Badge>;
      },
    },
    { label: "Assigned To", key: "assignedTo" },
    {
      label: "Status",
      key: "status",
      render: (value: string) => {
        const variant =
          value === "Completed"
            ? "default"
            : value === "In Progress"
            ? "default"
            : "secondary";
        return <Badge variant="outline">{value}</Badge>;
      },
    },
    { label: "Last Updated", key: "lastUpdated" },
    {
      label: "Actions",
      key: "id",
      render: (ticketId: string) => (
        <Button 
          size="sm" 
          variant="outline"
          onClick={() => onNavigateToTicketDetails?.(ticketId)}
        >
          View Details
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2>All Tickets</h2>
          <p className="text-muted-foreground">Manage all customer support tickets</p>
        </div>
        <Button onClick={() => setShowCreateModal(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Create Ticket
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search by customer or ticket ID..." className="pl-10" />
        </div>

        <Select>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="assigned">Assigned</SelectItem>
            <SelectItem value="inprogress">In Progress</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="installation">Installation</SelectItem>
            <SelectItem value="repair">Repair</SelectItem>
            <SelectItem value="billing">Billing</SelectItem>
            <SelectItem value="transfer">Transfer</SelectItem>
            <SelectItem value="upgrade">Upgrade</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priorities</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="low">Low</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Assigned To" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Technicians</SelectItem>
            <SelectItem value="tech1">Mike Johnson</SelectItem>
            <SelectItem value="tech2">Sarah Williams</SelectItem>
            <SelectItem value="tech3">David Brown</SelectItem>
            <SelectItem value="support">Support Team</SelectItem>
          </SelectContent>
        </Select>

        <div>
          <Button variant="outline" className="justify-start text-left">
            <CalendarIcon className="mr-2 h-4 w-4" />
            Date Range
          </Button>
        </div>
      </div>

      {/* Tickets Table */}
      <DataTable columns={ticketColumns} data={ticketsData} />

      <CreateTicketModal open={showCreateModal} onOpenChange={setShowCreateModal} />
    </div>
  );
}
