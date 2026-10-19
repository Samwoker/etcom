import { useState, useEffect, useMemo } from 'react';
import { useDemoStore } from '@/store/demoStore';

export function useProRequests() {
  const { currentUserId, professionals, jobs, customers, declineJobRequest } = useDemoStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 200);
    return () => clearTimeout(timer);
  }, []);

  const pro = useMemo(() => {
    return professionals.find((p) => p.id === currentUserId) || professionals[0];
  }, [professionals, currentUserId]);

  const proJobs = useMemo(() => {
    return jobs.filter((j) => j.proId === pro.id || j.proId === 'p1');
  }, [jobs, pro.id]);

  const newRequests = useMemo(
    () => proJobs.filter((j) => j.quoteStatus === 'requested'),
    [proJobs]
  );

  const quotedRequests = useMemo(
    () =>
      proJobs.filter(
        (j) => j.quoteStatus === 'quoted' || j.quoteStatus === 'negotiating'
      ),
    [proJobs]
  );

  const activeRequests = useMemo(
    () =>
      proJobs.filter(
        (j) =>
          j.quoteStatus === 'accepted' &&
          j.completionStatus !== 'completed' &&
          j.completionStatus !== 'disputed'
      ),
    [proJobs]
  );

  const getCustomerFirstName = (customerId: string): string => {
    const cust = customers.find((c) => c.id === customerId);
    return cust ? cust.fullName.split(' ')[0] : 'Customer';
  };

  return {
    data: {
      newRequests,
      quotedRequests,
      activeRequests,
    },
    actions: {
      declineRequest: declineJobRequest,
      getCustomerFirstName,
    },
    isLoading,
  };
}
