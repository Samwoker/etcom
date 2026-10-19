import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Info, Calendar } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { PageHeader } from '@/components/shared/PageHeader';
import { StickyCta } from '@/components/shared/StickyCta';
import {
  EvidenceRoutePicker,
  EvidenceUploadList,
  ReferenceForm,
  useSkillsSubmission,
} from '@/features/verification';
import { ROUTES } from '@/app/routes';

export const SkillsEvidencePage: React.FC = () => {
  const navigate = useNavigate();
  const { data, isSubmitting, actions } = useSkillsSubmission();
  const { route, files, refereeName, refereePhone, refereeRelationship } = data;

  const handleSubmit = async () => {
    await actions.submitSkills();
    navigate(ROUTES.PRO_VERIFICATION);
  };

  return (
    <div className="flex flex-1 flex-col pb-28">
      <PageHeader
        title="Show your skills"
        subtitle="Independent verification of trade competence"
        showBack
        onBack={() => navigate(ROUTES.PRO_VERIFY_IDENTITY)}
      />

      <div className="w-full max-w-xl md:max-w-2xl mx-auto px-4 py-4 space-y-4">
        <Card className="border-border shadow-sm">
          <CardContent className="p-4 space-y-4">
            <EvidenceRoutePicker
              value={route}
              onChange={actions.setRoute}
            />

            {/* Route 1: Upload */}
            {route === 'upload' && (
              <div className="space-y-4 pt-3 border-t border-border/60 animate-in fade-in-50 duration-150">
                <EvidenceUploadList
                  files={files}
                  onAddFile={actions.addFile}
                  onRemoveFile={actions.removeFile}
                />
                <ReferenceForm
                  name={refereeName}
                  onNameChange={actions.setRefereeName}
                  phone={refereePhone}
                  onPhoneChange={actions.setRefereePhone}
                  relationship={refereeRelationship}
                  onRelationshipChange={actions.setRefereeRelationship}
                />
              </div>
            )}

            {/* Route 2: Practical Assessment */}
            {route === 'assessment' && (
              <div className="p-3.5 rounded-xl bg-muted/40 border border-border/60 space-y-2 text-xs animate-in fade-in-50 duration-150">
                <div className="flex items-center gap-2 font-semibold text-foreground">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span>Workshop Evaluation Schedule</span>
                </div>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  Practical trade assessments take place at accredited TVET partner facilities in Addis Ababa (Tewodros Square / Bole). An evaluator will inspect tool handling, safety, and craft execution.
                </p>
              </div>
            )}

            {/* Route 3: No Evidence */}
            {route === 'no_evidence' && (
              <Alert className="border-border bg-muted/40 animate-in fade-in-50 duration-150">
                <Info className="h-4 w-4 text-foreground" />
                <AlertTitle className="text-xs font-semibold text-foreground">
                  Starting without uploaded credentials
                </AlertTitle>
                <AlertDescription className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  No evidence means your skills stay <strong>Not verified</strong>. You can add certificates or request assessment at any time while building client work history on Etcom.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </div>

      <StickyCta
        primaryLabel={
          route === 'assessment'
            ? 'Request Assessment & Continue'
            : route === 'no_evidence'
            ? 'Continue to Verification Status'
            : 'Submit skills verification'
        }
        primaryDisabled={isSubmitting}
        primaryLoading={isSubmitting}
        onPrimaryClick={handleSubmit}
      />
    </div>
  );
};
