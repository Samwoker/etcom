import React from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RatingStarsProps {
  rating: number;
  maxStars?: number;
  reviewCount?: number;
  showNumeric?: boolean;
  size?: 'sm' | 'md';
  className?: string;
}

export const RatingStars: React.FC<RatingStarsProps> = ({
  rating,
  maxStars = 5,
  reviewCount,
  showNumeric = true,
  size = 'sm',
  className,
}) => {
  const iconSize = size === 'sm' ? 'h-3.5 w-3.5' : 'h-4 w-4';

  return (
    <div className={cn('inline-flex items-center gap-1', className)}>
      <div className="flex items-center gap-0.5">
        {Array.from({ length: maxStars }).map((_, index) => {
          const isFilled = index < Math.round(rating);
          return (
            <Star
              key={index}
              className={cn(
                iconSize,
                isFilled
                  ? 'fill-amber-400 text-amber-400'
                  : 'fill-muted text-muted-foreground/30'
              )}
            />
          );
        })}
      </div>
      {showNumeric && (
        <span className="text-xs font-semibold text-foreground ml-0.5">
          {rating.toFixed(1)}
        </span>
      )}
      {reviewCount !== undefined && (
        <span className="text-xs text-muted-foreground">({reviewCount})</span>
      )}
    </div>
  );
};
