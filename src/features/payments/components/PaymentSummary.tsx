import React from 'react';
import { Smartphone, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatETB } from '@/lib/format';
import { calculateJobFinancials } from '@/lib/calculations';
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
  const labor = job.actualLaborETB || job.activeQuote?.laborAmountETB || amountDueETB;
  const materials = job.actualMaterialsETB || job.activeQuote?.materialsAmountETB || 0;
  const fin = calculateJobFinancials(labor, materials);

  return (
    <Card className="border-border shadow-sm overflow-hidden rounded-2xl">
      <div className="bg-primary/10 px-4 py-3 flex items-center justify-between border-b border-primary/20">
        <div className="flex items-center gap-2">
          <Smartphone className="h-4 w-4 text-primary" />
          <span className="text-xs font-semibold text-foreground">M-PESA On-Site Payment</span>
        </div>
        <Badge variant="outline" className="text-[10px] bg-background text-primary border-primary/30 font-medium">
          Pay on Completion
        </Badge>
      </div>

      <CardContent className="p-4 space-y-3.5">
        <div className="text-center py-1">
          <span className="text-xs text-muted-foreground block">Total Amount to Pay</span>
          <span className="text-3xl font-extrabold tracking-tight text-foreground block mt-0.5">
            {formatETB(fin.customerTotalETB)}
          </span>
          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium mt-0.5 inline-flex items-center gap-1">
            <CheckCircle2 className="h-3 w-3" />
            Work completed and verified on site
          </span>
        </div>

        {/* Itemized Price Details */}
        <div className="p-3 rounded-xl bg-muted/40 border border-border space-y-1.5 text-xs">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Professional</span>
            <span className="font-semibold text-foreground">{pro?.fullName || 'Assigned Tradesperson'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Service</span>
            <span className="font-medium text-foreground">{job.category} ({job.subCity})</span>
          </div>
          <div className="border-t border-border/50 pt-1.5 flex justify-between">
            <span className="text-muted-foreground">Agreed Labor</span>
            <span className="font-medium text-foreground">{formatETB(fin.laborAmountETB)}</span>
          </div>
          {fin.materialsAmountETB > 0 && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Materials (0% fee reimbursement)</span>
              <span className="font-medium text-foreground">{formatETB(fin.materialsAmountETB)}</span>
            </div>
          )}
          <div className="border-t border-border/50 pt-1.5 flex justify-between text-[11px] text-muted-foreground">
            <span>Platform Commission (8% on labor, deducted from pro payout)</span>
            <span className="font-medium">{formatETB(fin.platformFeeETB)}</span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground">
          <ShieldCheck className="h-3.5 w-3.5 text-primary" />
          <span>Enter your M-PESA PIN when the USSD prompt appears on your phone</span>
        </div>
      </CardContent>
    </Card>
  );
};
