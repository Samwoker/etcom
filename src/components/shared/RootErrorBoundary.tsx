import React from 'react';
import { useRouteError, useNavigate } from 'react-router-dom';
import { AlertCircle, RotateCcw, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ROUTES } from '@/app/routes';

export const RootErrorBoundary: React.FC = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  const errorMessage =
    error instanceof Error
      ? error.message
      : typeof error === 'string'
        ? error
        : 'An unexpected application error occurred.';

  const handleReload = () => {
    window.location.reload();
  };

  const handleGoHome = () => {
    navigate(ROUTES.AUTH_WELCOME);
  };

  return (
    <div className="flex min-h-[100dvh] w-full items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-md border-border/80 shadow-lg">
        <CardContent className="p-6 text-center space-y-4">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
            <AlertCircle className="h-6 w-6" />
          </div>

          <div className="space-y-1">
            <h1 className="text-lg font-bold tracking-tight text-foreground">
              Something went wrong
            </h1>
            <p className="text-xs text-muted-foreground leading-relaxed">
              We encountered a temporary interface state error. You can reload the page or return to the main home screen.
            </p>
          </div>

          {errorMessage && (
            <div className="rounded-lg bg-muted/50 p-2.5 text-left border border-border/60">
              <p className="font-mono text-[11px] text-muted-foreground line-clamp-3">
                {errorMessage}
              </p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-2 pt-2">
            <Button
              variant="outline"
              onClick={handleReload}
              className="flex-1 h-10 rounded-xl text-xs font-semibold gap-1.5"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Reload page</span>
            </Button>
            <Button
              onClick={handleGoHome}
              className="flex-1 h-10 rounded-xl text-xs font-semibold bg-primary text-primary-foreground hover:bg-emerald-600 gap-1.5"
            >
              <Home className="h-3.5 w-3.5" />
              <span>Return home</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

