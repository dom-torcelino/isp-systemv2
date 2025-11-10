// src/components/layout/TopHeader.tsx
'use client';

import { useState, ReactNode } from "react";
import Link from 'next/link'; // Import Link
import {
  Bell,
  User,
  LogOut,
  Moon,
  Globe,
  Check,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage, Language } from "@/contexts/LanguageContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { NavigationSidebar } from "./NavigationSidebar"; // Import the sidebar for mobile

interface TopHeaderProps {
  headerActions?: ReactNode;
  pageTitle?: string;
  notificationCount?: number;
  onNotificationsClick?: () => void;
}

export function TopHeader({
  headerActions,
  pageTitle,
  notificationCount = 0,
  onNotificationsClick,
}: TopHeaderProps) {
  // State for the mobile sidebar now lives here
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  
  // Use hooks to get global state, NOT props
  const { userName, currentRole, logout, setCurrentRole } = useAuth();
  const { isDarkMode, toggleDarkMode } = useTheme(); // <-- BUG FIX: Was toggleTheme
  const { language, setLanguage, t } = useLanguage();

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
  };

  return (
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
            {/* This is where mobile=true is correctly used */}
            <NavigationSidebar mobile onNavigate={() => setIsMobileSidebarOpen(false)} />
          </SheetContent>
        </Sheet>

        {pageTitle && <h1>{pageTitle}</h1>}
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        {headerActions}

        {/* DEMO: Role Switcher (from App.tsx) */}
        <select
          value={currentRole}
          onChange={(e) => setCurrentRole(e.target.value as any)}
          className="rounded-lg border border-border bg-card px-3 py-2 text-sm"
        >
          <option value="Super Admin">Super Admin</option>
          <option value="System Admin">System Admin</option>
          <option value="Customer Support">Customer Support</option>
          <option value="IT">IT</option>
          <option value="Field Technician">Field Technician</option>
          <option value="Customer">Customer</option>
        </select>
        {/* END DEMO */}

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
                <p className="text-muted-foreground text-xs">{t(currentRole)}</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <span aria-hidden="true">{userName.charAt(0)}</span>
              </div>
            </button>
          </DropdownMenuTrigger>
          
          <DropdownMenuContent align="end" className="w-56">
            {/* REFACTOR: Use <Link> instead of onAccountSettings prop */}
            <DropdownMenuItem asChild>
              <Link href="/account-settings">
                <User className="mr-2 h-4 w-4" aria-hidden="true" />
                <span>{t("Account Settings")}</span>
              </Link>
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
                onCheckedChange={toggleDarkMode} // <-- BUG FIX
                onClick={(e) => e.stopPropagation()}
                aria-label="Toggle dark mode"
              />
            </DropdownMenuItem>

            <DropdownMenuSeparator />
            {/* REFACTOR: Use `logout` from hook instead of prop */}
            <DropdownMenuItem
              onClick={logout}
              className="text-destructive focus:text-destructive"
            >
              <LogOut className="mr-2 h-4 w-4" aria-hidden="true" />
              <span>{t("Log Out")}</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}