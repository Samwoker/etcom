import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Compass,
  RotateCcw,
  ChevronRight,
  ChevronLeft,
  X,
  Wrench,
  Paintbrush,
  UserCheck,
  WifiOff,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { useDemoStore, type DemoScenario } from '@/store/demoStore';
import { ROUTES } from '@/app/routes';
import { OfflineAlertModal } from './OfflineAlertModal';

interface ScenarioStepDef {
  title: string;
  role: 'customer' | 'professional' | 'admin';
  route: string;
  description: string;
  setupAction?: () => void;
}

const SCENARIOS: Record<
  Exclude<DemoScenario, 'none'>,
  {
    id: Exclude<DemoScenario, 'none'>;
    title: string;
    subtitle: string;
    icon: React.ComponentType<{ className?: string }>;
    steps: ScenarioStepDef[];
  }
> = {
  need_plumber: {
    id: 'need_plumber',
    title: 'Need Plumber Now (Tedi\'s Leak)',
    subtitle: 'Addis Ababa emergency plumbing dispatch to digital receipt',
    icon: Wrench,
    steps: [
      {
        title: 'Emergency Request & Diagnostics',
        role: 'customer',
        route: ROUTES.CUSTOMER_REQUEST_NEW,
        description: 'Tedi enters a kitchen leak in Bole with guided diagnostics and voice note.',
        setupAction: () => {
          const store = useDemoStore.getState();
          store.setRole('customer');
          store.setDraftRequest({
            category: 'Plumbing',
            description: 'My kitchen sink pipe burst and water is leaking rapidly under the cabinet.',
            photos: ['https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=600&auto=format&fit=crop&q=80'],
            subCity: 'Bole',
            urgency: 'asap',
            verificationPreference: 'verified_skills',
            diagnosticAnswers: {
              issueType: 'Burst Pipe',
              location: 'Kitchen sink',
              duration: 'Started today',
              waterSupplyOff: 'Yes, main valve closed',
            },
          });
        },
      },
      {
        title: 'Nearby Pros & Distance Filter',
        role: 'customer',
        route: ROUTES.CUSTOMER_RESULTS,
        description: 'Discover nearby rated professionals sorted by distance in Bole.',
        setupAction: () => {
          useDemoStore.getState().setRole('customer');
        },
      },
      {
        title: 'Tripartite Verified Pro Profile',
        role: 'customer',
        route: ROUTES.CUSTOMER_PRO_DETAIL('p1'),
        description: 'Inspect Abebe Bikila: Fayda ID, TVET Level 4 certified, 28 paid jobs.',
        setupAction: () => {
          useDemoStore.getState().setRole('customer');
        },
      },
      {
        title: 'Direct Chat & Masked Voice Call',
        role: 'customer',
        route: ROUTES.CUSTOMER_JOB_CHAT('job-1'),
        description: 'Discuss scope and test masked in-app voice call simulation.',
        setupAction: () => {
          useDemoStore.getState().setRole('customer');
        },
      },
      {
        title: 'Pay-on-Completion Agreement',
        role: 'customer',
        route: ROUTES.CUSTOMER_JOB_CONFIRM('job-1'),
        description: 'Lock 450 ETB binding labor with 0 advance deposit guarantee.',
        setupAction: () => {
          const store = useDemoStore.getState();
          store.setRole('customer');
          store.updateJob('job-1', {
            lifecycleStage: 'accepted',
            actualLaborETB: 450,
            actualMaterialsETB: 0,
          });
        },
      },
      {
        title: 'Map Dispatch & Arrival Tracker',
        role: 'customer',
        route: ROUTES.CUSTOMER_JOB_DETAIL('job-1'),
        description: 'Track Abebe moving through Bole on map with live ETA.',
        setupAction: () => {
          const store = useDemoStore.getState();
          store.setRole('customer');
          store.dispatchJob('job-1');
        },
      },
      {
        title: 'Pro On-Site Scope & Work Timer',
        role: 'professional',
        route: ROUTES.PRO_JOB_DETAIL('job-1'),
        description: 'Switch to Pro: Abebe confirms scope on-site and starts work timer.',
        setupAction: () => {
          const store = useDemoStore.getState();
          store.setRole('professional');
          store.arriveProAtSite('job-1');
          store.startProJob('job-1', 450, 0, 'On-site inspection confirmed kitchen pipe leak');
        },
      },
      {
        title: 'Pro Finishes & After-Photos',
        role: 'professional',
        route: ROUTES.PRO_JOB_DETAIL('job-1'),
        description: 'Abebe attaches after-photos of the fixed pipe and requests sign-off.',
        setupAction: () => {
          const store = useDemoStore.getState();
          store.setRole('professional');
          store.finishProJob(
            'job-1',
            ['https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&auto=format&fit=crop&q=80'],
            45
          );
        },
      },
      {
        title: 'Customer Sign-Off & M-PESA USSD',
        role: 'customer',
        route: ROUTES.CUSTOMER_JOB_COMPLETE('job-1'),
        description: 'Tedi inspects before/after photos and enters M-PESA PIN via USSD push.',
        setupAction: () => {
          useDemoStore.getState().setRole('customer');
        },
      },
      {
        title: 'Digital Receipt & Portable Portfolio',
        role: 'customer',
        route: ROUTES.CUSTOMER_JOB_PAY('job-1'),
        description: 'Digital receipt with 8% labor commission breakdown and 2-hour review editing.',
        setupAction: () => {
          const store = useDemoStore.getState();
          store.setRole('customer');
          store.processPayment('job-1', '+251 71 123 4567');
        },
      },
    ],
  },
  plan_painting: {
    id: 'plan_painting',
    title: 'Plan Painting Project',
    subtitle: 'Scope room, compare verified portfolios, itemized hardware receipt',
    icon: Paintbrush,
    steps: [
      {
        title: 'Scope Painting Details',
        role: 'customer',
        route: ROUTES.CUSTOMER_REQUEST_NEW,
        description: 'Customer describes a 4x5m living room project with 2 coats.',
        setupAction: () => {
          const store = useDemoStore.getState();
          store.setRole('customer');
          store.setDraftRequest({
            category: 'Painting',
            description: 'Living room repaint: 4x5m walls, neutral gray finish, surface patching required.',
            photos: ['https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=600&auto=format&fit=crop&q=80'],
            subCity: 'Kirkos',
            urgency: 'flexible',
            verificationPreference: 'verified_skills',
            diagnosticAnswers: {
              roomSize: '4x5 meters',
              coatsNeeded: '2 coats',
              materialsIncluded: 'Pro provides paint',
            },
          });
        },
      },
      {
        title: 'Compare Verified Painters',
        role: 'customer',
        route: ROUTES.CUSTOMER_RESULTS,
        description: 'Filter for Painters with verified TVET skills and completed jobs.',
        setupAction: () => {
          useDemoStore.getState().setRole('customer');
        },
      },
      {
        title: 'Itemized Quote & Materials Reimbursement',
        role: 'customer',
        route: ROUTES.CUSTOMER_JOB_CHAT('job-2'),
        description: 'Review quote: 2,500 ETB labor (8% platform fee) + 1,800 ETB paint (0% fee).',
        setupAction: () => {
          useDemoStore.getState().setRole('customer');
        },
      },
      {
        title: 'Lock Binding Terms (Zero Escrow)',
        role: 'customer',
        route: ROUTES.CUSTOMER_JOB_CONFIRM('job-2'),
        description: 'Confirm agreement terms with pay-on-completion guarantee.',
        setupAction: () => {
          useDemoStore.getState().setRole('customer');
        },
      },
      {
        title: 'Portable Proof of Work Minted',
        role: 'customer',
        route: ROUTES.CUSTOMER_PRO_DETAIL('p2'),
        description: 'Finished painting automatically becomes a verified portfolio entry.',
        setupAction: () => {
          useDemoStore.getState().setRole('customer');
        },
      },
    ],
  },
  pro_onboarding: {
    id: 'pro_onboarding',
    title: 'Join as Professional (Fayda & TVET)',
    subtitle: 'From M-PESA sign-up to admin approval and verified badges',
    icon: UserCheck,
    steps: [
      {
        title: 'M-PESA Phone Registration',
        role: 'professional',
        route: ROUTES.PRO_ONBOARDING,
        description: 'Professional begins onboarding with verified Safaricom SIM.',
        setupAction: () => {
          useDemoStore.getState().setRole('professional');
        },
      },
      {
        title: 'Fayda National ID Upload',
        role: 'professional',
        route: ROUTES.PRO_VERIFY_IDENTITY,
        description: 'Submit Fayda card and live selfie for OCR matching.',
        setupAction: () => {
          useDemoStore.getState().setRole('professional');
        },
      },
      {
        title: 'TVET Credential Verification',
        role: 'professional',
        route: ROUTES.PRO_VERIFY_SKILLS,
        description: 'Upload Level 4 TVET vocational diploma for trade vetting.',
        setupAction: () => {
          useDemoStore.getState().setRole('professional');
        },
      },
      {
        title: 'Admin Review & Approval Queue',
        role: 'admin',
        route: ROUTES.ADMIN_QUEUE,
        description: 'Switch to Admin: inspect Fayda match, verify TVET diploma, approve with 1-click.',
        setupAction: () => {
          useDemoStore.getState().setRole('admin');
        },
      },
      {
        title: 'Tripartite Verified Listing',
        role: 'professional',
        route: ROUTES.PRO_VERIFICATION,
        description: 'Pro profile now displays separate Identity and Skills verified badges.',
        setupAction: () => {
          const store = useDemoStore.getState();
          store.setRole('professional');
          store.saveReviewDecision('p1', {
            category: 'identity',
            identityStatus: 'verified',
          });
          store.saveReviewDecision('p1', {
            category: 'skills',
            skillsStatus: 'evidence_accepted',
          });
        },
      },
    ],
  },
};

