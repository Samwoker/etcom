import React, { useState } from 'react';
import { Plus, CheckCircle2, ShieldCheck, Star, Users, FolderOpen } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { PageHeader } from '@/components/shared/PageHeader';
import { EmptyState } from '@/components/shared/EmptyState';
import {
  VerifiedJobCard,
  AddWorkSheet,
  PortfolioGrid,
  useMyPortfolio,
} from '@/features/professionals';

export const PortfolioPage: React.FC = () => {
  const { pro, verifiedJobs, selfUploads, addWorkPhoto, isLoading } = useMyPortfolio();
  const [sheetOpen, setSheetOpen] = useState(false);

  if (isLoading || !pro) {
    return (
      <div className="flex flex-1 flex-col">
        <PageHeader title="Portfolio" />
        <div className="w-full max-w-xl md:max-w-2xl mx-auto p-4 space-y-4">
          <Skeleton className="h-20 w-full rounded-xl" />
          <Skeleton className="h-10 w-full rounded-xl" />
          <Skeleton className="h-40 w-full rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col pb-8">
      <div className="flex items-center justify-between pr-4">
        <PageHeader title="Portfolio" />
        <Button
          size="sm"
          onClick={() => setSheetOpen(true)}
          className="h-8 text-xs rounded-full gap-1 bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>Add work photos</span>
        </Button>
      </div>

      <div className="w-full max-w-xl md:max-w-2xl mx-auto px-4 py-2 space-y-4">
        {/* Summary Metric Row */}
        <Card className="border-border shadow-xs bg-muted/20">
          <CardContent className="p-3 grid grid-cols-3 gap-2 text-center text-xs">
            <div>
              <span className="text-base font-bold text-foreground block">
                {pro.confirmedJobsCount}
              </span>
              <span className="text-[10px] text-muted-foreground flex items-center justify-center gap-1 mt-0.5">
                <ShieldCheck className="h-3 w-3 text-primary" />
                Verified jobs
              </span>
            </div>

            <div className="border-x border-border/50">
              <span className="text-base font-bold text-foreground block">
                {pro.rating > 0 ? pro.rating.toFixed(1) : 'New'}
              </span>
              <span className="text-[10px] text-muted-foreground flex items-center justify-center gap-1 mt-0.5">
                <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
                Rating
              </span>
            </div>

            <div>
              <span className="text-base font-bold text-foreground block">88%</span>
              <span className="text-[10px] text-muted-foreground flex items-center justify-center gap-1 mt-0.5">
                <Users className="h-3 w-3 text-primary" />
                Repeat clients
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Tabs: Verified on Etcom vs My Uploads */}
        <Tabs defaultValue="verified" className="w-full space-y-4">
          <TabsList className="grid grid-cols-2 w-full h-11 bg-muted/70 p-1 rounded-xl">
            <TabsTrigger value="verified" className="text-xs font-semibold rounded-lg data-[state=active]:bg-card data-[state=active]:text-foreground">
              Verified on Etcom ({verifiedJobs.length})
            </TabsTrigger>
            <TabsTrigger value="self" className="text-xs font-semibold rounded-lg data-[state=active]:bg-card data-[state=active]:text-foreground">
              My uploads ({selfUploads.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="verified" className="space-y-3 pt-1">
            {verifiedJobs.length > 0 ? (
              verifiedJobs.map((job) => (
                <VerifiedJobCard key={job.id} job={job} />
              ))
            ) : (
              <EmptyState
                icon={CheckCircle2}
                title="No confirmed jobs yet"
                description="Jobs confirmed by customers and paid via M-PESA automatically appear here with verified proof badges."
              />
            )}
          </TabsContent>

          <TabsContent value="self" className="space-y-3 pt-1">
            {selfUploads.length > 0 ? (
              <PortfolioGrid items={selfUploads} />
            ) : (
              <EmptyState
                icon={FolderOpen}
                title="No self-uploaded photos"
                description="Upload photos of projects you completed prior to joining Etcom."
                actionLabel="Upload project photo"
                onAction={() => setSheetOpen(true)}
              />
            )}
          </TabsContent>
        </Tabs>
      </div>

      <AddWorkSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        onAdd={addWorkPhoto}
      />
    </div>
  );
};
