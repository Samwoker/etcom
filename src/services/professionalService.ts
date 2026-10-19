import type { Professional, WorkHistoryItem } from '@/types';
import { useDemoStore } from '@/store/demoStore';
import { INITIAL_WORK_HISTORY } from '@/data/initialData';

export async function getTopProfessionals(limit: number = 4): Promise<Professional[]> {
  await new Promise((resolve) => setTimeout(resolve, 400));
  const pros = useDemoStore.getState().professionals;
  // Sort by rating desc, confirmed jobs desc
  return [...pros]
    .sort((a, b) => b.rating - a.rating || b.confirmedJobsCount - a.confirmedJobsCount)
    .slice(0, limit);
}

export async function getProfessionalById(id: string): Promise<Professional | null> {
  await new Promise((resolve) => setTimeout(resolve, 350));
  const pros = useDemoStore.getState().professionals;
  return pros.find((p) => p.id === id) || null;
}

export async function getWorkHistoryByProId(proId: string): Promise<WorkHistoryItem[]> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return INITIAL_WORK_HISTORY.filter((item) => item.proId === proId);
}

