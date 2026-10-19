import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AlertTriangle, CheckCircle2, Copy } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PageHeader } from '@/components/shared/PageHeader';
import { EmptyState } from '@/components/shared/EmptyState';
import { StickyCta } from '@/components/shared/StickyCta';
import { DisputeForm, useDispute } from '@/features/disputes';
import { ROUTES } from '@/app/routes';

export const DisputePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, isLoading, isSubmitting, error, actions } = useDispute(id);

  if (isLoading) {
    return (
      <div className="flex flex-1 flex-col">
        <PageHeader title="Report a problem" showBack />
        <div className="w-full max-w-xl md:max-w-2xl mx-auto p-4 space-y-4">
          <Skeleton className="h-44 w-full rounded-xl" />
          <Skeleton className="h-32 w-full rounded-xl" />
        </div>
      </div>
    );
  }

  if (error || !data.job) {
    return (
      <div className="flex flex-1 flex-col">
        <PageHeader title="Report a problem" showBack />
        <EmptyState
          icon={AlertTriangle}
          title="Job not found"
          description={error || "We couldn't retrieve the job for this report."}
          actionLabel="View all jobs"
          onAction={() => navigate(ROUTES.CUSTOMER_JOBS)}
        />
      </div>
    );
  }

  const { job, reason, description, photos, submittedRefNumber } = data;

  // Confirmation view after report is successfully submitted
  if (submittedRefNumber) {
    return (
      <div className="flex flex-1 flex-col">
        <PageHeader title="Report Submitted" showBack onBack={() => navigate(ROUTES.CUSTOMER_JOB_DETAIL(job.id))} />
        <div className="flex flex-1 flex-col items-center justify-center text-center p-4 space-y-6 max-w-sm mx-auto">
          <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <CheckCircle2 className="h-10 w-10 text-primary" />
          </div>

          <div className="space-y-1.5">
            <Badge variant="outline" className="text-xs px-3 py-1 font-mono gap-1 border-primary/30 text-primary">
              Reference: {submittedRefNumber}
              <Copy className="h-3 w-3 opacity-60" />
            </Badge>
            <h2 className="text-xl font-bold tracking-tight text-foreground pt-1">
              Case opened with Etcom
            </h2>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Our operations team has received your report. Both parties will be contacted and the job completion remains disputed.
            </p>
          </div>

          <Button
            onClick={() => navigate(ROUTES.CUSTOMER_JOB_DETAIL(job.id))}
            className="w-full h-11 rounded-full font-semibold bg-primary text-primary-foreground hover:bg-primary/90"
          >
            View job tracker
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col pb-28">
      <PageHeader
        title="Report a problem"
        subtitle={job.title}
        showBack
        onBack={() => navigate(ROUTES.CUSTOMER_JOB_DETAIL(job.id))}
      />

      <div className="w-full max-w-xl md:max-w-2xl mx-auto px-4 py-4 space-y-4">
        <Card className="border-border shadow-sm">
          <CardContent className="p-4">
            <DisputeForm
              reason={reason}
              onReasonChange={actions.setReason}
              description={description}
              onDescriptionChange={actions.setDescription}
              photos={photos}
              onPhotosChange={actions.setPhotos}
            />
          </CardContent>
        </Card>
      </div>

      <StickyCta
        primaryLabel="Submit report"
        primaryDisabled={!reason.trim() || isSubmitting}
        primaryLoading={isSubmitting}
        onPrimaryClick={actions.submitDispute}
      />
    </div>
  );
};
