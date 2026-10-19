import React from 'react';
import { Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Professional } from '@/types';

interface ExperienceBlockProps {
  pro: Professional;
}

export const ExperienceBlock: React.FC<ExperienceBlockProps> = ({ pro }) => {
  return (
    <Card className="border-border shadow-sm">
      <CardContent className="p-4">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs font-semibold text-foreground">Trade Experience</span>
          </div>
          <Badge variant="outline" className="bg-muted text-muted-foreground text-[11px] font-normal">
            Self-reported
          </Badge>
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-2xl font-bold tracking-tight text-foreground">
            {pro.claimedExperienceYears} {pro.claimedExperienceYears === 1 ? 'year' : 'years'}
          </span>
          <span className="text-xs text-muted-foreground">in {pro.trade} services</span>
        </div>
        <p className="mt-1 text-[11px] text-muted-foreground">
          Self-reported by professional. Not independently audited by Etcom.
        </p>
      </CardContent>
    </Card>
  );
};
