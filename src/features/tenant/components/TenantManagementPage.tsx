'use client'
import { useState } from "react";
import { DataTable } from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, MoreVertical } from "lucide-react";
import { Modal_CreateTenant } from "@/features/tenant/components/Modal_CreateTenant";
import { Modal_SuspendTenant } from "@/features/tenant/components/Modal_SuspendTenant";
import { Modal_DeactivateTenant } from "@/features/tenant/components/Modal_DeactivateTenant";
import { Modal_TenantSummary } from "@/features/tenant/components/Modal_TenantSummary";
import { EditTenantModal } from "@/features/tenant/components/EditTenantModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/contexts/LanguageContext";

const tenantsData = [
  {
    id: "1",
    companyName: "FastNet ISP",
    status: "Active",
    subscriptionPlan: "Professional",
    adminEmail: "admin@fastnet.com",
    totalCustomers: 1247,
  },
  {
    id: "2",
    companyName: "SpeedLink ISP",
    status: "Active",
    subscriptionPlan: "Enterprise",
    adminEmail: "owner@speedlink.com",
    totalCustomers: 2834,
  },
  {
    id: "3",
    companyName: "ConnectPro ISP",
    status: "Active",
    subscriptionPlan: "Professional",
    adminEmail: "admin@connectpro.com",
    totalCustomers: 892,
  },
  {
    id: "4",
    companyName: "NetWave ISP",
    status: "Suspended",
    subscriptionPlan: "Starter",
    adminEmail: "contact@netwave.com",
    totalCustomers: 456,
  },
  {
    id: "5",
    companyName: "QuickConnect ISP",
    status: "Active",
    subscriptionPlan: "Enterprise",
    adminEmail: "admin@quickconnect.com",
    totalCustomers: 3201,
  },
  {
    id: "6",
    companyName: "CityFiber ISP",
    status: "Active",
    subscriptionPlan: "Professional",
    adminEmail: "owner@cityfiber.com",
    totalCustomers: 1678,
  },
  {
    id: "7",
    companyName: "HomeNet ISP",
    status: "Deactivated",
    subscriptionPlan: "Starter",
    adminEmail: "admin@homenet.com",
    totalCustomers: 234,
  },
];

export function TenantManagementPage() {
  const { t } = useLanguage();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showSuspendModal, setShowSuspendModal] = useState(false);
  const [showDeactivateModal, setShowDeactivateModal] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState<any>(null);

  const tenantColumns = [
    { label: "ISP Company Name", key: "companyName" },
    {
      label: "Status",
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
    {
      label: "Subscription Plan",
      key: "subscriptionPlan",
      render: (value: string) => (
        <Badge variant="outline">{value}</Badge>
      ),
    },
    { label: "System Admin Email", key: "adminEmail" },
    { label: "Total Customers", key: "totalCustomers" },
    {
      label: t("Actions"),
      key: "id",
      render: (_: any, row: any) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" aria-label={t("Open actions menu")}>
              <MoreVertical className="h-4 w-4" aria-hidden="true" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => {
                setSelectedTenant(row);
                setShowSummaryModal(true);
              }}
            >
              {t("View Details")}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setSelectedTenant(row);
                setShowEditModal(true);
              }}
            >
              {t("Edit Tenant")}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {row.status !== "Suspended" && row.status !== "Deactivated" && (
              <DropdownMenuItem
                onClick={() => {
                  setSelectedTenant(row);
                  setShowSuspendModal(true);
                }}
              >
                {t("Suspend")}
              </DropdownMenuItem>
            )}
            {row.status !== "Deactivated" && (
              <DropdownMenuItem
                className="text-destructive focus:text-destructive"
                onClick={() => {
                  setSelectedTenant(row);
                  setShowDeactivateModal(true);
                }}
              >
                {t("Deactivate")}
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2>All Tenants</h2>
          <p className="text-muted-foreground">Manage all ISP business tenants on the platform</p>
        </div>
        <Button onClick={() => setShowCreateModal(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Create New Tenant
        </Button>
      </div>

      {/* Tenants Table */}
      <DataTable columns={tenantColumns} data={tenantsData} />

      {/* Modals */}
      <Modal_CreateTenant
        open={showCreateModal}
        onOpenChange={setShowCreateModal}
      />
      <Modal_TenantSummary
        open={showSummaryModal}
        onOpenChange={setShowSummaryModal}
        tenant={selectedTenant}
      />
      <EditTenantModal
        open={showEditModal}
        onOpenChange={setShowEditModal}
        tenant={selectedTenant}
      />
      <Modal_SuspendTenant
        open={showSuspendModal}
        onOpenChange={setShowSuspendModal}
        tenantName={selectedTenant?.companyName}
      />
      <Modal_DeactivateTenant
        open={showDeactivateModal}
        onOpenChange={setShowDeactivateModal}
        tenantName={selectedTenant?.companyName}
      />
    </div>
  );
}
