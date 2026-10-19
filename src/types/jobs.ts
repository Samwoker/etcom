import type { Quote, QuoteStatus } from './quotes';

// Job: three SEPARATE statuses. One never implies another.
export type PaymentStatus =
  | 'unpaid'
  | 'pending'
  | 'confirmed'
  | 'failed';

export type CompletionStatus =
  | 'not_started'
  | 'in_progress'
  | 'awaiting_confirmation'
  | 'completed'
  | 'disputed';

export type UrgencyOption = 'asap' | 'today' | 'few_days' | 'flexible';

export type VerificationPreferenceOption =
  | 'verified_skills'
  | 'identity_verified'
  | 'all';

export interface DraftRequest {
  category: string;
  description: string;
  photos: string[];
  subCity: string;
  urgency: UrgencyOption;
  verificationPreference: VerificationPreferenceOption;
}

export type PaymentTerms = 'full' | 'deposit_split';

export interface Job {
  id: string;
  customerId: string;
  proId: string;
  title: string;
  description: string;
  category: string;
  subCity: string;
  quoteStatus: QuoteStatus;
  paymentStatus: PaymentStatus;
  completionStatus: CompletionStatus;
  activeQuote?: Quote;
  createdAt: string;
  scheduledDate?: string;
  paymentTerms?: PaymentTerms;
  depositAmountETB?: number;
  contactRevealed?: boolean;
  photos?: string[];
}

