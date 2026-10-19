import React from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { formatETB } from '@/lib/format';
import type { PaymentTerms } from '@/types';

interface PaymentTermsPickerProps {
  totalAmountETB: number;
  selectedTerms: PaymentTerms;
  onTermsChange: (terms: PaymentTerms) => void;
}

export const PaymentTermsPicker: React.FC<PaymentTermsPickerProps> = ({
  totalAmountETB,
  selectedTerms,
  onTermsChange,
}) => {
  const depositAmount = Math.round(totalAmountETB * 0.4);
  const balanceAmount = totalAmountETB - depositAmount;

  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-foreground">Select Payment Terms</span>
        <span className="text-[11px] text-muted-foreground">M-PESA on confirmation</span>
      </div>

      <RadioGroup
        value={selectedTerms}
        onValueChange={(val) => onTermsChange(val as PaymentTerms)}
        className="grid gap-2.5"
      >
        {/* Option 1: Full Payment */}
        <Card
          className={`cursor-pointer transition-all border ${
            selectedTerms === 'full'
              ? 'border-primary ring-1 ring-primary bg-primary/5'
              : 'border-border bg-card hover:border-border/80'
          }`}
          onClick={() => onTermsChange('full')}
        >
          <CardContent className="p-3.5 flex items-start gap-3">
            <RadioGroupItem value="full" id="terms-full" className="mt-0.5" />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <Label htmlFor="terms-full" className="text-xs font-semibold text-foreground cursor-pointer">
                  Pay full amount
                </Label>
                <span className="text-xs font-bold text-foreground">{formatETB(totalAmountETB)}</span>
              </div>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                Pay the entire agreed amount now via M-PESA.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Option 2: 40% Deposit Split */}
        <Card
          className={`cursor-pointer transition-all border ${
            selectedTerms === 'deposit_split'
              ? 'border-primary ring-1 ring-primary bg-primary/5'
              : 'border-border bg-card hover:border-border/80'
          }`}
          onClick={() => onTermsChange('deposit_split')}
        >
          <CardContent className="p-3.5 flex items-start gap-3">
            <RadioGroupItem value="deposit_split" id="terms-split" className="mt-0.5" />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <Label htmlFor="terms-split" className="text-xs font-semibold text-foreground cursor-pointer">
                  Deposit now, balance after completion
                </Label>
                <span className="text-xs font-bold text-foreground">{formatETB(depositAmount)}</span>
              </div>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                Pay 40% deposit ({formatETB(depositAmount)}) now. Balance of {formatETB(balanceAmount)} due upon completed work.
              </p>
            </div>
          </CardContent>
        </Card>
      </RadioGroup>

      <p className="text-[11px] text-muted-foreground pt-1 leading-snug">
        Phone numbers and direct contacts stay private until payment terms are confirmed.
      </p>
    </div>
  );
};
