import { useState, useEffect, useCallback } from 'react';
import { useDemoStore } from '@/store/demoStore';
import { getJobById } from '@/services/jobService';
import type { Job } from '@/types';

export function useQuoteBuilder(jobId: string | undefined) {
  const { jobs, sendProQuote } = useDemoStore();
  const [job, setJob] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [laborETB, setLaborETB] = useState<number>(1200);
  const [materialsETB, setMaterialsETB] = useState<number>(450);
  const [scope, setScope] = useState<string>('');
  const [scheduledDate, setScheduledDate] = useState<string>('2026-10-22');
  const [inspectionNeeded, setInspectionNeeded] = useState<boolean>(false);
  const [revisionReason, setRevisionReason] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadData = useCallback(async () => {
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
        if (jobData.activeQuote) {
          setLaborETB(jobData.activeQuote.laborAmountETB);
          setMaterialsETB(jobData.activeQuote.materialsAmountETB);
          setScope(jobData.activeQuote.scopeDescription);
        } else {
          setScope(`Labor and necessary materials for: ${jobData.title}`);
        }
        if (jobData.scheduledDate) {
          setScheduledDate(jobData.scheduledDate);
        }
      }
    } catch {
      setError('Failed to load job details');
    } finally {
      setIsLoading(false);
    }
  }, [jobId]);

  useEffect(() => {
    loadData();
  }, [loadData, jobs]);

  const isRevision = Boolean(job?.activeQuote || job?.quoteStatus === 'accepted');

  const isValid =
    laborETB > 0 &&
    materialsETB >= 0 &&
    scope.trim().length >= 5 &&
    (!isRevision || revisionReason.trim().length >= 3);

  const submitQuote = async () => {
    if (!jobId || !isValid) return false;
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 350));
      sendProQuote(jobId, {
        laborAmountETB: laborETB,
        materialsAmountETB: materialsETB,
        totalAmountETB: laborETB + materialsETB,
        scopeDescription: scope,
        scheduledDate,
        inspectionNeeded,
        revisionReason: isRevision ? revisionReason : undefined,
      });
      return true;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    job,
    isRevision,
    isValid,
    laborETB,
    materialsETB,
    scope,
    scheduledDate,
    inspectionNeeded,
    revisionReason,
    isSubmitting,
    isLoading,
    error,
    actions: {
      setLaborETB,
      setMaterialsETB,
      setScope,
      setScheduledDate,
      setInspectionNeeded,
      setRevisionReason,
      submitQuote,
    },
  };
}
