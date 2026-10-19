import React, { useState } from 'react';
import {
  AlertTriangle,
  MessageSquare,
  CreditCard,
  User,
  Wrench,
  HelpCircle,
  CheckCircle2,
  XCircle,
} from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { formatETB, formatRelativeTime } from '@/lib/format';
import type { Dispute, Job, Professional, Customer, Message } from '@/types';

interface DisputeDetailSheetProps {
  dispute: Dispute | null;
  isOpen: boolean;
  onClose: () => void;
  context: {
    job?: Job;
    pro?: Professional;
    customer?: Customer;
    messages: Message[];
  } | null;
  onResolve: (
    action: 'request_info' | 'resolve_customer' | 'resolve_pro',
    note: string
  ) => void;
}

export const DisputeDetailSheet: React.FC<DisputeDetailSheetProps> = ({
  dispute,
  isOpen,
  onClose,
  context,
  onResolve,
}) => {
  const [note, setNote] = useState('');
  const [noteError, setNoteError] = useState<string | null>(null);

  if (!dispute) return null;

  const job = context?.job;
  const pro = context?.pro;
  const customer = context?.customer;
  const messages = context?.messages || [];
  const isResolved =
    dispute.status === 'resolved_refund' ||
    dispute.status === 'resolved_payout' ||
    dispute.status === 'closed';

  const handleAction = (action: 'request_info' | 'resolve_customer' | 'resolve_pro') => {
    if (!note.trim()) {
      setNoteError('A detailed arbitration note is required for this decision.');
      return;
    }
    setNoteError(null);
    onResolve(action, note);
  };

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-lg overflow-y-auto p-0 flex flex-col gap-0 bg-background"
      >
        <SheetHeader className="p-4 border-b border-border bg-card sticky top-0 z-10">
          <div className="flex items-center justify-between gap-2 pr-6">
            <span className="text-xs font-mono font-bold text-foreground">
              {dispute.referenceNumber}
            </span>
            <Badge
              variant={isResolved ? 'outline' : 'destructive'}
              className="text-[10px]"
            >
              {dispute.status}
            </Badge>
          </div>
          <SheetTitle className="text-sm font-bold text-foreground text-left mt-1">
            {dispute.reason}
          </SheetTitle>
          <SheetDescription className="text-xs text-muted-foreground text-left">
            Filed {formatRelativeTime(dispute.createdAt)} on {job?.title || 'Contracted Service'}
          </SheetDescription>
        </SheetHeader>

        <div className="p-4 space-y-4 flex-1">
          {/* Dispute Context: Job & Payment Status */}
          <Card className="border-border shadow-2xs bg-muted/20">
            <CardContent className="p-3 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground flex items-center gap-1.5 font-medium">
                  <CreditCard className="h-3.5 w-3.5 text-primary" />
                  M-PESA Payment Status
                </span>
                <Badge className="bg-primary/10 text-primary border-primary/20 text-[10px]">
                  {job?.paymentStatus === 'confirmed' ? 'Payment Confirmed' : 'Deposit Held'}
                </Badge>
              </div>
              <div className="flex items-center justify-between font-semibold border-t border-border/50 pt-1.5">
                <span>Agreed Total / Deposit</span>
                <span>{formatETB(job?.activeQuote?.totalAmountETB || 1650)}</span>
              </div>
            </CardContent>
          </Card>

          {/* Customer & Professional Identifiers */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 rounded-xl border border-border/80 bg-card space-y-1">
              <span className="text-[11px] font-semibold text-muted-foreground flex items-center gap-1">
                <User className="h-3 w-3 text-primary" />
                Customer
              </span>
              <p className="font-bold text-foreground truncate">
                {customer?.fullName || 'Verified Customer'}
              </p>
              <p className="text-[10px] text-muted-foreground">Phone verified</p>
            </div>
            <div className="p-2.5 rounded-xl border border-border/80 bg-card space-y-1">
              <span className="text-[11px] font-semibold text-muted-foreground flex items-center gap-1">
                <Wrench className="h-3 w-3 text-primary" />
                Professional
              </span>
              <p className="font-bold text-foreground truncate">
                {pro?.fullName || 'Assigned Professional'}
              </p>
              <p className="text-[10px] text-muted-foreground">{pro?.trade || 'Tradesperson'}</p>
            </div>
          </div>

          {/* Customer's Reported Issue */}
          <div className="space-y-1.5 p-3 rounded-xl border border-destructive/20 bg-destructive/5 text-xs">
            <span className="font-bold text-destructive flex items-center gap-1">
              <AlertTriangle className="h-3.5 w-3.5" />
              Customer's Dispute Statement
            </span>
            <p className="text-foreground leading-relaxed">
              "{dispute.description}"
            </p>
          </div>

          {/* Evidence Photos */}
          {dispute.photos && dispute.photos.length > 0 && (
            <div className="space-y-1.5">
              <h5 className="text-xs font-bold text-foreground">Submitted Evidence Photos</h5>
              <div className="flex gap-2 overflow-x-auto pb-1">
                {dispute.photos.map((photo, idx) => (
                  <img
                    key={idx}
                    src={photo}
                    alt="Dispute evidence"
                    className="h-20 w-20 object-cover rounded-lg border border-border shrink-0"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Chat Excerpt */}
          <div className="space-y-2">
            <h5 className="text-xs font-bold text-foreground flex items-center gap-1.5">
              <MessageSquare className="h-3.5 w-3.5 text-primary" />
              <span>Job Chat Excerpt ({messages.length} messages)</span>
            </h5>
            <div className="space-y-2 max-h-48 overflow-y-auto rounded-xl border border-border/70 p-2.5 bg-muted/10 text-xs">
              {messages.length === 0 ? (
                <p className="text-[11px] text-muted-foreground text-center py-2">
                  No chat messages logged for this job.
                </p>
              ) : (
                messages.map((m) => (
                  <div
                    key={m.id}
                    className={`p-2 rounded-lg text-xs leading-relaxed ${
                      m.senderRole === 'customer'
                        ? 'bg-muted/40 ml-4 border border-border/60'
                        : m.senderRole === 'professional'
                        ? 'bg-primary/5 mr-4 border border-primary/20'
                        : 'bg-muted/80 text-center font-mono text-[10px]'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] text-muted-foreground mb-0.5">
                      <span className="font-semibold uppercase tracking-wider">
                        {m.senderRole}
                      </span>
                      <span>{formatRelativeTime(m.timestamp)}</span>
                    </div>
                    <p className="text-foreground">{m.text}</p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Existing Resolution Note if already resolved */}
          {dispute.resolutionNote && (
            <div className="p-3 rounded-xl border border-primary/30 bg-primary/5 text-xs space-y-1">
              <span className="font-bold text-primary flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Arbitration Record
              </span>
              <p className="text-foreground leading-relaxed">{dispute.resolutionNote}</p>
            </div>
          )}

          {/* Arbitration Decision Section (when not yet resolved) */}
          {!isResolved && (
            <div className="space-y-3 pt-2 border-t border-border">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <Label htmlFor="arbitration-note" className="font-bold text-foreground">
                    Arbitration Note <span className="text-destructive">*</span>
                  </Label>
                  <span className="text-[11px] text-destructive font-medium">Mandatory</span>
                </div>
                <Textarea
                  id="arbitration-note"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Detail findings, mediation review, and arbitration rationale..."
                  rows={3}
                  className="text-xs resize-none leading-relaxed bg-background"
                />
                {noteError && (
                  <p className="text-[11px] text-destructive font-medium">{noteError}</p>
                )}
              </div>

              <div className="space-y-2 pt-1">
                <Button
                  onClick={() => handleAction('request_info')}
                  variant="outline"
                  className="w-full text-xs h-9 justify-start gap-2 border-border"
                >
                  <HelpCircle className="h-3.5 w-3.5 text-amber-500" />
                  Ask both sides for info
                </Button>
                <Button
                  onClick={() => handleAction('resolve_customer')}
                  variant="outline"
                  className="w-full text-xs h-9 justify-start gap-2 border-border hover:border-destructive/40 hover:text-destructive"
                >
                  <XCircle className="h-3.5 w-3.5 text-destructive" />
                  Resolve in favour of customer
                </Button>
                <Button
                  onClick={() => handleAction('resolve_pro')}
                  className="w-full text-xs h-9 justify-start gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Resolve in favour of professional
                </Button>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
