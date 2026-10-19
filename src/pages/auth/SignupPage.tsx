import React from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { SignupForm } from '@/features/auth/components/SignupForm';

export const SignupPage: React.FC = () => {
  return (
    <div className="flex flex-1 flex-col pb-24">
      <PageHeader title="Create your account" showBack />
      <div className="flex-1 w-full max-w-xl md:max-w-2xl mx-auto px-5 py-4">
        <SignupForm />
      </div>
    </div>
  );
};
