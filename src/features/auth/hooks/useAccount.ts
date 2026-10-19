import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDemoStore } from '@/store/demoStore';
import { ROUTES } from '@/app/routes';

export function useAccount() {
  const navigate = useNavigate();
  const { customers, currentUserId, jobs, disputes, setRole } = useDemoStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 200);
    return () => clearTimeout(timer);
  }, []);

  const customer = useMemo(() => {
    return customers.find((c) => c.id === currentUserId) || customers[0];
  }, [customers, currentUserId]);

  const metrics = useMemo(() => {
    const custJobs = jobs.filter((j) => j.customerId === currentUserId || j.customerId === 'c1');
    const completedCount = custJobs.filter((j) => j.completionStatus === 'completed').length;
    const cancelledCount = custJobs.filter((j) => j.quoteStatus === 'declined').length;
    const dispCount = disputes.filter((d) => d.customerId === currentUserId || d.customerId === 'c1').length;

    return {
      totalJobs: completedCount,
      cancellationsCount: cancelledCount,
      disputesCount: dispCount,
    };
  }, [jobs, disputes, currentUserId]);

  const logout = () => {
    setRole('customer');
    navigate(ROUTES.AUTH_WELCOME);
  };

  return {
    customer,
    metrics,
    logout,
    isLoading,
  };
}
