import { ReactNode } from "react";
import { ArrowLeft, MoreVertical } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface BottomNavItem {
  name: string;
  icon: ReactNode;
  active?: boolean;
  badge?: number;
  onClick?: () => void;
}

interface MobileLayoutProps {
  children: ReactNode;
  headerTitle?: string;
  showBackButton?: boolean;
  onBackClick?: () => void;
  headerActions?: ReactNode;
  bottomNav?: BottomNavItem[];
  showBottomNav?: boolean;
  className?: string;
}

export function MobileLayout({
  children,
  headerTitle,
  showBackButton = false,
  onBackClick,
  headerActions,
  bottomNav,
  showBottomNav = true,
  className = "",
}: MobileLayoutProps) {
  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <header
        className="flex h-14 items-center justify-between border-b border-border bg-card px-4 flex-shrink-0"
        role="banner"
      >
        <div className="flex items-center gap-3">
          {showBackButton && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onBackClick}
              aria-label="Go back"
            >
              <ArrowLeft className="h-5 w-5" aria-hidden="true" />
            </Button>
          )}
          {headerTitle && <h1 className="text-lg">{headerTitle}</h1>}
        </div>

        {headerActions && <div className="flex items-center gap-2">{headerActions}</div>}
      </header>

      {/* Main Content */}
      <main
        className={`flex-1 overflow-auto ${className}`}
        role="main"
      >
        {children}
      </main>

      {/* Bottom Navigation */}
      {showBottomNav && bottomNav && bottomNav.length > 0 && (
        <nav
          className="flex h-16 items-center justify-around border-t border-border bg-card flex-shrink-0 safe-area-inset-bottom"
          role="navigation"
          aria-label="Bottom navigation"
        >
          {bottomNav.map((item, index) => (
            <button
              key={index}
              onClick={item.onClick}
              className={`flex flex-col items-center justify-center gap-1 px-3 py-2 min-w-[64px] transition-colors ${
                item.active
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              aria-current={item.active ? "page" : undefined}
            >
              <div className="relative">
                <span aria-hidden="true">{item.icon}</span>
                {item.badge && item.badge > 0 && (
                  <span
                    className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center rounded-full bg-destructive text-destructive-foreground text-xs"
                    aria-label={`${item.badge} new items`}
                  >
                    {item.badge > 9 ? "9+" : item.badge}
                  </span>
                )}
              </div>
              <span className="text-xs">{item.name}</span>
            </button>
          ))}
        </nav>
      )}
    </div>
  );
}
