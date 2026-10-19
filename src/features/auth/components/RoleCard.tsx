import React from 'react';
import { ChevronRight, Check } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import type { Role } from '@/types';

interface RoleCardProps {
  role: Role;
  title: string;
  description: string;
  perks?: string[];
  icon: React.ComponentType<{ className?: string }>;
  onSelect: (role: Role) => void;
}

export const RoleCard: React.FC<RoleCardProps> = ({
  role,
  title,
  description,
  perks,
  icon: Icon,
  onSelect,
}) => {
  return (
    <Card
      role="button"
      tabIndex={0}
      onClick={() => onSelect(role)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(role);
        }
      }}
      className="group relative cursor-pointer overflow-hidden rounded-2xl border border-border bg-card p-0 transition-all duration-200 hover:border-primary hover:shadow-md active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      aria-label={`Select role: ${title}`}
    >
      <CardContent className="flex flex-col gap-2.5 p-4 sm:p-5">
        <div className="flex items-center gap-3.5">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary transition-all duration-200 group-hover:bg-primary group-hover:text-primary-foreground">
            <Icon className="h-5 w-5" />
          </div>

          <div className="flex-1 min-w-0">
            <h2 className="text-sm sm:text-base font-bold text-foreground transition-colors group-hover:text-primary">
              {title}
            </h2>
            <p className="text-xs text-muted-foreground line-clamp-1">
              {description}
            </p>
          </div>

          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted/60 text-muted-foreground transition-all duration-200 group-hover:bg-primary group-hover:text-primary-foreground group-hover:translate-x-0.5">
            <ChevronRight className="h-4 w-4" />
          </div>
        </div>

        {perks && perks.length > 0 && (
          <div className="flex flex-col gap-1 pt-1 border-t border-border/40">
            {perks.map((perk, idx) => (
              <div key={idx} className="flex items-center gap-1.5 text-[11px] sm:text-xs text-muted-foreground">
                <Check className="h-3 w-3 text-primary shrink-0" />
                <span className="truncate">{perk}</span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
