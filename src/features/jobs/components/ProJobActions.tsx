import React, { useState } from 'react';
import { Play, CheckCircle2, MessageSquare, Edit3, Clock, AlertTriangle, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { StartJobModal } from './StartJobModal';
import { FinishJobModal } from './FinishJobModal';
import { WorkTimer } from './WorkTimer';
import type { Job } from '@/types';

interface ProJobActionsProps {
  job: Job;
  onOpenChat: () => void;
  onReviseQuote: () => void;
  onStartWorkWithScope: (laborETB: number, materialsETB: number, reason?: string) => void;
  onFinishWorkWithPhotos: (photos: string[], durationMinutes: number) => void;
  onReportIssue: () => void;
}

export const ProJobActions: React.FC<ProJobActionsProps> = ({
  job,
  onOpenChat,
  onReviseQuote,
  onStartWorkWithScope,
  onFinishWorkWithPhotos,
  onReportIssue,
}) => {
  const [startModalOpen, setStartModalOpen] = useState(false);
  const [finishModalOpen, setFinishModalOpen] = useState(false);

  const isNotStarted = job.completionStatus === 'not_started';
  const isInProgress = job.completionStatus === 'in_progress';
  const isAwaitingConfirm = job.completionStatus === 'awaiting_confirmation';
  const isCompleted = job.completionStatus === 'completed';

  const elapsedMinutes = job.startedAt
    ? Math.max(1, Math.round((Date.now() - new Date(job.startedAt).getTime()) / 60000))
    : 45;

  return (
    <div className="space-y-3">
      {/* Live Timer if work is in progress */}
      {isInProgress && <WorkTimer startedAt={job.startedAt} />}

      {/* Primary Lifecycle CTA */}
      {isNotStarted && (
        <Button
          onClick={() => setStartModalOpen(true)}
          className="w-full h-12 rounded-xl font-semibold bg-primary text-primary-foreground hover:bg-emerald-600 gap-2 shadow-sm"
        >
          <Play className="h-4 w-4" />
          <span>Confirm Scope & Start Job On Site</span>
        </Button>
      )}

      {isInProgress && (
        <Button
          onClick={() => setFinishModalOpen(true)}
          className="w-full h-12 rounded-xl font-semibold bg-primary text-primary-foreground hover:bg-emerald-600 gap-2 shadow-sm"
        >
          <CheckCircle2 className="h-4 w-4" />
          <span>Finish Work & Upload After Photos</span>
        </Button>
      )}

      {isAwaitingConfirm && (
        <Card className="border-border bg-primary/5 border-primary/20 rounded-2xl">
          <CardContent className="p-3.5 text-center text-xs space-y-1">
            <div className="flex items-center justify-center gap-1.5 font-semibold text-primary">
              <Clock className="h-4 w-4 animate-pulse" />
              <span>Awaiting Customer PIN Payment</span>
            </div>
            <p className="text-muted-foreground text-[11px]">
              Prompt customer on-site to review after-photos and authorize M-PESA USSDPush PIN payment.
            </p>
          </CardContent>
        </Card>
      )}

      {isCompleted && (
        <Card className="border-border bg-primary/10 border-primary/30 rounded-2xl">
          <CardContent className="p-3.5 text-center text-xs flex items-center justify-center gap-2 text-primary font-semibold">
            <ShieldCheck className="h-4 w-4 text-primary" />
            <span>Job Completed & Paid. M-PESA payout confirmed. Added to your portfolio.</span>
          </CardContent>
        </Card>
      )}

      {/* Secondary Quick Actions */}
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          onClick={onOpenChat}
          className="flex-1 h-10 rounded-xl text-xs font-semibold gap-1.5 border-border"
        >
          <MessageSquare className="h-4 w-4" />
          <span>Open Chat</span>
        </Button>

        {!isCompleted && isNotStarted && (
          <Button
            variant="outline"
            onClick={onReviseQuote}
            className="flex-1 h-10 rounded-xl text-xs font-semibold gap-1.5 border-border"
          >
            <Edit3 className="h-4 w-4" />
            <span>Update Quote</span>
          </Button>
        )}

        <Button
          variant="ghost"
          onClick={onReportIssue}
          className="h-10 px-2.5 rounded-xl text-xs text-destructive hover:bg-destructive/10"
        >
          <AlertTriangle className="h-3.5 w-3.5" />
        </Button>
      </div>

      <StartJobModal
        open={startModalOpen}
        onOpenChange={setStartModalOpen}
        job={job}
        onStart={onStartWorkWithScope}
      />

      <FinishJobModal
        open={finishModalOpen}
        onOpenChange={setFinishModalOpen}
        job={job}
        elapsedMinutes={elapsedMinutes}
        onFinish={onFinishWorkWithPhotos}
      />
    </div>
  );
};
