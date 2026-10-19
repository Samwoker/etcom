import React from 'react';
import { Info } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface ExperienceFieldProps {
  years: number;
  onYearsChange: (years: number) => void;
  bio: string;
  onBioChange: (bio: string) => void;
}

export const ExperienceField: React.FC<ExperienceFieldProps> = ({
  years,
  onYearsChange,
  bio,
  onBioChange,
}) => {
  return (
    <div className="space-y-4">
      {/* Experience Years */}
      <div className="space-y-1.5">
        <Label htmlFor="experience-years" className="text-xs font-semibold text-foreground">
          Years of Trade Experience <span className="text-destructive">*</span>
        </Label>
        <Input
          id="experience-years"
          type="number"
          min={0}
          max={50}
          value={years || ''}
          onChange={(e) => onYearsChange(Math.max(0, parseInt(e.target.value) || 0))}
          placeholder="e.g. 5"
          className="text-xs h-10 rounded-xl"
        />
        <Alert className="border-border bg-muted/40 p-2.5">
          <Info className="h-3.5 w-3.5 text-muted-foreground" />
          <AlertDescription className="text-[11px] text-muted-foreground leading-relaxed">
            This will be shown as <strong>Self-reported</strong> until independently checked with TVET or trade licenses.
          </AlertDescription>
        </Alert>
      </div>

      {/* Short Bio */}
      <div className="space-y-1.5">
        <Label htmlFor="pro-bio" className="text-xs font-semibold text-foreground">
          Short Professional Introduction <span className="text-destructive">*</span>
        </Label>
        <Textarea
          id="pro-bio"
          value={bio}
          onChange={(e) => onBioChange(e.target.value)}
          placeholder="Briefly describe your specialization, types of equipment you repair, and work background..."
          rows={3}
          className="resize-none text-xs leading-relaxed"
        />
      </div>
    </div>
  );
};
