import React from 'react';
import { Star, ShieldCheck, Smartphone } from 'lucide-react';

interface MetricItem {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle: string;
}

const METRICS: MetricItem[] = [
  {
    icon: Star,
    title: '4.9 / 5 Rating',
    subtitle: '1,200+ jobs completed',
  },
  {
    icon: ShieldCheck,
    title: 'Verified Skills',
    subtitle: 'Independently checked',
  },
  {
    icon: Smartphone,
    title: 'M-PESA Direct',
    subtitle: 'Prompt local payouts',
  },
];

export const TrustMetricsStrip: React.FC = () => {
  return (
    <div className="grid grid-cols-3 gap-2 py-2">
      {METRICS.map((metric, idx) => {
        const Icon = metric.icon;
        return (
          <div
            key={idx}
            className="flex flex-col items-center text-center p-2 rounded-xl bg-card/60 backdrop-blur-xs border border-border/60 shadow-2xs"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-secondary text-primary mb-1">
              <Icon className="h-3.5 w-3.5" />
            </div>
            <span className="text-[11px] font-semibold text-foreground leading-tight">
              {metric.title}
            </span>
            <span className="text-[10px] text-muted-foreground leading-tight mt-0.5 hidden sm:inline">
              {metric.subtitle}
            </span>
          </div>
        );
      })}
    </div>
  );
};
