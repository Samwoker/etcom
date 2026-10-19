import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CreditCard } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { PageHeader } from '@/components/shared/PageHeader';
import { EmptyState } from '@/components/shared/EmptyState';
import { Button } from '@/components/ui/button';
import {
  PaymentSummary,
  MpesaPhoneInput,
  MpesaPrompt,
  PaymentResult,
  DigitalReceiptCard,
  usePayment,
} from '@/features/payments';
import { ROUTES } from '@/app/routes';

export const PaymentPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, isLoading, actions } = usePayment(id);

  if (isLoading) {
    return (
      <div className="flex flex-1 flex-col">
        <PageHeader title="M-PESA Payment" showBack />
        <div className="w-full max-w-xl md:max-w-2xl mx-auto p-4 space-y-4">
          <Skeleton className="h-44 w-full rounded-xl" />
          <Skeleton className="h-28 w-full rounded-xl" />
        </div>
      </div>
    );
  }

  if (!data.job) {
    return (
      <div className="flex flex-1 flex-col">
        <PageHeader title="M-PESA Payment" showBack />
        <EmptyState
          icon={CreditCard}
          title="Payment job not found"
          description="The payment order for this job could not be retrieved."
          actionLabel="View all jobs"
          onAction={() => navigate(ROUTES.CUSTOMER_JOBS)}
        />
      </div>
    );
  }

  const { job, pro, amountDueETB, step, phone, paymentResult, receipt } = data;

  return (
    <div className="flex flex-1 flex-col pb-12">
      <PageHeader
        title={step === 'result' && paymentResult?.success ? 'Payment Receipt' : 'M-PESA Payment'}
        subtitle={job.title}
        showBack={step === 'input'}
        onBack={() => navigate(ROUTES.CUSTOMER_JOB_DETAIL(job.id))}
      />

      <div className="w-full max-w-xl md:max-w-2xl mx-auto px-4 py-4 space-y-4 flex-1 flex flex-col justify-center">
        {step === 'input' && (
          <div className="space-y-4">
            <PaymentSummary job={job} pro={pro} amountDueETB={amountDueETB} />
            <MpesaPhoneInput
              initialPhone={phone}
              onPay={actions.submitPayment}
            />
          </div>
        )}

        {step === 'prompt' && (
          <MpesaPrompt phone={phone} amountETB={amountDueETB} />
        )}

        {step === 'result' && paymentResult?.success && receipt && (
          <div className="space-y-4 animate-in fade-in-50 duration-300">
            <DigitalReceiptCard
              receipt={receipt}
              viewerRole="customer"
              onClose={() => navigate(ROUTES.CUSTOMER_HOME)}
            />
            <Button
              variant="outline"
              onClick={() => navigate(ROUTES.CUSTOMER_PRO_DETAIL(job.proId))}
              className="w-full h-11 rounded-xl text-xs font-semibold border-border gap-1.5"
            >
              <span>View Professional's Updated Portfolio Card</span>
            </Button>
          </div>
        )}

        {step === 'result' && paymentResult && !paymentResult.success && (
          <PaymentResult
            success={false}
            amountETB={amountDueETB}
            errorMessage={paymentResult.error}
            onTrackJob={() => navigate(ROUTES.CUSTOMER_JOB_DETAIL(job.id))}
            onRetry={actions.retry}
          />
        )}
      </div>
    </div>
  );
};
