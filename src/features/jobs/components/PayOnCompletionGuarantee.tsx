import React from 'react';
import { ShieldCheck, CheckCircle2, Clock, Banknote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { formatETB } from '@/lib/format';

interface PayOnCompletionGuaranteeProps {
  laborAmountETB: number;
  materialsAmountETB?: number;
}

export const PayOnCompletionGuarantee: React.FC<PayOnCompletionGuaranteeProps> = ({
  laborAmountETB,
  materialsAmountETB = 0,
}) => {
  const total = laborAmountETB + materialsAmountETB;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-foreground">Payment Protection Terms</span>
        <span className="inline-flex items-center gap-1 text-xs font-medium text-primary">
          <ShieldCheck className="h-3.5 w-3.5" />
          Pay on Completion
        </span>
      </div>

      <Card className="border border-border/80 bg-card rounded-2xl overflow-hidden shadow-xs">
        <CardContent className="p-4 space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-xs font-medium text-muted-foreground block">
                Total Due Upon Job Completion
              </span>
              <span className="text-xl font-bold text-foreground tabular-nums">
                {formatETB(total)}
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs font-medium text-emerald-900 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 px-2.5 py-0.5 rounded-full block">
                0 ETB Upfront
              </span>
            </div>
          </div>

          <div className="border-t border-border/50 pt-2.5 space-y-2 text-xs text-muted-foreground">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
              <span>
                <strong>No Advance Payment:</strong> You pay nothing before work starts. Funds stay in your M-PESA wallet.
              </span>
            </div>

            <div className="flex items-start gap-2">
              <Clock className="h-4 w-4 text-primary shrink-0 mt-0.5" />
              <span>
                <strong>Locked Labor Price:</strong> The labor rate of {formatETB(laborAmountETB)} is locked in the system. Any on-site scope change requires your approval.
              </span>
            </div>

            <div className="flex items-start gap-2">
              <Banknote className="h-4 w-4 text-primary shrink-0 mt-0.5" />
              <span>
                <strong>M-PESA USSDPush PIN on Site:</strong> When work is finished and after-photos are approved, you pay on-site with your M-PESA PIN.
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
