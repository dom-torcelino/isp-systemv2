import { DataTable } from "./DataTable";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Search } from "lucide-react";

interface SupportCustomersPageProps {
  onNavigateToCustomerProfile?: (id: string) => void;
}

const customersData = [
  {
    id: "1",
    name: "John Smith",
    accountId: "ACC-10472",
    status: "Active",
    contact: "+1 (555) 123-4567",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    accountId: "ACC-10471",
    status: "Active",
    contact: "+1 (555) 234-5678",
  },
  {
    id: "3",
    name: "Mike Davis",
    accountId: "ACC-10470",
    status: "Suspended",
    contact: "+1 (555) 345-6789",
  },
  {
    id: "4",
    name: "Emily Brown",
    accountId: "ACC-10469",
    status: "Active",
    contact: "+1 (555) 456-7890",
  },
  {
    id: "5",
    name: "David Wilson",
    accountId: "ACC-10468",
    status: "Active",
    contact: "+1 (555) 567-8901",
  },
  {
    id: "6",
    name: "Lisa Anderson",
    accountId: "ACC-10467",
    status: "Pending",
    contact: "+1 (555) 678-9012",
  },
];

export function SupportCustomersPage({
  onNavigateToCustomerProfile,
}: SupportCustomersPageProps = {}) {
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
    { label: "Contact #", key: "contact" },
    {
      label: "Actions",
      key: "id",
      render: (id: string) => (
        <Button
          size="sm"
          variant="outline"
          onClick={() => onNavigateToCustomerProfile?.(id)}
        >
          View Profile
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2>Customer List</h2>
        <p className="text-muted-foreground">
          View customer accounts and contact information
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search by name, phone, or account ID..."
          className="pl-10"
        />
      </div>

      {/* Customers Table */}
      <DataTable columns={customerColumns} data={customersData} />
    </div>
  );
}
