import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { JobStatusStrip } from '@/components/shared/JobStatusStrip';
import { formatETB } from '@/lib/format';
import type { Job, Professional } from '@/types';

interface JobHeaderProps {
  job: Job;
  pro?: Professional | null;
}

export const JobHeader: React.FC<JobHeaderProps> = ({ job, pro }) => {
  const initials = pro?.fullName
    ? pro.fullName
        .split(' ')
        .map((n) => n[0])
        .join('')
        .slice(0, 2)
    : 'ET';

  const agreedAmount = job.activeQuote?.totalAmountETB;

  return (
    <Card className="border-border shadow-sm">
      <CardContent className="p-4 space-y-3">
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12 border border-border">
            <AvatarImage src={pro?.avatarUrl} alt={pro?.fullName || 'Pro'} />
            <AvatarFallback className="font-semibold text-xs bg-muted">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h2 className="text-base font-bold text-foreground truncate">
              {pro?.fullName || 'Assigned Tradesperson'}
            </h2>
            <p className="text-xs text-muted-foreground truncate">
              {job.category} • {job.subCity}
            </p>
          </div>
          {agreedAmount && (
            <div className="text-right shrink-0">
              <span className="text-[11px] text-muted-foreground block">Agreed</span>
              <span className="text-sm font-bold text-foreground">
                {formatETB(agreedAmount)}
              </span>
            </div>
          )}
        </div>

        <div className="pt-2 border-t border-border/60">
          <JobStatusStrip
            quoteStatus={job.quoteStatus}
            paymentStatus={job.paymentStatus}
            completionStatus={job.completionStatus}
          />
        </div>
      </CardContent>
    </Card>
  );
};
