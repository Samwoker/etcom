import React from 'react';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { PageHeader } from '@/components/shared/PageHeader';
import { EmptyState } from '@/components/shared/EmptyState';
import { LanguageSelector } from '@/components/shared/LanguageSelector';
import {
  QueueItem,
  QueueFilters,
  useReviewQueue,
} from '@/features/verification';

export const ReviewQueuePage: React.FC = () => {
  const { filteredItems, count, filter, setFilter, isLoading } = useReviewQueue();

  if (isLoading) {
    return (
      <div className="flex flex-1 flex-col">
        <PageHeader title="Verification Queue" />
        <div className="w-full max-w-xl md:max-w-2xl mx-auto p-4 space-y-4">
          <Skeleton className="h-10 w-full rounded-lg" />
          <Skeleton className="h-32 w-full rounded-xl" />
          <Skeleton className="h-32 w-full rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col pb-8">
      <div className="border-b border-border bg-card">
        <div className="w-full max-w-xl md:max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-base font-bold text-foreground">Verification Queue</h1>
            <Badge className="bg-primary/10 text-primary border-primary/20 text-xs px-2 py-0.5">
              {count} pending
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <LanguageSelector mobile />
            <ShieldCheck className="h-4 w-4 text-primary" />
          </div>
        </div>
      </div>

      <div className="w-full max-w-xl md:max-w-2xl mx-auto px-4 py-3 space-y-4">
        {/* Filters */}
        <QueueFilters
          filter={filter}
          onFilterChange={setFilter}
          totalCount={count}
        />

        {/* Queue Items */}
        {filteredItems.length === 0 ? (
          <EmptyState
            icon={CheckCircle2}
            title="All caught up!"
            description="There are currently no verification submissions requiring admin review in this category."
          />
        ) : (
          <div className="space-y-3">
            {filteredItems.map((pro) => (
              <QueueItem key={pro.id} pro={pro} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
