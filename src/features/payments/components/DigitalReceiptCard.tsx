import React from 'react';
import { CheckCircle2, Printer, ShieldCheck, Share2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { formatETB, formatDate } from '@/lib/format';
import type { DigitalReceipt } from '@/types';
import { toast } from 'sonner';

interface DigitalReceiptCardProps {
  receipt: DigitalReceipt;
  viewerRole?: 'customer' | 'professional' | 'admin';
  onClose?: () => void;
}

export const DigitalReceiptCard: React.FC<DigitalReceiptCardProps> = ({
  receipt,
  onClose,
}) => {
  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `Etcom Receipt - ${receipt.transactionCode}`,
          text: `Payment Receipt for ${receipt.jobTitle}. Total: ${receipt.totalCustomerPaidETB} ETB.`,
        })
        .catch(() => {});
    } else {
      navigator.clipboard?.writeText(
        `Etcom Receipt: ${receipt.transactionCode} | Total: ${receipt.totalCustomerPaidETB} ETB | Job: ${receipt.jobTitle}`
      );
      toast.success('Receipt summary copied to clipboard');
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto border border-border shadow-md rounded-2xl bg-card overflow-hidden">
      {/* Official Header Strip */}
      <div className="bg-primary text-primary-foreground p-4 text-center space-y-1">
        <div className="flex items-center justify-center gap-1.5">
          <ShieldCheck className="h-5 w-5" />
          <span className="font-bold text-sm tracking-wide uppercase">
            Official Etcom Digital Receipt
          </span>
        </div>
        <p className="text-[11px] opacity-90">Delivered via M-PESA Platform</p>
      </div>

      <CardHeader className="pt-4 pb-2 text-center space-y-1">
        <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
          <CheckCircle2 className="h-6 w-6" />
        </div>
        <CardTitle className="text-lg font-bold text-foreground">
          {formatETB(receipt.totalCustomerPaidETB)}
        </CardTitle>
        <div className="flex items-center justify-center gap-2 pt-0.5">
          <Badge variant="outline" className="text-[10px] bg-primary/5 text-primary border-primary/30">
            {receipt.paymentMethod}
          </Badge>
          <span className="text-[11px] font-mono text-muted-foreground">
            {receipt.transactionCode}
          </span>
        </div>
      </CardHeader>

      <CardContent className="px-5 py-3 space-y-4 text-xs">
        {/* Meta Info */}
        <div className="grid grid-cols-2 gap-2 text-muted-foreground border-y border-border py-2.5">
          <div>
            <span className="text-xs text-muted-foreground block">Customer</span>
            <span className="font-semibold text-foreground text-xs">{receipt.customerName}</span>
          </div>
          <div className="text-right">
            <span className="text-xs text-muted-foreground block">Professional</span>
            <span className="font-semibold text-foreground text-xs">{receipt.proName}</span>
            <span className="text-xs block text-muted-foreground">{receipt.proTrade}</span>
          </div>
          <div>
            <span className="text-xs text-muted-foreground block">Job Reference</span>
            <span className="font-medium text-foreground text-xs truncate block">{receipt.jobTitle}</span>
          </div>
          <div className="text-right">
            <span className="text-xs text-muted-foreground block">Date & Time</span>
            <span className="font-medium text-foreground text-xs">
              {formatDate(receipt.paidAt)}
            </span>
          </div>
        </div>

        {/* Itemized Financial Breakdown */}
        <div className="space-y-2">
          <div className="flex justify-between text-muted-foreground text-xs">
            <span>Agreed Labor Charge</span>
            <span className="font-semibold text-foreground tabular-nums">{formatETB(receipt.laborAmountETB)}</span>
          </div>

          <div className="flex justify-between text-muted-foreground text-xs">
            <span className="flex items-center gap-1.5">
              <span>Materials Reimbursement</span>
              <Badge variant="outline" className="text-xs px-1.5 py-0 border-border text-muted-foreground">0% fee</Badge>
            </span>
            <span className="font-semibold text-foreground tabular-nums">{formatETB(receipt.materialsAmountETB)}</span>
          </div>

          <Separator className="my-1.5" />

          {/* Customer View: Total paid */}
          <div className="flex justify-between font-bold text-sm text-foreground pt-0.5">
            <span>Total Customer Paid</span>
            <span className="tabular-nums">{formatETB(receipt.totalCustomerPaidETB)}</span>
          </div>

          {/* Platform fee & Pro Payout transparency */}
          <div className="mt-2.5 p-3 rounded-xl bg-muted/40 border border-border space-y-1.5 text-xs">
            <div className="flex justify-between text-muted-foreground">
              <span>Etcom Platform Fee (8% of labor)</span>
              <span className="font-medium text-destructive tabular-nums">-{formatETB(receipt.platformFeeETB)}</span>
            </div>
            <div className="flex justify-between text-foreground font-semibold pt-1 border-t border-border/40">
              <span>Professional Net Payout (92% labor + 100% materials)</span>
              <span className="text-primary font-bold tabular-nums">{formatETB(receipt.professionalPayoutETB)}</span>
            </div>
          </div>
        </div>

        {/* Bottom Verification Note */}
        <p className="text-xs text-center text-muted-foreground leading-relaxed pt-1">
          This digital receipt verifies a completed on-platform job. This transaction is permanently recorded to the professional&apos;s portfolio.
        </p>

        {/* Action Controls */}
        <div className="flex items-center gap-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleShare}
            className="flex-1 h-9 rounded-xl text-xs gap-1.5 border-border"
          >
            <Share2 className="h-3.5 w-3.5" />
            <span>Share</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handlePrint}
            className="flex-1 h-9 rounded-xl text-xs gap-1.5 border-border"
          >
            <Printer className="h-3.5 w-3.5" />
            <span>Print</span>
          </Button>

          {onClose && (
            <Button
              size="sm"
              onClick={onClose}
              className="flex-1 h-9 rounded-xl text-xs font-semibold bg-primary text-primary-foreground hover:bg-emerald-600"
            >
              Done
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
