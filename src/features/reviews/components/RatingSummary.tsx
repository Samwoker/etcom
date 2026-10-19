import React from 'react';
import { Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { RatingStars } from '@/components/shared/RatingStars';
import type { StarDistributionItem } from '../hooks/useMyReviews';

interface RatingSummaryProps {
  averageRating: number;
  totalCount: number;
  distribution: StarDistributionItem[];
}

export const RatingSummary: React.FC<RatingSummaryProps> = ({
  averageRating,
  totalCount,
  distribution,
}) => {
  return (
    <Card className="border-border shadow-xs bg-card">
      <CardContent className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
          {/* Average Rating Block */}
          <div className="sm:col-span-5 flex flex-col items-center sm:items-start justify-center border-b sm:border-b-0 sm:border-r border-border pb-3 sm:pb-0 sm:pr-4">
            <span className="text-4xl font-extrabold tracking-tight text-foreground">
              {averageRating.toFixed(1)}
            </span>
            <div className="mt-1">
              <RatingStars rating={averageRating} size="md" showNumeric={false} />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Based on {totalCount} verified {totalCount === 1 ? 'review' : 'reviews'}
            </p>
          </div>

          {/* Bar Distribution 5 to 1 */}
          <div className="sm:col-span-7 space-y-1.5">
            {distribution.map(({ star, count, percentage }) => (
              <div key={star} className="flex items-center gap-2 text-xs">
                <span className="flex items-center gap-0.5 w-7 text-muted-foreground font-medium shrink-0">
                  <span>{star}</span>
                  <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                </span>
                <Progress value={percentage} className="h-2 flex-1 bg-muted" />
                <span className="w-8 text-right text-[11px] text-muted-foreground font-medium shrink-0">
                  {count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
