import { useState, useEffect } from 'react';
import type { Professional } from '@/types';
import { getTopProfessionals } from '@/services/professionalService';

export function useProfessionals(limit: number = 4) {
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    getTopProfessionals(limit)
      .then((data) => {
        if (isMounted) {
          setProfessionals(data);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message || 'Failed to load professionals');
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [limit]);

  return { professionals, isLoading, error };
}
