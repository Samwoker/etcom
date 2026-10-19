import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle2, AlertTriangle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/shared/PageHeader';
import { EmptyState } from '@/components/shared/EmptyState';
import { StickyCta } from '@/components/shared/StickyCta';
import {
  CompletionChecklist,
  ReviewForm,
  useReviewJob,
} from '@/features/reviews';
import { ROUTES } from '@/app/routes';

export const CompletePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, isLoading, isSubmitting, error, actions } = useReviewJob(id);

  if (isLoading) {
    return (
      <div className="flex flex-1 flex-col">
        <PageHeader title="How did it go?" showBack />
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
        <PageHeader title="How did it go?" showBack />
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

  const { job, pro, workAgreed, rating, tags, comment, photos, showThankYouDialog } = data;

  const handleCtaClick = () => {
    if (workAgreed === 'no') {
      navigate(ROUTES.CUSTOMER_JOB_DISPUTE(job.id));
    } else if (workAgreed === 'yes') {
      actions.submitReview();
    }
  };

  const isAgreedYes = workAgreed === 'yes';
  const isAgreedNo = workAgreed === 'no';

  return (
    <div className="flex flex-1 flex-col pb-28">
      <PageHeader
        title="How did it go?"
        subtitle={job.title}
        showBack
        onBack={() => navigate(ROUTES.CUSTOMER_JOB_DETAIL(job.id))}
      />

      <div className="w-full max-w-xl md:max-w-2xl mx-auto px-4 py-4 space-y-4">
        {/* Step 1: Completion Checklist */}
        <Card className="border-border shadow-sm">
          <CardContent className="p-4">
            <CompletionChecklist
              value={workAgreed}
              onChange={actions.setWorkAgreed}
            />
          </CardContent>
        </Card>

        {/* Step 2: Rating & Review (shown when work completed as agreed) */}
        {isAgreedYes && (
          <Card className="border-border shadow-sm animate-in fade-in-50 duration-200">
            <CardContent className="p-4">
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
            </CardContent>
          </Card>
        )}
      </div>

      {/* Sticky CTA adapts based on outcome */}
      <StickyCta
        primaryLabel={isAgreedNo ? 'Report a problem' : 'Confirm and submit'}
        primaryDisabled={workAgreed === null || isSubmitting}
        primaryLoading={isSubmitting}
        onPrimaryClick={handleCtaClick}
      />

      {/* Thank you Dialog upon successful review submission */}
      <Dialog open={showThankYouDialog} onOpenChange={actions.setShowThankYouDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="items-center text-center space-y-2">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <CheckCircle2 className="h-7 w-7" />
            </div>
            <DialogTitle className="text-lg font-bold text-foreground">
              Thank you for your review!
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground max-w-xs">
              Your feedback for {pro?.fullName || 'the tradesperson'} has been confirmed. Their verified work history and rating have been updated.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="pt-2">
            <Button
              onClick={() => {
                actions.setShowThankYouDialog(false);
                navigate(ROUTES.CUSTOMER_HOME);
              }}
              className="w-full rounded-full font-semibold bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Done
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
