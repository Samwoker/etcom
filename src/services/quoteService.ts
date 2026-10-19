import type { Quote, QuoteStatus } from '@/types';
import { useDemoStore } from '@/store/demoStore';

export async function getQuoteByJobId(jobId: string): Promise<Quote | null> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const job = useDemoStore.getState().jobs.find((j) => j.id === jobId);
  return job?.activeQuote || null;
}

export async function submitQuoteAction(
  jobId: string,
  status: QuoteStatus,
  counterAmount?: number,
  counterMessage?: string
): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 200));
  useDemoStore.getState().updateQuoteStatus(jobId, status, counterAmount, counterMessage);
}

export async function submitRevisedQuote(
  jobId: string,
  totalAmountETB: number,
  message?: string
): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 200));
  useDemoStore.getState().reviseQuote(jobId, totalAmountETB, message);
}
