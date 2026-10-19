import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, FileText, UserCheck, Wrench, AlertTriangle, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ROUTES } from '@/app/routes';
import type { Professional } from '@/types';

interface QueueItemProps {
  pro: Professional;
}

export const QueueItem: React.FC<QueueItemProps> = ({ pro }) => {
  const navigate = useNavigate();
  const evidenceCount = pro.evidenceItems?.length || 2;
  const initials = pro.fullName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2);

  // Derive which categories are pending
  const isIdentityPending = pro.identityStatus === 'in_review';
  const isIdentityInfoNeeded = pro.identityStatus === 'more_info_needed';
  const isSkillsPending =
    pro.skillsStatus === 'in_review' || pro.skillsStatus === 'assessment_required';
  const isSkillsInfoNeeded = pro.skillsStatus === 'more_info_needed';

  return (
    <Card
      onClick={() => navigate(ROUTES.ADMIN_REVIEW_DETAIL(pro.id))}
      className="border-border shadow-xs hover:border-primary/50 hover:bg-muted/10 transition-colors cursor-pointer"
    >
      <CardContent className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border border-border">
              <AvatarImage src={pro.avatarUrl} alt={pro.fullName} />
              <AvatarFallback className="bg-muted text-xs font-bold text-foreground">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <h4 className="text-sm font-bold text-foreground hover:text-primary transition-colors flex items-center gap-1.5">
                <span>{pro.fullName}</span>
              </h4>
              <p className="text-xs text-muted-foreground">
                {pro.trade} • {pro.subCity}
              </p>
            </div>
          </div>
          <ArrowRight className="h-4 w-4 text-muted-foreground/60 shrink-0 mt-1" />
        </div>

        {/* Category status badges (separate, tripartite) */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          {isIdentityPending && (
            <Badge variant="outline" className="text-[10px] text-amber-600 border-amber-300 gap-1 bg-amber-50/50 dark:bg-amber-950/20">
              <UserCheck className="h-2.5 w-2.5" />
              Identity Pending
            </Badge>
          )}
          {isIdentityInfoNeeded && (
            <Badge variant="destructive" className="text-[10px] gap-1">
              <AlertTriangle className="h-2.5 w-2.5" />
              Identity: Info Needed
            </Badge>
          )}
          {isSkillsPending && (
            <Badge variant="outline" className="text-[10px] text-primary border-primary/30 gap-1 bg-primary/5">
              <Wrench className="h-2.5 w-2.5" />
              {pro.skillsStatus === 'assessment_required' ? 'Workshop Assessment' : 'Skills Pending'}
            </Badge>
          )}
          {isSkillsInfoNeeded && (
            <Badge variant="destructive" className="text-[10px] gap-1">
              <AlertTriangle className="h-2.5 w-2.5" />
              Skills: Info Needed
            </Badge>
          )}
        </div>

        {/* Submission meta */}
        <div className="flex items-center justify-between text-[11px] text-muted-foreground border-t border-border/60 pt-2.5">
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            Submitted recently
          </span>
          <span className="flex items-center gap-1 font-medium text-foreground/80">
            <FileText className="h-3 w-3 text-muted-foreground" />
            {evidenceCount} {evidenceCount === 1 ? 'evidence item' : 'evidence items'}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};
