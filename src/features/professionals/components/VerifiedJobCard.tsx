import React from 'react';
import { MapPin, CheckCircle2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatETB, formatRelativeTime } from '@/lib/format';
import type { Job } from '@/types';

interface VerifiedJobCardProps {
  job: Job;
}

export const VerifiedJobCard: React.FC<VerifiedJobCardProps> = ({ job }) => {
  return (
    <Card className="border-border shadow-xs hover:border-primary/40 transition-colors">
      <CardContent className="p-3.5 space-y-2.5">
        <div className="flex items-center justify-between gap-2">
          <Badge className="bg-primary/10 text-primary border-primary/20 text-[10px] font-semibold gap-1">
            <CheckCircle2 className="h-3 w-3" />
            Confirmed by customer, paid with M-PESA
          </Badge>
          <span className="text-[10px] font-mono text-muted-foreground">
            {formatRelativeTime(job.createdAt)}
          </span>
        </div>

        <div>
          <h4 className="text-xs font-bold text-foreground leading-snug">{job.title}</h4>
          <p className="text-[11px] text-muted-foreground line-clamp-2 leading-relaxed mt-0.5">
            {job.activeQuote?.scopeDescription || job.description}
          </p>
        </div>

        <div className="flex items-center justify-between pt-1 border-t border-border/50 text-[11px]">
          <div className="flex items-center gap-1 text-muted-foreground">
            <MapPin className="h-3 w-3" />
            <span>{job.subCity} Sub-City</span>
          </div>
          {job.activeQuote?.totalAmountETB && (
            <span className="font-bold text-foreground font-mono">
              {formatETB(job.activeQuote.totalAmountETB)}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
