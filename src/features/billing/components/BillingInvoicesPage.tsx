import { useState } from "react";
import { Search, Plus, Send, DollarSign, Eye } from "lucide-react";
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
import { GenerateInvoiceModal } from "./GenerateInvoiceModal";

const invoiceData = [
  {
    id: "INV-2847",
    customer: "John Smith",
    customerId: "ACC-10472",
    dateIssued: "2025-11-01",
    dueDate: "2025-11-15",
    amount: "$129.99",
    status: "Paid",
  },
  {
    id: "INV-2846",
    customer: "Sarah Johnson",
    customerId: "ACC-10471",
    dateIssued: "2025-11-01",
    dueDate: "2025-11-15",
    amount: "$89.99",
    status: "Unpaid",
  },
  {
    id: "INV-2845",
    customer: "Michael Chen",
    customerId: "ACC-10469",
    dateIssued: "2025-11-01",
    dueDate: "2025-11-10",
    amount: "$149.99",
    status: "Overdue",
  },
  {
    id: "INV-2844",
    customer: "Emily Davis",
    customerId: "ACC-10468",
    dateIssued: "2025-10-28",
    dueDate: "2025-11-12",
    amount: "$99.99",
    status: "Paid",
  },
  {
    id: "INV-2843",
    customer: "David Wilson",
    customerId: "ACC-10467",
    dateIssued: "2025-10-28",
    dueDate: "2025-11-12",
    amount: "$129.99",
    status: "Unpaid",
  },
  {
    id: "INV-2842",
    customer: "Lisa Anderson",
    customerId: "ACC-10466",
    dateIssued: "2025-10-25",
    dueDate: "2025-11-08",
    amount: "$179.99",
    status: "Overdue",
  },
];

export function BillingInvoicesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);

  const handleViewInvoice = (invoiceId: string) => {
    alert(`Viewing invoice: ${invoiceId}`);
  };

  const handleLogPayment = (invoiceId: string) => {
    alert(`Logging payment for invoice: ${invoiceId}`);
  };

  const handleSendReminder = (invoiceId: string) => {
    alert(`Sending reminder for invoice: ${invoiceId}`);
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Paid":
        return "default";
      case "Unpaid":
        return "secondary";
      case "Overdue":
        return "destructive";
      default:
        return "outline";
    }
  };

  const columns = [
    { label: "Invoice ID", key: "id" },
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
    { label: "Date Issued", key: "dateIssued" },
    { label: "Due Date", key: "dueDate" },
    { label: "Amount", key: "amount" },
    {
      label: "Status",
      key: "status",
      render: (value: string) => (
        <Badge variant={getStatusVariant(value)}>{value}</Badge>
      ),
    },
    {
      label: "Actions",
      key: "id",
      render: (value: string, row: any) => (
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleViewInvoice(value)}
          >
            <Eye className="h-4 w-4 mr-1" />
            View
          </Button>
          {row.status !== "Paid" && (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleLogPayment(value)}
              >
                <DollarSign className="h-4 w-4 mr-1" />
                Log Payment
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleSendReminder(value)}
              >
                <Send className="h-4 w-4 mr-1" />
                Send Reminder
              </Button>
            </>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2>Invoices</h2>
          <p className="text-muted-foreground">
            Manage customer invoices and payments
          </p>
        </div>
        <Button onClick={() => setIsGenerateModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Generate Manual Invoice
        </Button>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col gap-4 rounded-lg border border-border bg-card p-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by Customer..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter by Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Invoices</SelectItem>
            <SelectItem value="paid">Paid</SelectItem>
            <SelectItem value="unpaid">Unpaid</SelectItem>
            <SelectItem value="overdue">Overdue</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Invoices Table */}
      <DataTable
        title="All Invoices"
        columns={columns}
        data={invoiceData}
      />

      {/* Generate Invoice Modal */}
      <GenerateInvoiceModal
        isOpen={isGenerateModalOpen}
        onClose={() => setIsGenerateModalOpen(false)}
      />
    </div>
  );
}
