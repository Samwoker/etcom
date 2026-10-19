import React from 'react';
import { User, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  WelcomeHero,
  TrustMetricsStrip,
  ServiceStrip,
  RoleCard,
  useWelcome,
} from '@/features/auth';

export const WelcomePage: React.FC = () => {
  const { selectRole, goToLogin } = useWelcome();

  return (
    <div className="relative flex flex-1 flex-col justify-between w-full max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto px-4 py-4 sm:px-6 sm:py-6">
      {/* Top Hero Section with Upwork-style Workers Visual */}
      <div className="space-y-4">
        <WelcomeHero />
        <TrustMetricsStrip />
        <div className="pt-1">
          <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-2 text-center sm:text-left">
            Popular Trades in Addis Ababa
          </p>
          <ServiceStrip />
        </div>
      </div>

      {/* Role Selection Cards */}
      <div className="my-5 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 w-full">
        <RoleCard
          role="customer"
          title="I need a professional"
          description="Find, book, and pay verified tradespeople"
          perks={[
            'Independently assessed skills',
            'Milestone payments with M-PESA',
          ]}
          icon={User}
          onSelect={selectRole}
        />
        <RoleCard
          role="professional"
          title="I am a professional"
          description="Receive job requests and build your record"
          perks={[
            'Direct local customer requests',
            'Direct M-PESA payouts',
          ]}
          icon={Briefcase}
          onSelect={selectRole}
        />
      </div>

      {/* Bottom Login Link */}
      <div className="flex flex-col items-center pb-2 pt-1">
        <Button
          variant="link"
          className="h-auto p-0 text-xs sm:text-sm text-muted-foreground hover:text-foreground"
          onClick={goToLogin}
        >
          Already have an account?{' '}
          <span className="ml-1 font-semibold text-primary underline underline-offset-4">
            Log in
          </span>
        </Button>
      </div>
    </div>
  );
};
