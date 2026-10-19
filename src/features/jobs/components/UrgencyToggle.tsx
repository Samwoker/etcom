import React from 'react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import type { UrgencyOption } from '@/types';

interface UrgencyToggleProps {
  value: UrgencyOption;
  onChange: (value: UrgencyOption) => void;
}

const OPTIONS: { value: UrgencyOption; label: string }[] = [
  { value: 'asap', label: 'ASAP' },
  { value: 'today', label: 'Today' },
  { value: 'few_days', label: 'In a few days' },
  { value: 'flexible', label: 'Flexible' },
];

export const UrgencyToggle: React.FC<UrgencyToggleProps> = ({
  value,
  onChange,
}) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">
        When do you need it done?
      </label>
      <ToggleGroup
        type="single"
        value={value}
        onValueChange={(val) => {
          if (val) onChange(val as UrgencyOption);
        }}
        className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full"
      >
        {OPTIONS.map((opt) => (
          <ToggleGroupItem
            key={opt.value}
            value={opt.value}
            className="h-10 rounded-xl text-xs font-medium border border-border data-[state=on]:bg-primary data-[state=on]:text-primary-foreground data-[state=on]:border-primary"
          >
            {opt.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
};
