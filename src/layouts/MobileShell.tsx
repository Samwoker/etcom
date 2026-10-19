import React from 'react';
import { Outlet } from 'react-router-dom';
import { DemoSwitcher } from '@/components/shared/DemoSwitcher';
import { DemoDirector } from '@/components/shared/DemoDirector';
import { PwaStatusBanner } from '@/components/shared/PwaStatusBanner';

export const MobileShell: React.FC = () => {
  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-background text-foreground antialiased selection:bg-primary/20">
      <main className="relative flex min-h-screen w-full max-w-xl md:max-w-2xl lg:max-w-3xl flex-col bg-background">
        <DemoDirector />
        <PwaStatusBanner />
        <div className="flex flex-1 flex-col w-full">
          <Outlet />
        </div>
        <DemoSwitcher />
      </main>
    </div>
  );
};
