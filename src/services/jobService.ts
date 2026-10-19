import type { Job } from '@/types';
import { useDemoStore } from '@/store/demoStore';

export async function getActiveJobForCustomer(customerId: string): Promise<Job | null> {
  await new Promise((resolve) => setTimeout(resolve, 350));
  const jobs = useDemoStore.getState().jobs;
  // Look for active job: in_progress, quoted, or accepted
  const activeJob = jobs.find(
    (j) =>
      j.customerId === customerId &&
      (j.completionStatus === 'in_progress' ||
        j.quoteStatus === 'quoted' ||
        j.quoteStatus === 'accepted')
  );
  return activeJob || null;
}

export async function getJobById(jobId: string): Promise<Job | null> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const jobs = useDemoStore.getState().jobs;
  return jobs.find((j) => j.id === jobId) || null;
}

