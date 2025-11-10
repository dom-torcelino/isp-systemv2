'use client';

import {
  Wrench,
  Calendar,
  Map,
  User,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function TechnicianBottomNav() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Jobs', href: '/jobs', icon: <Wrench className="h-5 w-5" /> },
    { name: 'Schedule', href: '/schedule', icon: <Calendar className="h-5 w-5" /> },
    { name: 'Map', href: '/map', icon: <Map className="h-5 w-5" /> },
    { name: 'Profile', href: '/profile', icon: <User className="h-5 w-5" /> },
  ];

  const isActive = (href: string) => {
    if (href === '/jobs') return pathname === '/jobs';
    return pathname.startsWith(href);
  };

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 flex h-16 items-center justify-around border-t border-border bg-card"
      role="navigation"
      aria-label="Technician navigation"
    >
      {navItems.map((item) => {
        const active = isActive(item.href);
        return (
          <Link
            key={item.name}
            href={item.href}
            className={`flex flex-col items-center justify-center gap-1 px-3 py-2 min-w-[64px] transition-colors ${
              active
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
            aria-current={active ? "page" : undefined}
          >
            <span aria-hidden="true">{item.icon}</span>
            <span className="text-xs">{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}