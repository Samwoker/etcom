import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Wrench, Zap, Tv, Paintbrush, ArrowUpRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { ROUTES } from '@/app/routes';

interface ServiceCategory {
  id: string;
  name: string;
  category: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  cardBg: string;
  iconBg: string;
  titleColor: string;
}

const CATEGORIES: ServiceCategory[] = [
  {
    id: 'plumbing',
    name: 'Plumbing',
    category: 'Plumbing',
    description: 'Pipes, leaks, tanks & drains',
    icon: Wrench,
    cardBg: 'bg-emerald-50/70 hover:bg-emerald-50/90 dark:bg-emerald-950/20 border-emerald-200/60 dark:border-emerald-800/30',
    iconBg: 'bg-primary text-primary-foreground',
    titleColor: 'text-emerald-950 dark:text-emerald-100',
  },
  {
    id: 'electrical',
    name: 'Electrical',
    category: 'Electrical',
    description: 'Breakers, wiring & power',
    icon: Zap,
    cardBg: 'bg-sky-50/70 hover:bg-sky-50/90 dark:bg-sky-950/20 border-sky-200/60 dark:border-sky-800/30',
    iconBg: 'bg-blue-600 text-white',
    titleColor: 'text-sky-950 dark:text-sky-100',
  },
  {
    id: 'tv_appliance',
    name: 'TV & Appliance',
    category: 'TV Repair',
    description: 'Screens, motors & boards',
    icon: Tv,
    cardBg: 'bg-purple-50/70 hover:bg-purple-50/90 dark:bg-purple-950/20 border-purple-200/60 dark:border-purple-800/30',
    iconBg: 'bg-purple-600 text-white',
    titleColor: 'text-purple-950 dark:text-purple-100',
  },
  {
    id: 'painting',
    name: 'Painting',
    category: 'Painting',
    description: 'Walls, coatings & finishes',
    icon: Paintbrush,
    cardBg: 'bg-amber-50/70 hover:bg-amber-50/90 dark:bg-amber-950/20 border-amber-200/60 dark:border-amber-800/30',
    iconBg: 'bg-amber-500 text-white',
    titleColor: 'text-amber-950 dark:text-amber-100',
  },
];

export const ServiceGrid: React.FC = () => {
  const navigate = useNavigate();

  const handleSelectService = (category: string) => {
    navigate(`${ROUTES.CUSTOMER_REQUEST_NEW}?category=${encodeURIComponent(category)}`);
  };

  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-foreground">
          Services in Addis Ababa
        </h2>
        <span className="text-xs text-muted-foreground font-medium">Verified fixed quotes</span>
      </div>
      <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          return (
            <Card
              key={cat.id}
              role="button"
              tabIndex={0}
              onClick={() => handleSelectService(cat.category)}
              className={`group cursor-pointer rounded-2xl border p-0 transition-all hover:shadow-sm active:scale-[0.98] ${cat.cardBg}`}
            >
              <CardContent className="p-3.5 flex flex-col justify-between h-28 sm:h-32">
                <div className="flex items-start justify-between">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-full shadow-xs transition-transform group-hover:scale-105 ${cat.iconBg}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground/60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground" />
                </div>
                <div>
                  <h3 className={`text-sm font-bold transition-colors ${cat.titleColor}`}>
                    {cat.name}
                  </h3>
                  <p className="text-[11px] text-muted-foreground truncate">
                    {cat.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
