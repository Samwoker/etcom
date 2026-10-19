import React from 'react';
import { ShieldCheck, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const WelcomeHero: React.FC = () => {
  return (
    <div className="flex flex-col items-center text-center pt-1 md:pt-3">

      {/* Brand & Main Headlines */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-primary">
        etcom
      </h1>
      <p className="mt-1 text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-foreground">
        How Addis Ababa gets skilled work done.
      </p>
      <p className="mt-1.5 max-w-[320px] sm:max-w-md text-xs sm:text-sm text-muted-foreground leading-relaxed">
        Hire independently assessed tradespeople in Addis Ababa. Pay milestone by milestone with M-PESA.
      </p>

      {/* Upwork-style Visual Showcase Banner */}
      <div className="relative mt-4 w-full overflow-hidden rounded-2xl md:rounded-3xl border border-border/80 bg-card shadow-md">
        <div className="relative h-44 sm:h-52 md:h-64 w-full overflow-hidden">
          <img
            src="/images/hero-workers.jpg"
            alt="Ethiopian electricians working on modern installation in Addis Ababa"
            className="h-full w-full object-cover object-[center_28%] transition-transform duration-700 hover:scale-105"
          />
          {/* Subtle gradient vignette for contrast and depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

          {/* Floating Upwork-style Worker Highlight Pill */}
          <div className="absolute bottom-2.5 left-2.5 right-2.5 sm:bottom-3 sm:left-3 sm:right-3 flex items-center justify-between rounded-xl bg-card/90 backdrop-blur-md border border-border/80 px-3 py-2 shadow-lg">
            <div className="flex flex-col text-left">
              <div className="flex items-center gap-1.5">
                <span className="text-xs sm:text-sm font-bold text-foreground">
                  Dawit & Tigist
                </span>
                <span className="flex items-center text-[10px] sm:text-xs font-semibold text-amber-500">
                  <Star className="h-3 w-3 fill-amber-500 text-amber-500 mr-0.5" />
                  4.98
                </span>
              </div>
              <span className="text-[10px] sm:text-[11px] text-muted-foreground">
                Electricians • Bole Sub-City
              </span>
            </div>

            <Badge
              variant="secondary"
              className="flex items-center gap-1 text-[10px] sm:text-xs font-semibold text-primary bg-secondary/90 border border-primary/30"
            >
              <ShieldCheck className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
              <span>Skills Assessed</span>
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
};
