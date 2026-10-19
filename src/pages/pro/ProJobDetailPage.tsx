import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Briefcase } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { PageHeader } from '@/components/shared/PageHeader';
import { EmptyState } from '@/components/shared/EmptyState';
import {
  ProJobHeader,
  JobAddressCard,
  ProJobActions,
  useProJob,
} from '@/features/jobs';
import { ROUTES } from '@/app/routes';

export const ProJobDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { job, customer, isLoading, error, actions } = useProJob(id);

  if (isLoading) {
    return (
      <div className="flex flex-1 flex-col">
        <PageHeader title="Job Detail" showBack onBack={() => navigate(ROUTES.PRO_REQUESTS)} />
        <div className="w-full max-w-xl md:max-w-2xl mx-auto p-4 space-y-4">
          <Skeleton className="h-32 w-full rounded-xl" />
          <Skeleton className="h-44 w-full rounded-xl" />
          <Skeleton className="h-20 w-full rounded-xl" />
        </div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="flex flex-1 flex-col">
        <PageHeader title="Job Detail" showBack onBack={() => navigate(ROUTES.PRO_REQUESTS)} />
        <EmptyState
          icon={Briefcase}
          title="Job not found"
          description={error || 'Unable to retrieve the job details.'}
          actionLabel="View all requests"
          onAction={() => navigate(ROUTES.PRO_REQUESTS)}
        />
      </div>
    );
  }

  const customerFirstName = customer ? customer.fullName.split(' ')[0] : 'Customer';
  const isConfirmed = Boolean(job.contactRevealed || job.quoteStatus === 'accepted' || job.paymentStatus === 'confirmed');

  return (
    <div className="flex flex-1 flex-col pb-8">
      <PageHeader
        title="Job Detail"
        subtitle={job.title}
        showBack
        onBack={() => navigate(ROUTES.PRO_REQUESTS)}
      />

      <div className="w-full max-w-xl md:max-w-2xl mx-auto px-4 py-3 space-y-4">
        <ProJobHeader
          job={job}
          customerFirstName={customerFirstName}
        />

        <JobAddressCard
          subCity={job.subCity}
          scheduledDate={job.scheduledDate}
          scopeDescription={job.activeQuote?.scopeDescription || job.description}
          customerPhone={customer?.phone}
          contactRevealed={isConfirmed}
        />

        <ProJobActions
          job={job}
          onOpenChat={() => navigate(ROUTES.CUSTOMER_JOB_CHAT(job.id))}
          onReviseQuote={() => navigate(`/p/jobs/${job.id}/quote`)}
          onStartWork={actions.startWork}
          onMarkFinished={actions.markFinished}
        />
      </div>
    </div>
  );
};
