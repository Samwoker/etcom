import React from 'react';
import { Smartphone, ShieldCheck } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatETB } from '@/lib/format';
import type { Job, Professional } from '@/types';

interface PaymentSummaryProps {
  job: Job;
  pro?: Professional | null;
  amountDueETB: number;
}

export const PaymentSummary: React.FC<PaymentSummaryProps> = ({
  job,
  pro,
  amountDueETB,
}) => {
  const isDeposit = job.paymentTerms === 'deposit_split';

  return (
    <Card className="border-border shadow-sm overflow-hidden">
      <div className="bg-primary/10 px-4 py-3 flex items-center justify-between border-b border-primary/20">
        <div className="flex items-center gap-2">
          <Smartphone className="h-4 w-4 text-primary" />
          <span className="text-xs font-semibold text-foreground">M-PESA Direct Checkout</span>
        </div>
        <Badge variant="outline" className="text-[10px] bg-background text-primary border-primary/30 font-medium">
          {isDeposit ? '40% Deposit Due' : 'Full Payment Due'}
        </Badge>
      </div>

      <CardContent className="p-4 space-y-3">
        <div className="text-center py-2">
          <span className="text-xs text-muted-foreground block">Amount Due Now</span>
          <span className="text-3xl font-extrabold tracking-tight text-foreground block mt-0.5">
            {formatETB(amountDueETB)}
          </span>
          {isDeposit && job.activeQuote && (
            <span className="text-[11px] text-muted-foreground mt-1 block">
              Remaining {formatETB(job.activeQuote.totalAmountETB - amountDueETB)} due after job completion
            </span>
          )}
        </div>

        <div className="p-2.5 rounded-xl bg-muted/40 border border-border space-y-1 text-xs">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Professional</span>
            <span className="font-semibold text-foreground">{pro?.fullName || 'Assigned Tradesperson'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Service</span>
            <span className="font-medium text-foreground">{job.category} ({job.subCity})</span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground">
          <ShieldCheck className="h-3.5 w-3.5 text-primary" />
          <span>Encrypted payment processed through Safaricom M-PESA</span>
        </div>
      </CardContent>
    </Card>
  );
};
