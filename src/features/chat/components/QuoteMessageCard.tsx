import React from 'react';
import { FileText, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatETB } from '@/lib/format';
import type { QuoteStatus } from '@/types';

interface QuoteMessageCardProps {
  amountETB: number;
  status?: QuoteStatus;
  scopeDescription?: string;
  onViewQuote: () => void;
}

export const QuoteMessageCard: React.FC<QuoteMessageCardProps> = ({
  amountETB,
  status = 'quoted',
  scopeDescription,
  onViewQuote,
}) => {
  return (
    <Card className="w-full max-w-xs border-border bg-card shadow-sm overflow-hidden">
      <CardContent className="p-3.5 space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
            <FileText className="h-4 w-4 text-primary" />
            <span>Official Price Offer</span>
          </div>
          <Badge
            variant="outline"
            className="text-[10px] capitalize bg-primary/10 text-primary border-primary/20"
          >
            {status === 'quoted'
              ? 'Offered'
              : status === 'accepted'
              ? 'Agreed'
              : status === 'negotiating'
              ? 'Discussing'
              : status}
          </Badge>
        </div>

        <div>
          <span className="text-[11px] text-muted-foreground block">Agreed / Proposed total</span>
          <span className="text-xl font-bold tracking-tight text-foreground">
            {formatETB(amountETB)}
          </span>
        </div>

        {scopeDescription && (
          <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
            {scopeDescription}
          </p>
        )}

        <Button
          type="button"
          size="sm"
          onClick={onViewQuote}
          className="w-full h-8 text-xs font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-emerald-600 gap-1"
        >
          <span>Review Price Offer</span>
          <ChevronRight className="h-3.5 w-3.5" />
        </Button>
      </CardContent>
    </Card>
  );
};
