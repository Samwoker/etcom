import React, { useState, useEffect } from 'react';
import { Download, WifiOff, RefreshCw, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export const PwaStatusBanner: React.FC = () => {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    const handleUpdate = () => setUpdateAvailable(true);

    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    window.addEventListener('pwa-update-available', handleUpdate);
    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('pwa-update-available', handleUpdate);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;
    if (choice.outcome === 'accepted') {
      setDeferredPrompt(null);
    }
  };

  const handleReload = () => {
    window.location.reload();
  };

  if (dismissed) return null;

  if (isOffline) {
    return (
      <aside aria-label="Offline notice" className="bg-amber-500/15 border-b border-amber-500/30 px-4 py-2 text-xs flex items-center justify-between text-amber-900 dark:text-amber-200">
        <div className="flex items-center gap-2">
          <WifiOff className="h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
          <span className="font-medium">You are offline. Cached profiles and jobs remain available.</span>
        </div>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          className="p-1 hover:bg-amber-500/20 rounded-md"
          aria-label="Dismiss offline banner"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </aside>
    );
  }

  if (updateAvailable) {
    return (
      <aside aria-label="App update notice" className="bg-primary/10 border-b border-primary/20 px-4 py-2 text-xs flex items-center justify-between text-primary">
        <div className="flex items-center gap-2">
          <RefreshCw className="h-3.5 w-3.5 shrink-0 animate-spin" />
          <span className="font-medium">A new version of Etcom is available.</span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            onClick={handleReload}
            className="h-7 text-xs rounded-full px-3 bg-primary text-primary-foreground hover:bg-emerald-600"
          >
            Update now
          </Button>
          <button
            type="button"
            onClick={() => setDismissed(true)}
            className="p-1 text-muted-foreground hover:text-foreground"
            aria-label="Dismiss update banner"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      </aside>
    );
  }

  if (deferredPrompt) {
    return (
      <aside aria-label="Install Etcom app" className="bg-card border-b border-border/80 px-4 py-2 text-xs flex items-center justify-between shadow-2xs">
        <div className="flex items-center gap-2">
          <Download className="h-4 w-4 text-primary shrink-0" />
          <span className="font-medium text-foreground">Install Etcom app for faster access</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Button
            size="sm"
            onClick={handleInstallClick}
            className="h-7 text-xs rounded-full px-3 bg-primary text-primary-foreground hover:bg-emerald-600 font-semibold"
          >
            Install
          </Button>
          <button
            type="button"
            onClick={() => setDismissed(true)}
            className="p-1 text-muted-foreground hover:text-foreground"
            aria-label="Dismiss install banner"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      </aside>
    );
  }

  return null;
};
