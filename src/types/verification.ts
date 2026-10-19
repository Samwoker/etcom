// Verification consists of THREE SEPARATE fields. Never merge.
export type IdentityStatus =
  | 'not_submitted'
  | 'in_review'
  | 'verified'
  | 'more_info_needed'
  | 'rejected';

export type SkillsStatus =
  | 'not_submitted'
  | 'in_review'
  | 'evidence_accepted'
  | 'assessment_required'
  | 'more_info_needed'
  | 'not_verified';

// Confirmed Etcom jobs (derived, never self-reported)
export type WorkHistoryCount = number;

export type ListingStatus =
  | 'in_progress'
  | 'eligible'
  | 'restricted'
  | 'suspended';

export interface EvidenceItem {
  id: string;
  proId: string;
  type: 'national_id' | 'kebele_id' | 'trade_license' | 'tvet_certificate' | 'portfolio_photo';
  title: string;
  fileName: string;
  status: 'pending' | 'accepted' | 'rejected' | 'more_info_needed';
  rejectionReason?: string;
  submittedAt: string;
}
