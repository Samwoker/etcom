import { useState, useEffect, useCallback } from 'react';
import { useDemoStore } from '@/store/demoStore';
import { getJobById } from '@/services/jobService';
import { getProfessionalById } from '@/services/professionalService';
import type { Job, Professional } from '@/types';

export function useReviewJob(jobId: string | undefined) {
  const { jobs, completeAndReviewJob } = useDemoStore();
  const [job, setJob] = useState<Job | null>(null);
  const [pro, setPro] = useState<Professional | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [workAgreed, setWorkAgreed] = useState<'yes' | 'no' | null>(null);
  const [rating, setRating] = useState<number>(5);
  const [tags, setTags] = useState<string[]>(['Clean work', 'On time']);
  const [comment, setComment] = useState<string>('');
  const [photos, setPhotos] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showThankYouDialog, setShowThankYouDialog] = useState(false);

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

  const submitReview = async () => {
    if (!jobId || workAgreed !== 'yes') return false;
    setIsSubmitting(true);
    try {
      // Simulate network request
      await new Promise((resolve) => setTimeout(resolve, 400));
      completeAndReviewJob(jobId, {
        rating,
        comment,
        tags,
        photos,
      });
      setShowThankYouDialog(true);
      return true;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    data: {
      job,
      pro,
      workAgreed,
      rating,
      tags,
      comment,
      photos,
      showThankYouDialog,
    },
    isLoading,
    isSubmitting,
    error,
    actions: {
      setWorkAgreed,
      setRating,
      setTags,
      setComment,
      setPhotos,
      setShowThankYouDialog,
      submitReview,
    },
  };
}
