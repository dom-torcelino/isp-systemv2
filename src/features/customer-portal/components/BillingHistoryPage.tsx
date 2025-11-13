import { DataTable } from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, CreditCard } from "lucide-react";
import { PaymentConfirmationModal } from "@/features/customer-portal/components/PaymentConfirmationModal";
import { useState } from "react";

const invoicesData = [
  {
    id: "INV-2025-11",
    dateIssued: "November 1, 2025",
    amount: "$89.99",
    status: "Unpaid",
    dueDate: "November 15, 2025",
  },
  {
    id: "INV-2025-10",
    dateIssued: "October 1, 2025",
    amount: "$89.99",
    status: "Paid",
    dueDate: "October 15, 2025",
  },
  {
    id: "INV-2025-09",
    dateIssued: "September 1, 2025",
    amount: "$89.99",
    status: "Paid",
    dueDate: "September 15, 2025",
  },
  {
    id: "INV-2025-08",
    dateIssued: "August 1, 2025",
    amount: "$89.99",
    status: "Paid",
    dueDate: "August 15, 2025",
  },
  {
    id: "INV-2025-07",
    dateIssued: "July 1, 2025",
    amount: "$89.99",
    status: "Paid",
    dueDate: "July 15, 2025",
  },
  {
    id: "INV-2025-06",
    dateIssued: "June 1, 2025",
    amount: "$89.99",
    status: "Paid",
    dueDate: "June 15, 2025",
  },
  {
    id: "INV-2025-05",
    dateIssued: "May 1, 2025",
    amount: "$89.99",
    status: "Paid",
    dueDate: "May 15, 2025",
  },
  {
    id: "INV-2025-04",
    dateIssued: "April 1, 2025",
    amount: "$89.99",
    status: "Paid",
    dueDate: "April 15, 2025",
  },
];

export function BillingHistoryPage() {
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState("");

  const invoiceColumns = [
    { label: "Invoice ID", key: "id" },
    { label: "Date Issued", key: "dateIssued" },
    { label: "Amount", key: "amount" },
    {
      label: "Status",
      key: "status",
      render: (value: string) => {
        let variant: "default" | "destructive" | "secondary" = "default";
        if (value === "Unpaid") variant = "destructive";
        if (value === "Overdue") variant = "destructive";
        if (value === "Paid") variant = "default";
        return <Badge variant={variant}>{value}</Badge>;
      },
    },
    {
      label: "Action",
      key: "status",
      render: (value: string, row: any) => {
        if (value === "Paid") {
          return (
            <Button size="sm" variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Download Receipt
            </Button>
          );
        } else {
          return (
            <Button
              size="sm"
              onClick={() => {
                setSelectedAmount(row.amount);
                setPaymentModalOpen(true);
              }}
            >
              <CreditCard className="mr-2 h-4 w-4" />
              Pay Now
            </Button>
          );
        }
      },
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2>My Billing History</h2>
        <p className="text-muted-foreground">View and download your past invoices</p>
      </div>

      {/* Invoices Table */}
      <DataTable columns={invoiceColumns} data={invoicesData} />

      {/* Payment Modal */}
      <PaymentConfirmationModal
        open={paymentModalOpen}
        onOpenChange={setPaymentModalOpen}
        amount={selectedAmount}
      />
    </div>
  );
}
