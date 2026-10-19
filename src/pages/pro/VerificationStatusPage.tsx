import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { PageHeader } from '@/components/shared/PageHeader';
import {
  StatusRow,
  AdminFeedbackCard,
  NextStepsList,
  useMyVerification,
} from '@/features/verification';
import { ROUTES } from '@/app/routes';

export const VerificationStatusPage: React.FC = () => {
  const navigate = useNavigate();
  const { pro, isLoading, canVerifySkills, canVerifyIdentity } = useMyVerification();

  if (isLoading || !pro) {
    return (
      <div className="flex flex-1 flex-col">
        <PageHeader title="Verification Status" />
        <div className="w-full max-w-xl md:max-w-2xl mx-auto p-4 space-y-3">
          <Skeleton className="h-16 w-full rounded-xl" />
          <Skeleton className="h-16 w-full rounded-xl" />
          <Skeleton className="h-16 w-full rounded-xl" />
        </div>
      </div>
    );
  }

  const isEligible = pro.listingStatus === 'eligible';

  // Badge helpers
  const getIdentityBadge = () => {
    switch (pro.identityStatus) {
      case 'verified':
        return <Badge className="bg-primary/10 text-primary border-primary/20 text-[10px]">Verified</Badge>;
      case 'in_review':
        return <Badge variant="outline" className="text-amber-600 border-amber-300 text-[10px]">In review</Badge>;
      case 'more_info_needed':
        return <Badge variant="destructive" className="text-[10px]">Info needed</Badge>;
      default:
        return <Badge variant="outline" className="text-muted-foreground text-[10px]">Not submitted</Badge>;
    }
  };

  const getSkillsBadge = () => {
    switch (pro.skillsStatus) {
      case 'evidence_accepted':
        return <Badge className="bg-primary/10 text-primary border-primary/20 text-[10px]">Verified skills</Badge>;
      case 'in_review':
        return <Badge variant="outline" className="text-amber-600 border-amber-300 text-[10px]">In review</Badge>;
      case 'assessment_required':
        return <Badge variant="outline" className="text-primary border-primary/30 text-[10px]">Assessment pending</Badge>;
      case 'more_info_needed':
        return <Badge variant="destructive" className="text-[10px]">More info needed</Badge>;
      default:
        return <Badge variant="outline" className="text-muted-foreground text-[10px]">Not verified</Badge>;
    }
  };

  return (
    <div className="flex flex-1 flex-col pb-8">
      <PageHeader title="Verification Status" />

      <div className="w-full max-w-xl md:max-w-2xl mx-auto px-4 py-3 space-y-4">
        {/* Listing Eligibility Card */}
        <Card className={`border ${isEligible ? 'border-primary/30 bg-primary/5' : 'border-border bg-card'}`}>
          <CardContent className="p-4 flex items-center justify-between gap-3 text-xs">
            <div className="space-y-0.5">
              <div className="flex items-center gap-1.5 font-bold text-foreground">
                {isEligible ? <Eye className="h-4 w-4 text-primary" /> : <EyeOff className="h-4 w-4 text-muted-foreground" />}
                <span>{isEligible ? 'Public Listing Active' : 'Public Listing In Progress'}</span>
              </div>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                {isEligible
                  ? 'Your profile is visible in customer searches across Addis Ababa.'
                  : 'Complete verification to appear in customer searches without restriction.'}
              </p>
            </div>
            <Badge variant={isEligible ? 'default' : 'outline'} className={`shrink-0 text-xs ${isEligible ? 'bg-primary text-primary-foreground' : ''}`}>
              {isEligible ? 'Eligible' : 'In Progress'}
            </Badge>
          </CardContent>
        </Card>

        {/* Reviewer Feedback (if any) */}
        {pro.adminFeedback && (
          <AdminFeedbackCard
            reason={pro.adminFeedback}
            onResolve={() => navigate(ROUTES.PRO_VERIFY_SKILLS)}
          />
        )}

        {/* The 3 Independent Pillars */}
        <div className="space-y-2.5">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-1">
            Independent Pillars
          </h3>

          <StatusRow
            title="1. Legal National Identity"
            subtitle="Verified independently via Ethiopian Government ID / Kebele"
            statusBadge={getIdentityBadge()}
            actionLabel={canVerifyIdentity ? 'Update ID' : undefined}
            onAction={() => navigate(ROUTES.PRO_VERIFY_IDENTITY)}
          />

          <StatusRow
            title="2. Trade Skills & Qualifications"
            subtitle="TVET certificates, licenses, or hands-on assessment"
            statusBadge={getSkillsBadge()}
            actionLabel={canVerifySkills ? 'Add Evidence' : undefined}
            onAction={() => navigate(ROUTES.PRO_VERIFY_SKILLS)}
          />

          <StatusRow
            title="3. Etcom Work History"
            subtitle="Confirmed jobs completed and paid through M-PESA"
            statusBadge={
              <Badge className="bg-primary/10 text-primary border-primary/20 text-[10px]">
                {pro.confirmedJobsCount} confirmed jobs
              </Badge>
            }
          />
        </div>

        {/* Next Steps */}
        <NextStepsList
          canVerifySkills={canVerifySkills}
          canVerifyIdentity={canVerifyIdentity}
          onVerifySkills={() => navigate(ROUTES.PRO_VERIFY_SKILLS)}
          onVerifyIdentity={() => navigate(ROUTES.PRO_VERIFY_IDENTITY)}
        />
      </div>
    </div>
  );
};
