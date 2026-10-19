import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AlertTriangle, ShieldCheck } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';
import { PageHeader } from '@/components/shared/PageHeader';
import { EmptyState } from '@/components/shared/EmptyState';
import { StickyCta } from '@/components/shared/StickyCta';
import {
  CompletionChecklist,
  ReviewForm,
  useReviewJob,
} from '@/features/reviews';
import { formatETB } from '@/lib/format';
import { ROUTES } from '@/app/routes';

export const CompletePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, isLoading, isSubmitting, error, actions } = useReviewJob(id);

  if (isLoading) {
    return (
      <div className="flex flex-1 flex-col">
        <PageHeader title="Job Sign-off & Review" showBack />
        <div className="w-full max-w-xl md:max-w-2xl mx-auto p-4 space-y-4">
          <Skeleton className="h-40 w-full rounded-xl" />
          <Skeleton className="h-64 w-full rounded-xl" />
        </div>
      </div>
    );
  }

  if (error || !data.job) {
    return (
      <div className="flex flex-1 flex-col">
        <PageHeader title="Job Sign-off & Review" showBack />
        <EmptyState
          icon={AlertTriangle}
          title="Job not found"
          description={error || 'Unable to retrieve completion details for this job.'}
          actionLabel="Go to Jobs"
          onAction={() => navigate(ROUTES.CUSTOMER_JOBS)}
        />
      </div>
    );
  }

  const { job, workAgreed, rating, tags, comment, photos } = data;

  const handleCtaClick = async () => {
    if (workAgreed === 'no') {
      navigate(ROUTES.CUSTOMER_JOB_DISPUTE(job.id));
    } else if (workAgreed === 'yes') {
      await actions.submitReview();
      navigate(ROUTES.CUSTOMER_JOB_PAY(job.id));
    }
  };

  const isAgreedYes = workAgreed === 'yes';
  const isAgreedNo = workAgreed === 'no';

  const total = (job.actualLaborETB || job.activeQuote?.laborAmountETB || 1000) +
                (job.actualMaterialsETB || job.activeQuote?.materialsAmountETB || 0);

  return (
    <div className="flex flex-1 flex-col pb-28">
      <PageHeader
        title="Job Sign-off & Review"
        subtitle={job.title}
        showBack
        onBack={() => navigate(ROUTES.CUSTOMER_JOB_DETAIL(job.id))}
      />

      <div className="w-full max-w-xl md:max-w-2xl mx-auto px-4 py-4 space-y-4">
        {/* Step 1: Completion Inspection Checklist */}
        <Card className="border-border shadow-xs rounded-2xl">
          <CardContent className="p-4">
            <CompletionChecklist
              value={workAgreed}
              onChange={actions.setWorkAgreed}
            />
          </CardContent>
        </Card>

        {/* Step 2: Rating & Review Form with Consent to Publish */}
        {isAgreedYes && (
          <Card className="border-border shadow-xs rounded-2xl animate-in fade-in-50 duration-200">
            <CardContent className="p-4 space-y-3">
              <ReviewForm
                rating={rating}
                onRatingChange={actions.setRating}
                tags={tags}
                onTagsChange={actions.setTags}
                comment={comment}
                onCommentChange={actions.setComment}
                photos={photos}
                onPhotosChange={actions.setPhotos}
              />

              <div className="pt-2 border-t border-border/60 flex items-center justify-between text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  <span>2-hour review editing window active after payment</span>
                </span>
                <span className="font-semibold text-foreground">{formatETB(total)} due</span>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Sticky CTA */}
      <StickyCta
        primaryLabel={
          isAgreedNo
            ? 'Report a problem & open dispute'
            : `Confirm Review & Pay ${formatETB(total)} via M-PESA`
        }
        primaryDisabled={workAgreed === null || isSubmitting}
        primaryLoading={isSubmitting}
        onPrimaryClick={handleCtaClick}
      />
    </div>
  );
};
