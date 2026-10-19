export interface Review {
  id: string;
  jobId: string;
  proId: string;
  customerId: string;
  customerName: string;
  rating: number;
  comment: string;
  date: string;
  tags?: string[];
  photos?: string[];
  canEditUntil?: string; // ISO timestamp 2 hours after creation
  consentToPublish?: boolean;
}

