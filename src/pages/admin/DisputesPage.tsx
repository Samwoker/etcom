import React from 'react';
import { AlertTriangle, CheckCircle2, ShieldAlert } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { PageHeader } from '@/components/shared/PageHeader';
import { EmptyState } from '@/components/shared/EmptyState';
import {
  DisputeListItem,
  DisputeDetailSheet,
  useAdminDisputes,
  type DisputeTab,
} from '@/features/disputes';

export const DisputesPage: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    openDisputes,
    resolvedDisputes,
    selectedDispute,
    setSelectedDisputeId,
    disputeContext,
    handleResolveAction,
    isLoading,
    openCount,
    resolvedCount,
  } = useAdminDisputes();

  if (isLoading) {
    return (
      <div className="flex flex-1 flex-col">
        <PageHeader title="Dispute Cases" />
        <div className="w-full max-w-xl md:max-w-2xl mx-auto p-4 space-y-4">
          <Skeleton className="h-9 w-full rounded-lg" />
          <Skeleton className="h-28 w-full rounded-xl" />
          <Skeleton className="h-28 w-full rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col pb-8">
      <div className="border-b border-border bg-card">
        <div className="w-full max-w-xl md:max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-base font-bold text-foreground">Dispute Cases</h1>
            <Badge className="bg-destructive/10 text-destructive border-destructive/20 text-xs px-2 py-0.5">
              {openCount} active
            </Badge>
          </div>
          <ShieldAlert className="h-4 w-4 text-destructive" />
        </div>
      </div>

      <div className="w-full max-w-xl md:max-w-2xl mx-auto px-4 py-3 space-y-4">
        <Tabs
          value={activeTab}
          onValueChange={(val) => setActiveTab(val as DisputeTab)}
          className="w-full"
        >
          <TabsList className="w-full grid grid-cols-2 h-9 p-1 bg-muted/60 rounded-xl">
            <TabsTrigger value="open" className="text-xs font-semibold rounded-lg">
              Open ({openCount})
            </TabsTrigger>
            <TabsTrigger value="resolved" className="text-xs font-semibold rounded-lg">
              Resolved ({resolvedCount})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="open" className="space-y-3 pt-3">
            {openDisputes.length === 0 ? (
              <EmptyState
                icon={CheckCircle2}
                title="No open disputes"
                description="All service disputes and customer escalations are currently resolved."
              />
            ) : (
              openDisputes.map((dispute) => (
                <DisputeListItem
                  key={dispute.id}
                  dispute={dispute}
                  onClick={() => setSelectedDisputeId(dispute.id)}
                />
              ))
            )}
          </TabsContent>

          <TabsContent value="resolved" className="space-y-3 pt-3">
            {resolvedDisputes.length === 0 ? (
              <EmptyState
                icon={AlertTriangle}
                title="No resolved cases yet"
                description="Disputes resolved by the arbitration team will be archived here."
              />
            ) : (
              resolvedDisputes.map((dispute) => (
                <DisputeListItem
                  key={dispute.id}
                  dispute={dispute}
                  onClick={() => setSelectedDisputeId(dispute.id)}
                />
              ))
            )}
          </TabsContent>
        </Tabs>

        {/* Dispute Detail Sheet */}
        <DisputeDetailSheet
          dispute={selectedDispute}
          isOpen={Boolean(selectedDispute)}
          onClose={() => setSelectedDisputeId(null)}
          context={disputeContext}
          onResolve={(action, note) => {
            if (selectedDispute) {
              handleResolveAction(selectedDispute.id, action, note);
            }
          }}
        />
      </div>
    </div>
  );
};
