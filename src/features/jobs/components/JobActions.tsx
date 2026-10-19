import React, { useState } from 'react';
import { MessageSquare, AlertTriangle, Phone, Lock, FileText } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SimulatedCallModal } from '@/components/shared/SimulatedCallModal';
import type { Job, Professional } from '@/types';

interface JobActionsProps {
  job: Job;
  pro?: Professional | null;
  onOpenChat: () => void;
  onViewReceipt?: () => void;
  onReportProblem: () => void;
}

export const JobActions: React.FC<JobActionsProps> = ({
  job,
  pro,
  onOpenChat,
  onViewReceipt,
  onReportProblem,
}) => {
  const [callModalOpen, setCallModalOpen] = useState(false);

  const showContact = Boolean(job.contactRevealed || job.quoteStatus === 'accepted');
  const isPaid = job.paymentStatus === 'confirmed';

  return (
    <div className="space-y-3">
      {/* Contact Section: In-App Masked Voice */}
      <Card className="border-border shadow-xs rounded-2xl">
        <CardContent className="p-3.5 flex items-center justify-between gap-3 text-xs">
          {showContact && pro ? (
            <>
              <div className="flex items-center gap-2.5">
                <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Phone className="h-4 w-4" />
                </div>
                <div>
                  <span className="font-semibold text-foreground block">{pro.fullName}</span>
                  <span className="text-[11px] text-muted-foreground">In-App Voice • Masked</span>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCallModalOpen(true)}
                className="h-8 rounded-full text-xs gap-1 border-primary/40 text-primary hover:bg-primary/5 px-3"
              >
                <span>Call in App</span>
              </Button>
            </>
          ) : (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Lock className="h-4 w-4 shrink-0 text-muted-foreground" />
              <span className="text-xs">Direct calling unlocked upon agreement confirmation</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* If job is completed & paid: Show Digital Receipt action */}
      {isPaid && job.receipt && onViewReceipt && (
        <Button
          onClick={onViewReceipt}
          className="w-full h-11 rounded-xl font-semibold bg-primary text-primary-foreground hover:bg-emerald-600 gap-2 shadow-xs"
        >
          <FileText className="h-4 w-4" />
          <span>View M-PESA Digital Receipt</span>
        </Button>
      )}

      {/* Secondary Actions: Open Chat and Report Issue */}
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          onClick={onOpenChat}
          className="flex-1 h-10 rounded-xl text-xs font-semibold gap-1.5 border-border"
        >
          <MessageSquare className="h-4 w-4" />
          <span>Open Chat Thread</span>
        </Button>

        <Button
          variant="ghost"
          onClick={onReportProblem}
          className="h-10 px-3 rounded-xl text-xs text-destructive hover:bg-destructive/10 gap-1"
        >
          <AlertTriangle className="h-3.5 w-3.5" />
          <span>Report issue</span>
        </Button>
      </div>

      <SimulatedCallModal
        open={callModalOpen}
        onOpenChange={setCallModalOpen}
        contactName={pro?.fullName || 'Professional Tradesperson'}
        contactTrade={pro?.trade || job.category}
        avatarUrl={pro?.avatarUrl}
      />
    </div>
  );
};
