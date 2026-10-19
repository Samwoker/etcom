import React from 'react';
import { Info, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { formatETB, formatDate } from '@/lib/format';
import type { Quote } from '@/types';

interface QuoteBreakdownProps {
  quote: Quote;
  scheduledDate?: string;
}

export const QuoteBreakdown: React.FC<QuoteBreakdownProps> = ({ quote, scheduledDate }) => {
  const getStatusBadge = () => {
    switch (quote.status) {
      case 'accepted':
        return <Badge className="bg-primary text-primary-foreground hover:bg-emerald-600">Accepted</Badge>;
      case 'negotiating':
        return <Badge variant="secondary" className="bg-amber-100 text-amber-900 border-amber-200">Negotiating</Badge>;
      case 'declined':
        return <Badge variant="outline" className="text-muted-foreground bg-muted">Declined</Badge>;
      case 'quoted':
      default:
        return <Badge className="bg-primary text-primary-foreground hover:bg-emerald-600">Official Price Offer</Badge>;
    }
  };

  return (
    <Card className="border-border shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold text-foreground">Price Breakdown</CardTitle>
          {getStatusBadge()}
        </div>
      </CardHeader>
      <CardContent className="space-y-3 pt-0">
        <div className="space-y-1">
          <span className="text-[11px] font-medium text-muted-foreground">What is included</span>
          <p className="text-xs text-foreground leading-relaxed">{quote.scopeDescription}</p>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Clock className="h-3.5 w-3.5" />
          <span>Scheduled service: {scheduledDate ? formatDate(scheduledDate) : 'Upon confirmation'}</span>
        </div>

        <Separator />

        <div className="space-y-2 text-xs">
          <div className="flex justify-between text-muted-foreground">
            <span>Labor cost</span>
            <span className="font-medium text-foreground">{formatETB(quote.laborAmountETB)}</span>
          </div>
          <div className="flex justify-between text-muted-foreground">
            <span>Estimated materials</span>
            <span className="font-medium text-foreground">{formatETB(quote.materialsAmountETB)}</span>
          </div>
          <Separator />
          <div className="flex justify-between items-baseline pt-1">
            <span className="font-semibold text-foreground text-sm">Total Amount</span>
            <span className="font-bold text-lg text-foreground tracking-tight">{formatETB(quote.totalAmountETB)}</span>
          </div>
        </div>

        <Alert className="border-border bg-muted/40 py-2.5">
          <Info className="h-4 w-4 text-muted-foreground" />
          <AlertDescription className="text-xs text-muted-foreground">
            Estimated. Final price follows the agreed job.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
};
