import React from 'react';
import { MessageSquare, CreditCard, CheckCircle2, AlertTriangle, Phone, Lock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatEthiopianPhone } from '@/lib/format';
import type { Job, Professional } from '@/types';

interface JobActionsProps {
  job: Job;
  pro?: Professional | null;
  onOpenChat: () => void;
  onPayNow: () => void;
  onMarkComplete: () => void;
  onReportProblem: () => void;
}

export const JobActions: React.FC<JobActionsProps> = ({
  job,
  pro,
  onOpenChat,
  onPayNow,
  onMarkComplete,
  onReportProblem,
}) => {
  const isUnpaid = job.paymentStatus === 'unpaid' || job.paymentStatus === 'failed';
  const isAwaitingConfirmation = job.completionStatus === 'awaiting_confirmation';
  const showContact = Boolean(job.contactRevealed || job.quoteStatus === 'accepted' || job.paymentStatus === 'confirmed');

  return (
    <div className="space-y-4">
      {/* Contact Section */}
      <Card className="border-border shadow-sm">
        <CardContent className="p-3.5 flex items-center justify-between gap-3 text-xs">
          {showContact && pro?.phone ? (
            <>
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Phone className="h-4 w-4" />
                </div>
                <div>
                  <span className="text-[11px] text-muted-foreground block">Tradesperson Phone</span>
                  <span className="font-semibold text-foreground">{formatEthiopianPhone(pro.phone)}</span>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                asChild
                className="h-8 rounded-full text-xs gap-1 border-primary/40 text-primary hover:bg-primary/5"
              >
                <a href={`tel:${pro.phone.replace(/\s+/g, '')}`}>Call</a>
              </Button>
            </>
          ) : (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Lock className="h-4 w-4 shrink-0 text-muted-foreground" />
              <span className="text-xs">Direct phone unlocked upon agreement confirmation</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Primary Contextual Action */}
      <div className="space-y-2">
        {isAwaitingConfirmation && (
          <Button
            onClick={onMarkComplete}
            className="w-full h-11 rounded-full font-semibold bg-primary text-primary-foreground hover:bg-primary/90 gap-2 shadow-sm"
          >
            <CheckCircle2 className="h-4 w-4" />
            <span>Review & Mark as Complete</span>
          </Button>
        )}

        {isUnpaid && job.quoteStatus === 'accepted' && (
          <Button
            onClick={onPayNow}
            className="w-full h-11 rounded-full font-semibold bg-primary text-primary-foreground hover:bg-primary/90 gap-2 shadow-sm"
          >
            <CreditCard className="h-4 w-4" />
            <span>Pay with M-PESA</span>
          </Button>
        )}

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={onOpenChat}
            className="flex-1 h-10 rounded-full text-xs font-semibold gap-1.5 border-border"
          >
            <MessageSquare className="h-4 w-4" />
            <span>Open Chat</span>
          </Button>

          <Button
            variant="ghost"
            onClick={onReportProblem}
            className="h-10 px-3 rounded-full text-xs text-destructive hover:text-destructive gap-1"
          >
            <AlertTriangle className="h-3.5 w-3.5" />
            <span>Report a problem</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
