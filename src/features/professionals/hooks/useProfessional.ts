import { useState, useEffect, useCallback } from 'react';
import type { Professional, WorkHistoryItem, Review } from '@/types';
import { getProfessionalById, getWorkHistoryByProId } from '@/services/professionalService';
import { getReviewsByProId } from '@/services/reviewService';
import { useDemoStore } from '@/store/demoStore';

export function useProfessional(proId: string | undefined) {
  const [professional, setProfessional] = useState<Professional | null>(null);
  const [workHistory, setWorkHistory] = useState<WorkHistoryItem[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const createJob = useDemoStore((state) => state.createJob);

  const fetchProfileData = useCallback(async () => {
    if (!proId) {
      setError('Professional ID is required');
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const [proData, historyData, reviewsData] = await Promise.all([
        getProfessionalById(proId),
        getWorkHistoryByProId(proId),
        getReviewsByProId(proId),
      ]);

      if (!proData) {
        setError('Professional not found');
      } else {
        setProfessional(proData);
        setWorkHistory(historyData);
        setReviews(reviewsData);
      }
    } catch {
      setError('Failed to load professional profile');
    } finally {
      setIsLoading(false);
    }
  }, [proId]);

  useEffect(() => {
    fetchProfileData();
  }, [fetchProfileData]);

  const requestQuote = useCallback(async (): Promise<string> => {
    if (!proId) throw new Error('Missing professional ID');
    const newJobId = createJob({ proId });
    return newJobId;
  }, [proId, createJob]);

  return {
    data: {
      professional,
      workHistory,
      reviews,
    },
    isLoading,
    error,
    actions: {
      requestQuote,
      refetch: fetchProfileData,
    },
  };
}
