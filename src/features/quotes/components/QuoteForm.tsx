import React from 'react';
import { Search, Sparkles } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { LineItemInput } from './LineItemInput';
import { QuoteTotal } from './QuoteTotal';

interface QuoteFormProps {
  isRevision: boolean;
  laborETB: number;
  onLaborChange: (val: number) => void;
  materialsETB: number;
  onMaterialsChange: (val: number) => void;
  scope: string;
  onScopeChange: (val: string) => void;
  scheduledDate: string;
  onScheduledDateChange: (val: string) => void;
  inspectionNeeded: boolean;
  onInspectionChange: (val: boolean) => void;
  revisionReason: string;
  onRevisionReasonChange: (val: string) => void;
}

export const QuoteForm: React.FC<QuoteFormProps> = ({
  isRevision,
  laborETB,
  onLaborChange,
  materialsETB,
  onMaterialsChange,
  scope,
  onScopeChange,
  scheduledDate,
  onScheduledDateChange,
  inspectionNeeded,
  onInspectionChange,
  revisionReason,
  onRevisionReasonChange,
}) => {
  const handleFillSample = () => {
    onScopeChange(
      'Replace damaged compression stop valve, install heavy-duty brass ball valve, and pressure test joints.'
    );
    onLaborChange(1200);
    onMaterialsChange(650);
    const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
    onScheduledDateChange(tomorrow);
  };

  return (
    <div className="space-y-4">
      {/* Revision Reason (Required if revising) */}
      {isRevision && (
        <div className="space-y-1.5 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs">
          <Label htmlFor="revision-reason" className="font-bold text-amber-900 dark:text-amber-200">
            Reason for Price Update <span className="text-destructive">*</span>
          </Label>
          <Textarea
            id="revision-reason"
            value={revisionReason}
            onChange={(e) => onRevisionReasonChange(e.target.value)}
            placeholder="Explain why the price changed, additional parts needed, or site discoveries..."
            rows={2}
            className="text-xs resize-none bg-background leading-relaxed"
          />
        </div>
      )}

      {/* Description of Work */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <Label htmlFor="quote-scope" className="text-xs font-semibold text-foreground">
            Description of Work <span className="text-destructive">*</span>
          </Label>
          <button
            type="button"
            onClick={handleFillSample}
            className="inline-flex items-center gap-1 text-[11px] text-primary hover:underline cursor-pointer"
          >
            <Sparkles className="h-3 w-3" />
            <span>Fill sample offer</span>
          </button>
        </div>
        <Textarea
          id="quote-scope"
          value={scope}
          onChange={(e) => onScopeChange(e.target.value)}
          placeholder="Describe the tasks, repairs, and materials included in this price..."
          rows={3}
          className="text-xs resize-none leading-relaxed"
        />
      </div>

      {/* Labor & Materials breakdown */}
      <LineItemInput
        laborETB={laborETB}
        onLaborChange={onLaborChange}
        materialsETB={materialsETB}
        onMaterialsChange={onMaterialsChange}
      />

      {/* Proposed Appointment Date & Time */}
      <div className="space-y-1.5">
        <Label htmlFor="proposed-date" className="text-xs font-semibold text-foreground">
          Proposed Service Date & Time <span className="text-destructive">*</span>
        </Label>
        <Input
          id="proposed-date"
          type="date"
          value={scheduledDate}
          onChange={(e) => onScheduledDateChange(e.target.value)}
          className="text-xs h-10 rounded-xl"
        />
      </div>

      {/* Inspection needed first Switch */}
      <div className="flex items-center justify-between p-3 rounded-xl border border-border/80 bg-muted/20">
        <div className="space-y-0.5 pr-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
            <Search className="h-3.5 w-3.5 text-primary" />
            <span>Inspection needed first</span>
          </div>
          <p className="text-[11px] text-muted-foreground">
            Flag if an on-site inspection is required before starting work.
          </p>
        </div>
        <Switch
          checked={inspectionNeeded}
          onCheckedChange={onInspectionChange}
        />
      </div>

      {/* Live Calculated Total */}
      <QuoteTotal laborETB={laborETB} materialsETB={materialsETB} />
    </div>
  );
};
