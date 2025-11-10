import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { DataTable } from "./DataTable";
import {
  ArrowLeft,
  Plus,
  DollarSign,
  Edit,
  UserX,
  User,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import { EditCustomerModal } from "./EditCustomerModal";
import { SuspendCustomerModal } from "./SuspendCustomerModal";
import { CreateTicketModal } from "./CreateTicketModal";
import { LogPaymentModal } from "./LogPaymentModal";

// --- Mock Database ---
// In a real app, you'd fetch this data. For our refactor,
// we'll move the data here and add the missing fields.
const allCustomers = [
  {
    id: "1",
    name: "John Smith",
    accountId: "ACC-10472",
    status: "Active",
    servicePlan: "Fiber 1 Gbps",
    contact: "+1 (555) 123-4567",
    phone: "+1 (555) 123-4567",
    email: "john.smith@email.com",
    address: "123 Apple St, Suite 100, Springfield, IL 62701",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    accountId: "ACC-10471",
    status: "Active",
    servicePlan: "Fiber 500 Mbps",
    contact: "+1 (555) 234-5678",
    phone: "+1 (555) 234-5678",
    email: "sarah.j@email.com",
    address: "456 Oak Ave, Springfield, IL 62702",
  },
  {
    id: "3",
    name: "Mike Davis",
    accountId: "ACC-10470",
    status: "Suspended",
    servicePlan: "Cable 100 Mbps",
    contact: "+1 (555) 345-6789",
    phone: "+1 (555) 345-6789",
    email: "mike.davis@email.com",
    address: "789 Pine Ln, Springfield, IL 62703",
  },
  // ... add other customers as needed
];
// --- End Mock Database ---

interface CustomerProfilePageProps {
  onBack?: () => void;
  customerId: string;
}

export function CustomerProfilePage({
  onBack,
  customerId,
}: CustomerProfilePageProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSuspendModalOpen, setIsSuspendModalOpen] = useState(false);
  const [isCreateTicketModalOpen, setIsCreateTicketModalOpen] = useState(false);
  const [isLogPaymentModalOpen, setIsLogPaymentModalOpen] = useState(false);

  const ticketColumns = [
    { key: "id", label: "Ticket ID" },
    { key: "type", label: "Type" },
    { key: "status", label: "Status" },
    { key: "priority", label: "Priority" },
    { key: "created", label: "Created" },
    { key: "assignedTo", label: "Assigned To" },
  ];

  const ticketData = [
    {
      id: "TKT-1047",
      type: "Installation",
      status: <Badge>Pending</Badge>,
      priority: <Badge variant="destructive">High</Badge>,
      created: "Nov 4, 2025",
      assignedTo: "Mike Davis",
    },
    {
      id: "TKT-0989",
      type: "Repair",
      status: <Badge className="bg-green-600">Resolved</Badge>,
      priority: <Badge variant="default">Medium</Badge>,
      created: "Oct 28, 2025",
      assignedTo: "Sarah Johnson",
    },
    {
      id: "TKT-0856",
      type: "Billing Inquiry",
      status: <Badge className="bg-green-600">Closed</Badge>,
      priority: <Badge variant="secondary">Low</Badge>,
      created: "Oct 15, 2025",
      assignedTo: "Support Team",
    },
  ];

  const invoiceColumns = [
    { key: "id", label: "Invoice ID" },
    { key: "date", label: "Date Issued" },
    { key: "dueDate", label: "Due Date" },
    { key: "amount", label: "Amount" },
    { key: "status", label: "Status" },
    { key: "actions", label: "Actions" },
  ];

  const invoiceData = [
    {
      id: "INV-2025-11",
      date: "Nov 1, 2025",
      dueDate: "Nov 15, 2025",
      amount: "$79.99",
      status: <Badge>Pending</Badge>,
      actions: (
        <Button size="sm" variant="outline">
          View
        </Button>
      ),
    },
    {
      id: "INV-2025-10",
      date: "Oct 1, 2025",
      dueDate: "Oct 15, 2025",
      amount: "$79.99",
      status: <Badge className="bg-green-600">Paid</Badge>,
      actions: (
        <Button size="sm" variant="outline">
          View
        </Button>
      ),
    },
    {
      id: "INV-2025-09",
      date: "Sep 1, 2025",
      dueDate: "Sep 15, 2025",
      amount: "$79.99",
      status: <Badge className="bg-green-600">Paid</Badge>,
      actions: (
        <Button size="sm" variant="outline">
          View
        </Button>
      ),
    },
  ];

  const customerData = allCustomers.find((c) => c.id === customerId);

  // 3. ADD A CHECK in case the customer isn't found
  if (!customerData) {
    return (
      <div className="space-y-4">
        <Button size="icon" variant="ghost" onClick={onBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <Card>
          <CardHeader>
            <CardTitle>Customer Not Found</CardTitle>
          </CardHeader>
          <CardContent>
            <p>No customer data could be found for ID: {customerId}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button size="icon" variant="ghost" onClick={onBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h2>Customer Profile</h2>
            {/* DYNAMIC DATA */}
            <p className="text-muted-foreground">
              {customerData.name} • {customerData.accountId}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => setIsCreateTicketModalOpen(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Create Ticket
          </Button>
          <Button
            variant="outline"
            onClick={() => setIsLogPaymentModalOpen(true)}
          >
            <DollarSign className="mr-2 h-4 w-4" />
            Log Payment
          </Button>
          <Button variant="outline" onClick={() => setIsEditModalOpen(true)}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Profile
          </Button>
          <Button
            variant="destructive"
            onClick={() => setIsSuspendModalOpen(true)}
          >
            <UserX className="mr-2 h-4 w-4" />
            Suspend Account
          </Button>
        </div>
      </div>

      {/* Tabbed Interface */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tickets">Ticket History</TabsTrigger>
          <TabsTrigger value="billing">Billing & Payments</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Contact & Address */}
            <Card>
              <CardHeader>
                <CardTitle>Contact & Address</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <User className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Full Name</p>
                    <p>John Smith</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p>john.smith@email.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p>(555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Service Address
                    </p>
                    <p>123 Apple St, Suite 100</p>
                    <p className="text-sm">Springfield, IL 62701</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Account Details */}
            <Card>
              <CardHeader>
                <CardTitle>Account Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Account ID
                  </span>
                  <span>ACC-10472</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Account Status
                  </span>
                  <Badge className="bg-green-600">Active</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Service Plan
                  </span>
                  <span>Premium Fiber 1000 Mbps</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Monthly Rate
                  </span>
                  <span>$79.99/month</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Customer Since
                  </span>
                  <span>Jan 15, 2024</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Auto-Pay
                  </span>
                  <Badge variant="outline">Enabled</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Current Balance
                  </span>
                  <span className="text-green-600">$0.00</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Stats */}
          <div className="grid gap-6 md:grid-cols-4">
            <Card>
              <CardHeader>
                <CardTitle>Total Tickets</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl text-primary">12</div>
                <p className="text-sm text-muted-foreground mt-1">All time</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Open Tickets</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl text-primary">1</div>
                <p className="text-sm text-muted-foreground mt-1">
                  Currently active
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Total Paid</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl text-primary">$1,759</div>
                <p className="text-sm text-muted-foreground mt-1">
                  Lifetime value
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Payment Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl text-green-600">Good</div>
                <p className="text-sm text-muted-foreground mt-1">
                  No late payments
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Ticket History Tab */}
        <TabsContent value="tickets" className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">
              All tickets for this customer
            </p>
            <Button onClick={() => setIsCreateTicketModalOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Create New Ticket
            </Button>
          </div>
          <DataTable columns={ticketColumns} data={ticketData} />
        </TabsContent>

        {/* Billing & Payments Tab */}
        <TabsContent value="billing" className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">Invoice and payment history</p>
            <Button onClick={() => setIsLogPaymentModalOpen(true)}>
              <DollarSign className="mr-2 h-4 w-4" />
              Log Payment
            </Button>
          </div>
          <DataTable columns={invoiceColumns} data={invoiceData} />
        </TabsContent>
      </Tabs>

      {/* Modals */}
      <EditCustomerModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        customer={customerData}
      />
      <SuspendCustomerModal
        isOpen={isSuspendModalOpen}
        onClose={() => setIsSuspendModalOpen(false)}
        customerName={customerData.name}
      />
      <CreateTicketModal
        open={isCreateTicketModalOpen}
        onOpenChange={setIsCreateTicketModalOpen}
      />
      <LogPaymentModal
        open={isLogPaymentModalOpen}
        onOpenChange={setIsLogPaymentModalOpen}
      />
    </div>
  );
}
