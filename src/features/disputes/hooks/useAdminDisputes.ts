import { useState, useEffect, useMemo } from 'react';
import { toast } from 'sonner';
import { useDemoStore } from '@/store/demoStore';

export type DisputeTab = 'open' | 'resolved';

export function useAdminDisputes() {
  const { disputes, jobs, professionals, customers, messages, resolveDispute } = useDemoStore();
  const [activeTab, setActiveTab] = useState<DisputeTab>('open');
  const [selectedDisputeId, setSelectedDisputeId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const openDisputes = useMemo(() => {
    return disputes.filter((d) => d.status === 'opened' || d.status === 'under_review');
  }, [disputes]);

  const resolvedDisputes = useMemo(() => {
    return disputes.filter(
      (d) =>
        d.status === 'resolved_refund' ||
        d.status === 'resolved_payout' ||
        d.status === 'closed'
    );
  }, [disputes]);

  const selectedDispute = useMemo(() => {
    if (!selectedDisputeId) return null;
    return disputes.find((d) => d.id === selectedDisputeId) || null;
  }, [disputes, selectedDisputeId]);

  const disputeContext = useMemo(() => {
    if (!selectedDispute) return null;
    const job = jobs.find((j) => j.id === selectedDispute.jobId);
    const pro = professionals.find((p) => p.id === selectedDispute.proId);
    const customer = customers.find((c) => c.id === selectedDispute.customerId);
    const jobMessages = messages.filter((m) => m.jobId === selectedDispute.jobId);

    return {
      job,
      pro,
      customer,
      messages: jobMessages,
    };
  }, [selectedDispute, jobs, professionals, customers, messages]);

  const handleResolveAction = (
    disputeId: string,
    action: 'request_info' | 'resolve_customer' | 'resolve_pro',
    note: string
  ) => {
    if (!note.trim()) {
      toast.error('A resolution note is required.');
      return false;
    }

    resolveDispute(disputeId, action, note.trim());

    if (action === 'request_info') {
      toast.info('Information request posted to both parties.');
    } else if (action === 'resolve_customer') {
      toast.success('Dispute resolved in favour of customer.');
    } else {
      toast.success('Dispute resolved in favour of professional.');
    }

    setSelectedDisputeId(null);
    return true;
  };

  return {
    activeTab,
    setActiveTab,
    openDisputes,
    resolvedDisputes,
    selectedDispute,
    setSelectedDisputeId,
    disputeContext,
    handleResolveAction,
    isLoading,
    openCount: openDisputes.length,
    resolvedCount: resolvedDisputes.length,
  };
}
