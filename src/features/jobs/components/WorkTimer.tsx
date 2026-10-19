import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface WorkTimerProps {
  startedAt?: string;
}

export const WorkTimer: React.FC<WorkTimerProps> = ({ startedAt }) => {
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);

  useEffect(() => {
    if (!startedAt) return;

    const startMs = new Date(startedAt).getTime();

    const updateTimer = () => {
      const nowMs = Date.now();
      const diffSec = Math.max(0, Math.floor((nowMs - startMs) / 1000));
      setElapsedSeconds(diffSec);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [startedAt]);

  const hours = Math.floor(elapsedSeconds / 3600);
  const minutes = Math.floor((elapsedSeconds % 3600) / 60);
  const seconds = elapsedSeconds % 60;

  const formatted = `${hours > 0 ? `${hours.toString().padStart(2, '0')}:` : ''}${minutes
    .toString()
    .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  return (
    <Card className="border border-primary/30 bg-primary/5 rounded-2xl overflow-hidden shadow-2xs">
      <CardContent className="p-3.5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="h-9 w-9 rounded-full bg-primary/15 flex items-center justify-center text-primary">
            <Clock className="h-5 w-5 animate-spin [animation-duration:8s]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-bold text-foreground uppercase tracking-wider">
                Work In Progress
              </span>
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            </div>
            <p className="text-[10px] text-muted-foreground">
              Recorded for audit only. Agreed labor price is charged, not the clock.
            </p>
          </div>
        </div>

        <div className="text-right">
          <span className="font-mono text-lg font-bold text-primary tracking-tight">
            {formatted}
          </span>
          <span className="text-[10px] text-muted-foreground block">Elapsed Time</span>
        </div>
      </CardContent>
    </Card>
  );
};
