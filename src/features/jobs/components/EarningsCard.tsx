import React from 'react';
import { Wallet, Star, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { formatETB } from '@/lib/format';

interface EarningsCardProps {
  monthlyEarningsETB: number;
  completedJobsCount: number;
  rating: number;
  reviewCount: number;
}

export const EarningsCard: React.FC<EarningsCardProps> = ({
  monthlyEarningsETB,
  completedJobsCount,
  rating,
  reviewCount,
}) => {
  return (
    <Card className="border border-border/80 shadow-xs bg-card">
      <CardContent className="p-4 space-y-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
            <Wallet className="h-4 w-4 text-primary" />
            <span>Monthly M-PESA Earnings</span>
          </div>
          <span className="text-xs font-medium text-muted-foreground">October 2026</span>
        </div>

        <div>
          <h3 className="text-2xl font-bold tracking-tight text-foreground tabular-nums">
            {formatETB(monthlyEarningsETB)}
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Directly received to Safaricom wallet
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-border text-xs">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-primary" />
            <div>
              <span className="font-semibold text-foreground block tabular-nums">{completedJobsCount}</span>
              <span className="text-xs text-muted-foreground">Finished jobs</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
            <div>
              <span className="font-semibold text-foreground block tabular-nums">
                {rating > 0 ? rating.toFixed(1) : 'New'}
              </span>
              <span className="text-xs text-muted-foreground">({reviewCount} reviews)</span>
            </div>
          </div>
        </div>

        {/* Payout & Commission Policy Transparency */}
        <div className="p-3 rounded-xl bg-muted/50 border border-border/60 text-xs space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Platform commission</span>
            <span className="text-foreground font-medium">8% on labor only</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Materials reimbursement</span>
            <span className="text-foreground font-medium">100% (0% fee)</span>
          </div>
          <div className="flex items-center justify-between pt-1.5 border-t border-border/40">
            <span className="text-muted-foreground">Payout schedule</span>
            <span className="text-primary font-semibold">Instant B2C to M-PESA</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
