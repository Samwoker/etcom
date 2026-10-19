import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface StickyCtaProps {
  primaryLabel: string;
  onPrimaryClick: () => void;
  primaryDisabled?: boolean;
  primaryLoading?: boolean;
  secondaryLabel?: string;
  onSecondaryClick?: () => void;
  className?: string;
  children?: React.ReactNode;
}

export const StickyCta: React.FC<StickyCtaProps> = ({
  primaryLabel,
  onPrimaryClick,
  primaryDisabled = false,
  primaryLoading = false,
  secondaryLabel,
  onSecondaryClick,
  className,
  children,
}) => {
  return (
    <div
      className={cn(
        'fixed bottom-0 left-0 right-0 z-20 mx-auto w-full max-w-xl md:max-w-2xl lg:max-w-3xl border-t border-border bg-background/95 p-4 backdrop-blur pb-safe',
        className
      )}
    >
      {children}
      <div className="flex items-center gap-3">
        {secondaryLabel && onSecondaryClick && (
          <Button
            type="button"
            variant="outline"
            className="h-12 flex-1 rounded-full text-sm font-semibold"
            onClick={onSecondaryClick}
          >
            {secondaryLabel}
          </Button>
        )}
        <Button
          type="button"
          className="h-12 flex-1 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 shadow-sm"
          disabled={primaryDisabled || primaryLoading}
          onClick={onPrimaryClick}
        >
          {primaryLoading ? 'Processing...' : primaryLabel}
        </Button>
      </div>
    </div>
  );
};
