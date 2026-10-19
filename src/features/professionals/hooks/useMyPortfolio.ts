import { useState, useEffect, useMemo } from 'react';
import { useDemoStore } from '@/store/demoStore';
import type { Job, SelfUploadWorkItem } from '@/types';

export function useMyPortfolio() {
  const { currentUserId, professionals, jobs, addSelfPortfolioItem } = useDemoStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 200);
    return () => clearTimeout(timer);
  }, []);

  const pro = useMemo(() => {
    return professionals.find((p) => p.id === currentUserId) || professionals[0];
  }, [professionals, currentUserId]);

  const verifiedJobs: Job[] = useMemo(() => {
    const matched = jobs.filter(
      (j) => (j.proId === pro.id || j.proId === 'p1') && j.completionStatus === 'completed'
    );
    return matched;
  }, [jobs, pro.id]);

  const selfUploads: SelfUploadWorkItem[] = useMemo(() => {
    if (pro.selfUploads && pro.selfUploads.length > 0) {
      return pro.selfUploads;
    }
    return [
      {
        id: 'self-1',
        title: 'Bole Atlas 4-storey residential riser plumbing',
        category: 'Plumbing',
        description: 'Multi-line PPR distribution with isolation ball valves on every floor level.',
        photoUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400',
        createdAt: '2026-08-10T10:00:00Z',
      },
      {
        id: 'self-2',
        title: 'Emergency water pump replacement in CMC',
        category: 'Plumbing',
        description: 'Submersible 2HP Italian pump wiring and check-valve replacement.',
        photoUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400',
        createdAt: '2026-07-25T14:30:00Z',
      },
    ];
  }, [pro.selfUploads]);

  const handleAdd = (item: { title: string; category: string; description: string; photoUrl: string }) => {
    addSelfPortfolioItem(pro.id, item);
  };

  return {
    pro,
    verifiedJobs,
    selfUploads,
    addWorkPhoto: handleAdd,
    isLoading,
  };
}
