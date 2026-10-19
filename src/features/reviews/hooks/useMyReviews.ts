import { useState, useEffect, useMemo } from 'react';
import { useDemoStore } from '@/store/demoStore';
import type { Professional } from '@/types';

export type ReviewFilter = 'all' | '5' | '4' | '3_and_below';

export interface StarDistributionItem {
  star: number;
  count: number;
  percentage: number;
}

export function useMyReviews() {
  const { currentUserId, professionals, reviews } = useDemoStore();
  const [filter, setFilter] = useState<ReviewFilter>('all');
  const [isLoading, setIsLoading] = useState(true);

  const pro: Professional | undefined = useMemo(() => {
    return professionals.find((p) => p.id === currentUserId) || professionals[0];
  }, [professionals, currentUserId]);

  const proReviews = useMemo(() => {
    if (!pro) return [];
    return reviews.filter((r) => r.proId === pro.id);
  }, [reviews, pro]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 350);
    return () => clearTimeout(timer);
  }, []);

  const totalCount = proReviews.length;

  const averageRating = useMemo(() => {
    if (totalCount === 0) return pro?.rating || 0;
    const sum = proReviews.reduce((acc, r) => acc + r.rating, 0);
    return Number((sum / totalCount).toFixed(1));
  }, [proReviews, totalCount, pro]);

  const distribution = useMemo<StarDistributionItem[]>(() => {
    const counts: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    proReviews.forEach((r) => {
      const rounded = Math.min(5, Math.max(1, Math.round(r.rating)));
      counts[rounded] = (counts[rounded] || 0) + 1;
    });

    return [5, 4, 3, 2, 1].map((star) => ({
      star,
      count: counts[star],
      percentage: totalCount > 0 ? Math.round((counts[star] / totalCount) * 100) : 0,
    }));
  }, [proReviews, totalCount]);

  const filteredReviews = useMemo(() => {
    if (filter === 'all') return proReviews;
    if (filter === '5') return proReviews.filter((r) => Math.round(r.rating) === 5);
    if (filter === '4') return proReviews.filter((r) => Math.round(r.rating) === 4);
    if (filter === '3_and_below') return proReviews.filter((r) => Math.round(r.rating) <= 3);
    return proReviews;
  }, [proReviews, filter]);

  return {
    pro,
    isLoading,
    totalCount,
    averageRating,
    distribution,
    filteredReviews,
    filter,
    setFilter,
  };
}
