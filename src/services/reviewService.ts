import type { Review } from '@/types';
import { INITIAL_REVIEWS } from '@/data/initialData';

export async function getReviewsByProId(proId: string): Promise<Review[]> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return INITIAL_REVIEWS.filter((r) => r.proId === proId);
}
