import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { PageHeader } from '@/components/shared/PageHeader';
import { StickyCta } from '@/components/shared/StickyCta';
import {
  IdDocumentPicker,
  SelfiePicker,
  PrivacyNote,
  useIdentitySubmission,
} from '@/features/verification';
import { ROUTES } from '@/app/routes';

export const IdentityVerificationPage: React.FC = () => {
  const navigate = useNavigate();
  const { data, isSubmitting, actions } = useIdentitySubmission();
  const { idType, frontFile, backFile, selfieFile, isValid } = data;

  const handleSubmit = async () => {
    const success = await actions.submitIdentity();
    if (success) {
      navigate(ROUTES.PRO_VERIFY_SKILLS);
    }
  };

  const handleSkip = () => {
    navigate(ROUTES.PRO_DASHBOARD);
  };

  return (
    <div className="flex flex-1 flex-col pb-28">
      <PageHeader
        title="Verify your identity"
        subtitle="Confirms legal identity — evaluated separately from trade skills"
        showBack
        onBack={() => navigate(ROUTES.PRO_ONBOARDING)}
      />

      <div className="w-full max-w-xl md:max-w-2xl mx-auto px-4 py-4 space-y-4">
        <Card className="border-border shadow-sm">
          <CardContent className="p-4 space-y-4">
            <IdDocumentPicker
              idType={idType}
              onIdTypeChange={actions.setIdType}
              frontFile={frontFile}
              onFrontFileChange={actions.setFrontFile}
              backFile={backFile}
              onBackFileChange={actions.setBackFile}
            />

            <SelfiePicker
              selfieFile={selfieFile}
              onSelfieChange={actions.setSelfieFile}
            />
          </CardContent>
        </Card>

        <PrivacyNote />
      </div>

      <StickyCta
        primaryLabel="Submit for review"
        primaryDisabled={!isValid || isSubmitting}
        primaryLoading={isSubmitting}
        onPrimaryClick={handleSubmit}
        secondaryLabel="Skip for now"
        onSecondaryClick={handleSkip}
      />
    </div>
  );
};
