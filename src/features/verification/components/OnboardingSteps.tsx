import React from 'react';
import { Progress } from '@/components/ui/progress';

interface OnboardingStepsProps {
  currentStep: 1 | 2 | 3;
}

const STEP_TITLES: Record<number, string> = {
  1: 'Trade & Service Area',
  2: 'Experience & Background',
  3: 'Photo & Review',
};

export const OnboardingSteps: React.FC<OnboardingStepsProps> = ({ currentStep }) => {
  const percent = Math.round((currentStep / 3) * 100);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs">
        <span className="font-semibold text-foreground">
          Step {currentStep} of 3: {STEP_TITLES[currentStep]}
        </span>
        <span className="text-muted-foreground font-mono">{percent}%</span>
      </div>
      <Progress value={percent} className="h-2 rounded-full" />
    </div>
  );
};
