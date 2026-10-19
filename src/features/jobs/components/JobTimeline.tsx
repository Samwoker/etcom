import React from 'react';
import { CheckCircle2, Circle, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Job } from '@/types';

interface JobTimelineProps {
  job: Job;
}

export const JobTimeline: React.FC<JobTimelineProps> = ({ job }) => {
  const isRequestDone = true;
  const isQuoteDone = job.quoteStatus === 'accepted';
  const isPaidDone = job.paymentStatus === 'confirmed';
  const isWorkDone = job.completionStatus === 'completed' || job.completionStatus === 'awaiting_confirmation';
  const isWorkInProgress = job.completionStatus === 'in_progress';
  const isCompleteDone = job.completionStatus === 'completed';

  const steps = [
    {
      title: 'Request initiated',
      desc: 'Service requirements submitted and matched.',
      status: isRequestDone ? 'done' : 'upcoming',
    },
    {
      title: 'Price agreed',
      desc: job.activeQuote ? 'Work and pricing approved.' : 'Waiting for price agreement.',
      status: isQuoteDone ? 'done' : 'current',
    },
    {
      title: 'Payment confirmed',
      desc:
        job.paymentStatus === 'confirmed'
          ? 'M-PESA funds verified.'
          : job.paymentStatus === 'failed'
          ? 'Payment failed. Action required.'
          : 'Due upon agreement.',
      status: isPaidDone ? 'done' : isQuoteDone ? 'current' : 'upcoming',
    },
    {
      title: 'Work in progress',
      desc:
        job.completionStatus === 'awaiting_confirmation'
          ? 'Professional finished work. Awaiting your sign-off.'
          : job.completionStatus === 'in_progress'
          ? 'Tradesperson actively performing service.'
          : 'Scheduled after payment confirmation.',
      status: isWorkDone ? 'done' : isWorkInProgress ? 'current' : 'upcoming',
    },
    {
      title: 'Completed & reviewed',
      desc: isCompleteDone
        ? 'Customer signed off and review submitted.'
        : 'Final sign-off unlocks customer rating.',
      status: isCompleteDone ? 'done' : 'upcoming',
    },
  ];

  return (
    <Card className="border-border shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-1.5">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <CardTitle className="text-sm font-semibold text-foreground">Lifecycle Timeline</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 pt-0">
        <div className="relative pl-6 space-y-4 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-border">
          {steps.map((step, idx) => (
            <div key={idx} className="relative flex items-start gap-3">
              <div
                className={`absolute -left-6 top-0.5 h-5 w-5 rounded-full flex items-center justify-center bg-background border ${
                  step.status === 'done'
                    ? 'border-primary text-primary'
                    : step.status === 'current'
                    ? 'border-primary ring-2 ring-primary/20 text-primary'
                    : 'border-muted text-muted-foreground/40'
                }`}
              >
                {step.status === 'done' ? (
                  <CheckCircle2 className="h-3.5 w-3.5 fill-primary text-primary-foreground" />
                ) : (
                  <Circle className="h-2.5 w-2.5 fill-current" />
                )}
              </div>
              <div className="space-y-0.5">
                <p className={`text-xs font-semibold ${step.status === 'upcoming' ? 'text-muted-foreground' : 'text-foreground'}`}>
                  {step.title}
                </p>
                <p className="text-[11px] text-muted-foreground leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
