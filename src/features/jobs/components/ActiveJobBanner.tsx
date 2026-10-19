import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { JobStatusStrip } from '@/components/shared/JobStatusStrip';
import { useActiveJob } from '../hooks/useActiveJob';
import { ROUTES } from '@/app/routes';

export const ActiveJobBanner: React.FC = () => {
  const navigate = useNavigate();
  const { activeJob, isLoading } = useActiveJob();

  if (isLoading) {
    return (
      <div className="h-20 w-full rounded-2xl border border-border p-3.5 space-y-2 bg-card">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-3 w-2/3" />
      </div>
    );
  }

  // Hidden when no active job
  if (!activeJob) {
    return null;
  }

  return (
    <Card
      role="button"
      tabIndex={0}
      onClick={() => navigate(ROUTES.CUSTOMER_JOB_DETAIL(activeJob.id))}
      className="group cursor-pointer rounded-2xl border border-primary/40 bg-secondary/30 p-0 transition-all hover:border-primary hover:shadow-md active:scale-[0.99]"
      aria-label="View active job"
    >
      <CardContent className="p-3.5 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-primary">
            <Clock className="h-3.5 w-3.5" />
            <span>Active Job in Progress</span>
          </div>
          <ChevronRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-0.5" />
        </div>

        <div>
          <h3 className="text-sm font-semibold text-foreground truncate">
            {activeJob.title}
          </h3>
          <p className="text-xs text-muted-foreground truncate">
            {activeJob.subCity} • {activeJob.category}
          </p>
        </div>

        <JobStatusStrip
          quoteStatus={activeJob.quoteStatus}
          paymentStatus={activeJob.paymentStatus}
          completionStatus={activeJob.completionStatus}
        />
      </CardContent>
    </Card>
  );
};
