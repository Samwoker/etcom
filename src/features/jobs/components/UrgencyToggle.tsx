import React from 'react';
import { Zap, Clock, Calendar, CalendarDays } from 'lucide-react';
import type { UrgencyOption } from '@/types';

interface UrgencyToggleProps {
  value: UrgencyOption;
  onChange: (value: UrgencyOption) => void;
}

const OPTIONS: {
  value: UrgencyOption;
  label: string;
  detail: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  { value: 'asap', label: 'ASAP', detail: 'Within 2 hrs', icon: Zap },
  { value: 'today', label: 'Today', detail: 'Same day', icon: Clock },
  { value: 'few_days', label: 'In a few days', detail: 'This week', icon: Calendar },
  { value: 'flexible', label: 'Flexible', detail: 'Anytime', icon: CalendarDays },
];

export const UrgencyToggle: React.FC<UrgencyToggleProps> = ({
  value,
  onChange,
}) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-foreground">
          When do you need it done?
        </label>
        <span className="text-[11px] text-muted-foreground">Select response timing</span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {OPTIONS.map((opt) => {
          const Icon = opt.icon;
          const isSelected = value === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange(opt.value)}
              className={`flex flex-col items-start justify-between p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                isSelected
                  ? 'border-primary bg-secondary/30 shadow-2xs text-primary'
                  : 'border-border/80 bg-card hover:bg-muted/40 hover:border-border text-foreground'
              }`}
            >
              <div className="flex items-center justify-between w-full mb-1">
                <Icon className={`h-4 w-4 ${isSelected ? 'text-primary' : 'text-muted-foreground'}`} />
                {isSelected && <span className="h-1.5 w-1.5 rounded-full bg-primary" />}
              </div>
              <div>
                <span className={`text-xs font-semibold block ${isSelected ? 'text-primary' : 'text-foreground'}`}>
                  {opt.label}
                </span>
                <span className="text-[10px] text-muted-foreground block">
                  {opt.detail}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
