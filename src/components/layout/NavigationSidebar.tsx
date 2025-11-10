// src/components/layout/NavigationSidebar.tsx
'use client';

import { useState, ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext'; // Import hook
import { useLanguage } from '@/contexts/LanguageContext'; // Import hook
import {
  ChevronLeft,
  ChevronRight,
  Building2,
  LayoutDashboard,
  Ticket,
  Users,
  CreditCard,
  Wrench,
  BarChart3,
  Settings,
  Server,
  FileText,
  Package,
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// 1. Define the navigation item type with real routes
interface NavigationItem {
  name: string;
  href: string; // Use href for real routing
  icon: ReactNode;
  roles: string[]; // Define which roles see this link
}

// 2. Define ALL navigation items for the entire app
const allNavItems: NavigationItem[] = [
  // Super Admin
  { name: 'Dashboard', href: '/', icon: <LayoutDashboard className="h-5 w-5" />, roles: ['Super Admin'] },
  { name: 'Tenant Management', href: '/tenants', icon: <Building2 className="h-5 w-5" />, roles: ['Super Admin'] },
  { name: 'SaaS Plans', href: '/plans', icon: <Package className="h-5 w-5" />, roles: ['Super Admin'] },
  { name: 'Global Settings', href: '/global-settings', icon: <Settings className="h-5 w-5" />, roles: ['Super Admin'] },
  { name: 'Audit Logs', href: '/audit', icon: <FileText className="h-5 w-5" />, roles: ['Super Admin'] },

  // System Admin
  { name: 'Dashboard', href: '/', icon: <LayoutDashboard className="h-5 w-5" />, roles: ['System Admin'] },
  { name: 'Ticket Management', href: '/tickets', icon: <Ticket className="h-5 w-5" />, roles: ['System Admin'] },
  { name: 'Customer Management', href: '/customers', icon: <Users className="h-5 w-5" />, roles: ['System Admin'] },
  { name: 'Billing', href: '/billing', icon: <CreditCard className="h-5 w-5" />, roles: ['System Admin'] },
  { name: 'Technician Ops', href: '/technicians', icon: <Wrench className="h-5 w-5" />, roles: ['System Admin'] },
  { name: 'Reports', href: '/reports', icon: <BarChart3 className="h-5 w-5" />, roles: ['System Admin'] },
  { name: 'Tenant Settings', href: '/settings', icon: <Settings className="h-5 w-5" />, roles: ['System Admin'] },
  { name: 'Network Devices', href: '/devices', icon: <Server className="h-5 w-5" />, roles: ['System Admin'] },
  { name: 'Audit Log', href: '/audit', icon: <FileText className="h-5 w-5" />, roles: ['System Admin'] },
  
  // Customer Support
  { name: 'Dashboard', href: '/', icon: <LayoutDashboard className="h-5 w-5" />, roles: ['Customer Support'] },
  { name: 'Tickets', href: '/tickets', icon: <Ticket className="h-5 w-5" />, roles: ['Customer Support'] },
  { name: 'Customers', href: '/customers', icon: <Users className="h-5 w-5" />, roles: ['Customer Support'] },
  { name: 'Knowledge Base', href: '/kb', icon: <FileText className="h-5 w-5" />, roles: ['Customer Support'] },
  
  // IT
  { name: 'Dashboard', href: '/', icon: <LayoutDashboard className="h-5 w-5" />, roles: ['IT'] },
  { name: 'Network Devices', href: '/devices', icon: <Server className="h-5 w-5" />, roles: ['IT'] },
];

// 3. This component is now "prop-less" for its data
export function NavigationSidebar({ mobile = false, onNavigate }: { mobile?: boolean, onNavigate?: () => void }) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  
  // 4. Get all state from hooks, not props
  const { currentRole } = useAuth();
  const { t } = useLanguage();
  const pathname = usePathname(); // Get the current URL

  // 5. Filter the nav items based on the user's role
  const navigation = allNavItems.filter(item => item.roles.includes(currentRole));
  
  // 6. Check if a link is active based on the URL
  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <aside
      className={`flex flex-col bg-card border-r border-border transition-all duration-300 ${
        mobile ? "w-64" : isSidebarCollapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Logo/Brand (uses 'currentRole' from hook) */}
      <div className="flex h-16 items-center gap-3 border-b border-border px-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground flex-shrink-0">
          <Building2 className="h-5 w-5" aria-hidden="true" />
        </div>
        {(!isSidebarCollapsed || mobile) && (
          <div className="min-w-0">
            <h2 className="text-sm truncate font-semibold">ISP Manager</h2>
            <p className="text-xs text-muted-foreground truncate">{t(currentRole)}</p>
          </div>
        )}
      </div>

      {/* Navigation (uses 'navigation' list generated above) */}
      <nav
        className="flex flex-1 flex-col gap-1 p-4 overflow-y-auto"
        role="navigation"
        aria-label="Main navigation"
      >
        <TooltipProvider>
          {navigation.map((item) => {
            const active = isActive(item.href);
            // 7. Use <Link> instead of <button> for navigation
            const navButton = (
              <Link
                key={item.name}
                href={item.href}
                onClick={onNavigate} // This closes the mobile sheet
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                  active
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                } ${isSidebarCollapsed && !mobile ? "justify-center" : ""}`}
                aria-current={active ? "page" : undefined}
              >
                <span className="flex-shrink-0" aria-hidden="true">
                  {item.icon}
                </span>
                {(!isSidebarCollapsed || mobile) && <span>{t(item.name)}</span>}
              </Link>
            );

            if (isSidebarCollapsed && !mobile) {
              return (
                <Tooltip key={item.name}>
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
}