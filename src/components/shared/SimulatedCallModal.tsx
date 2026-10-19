import React, { useState, useEffect } from 'react';
import { PhoneOff, Mic, MicOff, Volume2, Shield } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface SimulatedCallModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  contactName: string;
  contactTrade?: string;
  avatarUrl?: string;
}

export const SimulatedCallModal: React.FC<SimulatedCallModalProps> = ({
  open,
  onOpenChange,
  contactName,
  contactTrade = 'Professional',
  avatarUrl,
}) => {
  const [callState, setCallState] = useState<'ringing' | 'connected'>('ringing');
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    let connectTimeout: NodeJS.Timeout | undefined;

    if (open) {
      setCallState('ringing');
      setDuration(0);
      setIsMuted(false);

      connectTimeout = setTimeout(() => {
        setCallState('connected');
      }, 2000);
    }

    return () => {
      if (connectTimeout) clearTimeout(connectTimeout);
    };
  }, [open]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (open && callState === 'connected') {
      interval = setInterval(() => {
        setDuration((d) => d + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [open, callState]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleEndCall = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xs bg-slate-950 text-white border-slate-800 p-6 flex flex-col items-center justify-between min-h-[380px] rounded-3xl">
        <DialogHeader className="items-center text-center space-y-1">
          <Badge variant="outline" className="text-[10px] text-emerald-400 border-emerald-500/40 bg-emerald-950/40 gap-1">
            <Shield className="h-2.5 w-2.5" />
            <span>Etcom Secure Voice • Masked</span>
          </Badge>
          <DialogTitle className="text-base font-bold text-white pt-2">
            {contactName}
          </DialogTitle>
          <p className="text-xs text-slate-400">{contactTrade}</p>
        </DialogHeader>

        {/* Central Avatar & Call Status */}
        <div className="flex flex-col items-center space-y-3 my-4">
          <div className="relative">
            <Avatar className="h-24 w-24 border-2 border-primary/60 shadow-lg">
              <AvatarImage src={avatarUrl} alt={contactName} />
              <AvatarFallback className="bg-primary/20 text-emerald-300 font-bold text-xl">
                {contactName.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            {callState === 'ringing' && (
              <span className="absolute inset-0 rounded-full border-2 border-primary animate-ping opacity-60" />
            )}
          </div>

          <div className="text-center">
            {callState === 'ringing' ? (
              <span className="text-xs text-slate-300 animate-pulse font-medium">
                Calling via app network...
              </span>
            ) : (
              <div className="space-y-1">
                <span className="text-xs text-emerald-400 font-semibold block">
                  Connected
                </span>
                <span className="text-sm font-mono text-white">
                  {formatDuration(duration)}
                </span>
              </div>
            )}
          </div>

          {/* Animated Voice Waveform when connected */}
          {callState === 'connected' && (
            <div className="flex items-center gap-1 h-5 pt-1">
              {[40, 70, 30, 90, 50, 80, 45, 65].map((h, i) => (
                <div
                  key={i}
                  className="w-1 bg-primary rounded-full animate-pulse"
                  style={{
                    height: `${h}%`,
                    animationDelay: `${i * 120}ms`,
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Action Controls */}
        <div className="w-full flex items-center justify-around pt-2">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => setIsMuted(!isMuted)}
            className={`h-12 w-12 rounded-full border border-slate-700 ${
              isMuted ? 'bg-amber-500/20 text-amber-400' : 'bg-slate-900 text-slate-300 hover:text-white'
            }`}
            aria-label={isMuted ? 'Unmute microphone' : 'Mute microphone'}
          >
            {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
          </Button>

          <Button
            type="button"
            variant="destructive"
            size="icon"
            onClick={handleEndCall}
            className="h-14 w-14 rounded-full bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-600/30"
            aria-label="End call"
          >
            <PhoneOff className="h-6 w-6" />
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-12 w-12 rounded-full bg-slate-900 text-slate-300 hover:text-white border border-slate-700"
            aria-label="Speaker"
          >
            <Volume2 className="h-5 w-5" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
