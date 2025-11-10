import { useState } from "react";
import { DataTable } from "./DataTable";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Plus, Search } from "lucide-react";
import { AddNewCustomerModal } from "./AddNewCustomerModal";

const customersData = [
  {
    id: "1",
    name: "John Smith",
    accountId: "ACC-10472",
    status: "Active",
    servicePlan: "Fiber 1 Gbps",
    contact: "+1 (555) 123-4567",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    accountId: "ACC-10471",
    status: "Active",
    servicePlan: "Fiber 500 Mbps",
    contact: "+1 (555) 234-5678",
  },
  {
    id: "3",
    name: "Mike Davis",
    accountId: "ACC-10470",
    status: "Suspended",
    servicePlan: "Cable 100 Mbps",
    contact: "+1 (555) 345-6789",
  },
  {
    id: "4",
    name: "Emily Brown",
    accountId: "ACC-10469",
    status: "Active",
    servicePlan: "Fiber 1 Gbps",
    contact: "+1 (555) 456-7890",
  },
  {
    id: "5",
    name: "David Wilson",
    accountId: "ACC-10468",
    status: "Active",
    servicePlan: "Fiber 500 Mbps",
    contact: "+1 (555) 567-8901",
  },
  {
    id: "6",
    name: "Lisa Anderson",
    accountId: "ACC-10467",
    status: "Pending",
    servicePlan: "Cable 200 Mbps",
    contact: "+1 (555) 678-9012",
  },
  {
    id: "7",
    name: "Robert Taylor",
    accountId: "ACC-10466",
    status: "Suspended",
    servicePlan: "Fiber 500 Mbps",
    contact: "+1 (555) 789-0123",
  },
  {
    id: "8",
    name: "Jennifer Martinez",
    accountId: "ACC-10465",
    status: "Active",
    servicePlan: "Fiber 1 Gbps",
    contact: "+1 (555) 890-1234",
  },
];

interface CustomerManagementPageProps {
  onNavigateToCustomerProfile?: (id: string) => void;
}

export function CustomerManagementPage({ onNavigateToCustomerProfile }: CustomerManagementPageProps = {}) {
  const [showAddCustomerModal, setShowAddCustomerModal] = useState(false);

  const customerColumns = [
    { label: "Customer Name", key: "name" },
    { label: "Account ID", key: "accountId" },
    {
      label: "Account Status",
      key: "status",
      render: (value: string) => {
        const variant =
          value === "Active"
            ? "default"
            : value === "Suspended"
            ? "destructive"
            : "secondary";
        return <Badge variant={variant}>{value}</Badge>;
      },
    },
    { label: "Service Plan", key: "servicePlan" },
    { label: "Contact #", key: "contact" },
    {
      label: "Actions",
      key: "id",
      render: (id: string) => (
        <Button size="sm" variant="outline" onClick={() =>onNavigateToCustomerProfile?.(id)}>
          View Profile
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2>Customer Management</h2>
        <p className="text-muted-foreground">View and manage all customer accounts</p>
      </div>

      {/* Header */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by name, phone, or account ID..."
            className="pl-10"
          />
        </div>
        <Button onClick={() => setShowAddCustomerModal(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add New Customer
        </Button>
      </div>

      {/* Customers Table */}
      <DataTable columns={customerColumns} data={customersData} />

      {/* Add New Customer Modal */}
      <AddNewCustomerModal
        open={showAddCustomerModal}
        onOpenChange={setShowAddCustomerModal}
      />
    </div>
  );
}
