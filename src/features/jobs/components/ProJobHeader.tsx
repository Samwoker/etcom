import React from 'react';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { JobStatusStrip } from '@/components/shared/JobStatusStrip';
import { formatETB } from '@/lib/format';
import type { Job } from '@/types';

interface ProJobHeaderProps {
  job: Job;
  customerFirstName: string;
}

export const ProJobHeader: React.FC<ProJobHeaderProps> = ({
  job,
  customerFirstName,
}) => {
  const agreedAmount = job.activeQuote?.totalAmountETB;
  const isPaid = job.paymentStatus === 'confirmed';

  return (
    <Card className="border-border shadow-sm">
      <CardContent className="p-4 space-y-3">
        <div className="flex items-center justify-between gap-3">
          <div className="space-y-0.5 min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-bold text-foreground truncate">
                {customerFirstName}
              </span>
              <Badge variant="outline" className="text-[10px] py-0 px-1.5 border-primary/40 text-primary gap-0.5">
                <ShieldCheck className="h-3 w-3" />
                Phone verified
              </Badge>
            </div>
            <h2 className="text-base font-bold text-foreground leading-snug truncate">
              {job.title}
            </h2>
            <p className="text-xs text-muted-foreground">{job.category} • {job.subCity}</p>
          </div>

          {agreedAmount && (
            <div className="text-right shrink-0">
              <span className="text-[11px] text-muted-foreground block">Agreed</span>
              <span className="text-base font-bold text-foreground">
                {formatETB(agreedAmount)}
              </span>
              <div className="flex items-center justify-end gap-1 mt-0.5">
                {isPaid ? (
                  <Badge className="bg-primary/10 text-primary border-primary/20 text-[9px] px-1.5 py-0">
                    <CheckCircle2 className="h-2.5 w-2.5 mr-0.5" />
                    Payment confirmed
                  </Badge>
                ) : (
                  <Badge variant="outline" className="text-muted-foreground text-[9px] px-1.5 py-0">
                    Deposit pending
                  </Badge>
                )}
              </div>
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
