import React from 'react';
import { ShieldCheck, AlertTriangle, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { IdentityStatus, SkillsStatus, ListingStatus } from '@/types';

interface VerificationSummaryCardProps {
  identityStatus: IdentityStatus;
  skillsStatus: SkillsStatus;
  confirmedJobsCount: number;
  listingStatus: ListingStatus;
  onAction: () => void;
}

export const VerificationSummaryCard: React.FC<VerificationSummaryCardProps> = ({
  identityStatus,
  skillsStatus,
  confirmedJobsCount,
  listingStatus,
  onAction,
}) => {
  const isEligible = listingStatus === 'eligible';
  const hasPending = identityStatus !== 'verified' || skillsStatus !== 'evidence_accepted';

  return (
    <Card className={`border shadow-sm ${!isEligible ? 'border-amber-500/40 bg-amber-500/5' : 'border-border bg-card'}`}>
      <CardContent className="p-3.5 space-y-3">
        {!isEligible && (
          <div className="flex items-start gap-2 text-xs text-amber-900 dark:text-amber-200">
            <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <p className="leading-snug">
              <strong>Not visible in customer search.</strong> Complete ID and skills verification to be discoverable.
            </p>
          </div>
        )}

        <div className="flex items-center justify-between text-xs pt-0.5">
          <div className="flex items-center gap-1.5 font-semibold text-foreground">
            <ShieldCheck className="h-4 w-4 text-primary" />
            <span>Verification Status</span>
          </div>
          <Badge variant="outline" className="text-xs capitalize font-medium">
            {identityStatus.replace('_', ' ')}
          </Badge>
        </div>

        <div className="grid grid-cols-3 gap-1.5 text-center text-xs">
          <div className="p-2 rounded-xl bg-muted/50 border border-border/60">
            <span className="text-muted-foreground block text-xs">Identity</span>
            <span className={`font-semibold text-xs ${identityStatus === 'verified' ? 'text-primary' : 'text-foreground'}`}>
              {identityStatus === 'verified' ? 'Verified' : 'Pending'}
            </span>
          </div>
          <div className="p-2 rounded-xl bg-muted/50 border border-border/60">
            <span className="text-muted-foreground block text-xs">Skills</span>
            <span className={`font-semibold text-xs ${skillsStatus === 'evidence_accepted' ? 'text-primary' : 'text-foreground'}`}>
              {skillsStatus === 'evidence_accepted' ? 'Verified' : 'Self-reported'}
            </span>
          </div>
          <div className="p-2 rounded-xl bg-muted/50 border border-border/60">
            <span className="text-muted-foreground block text-xs">Work History</span>
            <span className="font-semibold text-foreground text-xs tabular-nums">{confirmedJobsCount} jobs</span>
          </div>
        </div>

        {hasPending && (
          <Button
            size="sm"
            onClick={onAction}
            className="w-full h-8 text-xs rounded-full gap-1 bg-primary text-primary-foreground hover:bg-primary/90 font-medium"
          >
            <span>Complete verification</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
