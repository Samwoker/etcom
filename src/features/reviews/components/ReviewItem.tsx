import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RatingStars } from '@/components/shared/RatingStars';
import { formatRelativeTime } from '@/lib/format';
import type { Review } from '@/types';

interface ReviewItemProps {
  review: Review;
}

export const ReviewItem: React.FC<ReviewItemProps> = ({ review }) => {
  return (
    <Card className="border-border shadow-xs hover:border-primary/30 transition-colors">
      <CardContent className="p-4 space-y-2.5">
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-foreground">
                {review.customerName}
              </span>
              <Badge className="bg-primary/10 text-primary border-primary/20 text-[10px] font-medium gap-1 px-1.5 py-0">
                <ShieldCheck className="h-3 w-3" />
                Verified by payment
              </Badge>
            </div>
            <p className="text-[11px] text-muted-foreground">
              {formatRelativeTime(review.date)}
            </p>
          </div>
          <RatingStars rating={review.rating} showNumeric={false} />
        </div>

        <p className="text-xs text-foreground/90 leading-relaxed">
          "{review.comment}"
        </p>

        {review.tags && review.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {review.tags.map((tag, idx) => (
              <Badge
                key={idx}
                variant="secondary"
                className="text-[10px] px-2 py-0 bg-muted/80 text-muted-foreground border-transparent font-normal"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {review.photos && review.photos.length > 0 && (
          <div className="flex items-center gap-2 pt-1 overflow-x-auto">
            {review.photos.map((photo, idx) => (
              <img
                key={idx}
                src={photo}
                alt="Review attachment"
                className="h-16 w-16 object-cover rounded-lg border border-border shrink-0"
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
