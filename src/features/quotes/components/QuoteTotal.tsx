import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { formatETB } from '@/lib/format';

interface QuoteTotalProps {
  laborETB: number;
  materialsETB: number;
}

export const QuoteTotal: React.FC<QuoteTotalProps> = ({ laborETB, materialsETB }) => {
  const total = laborETB + materialsETB;

  return (
    <Card className="border-border bg-muted/30 shadow-xs">
      <CardContent className="p-3.5 space-y-2 text-xs">
        <div className="flex justify-between items-center text-muted-foreground">
          <span>Labor total</span>
          <span className="font-mono">{formatETB(laborETB)}</span>
        </div>
        <div className="flex justify-between items-center text-muted-foreground">
          <span>Materials & supplies</span>
          <span className="font-mono">{formatETB(materialsETB)}</span>
        </div>
        <div className="pt-2 border-t border-border flex justify-between items-center">
          <span className="font-bold text-foreground">Total Price Offer</span>
          <span className="text-base font-extrabold text-foreground font-mono">
            {formatETB(total)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};
