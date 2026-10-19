import React from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

export const DISPUTE_REASONS = [
  'Professional did not arrive',
  'Work incomplete',
  'Price changed without approval',
  'Payment problem',
  'Other',
] as const;

interface ReasonPickerProps {
  value: string;
  onChange: (reason: string) => void;
}

export const ReasonPicker: React.FC<ReasonPickerProps> = ({ value, onChange }) => {
  return (
    <div className="space-y-2.5">
      <div className="space-y-0.5">
        <Label className="text-xs font-semibold text-foreground">
          What went wrong? <span className="text-destructive">*</span>
        </Label>
        <p className="text-[11px] text-muted-foreground">
          Select the primary issue for our review team.
        </p>
      </div>

      <RadioGroup
        value={value}
        onValueChange={onChange}
        className="space-y-2"
      >
        {DISPUTE_REASONS.map((reason) => {
          const isSelected = value === reason;
          return (
            <label
              key={reason}
              htmlFor={`reason-${reason}`}
              className={`flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
                isSelected
                  ? 'border-primary bg-primary/5 ring-1 ring-primary/20'
                  : 'border-border bg-card hover:bg-muted/40'
              }`}
            >
              <RadioGroupItem
                value={reason}
                id={`reason-${reason}`}
                className="shrink-0"
              />
              <span className="text-xs font-medium text-foreground cursor-pointer">
                {reason}
              </span>
            </label>
          );
        })}
      </RadioGroup>
    </div>
  );
};
