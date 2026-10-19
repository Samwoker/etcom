import { useState, useEffect, useCallback } from 'react';
import { useDemoStore } from '@/store/demoStore';
import { getJobById } from '@/services/jobService';
import { getProfessionalById } from '@/services/professionalService';
import type { Job, Professional } from '@/types';

export function useDispute(jobId: string | undefined) {
  const { jobs, createDispute } = useDemoStore();
  const [job, setJob] = useState<Job | null>(null);
  const [pro, setPro] = useState<Professional | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [reason, setReason] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [photos, setPhotos] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRefNumber, setSubmittedRefNumber] = useState<string | null>(null);

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
      setError('Failed to load job details');
    } finally {
      setIsLoading(false);
    }
  }, [jobId]);

  useEffect(() => {
    loadData();
  }, [loadData, jobs]);

  const submitDispute = async () => {
    if (!jobId || !reason.trim()) return false;
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 400));
      const res = createDispute(jobId, reason, description, photos);
      setSubmittedRefNumber(res.referenceNumber);
      return true;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    data: {
      job,
      pro,
      reason,
      description,
      photos,
      submittedRefNumber,
    },
    isLoading,
    isSubmitting,
    error,
    actions: {
      setReason,
      setDescription,
      setPhotos,
      submitDispute,
    },
  };
}
