import React from 'react';
import { ShieldCheck, Award, Briefcase } from 'lucide-react';
import type { IdentityStatus, SkillsStatus } from '@/types';
import { StatusBadge, type StatusVariant } from './StatusBadge';

interface VerificationBadgesProps {
  identityStatus: IdentityStatus;
  skillsStatus: SkillsStatus;
  confirmedJobsCount: number;
  className?: string;
}

export const VerificationBadges: React.FC<VerificationBadgesProps> = ({
  identityStatus,
  skillsStatus,
  confirmedJobsCount,
  className,
}) => {
  // Identity Badge
  const getIdentityConfig = (): { variant: StatusVariant; label: string } => {
    switch (identityStatus) {
      case 'verified':
        return { variant: 'verified', label: 'ID Verified' };
      case 'in_review':
        return { variant: 'pending', label: 'ID In Review' };
      case 'more_info_needed':
        return { variant: 'pending', label: 'ID Info Needed' };
      case 'rejected':
        return { variant: 'failed', label: 'ID Not Verified' };
      case 'not_submitted':
      default:
        return { variant: 'neutral', label: 'ID Not Submitted' };
    }
  };

  // Skills Badge
  const getSkillsConfig = (): { variant: StatusVariant; label: string } => {
    switch (skillsStatus) {
      case 'evidence_accepted':
        return { variant: 'verified', label: 'Skills Verified' };
      case 'in_review':
        return { variant: 'pending', label: 'Skills In Review' };
      case 'assessment_required':
        return { variant: 'pending', label: 'Assessment Needed' };
      case 'more_info_needed':
        return { variant: 'pending', label: 'Skills Info Needed' };
      case 'not_verified':
      case 'not_submitted':
      default:
        return { variant: 'neutral', label: 'Skills Self-reported' };
    }
  };

  // Work History Badge
  const getHistoryConfig = (): { variant: StatusVariant; label: string } => {
    if (confirmedJobsCount > 0) {
      return {
        variant: 'verified',
        label: `${confirmedJobsCount} Etcom ${confirmedJobsCount === 1 ? 'Job' : 'Jobs'}`,
      };
    }
    return { variant: 'neutral', label: 'New to Etcom' };
  };

  const idBadge = getIdentityConfig();
  const skillBadge = getSkillsConfig();
  const historyBadge = getHistoryConfig();

  return (
    <div className={`flex flex-wrap items-center gap-1.5 ${className || ''}`}>
      <StatusBadge
        variant={idBadge.variant}
        label={idBadge.label}
        icon={<ShieldCheck className="h-3 w-3" />}
      />
      <StatusBadge
        variant={skillBadge.variant}
        label={skillBadge.label}
        icon={<Award className="h-3 w-3" />}
      />
      <StatusBadge
        variant={historyBadge.variant}
        label={historyBadge.label}
        icon={<Briefcase className="h-3 w-3" />}
      />
    </div>
  );
};
