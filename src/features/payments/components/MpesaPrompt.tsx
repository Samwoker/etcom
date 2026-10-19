import React, { useEffect, useState } from 'react';
import { Smartphone, Loader2, ShieldCheck } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface MpesaPromptProps {
  phone: string;
  amountETB: number;
}

export const MpesaPrompt: React.FC<MpesaPromptProps> = ({ phone }) => {
  const [progress, setProgress] = useState(10);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) return 95;
        return prev + 15;
      });
    }, 450);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-1 flex-col items-center justify-center text-center p-6 space-y-6 max-w-sm mx-auto">
      <div className="relative flex items-center justify-center">
        <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center text-primary animate-pulse">
          <Smartphone className="h-10 w-10 text-primary" />
        </div>
        <div className="absolute -bottom-1 -right-1 bg-background rounded-full p-1 border border-border shadow-sm">
          <Loader2 className="h-5 w-5 text-primary animate-spin" />
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-xl font-bold tracking-tight text-foreground">Check your phone</h2>
        <p className="text-xs text-muted-foreground leading-relaxed">
          An M-PESA USSD prompt has been sent to <span className="font-semibold text-foreground">{phone}</span>.
        </p>
        <p className="text-xs font-medium text-foreground bg-muted/60 p-2.5 rounded-xl border border-border">
          Enter your M-PESA PIN on your mobile device to authorize payment.
        </p>
      </div>

      <div className="w-full space-y-2">
        <Progress value={progress} className="h-2 w-full" />
        <span className="text-[11px] text-muted-foreground block">
          Awaiting confirmation from Safaricom network...
        </span>
      </div>

      <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground pt-4">
        <ShieldCheck className="h-3.5 w-3.5 text-primary" />
        <span>Do not close this window until authorization completes</span>
      </div>
    </div>
  );
};
