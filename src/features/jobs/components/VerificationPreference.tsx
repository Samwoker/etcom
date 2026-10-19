import React from 'react';
import { ShieldCheck, Award, Users } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import type { VerificationPreferenceOption } from '@/types';

interface VerificationPreferenceProps {
  value: VerificationPreferenceOption;
  onChange: (value: VerificationPreferenceOption) => void;
}

const PREFERENCES = [
  {
    value: 'verified_skills' as VerificationPreferenceOption,
    title: 'Verified skills preferred',
    description: 'Prioritize pros with verified technical certificates & licenses',
    icon: Award,
  },
  {
    value: 'identity_verified' as VerificationPreferenceOption,
    title: 'At least identity-verified',
    description: 'Pros with verified National ID / Kebele documentation',
    icon: ShieldCheck,
  },
  {
    value: 'all' as VerificationPreferenceOption,
    title: 'Show all with clear labels',
    description: 'Include newly registered pros with transparent badge status',
    icon: Users,
  },
];

export const VerificationPreference: React.FC<VerificationPreferenceProps> = ({
  value,
  onChange,
}) => {
  return (
    <div className="space-y-2.5">
      <div className="space-y-0.5">
        <label className="text-sm font-medium text-foreground">
          Verification Preference
        </label>
        <p className="text-xs text-muted-foreground">
          Etcom never hides verification status. Choose your match criteria:
        </p>
      </div>

      <RadioGroup
        value={value}
        onValueChange={(val) => onChange(val as VerificationPreferenceOption)}
        className="gap-2.5"
      >
        {PREFERENCES.map((pref) => {
          const Icon = pref.icon;
          const isSelected = value === pref.value;
          return (
            <div
              key={pref.value}
              onClick={() => onChange(pref.value)}
              className={`flex items-start gap-3 rounded-2xl border p-3 cursor-pointer transition-all ${
                isSelected
                  ? 'border-primary bg-secondary/20 shadow-xs'
                  : 'border-border bg-card hover:border-primary/40'
              }`}
            >
              <RadioGroupItem
                value={pref.value}
                id={pref.value}
                className="mt-0.5 text-primary border-primary shrink-0"
              />
              <div className="flex-1">
                <div className="flex items-center gap-1.5">
                  <Icon className="h-4 w-4 text-primary shrink-0" />
                  <Label
                    htmlFor={pref.value}
                    className="text-xs font-semibold text-foreground cursor-pointer"
                  >
                    {pref.title}
                  </Label>
                </div>
                <p className="text-[11px] text-muted-foreground mt-0.5 leading-snug">
                  {pref.description}
                </p>
              </div>
            </div>
          );
        })}
      </RadioGroup>
    </div>
  );
};
