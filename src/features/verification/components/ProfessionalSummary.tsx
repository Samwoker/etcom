import React from 'react';
import { Phone, MapPin, Briefcase } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { VerificationBadges } from '@/components/shared/VerificationBadges';
import type { Professional } from '@/types';

interface ProfessionalSummaryProps {
  pro: Professional;
}

export const ProfessionalSummary: React.FC<ProfessionalSummaryProps> = ({ pro }) => {
  const initials = pro.fullName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2);

  return (
    <Card className="border-border shadow-xs bg-card">
      <CardContent className="p-4 space-y-3.5">
        <div className="flex items-start gap-3">
          <Avatar className="h-12 w-12 border border-border shrink-0">
            <AvatarImage src={pro.avatarUrl} alt={pro.fullName} />
            <AvatarFallback className="bg-muted text-sm font-bold text-foreground">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-1 flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-base font-bold text-foreground truncate">
                {pro.fullName}
              </h2>
              {pro.listingStatus === 'restricted' ? (
                <Badge variant="destructive" className="text-[10px]">
                  Restricted
                </Badge>
              ) : (
                <Badge variant="outline" className="text-[10px] text-muted-foreground">
                  {pro.listingStatus === 'eligible' ? 'Publicly Listed' : 'Listing Pending'}
                </Badge>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
              <span className="flex items-center gap-1 font-medium text-foreground">
                <Briefcase className="h-3 w-3 text-primary" />
                {pro.trade}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3 text-muted-foreground" />
                {pro.subCity}
              </span>
              <span className="flex items-center gap-1">
                <Phone className="h-3 w-3 text-muted-foreground" />
                {pro.phone}
              </span>
            </div>
          </div>
        </div>

        {/* Claimed Experience: labeled Self-reported */}
        <div className="flex items-center justify-between p-2.5 rounded-xl bg-muted/30 border border-border/70 text-xs">
          <span className="text-muted-foreground font-medium">Claimed Experience</span>
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-foreground">
              {pro.claimedExperienceYears} {pro.claimedExperienceYears === 1 ? 'year' : 'years'}
            </span>
            <Badge variant="outline" className="text-[10px] bg-muted/80 text-muted-foreground font-normal">
              Self-reported
            </Badge>
          </div>
        </div>

        {/* Current Tripartite Verification Badges */}
        <div className="space-y-1.5 pt-1">
          <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
            Current Verification Pillars
          </span>
          <VerificationBadges
            identityStatus={pro.identityStatus}
            skillsStatus={pro.skillsStatus}
            confirmedJobsCount={pro.confirmedJobsCount}
            className="flex-wrap gap-2"
          />
        </div>
      </CardContent>
    </Card>
  );
};
