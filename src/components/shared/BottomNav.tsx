import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Home,
  Briefcase,
  Bell,
  User,
  LayoutDashboard,
  Inbox,
  FolderOpen,
  ShieldCheck,
  CheckSquare,
  AlertTriangle,
} from 'lucide-react';
import { useDemoStore } from '@/store/demoStore';
import { ROUTES } from '@/app/routes';

interface NavItem {
  label: string;
  to: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const BottomNav: React.FC = () => {
  const role = useDemoStore((state) => state.role);

  const getNavItems = (): NavItem[] => {
    switch (role) {
      case 'professional':
        return [
          { label: 'Dashboard', to: ROUTES.PRO_DASHBOARD, icon: LayoutDashboard },
          { label: 'Requests', to: ROUTES.PRO_REQUESTS, icon: Inbox },
          { label: 'Portfolio', to: ROUTES.PRO_PORTFOLIO, icon: FolderOpen },
          { label: 'Verification', to: ROUTES.PRO_VERIFICATION, icon: ShieldCheck },
        ];
      case 'admin':
        return [
          { label: 'Queue', to: ROUTES.ADMIN_QUEUE, icon: CheckSquare },
          { label: 'Disputes', to: ROUTES.ADMIN_DISPUTES, icon: AlertTriangle },
        ];
      case 'customer':
      default:
        return [
          { label: 'Home', to: ROUTES.CUSTOMER_HOME, icon: Home },
          { label: 'Jobs', to: ROUTES.CUSTOMER_JOBS, icon: Briefcase },
          { label: 'Alerts', to: ROUTES.CUSTOMER_NOTIFICATIONS, icon: Bell },
          { label: 'Account', to: ROUTES.CUSTOMER_ACCOUNT, icon: User },
        ];
    }
  };

  const items = getNavItems();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-30 mx-auto flex h-16 md:h-18 w-full max-w-xl md:max-w-2xl lg:max-w-3xl items-center justify-around border-t border-border bg-background/95 px-4 backdrop-blur transition-all"
      aria-label="Bottom Navigation"
    >
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex min-w-[68px] md:min-w-[84px] flex-col items-center justify-center gap-1 py-1 text-xs md:text-sm font-medium transition-colors ${
                isActive
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`
            }
          >
            <Icon className="h-5 w-5 md:h-6 md:w-6" />
            <span>{item.label}</span>
          </NavLink>
        );
      })}
    </nav>
  );
};
