import React from 'react';
import { Button } from '@/components/ui/button';
import type { QuoteStatus } from '@/types';

interface QuoteActionToolbarProps {
  status: QuoteStatus;
  isSubmitting: boolean;
  onAccept: () => void;
  onNegotiate: () => void;
  onDecline: () => void;
  onContinue: () => void;
}

export const QuoteActionToolbar: React.FC<QuoteActionToolbarProps> = ({
  status,
  isSubmitting,
  onAccept,
  onNegotiate,
  onDecline,
  onContinue,
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-20 mx-auto w-full max-w-xl md:max-w-2xl border-t border-border bg-background/95 p-4 backdrop-blur pb-safe">
      {status === 'accepted' ? (
        <Button
          onClick={onContinue}
          className="w-full h-12 rounded-full font-semibold bg-primary text-primary-foreground hover:bg-emerald-600"
        >
          Continue to Confirm Deal
        </Button>
      ) : (
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            disabled={isSubmitting}
            onClick={onDecline}
            className="h-11 px-3.5 rounded-full text-xs text-destructive hover:text-destructive border-border"
          >
            Decline Offer
          </Button>
          <Button
            type="button"
            variant="outline"
            disabled={isSubmitting}
            onClick={onNegotiate}
            className="flex-1 h-11 rounded-full text-xs font-semibold border-border"
          >
            Suggest Other Price
          </Button>
          <Button
            type="button"
            disabled={isSubmitting}
            onClick={onAccept}
            className="flex-1 h-11 rounded-full text-xs font-semibold bg-primary text-primary-foreground hover:bg-emerald-600"
          >
            {isSubmitting ? 'Processing...' : 'Accept Price Offer'}
          </Button>
        </div>
      )}
    </div>
  );
};
