import React from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export type StatusVariant = 'verified' | 'pending' | 'neutral' | 'failed';

interface StatusBadgeProps {
  variant?: StatusVariant;
  label: string;
  className?: string;
  icon?: React.ReactNode;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  variant = 'neutral',
  label,
  className,
  icon,
}) => {
  const getVariantStyles = (): string => {
    switch (variant) {
      case 'verified':
        return 'bg-emerald-50 text-emerald-900 border-emerald-300 dark:bg-emerald-950/50 dark:text-emerald-200 dark:border-emerald-800';
      case 'pending':
        return 'bg-amber-50 text-amber-900 border-amber-300 dark:bg-amber-950/50 dark:text-amber-200 dark:border-amber-800';
      case 'failed':
        return 'bg-red-50 text-red-900 border-red-300 dark:bg-red-950/50 dark:text-red-200 dark:border-red-800';
      case 'neutral':
      default:
        return 'bg-muted/60 text-muted-foreground border-border';
    }
  };

  return (
    <Badge
      variant="outline"
      className={cn(
        'inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-medium rounded-full border',
        getVariantStyles(),
        className
      )}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{label}</span>
    </Badge>
  );
};
