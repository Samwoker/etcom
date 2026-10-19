import React from 'react';
import { CheckCircle2, Clock, Image, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatETB } from '@/lib/format';
import type { Job } from '@/types';

interface JobCompletionSummaryCardProps {
  job: Job;
  onReviewAndPay: () => void;
}

export const JobCompletionSummaryCard: React.FC<JobCompletionSummaryCardProps> = ({
  job,
  onReviewAndPay,
}) => {
  const labor = job.actualLaborETB || job.activeQuote?.laborAmountETB || 1000;
  const materials = job.actualMaterialsETB || job.activeQuote?.materialsAmountETB || 0;
  const total = labor + materials;

  const beforePhoto = job.photos?.[0];
  const afterPhoto = job.afterPhotos?.[0] || 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400';

  return (
    <Card className="border border-primary/40 bg-card rounded-2xl overflow-hidden shadow-sm">
      <div className="bg-primary/10 px-4 py-2.5 flex items-center justify-between border-b border-primary/20">
        <div className="flex items-center gap-1.5 text-xs font-bold text-foreground">
          <CheckCircle2 className="h-4 w-4 text-primary" />
          <span>Work Finished On Site</span>
        </div>
        <Badge className="bg-primary text-primary-foreground text-[10px] px-2 py-0.5">
          Ready for Sign-Off
        </Badge>
      </div>

      <CardContent className="p-4 space-y-3.5">
        {/* Before and After Comparison Photos */}
        <div className="space-y-1.5">
          <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block">
            Work Evidence & Inspection
          </span>

          <div className="grid grid-cols-2 gap-2">
            {/* Before Photo */}
            <div className="space-y-1">
              <div className="relative aspect-video rounded-xl overflow-hidden bg-muted border border-border">
                {beforePhoto ? (
                  <img src={beforePhoto} alt="Before work" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground text-[10px]">
                    <Image className="h-4 w-4 mb-0.5 opacity-60" />
                    <span>Reported issue</span>
                  </div>
                )}
                <span className="absolute bottom-1 left-1.5 text-[9px] font-bold text-white bg-slate-900/80 px-1.5 py-0.5 rounded">
                  BEFORE
                </span>
              </div>
            </div>

            {/* After Photo */}
            <div className="space-y-1">
              <div className="relative aspect-video rounded-xl overflow-hidden bg-muted border border-emerald-500/40">
                <img src={afterPhoto} alt="After work" className="w-full h-full object-cover" />
                <span className="absolute bottom-1 left-1.5 text-[9px] font-bold text-white bg-emerald-700/90 px-1.5 py-0.5 rounded">
                  AFTER WORK
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Time Worked & Itemized Breakdown */}
        <div className="p-3 rounded-xl bg-muted/40 border border-border space-y-2 text-xs">
          <div className="flex justify-between items-center text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" /> Time Worked
            </span>
            <span className="font-semibold text-foreground">
              {job.durationMinutes || 45} minutes
            </span>
          </div>

          <div className="flex justify-between text-muted-foreground">
            <span>Agreed Labor</span>
            <span className="font-medium text-foreground">{formatETB(labor)}</span>
          </div>

          {materials > 0 && (
            <div className="flex justify-between text-muted-foreground">
              <span>Materials Reimbursement (0% fee)</span>
              <span className="font-medium text-foreground">{formatETB(materials)}</span>
            </div>
          )}

          <div className="border-t border-border/60 pt-1.5 flex justify-between font-bold text-sm text-foreground">
            <span>Total to Authorize</span>
            <span className="text-primary text-base">{formatETB(total)}</span>
          </div>
        </div>

        {/* Primary CTA */}
        <Button
          onClick={onReviewAndPay}
          className="w-full h-12 rounded-xl font-semibold bg-primary text-primary-foreground hover:bg-emerald-600 gap-2 shadow-sm"
        >
          <span>Rate Job & Pay via M-PESA</span>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
};
