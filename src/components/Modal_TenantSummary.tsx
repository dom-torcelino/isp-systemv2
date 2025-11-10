import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { useLanguage } from "../contexts/LanguageContext";
import {
  Building2,
  Mail,
  CreditCard,
  Users,
  DollarSign,
  Ticket,
} from "lucide-react";

interface TenantData {
  companyName: string;
  status: string;
  adminEmail: string;
  subscriptionPlan: string;
  totalCustomers: number;
  totalRevenueMTD?: string;
  totalOpenTickets?: number;
}

interface Modal_TenantSummaryProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tenant?: TenantData | null;
}

export function Modal_TenantSummary({
  open,
  onOpenChange,
  tenant,
}: Modal_TenantSummaryProps) {
  const { t } = useLanguage();

  if (!tenant) return null;

  const getStatusVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "default";
      case "suspended":
        return "destructive";
      case "deactivated":
        return "secondary";
      default:
        return "outline";
    }
  };

  const getStatusClassName = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-500/10 text-green-600 border-green-500/20";
      case "suspended":
        return "bg-orange-500/10 text-orange-600 border-orange-500/20";
      case "deactivated":
        return "bg-gray-500/10 text-gray-600 border-gray-500/20";
      default:
        return "";
    }
  };

  // Mock data for revenue and tickets if not provided
  const revenueMTD = tenant.totalRevenueMTD || "$24,680";
  const openTickets = tenant.totalOpenTickets ?? 8;

  const StatItem = ({
    icon: Icon,
    label,
    value,
    badge,
  }: {
    icon: any;
    label: string;
    value: string | number;
    badge?: React.ReactNode;
  }) => (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Icon className="h-4 w-4" aria-hidden="true" />
        <span>{label}</span>
      </div>
      <div className="flex items-center gap-2">
        {badge || <p className="text-lg">{value}</p>}
      </div>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]" aria-describedby="tenant-summary-description">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-primary" aria-hidden="true" />
            {t("Tenant Summary")}: {tenant.companyName}
          </DialogTitle>
          <DialogDescription id="tenant-summary-description">
            {t("View detailed information about this tenant and their subscription.")}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Two-column layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <StatItem
                icon={Building2}
                label={t("Status")}
                value=""
                badge={
                  <Badge
                    variant={getStatusVariant(tenant.status)}
                    className={getStatusClassName(tenant.status)}
                  >
                    {t(tenant.status)}
                  </Badge>
                }
              />
              
              <StatItem
                icon={Mail}
                label={t("System Admin")}
                value={tenant.adminEmail}
              />

              <StatItem
                icon={CreditCard}
                label={t("Subscription Plan")}
                value=""
                badge={
                  <Badge variant="outline">
                    {t(tenant.subscriptionPlan)}
                  </Badge>
                }
              />
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <StatItem
                icon={Users}
                label={t("Total Customers")}
                value={tenant.totalCustomers.toLocaleString()}
              />

              <StatItem
                icon={DollarSign}
                label={t("Total Revenue (MTD)")}
                value={revenueMTD}
              />

              <StatItem
                icon={Ticket}
                label={t("Total Open Tickets")}
                value={openTickets}
              />
            </div>
          </div>

          <Separator />

          {/* Additional Information Section */}
          <div className="rounded-lg bg-muted/50 p-4 space-y-2">
            <h4 className="text-sm font-medium">{t("Quick Stats")}</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">{t("Active Since")}</span>
                <p>January 15, 2024</p>
              </div>
              <div>
                <span className="text-muted-foreground">{t("Last Login")}</span>
                <p>2 hours ago</p>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t("Close")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
