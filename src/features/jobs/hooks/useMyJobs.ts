import { useState, useEffect, useMemo } from 'react';
import { useDemoStore } from '@/store/demoStore';
import type { Job, Professional } from '@/types';

export function useMyJobs() {
  const { jobs, professionals, currentUserId, role } = useDemoStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 250);
    return () => clearTimeout(timer);
  }, []);

  const userJobs = useMemo(() => {
    return jobs.filter((job) => {
      if (role === 'customer') {
        return job.customerId === currentUserId || job.customerId === 'c1';
      }
      if (role === 'professional') {
        return job.proId === currentUserId || job.proId === 'p1';
      }
      return true;
    });
  }, [jobs, currentUserId, role]);

  const activeJobs = useMemo(
    () =>
      userJobs.filter(
        (j) =>
          j.completionStatus !== 'completed' &&
          j.completionStatus !== 'disputed' &&
          j.quoteStatus !== 'declined'
      ),
    [userJobs]
  );

  const completedJobs = useMemo(
    () => userJobs.filter((j) => j.completionStatus === 'completed'),
    [userJobs]
  );

  const cancelledJobs = useMemo(
    () =>
      userJobs.filter(
        (j) =>
          j.completionStatus === 'disputed' || j.quoteStatus === 'declined'
      ),
    [userJobs]
  );

  const getProForJob = (job: Job): Professional | undefined => {
    return professionals.find((p) => p.id === job.proId);
  };

  return {
    data: {
      activeJobs,
      completedJobs,
      cancelledJobs,
      totalCount: userJobs.length,
    },
    getProForJob,
    isLoading,
  };
}
