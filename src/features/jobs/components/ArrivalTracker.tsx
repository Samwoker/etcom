import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Phone, FastForward, Shield } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { Job, Professional } from '@/types';

interface ArrivalTrackerProps {
  job: Job;
  pro?: Professional | null;
  onSimulateArrival: () => void;
  onCallPro: () => void;
}

export const ArrivalTracker: React.FC<ArrivalTrackerProps> = ({
  job,
  pro,
  onSimulateArrival,
  onCallPro,
}) => {
  const [etaMinutes] = useState(8);
  const [progress, setProgress] = useState(25);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => (prev >= 90 ? 25 : prev + 5));
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  const isArrived = job.lifecycleStage === 'arrived' || job.completionStatus === 'in_progress';

  return (
    <Card className="border border-border/80 shadow-sm overflow-hidden rounded-2xl bg-card">
      {/* Map Simulation Visual Canvas */}
      <div className="relative h-44 w-full bg-slate-900 overflow-hidden flex items-center justify-center">
        {/* Subtle Map Grid Lines */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#4CB848_1px,transparent_1px)] [background-size:16px_16px]" />

        {/* Addis Ababa Street Simulation Roads */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 180" preserveAspectRatio="none">
          <path
            d="M 20 140 Q 120 40 200 90 T 380 40"
            fill="none"
            stroke="#334155"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <path
            d="M 20 140 Q 120 40 200 90 T 380 40"
            fill="none"
            stroke="#4CB848"
            strokeWidth="3"
            strokeDasharray="6,6"
            strokeDashoffset={-progress}
          />

          {/* Destination Pin (Customer location) */}
          <circle cx="360" cy="45" r="14" fill="#4CB848" fillOpacity="0.2" className="animate-ping" />
          <circle cx="360" cy="45" r="8" fill="#4CB848" />
        </svg>

        {/* Professional Location Marker (Moving along the path) */}
        <div
          className="absolute z-10 flex flex-col items-center transition-all duration-700 ease-out"
          style={{
            left: `${Math.min(85, Math.max(15, progress))}%`,
            top: `${progress < 50 ? 55 : 40}%`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div className="relative">
            <div className="h-9 w-9 rounded-full bg-white shadow-xs border-2 border-primary flex items-center justify-center p-0.5">
              <Avatar className="h-full w-full">
                <AvatarImage src={pro?.avatarUrl} alt={pro?.fullName} />
                <AvatarFallback className="text-xs bg-primary text-white font-bold">
                  {pro?.fullName?.slice(0, 2) || 'PR'}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="absolute -bottom-1 -right-1 h-3.5 w-3.5 bg-primary rounded-full border border-white flex items-center justify-center">
              <Navigation className="h-2 w-2 text-white" />
            </div>
          </div>
          <span className="text-xs font-medium text-white bg-slate-900/90 px-2 py-0.5 rounded-full mt-1 border border-slate-700 whitespace-nowrap shadow-xs">
            {pro?.fullName?.split(' ')[0] || 'Pro'}
          </span>
        </div>

        {/* Customer Location Pin Label */}
        <div className="absolute right-3 top-2 z-10 flex items-center gap-1 bg-slate-900/90 px-2.5 py-1 rounded-lg border border-slate-700 text-xs text-white">
          <MapPin className="h-3.5 w-3.5 text-primary" />
          <span>{job.subCity || 'Bole'}, Addis Ababa</span>
        </div>

        {/* Pitch Demo Watermark Tag */}
        <div className="absolute left-3 top-2 z-10">
          <Badge variant="outline" className="text-xs bg-slate-900/90 text-emerald-300 border-emerald-500/40 px-2 py-0.5 font-medium">
            SIMULATED ROUTE
          </Badge>
        </div>
      </div>

      <CardContent className="p-4 space-y-3">
        {/* Status Bar & ETA */}
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-bold text-foreground">
                {isArrived ? 'Professional has arrived on site' : 'Professional is en route'}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              {isArrived ? 'Preparing on-site scope inspection' : `Estimated arrival in ~${etaMinutes} mins`}
            </p>
          </div>

          <Badge className="bg-primary/10 text-primary border-primary/20 text-xs px-2.5 py-1 font-semibold">
            {isArrived ? 'On Site' : 'Dispatched'}
          </Badge>
        </div>

        {/* Pro Info & Secure In-App Call Action */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-muted/40 border border-border">
          <div className="flex items-center gap-2.5">
            <Avatar className="h-9 w-9 border border-border">
              <AvatarImage src={pro?.avatarUrl} alt={pro?.fullName} />
              <AvatarFallback className="text-xs font-bold bg-primary/10 text-primary">
                {pro?.fullName?.slice(0, 2) || 'PR'}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold text-foreground">{pro?.fullName}</span>
                <Shield className="h-3.5 w-3.5 text-primary" />
              </div>
              <span className="text-xs text-muted-foreground">
                {pro?.trade} • Phone masked for privacy
              </span>
            </div>
          </div>

          <Button
            size="sm"
            onClick={onCallPro}
            className="h-8 rounded-full text-xs font-semibold bg-primary text-primary-foreground hover:bg-emerald-700 gap-1.5 px-3"
          >
            <Phone className="h-3.5 w-3.5" />
            <span>Call in App</span>
          </Button>
        </div>

        {/* Fast Forward Action for Live Pitch Presentation */}
        {!isArrived && (
          <Button
            variant="outline"
            size="sm"
            onClick={onSimulateArrival}
            className="w-full h-8 text-xs rounded-lg border-dashed border-primary/40 text-primary hover:bg-primary/5 gap-1.5 font-medium"
          >
            <FastForward className="h-3.5 w-3.5" />
            <span>Pitch Shortcut: Simulate Professional Arrival</span>
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
