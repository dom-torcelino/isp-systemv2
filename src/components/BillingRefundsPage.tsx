import { useState } from "react";
import { Plus, Check, X } from "lucide-react";
import { Button } from "./ui/button";
import { DataTable } from "./DataTable";
import { Badge } from "./ui/badge";
import { InitiateRefundModal } from "./InitiateRefundModal";

const refundData = [
  {
    id: "REF-101",
    customer: "Michael Chen",
    customerId: "ACC-10469",
    invoiceId: "INV-2845",
    amount: "$149.99",
    status: "Pending Approval",
    dateRequested: "2025-11-03",
    reason: "Service downtime for 3 days",
  },
  {
    id: "REF-100",
    customer: "Lisa Anderson",
    customerId: "ACC-10466",
    invoiceId: "INV-2842",
    amount: "$89.99",
    status: "Approved",
    dateRequested: "2025-11-02",
    reason: "Duplicate charge",
  },
  {
    id: "REF-099",
    customer: "David Wilson",
    customerId: "ACC-10467",
    invoiceId: "INV-2843",
    amount: "$129.99",
    status: "Rejected",
    dateRequested: "2025-11-01",
    reason: "Customer request - insufficient grounds",
  },
  {
    id: "REF-098",
    customer: "Emily Davis",
    customerId: "ACC-10468",
    invoiceId: "INV-2838",
    amount: "$99.99",
    status: "Pending Approval",
    dateRequested: "2025-10-31",
    reason: "Billing error - wrong plan charged",
  },
  {
    id: "REF-097",
    customer: "Sarah Johnson",
    customerId: "ACC-10471",
    invoiceId: "INV-2836",
    amount: "$44.99",
    status: "Approved",
    dateRequested: "2025-10-28",
    reason: "Prorated refund for service cancellation",
  },
];

export function BillingRefundsPage() {
  const [isRefundModalOpen, setIsRefundModalOpen] = useState(false);

  const handleApprove = (refundId: string) => {
    alert(`Approved refund: ${refundId}`);
  };

  const handleReject = (refundId: string) => {
    alert(`Rejected refund: ${refundId}`);
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Approved":
        return "default";
      case "Pending Approval":
        return "secondary";
      case "Rejected":
        return "destructive";
      default:
        return "outline";
    }
  };

  const columns = [
    { label: "Request ID", key: "id" },
    {
      label: "Customer Name",
      key: "customer",
      render: (value: string, row: any) => (
        <div>
          <div>{value}</div>
          <div className="text-xs text-muted-foreground">{row.customerId}</div>
        </div>
      ),
    },
    { label: "Invoice ID", key: "invoiceId" },
    { label: "Amount", key: "amount" },
    {
      label: "Status",
      key: "status",
      render: (value: string) => (
        <Badge variant={getStatusVariant(value)}>{value}</Badge>
      ),
    },
    { label: "Date Requested", key: "dateRequested" },
    {
      label: "Reason",
      key: "reason",
      render: (value: string) => (
        <div className="max-w-xs truncate" title={value}>
          {value}
        </div>
      ),
    },
    {
      label: "Actions",
      key: "id",
      render: (value: string, row: any) => (
        <div className="flex gap-2">
          {row.status === "Pending Approval" && (
            <>
              <Button
                variant="default"
                size="sm"
                onClick={() => handleApprove(value)}
              >
                <Check className="h-4 w-4 mr-1" />
                Approve
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleReject(value)}
              >
                <X className="h-4 w-4 mr-1" />
                Reject
              </Button>
            </>
          )}
          {row.status !== "Pending Approval" && (
            <span className="text-xs text-muted-foreground">No actions available</span>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2>Refunds</h2>
          <p className="text-muted-foreground">
            Manage refund requests and approvals
          </p>
        </div>
        <Button onClick={() => setIsRefundModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Initiate Refund
        </Button>
      </div>

      {/* Refunds Table */}
      <DataTable
        title="All Refund Requests"
        columns={columns}
        data={refundData}
      />

      {/* Initiate Refund Modal */}
      <InitiateRefundModal
        isOpen={isRefundModalOpen}
        onClose={() => setIsRefundModalOpen(false)}
      />
    </div>
  );
}
