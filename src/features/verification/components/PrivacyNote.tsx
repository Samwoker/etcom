import React from 'react';
import { Lock, ShieldAlert } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export const PrivacyNote: React.FC = () => {
  return (
    <div className="space-y-2.5">
      <Alert className="border-border bg-muted/40">
        <Lock className="h-4 w-4 text-foreground shrink-0" />
        <AlertTitle className="text-xs font-semibold text-foreground">
          Encrypted Identity Documents
        </AlertTitle>
        <AlertDescription className="text-[11px] text-muted-foreground mt-1 leading-relaxed">
          Your ID documents are encrypted, reviewed solely by Etcom compliance officers, and never revealed to customers.
        </AlertDescription>
      </Alert>

      <div className="p-3 rounded-xl bg-primary/5 border border-primary/20 space-y-1 text-xs">
        <div className="flex items-center gap-1.5 font-semibold text-primary">
          <ShieldAlert className="h-3.5 w-3.5" />
          <span>Independent Identity Verification</span>
        </div>
        <p className="text-[11px] text-muted-foreground leading-relaxed">
          Identity verification confirms legal Ethiopian citizenship. It does not certify your plumbing or electrical trade skills, which are assessed separately in Step 2.
        </p>
      </div>
    </div>
  );
};
