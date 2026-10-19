import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Inbox, FolderOpen, Star, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PageHeader } from '@/components/shared/PageHeader';
import { EarningsCard, NextJobCard, useProDashboard } from '@/features/jobs';
import { VerificationSummaryCard } from '@/features/verification';
import { ROUTES } from '@/app/routes';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { pro, newRequests, nextJob, monthlyEarningsETB, getCustomer, isLoading } = useProDashboard();

  if (isLoading || !pro) {
    return (
      <div className="flex flex-1 flex-col">
        <PageHeader title="Pro Dashboard" />
        <div className="w-full max-w-xl md:max-w-2xl mx-auto p-4 space-y-3">
          <Skeleton className="h-28 w-full rounded-xl" />
          <Skeleton className="h-32 w-full rounded-xl" />
          <Skeleton className="h-28 w-full rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col pb-8">
      {/* Header Greeting */}
      <div className="px-4 pt-4 pb-2 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Avatar className="h-10 w-10 border border-border">
            <AvatarImage src={pro.avatarUrl} alt={pro.fullName} />
            <AvatarFallback className="font-bold text-xs bg-primary/10 text-primary">
              {pro.fullName.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-base font-bold text-foreground">Selam, {pro.fullName.split(' ')[0]}</h1>
            <p className="text-xs text-muted-foreground">{pro.trade} • {pro.subCity} Sub-City</p>
          </div>
        </div>
      </div>

      <div className="w-full max-w-xl md:max-w-2xl mx-auto px-4 py-2 space-y-4">
        {/* Verification Status Summary & Search Visibility */}
        <VerificationSummaryCard
          identityStatus={pro.identityStatus}
          skillsStatus={pro.skillsStatus}
          confirmedJobsCount={pro.confirmedJobsCount}
          listingStatus={pro.listingStatus}
          onAction={() => navigate(ROUTES.PRO_VERIFICATION)}
        />

        {/* Monthly Earnings & Completed Metric */}
        <EarningsCard
          monthlyEarningsETB={monthlyEarningsETB}
          completedJobsCount={pro.confirmedJobsCount}
          rating={pro.rating}
          reviewCount={pro.reviewCount}
        />

        {/* Next Scheduled Job */}
        <NextJobCard
          job={nextJob}
          customerName={nextJob ? getCustomer(nextJob.customerId)?.fullName : undefined}
          onClick={() => nextJob && navigate(`/p/jobs/${nextJob.id}`)}
        />

        {/* New Job Requests Preview */}
        <Card className="border-border shadow-sm">
          <CardContent className="p-3.5 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-bold text-foreground">
                <Inbox className="h-4 w-4 text-primary" />
                <span>Client Requests</span>
                {newRequests.length > 0 && (
                  <Badge className="bg-primary text-primary-foreground text-[10px] h-5 px-1.5">
                    {newRequests.length} new
                  </Badge>
                )}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate(ROUTES.PRO_REQUESTS)}
                className="h-7 text-xs text-primary hover:text-primary gap-1"
              >
                <span>View all</span>
                <ArrowRight className="h-3 w-3" />
              </Button>
            </div>

            {newRequests.length > 0 ? (
              <div className="space-y-1.5">
                {newRequests.slice(0, 2).map((req) => (
                  <div
                    key={req.id}
                    onClick={() => navigate(ROUTES.PRO_REQUESTS)}
                    className="p-2.5 rounded-lg bg-muted/40 border border-border/50 flex items-center justify-between text-xs cursor-pointer hover:bg-muted/70 transition-colors"
                  >
                    <div className="space-y-0.5 truncate pr-2">
                      <p className="font-semibold text-foreground truncate">{req.title}</p>
                      <p className="text-[11px] text-muted-foreground">{req.subCity} • Requested today</p>
                    </div>
                    <Badge variant="outline" className="text-[10px] shrink-0 border-primary/30 text-primary">
                      Send Offer
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-muted-foreground">No pending requests right now.</p>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions Row */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <Button
            variant="outline"
            onClick={() => navigate(ROUTES.PRO_PORTFOLIO)}
            className="h-10 text-xs rounded-xl gap-2 border-border"
          >
            <FolderOpen className="h-4 w-4 text-primary" />
            <span>My Portfolio</span>
          </Button>

          <Button
            variant="outline"
            onClick={() => navigate(ROUTES.PRO_REVIEWS)}
            className="h-10 text-xs rounded-xl gap-2 border-border"
          >
            <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
            <span>Client Reviews</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
