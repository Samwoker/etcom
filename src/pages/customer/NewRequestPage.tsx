import React from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { RequestForm } from '@/features/jobs/components/RequestForm';

export const NewRequestPage: React.FC = () => {
  return (
    <div className="flex flex-1 flex-col">
      <PageHeader
        title="Describe the Problem"
        subtitle="Fixed quotes from nearby verified professionals"
        showBack
      />
      <div className="flex-1 w-full max-w-xl md:max-w-2xl mx-auto px-4 py-4">
        <RequestForm />
      </div>
    </div>
  );
};
