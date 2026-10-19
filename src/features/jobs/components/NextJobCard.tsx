import React from 'react';
import { Calendar, MapPin, ArrowRight, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatETB } from '@/lib/format';
import type { Job } from '@/types';

interface NextJobCardProps {
  job?: Job | null;
  customerName?: string;
  onClick: () => void;
}

export const NextJobCard: React.FC<NextJobCardProps> = ({
  job,
  customerName = 'Customer',
  onClick,
}) => {
  if (!job) {
    return (
      <Card className="border-border shadow-sm">
        <CardContent className="p-4 text-center py-6 text-xs text-muted-foreground space-y-1">
          <Clock className="h-6 w-6 text-muted-foreground/60 mx-auto mb-1" />
          <p className="font-semibold text-foreground">No upcoming jobs</p>
          <p className="text-[11px]">When quotes are accepted, your scheduled work appears here.</p>
        </CardContent>
      </Card>
    );
  }

  const amount = job.activeQuote?.totalAmountETB;

  return (
    <Card className="border-border shadow-sm hover:border-primary/40 transition-colors">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xs font-semibold text-foreground flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 text-primary" />
            <span>Next Scheduled Job</span>
          </CardTitle>
          <span className="text-[11px] font-mono font-bold text-primary">
            {job.scheduledDate || 'Today'}
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 pt-0">
        <div className="flex items-start justify-between gap-3 text-xs">
          <div className="space-y-0.5">
            <h4 className="font-bold text-foreground">{job.title}</h4>
            <p className="text-muted-foreground text-[11px]">
              {customerName} • {job.category}
            </p>
            <div className="flex items-center gap-1 text-[11px] text-muted-foreground pt-0.5">
              <MapPin className="h-3 w-3" />
              <span>{job.subCity} Sub-City</span>
            </div>
          </div>
          {amount && (
            <div className="text-right shrink-0">
              <span className="text-[10px] text-muted-foreground block">Agreed</span>
              <span className="font-bold text-foreground text-sm">{formatETB(amount)}</span>
            </div>
          )}
        </div>

        <Button
          onClick={onClick}
          size="sm"
          className="w-full h-8 text-xs rounded-full gap-1 bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <span>Open job details</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Button>
      </CardContent>
    </Card>
  );
};
