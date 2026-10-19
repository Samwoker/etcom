import React from 'react';
import { Play, CheckCircle2, MessageSquare, Edit3, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import type { Job } from '@/types';

interface ProJobActionsProps {
  job: Job;
  onOpenChat: () => void;
  onReviseQuote: () => void;
  onStartWork: () => void;
  onMarkFinished: () => void;
}

export const ProJobActions: React.FC<ProJobActionsProps> = ({
  job,
  onOpenChat,
  onReviseQuote,
  onStartWork,
  onMarkFinished,
}) => {
  const isPaid = job.paymentStatus === 'confirmed';
  const isNotStarted = job.completionStatus === 'not_started';
  const isInProgress = job.completionStatus === 'in_progress';
  const isAwaitingConfirm = job.completionStatus === 'awaiting_confirmation';
  const isCompleted = job.completionStatus === 'completed';

  return (
    <div className="space-y-3">
      {/* Primary Lifecycle CTA */}
      {isNotStarted && isPaid && (
        <Button
          onClick={onStartWork}
          className="w-full h-11 rounded-full font-semibold bg-primary text-primary-foreground hover:bg-primary/90 gap-2 shadow-sm"
        >
          <Play className="h-4 w-4" />
          <span>Start Work</span>
        </Button>
      )}

      {isInProgress && (
        <Button
          onClick={onMarkFinished}
          className="w-full h-11 rounded-full font-semibold bg-primary text-primary-foreground hover:bg-primary/90 gap-2 shadow-sm"
        >
          <CheckCircle2 className="h-4 w-4" />
          <span>Mark Job Complete</span>
        </Button>
      )}

      {isAwaitingConfirm && (
        <Card className="border-border bg-muted/30">
          <CardContent className="p-3 text-center text-xs flex items-center justify-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4 text-primary animate-pulse" />
            <span>Work marked complete. Awaiting customer sign-off & review.</span>
          </CardContent>
        </Card>
      )}

      {isCompleted && (
        <Card className="border-border bg-primary/5 border-primary/20">
          <CardContent className="p-3 text-center text-xs flex items-center justify-center gap-2 text-primary font-semibold">
            <CheckCircle2 className="h-4 w-4 text-primary" />
            <span>Job completed & verified by customer. M-PESA payout confirmed.</span>
          </CardContent>
        </Card>
      )}

      {/* Secondary Quick Actions */}
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          onClick={onOpenChat}
          className="flex-1 h-10 rounded-full text-xs font-semibold gap-1.5 border-border"
        >
          <MessageSquare className="h-4 w-4" />
          <span>Open Chat</span>
        </Button>

        {!isCompleted && (
          <Button
            variant="outline"
            onClick={onReviseQuote}
            className="flex-1 h-10 rounded-full text-xs font-semibold gap-1.5 border-border"
          >
            <Edit3 className="h-4 w-4" />
            <span>Update Price Offer</span>
          </Button>
        )}
      </div>
    </div>
  );
};
