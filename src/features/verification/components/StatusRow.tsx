import React from 'react';
import { Button } from '@/components/ui/button';

interface StatusRowProps {
  title: string;
  subtitle: string;
  statusBadge: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
}

export const StatusRow: React.FC<StatusRowProps> = ({
  title,
  subtitle,
  statusBadge,
  actionLabel,
  onAction,
}) => {
  return (
    <div className="flex items-center justify-between gap-3 p-3.5 rounded-xl border border-border/80 bg-card">
      <div className="space-y-0.5 min-w-0">
        <h4 className="text-xs font-bold text-foreground truncate">{title}</h4>
        <p className="text-[11px] text-muted-foreground leading-snug">{subtitle}</p>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        {statusBadge}
        {actionLabel && onAction && (
          <Button
            variant="outline"
            size="sm"
            onClick={onAction}
            className="h-7 text-[11px] rounded-full px-2.5"
          >
            {actionLabel}
          </Button>
        )}
      </div>
    </div>
  );
};
