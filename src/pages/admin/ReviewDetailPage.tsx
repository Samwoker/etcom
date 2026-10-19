import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, UserCheck, Wrench } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { PageHeader } from '@/components/shared/PageHeader';
import {
  ProfessionalSummary,
  EvidenceViewer,
  DecisionPanel,
  useReviewDecision,
} from '@/features/verification';
import { ROUTES } from '@/app/routes';

export const ReviewDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    pro,
    isLoading,
    identityChoice,
    setIdentityChoice,
    identityReason,
    setIdentityReason,
    identityFlagged,
    setIdentityFlagged,
    identityError,
    handleSaveIdentity,
    skillsChoice,
    setSkillsChoice,
    skillsReason,
    setSkillsReason,
    skillsFlagged,
    setSkillsFlagged,
    skillsError,
    handleSaveSkills,
  } = useReviewDecision(id);

  if (isLoading || !pro) {
    return (
      <div className="flex flex-1 flex-col">
        <PageHeader title="Evidence Review" />
        <div className="w-full max-w-xl md:max-w-2xl mx-auto p-4 space-y-4">
          <Skeleton className="h-44 w-full rounded-2xl" />
          <Skeleton className="h-28 w-full rounded-xl" />
          <Skeleton className="h-28 w-full rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col pb-12">
      <div className="border-b border-border bg-card">
        <div className="w-full max-w-xl md:max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(ROUTES.ADMIN_QUEUE)}
            className="text-xs -ml-2 text-muted-foreground hover:text-foreground gap-1.5"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Verification Queue
          </Button>
          <span className="text-xs font-semibold text-muted-foreground">Case #{pro.id}</span>
        </div>
      </div>

      <div className="w-full max-w-xl md:max-w-2xl mx-auto px-4 py-3 space-y-4">
        {/* Professional Summary */}
        <ProfessionalSummary pro={pro} />

        {/* Dual Accordion for Tripartite Separation */}
        <Accordion type="multiple" defaultValue={['identity', 'skills']} className="space-y-3">
          {/* 1. Identity Review Accordion */}
          <AccordionItem
            value="identity"
            className="border border-border/80 rounded-2xl bg-card px-4 overflow-hidden shadow-xs"
          >
            <AccordionTrigger className="py-3 text-xs font-bold text-foreground hover:no-underline">
              <div className="flex items-center gap-2">
                <UserCheck className="h-4 w-4 text-primary" />
                <span>Pillar 1: Legal Identity Verification</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-4 pt-1 space-y-3">
              <EvidenceViewer category="identity" pro={pro} />
              <DecisionPanel
                category="identity"
                choice={identityChoice}
                onChoiceChange={(val) => setIdentityChoice(val as import('@/types').IdentityStatus)}
                reason={identityReason}
                onReasonChange={setIdentityReason}
                flagged={identityFlagged}
                onFlaggedChange={setIdentityFlagged}
                error={identityError}
                onSave={handleSaveIdentity}
              />
            </AccordionContent>
          </AccordionItem>

          {/* 2. Skills & Trade Review Accordion */}
          <AccordionItem
            value="skills"
            className="border border-border/80 rounded-2xl bg-card px-4 overflow-hidden shadow-xs"
          >
            <AccordionTrigger className="py-3 text-xs font-bold text-foreground hover:no-underline">
              <div className="flex items-center gap-2">
                <Wrench className="h-4 w-4 text-primary" />
                <span>Pillar 2: Trade Skills & Credentials Verification</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-4 pt-1 space-y-3">
              <EvidenceViewer category="skills" pro={pro} />
              <DecisionPanel
                category="skills"
                choice={skillsChoice}
                onChoiceChange={(val) => setSkillsChoice(val as import('@/types').SkillsStatus)}
                reason={skillsReason}
                onReasonChange={setSkillsReason}
                flagged={skillsFlagged}
                onFlaggedChange={setSkillsFlagged}
                error={skillsError}
                onSave={handleSaveSkills}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};
