import React from 'react';
import { MapPin, Wrench } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { RatingStars } from '@/components/shared/RatingStars';
import type { Professional } from '@/types';

interface ProfileHeaderProps {
  pro: Professional;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ pro }) => {
  const initials = pro.fullName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2);

  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
      <Avatar className="h-20 w-20 border-2 border-border shadow-sm">
        <AvatarImage src={pro.avatarUrl} alt={pro.fullName} className="object-cover" />
        <AvatarFallback className="bg-muted font-bold text-foreground text-lg">
          {initials}
        </AvatarFallback>
      </Avatar>

      <div className="flex-1 space-y-1.5">
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
          <h1 className="text-xl font-bold tracking-tight text-foreground">{pro.fullName}</h1>
          <Badge variant="secondary" className="gap-1 text-xs font-medium">
            <Wrench className="h-3 w-3 text-muted-foreground" />
            {pro.trade}
          </Badge>
        </div>

        <div className="flex items-center justify-center sm:justify-start gap-1 text-xs text-muted-foreground">
          <MapPin className="h-3.5 w-3.5" />
          <span>{pro.subCity}, Addis Ababa</span>
          {pro.hourlyRateEstimate && (
            <>
              <span>•</span>
              <span className="font-medium text-foreground">
                ~{pro.hourlyRateEstimate} ETB/hr
              </span>
            </>
          )}
        </div>

        <div className="flex items-center justify-center sm:justify-start pt-0.5">
          <RatingStars
            rating={pro.rating}
            reviewCount={pro.reviewCount}
            size="md"
          />
        </div>
      </div>
    </div>
  );
};
