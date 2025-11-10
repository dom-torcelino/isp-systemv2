import { ReactNode, useState } from "react";
import {
  Bell,
  ChevronLeft,
  ChevronRight,
  Building2,
  User,
  LogOut,
  Settings,
  Moon,
  Globe,
  Check,
} from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
import { useLanguage, Language } from "../../contexts/LanguageContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "../ui/dropdown-menu";
import { Switch } from "../ui/switch";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";

interface NavigationItem {
  name: string;
  icon: ReactNode;
  href?: string;
  active?: boolean;
  onClick?: () => void;
}

interface AppLayoutProps {
  children: ReactNode;
  navigation: NavigationItem[];
  userName: string;
  userRole: string;
  userAvatar?: string;
  pageTitle?: string;
  headerActions?: ReactNode;
  onLogout?: () => void;
  onAccountSettings?: () => void;
  notificationCount?: number;
  onNotificationsClick?: () => void;
}

export function AppLayout({
  children,
  navigation,
  userName,
  userRole,
  userAvatar,
  pageTitle,
  headerActions,
  onLogout,
  onAccountSettings,
  notificationCount = 0,
  onNotificationsClick,
}: AppLayoutProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const { isDarkMode, toggleDarkMode } = useTheme();
  const { language, setLanguage, t } = useLanguage();

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      alert("Logged out successfully");
    }
  };

  const Sidebar = ({ mobile = false }: { mobile?: boolean }) => (
    <aside
      className={`flex flex-col bg-card border-r border-border transition-all duration-300 ${
        mobile ? "w-64" : isSidebarCollapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Logo/Brand */}
      <div className="flex h-16 items-center gap-3 border-b border-border px-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground flex-shrink-0">
          <Building2 className="h-5 w-5" aria-hidden="true" />
        </div>
        {(!isSidebarCollapsed || mobile) && (
          <div className="min-w-0">
            <h2 className="text-sm truncate font-semibold">ISP Manager</h2>
            <p className="text-xs text-muted-foreground truncate">{userRole}</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav
        className="flex flex-1 flex-col gap-1 p-4 overflow-y-auto"
        role="navigation"
        aria-label="Main navigation"
      >
        <TooltipProvider>
          {navigation.map((item, index) => {
            const navButton = (
              <button
                key={index}
                onClick={() => {
                  item.onClick?.();
                  if (mobile) setIsMobileSidebarOpen(false);
                }}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                  item.active
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                } ${isSidebarCollapsed && !mobile ? "justify-center" : ""}`}
                aria-current={item.active ? "page" : undefined}
              >
                <span className="flex-shrink-0" aria-hidden="true">
                  {item.icon}
                </span>
                {(!isSidebarCollapsed || mobile) && <span>{t(item.name)}</span>}
              </button>
            );

            if (isSidebarCollapsed && !mobile) {
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

      {/* Collapse Toggle (Desktop Only) */}
      {!mobile && (
        <div className="border-t border-border p-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors w-full text-muted-foreground hover:bg-secondary hover:text-foreground ${
                    isSidebarCollapsed ? "justify-center" : ""
                  }`}
                  aria-label={
                    isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"
                  }
                  aria-expanded={!isSidebarCollapsed}
                >
                  {isSidebarCollapsed ? (
                    <ChevronRight className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <>
                      <ChevronLeft className="h-5 w-5" aria-hidden="true" />
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
      )}
    </aside>
  );

  return (
    <div className="flex h-screen bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <header
          className="flex h-16 items-center justify-between border-b border-border bg-card px-4 md:px-6"
          role="banner"
        >
          <div className="flex items-center gap-4">
            {/* Mobile Menu Button */}
            <Sheet open={isMobileSidebarOpen} onOpenChange={setIsMobileSidebarOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                  aria-label="Open menu"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-64">
                <Sidebar mobile />
              </SheetContent>
            </Sheet>

            {pageTitle && <h1>{pageTitle}</h1>}
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            {headerActions}

            {/* Notifications */}
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={onNotificationsClick}
              aria-label={`Notifications ${
                notificationCount > 0 ? `(${notificationCount} new)` : ""
              }`}
            >
              <Bell className="h-5 w-5" aria-hidden="true" />
              {notificationCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  aria-label={`${notificationCount} new notifications`}
                >
                  {notificationCount > 9 ? "9+" : notificationCount}
                </Badge>
              )}
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
                  aria-label="User menu"
                >
                  <div className="hidden md:block text-right text-sm">
                    <p>{userName}</p>
                    <p className="text-muted-foreground text-xs">{userRole}</p>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    {userAvatar ? (
                      <img
                        src={userAvatar}
                        alt=""
                        className="h-full w-full rounded-full object-cover"
                      />
                    ) : (
                      <span aria-hidden="true">{userName.charAt(0)}</span>
                    )}
                  </div>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem onClick={onAccountSettings}>
                  <User className="mr-2 h-4 w-4" aria-hidden="true" />
                  <span>{t("Account Settings")}</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />

                {/* Language Submenu */}
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <Globe className="mr-2 h-4 w-4" aria-hidden="true" />
                    <span>{t("Change Language")}</span>
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem onClick={() => handleLanguageChange("English")}>
                      <div className="flex items-center justify-between w-full">
                        <span>English</span>
                        {language === "English" && (
                          <Check className="h-4 w-4" aria-hidden="true" />
                        )}
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleLanguageChange("Filipino")}>
                      <div className="flex items-center justify-between w-full">
                        <span>Filipino</span>
                        {language === "Filipino" && (
                          <Check className="h-4 w-4" aria-hidden="true" />
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
                    <Moon className="mr-2 h-4 w-4" aria-hidden="true" />
                    <span>{t("Dark Mode")}</span>
                  </div>
                  <Switch
                    checked={isDarkMode}
                    onCheckedChange={toggleDarkMode}
                    onClick={(e) => e.stopPropagation()}
                    aria-label="Toggle dark mode"
                  />
                </DropdownMenuItem>

                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-destructive focus:text-destructive"
                >
                  <LogOut className="mr-2 h-4 w-4" aria-hidden="true" />
                  <span>{t("Log Out")}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-4 md:p-6" role="main">
          {children}
        </main>
      </div>
    </div>
  );
}
