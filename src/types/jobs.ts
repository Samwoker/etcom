import type { Quote, QuoteStatus } from './quotes';
import type { DigitalReceipt } from './receipt';

// Explicit Job Lifecycle matching Etcom pay-on-completion architecture:
// request_created -> accepted -> dispatched -> arrived -> in_progress -> completed_pending_payment -> payment_pending -> paid
export type JobLifecycleStage =
  | 'request_created'
  | 'accepted'
  | 'dispatched'
  | 'arrived'
  | 'in_progress'
  | 'completed_pending_payment'
  | 'payment_pending'
  | 'paid'
  | 'cancelled'
  | 'disputed';

// Job: three independent axes for backwards compatibility and audit
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
  diagnosticAnswers?: Record<string, string>;
  voiceNoteUrl?: string;
}

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
  lifecycleStage?: JobLifecycleStage;
  activeQuote?: Quote;
  createdAt: string;
  scheduledDate?: string;
  contactRevealed?: boolean;
  photos?: string[];
  afterPhotos?: string[];
  voiceNoteUrl?: string;
  diagnosticAnswers?: Record<string, string>;
  startedAt?: string;
  finishedAt?: string;
  durationMinutes?: number;
  actualLaborETB?: number;
  actualMaterialsETB?: number;
  scopeChangeReason?: string;
  materialReceiptUrl?: string;
  receipt?: DigitalReceipt;
  cancellationReason?: string;
  cancelledBy?: 'customer' | 'professional';
  customerReportedIssue?: string;
  proReportedIssue?: string;
  // Legacy compatibility (optional)
  paymentTerms?: 'full';
  depositAmountETB?: number;
}
