import React from 'react';
import type { QuoteStatus, PaymentStatus, CompletionStatus } from '@/types';
import { StatusBadge, type StatusVariant } from './StatusBadge';

interface JobStatusStripProps {
  quoteStatus: QuoteStatus;
  paymentStatus: PaymentStatus;
  completionStatus: CompletionStatus;
  className?: string;
  compact?: boolean;
}

export const JobStatusStrip: React.FC<JobStatusStripProps> = ({
  quoteStatus,
  paymentStatus,
  completionStatus,
  className,
}) => {
  const getQuoteBadge = (): { variant: StatusVariant; label: string } => {
    switch (quoteStatus) {
      case 'accepted':
        return { variant: 'verified', label: 'Price Agreed' };
      case 'quoted':
        return { variant: 'pending', label: 'Price Offered' };
      case 'negotiating':
        return { variant: 'pending', label: 'Discussing Price' };
      case 'declined':
        return { variant: 'failed', label: 'Offer Declined' };
      case 'requested':
      default:
        return { variant: 'neutral', label: 'Price Requested' };
    }
  };

  const getPaymentBadge = (): { variant: StatusVariant; label: string } => {
    switch (paymentStatus) {
      case 'confirmed':
        return { variant: 'verified', label: 'Paid via M-PESA' };
      case 'pending':
        return { variant: 'pending', label: 'Payment Pending' };
      case 'failed':
        return { variant: 'failed', label: 'Payment Failed' };
      case 'unpaid':
      default:
        return { variant: 'neutral', label: 'Unpaid' };
    }
  };

  const getCompletionBadge = (): { variant: StatusVariant; label: string } => {
    switch (completionStatus) {
      case 'completed':
        return { variant: 'verified', label: 'Completed' };
      case 'in_progress':
        return { variant: 'pending', label: 'In Progress' };
      case 'awaiting_confirmation':
        return { variant: 'pending', label: 'Awaiting Confirmation' };
      case 'disputed':
        return { variant: 'failed', label: 'Disputed' };
      case 'not_started':
      default:
        return { variant: 'neutral', label: 'Not Started' };
    }
  };

  const quote = getQuoteBadge();
  const payment = getPaymentBadge();
  const completion = getCompletionBadge();

  return (
    <div className={`flex flex-wrap items-center gap-1.5 ${className || ''}`}>
      <StatusBadge variant={quote.variant} label={quote.label} />
      <StatusBadge variant={payment.variant} label={payment.label} />
      <StatusBadge variant={completion.variant} label={completion.label} />
    </div>
  );
};
