import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Briefcase } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { PageHeader } from '@/components/shared/PageHeader';
import { EmptyState } from '@/components/shared/EmptyState';
import { JobHeader, JobTimeline, JobActions, useJob } from '@/features/jobs';
import { ROUTES } from '@/app/routes';

export const JobTrackerPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, isLoading, error } = useJob(id);

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

  return (
    <div className="flex flex-1 flex-col pb-8">
      <PageHeader
        title="Job Tracker"
        subtitle={job.title}
        showBack
        onBack={() => navigate(ROUTES.CUSTOMER_JOBS)}
      />

      <div className="w-full max-w-xl md:max-w-2xl mx-auto px-4 py-4 space-y-4">
        <JobHeader job={job} pro={pro} />
        <JobTimeline job={job} />
        <JobActions
          job={job}
          pro={pro}
          onOpenChat={() => navigate(ROUTES.CUSTOMER_JOB_CHAT(job.id))}
          onPayNow={() => navigate(ROUTES.CUSTOMER_JOB_PAY(job.id))}
          onMarkComplete={() => navigate(ROUTES.CUSTOMER_JOB_COMPLETE(job.id))}
          onReportProblem={() => navigate(ROUTES.CUSTOMER_JOB_DISPUTE(job.id))}
        />
      </div>
    </div>
  );
};
