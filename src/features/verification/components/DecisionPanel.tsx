import React from 'react';
import { ShieldAlert } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface DecisionPanelProps {
  category: 'identity' | 'skills';
  choice: string;
  onChoiceChange: (val: string) => void;
  reason: string;
  onReasonChange: (val: string) => void;
  flagged: boolean;
  onFlaggedChange: (val: boolean) => void;
  error: string | null;
  onSave: () => void;
}

export const DecisionPanel: React.FC<DecisionPanelProps> = ({
  category,
  choice,
  onChoiceChange,
  reason,
  onReasonChange,
  flagged,
  onFlaggedChange,
  error,
  onSave,
}) => {
  const isReasonRequired =
    category === 'identity' ? choice !== 'verified' : choice !== 'evidence_accepted';

  return (
    <Card className="border-border shadow-xs bg-card mt-3">
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center justify-between">
          <span>{category === 'identity' ? 'Identity Review Decision' : 'Skills Review Decision'}</span>
          <Badge variant="outline" className="text-[10px] font-normal">
            Independent Action
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className="p-4 pt-2 space-y-4">
        {/* Radio Options */}
        <RadioGroup
          value={choice}
          onValueChange={onChoiceChange}
          className="space-y-2"
        >
          {category === 'identity' ? (
            <>
              <div className="flex items-center space-x-2.5 p-2 rounded-lg border border-border/70 hover:bg-muted/20">
                <RadioGroupItem value="verified" id="id-opt-verified" />
                <Label htmlFor="id-opt-verified" className="text-xs font-medium cursor-pointer flex-1">
                  Verified <span className="text-muted-foreground text-[11px]">(National ID/Kebele verified)</span>
                </Label>
              </div>
              <div className="flex items-center space-x-2.5 p-2 rounded-lg border border-border/70 hover:bg-muted/20">
                <RadioGroupItem value="more_info_needed" id="id-opt-more-info" />
                <Label htmlFor="id-opt-more-info" className="text-xs font-medium cursor-pointer flex-1">
                  More info needed <span className="text-muted-foreground text-[11px]">(Blurry scan, expired document)</span>
                </Label>
              </div>
              <div className="flex items-center space-x-2.5 p-2 rounded-lg border border-border/70 hover:bg-muted/20">
                <RadioGroupItem value="rejected" id="id-opt-rejected" />
                <Label htmlFor="id-opt-rejected" className="text-xs font-medium cursor-pointer flex-1">
                  Rejected <span className="text-muted-foreground text-[11px]">(Invalid document, failed verification)</span>
                </Label>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center space-x-2.5 p-2 rounded-lg border border-border/70 hover:bg-muted/20">
                <RadioGroupItem value="evidence_accepted" id="sk-opt-accepted" />
                <Label htmlFor="sk-opt-accepted" className="text-xs font-medium cursor-pointer flex-1">
                  Evidence accepted <span className="text-muted-foreground text-[11px]">(Certificates & credentials approved)</span>
                </Label>
              </div>
              <div className="flex items-center space-x-2.5 p-2 rounded-lg border border-border/70 hover:bg-muted/20">
                <RadioGroupItem value="assessment_required" id="sk-opt-assessment" />
                <Label htmlFor="sk-opt-assessment" className="text-xs font-medium cursor-pointer flex-1">
                  Assessment required <span className="text-muted-foreground text-[11px]">(Schedule practical workshop test)</span>
                </Label>
              </div>
              <div className="flex items-center space-x-2.5 p-2 rounded-lg border border-border/70 hover:bg-muted/20">
                <RadioGroupItem value="more_info_needed" id="sk-opt-more-info" />
                <Label htmlFor="sk-opt-more-info" className="text-xs font-medium cursor-pointer flex-1">
                  More info needed <span className="text-muted-foreground text-[11px]">(Additional trade proof required)</span>
                </Label>
              </div>
              <div className="flex items-center space-x-2.5 p-2 rounded-lg border border-border/70 hover:bg-muted/20">
                <RadioGroupItem value="not_verified" id="sk-opt-not-verified" />
                <Label htmlFor="sk-opt-not-verified" className="text-xs font-medium cursor-pointer flex-1">
                  Not verified <span className="text-muted-foreground text-[11px]">(Trade history insufficient)</span>
                </Label>
              </div>
            </>
          )}
        </RadioGroup>

        {/* Reason Textarea (Required if non-approved) */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <Label htmlFor={`${category}-reason`} className="font-semibold text-foreground">
              Reviewer Reason {isReasonRequired && <span className="text-destructive">*</span>}
            </Label>
            {isReasonRequired && (
              <span className="text-[11px] text-destructive font-medium">Mandatory</span>
            )}
          </div>
          <Textarea
            id={`${category}-reason`}
            value={reason}
            onChange={(e) => onReasonChange(e.target.value)}
            placeholder={
              isReasonRequired
                ? 'Specify exactly why more info is needed or why evidence was not approved...'
                : 'Optional reviewer notes for internal audit records...'
            }
            rows={2}
            className="text-xs resize-none bg-background leading-relaxed"
          />
          {error && <p className="text-[11px] text-destructive font-medium">{error}</p>}
        </div>

        {/* Suspected-fraud checkbox */}
        <div className="flex items-start space-x-2 p-2.5 rounded-lg border border-destructive/20 bg-destructive/5">
          <Checkbox
            id={`${category}-flag-fraud`}
            checked={flagged}
            onCheckedChange={(val) => onFlaggedChange(Boolean(val))}
            className="mt-0.5"
          />
          <div className="space-y-0.5">
            <Label
              htmlFor={`${category}-flag-fraud`}
              className="text-xs font-bold text-destructive flex items-center gap-1 cursor-pointer"
            >
              <ShieldAlert className="h-3 w-3" />
              Flag for investigation
            </Label>
            <p className="text-[11px] text-muted-foreground leading-snug">
              Marks account as restricted. Hides profile immediately from customer searches.
            </p>
          </div>
        </div>

        {/* Action Button */}
        <Button onClick={onSave} className="w-full text-xs font-semibold h-9 rounded-xl">
          Save {category === 'identity' ? 'Identity' : 'Skills'} Decision
        </Button>
      </CardContent>
    </Card>
  );
};
