import React, { useState } from 'react';
import { CheckCircle2, Camera, X, Clock } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { formatETB } from '@/lib/format';
import type { Job } from '@/types';

interface FinishJobModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  job: Job;
  elapsedMinutes: number;
  onFinish: (afterPhotos: string[], durationMinutes: number) => void;
}

const SAMPLE_AFTER_PHOTOS = [
  'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400',
  'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=400',
];

export const FinishJobModal: React.FC<FinishJobModalProps> = ({
  open,
  onOpenChange,
  job,
  elapsedMinutes,
  onFinish,
}) => {
  const [photos, setPhotos] = useState<string[]>([SAMPLE_AFTER_PHOTOS[0]]);

  const handleAddSamplePhoto = () => {
    if (photos.length < 2) {
      setPhotos([...photos, SAMPLE_AFTER_PHOTOS[1]]);
    }
  };

  const handleRemovePhoto = (idx: number) => {
    setPhotos(photos.filter((_, i) => i !== idx));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFinish(photos, elapsedMinutes);
    onOpenChange(false);
  };

  const labor = job.actualLaborETB || job.activeQuote?.laborAmountETB || 1000;
  const materials = job.actualMaterialsETB || job.activeQuote?.materialsAmountETB || 0;
  const total = labor + materials;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <DialogHeader className="space-y-1">
            <div className="flex items-center gap-2 text-primary">
              <CheckCircle2 className="h-5 w-5" />
              <DialogTitle className="text-base font-bold text-foreground">
                Finish Job & Upload After Photos
              </DialogTitle>
            </div>
            <DialogDescription className="text-xs text-muted-foreground">
              Provide evidence of completed work. Customer will review these photos on site before entering their M-PESA PIN.
            </DialogDescription>
          </DialogHeader>

          {/* Time & Price Summary */}
          <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-muted/40 border border-border text-xs">
            <div>
              <span className="text-[10px] text-muted-foreground block flex items-center gap-1">
                <Clock className="h-3 w-3" /> Time Worked
              </span>
              <span className="font-semibold text-foreground">
                {elapsedMinutes} minutes
              </span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-muted-foreground block">Total to Collect</span>
              <span className="font-bold text-primary text-sm">{formatETB(total)}</span>
            </div>
          </div>

          {/* After Photos Upload Section */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label className="text-xs font-semibold text-foreground">
                After Photos (Required proof of work)
              </Label>
              <span className="text-[10px] text-muted-foreground">{photos.length}/2 photos</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {photos.map((url, idx) => (
                <div key={idx} className="relative aspect-video rounded-xl overflow-hidden border border-border group bg-muted">
                  <img src={url} alt={`After work ${idx + 1}`} className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => handleRemovePhoto(idx)}
                    className="absolute top-1.5 right-1.5 h-5 w-5 rounded-full bg-slate-900/80 text-white flex items-center justify-center hover:bg-red-600 transition-colors"
                  >
                    <X className="h-3 w-3" />
                  </button>
                  <span className="absolute bottom-1 left-1.5 text-[9px] font-bold text-white bg-slate-900/80 px-1.5 py-0.5 rounded">
                    AFTER #{idx + 1}
                  </span>
                </div>
              ))}

              {photos.length < 2 && (
                <button
                  type="button"
                  onClick={handleAddSamplePhoto}
                  className="aspect-video rounded-xl border-2 border-dashed border-border hover:border-primary/50 flex flex-col items-center justify-center gap-1 text-muted-foreground hover:text-foreground transition-all bg-card"
                >
                  <Camera className="h-5 w-5 text-primary" />
                  <span className="text-[10px] font-medium">Add Photo</span>
                </button>
              )}
            </div>
          </div>

          <DialogFooter className="pt-2 flex items-center justify-between gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="h-10 text-xs rounded-xl"
            >
              Back to work
            </Button>
            <Button
              type="submit"
              disabled={photos.length === 0}
              className="h-10 text-xs font-semibold rounded-xl bg-primary text-primary-foreground hover:bg-emerald-600 gap-1.5"
            >
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>Submit & Request PIN Payment</span>
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
