import { DataTable } from "@/components/DataTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Plus } from "lucide-react";
import { useState } from "react";
import { CreateTicketModal } from "@/features/ticket/components/CreateTicketModal";
import { useLanguage } from "@/contexts/LanguageContext";

interface CustomerSupportDashboardProps {
  onNavigateToTicketDetails?: () => void;
}

const newTickets = [
  {
    id: "TKT-1047",
    customer: "John Smith",
    category: "Installation",
    priority: "High",
    created: "2 hours ago",
    status: "Unassigned",
  },
  {
    id: "TKT-1046",
    customer: "Sarah Johnson",
    category: "Repair",
    priority: "Medium",
    created: "3 hours ago",
    status: "Unassigned",
  },
];

const assignedTickets = [
  {
    id: "TKT-1039",
    customer: "David Wilson",
    category: "Billing",
    priority: "Low",
    created: "1 day ago",
    status: "In Progress",
  },
  {
    id: "TKT-1035",
    customer: "Lisa Anderson",
    category: "Transfer",
    priority: "Medium",
    created: "2 days ago",
    status: "Pending Customer",
  },
];

const billingDisputes = [
  {
    id: "TKT-1020",
    customer: "Robert Taylor",
    category: "Billing Dispute",
    priority: "High",
    amount: "$125.00",
    created: "3 days ago",
  },
];

export function CustomerSupportDashboard({ onNavigateToTicketDetails }: CustomerSupportDashboardProps = {}) {
  const [showCreateModal, setShowCreateModal] = useState(false);
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
      label: "Status",
      key: "status",
      render: (value: string) => <Badge variant="outline">{value}</Badge>,
    },
    {
      label: "Actions",
      key: "id",
      render: () => (
        <Button size="sm" variant="outline" onClick={onNavigateToTicketDetails}>
          View
        </Button>
      ),
    },
  ];

  const disputeColumns = [
    { label: "Ticket ID", key: "id" },
    { label: "Customer", key: "customer" },
    { label: "Amount", key: "amount" },
    {
      label: "Priority",
      key: "priority",
      render: (value: string) => {
        const variant =
          value === "High" ? "destructive" : value === "Medium" ? "default" : "secondary";
        return <Badge variant={variant}>{value}</Badge>;
      },
    },
    { label: "Created", key: "created" },
    {
      label: "Actions",
      key: "id",
      render: () => (
        <Button size="sm" variant="outline">
          Resolve
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2>Customer Support</h2>
          <p className="text-muted-foreground">Manage customer tickets and support requests</p>
        </div>
        <Button onClick={() => setShowCreateModal(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Create Ticket
        </Button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search customer by name, phone, or account ID..."
          className="pl-10"
        />
      </div>

      {/* Tabs */}
      <Tabs defaultValue="new" className="space-y-4">
        <TabsList>
          <TabsTrigger value="new">New Unassigned Tickets</TabsTrigger>
          <TabsTrigger value="assigned">My Assigned Tickets</TabsTrigger>
          <TabsTrigger value="disputes">Pending Billing Disputes</TabsTrigger>
        </TabsList>

        <TabsContent value="new">
          <DataTable columns={ticketColumns} data={newTickets} />
        </TabsContent>

        <TabsContent value="assigned">
          <DataTable columns={ticketColumns} data={assignedTickets} />
        </TabsContent>

        <TabsContent value="disputes">
          <DataTable columns={disputeColumns} data={billingDisputes} />
        </TabsContent>
      </Tabs>

      <CreateTicketModal open={showCreateModal} onOpenChange={setShowCreateModal} />
    </div>
  );
}
