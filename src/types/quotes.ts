export type QuoteStatus =
  | 'requested'
  | 'quoted'
  | 'negotiating'
  | 'accepted'
  | 'declined';

export interface QuoteHistoryItem {
  id: string;
  quoteId: string;
  type: 'quoted' | 'countered' | 'revised' | 'accepted' | 'declined';
  amountETB: number;
  actor: 'customer' | 'professional' | 'system';
  message?: string;
  timestamp: string;
}

export interface Quote {
  id: string;
  jobId: string;
  proId: string;
  laborAmountETB: number;
  materialsAmountETB: number;
  totalAmountETB: number;
  scopeDescription: string;
  validUntil: string;
  createdAt: string;
  status: QuoteStatus;
  history?: QuoteHistoryItem[];
}

