import React from 'react';
import { History, ArrowRightLeft, FileCheck, XCircle, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatETB, formatRelativeTime } from '@/lib/format';
import type { QuoteHistoryItem } from '@/types';

interface QuoteHistoryProps {
  history: QuoteHistoryItem[];
}

export const QuoteHistory: React.FC<QuoteHistoryProps> = ({ history }) => {
  if (!history || history.length === 0) {
    return null;
  }

  const getEventIcon = (type: QuoteHistoryItem['type']) => {
    switch (type) {
      case 'countered':
        return <ArrowRightLeft className="h-3.5 w-3.5 text-amber-600" />;
      case 'accepted':
        return <FileCheck className="h-3.5 w-3.5 text-primary" />;
      case 'declined':
        return <XCircle className="h-3.5 w-3.5 text-destructive" />;
      case 'revised':
      case 'quoted':
      default:
        return <FileText className="h-3.5 w-3.5 text-muted-foreground" />;
    }
  };

  return (
    <Card className="border-border shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-1.5">
          <History className="h-4 w-4 text-muted-foreground" />
          <CardTitle className="text-sm font-semibold text-foreground">Price Offer History</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 pt-0">
        <div className="space-y-3">
          {history.map((item, idx) => (
            <div key={item.id || idx} className="flex items-start gap-3 text-xs">
              <div className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-muted border border-border shrink-0">
                {getEventIcon(item.type)}
              </div>
              <div className="flex-1 space-y-0.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-foreground capitalize">
                      {item.type === 'countered'
                        ? 'Price suggested'
                        : item.type === 'quoted'
                        ? 'Offer sent'
                        : item.type === 'revised'
                        ? 'Offer updated'
                        : item.type}
                    </span>
                    <Badge variant="outline" className="text-[10px] py-0 px-1.5 bg-muted">
                      {item.actor}
                    </Badge>
                  </div>
                  <span className="font-semibold text-foreground">{formatETB(item.amountETB)}</span>
                </div>
                {item.message && (
                  <p className="text-muted-foreground leading-snug">{item.message}</p>
                )}
                <span className="text-[10px] text-muted-foreground block">
                  {formatRelativeTime(item.timestamp)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
