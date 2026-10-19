export type DisputeStatus =
  | 'opened'
  | 'under_review'
  | 'resolved_refund'
  | 'resolved_payout'
  | 'closed';

export interface Dispute {
  id: string;
  referenceNumber: string;
  jobId: string;
  proId: string;
  customerId: string;
  reason: string;
  description: string;
  desiredResolution: string;
  photos?: string[];
  status: DisputeStatus;
  createdAt: string;
  resolutionNote?: string;
  resolvedAt?: string;
  resolvedBy?: string;
}
