import React from 'react';
import { AlertCircle, ArrowRight } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

interface AdminFeedbackCardProps {
  reason: string;
  onResolve: () => void;
}

export const AdminFeedbackCard: React.FC<AdminFeedbackCardProps> = ({
  reason,
  onResolve,
}) => {
  return (
    <Alert className="border-amber-500/40 bg-amber-500/5 text-amber-900 dark:text-amber-200">
      <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
      <div className="flex-1 space-y-1">
        <AlertTitle className="text-xs font-bold text-amber-900 dark:text-amber-200">
          Reviewer Action Required
        </AlertTitle>
        <AlertDescription className="text-xs text-amber-800/90 dark:text-amber-300/90 leading-relaxed">
          {reason}
        </AlertDescription>
        <div className="pt-1.5">
          <Button
            size="sm"
            onClick={onResolve}
            className="h-7 text-xs rounded-full gap-1 bg-amber-600 text-white hover:bg-amber-700"
          >
            <span>Provide updated evidence</span>
            <ArrowRight className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </Alert>
  );
};
