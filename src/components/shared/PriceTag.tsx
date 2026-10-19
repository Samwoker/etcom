import React from 'react';
import { formatETB } from '@/lib/format';
import { cn } from '@/lib/utils';

interface PriceTagProps {
  amount: number;
  laborAmount?: number;
  materialsAmount?: number;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const PriceTag: React.FC<PriceTagProps> = ({
  amount,
  laborAmount,
  materialsAmount,
  label,
  size = 'md',
  className,
}) => {
  const getSizeStyles = (): string => {
    switch (size) {
      case 'sm':
        return 'text-sm font-semibold';
      case 'lg':
        return 'text-xl font-bold';
      case 'md':
      default:
        return 'text-base font-semibold';
    }
  };

  return (
    <div className={cn('flex flex-col', className)}>
      {label && <span className="text-xs text-muted-foreground">{label}</span>}
      <span className={cn('text-foreground font-semibold', getSizeStyles())}>
        {formatETB(amount)}
      </span>
      {(laborAmount !== undefined || materialsAmount !== undefined) && (
        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
          {laborAmount !== undefined && (
            <span>Labor: {formatETB(laborAmount)}</span>
          )}
          {materialsAmount !== undefined && (
            <span>• Materials: {formatETB(materialsAmount)}</span>
          )}
        </div>
      )}
    </div>
  );
};
