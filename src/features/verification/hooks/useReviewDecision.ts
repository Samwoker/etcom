import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useDemoStore } from '@/store/demoStore';
import { ROUTES } from '@/app/routes';
import type { IdentityStatus, SkillsStatus, Professional } from '@/types';

export function useReviewDecision(proId?: string) {
  const navigate = useNavigate();
  const { professionals, saveReviewDecision } = useDemoStore();
  const [isLoading, setIsLoading] = useState(true);

  const pro: Professional | undefined = useMemo(() => {
    if (!proId) return professionals[0];
    return professionals.find((p) => p.id === proId) || professionals[0];
  }, [professionals, proId]);

  // Identity decision states
  const [identityChoice, setIdentityChoice] = useState<IdentityStatus>(
    pro?.identityStatus === 'in_review' ? 'verified' : (pro?.identityStatus || 'verified')
  );
  const [identityReason, setIdentityReason] = useState(pro?.adminFeedback || '');
  const [identityFlagged, setIdentityFlagged] = useState(false);
  const [identityError, setIdentityError] = useState<string | null>(null);

  // Skills decision states
  const [skillsChoice, setSkillsChoice] = useState<SkillsStatus>(
    pro?.skillsStatus === 'in_review'
      ? 'evidence_accepted'
      : (pro?.skillsStatus || 'evidence_accepted')
  );
  const [skillsReason, setSkillsReason] = useState(pro?.adminFeedback || '');
  const [skillsFlagged, setSkillsFlagged] = useState(false);
  const [skillsError, setSkillsError] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const handleSaveIdentity = () => {
    if (!pro) return;

    // Reason is required for every decision other than Verified
    if (identityChoice !== 'verified' && !identityReason.trim()) {
      setIdentityError('A reason is mandatory when requesting more info or declining ID.');
      return;
    }
    setIdentityError(null);

    saveReviewDecision(pro.id, {
      category: 'identity',
      identityStatus: identityChoice,
      reason: identityReason.trim() || undefined,
      flagForInvestigation: identityFlagged,
    });

    toast.success(`Identity decision saved for ${pro.fullName}`);
    navigate(ROUTES.ADMIN_QUEUE);
  };

  const handleSaveSkills = () => {
    if (!pro) return;

    // Reason is required for every decision other than Evidence accepted
    if (skillsChoice !== 'evidence_accepted' && !skillsReason.trim()) {
      setSkillsError('A reason is mandatory for any decision other than Evidence accepted.');
      return;
    }
    setSkillsError(null);

    saveReviewDecision(pro.id, {
      category: 'skills',
      skillsStatus: skillsChoice,
      reason: skillsReason.trim() || undefined,
      flagForInvestigation: skillsFlagged,
    });

    toast.success(`Skills decision saved for ${pro.fullName}`);
    navigate(ROUTES.ADMIN_QUEUE);
  };

  return {
    pro,
    isLoading,
    identityChoice,
    setIdentityChoice,
    identityReason,
    setIdentityReason,
    identityFlagged,
    setIdentityFlagged,
    identityError,
    handleSaveIdentity,
    skillsChoice,
    setSkillsChoice,
    skillsReason,
    setSkillsReason,
    skillsFlagged,
    setSkillsFlagged,
    skillsError,
    handleSaveSkills,
  };
}
