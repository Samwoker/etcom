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
    <Card className="border-border shadow-sm bg-gradient-to-br from-card to-muted/20">
      <CardContent className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
            <Wallet className="h-4 w-4 text-primary" />
            <span>Monthly M-PESA Earnings</span>
          </div>
          <span className="text-[10px] font-mono text-muted-foreground">October 2026</span>
        </div>

        <div>
          <h3 className="text-2xl font-black tracking-tight text-foreground">
            {formatETB(monthlyEarningsETB)}
          </h3>
          <p className="text-[11px] text-muted-foreground mt-0.5">
            Directly received to Safaricom wallet
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-1 border-t border-border/50 text-xs">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-primary" />
            <div>
              <span className="font-bold text-foreground block">{completedJobsCount}</span>
              <span className="text-[10px] text-muted-foreground">Finished jobs</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
            <div>
              <span className="font-bold text-foreground block">
                {rating > 0 ? rating.toFixed(1) : 'New'}
              </span>
              <span className="text-[10px] text-muted-foreground">({reviewCount} reviews)</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
