import { useState, useEffect, useMemo } from 'react';
import { useDemoStore } from '@/store/demoStore';
import type { Job, Professional, Customer } from '@/types';

export function useProDashboard() {
  const { currentUserId, professionals, jobs, customers } = useDemoStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 200);
    return () => clearTimeout(timer);
  }, []);

  const pro: Professional = useMemo(() => {
    return professionals.find((p) => p.id === currentUserId) || professionals[0];
  }, [professionals, currentUserId]);

  const proJobs = useMemo(() => {
    return jobs.filter((j) => j.proId === pro.id || j.proId === 'p1');
  }, [jobs, pro.id]);

  const newRequests = useMemo(() => {
    return proJobs.filter((j) => j.quoteStatus === 'requested');
  }, [proJobs]);

  const nextJob: Job | null = useMemo(() => {
    return (
      proJobs.find(
        (j) => j.completionStatus === 'in_progress' || (j.quoteStatus === 'accepted' && j.completionStatus !== 'completed')
      ) || null
    );
  }, [proJobs]);

  const monthlyEarningsETB = useMemo(() => {
    const completed = proJobs.filter((j) => j.completionStatus === 'completed');
    const earnings = completed.reduce((sum, j) => sum + (j.activeQuote?.totalAmountETB || 0), 0);
    return earnings > 0 ? earnings : 18450;
  }, [proJobs]);

  const getCustomer = (customerId: string): Customer | undefined => {
    return customers.find((c) => c.id === customerId);
  };

  return {
    pro,
    newRequests,
    nextJob,
    monthlyEarningsETB,
    getCustomer,
    isLoading,
  };
}
