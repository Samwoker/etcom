import { useState, useEffect, useMemo } from 'react';
import { useDemoStore } from '@/store/demoStore';

export function useMyVerification() {
  const { currentUserId, professionals } = useDemoStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 200);
    return () => clearTimeout(timer);
  }, []);

  const pro = useMemo(() => {
    return professionals.find((p) => p.id === currentUserId) || professionals[0];
  }, [professionals, currentUserId]);

  const canVerifySkills =
    pro?.skillsStatus === 'not_submitted' ||
    pro?.skillsStatus === 'not_verified' ||
    pro?.skillsStatus === 'more_info_needed';

  const canVerifyIdentity =
    pro?.identityStatus === 'not_submitted' ||
    pro?.identityStatus === 'more_info_needed';

  return {
    pro,
    isLoading,
    canVerifySkills,
    canVerifyIdentity,
  };
}
