import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, CheckCircle2, AlertCircle } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { PageHeader } from '@/components/shared/PageHeader';
import { EmptyState } from '@/components/shared/EmptyState';
import { JobListItem, useMyJobs } from '@/features/jobs';
import { ROUTES } from '@/app/routes';

export const MyJobsPage: React.FC = () => {
  const navigate = useNavigate();
  const { data, getProForJob, isLoading } = useMyJobs();

  if (isLoading) {
    return (
      <div className="flex flex-1 flex-col">
        <PageHeader title="My Jobs" />
        <div className="w-full max-w-xl md:max-w-2xl mx-auto p-4 space-y-3">
          <Skeleton className="h-10 w-full rounded-lg" />
          <Skeleton className="h-28 w-full rounded-xl" />
          <Skeleton className="h-28 w-full rounded-xl" />
        </div>
      </div>
    );
  }

  const { activeJobs, completedJobs, cancelledJobs } = data;

  return (
    <div className="flex flex-1 flex-col">
      <PageHeader title="My Jobs" />

      <div className="w-full max-w-xl md:max-w-2xl mx-auto px-4 py-3">
        <Tabs defaultValue="active" className="w-full space-y-4">
          <TabsList className="grid grid-cols-3 w-full h-11 bg-muted/70 p-1 rounded-xl">
            <TabsTrigger value="active" className="text-xs rounded-lg font-semibold data-[state=active]:bg-card data-[state=active]:text-foreground">
              Active ({activeJobs.length})
            </TabsTrigger>
            <TabsTrigger value="completed" className="text-xs rounded-lg font-semibold data-[state=active]:bg-card data-[state=active]:text-foreground">
              Completed ({completedJobs.length})
            </TabsTrigger>
            <TabsTrigger value="cancelled" className="text-xs rounded-lg font-semibold data-[state=active]:bg-card data-[state=active]:text-foreground">
              Disputed ({cancelledJobs.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-3 pt-1">
            {activeJobs.length > 0 ? (
              activeJobs.map((job) => (
                <JobListItem
                  key={job.id}
                  job={job}
                  pro={getProForJob(job)}
                  onClick={() => navigate(ROUTES.CUSTOMER_JOB_DETAIL(job.id))}
                />
              ))
            ) : (
              <EmptyState
                icon={Briefcase}
                title="No active jobs"
                description="When you hire a tradesperson, progress and updates appear here."
                actionLabel="Find a professional"
                onAction={() => navigate(ROUTES.CUSTOMER_HOME)}
              />
            )}
          </TabsContent>

          <TabsContent value="completed" className="space-y-3 pt-1">
            {completedJobs.length > 0 ? (
              completedJobs.map((job) => (
                <JobListItem
                  key={job.id}
                  job={job}
                  pro={getProForJob(job)}
                  onClick={() => navigate(ROUTES.CUSTOMER_JOB_DETAIL(job.id))}
                />
              ))
            ) : (
              <EmptyState
                icon={CheckCircle2}
                title="No completed jobs"
                description="Jobs marked complete after your final sign-off are archived here."
                actionLabel="Find a professional"
                onAction={() => navigate(ROUTES.CUSTOMER_HOME)}
              />
            )}
          </TabsContent>

          <TabsContent value="cancelled" className="space-y-3 pt-1">
            {cancelledJobs.length > 0 ? (
              cancelledJobs.map((job) => (
                <JobListItem
                  key={job.id}
                  job={job}
                  pro={getProForJob(job)}
                  onClick={() => navigate(ROUTES.CUSTOMER_JOB_DETAIL(job.id))}
                />
              ))
            ) : (
              <EmptyState
                icon={AlertCircle}
                title="No disputes or cancellations"
                description="Disputed jobs currently under review will be listed here."
                actionLabel="Find a professional"
                onAction={() => navigate(ROUTES.CUSTOMER_HOME)}
              />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
