import React from 'react';
import { MessageSquare } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { EmptyState } from '@/components/shared/EmptyState';
import { RatingStars } from '@/components/shared/RatingStars';
import { formatRelativeTime } from '@/lib/format';
import type { Review } from '@/types';

interface ReviewListProps {
  reviews: Review[];
}

export const ReviewList: React.FC<ReviewListProps> = ({ reviews }) => {
  if (reviews.length === 0) {
    return (
      <EmptyState
        icon={MessageSquare}
        title="No reviews yet"
        description="Client reviews will appear here once verified jobs are completed on Etcom."
      />
    );
  }

  return (
    <div className="space-y-3">
      {reviews.map((review) => {
        const initials = review.customerName
          .split(' ')
          .map((n) => n[0])
          .join('')
          .slice(0, 2);

        return (
          <Card key={review.id} className="border-border shadow-sm">
            <CardContent className="p-4 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <Avatar className="h-8 w-8 border border-border">
                    <AvatarFallback className="bg-muted text-[11px] font-semibold text-foreground">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-xs font-semibold text-foreground">{review.customerName}</p>
                    <p className="text-[11px] text-muted-foreground">{formatRelativeTime(review.date)}</p>
                  </div>
                </div>
                <RatingStars rating={review.rating} showNumeric={false} />
              </div>
              <p className="text-xs text-foreground/90 leading-relaxed pt-0.5">
                "{review.comment}"
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
