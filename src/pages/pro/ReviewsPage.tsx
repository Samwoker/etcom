import React from 'react';
import { Star, MessageSquare } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { PageHeader } from '@/components/shared/PageHeader';
import { EmptyState } from '@/components/shared/EmptyState';
import {
  RatingSummary,
  ReviewItem,
  useMyReviews,
  type ReviewFilter,
} from '@/features/reviews';

export const ReviewsPage: React.FC = () => {
  const {
    isLoading,
    totalCount,
    averageRating,
    distribution,
    filteredReviews,
    filter,
    setFilter,
  } = useMyReviews();

  if (isLoading) {
    return (
      <div className="flex flex-1 flex-col">
        <PageHeader title="Client Reviews" />
        <div className="w-full max-w-xl md:max-w-2xl mx-auto p-4 space-y-4">
          <Skeleton className="h-32 w-full rounded-2xl" />
          <Skeleton className="h-9 w-64 rounded-lg" />
          <Skeleton className="h-24 w-full rounded-xl" />
          <Skeleton className="h-24 w-full rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col pb-8">
      <PageHeader title="Client Reviews" />

      <div className="w-full max-w-xl md:max-w-2xl mx-auto px-4 py-3 space-y-4">
        {/* Rating Summary Bar */}
        <RatingSummary
          averageRating={averageRating}
          totalCount={totalCount}
          distribution={distribution}
        />

        {/* Filter Chips */}
        <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1">
          <ToggleGroup
            type="single"
            value={filter}
            onValueChange={(val) => {
              if (val) setFilter(val as ReviewFilter);
            }}
            size="sm"
            variant="outline"
            className="flex-wrap gap-1.5"
          >
            <ToggleGroupItem value="all" className="text-xs px-3 h-8">
              All ({totalCount})
            </ToggleGroupItem>
            <ToggleGroupItem value="5" className="text-xs px-3 h-8 gap-1">
              <span>5</span>
              <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
            </ToggleGroupItem>
            <ToggleGroupItem value="4" className="text-xs px-3 h-8 gap-1">
              <span>4</span>
              <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
            </ToggleGroupItem>
            <ToggleGroupItem value="3_and_below" className="text-xs px-3 h-8">
              3 & below
            </ToggleGroupItem>
          </ToggleGroup>
        </div>

        {/* Review Items List */}
        {filteredReviews.length === 0 ? (
          <EmptyState
            icon={MessageSquare}
            title="No reviews match this filter"
            description="Client reviews left after confirmed M-PESA payments will show up here."
          />
        ) : (
          <div className="space-y-3">
            {filteredReviews.map((review) => (
              <ReviewItem key={review.id} review={review} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
