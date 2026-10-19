import { useState, useEffect, useCallback } from 'react';
import { useDemoStore } from '@/store/demoStore';
import { getJobById } from '@/services/jobService';
import { getProfessionalById } from '@/services/professionalService';
import type { Job, Professional } from '@/types';

export type PaymentStep = 'input' | 'prompt' | 'result';

export function usePayment(jobId: string | undefined) {
  const { currentUserId, customers, processPayment, jobs } = useDemoStore();
  const [job, setJob] = useState<Job | null>(null);
  const [pro, setPro] = useState<Professional | null>(null);
  const [step, setStep] = useState<PaymentStep>('input');
  const [phone, setPhone] = useState('+251 71 123 4567');
  const [paymentResult, setPaymentResult] = useState<{
    success: boolean;
    transactionCode?: string;
    error?: string;
  } | null>(null);
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
        const proData = await getProfessionalById(jobData.proId);
        setPro(proData);
        const customer = customers.find((c) => c.id === currentUserId);
        if (customer?.phone) {
          setPhone(customer.phone);
        }
      }
    } catch {
      setError('Failed to load payment');
    } finally {
      setIsLoading(false);
    }
  }, [jobId, currentUserId, customers]);

  useEffect(() => {
    loadData();
  }, [loadData, jobs]);

  const labor = job?.actualLaborETB || job?.activeQuote?.laborAmountETB || 1000;
  const materials = job?.actualMaterialsETB || job?.activeQuote?.materialsAmountETB || 0;
  const amountDueETB = labor + materials;

  const handleSubmitPayment = useCallback(
    async (payPhone: string) => {
      if (!jobId) return;
      setPhone(payPhone);
      setStep('prompt');

      const result = await processPayment(jobId, payPhone);
      setPaymentResult(result);
      setStep('result');
    },
    [jobId, processPayment]
  );

  const handleRetry = useCallback(() => {
    setPaymentResult(null);
    setStep('input');
  }, []);

  return {
    data: {
      job,
      pro,
      amountDueETB,
      laborETB: labor,
      materialsETB: materials,
      step,
      phone,
      paymentResult,
      receipt: job?.receipt,
    },
    isLoading,
    error,
    actions: {
      setPhone,
      submitPayment: handleSubmitPayment,
      retry: handleRetry,
      refetch: loadData,
    },
  };
}
