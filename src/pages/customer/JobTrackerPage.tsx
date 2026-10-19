import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Briefcase } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { PageHeader } from '@/components/shared/PageHeader';
import { EmptyState } from '@/components/shared/EmptyState';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import {
  JobHeader,
  JobTimeline,
  JobActions,
  useJob,
} from '@/features/jobs';
import { ArrivalTracker } from '@/features/jobs/components/ArrivalTracker';
import { WorkTimer } from '@/features/jobs/components/WorkTimer';
import { JobCompletionSummaryCard } from '@/features/jobs/components/JobCompletionSummaryCard';
import { DigitalReceiptCard } from '@/features/payments/components/DigitalReceiptCard';
import { SimulatedCallModal } from '@/components/shared/SimulatedCallModal';
import { useDemoStore } from '@/store/demoStore';
import { ROUTES } from '@/app/routes';

export const JobTrackerPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, isLoading, error } = useJob(id);
  const { arriveProAtSite, reportProDidNotArrive } = useDemoStore();

  const [callModalOpen, setCallModalOpen] = useState(false);
  const [receiptOpen, setReceiptOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="flex flex-1 flex-col">
        <PageHeader title="Job Tracker" showBack onBack={() => navigate(ROUTES.CUSTOMER_JOBS)} />
        <div className="w-full max-w-xl md:max-w-2xl mx-auto p-4 space-y-4">
          <Skeleton className="h-32 w-full rounded-xl" />
          <Skeleton className="h-64 w-full rounded-xl" />
          <Skeleton className="h-24 w-full rounded-xl" />
        </div>
      </div>
    );
  }

  if (error || !data.job) {
    return (
      <div className="flex flex-1 flex-col">
        <PageHeader title="Job Tracker" showBack onBack={() => navigate(ROUTES.CUSTOMER_JOBS)} />
        <EmptyState
          icon={Briefcase}
          title="Job not found"
          description={error || "We couldn't find the requested job details."}
          actionLabel="View all jobs"
          onAction={() => navigate(ROUTES.CUSTOMER_JOBS)}
        />
      </div>
    );
  }

  const { job, pro } = data;

  const isDispatched =
    job.lifecycleStage === 'dispatched' ||
    (job.quoteStatus === 'accepted' && job.completionStatus === 'not_started' && job.lifecycleStage !== 'arrived');
  const isArrived = job.lifecycleStage === 'arrived';
  const isInProgress = job.completionStatus === 'in_progress';
  const isAwaitingConfirmation = job.completionStatus === 'awaiting_confirmation';

  return (
    <div className="flex flex-1 flex-col pb-8">
      <PageHeader
        title="Job Tracker"
        subtitle={job.title}
        showBack
        onBack={() => navigate(ROUTES.CUSTOMER_JOBS)}
      />

      <div className="w-full max-w-xl md:max-w-2xl mx-auto px-4 py-4 space-y-4">
        {/* Main Job Header */}
        <JobHeader job={job} pro={pro} />

        {/* Arrival Tracking View if dispatched */}
        {(isDispatched || isArrived) && (
          <div className="space-y-2">
            <ArrivalTracker
              job={job}
              pro={pro}
              onSimulateArrival={() => arriveProAtSite(job.id)}
              onCallPro={() => setCallModalOpen(true)}
            />

            {/* Didn't arrive edge-case reporting */}
            <div className="text-center pt-1">
              <button
                type="button"
                onClick={() => {
                  reportProDidNotArrive(job.id);
                  navigate(ROUTES.CUSTOMER_JOBS);
                }}
                className="text-[11px] text-muted-foreground hover:text-destructive underline cursor-pointer"
              >
                Professional didn't arrive? Tap to log no-show
              </button>
            </div>
          </div>
        )}

        {/* Running Work Timer if work is currently in progress */}
        {isInProgress && (
          <div className="space-y-2">
            <WorkTimer startedAt={job.startedAt} />
            <p className="text-[11px] text-center text-muted-foreground">
              Professional is working on-site in {job.subCity}. You will be prompted to inspect after-photos and pay upon completion.
            </p>
          </div>
        )}

        {/* Completion Summary Card if work is done & awaiting confirmation */}
        {isAwaitingConfirmation && (
          <JobCompletionSummaryCard
            job={job}
            onReviewAndPay={() => navigate(ROUTES.CUSTOMER_JOB_COMPLETE(job.id))}
          />
        )}

        {/* Standard Progress Timeline */}
        <JobTimeline job={job} />

        {/* Job Actions */}
        <JobActions
          job={job}
          pro={pro}
          onOpenChat={() => navigate(ROUTES.CUSTOMER_JOB_CHAT(job.id))}
          onViewReceipt={() => setReceiptOpen(true)}
          onReportProblem={() => navigate(ROUTES.CUSTOMER_JOB_DISPUTE(job.id))}
        />
      </div>

      {/* Simulated In-App Call Modal */}
      <SimulatedCallModal
        open={callModalOpen}
        onOpenChange={setCallModalOpen}
        contactName={pro?.fullName || 'Assigned Tradesperson'}
        contactTrade={pro?.trade || job.category}
        avatarUrl={pro?.avatarUrl}
      />

      {/* Digital Receipt Modal if paid */}
      {job.receipt && (
        <Dialog open={receiptOpen} onOpenChange={setReceiptOpen}>
          <DialogContent className="sm:max-w-md p-0 overflow-hidden bg-transparent border-0">
            <DigitalReceiptCard
              receipt={job.receipt}
              viewerRole="customer"
              onClose={() => setReceiptOpen(false)}
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};
