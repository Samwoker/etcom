import type { IdentityStatus, SkillsStatus, ListingStatus } from './verification';

export type TradeType = 'Plumber' | 'Electrician' | 'TV Repair' | 'Painter' | 'Carpenter';
export type SubCity = 'Bole' | 'Piassa' | 'CMC' | 'Kazanchis' | 'Sarbet' | 'Gerji' | 'Akaki';

export interface SelfUploadWorkItem {
  id: string;
  title: string;
  category: string;
  description: string;
  photoUrl: string;
  createdAt: string;
}

export interface Professional {
  id: string;
  fullName: string;
  phone: string;
  trade: TradeType;
  subCity: SubCity;
  avatarUrl: string;
  bio: string;
  identityStatus: IdentityStatus;
  skillsStatus: SkillsStatus;
  confirmedJobsCount: number; // Etcom verified jobs
  listingStatus: ListingStatus;
  claimedExperienceYears: number; // Must be labeled "Self-reported" in UI
  rating: number;
  reviewCount: number;
  hourlyRateEstimate?: number;
  adminFeedback?: string;
  selfUploads?: SelfUploadWorkItem[];
  references?: { name: string; phone: string; relationship: string }[];
  evidenceItems?: {
    id: string;
    type: string;
    title: string;
    fileName: string;
    submittedAt: string;
  }[];
  reviewedBy?: string;
  reviewedAt?: string;
  identityDecisionReason?: string;
  skillsDecisionReason?: string;
  flaggedForInvestigation?: boolean;
}

export interface WorkHistoryItem {
  id: string;
  proId: string;
  title: string;
  category: TradeType | string;
  subCity: SubCity | string;
  completedDate: string;
  description: string;
  photos: string[];
}
