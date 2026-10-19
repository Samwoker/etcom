import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FileCheck } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { PageHeader } from '@/components/shared/PageHeader';
import { EmptyState } from '@/components/shared/EmptyState';
import { StickyCta } from '@/components/shared/StickyCta';
import {
  AgreementSummary,
  PaymentTermsPicker,
  useAgreement,
} from '@/features/jobs';
import { ROUTES } from '@/app/routes';

export const ConfirmAgreementPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, isLoading, isSubmitting, actions } = useAgreement(id);

  if (isLoading) {
    return (
      <div className="flex flex-1 flex-col">
        <PageHeader title="Confirm Agreement" showBack />
        <div className="w-full max-w-xl md:max-w-2xl mx-auto p-4 space-y-4">
          <Skeleton className="h-56 w-full rounded-xl" />
          <Skeleton className="h-36 w-full rounded-xl" />
        </div>
      </div>
    );
  }

  if (!data.job) {
    return (
      <div className="flex flex-1 flex-col">
        <PageHeader title="Confirm Agreement" showBack />
        <EmptyState
          icon={FileCheck}
          title="Job agreement not found"
          description="We could not retrieve the details for this agreement."
          actionLabel="View all jobs"
          onAction={() => navigate(ROUTES.CUSTOMER_JOBS)}
        />
      </div>
    );
  }

  const { job, pro, paymentTerms, isAgreed } = data;
  const quote = job.activeQuote;

  const handleConfirm = async () => {
    await actions.confirmAgreement();
    navigate(ROUTES.CUSTOMER_JOB_PAY(job.id));
  };

  return (
    <div className="flex flex-1 flex-col pb-28">
      <PageHeader
        title="Confirm Agreement"
        subtitle={job.title}
        showBack
        onBack={() => navigate(ROUTES.CUSTOMER_JOB_QUOTE(job.id))}
      />

      <div className="w-full max-w-xl md:max-w-2xl mx-auto px-4 py-4 space-y-4">
        <AgreementSummary job={job} pro={pro} />

        <PaymentTermsPicker
          totalAmountETB={quote?.totalAmountETB || 0}
          selectedTerms={paymentTerms}
          onTermsChange={actions.setPaymentTerms}
        />

        {/* Agreement Checkbox */}
        <div className="flex items-start gap-3 p-3 rounded-xl bg-muted/40 border border-border">
          <Checkbox
            id="agreement-terms"
            checked={isAgreed}
            onCheckedChange={(checked) => actions.setIsAgreed(Boolean(checked))}
            className="mt-0.5"
          />
          <Label htmlFor="agreement-terms" className="text-xs font-normal text-foreground leading-relaxed cursor-pointer">
            I agree to these terms and acknowledge that direct phone and messaging details will be shared upon payment confirmation.
          </Label>
        </div>
      </div>

      <StickyCta
        primaryLabel="Confirm and continue to payment"
        primaryDisabled={!isAgreed || isSubmitting}
        primaryLoading={isSubmitting}
        onPrimaryClick={handleConfirm}
      />
    </div>
  );
};
