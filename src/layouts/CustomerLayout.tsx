import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { BottomNav } from '@/components/shared/BottomNav';
import { ROUTES } from '@/app/routes';

export const CustomerLayout: React.FC = () => {
  const location = useLocation();
  const hideBottomNav =
    location.pathname === ROUTES.CUSTOMER_REQUEST_NEW ||
    location.pathname.startsWith('/professionals') ||
    (location.pathname.startsWith('/jobs/') && location.pathname !== ROUTES.CUSTOMER_JOBS);

  return (
    <div className={`flex min-h-full flex-col ${hideBottomNav ? '' : 'pb-20'}`}>
      <Outlet />
      {!hideBottomNav && <BottomNav />}
    </div>
  );
};
