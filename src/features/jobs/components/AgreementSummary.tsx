import React from 'react';
import { User, MapPin, Calendar, Wrench, ShieldCheck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { formatETB, formatDate } from '@/lib/format';
import type { Job, Professional } from '@/types';

interface AgreementSummaryProps {
  job: Job;
  pro?: Professional | null;
}

export const AgreementSummary: React.FC<AgreementSummaryProps> = ({ job, pro }) => {
  const quote = job.activeQuote;
  const total = quote?.totalAmountETB || 0;

  return (
    <Card className="border-border shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold text-foreground">Service Agreement Summary</CardTitle>
          <span className="text-[11px] text-muted-foreground">Etcom Verified Job</span>
        </div>
      </CardHeader>

      <CardContent className="space-y-3 pt-0 text-xs">
        {/* Professional Info */}
        <div className="flex items-center justify-between p-2.5 rounded-xl bg-muted/50 border border-border">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <User className="h-4 w-4" />
            </div>
            <div>
              <p className="font-semibold text-foreground">{pro?.fullName || 'Assigned Professional'}</p>
              <p className="text-[11px] text-muted-foreground">{pro?.trade || job.category} • {pro?.subCity || job.subCity}</p>
            </div>
          </div>
          <ShieldCheck className="h-4 w-4 text-primary" />
        </div>

        {/* Scope */}
        <div className="space-y-1">
          <span className="text-[11px] font-medium text-muted-foreground">Agreed Scope of Work</span>
          <p className="text-foreground leading-relaxed">{quote?.scopeDescription || job.description}</p>
        </div>

        {/* Schedule & Location */}
        <div className="grid grid-cols-2 gap-2 pt-1 text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 shrink-0" />
            <span>{job.scheduledDate ? formatDate(job.scheduledDate) : 'Today'}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            <span>{job.subCity}, Addis Ababa</span>
          </div>
        </div>

        <Separator />

        {/* Price Breakdown */}
        <div className="space-y-1.5">
          {quote && (
            <>
              <div className="flex justify-between text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Wrench className="h-3 w-3" />
                  Labor
                </span>
                <span className="font-medium text-foreground">{formatETB(quote.laborAmountETB)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Materials</span>
                <span className="font-medium text-foreground">{formatETB(quote.materialsAmountETB)}</span>
              </div>
            </>
          )}
          <div className="flex justify-between items-baseline pt-1 border-t border-border/60">
            <span className="font-semibold text-foreground text-sm">Total Agreed Price</span>
            <span className="font-bold text-base text-foreground tracking-tight">{formatETB(total)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
