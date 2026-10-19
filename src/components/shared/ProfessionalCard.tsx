import React from 'react';
import { Clock, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { RatingStars } from './RatingStars';
import { VerificationBadges } from './VerificationBadges';
import type { Professional } from '@/types';

interface ProfessionalCardProps {
  pro: Professional;
  onClick?: () => void;
  className?: string;
  compact?: boolean;
  responseTime?: string;
}

export const ProfessionalCard: React.FC<ProfessionalCardProps> = ({
  pro,
  onClick,
  className,
  compact = false,
  responseTime,
}) => {
  const initials = pro.fullName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2);

  const displayResponseTime =
    responseTime ||
    (pro.confirmedJobsCount > 5 ? '~15 min response' : '~45 min response');

  if (compact) {
    return (
      <Card
        role="button"
        tabIndex={0}
        onClick={onClick}
        className={`group shrink-0 w-64 cursor-pointer rounded-2xl border border-border bg-card p-0 transition-all hover:border-primary/60 hover:shadow-md active:scale-[0.99] ${className || ''}`}
      >
        <CardContent className="p-3.5 space-y-2.5">
          <div className="flex items-center gap-3">
            <Avatar className="h-11 w-11 shrink-0 rounded-full border border-border">
              <AvatarImage src={pro.avatarUrl} alt={pro.fullName} />
              <AvatarFallback className="font-semibold text-xs">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <h3 className="truncate text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                {pro.fullName}
              </h3>
              <p className="truncate text-xs text-muted-foreground">
                {pro.trade} • {pro.subCity}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between text-xs pt-1 border-t border-border/50">
            <RatingStars rating={pro.rating} reviewCount={pro.reviewCount} />
            <span className="text-muted-foreground font-medium">
              {pro.confirmedJobsCount} jobs
            </span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      role="button"
      tabIndex={0}
      onClick={onClick}
      className={`group cursor-pointer rounded-2xl border border-border bg-card p-0 transition-all hover:border-primary/60 hover:shadow-md active:scale-[0.99] ${className || ''}`}
    >
      <CardContent className="p-4 space-y-3">
        <div className="flex items-start gap-3.5">
          <Avatar className="h-13 w-13 shrink-0 rounded-full border border-border">
            <AvatarImage src={pro.avatarUrl} alt={pro.fullName} />
            <AvatarFallback className="font-semibold">{initials}</AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="truncate text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                  {pro.fullName}
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-0.5">
                  <span className="font-medium text-foreground">{pro.trade}</span>
                  <span>•</span>
                  <span className="inline-flex items-center gap-0.5">
                    <MapPin className="h-3 w-3" />
                    {pro.subCity}
                  </span>
                </div>
              </div>
              <div className="text-right shrink-0">
                <RatingStars rating={pro.rating} reviewCount={pro.reviewCount} />
                <div className="flex items-center gap-1 text-[11px] text-muted-foreground mt-1 justify-end">
                  <Clock className="h-3 w-3" />
                  <span>{displayResponseTime}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-1 border-t border-border/40">
          <VerificationBadges
            identityStatus={pro.identityStatus}
            skillsStatus={pro.skillsStatus}
            confirmedJobsCount={pro.confirmedJobsCount}
          />
        </div>
      </CardContent>
    </Card>
  );
};
