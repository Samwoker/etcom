import { useState, useEffect, useCallback } from 'react';
import { useDemoStore } from '@/store/demoStore';
import { getJobById } from '@/services/jobService';
import { getQuoteByJobId, submitQuoteAction, submitRevisedQuote } from '@/services/quoteService';
import type { Job, Quote } from '@/types';

export function useQuote(jobId: string | undefined) {
  const { jobs } = useDemoStore();
  const [job, setJob] = useState<Job | null>(null);
  const [quote, setQuote] = useState<Quote | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadQuoteData = useCallback(async () => {
    if (!jobId) {
      setError('Job ID is missing');
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const jobData = await getJobById(jobId);
      if (!jobData) {
        setError('Job not found');
      } else {
        setJob(jobData);
        const quoteData = await getQuoteByJobId(jobId);
        setQuote(quoteData);
      }
    } catch {
      setError('Failed to load quote');
    } finally {
      setIsLoading(false);
    }
  }, [jobId]);

  useEffect(() => {
    loadQuoteData();
  }, [loadQuoteData, jobs]);

  // Accept quote
  const acceptQuote = useCallback(async () => {
    if (!jobId) return;
    setIsSubmitting(true);
    try {
      await submitQuoteAction(jobId, 'accepted');
      await loadQuoteData();
    } finally {
      setIsSubmitting(false);
    }
  }, [jobId, loadQuoteData]);

  // Negotiate quote
  const negotiateQuote = useCallback(
    async (counterAmountETB: number, counterMessage?: string) => {
      if (!jobId) return;
      setIsSubmitting(true);
      try {
        await submitQuoteAction(jobId, 'negotiating', counterAmountETB, counterMessage);
        await loadQuoteData();

        // Scripted response after 2 seconds: professional re-quotes or accepts
        setTimeout(async () => {
          await submitRevisedQuote(
            jobId,
            counterAmountETB,
            'Agreed to revised amount. Updated quote ready for review.'
          );
          await loadQuoteData();
        }, 2000);
      } finally {
        setIsSubmitting(false);
      }
    },
    [jobId, loadQuoteData]
  );

  // Decline quote
  const declineQuote = useCallback(async () => {
    if (!jobId) return;
    setIsSubmitting(true);
    try {
      await submitQuoteAction(jobId, 'declined');
      await loadQuoteData();
    } finally {
      setIsSubmitting(false);
    }
  }, [jobId, loadQuoteData]);

  return {
    data: {
      job,
      quote,
      history: quote?.history || [],
    },
    isLoading,
    isSubmitting,
    error,
    actions: {
      acceptQuote,
      negotiateQuote,
      declineQuote,
      refetch: loadQuoteData,
    },
  };
}
