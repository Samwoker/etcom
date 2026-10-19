import React, { useState } from 'react';
import { Play, AlertCircle, Wrench } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { formatETB } from '@/lib/format';
import type { Job } from '@/types';

interface StartJobModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  job: Job;
  onStart: (laborETB: number, materialsETB: number, reason?: string) => void;
}

export const StartJobModal: React.FC<StartJobModalProps> = ({
  open,
  onOpenChange,
  job,
  onStart,
}) => {
  const initialLabor = job.activeQuote?.laborAmountETB || 1000;
  const initialMaterials = job.activeQuote?.materialsAmountETB || 0;

  const [laborETB, setLaborETB] = useState<number>(initialLabor);
  const [materialsETB, setMaterialsETB] = useState<number>(initialMaterials);
  const [scopeReason, setScopeReason] = useState<string>('');

  const isLaborChanged = laborETB !== initialLabor;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onStart(Number(laborETB), Number(materialsETB), scopeReason);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <DialogHeader className="space-y-1">
            <div className="flex items-center gap-2 text-primary">
              <Wrench className="h-5 w-5" />
              <DialogTitle className="text-base font-bold text-foreground">
                On-Site Job Start Form
              </DialogTitle>
            </div>
            <DialogDescription className="text-xs text-muted-foreground">
              Confirm scope and final agreed pricing on site before beginning work. Timer will start upon confirmation.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 py-1">
            {/* Labor Charge */}
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <Label htmlFor="start-labor" className="text-xs font-medium text-foreground">
                  Agreed Labor Charge (ETB)
                </Label>
                <span className="text-[11px] text-muted-foreground">Subject to 8% platform fee</span>
              </div>
              <Input
                id="start-labor"
                type="number"
                min={100}
                value={laborETB}
                onChange={(e) => setLaborETB(Number(e.target.value))}
                className="h-10 text-sm font-semibold rounded-xl"
                required
              />
            </div>

            {/* Materials Reimbursement */}
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <Label htmlFor="start-materials" className="text-xs font-medium text-foreground">
                  Materials Reimbursement (ETB)
                </Label>
                <span className="text-[11px] text-primary font-medium">0% platform fee</span>
              </div>
              <Input
                id="start-materials"
                type="number"
                min={0}
                value={materialsETB}
                onChange={(e) => setMaterialsETB(Number(e.target.value))}
                placeholder="0"
                className="h-10 text-sm font-semibold rounded-xl"
              />
              <p className="text-[10px] text-muted-foreground">
                Customer reimburses exact hardware receipt. Backed by hardware receipt photo.
              </p>
            </div>

            {/* Scope change note if changed */}
            {isLaborChanged && (
              <div className="space-y-1.5 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs">
                <div className="flex items-center gap-1.5 text-amber-700 dark:text-amber-400 font-semibold">
                  <AlertCircle className="h-3.5 w-3.5" />
                  <span>Labor scope changed from {formatETB(initialLabor)}</span>
                </div>
                <Textarea
                  value={scopeReason}
                  onChange={(e) => setScopeReason(e.target.value)}
                  placeholder="Reason for price adjustment discovered during on-site inspection..."
                  rows={2}
                  className="text-xs rounded-lg resize-none"
                  required
                />
              </div>
            )}
          </div>

          <DialogFooter className="pt-2 flex items-center justify-between gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="h-10 text-xs rounded-xl"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="h-10 text-xs font-semibold rounded-xl bg-primary text-primary-foreground hover:bg-emerald-600 gap-1.5"
            >
              <Play className="h-3.5 w-3.5" />
              <span>Confirm & Start Timer</span>
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
