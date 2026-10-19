import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Inbox, FileText, CheckCircle2 } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/shared/PageHeader';
import { EmptyState } from '@/components/shared/EmptyState';
import { RequestCard, useProRequests } from '@/features/jobs';
import { ROUTES } from '@/app/routes';
import type { Job } from '@/types';

export const RequestsPage: React.FC = () => {
  const navigate = useNavigate();
  const { data, actions, isLoading } = useProRequests();
  const { newRequests, quotedRequests, activeRequests } = data;

  const [jobToDecline, setJobToDecline] = useState<Job | null>(null);

  if (isLoading) {
    return (
      <div className="flex flex-1 flex-col">
        <PageHeader title="Job Requests" />
        <div className="w-full max-w-xl md:max-w-2xl mx-auto p-4 space-y-3">
          <Skeleton className="h-10 w-full rounded-xl" />
          <Skeleton className="h-36 w-full rounded-xl" />
        </div>
      </div>
    );
  }

  const handleConfirmDecline = () => {
    if (jobToDecline) {
      actions.declineRequest(jobToDecline.id);
      setJobToDecline(null);
    }
  };

  return (
    <div className="flex flex-1 flex-col pb-8">
      <PageHeader title="Job Requests" />

      <div className="w-full max-w-xl md:max-w-2xl mx-auto px-4 py-3">
        <Tabs defaultValue="new" className="w-full space-y-4">
          <TabsList className="grid grid-cols-3 w-full h-11 bg-muted/70 p-1 rounded-xl">
            <TabsTrigger value="new" className="text-xs font-semibold rounded-lg data-[state=active]:bg-card data-[state=active]:text-foreground">
              New ({newRequests.length})
            </TabsTrigger>
            <TabsTrigger value="quoted" className="text-xs font-semibold rounded-lg data-[state=active]:bg-card data-[state=active]:text-foreground">
              Offers Sent ({quotedRequests.length})
            </TabsTrigger>
            <TabsTrigger value="active" className="text-xs font-semibold rounded-lg data-[state=active]:bg-card data-[state=active]:text-foreground">
              Active ({activeRequests.length})
            </TabsTrigger>
          </TabsList>

          {/* Tab 1: New */}
          <TabsContent value="new" className="space-y-3 pt-1">
            {newRequests.length > 0 ? (
              newRequests.map((job) => (
                <RequestCard
                  key={job.id}
                  job={job}
                  customerFirstName={actions.getCustomerFirstName(job.customerId)}
                  onViewAndReply={() => navigate(ROUTES.CUSTOMER_JOB_CHAT(job.id))}
                  onDecline={() => setJobToDecline(job)}
                />
              ))
            ) : (
              <EmptyState
                icon={Inbox}
                title="No new job requests"
                description="When customers in your area match your trade, requests will arrive here."
              />
            )}
          </TabsContent>

          {/* Tab 2: Quoted */}
          <TabsContent value="quoted" className="space-y-3 pt-1">
            {quotedRequests.length > 0 ? (
              quotedRequests.map((job) => (
                <RequestCard
                  key={job.id}
                  job={job}
                  customerFirstName={actions.getCustomerFirstName(job.customerId)}
                  onViewAndReply={() => navigate(ROUTES.CUSTOMER_JOB_CHAT(job.id))}
                  onDecline={() => setJobToDecline(job)}
                />
              ))
            ) : (
              <EmptyState
                icon={FileText}
                title="No offers pending"
                description="Price offers you have sent to customers will appear here."
              />
            )}
          </TabsContent>

          {/* Tab 3: Active */}
          <TabsContent value="active" className="space-y-3 pt-1">
            {activeRequests.length > 0 ? (
              activeRequests.map((job) => (
                <RequestCard
                  key={job.id}
                  job={job}
                  customerFirstName={actions.getCustomerFirstName(job.customerId)}
                  onViewAndReply={() => navigate(`/p/jobs/${job.id}`)}
                  onDecline={() => setJobToDecline(job)}
                />
              ))
            ) : (
              <EmptyState
                icon={CheckCircle2}
                title="No active jobs"
                description="Jobs with agreed prices and verified M-PESA payments will show here."
              />
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Decline Confirmation Dialog */}
      <Dialog open={Boolean(jobToDecline)} onOpenChange={(open) => !open && setJobToDecline(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-base font-bold">Decline Job Request?</DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Are you sure you want to decline &quot;{jobToDecline?.title}&quot;? The customer will be informed that you are unavailable.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex-row gap-2 justify-end pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setJobToDecline(null)}
              className="text-xs rounded-full"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleConfirmDecline}
              className="text-xs rounded-full"
            >
              Confirm Decline
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
