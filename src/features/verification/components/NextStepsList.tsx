import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface NextStepsListProps {
  onVerifySkills: () => void;
  onVerifyIdentity: () => void;
  canVerifySkills: boolean;
  canVerifyIdentity: boolean;
}

export const NextStepsList: React.FC<NextStepsListProps> = ({
  onVerifySkills,
  onVerifyIdentity,
  canVerifySkills,
  canVerifyIdentity,
}) => {
  if (!canVerifySkills && !canVerifyIdentity) {
    return null;
  }

  return (
    <Card className="border-border shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-xs font-semibold text-foreground">
          Recommended Next Steps
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 pt-0">
        {canVerifySkills && (
          <div className="flex items-center justify-between p-2.5 rounded-lg bg-muted/40 border border-border/50 text-xs">
            <div className="space-y-0.5">
              <p className="font-semibold text-foreground">Verify Trade Skills</p>
              <p className="text-[11px] text-muted-foreground">Upload TVET or add a contractor referee</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={onVerifySkills}
              className="h-7 text-xs rounded-full gap-1 border-primary/30 text-primary"
            >
              <span>Add evidence</span>
              <ArrowUpRight className="h-3 w-3" />
            </Button>
          </div>
        )}

        {canVerifyIdentity && (
          <div className="flex items-center justify-between p-2.5 rounded-lg bg-muted/40 border border-border/50 text-xs">
            <div className="space-y-0.5">
              <p className="font-semibold text-foreground">Complete National ID</p>
              <p className="text-[11px] text-muted-foreground">Submit Kebele ID or Fayda document</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={onVerifyIdentity}
              className="h-7 text-xs rounded-full gap-1 border-primary/30 text-primary"
            >
              <span>Submit ID</span>
              <ArrowUpRight className="h-3 w-3" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