export const DemoDirector: React.FC = () => {
  const navigate = useNavigate();
  const [selectorOpen, setSelectorOpen] = useState(false);
  const [offlineModalOpen, setOfflineModalOpen] = useState(false);

  const { activeScenario, scenarioStep, setScenario, advanceScenario, resetDemoData, setRole } =
    useDemoStore();

  const currentScenarioConfig = activeScenario !== 'none' ? SCENARIOS[activeScenario] : null;
  const currentStep =
    currentScenarioConfig && scenarioStep <= currentScenarioConfig.steps.length
      ? currentScenarioConfig.steps[scenarioStep - 1]
      : null;

  const handleStartScenario = (scenarioKey: Exclude<DemoScenario, 'none'>) => {
    const config = SCENARIOS[scenarioKey];
    setScenario(scenarioKey, 1);
    setSelectorOpen(false);

    // Run first step setup & navigate
    const firstStep = config.steps[0];
    if (firstStep.setupAction) {
      firstStep.setupAction();
    }
    setRole(firstStep.role);
    navigate(firstStep.route);
  };

  const handleNextStep = () => {
    if (!currentScenarioConfig) return;

    if (scenarioStep < currentScenarioConfig.steps.length) {
      const nextStepIndex = scenarioStep; // 0-indexed for next
      const nextStep = currentScenarioConfig.steps[nextStepIndex];
      advanceScenario();
      if (nextStep.setupAction) {
        nextStep.setupAction();
      }
      setRole(nextStep.role);
      navigate(nextStep.route);
    } else {
      // Completed scenario
      setScenario('none', 1);
    }
  };

  const handlePrevStep = () => {
    if (!currentScenarioConfig || scenarioStep <= 1) return;

    const prevStepIndex = scenarioStep - 2;
    const prevStep = currentScenarioConfig.steps[prevStepIndex];
    setScenario(currentScenarioConfig.id, scenarioStep - 1);
    if (prevStep.setupAction) {
      prevStep.setupAction();
    }
    setRole(prevStep.role);
    navigate(prevStep.route);
  };

  const handleReset = () => {
    resetDemoData();
    setScenario('none', 1);
    setRole('customer');
    navigate(ROUTES.CUSTOMER_HOME);
    setSelectorOpen(false);
  };

  return (
    <>
      {/* Floating Launcher Pill when no scenario active */}
      {activeScenario === 'none' && (
        <button
          type="button"
          onClick={() => setSelectorOpen(true)}
          className="fixed bottom-20 md:bottom-22 left-4 z-40 h-10 px-3.5 rounded-full shadow-lg bg-primary text-primary-foreground font-semibold text-xs flex items-center gap-2 hover:bg-primary/90 active:scale-95 transition-all border border-primary-foreground/20"
          aria-label="Launch Guided Demo Scenario"
        >
          <Sparkles className="h-4 w-4" />
          <span>Demo Director</span>
        </button>
      )}

      {/* Persistent Banner when scenario IS active */}
      {currentScenarioConfig && currentStep && (
        <div className="sticky top-0 z-50 w-full bg-neutral-900 text-neutral-100 border-b border-neutral-800 shadow-md">
          <div className="max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto px-3.5 py-2.5">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 overflow-hidden">
                <Badge
                  variant="outline"
                  className="bg-primary/20 text-primary-foreground border-primary/40 text-xs font-semibold shrink-0"
                >
                  Step {scenarioStep}/{currentScenarioConfig.steps.length}
                </Badge>
                <div className="truncate">
                  <div className="text-xs font-bold text-neutral-100 truncate">
                    {currentStep.title}
                  </div>
                  <div className="text-xs text-neutral-400 truncate hidden sm:block">
                    {currentStep.description}
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-1.5 shrink-0">
                {scenarioStep > 1 && (
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={handlePrevStep}
                    className="h-7 w-7 text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800 rounded-md"
                    title="Previous step"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                )}

                <Button
                  size="sm"
                  onClick={handleNextStep}
                  className="h-7 px-2.5 bg-primary text-primary-foreground text-xs font-semibold rounded-md hover:bg-primary/90 flex items-center gap-1 shadow-xs"
                >
                  <span>{scenarioStep === currentScenarioConfig.steps.length ? 'Finish' : 'Next'}</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </Button>

                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setScenario('none', 1)}
                  className="h-7 w-7 text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800 rounded-md"
                  title="Exit scenario"
                >
                  <X className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Scenario Selector Modal */}
      <Dialog open={selectorOpen} onOpenChange={setSelectorOpen}>
        <DialogContent className="sm:max-w-lg rounded-2xl p-5 max-h-[90vh] overflow-y-auto">
          <DialogHeader className="text-left space-y-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Compass className="h-4 w-4" />
                </div>
                <DialogTitle className="text-base font-bold text-foreground">
                  Demo Director Modes
                </DialogTitle>
              </div>
              <Badge variant="outline" className="text-xs font-medium">
                M-PESA Mini-App
              </Badge>
            </div>
            <DialogDescription className="text-xs text-muted-foreground">
              Select an automated walkthrough to demonstrate ETCom 2.0 to investors, partners, or tradespeople.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 pt-2">
            {/* Scenario A: Plumber Emergency */}
            <div
              onClick={() => handleStartScenario('need_plumber')}
              className="p-3.5 rounded-xl border border-border/80 bg-card hover:border-primary/50 hover:bg-muted/30 cursor-pointer transition-all space-y-1.5 group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-semibold text-xs text-foreground group-hover:text-primary">
                  <Wrench className="h-4 w-4 text-primary" />
                  <span>Scenario A: Need Plumber Now</span>
                </div>
                <Badge variant="secondary" className="text-xs font-medium">
                  10 Steps
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Tedi&apos;s emergency leak in Bole → guided diagnostics → nearby plumbers → masked call → lock 450 ETB binding labor → map arrival → on-site work timer → after photos → M-PESA USSD PIN sign-off → digital receipt.
              </p>
            </div>

            {/* Scenario B: Painting Project */}
            <div
              onClick={() => handleStartScenario('plan_painting')}
              className="p-3.5 rounded-xl border border-border/80 bg-card hover:border-primary/50 hover:bg-muted/30 cursor-pointer transition-all space-y-1.5 group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-semibold text-xs text-foreground group-hover:text-primary">
                  <Paintbrush className="h-4 w-4 text-primary" />
                  <span>Scenario B: Plan Painting Project</span>
                </div>
                <Badge variant="secondary" className="text-xs font-medium">
                  5 Steps
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Room dimensions scoping → compare vetted painters → itemized quote (8% labor fee + 0% materials fee) → lock binding agreement → verified permanent portfolio entry.
              </p>
            </div>

            {/* Scenario C: Pro Onboarding */}
            <div
              onClick={() => handleStartScenario('pro_onboarding')}
              className="p-3.5 rounded-xl border border-border/80 bg-card hover:border-primary/50 hover:bg-muted/30 cursor-pointer transition-all space-y-1.5 group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-semibold text-xs text-foreground group-hover:text-primary">
                  <UserCheck className="h-4 w-4 text-primary" />
                  <span>Scenario C: Join as Professional</span>
                </div>
                <Badge variant="secondary" className="text-xs font-medium">
                  5 Steps
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Safaricom phone verification → Fayda National ID + selfie → TVET Level 4 diploma upload → Admin review queue &amp; 1-click verification → Tripartite verified profile.
              </p>
            </div>

            {/* Additional Presentation Tools */}
            <div className="pt-2 border-t border-border/60 flex items-center justify-between gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSelectorOpen(false);
                  setOfflineModalOpen(true);
                }}
                className="h-8 gap-1.5 text-xs rounded-lg"
              >
                <WifiOff className="h-3.5 w-3.5 text-amber-500" />
                Test Offline USSD Fallback
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={handleReset}
                className="h-8 gap-1.5 text-xs text-muted-foreground hover:text-foreground rounded-lg"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Reset Demo Data
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Offline USSD Simulation Modal */}
      <OfflineAlertModal
        open={offlineModalOpen}
        onOpenChange={setOfflineModalOpen}
      />
    </>
  );
};
