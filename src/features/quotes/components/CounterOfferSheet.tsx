import React, { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface CounterOfferSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentAmount: number;
  onSendCounter: (amount: number, message: string) => void;
  isSubmitting?: boolean;
}

export const CounterOfferSheet: React.FC<CounterOfferSheetProps> = ({
  open,
  onOpenChange,
  currentAmount,
  onSendCounter,
  isSubmitting = false,
}) => {
  const [proposedAmount, setProposedAmount] = useState(String(Math.round(currentAmount * 0.9)));
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const num = Number(proposedAmount);
    if (!num || num <= 0 || isSubmitting) return;
    onSendCounter(num, message.trim());
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="rounded-t-2xl max-w-xl md:max-w-2xl mx-auto px-4 pb-8">
        <SheetHeader className="text-left pt-2 pb-2">
          <SheetTitle className="text-base font-semibold text-foreground">Suggest Different Price</SheetTitle>
          <SheetDescription className="text-xs text-muted-foreground">
            Suggest a price that fits your budget. The tradesperson will review and reply.
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div className="space-y-1.5">
            <Label htmlFor="counter-amount" className="text-xs font-medium text-foreground">
              Your Proposed Price (ETB)
            </Label>
            <div className="relative">
              <Input
                id="counter-amount"
                type="number"
                min="100"
                step="50"
                value={proposedAmount}
                onChange={(e) => setProposedAmount(e.target.value)}
                className="h-10 text-sm font-semibold pr-12 rounded-lg"
                required
              />
              <span className="absolute right-3 top-2.5 text-xs font-medium text-muted-foreground">
                ETB
              </span>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="counter-message" className="text-xs font-medium text-foreground">
              Reason / Message for Professional (Optional)
            </Label>
            <Textarea
              id="counter-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="e.g. Can we adjust the scope to fit this budget?"
              className="text-xs min-h-[80px] rounded-lg resize-none"
            />
          </div>

          <SheetFooter className="flex-row gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1 h-10 rounded-full text-xs"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || !proposedAmount}
              className="flex-1 h-10 rounded-full text-xs font-semibold bg-primary text-primary-foreground hover:bg-emerald-600"
            >
              {isSubmitting ? 'Sending...' : 'Send Price Suggestion'}
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
};
