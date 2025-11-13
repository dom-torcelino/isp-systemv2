import { ReactNode, useState } from "react";
import {
  LayoutDashboard,
  Users,
  CreditCard,
  Settings,
  FileText,
  Ticket,
  UserCircle,
  Wrench,
  BarChart3,
  Building2,
  LogOut,
  User,
  Globe,
  Moon,
  Check,
  Server,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { useLanguage, Language } from "../contexts/LanguageContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "./ui/dropdown-menu";
import { Switch } from "./ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Panel_Notifications } from "./Panel_Notifications";

interface DashboardLayoutProps {
  role: string;
  userName: string;
  navigation: Array<{
    name: string;
    icon: string;
    active?: boolean;
    view?: string;
  }>;
  children: ReactNode;
  onRoleChange?: (role: string) => void;
  onNavigate?: (view: string) => void;
  onAccountSettings?: () => void;
}

const iconMap: Record<string, any> = {
  dashboard: LayoutDashboard,
  users: Users,
  building: Building2,
  credit: CreditCard,
  settings: Settings,
  file: FileText,
  ticket: Ticket,
  user: UserCircle,
  wrench: Wrench,
  chart: BarChart3,
  server: Server,
};

export function DashboardLayout({
  role,
  userName,
  navigation,
  children,
  onRoleChange,
  onNavigate,
  onAccountSettings,
}: DashboardLayoutProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const { isDarkMode, toggleDarkMode } = useTheme();
  const { language, setLanguage, t } = useLanguage();

  const handleLogout = () => {
    alert("Logged out successfully. Redirecting to login...");
    // In a real app, this would redirect to login page
  };

  const handleSettings = () => {
    if (onAccountSettings) {
      onAccountSettings();
      setIsProfileOpen(false);
    }
  };

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
  };

  const handleDarkModeToggle = (checked: boolean) => {
    toggleDarkMode();
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside
        className={`flex flex-col border-r border-border bg-card transition-all duration-300 ${
          isSidebarCollapsed ? "w-20" : "w-64"
        }`}
      >
        <div className="flex h-16 items-center gap-3 border-b border-border px-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground flex-shrink-0">
            <Building2 className="h-5 w-5" />
          </div>
          {!isSidebarCollapsed && (
            <div className="min-w-0">
              <h2 className="text-sm truncate">ISP Manager</h2>
              <p className="text-xs text-muted-foreground truncate">{role}</p>
            </div>
          )}
        </div>
        <nav className="flex flex-1 flex-col gap-1 p-4">
          <TooltipProvider>
            {navigation.map((item, index) => {
              const Icon = iconMap[item.icon];
              const navButton = (
                <button
                  key={index}
                  onClick={() => item.view && onNavigate?.(item.view)}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                    item.active
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  } ${isSidebarCollapsed ? "justify-center" : ""}`}
                >
                  {Icon && <Icon className="h-5 w-5 flex-shrink-0" />}
                  {!isSidebarCollapsed && <span>{t(item.name)}</span>}
                </button>
              );

              if (isSidebarCollapsed) {
                return (
                  <Tooltip key={index}>
                    <TooltipTrigger asChild>{navButton}</TooltipTrigger>
                    <TooltipContent side="right">
                      <p>{t(item.name)}</p>
                    </TooltipContent>
                  </Tooltip>
                );
              }

              return navButton;
            })}
          </TooltipProvider>
        </nav>

        {/* Collapse Toggle Button */}
        <div className="border-t border-border p-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors w-full text-muted-foreground hover:bg-secondary hover:text-foreground ${
                    isSidebarCollapsed ? "justify-center" : ""
                  }`}
                >
                  {isSidebarCollapsed ? (
                    <ChevronRight className="h-5 w-5" />
                  ) : (
                    <>
                      <ChevronLeft className="h-5 w-5" />
                      <span>Collapse</span>
                    </>
                  )}
                </button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>
                  {isSidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header className="flex h-16 items-center justify-between border-b border-border bg-card px-6">
          <div className="flex items-center gap-4">
            <h1>
              {t(role)} {t("Dashboard")}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            {onRoleChange && (
              <Select value={role} onValueChange={onRoleChange}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="View As" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Super Admin">
                    {t("Super Admin")}
                  </SelectItem>
                  <SelectItem value="System Admin">
                    {t("System Admin")}
                  </SelectItem>
                  <SelectItem value="Customer Support">
                    {t("Customer Support")}
                  </SelectItem>
                  <SelectItem value="IT">IT Operations</SelectItem>
                  <SelectItem value="Field Technician">
                    {t("Field Technician")}
                  </SelectItem>
                  <SelectItem value="Customer">Customer</SelectItem>
                </SelectContent>
              </Select>
            )}
            {/* Notifications Panel */}
            <Panel_Notifications />
            <DropdownMenu open={isProfileOpen} onOpenChange={setIsProfileOpen}>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
                  <div className="text-right text-sm">
                    <p>{userName}</p>
                    <p className="text-muted-foreground text-xs">{role}</p>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    {userName.charAt(0)}
                  </div>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem onClick={handleSettings}>
                  <User className="mr-2 h-4 w-4" />
                  <span>{t("Account Settings")}</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />

                {/* Language Sub-menu */}
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <Globe className="mr-2 h-4 w-4" />
                    <span>{t("Change Language")}</span>
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem
                      onClick={() => handleLanguageChange("English")}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span>English</span>
                        {language === "English" && (
                          <Check className="h-4 w-4" />
                        )}
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleLanguageChange("Filipino")}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span>Filipino</span>
                        {language === "Filipino" && (
                          <Check className="h-4 w-4" />
                        )}
                      </div>
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>

                {/* Dark Mode Toggle */}
                <DropdownMenuItem
                  onSelect={(e) => {
                    e.preventDefault();
                  }}
                  className="flex items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center">
                    <Moon className="mr-2 h-4 w-4" />
                    <span>{t("Dark Mode")}</span>
                  </div>
                  <Switch
                    checked={isDarkMode}
                    onCheckedChange={handleDarkModeToggle}
                    onClick={(e) => e.stopPropagation()}
                  />
                </DropdownMenuItem>

                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-destructive focus:text-destructive"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>{t("Log Out")}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto w-fulletwork Latency (Last 24 Hours">{children}</div>
        </main>
      </div>
    </div>
  );
}
