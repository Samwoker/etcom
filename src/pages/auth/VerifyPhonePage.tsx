import React from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { OtpForm } from '@/features/auth/components/OtpForm';

export const VerifyPhonePage: React.FC = () => {
  return (
    <div className="flex flex-1 flex-col pb-24">
      <PageHeader title="Phone Verification" showBack />
      <div className="flex-1 w-full max-w-xl md:max-w-2xl mx-auto px-5 py-6">
        <OtpForm />
      </div>
    </div>
  );
};
