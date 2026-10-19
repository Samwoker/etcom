import React from 'react';
import { FileBadge, Wrench, ShieldOff } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

export type EvidenceRoute = 'upload' | 'assessment' | 'no_evidence';

interface EvidenceRoutePickerProps {
  value: EvidenceRoute;
  onChange: (route: EvidenceRoute) => void;
}

export const EvidenceRoutePicker: React.FC<EvidenceRoutePickerProps> = ({
  value,
  onChange,
}) => {
  return (
    <div className="space-y-3">
      <div className="space-y-0.5">
        <Label className="text-xs font-semibold text-foreground">
          Choose How to Prove Your Trade Skills
        </Label>
        <p className="text-[11px] text-muted-foreground">
          Skills assessment is evaluated separately from your national identity.
        </p>
      </div>

      <RadioGroup
        value={value}
        onValueChange={(val) => onChange(val as EvidenceRoute)}
        className="space-y-2.5"
      >
        {/* Route 1: Upload */}
        <label
          htmlFor="route-upload"
          className={`flex items-start gap-3 p-3.5 rounded-xl border transition-all cursor-pointer ${
            value === 'upload'
              ? 'border-primary bg-primary/5 ring-1 ring-primary/20'
              : 'border-border bg-card hover:bg-muted/40'
          }`}
        >
          <RadioGroupItem value="upload" id="route-upload" className="mt-0.5 shrink-0" />
          <div className="flex-1 space-y-0.5">
            <div className="flex items-center gap-1.5">
              <FileBadge className="h-4 w-4 text-primary shrink-0" />
              <Label htmlFor="route-upload" className="text-xs font-semibold text-foreground cursor-pointer">
                Upload evidence
              </Label>
            </div>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Upload TVET certificates, trade licenses, past project photos, or referee contact.
            </p>
          </div>
        </label>

        {/* Route 2: Practical Assessment */}
        <label
          htmlFor="route-assessment"
          className={`flex items-start gap-3 p-3.5 rounded-xl border transition-all cursor-pointer ${
            value === 'assessment'
              ? 'border-primary bg-primary/5 ring-1 ring-primary/20'
              : 'border-border bg-card hover:bg-muted/40'
          }`}
        >
          <RadioGroupItem value="assessment" id="route-assessment" className="mt-0.5 shrink-0" />
          <div className="flex-1 space-y-0.5">
            <div className="flex items-center gap-1.5">
              <Wrench className="h-4 w-4 text-primary shrink-0" />
              <Label htmlFor="route-assessment" className="text-xs font-semibold text-foreground cursor-pointer">
                Request a practical assessment
              </Label>
            </div>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Schedule an in-person workshop skills test evaluated by an Etcom master tradesperson.
            </p>
          </div>
        </label>

        {/* Route 3: No evidence */}
        <label
          htmlFor="route-no-evidence"
          className={`flex items-start gap-3 p-3.5 rounded-xl border transition-all cursor-pointer ${
            value === 'no_evidence'
              ? 'border-primary bg-primary/5 ring-1 ring-primary/20'
              : 'border-border bg-card hover:bg-muted/40'
          }`}
        >
          <RadioGroupItem value="no_evidence" id="route-no-evidence" className="mt-0.5 shrink-0" />
          <div className="flex-1 space-y-0.5">
            <div className="flex items-center gap-1.5">
              <ShieldOff className="h-4 w-4 text-muted-foreground shrink-0" />
              <Label htmlFor="route-no-evidence" className="text-xs font-semibold text-foreground cursor-pointer">
                Start with no evidence and build history
              </Label>
            </div>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Start immediately. Prove your competence through customer reviews and confirmed jobs.
            </p>
          </div>
        </label>
      </RadioGroup>
    </div>
  );
};
