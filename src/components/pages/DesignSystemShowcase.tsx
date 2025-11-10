import { useState } from "react";
import {
  Users,
  Search,
  Mail,
  Lock,
  LayoutDashboard,
  Settings,
  FileText,
  Ticket,
  Home,
} from "lucide-react";
import { AppLayout } from "../layouts/AppLayout";
import { MobileLayout } from "../layouts/MobileLayout";
import { AuthLayout } from "../layouts/AuthLayout";
import { EmptyState } from "../EmptyState";
import { LoadingSkeleton } from "../LoadingSkeleton";
import { InputWithIcon } from "../InputWithIcon";
import { NotificationsCenter, Notification } from "../NotificationsCenter";
import { SessionTimeoutModal } from "../modals/SessionTimeoutModal";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Badge } from "../ui/badge";
import { toast } from "sonner";

export function DesignSystemShowcase() {
  const [showSessionModal, setShowSessionModal] = useState(false);
  const [layoutMode, setLayoutMode] = useState<"app" | "mobile" | "auth">("app");
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "info",
      title: "New customer registered",
      message: "John Doe has signed up for the Premium plan",
      timestamp: new Date(Date.now() - 300000),
      read: false,
      actionLabel: "View",
      onAction: () => toast.info("Viewing customer details"),
    },
    {
      id: "2",
      type: "success",
      title: "Payment received",
      message: "Payment of $299.00 received from ACME Corp",
      timestamp: new Date(Date.now() - 3600000),
      read: false,
    },
    {
      id: "3",
      type: "warning",
      title: "Service degradation",
      message: "Network latency is higher than normal in Zone A",
      timestamp: new Date(Date.now() - 7200000),
      read: true,
    },
  ]);

  const navigation = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
      active: true,
      onClick: () => toast.info("Dashboard clicked"),
    },
    {
      name: "Customers",
      icon: <Users className="h-5 w-5" />,
      onClick: () => toast.info("Customers clicked"),
    },
    {
      name: "Tickets",
      icon: <Ticket className="h-5 w-5" />,
      onClick: () => toast.info("Tickets clicked"),
    },
    {
      name: "Reports",
      icon: <FileText className="h-5 w-5" />,
      onClick: () => toast.info("Reports clicked"),
    },
    {
      name: "Settings",
      icon: <Settings className="h-5 w-5" />,
      onClick: () => toast.info("Settings clicked"),
    },
  ];

  const bottomNav = [
    {
      name: "Home",
      icon: <Home className="h-5 w-5" />,
      active: true,
      onClick: () => toast.info("Home clicked"),
    },
    {
      name: "Tickets",
      icon: <Ticket className="h-5 w-5" />,
      badge: 3,
      onClick: () => toast.info("Tickets clicked"),
    },
    {
      name: "Profile",
      icon: <Users className="h-5 w-5" />,
      onClick: () => toast.info("Profile clicked"),
    },
  ];

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
    toast.success("Notification marked as read");
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    toast.success("All notifications marked as read");
  };

  const handleDeleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    toast.success("Notification deleted");
  };

  const handleClearAll = () => {
    setNotifications([]);
    toast.success("All notifications cleared");
  };

  const ShowcaseContent = () => (
    <div className="space-y-8">
      <div>
        <h2 className="mb-4">Design System Showcase</h2>
        <p className="text-muted-foreground mb-6">
          This page demonstrates all the foundational components of the ISP Manager
          design system.
        </p>
      </div>

      {/* Layout Switcher */}
      <Card>
        <CardHeader>
          <CardTitle>Layout Examples</CardTitle>
          <CardDescription>
            Switch between different layout modes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Button
              variant={layoutMode === "app" ? "default" : "outline"}
              onClick={() => setLayoutMode("app")}
            >
              App Layout
            </Button>
            <Button
              variant={layoutMode === "mobile" ? "default" : "outline"}
              onClick={() => setLayoutMode("mobile")}
            >
              Mobile Layout
            </Button>
            <Button
              variant={layoutMode === "auth" ? "default" : "outline"}
              onClick={() => setLayoutMode("auth")}
            >
              Auth Layout
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-3">
            Current: <Badge>{layoutMode}</Badge>
          </p>
        </CardContent>
      </Card>

      {/* Buttons */}
      <Card>
        <CardHeader>
          <CardTitle>Buttons</CardTitle>
          <CardDescription>All button variants and sizes</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
            <Button size="icon">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button disabled>Disabled</Button>
            <Button loading>Loading</Button>
          </div>
        </CardContent>
      </Card>

      {/* Inputs */}
      <Card>
        <CardHeader>
          <CardTitle>Input Components</CardTitle>
          <CardDescription>Form inputs with various states</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <InputWithIcon
            label="Email"
            type="email"
            placeholder="Enter your email"
            leftIcon={<Mail className="h-4 w-4" />}
          />
          <InputWithIcon
            label="Password"
            type="password"
            placeholder="Enter your password"
            leftIcon={<Lock className="h-4 w-4" />}
            helperText="Must be at least 8 characters"
          />
          <InputWithIcon
            label="Search"
            placeholder="Search customers..."
            leftIcon={<Search className="h-4 w-4" />}
            rightIcon={
              <Button size="sm" variant="ghost" className="h-7 w-7 p-0">
                <span className="sr-only">Search</span>
                <Search className="h-4 w-4" />
              </Button>
            }
          />
          <InputWithIcon
            label="Required Field"
            required
            error="This field is required"
          />
        </CardContent>
      </Card>

      {/* Empty States */}
      <Card>
        <CardHeader>
          <CardTitle>Empty States</CardTitle>
          <CardDescription>No data and error states</CardDescription>
        </CardHeader>
        <CardContent>
          <EmptyState
            icon={Users}
            title="No customers yet"
            description="Get started by adding your first customer to the system."
            action={{
              label: "Add Customer",
              onClick: () => toast.success("Add customer clicked"),
            }}
            secondaryAction={{
              label: "Import CSV",
              onClick: () => toast.info("Import CSV clicked"),
            }}
          />
        </CardContent>
      </Card>

      {/* Loading Skeletons */}
      <Card>
        <CardHeader>
          <CardTitle>Loading Skeletons</CardTitle>
          <CardDescription>Placeholder states while loading</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="card">
            <TabsList>
              <TabsTrigger value="card">Card</TabsTrigger>
              <TabsTrigger value="table">Table</TabsTrigger>
              <TabsTrigger value="form">Form</TabsTrigger>
              <TabsTrigger value="list">List</TabsTrigger>
            </TabsList>
            <TabsContent value="card">
              <LoadingSkeleton variant="card" count={2} />
            </TabsContent>
            <TabsContent value="table">
              <LoadingSkeleton variant="table" count={5} />
            </TabsContent>
            <TabsContent value="form">
              <LoadingSkeleton variant="form" count={3} />
            </TabsContent>
            <TabsContent value="list">
              <LoadingSkeleton variant="list" count={4} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* System Modals */}
      <Card>
        <CardHeader>
          <CardTitle>System Components</CardTitle>
          <CardDescription>
            Session timeout and notifications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Button onClick={() => setShowSessionModal(true)}>
              Show Session Timeout Modal
            </Button>
          </div>
          <div className="flex items-center gap-3">
            <NotificationsCenter
              notifications={notifications}
              onMarkAsRead={handleMarkAsRead}
              onMarkAllAsRead={handleMarkAllAsRead}
              onDelete={handleDeleteNotification}
              onClearAll={handleClearAll}
            />
            <span className="text-sm text-muted-foreground">
              Notifications Center Component
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Color System */}
      <Card>
        <CardHeader>
          <CardTitle>Color System</CardTitle>
          <CardDescription>Semantic color tokens</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="space-y-2">
              <div className="h-12 rounded-lg bg-primary" />
              <p className="text-sm">Primary</p>
            </div>
            <div className="space-y-2">
              <div className="h-12 rounded-lg bg-secondary" />
              <p className="text-sm">Secondary</p>
            </div>
            <div className="space-y-2">
              <div className="h-12 rounded-lg bg-accent" />
              <p className="text-sm">Accent</p>
            </div>
            <div className="space-y-2">
              <div className="h-12 rounded-lg bg-success" />
              <p className="text-sm">Success</p>
            </div>
            <div className="space-y-2">
              <div className="h-12 rounded-lg bg-warning" />
              <p className="text-sm">Warning</p>
            </div>
            <div className="space-y-2">
              <div className="h-12 rounded-lg bg-destructive" />
              <p className="text-sm">Destructive</p>
            </div>
            <div className="space-y-2">
              <div className="h-12 rounded-lg bg-muted" />
              <p className="text-sm">Muted</p>
            </div>
            <div className="space-y-2">
              <div className="h-12 rounded-lg bg-card border border-border" />
              <p className="text-sm">Card</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  if (layoutMode === "mobile") {
    return (
      <MobileLayout
        headerTitle="Design System"
        bottomNav={bottomNav}
        className="p-4"
      >
        <ShowcaseContent />
      </MobileLayout>
    );
  }

  if (layoutMode === "auth") {
    return (
      <AuthLayout
        title="Sign In"
        description="Enter your credentials to access your account"
        footer={
          <p>
            Don't have an account? <a href="#" className="text-primary hover:underline">Sign up</a>
          </p>
        }
      >
        <form className="space-y-4">
          <InputWithIcon
            label="Email"
            type="email"
            placeholder="name@example.com"
            leftIcon={<Mail className="h-4 w-4" />}
          />
          <InputWithIcon
            label="Password"
            type="password"
            placeholder="Enter your password"
            leftIcon={<Lock className="h-4 w-4" />}
          />
          <Button className="w-full">Sign In</Button>
        </form>
      </AuthLayout>
    );
  }

  return (
    <>
      <AppLayout
        navigation={navigation}
        userName="John Doe"
        userRole="System Admin"
        pageTitle="Design System Showcase"
        notificationCount={notifications.filter((n) => !n.read).length}
        onNotificationsClick={() => toast.info("Notifications opened")}
        onLogout={() => toast.success("Logged out")}
        onAccountSettings={() => toast.info("Account settings opened")}
      >
        <ShowcaseContent />
      </AppLayout>

      <SessionTimeoutModal
        open={showSessionModal}
        onContinue={() => {
          setShowSessionModal(false);
          toast.success("Session extended");
        }}
        onLogout={() => {
          setShowSessionModal(false);
          toast.info("Logged out");
        }}
        countdown={60}
      />
    </>
  );
}
