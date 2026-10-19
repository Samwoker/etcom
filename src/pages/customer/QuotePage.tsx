import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FileText } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { PageHeader } from '@/components/shared/PageHeader';
import { EmptyState } from '@/components/shared/EmptyState';
import {
  QuoteBreakdown,
  CounterOfferSheet,
  QuoteHistory,
  DeclineConfirmDialog,
  QuoteActionToolbar,
  useQuote,
} from '@/features/quotes';
import { ROUTES } from '@/app/routes';

export const QuotePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, isLoading, isSubmitting, actions } = useQuote(id);

  const [counterOpen, setCounterOpen] = useState(false);
  const [declineDialogOpen, setDeclineDialogOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="flex flex-1 flex-col">
        <PageHeader title="Review Price Offer" showBack />
        <div className="w-full max-w-xl md:max-w-2xl mx-auto p-4 space-y-4">
          <Skeleton className="h-48 w-full rounded-xl" />
          <Skeleton className="h-32 w-full rounded-xl" />
        </div>
      </div>
    );
  }

  if (!data.job || !data.quote) {
    return (
      <div className="flex flex-1 flex-col">
        <PageHeader title="Review Price Offer" showBack />
        <EmptyState
          icon={FileText}
          title="No price offer yet"
          description="The professional has not submitted an itemized price offer yet."
          actionLabel="Return to chat"
          onAction={() => id && navigate(ROUTES.CUSTOMER_JOB_CHAT(id))}
        />
      </div>
    );
  }

  const { job, quote, history } = data;

  const handleAccept = async () => {
    await actions.acceptQuote();
    navigate(ROUTES.CUSTOMER_JOB_CONFIRM(job.id));
  };

  const handleDeclineConfirm = async () => {
    await actions.declineQuote();
    setDeclineDialogOpen(false);
    navigate(ROUTES.CUSTOMER_RESULTS);
  };

  return (
    <div className="flex flex-1 flex-col pb-28">
      <PageHeader
        title="Review Price Offer"
        subtitle={job.title}
        showBack
        onBack={() => navigate(ROUTES.CUSTOMER_JOB_CHAT(job.id))}
      />

      <div className="w-full max-w-xl md:max-w-2xl mx-auto px-4 py-4 space-y-4">
        <QuoteBreakdown quote={quote} scheduledDate={job.scheduledDate} />
        <QuoteHistory history={history} />
      </div>

      <QuoteActionToolbar
        status={quote.status}
        isSubmitting={isSubmitting}
        onAccept={handleAccept}
        onNegotiate={() => setCounterOpen(true)}
        onDecline={() => setDeclineDialogOpen(true)}
        onContinue={() => navigate(ROUTES.CUSTOMER_JOB_CONFIRM(job.id))}
      />

      <CounterOfferSheet
        open={counterOpen}
        onOpenChange={setCounterOpen}
        currentAmount={quote.totalAmountETB}
        onSendCounter={actions.negotiateQuote}
        isSubmitting={isSubmitting}
      />

      <DeclineConfirmDialog
        open={declineDialogOpen}
        onOpenChange={setDeclineDialogOpen}
        onConfirmDecline={handleDeclineConfirm}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};
