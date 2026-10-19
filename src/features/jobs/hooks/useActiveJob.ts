import { useState, useEffect } from 'react';
import type { Job } from '@/types';
import { useDemoStore } from '@/store/demoStore';
import { getActiveJobForCustomer } from '@/services/jobService';

export function useActiveJob() {
  const currentUserId = useDemoStore((state) => state.currentUserId);
  const jobs = useDemoStore((state) => state.jobs);
  const [activeJob, setActiveJob] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    getActiveJobForCustomer(currentUserId).then((job) => {
      if (isMounted) {
        setActiveJob(job);
        setIsLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [currentUserId, jobs]);

  return { activeJob, isLoading };
}
