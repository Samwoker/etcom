import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Wrench, Zap, Tv, Paintbrush, Hammer, Sparkles, ArrowUpRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { ROUTES } from '@/app/routes';

interface ServiceCategory {
  id: string;
  name: string;
  category: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const CATEGORIES: ServiceCategory[] = [
  {
    id: 'plumbing',
    name: 'Plumbing',
    category: 'Plumbing',
    description: 'Pipes, leaks, tanks & drains',
    icon: Wrench,
  },
  {
    id: 'electrical',
    name: 'Electrical',
    category: 'Electrical',
    description: 'Breakers, wiring & power',
    icon: Zap,
  },
  {
    id: 'tv_appliance',
    name: 'TV & Appliance',
    category: 'TV Repair',
    description: 'Screens, motors & boards',
    icon: Tv,
  },
  {
    id: 'painting',
    name: 'Painting',
    category: 'Painting',
    description: 'Walls, coatings & finishes',
    icon: Paintbrush,
  },
  {
    id: 'carpentry',
    name: 'Carpentry',
    category: 'Carpenter',
    description: 'Doors, locks, cabinets & wood',
    icon: Hammer,
  },
  {
    id: 'other',
    name: 'All Trades',
    category: 'all',
    description: 'Locks, welding & custom tasks',
    icon: Sparkles,
  },
];

export const ServiceGrid: React.FC = () => {
  const navigate = useNavigate();

  const handleSelectService = (category: string) => {
    if (category === 'all') {
      navigate(ROUTES.CUSTOMER_RESULTS);
    } else {
      navigate(`${ROUTES.CUSTOMER_REQUEST_NEW}?category=${encodeURIComponent(category)}`);
    }
  };

  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-foreground">
          Services in Addis Ababa
        </h2>
        <span className="text-xs text-muted-foreground font-medium">Verified fixed quotes</span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          return (
            <Card
              key={cat.id}
              role="button"
              tabIndex={0}
              onClick={() => handleSelectService(cat.category)}
              className="group cursor-pointer rounded-2xl border border-border/80 bg-card p-0 transition-all hover:border-primary/50 hover:bg-muted/20 hover:shadow-xs active:scale-[0.98]"
            >
              <CardContent className="p-3.5 flex flex-col justify-between h-28 sm:h-32">
                <div className="flex items-start justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-primary transition-transform group-hover:scale-105">
                    <Icon className="h-5 w-5" />
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground/60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-muted-foreground truncate">
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
