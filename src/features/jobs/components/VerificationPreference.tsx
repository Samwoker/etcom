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
    badge: 'TVET & License',
    description: 'Prioritize pros with verified technical certificates & trade assessments',
    icon: Award,
  },
  {
    value: 'identity_verified' as VerificationPreferenceOption,
    title: 'At least identity-verified',
    badge: 'Fayda National ID',
    description: 'Pros with verified Ethiopian National ID (Fayda) or Kebele documentation',
    icon: ShieldCheck,
  },
  {
    value: 'all' as VerificationPreferenceOption,
    title: 'Show all with clear labels',
    badge: 'All Providers',
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
        <label className="text-xs font-semibold text-foreground">
          Verification Matching Preference
        </label>
        <p className="text-[11px] text-muted-foreground">
          Etcom never hides verification status. Choose your match criteria:
        </p>
      </div>

      <RadioGroup
        value={value}
        onValueChange={(val) => onChange(val as VerificationPreferenceOption)}
        className="gap-2"
      >
        {PREFERENCES.map((pref) => {
          const Icon = pref.icon;
          const isSelected = value === pref.value;
          return (
            <div
              key={pref.value}
              onClick={() => onChange(pref.value)}
              className={`flex items-start gap-3 rounded-xl border p-3 cursor-pointer transition-all ${
                isSelected
                  ? 'border-primary bg-secondary/30 shadow-2xs'
                  : 'border-border/80 bg-card hover:bg-muted/30 hover:border-border'
              }`}
            >
              <RadioGroupItem
                value={pref.value}
                id={pref.value}
                className="mt-0.5 text-primary border-primary shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <Icon className="h-3.5 w-3.5 text-primary shrink-0" />
                    <Label
                      htmlFor={pref.value}
                      className="text-xs font-semibold text-foreground cursor-pointer truncate"
                    >
                      {pref.title}
                    </Label>
                  </div>
                  <span className="shrink-0 text-[10px] font-medium px-2 py-0.5 rounded-full bg-secondary text-primary border border-primary/20">
                    {pref.badge}
                  </span>
                </div>
                <p className="text-[11px] text-muted-foreground mt-1 leading-snug">
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
