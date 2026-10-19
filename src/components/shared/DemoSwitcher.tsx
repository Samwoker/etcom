import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sliders, RefreshCw, CheckCircle2, XCircle, User, Briefcase, Shield } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useDemoStore } from '@/store/demoStore';
import { ROUTES } from '@/app/routes';
import type { Role } from '@/types';

export const DemoSwitcher: React.FC = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const {
    role,
    setRole,
    paymentOutcome,
    setPaymentOutcome,
    resetDemoData,
    simulateWorkFinished,
  } = useDemoStore();

  const handleSelectRole = (newRole: Role) => {
    setRole(newRole);
    setOpen(false);
    if (newRole === 'customer') {
      navigate(ROUTES.CUSTOMER_HOME);
    } else if (newRole === 'professional') {
      navigate(ROUTES.PRO_DASHBOARD);
    } else if (newRole === 'admin') {
      navigate(ROUTES.ADMIN_QUEUE);
    }
  };

  const handleReset = () => {
    resetDemoData();
    navigate(ROUTES.CUSTOMER_HOME);
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          size="icon"
          className="fixed bottom-20 md:bottom-22 right-4 md:right-8 z-40 h-11 w-11 md:h-12 md:w-12 rounded-full shadow-lg bg-foreground text-background hover:bg-neutral-800 transition-transform active:scale-95"
          aria-label="Open Demo Switcher"
        >
          <Sliders className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="rounded-t-2xl px-6 py-5 max-w-xl md:max-w-2xl mx-auto">
        <SheetHeader className="text-left mb-4">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-lg font-semibold text-foreground">
              Demo Presenter Tools
            </SheetTitle>
            <Badge variant="outline" className="capitalize text-xs font-semibold">
              Current: {role}
            </Badge>
          </div>
          <SheetDescription className="text-xs text-muted-foreground">
            Switch role viewpoints, configure M-PESA test outcomes, or reset fixtures.
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-4">
          {/* Role Switching */}
          <div>
            <label className="text-xs font-semibold uppercase text-muted-foreground tracking-wider mb-2 block">
              Switch Perspective
            </label>
            <div className="grid grid-cols-3 gap-2">
              <Button
                variant={role === 'customer' ? 'default' : 'outline'}
                size="sm"
                className={`h-11 flex-col gap-1 rounded-xl text-xs ${
                  role === 'customer' ? 'bg-primary text-primary-foreground' : ''
                }`}
                onClick={() => handleSelectRole('customer')}
              >
                <User className="h-4 w-4" />
                Customer
              </Button>
              <Button
                variant={role === 'professional' ? 'default' : 'outline'}
                size="sm"
                className={`h-11 flex-col gap-1 rounded-xl text-xs ${
                  role === 'professional' ? 'bg-primary text-primary-foreground' : ''
                }`}
                onClick={() => handleSelectRole('professional')}
              >
                <Briefcase className="h-4 w-4" />
                Professional
              </Button>
              <Button
                variant={role === 'admin' ? 'default' : 'outline'}
                size="sm"
                className={`h-11 flex-col gap-1 rounded-xl text-xs ${
                  role === 'admin' ? 'bg-primary text-primary-foreground' : ''
                }`}
                onClick={() => handleSelectRole('admin')}
              >
                <Shield className="h-4 w-4" />
                Admin
              </Button>
            </div>
          </div>

          {/* Payment Simulation Outcome */}
          <div>
            <label className="text-xs font-semibold uppercase text-muted-foreground tracking-wider mb-2 block">
              Simulated M-PESA Outcome
            </label>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant={paymentOutcome === 'success' ? 'default' : 'outline'}
                size="sm"
                className={`h-10 gap-1.5 rounded-xl text-xs ${
                  paymentOutcome === 'success'
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                    : ''
                }`}
                onClick={() => setPaymentOutcome('success')}
              >
                <CheckCircle2 className="h-4 w-4" />
                Force Success
              </Button>
              <Button
                variant={paymentOutcome === 'fail' ? 'destructive' : 'outline'}
                size="sm"
                className="h-10 gap-1.5 rounded-xl text-xs"
                onClick={() => setPaymentOutcome('fail')}
              >
                <XCircle className="h-4 w-4" />
                Force Failure
              </Button>
            </div>
          </div>

          {/* Verification & Lifecycle Simulation */}
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase text-muted-foreground tracking-wider block">
              Pro & Job Simulations
            </label>
            <Button
              variant="outline"
              size="sm"
              className="w-full h-10 gap-1.5 rounded-xl text-xs font-medium"
              onClick={() => {
                simulateWorkFinished();
                setOpen(false);
              }}
            >
              <CheckCircle2 className="h-4 w-4 text-primary" />
              Simulate: professional finished work
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full h-10 gap-1.5 rounded-xl text-xs font-medium"
              onClick={() => {
                useDemoStore.getState().cycleProVerificationStatus();
                setOpen(false);
              }}
            >
              <Shield className="h-4 w-4 text-primary" />
              Cycle pro verification status (in_review / verified / info needed / unverified)
            </Button>
          </div>

          {/* Reset Demo */}
          <div className="pt-2">
            <Button
              variant="outline"
              className="w-full h-11 gap-2 rounded-xl text-xs text-muted-foreground hover:text-foreground"
              onClick={handleReset}
            >
              <RefreshCw className="h-4 w-4" />
              Reset Demo Data & Return to Home
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
