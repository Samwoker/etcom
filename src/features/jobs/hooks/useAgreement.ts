import { useState, useEffect, useCallback } from 'react';
import { useDemoStore } from '@/store/demoStore';
import { getJobById } from '@/services/jobService';
import { getProfessionalById } from '@/services/professionalService';
import type { Job, Professional } from '@/types';

export function useAgreement(jobId: string | undefined) {
  const { confirmAgreement: storeConfirmAgreement, dispatchJob, jobs } = useDemoStore();
  const [job, setJob] = useState<Job | null>(null);
  const [pro, setPro] = useState<Professional | null>(null);
  const [isAgreed, setIsAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
        const proData = await getProfessionalById(jobData.proId);
        setPro(proData);
      }
    } catch {
      setError('Failed to load agreement');
    } finally {
      setIsLoading(false);
    }
  }, [jobId]);

  useEffect(() => {
    loadData();
  }, [loadData, jobs]);

  const handleConfirmAgreement = useCallback(async () => {
    if (!jobId || !isAgreed) return;
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));
      storeConfirmAgreement(jobId);
      dispatchJob(jobId);
    } finally {
      setIsSubmitting(false);
    }
  }, [jobId, isAgreed, storeConfirmAgreement, dispatchJob]);

  return {
    data: {
      job,
      pro,
      isAgreed,
    },
    isLoading,
    isSubmitting,
    error,
    actions: {
      setIsAgreed,
      confirmAgreement: handleConfirmAgreement,
      refetch: loadData,
    },
  };
}
