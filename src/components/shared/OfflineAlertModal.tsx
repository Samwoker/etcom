import React, { useState } from 'react';
import { WifiOff, PhoneCall, MessageSquare, Check, Smartphone } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface OfflineAlertModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  phone?: string;
}

export const OfflineAlertModal: React.FC<OfflineAlertModalProps> = ({
  open,
  onOpenChange,
  phone = '+251 77 123 4567',
}) => {
  const [activeTab, setActiveTab] = useState<'sms' | 'ussd'>('ussd');

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md rounded-2xl p-5">
        <DialogHeader className="text-left space-y-1.5">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-600">
              <WifiOff className="h-4 w-4" />
            </div>
            <div>
              <DialogTitle className="text-base font-bold text-foreground">
                Offline & Weak Data Resilience
              </DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground">
                Ethiopian telecom edge fallback simulation
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4 pt-1">
          <div className="p-3 bg-muted/60 rounded-xl border border-border text-xs text-muted-foreground leading-relaxed">
            When 3G/4G connectivity drops in Addis Ababa neighborhoods, Etcom does not strand jobs. The platform automatically triggers an <strong className="text-foreground font-medium">SMS verification link</strong> and a <strong className="text-foreground font-medium">Safaricom M-PESA USSD push (*848#)</strong> directly to the user's phone.
          </div>

          {/* Toggle between USSD and SMS */}
          <div className="grid grid-cols-2 gap-1.5 p-1 bg-muted/80 rounded-xl border border-border/40">
            <button
              type="button"
              onClick={() => setActiveTab('ussd')}
              className={`py-2 text-xs font-medium rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'ussd'
                  ? 'bg-card text-foreground shadow-xs font-semibold'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <PhoneCall className="h-3.5 w-3.5 text-primary" />
              USSD Fallback (*848#)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('sms')}
              className={`py-2 text-xs font-medium rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'sms'
                  ? 'bg-card text-foreground shadow-xs font-semibold'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <MessageSquare className="h-3.5 w-3.5 text-primary" />
              SMS Notification
            </button>
          </div>

          {activeTab === 'ussd' ? (
            /* USSD Dialog Simulation */
            <div className="rounded-xl border border-border bg-neutral-900 text-neutral-100 p-4 space-y-3 font-mono text-xs shadow-inner">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-2 text-xs text-neutral-400">
                <span className="flex items-center gap-1.5">
                  <Smartphone className="h-4 w-4" />
                  Safaricom M-PESA USSD
                </span>
                <Badge variant="outline" className="border-emerald-600/50 text-emerald-400 text-xs px-2 py-0.5">
                  Active Session
                </Badge>
              </div>

              <div className="space-y-2 py-1">
                <p className="text-neutral-200">
                  Etcom Service: Confirm job completion with Abebe Bikila (Plumber).
                </p>
                <p className="text-neutral-300">
                  Amount: 450 ETB (Labor: 450 ETB, Materials: 0 ETB)
                </p>
                <p className="text-neutral-400 text-xs font-sans">
                  Enter your 4-digit M-PESA PIN to authorize instant release:
                </p>
                <div className="h-9 bg-neutral-800 rounded-lg px-3 flex items-center text-neutral-300 tracking-wider text-sm border border-neutral-700">
                  ••••
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-neutral-800">
                <span className="text-xs text-emerald-400 flex items-center gap-1">
                  <Check className="h-3.5 w-3.5" /> Encrypted C2B Session
                </span>
              </div>
            </div>
          ) : (
            /* SMS Notification Simulation */
            <div className="rounded-xl border border-border bg-card p-4 space-y-3 shadow-xs">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-foreground flex items-center gap-1.5">
                  <MessageSquare className="h-4 w-4 text-primary" />
                  SMS from &ldquo;Etcom&rdquo;
                </span>
                <span className="text-xs text-muted-foreground">Just now</span>
              </div>
              <div className="p-3 bg-muted/40 rounded-xl text-xs space-y-2 font-sans border border-border">
                <p className="text-foreground leading-relaxed">
                  <strong className="font-semibold">Etcom:</strong> Your job with Abebe Bikila is marked finished. Review before/after photos and confirm 450 ETB via M-PESA:
                </p>
                <p className="text-primary font-mono text-xs underline break-all">
                  https://etcom.et/j/job-1?auth=token_mpesa
                </p>
                <p className="text-xs text-muted-foreground pt-1 border-t border-border/50">
                  Or dial *848*1# from your registered Safaricom SIM.
                </p>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between pt-1">
            <span className="text-xs text-muted-foreground">
              Target SIM: <span className="text-foreground font-medium tabular-nums">{phone}</span>
            </span>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="h-8 text-xs rounded-lg"
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
