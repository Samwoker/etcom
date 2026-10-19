import React from 'react';
import { ChevronRight, Calendar } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { JobStatusStrip } from '@/components/shared/JobStatusStrip';
import { formatETB, formatRelativeTime } from '@/lib/format';
import type { Job, Professional } from '@/types';

interface JobListItemProps {
  job: Job;
  pro?: Professional | null;
  onClick: () => void;
}

export const JobListItem: React.FC<JobListItemProps> = ({ job, pro, onClick }) => {
  const initials = pro?.fullName
    ? pro.fullName
        .split(' ')
        .map((n) => n[0])
        .join('')
        .slice(0, 2)
    : 'ET';

  const agreedAmount = job.activeQuote?.totalAmountETB;

  return (
    <Card
      onClick={onClick}
      className="border-border shadow-sm hover:border-primary/40 hover:bg-muted/20 transition-all cursor-pointer active:scale-[0.99]"
    >
      <CardContent className="p-3.5 space-y-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <Avatar className="h-10 w-10 border border-border shrink-0">
              <AvatarImage src={pro?.avatarUrl} alt={pro?.fullName || 'Pro'} />
              <AvatarFallback className="text-xs font-semibold bg-muted">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <h3 className="text-sm font-bold text-foreground truncate">
                {job.title}
              </h3>
              <p className="text-xs text-muted-foreground truncate">
                {pro?.fullName || 'Tradesperson'} • {job.category}
              </p>
            </div>
          </div>

          <div className="text-right shrink-0">
            {agreedAmount ? (
              <span className="text-sm font-bold text-foreground block">
                {formatETB(agreedAmount)}
              </span>
            ) : (
              <span className="text-xs text-muted-foreground block">Pending price offer</span>
            )}
            <div className="flex items-center gap-1 text-[11px] text-muted-foreground justify-end mt-0.5">
              <Calendar className="h-3 w-3" />
              <span>{formatRelativeTime(job.createdAt)}</span>
            </div>
          </div>
        </div>

        <div className="pt-2 border-t border-border/60 flex items-center justify-between gap-2">
          <div className="flex-1 min-w-0 overflow-x-auto no-scrollbar">
            <JobStatusStrip
              quoteStatus={job.quoteStatus}
              paymentStatus={job.paymentStatus}
              completionStatus={job.completionStatus}
            />
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
        </div>
      </CardContent>
    </Card>
  );
};
