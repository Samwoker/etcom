import React from 'react';
import { Outlet } from 'react-router-dom';

export const AuthLayout: React.FC = () => {
  return (
    <div className="flex flex-1 flex-col">
      <Outlet />
    </div>
  );
};
