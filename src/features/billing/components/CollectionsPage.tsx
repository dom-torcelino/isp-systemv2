import { useState } from "react";
import { DataTable } from "@/components/DataTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { LogPaymentModal } from "../../customer-portal/components/LogPaymentModal";

const collectionsData = [
  {
    id: "1",
    customerName: "Robert Taylor",
    accountStatus: "Suspended",
    daysOverdue: 45,
    amountDue: "$267.99",
    contact: "+1 (555) 123-4567",
  },
  {
    id: "2",
    customerName: "Jennifer Martinez",
    accountStatus: "Overdue",
    daysOverdue: 32,
    amountDue: "$179.98",
    contact: "+1 (555) 234-5678",
  },
  {
    id: "3",
    customerName: "Thomas Anderson",
    accountStatus: "Suspended",
    daysOverdue: 67,
    amountDue: "$539.97",
    contact: "+1 (555) 345-6789",
  },
  {
    id: "4",
    customerName: "Patricia White",
    accountStatus: "Overdue",
    daysOverdue: 18,
    amountDue: "$89.99",
    contact: "+1 (555) 456-7890",
  },
  {
    id: "5",
    customerName: "Christopher Lee",
    accountStatus: "Overdue",
    daysOverdue: 25,
    amountDue: "$159.99",
    contact: "+1 (555) 567-8901",
  },
  {
    id: "6",
    customerName: "Maria Garcia",
    accountStatus: "Suspended",
    daysOverdue: 51,
    amountDue: "$359.97",
    contact: "+1 (555) 678-9012",
  },
];

export function CollectionsPage() {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);

  const handleLogPayment = (customer: any) => {
    setSelectedCustomer(customer);
    setShowPaymentModal(true);
  };

  const collectionsColumns = [
    { label: "Customer Name", key: "customerName" },
    {
      label: "Account Status",
      key: "accountStatus",
      render: (value: string) => (
        <Badge variant={value === "Suspended" ? "destructive" : "default"}>
          {value}
        </Badge>
      ),
    },
    {
      label: "Days Overdue",
      key: "daysOverdue",
      render: (value: number) => (
        <span className={value > 30 ? "text-destructive" : "text-warning"}>
          {value} days
        </span>
      ),
    },
    { label: "Amount Due", key: "amountDue" },
    { label: "Contact #", key: "contact" },
    {
      label: "Actions",
      key: "id",
      render: (_: any, row: any) => (
        <div className="flex gap-2">
          <Button size="sm" variant="outline">
            View Customer
          </Button>
          <Button size="sm" onClick={() => handleLogPayment(row)}>
            Log Payment
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3>Collections List</h3>
        <p className="text-muted-foreground text-sm">
          List of all customers with "Overdue" or "Suspended" accounts
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search by customer name, account, or contact..."
          className="pl-10"
        />
      </div>

      {/* Collections Table */}
      <DataTable columns={collectionsColumns} data={collectionsData} />

      <LogPaymentModal
        open={showPaymentModal}
        onOpenChange={setShowPaymentModal}
        customer={selectedCustomer}
      />
    </div>
  );
}
