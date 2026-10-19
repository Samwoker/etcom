import { useState, useEffect, useMemo } from 'react';
import { useDemoStore } from '@/store/demoStore';

export type QueueFilter = 'all' | 'identity' | 'skills' | 'needs_info';

export function useReviewQueue() {
  const { professionals } = useDemoStore();
  const [filter, setFilter] = useState<QueueFilter>('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 350);
    return () => clearTimeout(timer);
  }, []);

  // Items in the queue have at least one category awaiting admin decision or info resolution
  const queueItems = useMemo(() => {
    return professionals.filter((pro) => {
      const isIdentityPending = pro.identityStatus === 'in_review';
      const isSkillsPending =
        pro.skillsStatus === 'in_review' || pro.skillsStatus === 'assessment_required';
      const isNeedsInfo =
        pro.identityStatus === 'more_info_needed' || pro.skillsStatus === 'more_info_needed';

      return isIdentityPending || isSkillsPending || isNeedsInfo;
    });
  }, [professionals]);

  const filteredItems = useMemo(() => {
    switch (filter) {
      case 'identity':
        return queueItems.filter((pro) => pro.identityStatus === 'in_review');
      case 'skills':
        return queueItems.filter(
          (pro) =>
            pro.skillsStatus === 'in_review' || pro.skillsStatus === 'assessment_required'
        );
      case 'needs_info':
        return queueItems.filter(
          (pro) =>
            pro.identityStatus === 'more_info_needed' ||
            pro.skillsStatus === 'more_info_needed'
        );
      case 'all':
      default:
        return queueItems;
    }
  }, [queueItems, filter]);

  return {
    queueItems,
    filteredItems,
    count: queueItems.length,
    filter,
    setFilter,
    isLoading,
  };
}
