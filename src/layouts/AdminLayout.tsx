import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { BottomNav } from '@/components/shared/BottomNav';

export const AdminLayout: React.FC = () => {
  const location = useLocation();
  const hideBottomNav = location.pathname.startsWith('/admin/review/');

  return (
    <div className={`flex min-h-full flex-col ${hideBottomNav ? '' : 'pb-20'}`}>
      <Outlet />
      {!hideBottomNav && <BottomNav />}
    </div>
  );
};
