import React from 'react';
import { Wrench, Zap, Tv, Paintbrush } from 'lucide-react';

interface ServiceItem {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
}

const SERVICES: ServiceItem[] = [
  { id: 'plumbing', name: 'Plumbing', icon: Wrench },
  { id: 'electrical', name: 'Electrical', icon: Zap },
  { id: 'tv_repair', name: 'TV Repair', icon: Tv },
  { id: 'painting', name: 'Painting', icon: Paintbrush },
];

export const ServiceStrip: React.FC = () => {
  return (
    <div className="flex w-full items-center justify-between gap-2 sm:gap-3">
      {SERVICES.map((service) => {
        const Icon = service.icon;
        return (
          <div
            key={service.id}
            className="group flex flex-1 flex-col items-center justify-center gap-1.5 rounded-xl border border-border/80 bg-card/60 backdrop-blur-xs py-2 sm:py-2.5 px-1 transition-all duration-200 hover:border-primary/60 hover:bg-card hover:shadow-2xs"
          >
            <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg bg-secondary text-primary transition-all duration-200 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground">
              <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </div>
            <span className="text-[11px] font-medium text-foreground group-hover:text-primary transition-colors">
              {service.name}
            </span>
          </div>
        );
      })}
    </div>
  );
};
