import React from 'react';
import { AlertTriangle, CheckCircle2, XCircle } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface CompletionChecklistProps {
  value: 'yes' | 'no' | null;
  onChange: (value: 'yes' | 'no') => void;
}

export const CompletionChecklist: React.FC<CompletionChecklistProps> = ({
  value,
  onChange,
}) => {
  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <h3 className="text-sm font-semibold text-foreground">
          Was the work done as agreed?
        </h3>
        <p className="text-xs text-muted-foreground">
          Your confirmation officially marks this job completed.
        </p>
      </div>

      <RadioGroup
        value={value || ''}
        onValueChange={(val) => onChange(val as 'yes' | 'no')}
        className="space-y-2.5"
      >
        <label
          htmlFor="agreed-yes"
          className={`flex items-start gap-3 p-3.5 rounded-xl border transition-all cursor-pointer ${
            value === 'yes'
              ? 'border-primary bg-primary/5 ring-1 ring-primary/20'
              : 'border-border bg-card hover:bg-muted/40'
          }`}
        >
          <RadioGroupItem value="yes" id="agreed-yes" className="mt-0.5 shrink-0" />
          <div className="flex-1 space-y-0.5">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
              <Label htmlFor="agreed-yes" className="text-xs font-semibold text-foreground cursor-pointer">
                Yes, work completed as agreed
              </Label>
            </div>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              The full scope and materials match what was agreed with the professional.
            </p>
          </div>
        </label>

        <label
          htmlFor="agreed-no"
          className={`flex items-start gap-3 p-3.5 rounded-xl border transition-all cursor-pointer ${
            value === 'no'
              ? 'border-destructive bg-destructive/5 ring-1 ring-destructive/20'
              : 'border-border bg-card hover:bg-muted/40'
          }`}
        >
          <RadioGroupItem value="no" id="agreed-no" className="mt-0.5 shrink-0" />
          <div className="flex-1 space-y-0.5">
            <div className="flex items-center gap-1.5">
              <XCircle className="h-4 w-4 text-destructive shrink-0" />
              <Label htmlFor="agreed-no" className="text-xs font-semibold text-foreground cursor-pointer">
                No, issues or incomplete work
              </Label>
            </div>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Work was not completed, scope was missed, or quality is unsatisfactory.
            </p>
          </div>
        </label>
      </RadioGroup>

      {value === 'no' && (
        <Alert variant="destructive" className="border-destructive/40 bg-destructive/5">
          <AlertTriangle className="h-4 w-4 text-destructive" />
          <AlertTitle className="text-xs font-semibold text-destructive">
            Do not mark as complete
          </AlertTitle>
          <AlertDescription className="text-xs text-destructive/90 leading-relaxed mt-1">
            If work is unsatisfactory or incomplete, proceed to report the issue. Disputed jobs do not add to the professional's confirmed work history.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};
