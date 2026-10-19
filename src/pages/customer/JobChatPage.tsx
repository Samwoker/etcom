import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MoreVertical, AlertTriangle, FileText, PlusCircle, MessageSquare } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { PageHeader } from '@/components/shared/PageHeader';
import { EmptyState } from '@/components/shared/EmptyState';
import { VerificationBadges } from '@/components/shared/VerificationBadges';
import { ChatThread, ChatComposer, useChat } from '@/features/chat';
import { ROUTES } from '@/app/routes';

export const JobChatPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, isLoading, actions } = useChat(id);

  if (isLoading) {
    return (
      <div className="flex flex-1 flex-col h-[100dvh]">
        <PageHeader title="Job Chat" showBack />
        <div className="flex-1 p-4 space-y-3">
          <Skeleton className="h-10 w-full rounded-lg" />
          <Skeleton className="h-16 w-3/4 rounded-2xl" />
          <Skeleton className="h-16 w-3/4 ml-auto rounded-2xl" />
        </div>
      </div>
    );
  }

  if (!data.job) {
    return (
      <div className="flex flex-1 flex-col h-[100dvh]">
        <PageHeader title="Job Chat" showBack />
        <EmptyState
          icon={MessageSquare}
          title="Job not found"
          description="The conversation could not be loaded for this job request."
          actionLabel="View all jobs"
          onAction={() => navigate(ROUTES.CUSTOMER_JOBS)}
        />
      </div>
    );
  }

  const { job, otherParty, messages, hasActiveQuote, isProfessionalViewer } = data;
  const quoteRoute = isProfessionalViewer
    ? ROUTES.PRO_JOB_QUOTE(job.id)
    : ROUTES.CUSTOMER_JOB_QUOTE(job.id);

  return (
    <div className="flex flex-1 flex-col h-[100dvh] max-w-xl md:max-w-2xl mx-auto w-full bg-background">
      <PageHeader
        title={otherParty?.fullName || job.title}
        subtitle={otherParty ? `${otherParty.trade} • ${otherParty.subCity}` : undefined}
        showBack
        action={
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Chat options" className="h-9 w-9 rounded-full">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem
                onClick={() => navigate(ROUTES.CUSTOMER_JOB_DISPUTE(job.id))}
                className="text-xs text-destructive focus:text-destructive gap-2 cursor-pointer"
              >
                <AlertTriangle className="h-3.5 w-3.5" />
                <span>Report issue</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        }
      />

      {otherParty && (
        <div className="px-4 py-1.5 border-b border-border/50 bg-muted/20 flex items-center justify-between">
          <VerificationBadges
            identityStatus={otherParty.identityStatus}
            skillsStatus={otherParty.skillsStatus}
            confirmedJobsCount={otherParty.confirmedJobsCount}
          />
        </div>
      )}

      <ChatThread
        messages={messages}
        currentUserId={isProfessionalViewer ? (job.proId || 'p1') : (job.customerId || 'c1')}
        onViewQuote={() => navigate(quoteRoute)}
        isOpponentTyping={data.isOpponentTyping}
        opponentName={otherParty?.fullName}
      />

      {/* Floating Price Offer Action Strip */}
      {hasActiveQuote ? (
        <div className="px-3 py-2 bg-muted/60 border-t border-border flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs">
            <FileText className="h-4 w-4 text-primary shrink-0" />
            <span className="font-medium text-foreground">Price offer ready to review</span>
          </div>
          <Button
            size="sm"
            onClick={() => navigate(quoteRoute)}
            className="h-8 rounded-full text-xs font-semibold bg-primary text-primary-foreground hover:bg-emerald-600"
          >
            Review price offer
          </Button>
        </div>
      ) : isProfessionalViewer ? (
        <div className="px-3 py-2 bg-muted/60 border-t border-border flex items-center justify-between gap-3">
          <span className="text-xs text-muted-foreground">No price offer sent yet</span>
          <Button
            size="sm"
            onClick={() => navigate(ROUTES.PRO_JOB_QUOTE(job.id))}
            className="h-8 rounded-full text-xs font-semibold bg-primary text-primary-foreground hover:bg-emerald-600 gap-1"
          >
            <PlusCircle className="h-3.5 w-3.5" />
            <span>Send price offer</span>
          </Button>
        </div>
      ) : null}

      <ChatComposer onSendMessage={actions.sendMessage} />
    </div>
  );
};
