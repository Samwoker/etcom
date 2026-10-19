import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '@/components/ui/card';

interface ListSkeletonProps {
  count?: number;
  className?: string;
}

export const ListSkeleton: React.FC<ListSkeletonProps> = ({
  count = 4,
  className,
}) => {
  return (
    <div className={`space-y-3 ${className || ''}`} aria-busy="true" aria-label="Loading list">
      {Array.from({ length: count }).map((_, index) => (
        <Card key={index} className="flex items-center gap-4 p-4 rounded-xl border border-border">
          <Skeleton className="h-12 w-12 rounded-full shrink-0" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-3/4 rounded" />
            <Skeleton className="h-3 w-1/2 rounded" />
          </div>
          <Skeleton className="h-6 w-16 rounded-full shrink-0" />
        </Card>
      ))}
    </div>
  );
};
