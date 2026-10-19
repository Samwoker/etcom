import React from 'react';
import { CheckCircle2, XCircle, ArrowRight, RotateCcw, Copy } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatETB } from '@/lib/format';

interface PaymentResultProps {
  success: boolean;
  amountETB: number;
  transactionCode?: string;
  errorMessage?: string;
  onTrackJob: () => void;
  onRetry: () => void;
}

export const PaymentResult: React.FC<PaymentResultProps> = ({
  success,
  amountETB,
  transactionCode,
  errorMessage,
  onTrackJob,
  onRetry,
}) => {
  if (success) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center text-center p-4 space-y-6 max-w-sm mx-auto">
        <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center text-primary">
          <CheckCircle2 className="h-12 w-12 text-primary" />
        </div>

        <div className="space-y-1.5">
          <Badge className="bg-primary text-primary-foreground hover:bg-primary/90 text-xs px-3 py-1">
            Payment Confirmed
          </Badge>
          <h2 className="text-2xl font-bold tracking-tight text-foreground pt-1">
            {formatETB(amountETB)}
          </h2>
          <p className="text-xs text-muted-foreground">
            Successfully received via Safaricom M-PESA
          </p>
        </div>

        <Card className="w-full border-border bg-card shadow-sm text-xs">
          <CardContent className="p-3.5 space-y-2">
            <div className="flex justify-between items-center text-muted-foreground">
              <span>M-PESA Receipt</span>
              <span className="font-mono font-bold text-foreground flex items-center gap-1">
                {transactionCode || 'QJK78492X'}
                <Copy className="h-3 w-3 opacity-60" />
              </span>
            </div>
            <div className="flex justify-between items-center text-muted-foreground">
              <span>Status</span>
              <span className="font-semibold text-primary">Confirmed</span>
            </div>
          </CardContent>
        </Card>

        <p className="text-xs text-muted-foreground leading-relaxed">
          The tradesperson has been notified and job tracking is now active.
        </p>

        <Button
          onClick={onTrackJob}
          className="w-full h-12 rounded-full font-semibold bg-primary text-primary-foreground hover:bg-primary/90 gap-2 shadow-sm"
        >
          <span>Track job</span>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center text-center p-4 space-y-6 max-w-sm mx-auto">
      <div className="h-20 w-20 rounded-full bg-destructive/10 flex items-center justify-center text-destructive">
        <XCircle className="h-12 w-12 text-destructive" />
      </div>

      <div className="space-y-1.5">
        <Badge variant="outline" className="border-destructive/30 text-destructive text-xs px-3 py-1 bg-destructive/5">
          Transaction Failed
        </Badge>
        <h2 className="text-xl font-bold tracking-tight text-foreground pt-1">Payment Unsuccessful</h2>
        <p className="text-xs text-muted-foreground leading-relaxed">
          {errorMessage || 'The M-PESA prompt was cancelled or timed out. No funds were deducted.'}
        </p>
      </div>

      <Button
        onClick={onRetry}
        className="w-full h-12 rounded-full font-semibold bg-primary text-primary-foreground hover:bg-primary/90 gap-2 shadow-sm"
      >
        <RotateCcw className="h-4 w-4" />
        <span>Try again</span>
      </Button>
    </div>
  );
};
