import React from 'react';
import { Clock, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatETB, formatRelativeTime } from '@/lib/format';
import { useDemoStore } from '@/store/demoStore';
import type { Dispute } from '@/types';

interface DisputeListItemProps {
  dispute: Dispute;
  onClick: () => void;
}

export const DisputeListItem: React.FC<DisputeListItemProps> = ({ dispute, onClick }) => {
  const { jobs } = useDemoStore();
  const job = jobs.find((j) => j.id === dispute.jobId);
  const amountETB = job?.activeQuote?.totalAmountETB || 1650;

  const isResolved =
    dispute.status === 'resolved_refund' ||
    dispute.status === 'resolved_payout' ||
    dispute.status === 'closed';

  return (
    <Card
      onClick={onClick}
      className="border-border shadow-xs hover:border-primary/50 hover:bg-muted/10 transition-colors cursor-pointer"
    >
      <CardContent className="p-4 space-y-2.5">
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-foreground">
                {dispute.referenceNumber}
              </span>
              <Badge
                variant={isResolved ? 'outline' : 'destructive'}
                className={`text-[10px] ${
                  isResolved
                    ? 'border-primary/30 text-primary bg-primary/5'
                    : 'bg-destructive/10 text-destructive border-destructive/20'
                }`}
              >
                {dispute.status === 'opened' && 'New Dispute'}
                {dispute.status === 'under_review' && 'Under Mediation'}
                {dispute.status === 'resolved_refund' && 'Resolved (Customer)'}
                {dispute.status === 'resolved_payout' && 'Resolved (Pro)'}
                {dispute.status === 'closed' && 'Closed'}
              </Badge>
            </div>
            <h4 className="text-xs font-bold text-foreground">
              {job?.title || 'Contracted Service Job'}
            </h4>
          </div>
          <div className="text-right shrink-0">
            <span className="text-xs font-extrabold text-foreground">
              {formatETB(amountETB)}
            </span>
            <p className="text-[10px] text-muted-foreground flex items-center justify-end gap-1 mt-0.5">
              <Clock className="h-2.5 w-2.5" />
              {formatRelativeTime(dispute.createdAt)}
            </p>
          </div>
        </div>

        {/* Reason */}
        <div className="flex items-center justify-between text-xs pt-1 border-t border-border/60">
          <span className="text-muted-foreground font-medium truncate pr-2">
            Reason: <strong className="text-foreground">{dispute.reason}</strong>
          </span>
          <ChevronRight className="h-4 w-4 text-muted-foreground/60 shrink-0" />
        </div>
      </CardContent>
    </Card>
  );
};
