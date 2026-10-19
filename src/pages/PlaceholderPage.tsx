import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PageHeader } from '@/components/shared/PageHeader';

interface PlaceholderPageProps {
  title: string;
  routePath: string;
  category?: 'Auth' | 'Customer' | 'Professional' | 'Admin';
}

export const PlaceholderPage: React.FC<PlaceholderPageProps> = ({
  title,
  routePath,
  category = 'Customer',
}) => {
  return (
    <div className="flex flex-col min-h-full">
      <PageHeader title={title} showBack={routePath !== '/' && routePath !== '/home' && routePath !== '/p/dashboard' && routePath !== '/admin/queue'} />
      <div className="p-4 space-y-4">
        <Card className="rounded-xl border border-border shadow-sm">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="text-xs">
                {category} View
              </Badge>
              <span className="text-xs text-muted-foreground font-mono">
                {routePath}
              </span>
            </div>
            <CardTitle className="text-lg font-semibold text-foreground pt-2">
              {title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Foundation screen ready. Full domain feature components and interactive flows will be wired here in upcoming tasks.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
