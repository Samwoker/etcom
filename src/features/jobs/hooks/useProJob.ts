import { useState, useEffect, useCallback } from 'react';
import { useDemoStore } from '@/store/demoStore';
import { getJobById } from '@/services/jobService';
import type { Job, Customer } from '@/types';

export function useProJob(jobId: string | undefined) {
  const { jobs, customers, startProJob, markProJobFinished } = useDemoStore();
  const [job, setJob] = useState<Job | null>(null);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [isLoading, setIsLoading] = useState(true);
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
        const cust = customers.find((c) => c.id === jobData.customerId);
        setCustomer(cust || null);
      }
    } catch {
      setError('Failed to load job details');
    } finally {
      setIsLoading(false);
    }
  }, [jobId, customers]);

  useEffect(() => {
    loadData();
  }, [loadData, jobs]);

  const handleStartWork = () => {
    if (jobId) startProJob(jobId);
  };

  const handleMarkFinished = () => {
    if (jobId) markProJobFinished(jobId);
  };

  return {
    job,
    customer,
    isLoading,
    error,
    actions: {
      startWork: handleStartWork,
      markFinished: handleMarkFinished,
    },
  };
}
