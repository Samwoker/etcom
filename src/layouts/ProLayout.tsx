import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { BottomNav } from '@/components/shared/BottomNav';

export const ProLayout: React.FC = () => {
  const location = useLocation();
  const hideBottomNav =
    location.pathname === '/p/verify/identity' ||
    location.pathname === '/p/verify/skills' ||
    location.pathname.startsWith('/p/jobs/');

  return (
    <div className={`flex min-h-full flex-col ${hideBottomNav ? '' : 'pb-20'}`}>
      <Outlet />
      {!hideBottomNav && <BottomNav />}
    </div>
  );
};
