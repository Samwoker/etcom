import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { PageHeader } from '@/components/shared/PageHeader';
import {
  AccountHeader,
  CustomerVerificationCard,
  SettingsList,
  useAccount,
} from '@/features/auth';

export const AccountPage: React.FC = () => {
  const { customer, metrics, logout, isLoading } = useAccount();

  if (isLoading) {
    return (
      <div className="flex flex-1 flex-col">
        <PageHeader title="My Account" />
        <div className="w-full max-w-xl md:max-w-2xl mx-auto p-4 space-y-4">
          <Skeleton className="h-24 w-full rounded-xl" />
          <Skeleton className="h-48 w-full rounded-xl" />
          <Skeleton className="h-40 w-full rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col pb-8">
      <PageHeader title="My Account" />

      <div className="w-full max-w-xl md:max-w-2xl mx-auto px-4 py-3 space-y-4">
        <AccountHeader customer={customer} />
        <CustomerVerificationCard
          totalJobs={metrics.totalJobs}
          cancellationsCount={metrics.cancellationsCount}
          disputesCount={metrics.disputesCount}
        />
        <SettingsList onLogout={logout} />
      </div>
    </div>
  );
};
