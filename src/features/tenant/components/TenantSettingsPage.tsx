import { useState } from "react";
import { DataTable } from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus } from "lucide-react";
import { BillingSettingsPage } from "@/features/billing/components/BillingSettingsPage";
import { SLARulesTab } from "@/components/SLARulesTab";
import { KnowledgeBaseTab } from "@/features/knowledge-base/components/KnowledgeBaseTab";
import { InviteUserModal } from "@/features/staff/components/InviteUserModal";
import { EditUserModal } from "@/features/staff/components/EditUserModal";
import { DeactivateStaffModal } from "@/features/staff/components/DeactivateStaffModal";

const staffData = [
  {
    id: "1",
    name: "Alice Cooper",
    role: "Support",
    email: "alice.cooper@isp.com",
    status: "Active",
  },
  {
    id: "2",
    name: "Bob Wilson",
    role: "Support",
    email: "bob.wilson@isp.com",
    status: "Active",
  },
  {
    id: "3",
    name: "Mike Johnson",
    role: "Technician",
    email: "mike.johnson@isp.com",
    status: "Active",
  },
  {
    id: "4",
    name: "Sarah Williams",
    role: "Technician",
    email: "sarah.williams@isp.com",
    status: "Active",
  },
  {
    id: "5",
    name: "David Brown",
    role: "Technician",
    email: "david.brown@isp.com",
    status: "Active",
  },
  {
    id: "6",
    name: "Emily Davis",
    role: "Technician",
    email: "emily.davis@isp.com",
    status: "Pending",
  },
];

const slaRulesData = [
  {
    id: "1",
    category: "Installation",
    priority: "High",
    responseTime: "2 hours",
    resolutionTime: "24 hours",
  },
  {
    id: "2",
    category: "Installation",
    priority: "Medium",
    responseTime: "4 hours",
    resolutionTime: "48 hours",
  },
  {
    id: "3",
    category: "Repair",
    priority: "High",
    responseTime: "1 hour",
    resolutionTime: "8 hours",
  },
  {
    id: "4",
    category: "Repair",
    priority: "Medium",
    responseTime: "3 hours",
    resolutionTime: "24 hours",
  },
  {
    id: "5",
    category: "Billing",
    priority: "High",
    responseTime: "4 hours",
    resolutionTime: "48 hours",
  },
];

export function TenantSettingsPage() {
  const [activeTab, setActiveTab] = useState("users");
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeactivateModalOpen, setIsDeactivateModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const handleEditUser = (user: any) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleDeactivateUser = (user: any) => {
    setSelectedUser(user);
    setIsDeactivateModalOpen(true);
  };

  const staffColumns = [
    { label: "Name", key: "name" },
    {
      label: "Role",
      key: "role",
      render: (value: string) => (
        <Badge variant="outline">{value}</Badge>
      ),
    },
    { label: "Email", key: "email" },
    {
      label: "Status",
      key: "status",
      render: (value: string) => (
        <Badge variant={value === "Active" ? "default" : "secondary"}>
          {value}
        </Badge>
      ),
    },
    {
      label: "Actions",
      key: "id",
      render: (value: string, row: any) => (
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={() => handleEditUser(row)}>
            Edit
          </Button>
          <Button size="sm" variant="outline" onClick={() => handleDeactivateUser(row)}>
            Deactivate
          </Button>
        </div>
      ),
    },
  ];

  const slaColumns = [
    { label: "Category", key: "category" },
    {
      label: "Priority",
      key: "priority",
      render: (value: string) => {
        const variant = value === "High" ? "destructive" : "default";
        return <Badge variant={variant}>{value}</Badge>;
      },
    },
    { label: "Response Time", key: "responseTime" },
    { label: "Resolution Time", key: "resolutionTime" },
    {
      label: "Actions",
      key: "id",
      render: () => (
        <Button size="sm" variant="outline">
          Edit
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2>Tenant Settings</h2>
        <p className="text-muted-foreground">Configure your ISP tenant settings and preferences</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="billing">Billing Configuration</TabsTrigger>
          <TabsTrigger value="sla">SLA Rules</TabsTrigger>
          <TabsTrigger value="kb">Knowledge Base</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3>Staff Members</h3>
              <p className="text-muted-foreground text-sm">
                Manage user accounts and permissions
              </p>
            </div>
            <Button onClick={() => setIsInviteModalOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Invite User
            </Button>
          </div>
          <DataTable columns={staffColumns} data={staffData} />
        </TabsContent>

        <TabsContent value="billing">
          <BillingSettingsPage />
        </TabsContent>

        <TabsContent value="sla">
          <SLARulesTab />
        </TabsContent>

        <TabsContent value="kb">
          <KnowledgeBaseTab />
        </TabsContent>
      </Tabs>

      {/* Modals */}
      <InviteUserModal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
      />
      <EditUserModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        user={selectedUser}
      />
      <DeactivateStaffModal
        open={isDeactivateModalOpen}
        onOpenChange={setIsDeactivateModalOpen}
        userName={selectedUser?.name || ""}
      />
    </div>
  );
}
