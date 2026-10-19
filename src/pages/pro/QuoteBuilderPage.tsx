import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FileText } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { PageHeader } from '@/components/shared/PageHeader';
import { EmptyState } from '@/components/shared/EmptyState';
import { StickyCta } from '@/components/shared/StickyCta';
import { QuoteForm, useQuoteBuilder } from '@/features/quotes';
import { ROUTES } from '@/app/routes';

export const QuoteBuilderPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    job,
    isRevision,
    isValid,
    laborETB,
    materialsETB,
    scope,
    scheduledDate,
    inspectionNeeded,
    revisionReason,
    isSubmitting,
    isLoading,
    error,
    actions,
  } = useQuoteBuilder(id);

  if (isLoading) {
    return (
      <div className="flex flex-1 flex-col">
        <PageHeader title={isRevision ? 'Update Price Offer' : 'Send Price Offer'} showBack />
        <div className="w-full max-w-xl md:max-w-2xl mx-auto p-4 space-y-4">
          <Skeleton className="h-24 w-full rounded-xl" />
          <Skeleton className="h-64 w-full rounded-xl" />
        </div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="flex flex-1 flex-col">
        <PageHeader title="Send Price Offer" showBack />
        <EmptyState
          icon={FileText}
          title="Job not found"
          description={error || 'Unable to retrieve request details to generate a price offer.'}
          actionLabel="View all requests"
          onAction={() => navigate(ROUTES.PRO_REQUESTS)}
        />
      </div>
    );
  }

  const handleSend = async () => {
    const success = await actions.submitQuote();
    if (success) {
      navigate(ROUTES.CUSTOMER_JOB_CHAT(job.id));
    }
  };

  return (
    <div className="flex flex-1 flex-col pb-28">
      <PageHeader
        title={isRevision ? 'Update Price Offer' : 'Send Price Offer'}
        subtitle={job.title}
        showBack
        onBack={() => navigate(ROUTES.CUSTOMER_JOB_CHAT(job.id))}
      />

      <div className="w-full max-w-xl md:max-w-2xl mx-auto px-4 py-4 space-y-4">
        {/* Job Summary Banner */}
        <Card className="border-border shadow-xs bg-muted/30">
          <CardContent className="p-3 text-xs space-y-1">
            <span className="text-[11px] text-muted-foreground block">Customer Request</span>
            <p className="font-semibold text-foreground">{job.title}</p>
            <p className="text-[11px] text-muted-foreground">{job.category} • {job.subCity} Sub-City</p>
          </CardContent>
        </Card>

        {/* Main Quote Form */}
        <Card className="border-border shadow-sm">
          <CardContent className="p-4">
            <QuoteForm
              isRevision={isRevision}
              laborETB={laborETB}
              onLaborChange={actions.setLaborETB}
              materialsETB={materialsETB}
              onMaterialsChange={actions.setMaterialsETB}
              scope={scope}
              onScopeChange={actions.setScope}
              scheduledDate={scheduledDate}
              onScheduledDateChange={actions.setScheduledDate}
              inspectionNeeded={inspectionNeeded}
              onInspectionChange={actions.setInspectionNeeded}
              revisionReason={revisionReason}
              onRevisionReasonChange={actions.setRevisionReason}
            />
          </CardContent>
        </Card>
      </div>

      <StickyCta
        primaryLabel={isRevision ? 'Send updated price offer' : 'Send price offer to customer'}
        primaryDisabled={!isValid || isSubmitting}
        primaryLoading={isSubmitting}
        onPrimaryClick={handleSend}
      />
    </div>
  );
};
