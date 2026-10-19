import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UserX } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { PageHeader } from '@/components/shared/PageHeader';
import { EmptyState } from '@/components/shared/EmptyState';
import { StickyCta } from '@/components/shared/StickyCta';
import {
  ProfileHeader,
  VerificationChecklist,
  ExperienceBlock,
  WorkHistoryList,
  useProfessional,
} from '@/features/professionals';
import { ReviewList } from '@/features/reviews';
import { ROUTES } from '@/app/routes';

export const ProfessionalProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, isLoading, actions } = useProfessional(id);
  const [isRequesting, setIsRequesting] = useState(false);

  const handleRequestQuote = async () => {
    setIsRequesting(true);
    const newJobId = await actions.requestQuote();
    navigate(ROUTES.CUSTOMER_JOB_CHAT(newJobId));
  };

  if (isLoading) {
    return (
      <div className="flex flex-1 flex-col">
        <PageHeader title="Professional Profile" showBack />
        <div className="w-full max-w-xl md:max-w-2xl mx-auto p-4 space-y-4">
          <Skeleton className="h-24 w-full rounded-xl" />
          <Skeleton className="h-40 w-full rounded-xl" />
          <Skeleton className="h-20 w-full rounded-xl" />
        </div>
      </div>
    );
  }

  if (!data.professional) {
    return (
      <div className="flex flex-1 flex-col">
        <PageHeader title="Professional Profile" showBack />
        <EmptyState
          icon={UserX}
          title="Professional Not Found"
          description="The professional profile you requested could not be located."
          actionLabel="Return to search"
          onAction={() => navigate(ROUTES.CUSTOMER_RESULTS)}
        />
      </div>
    );
  }

  const { professional: pro, workHistory, reviews } = data;

  return (
    <div className="flex flex-1 flex-col pb-24">
      <PageHeader title={pro.fullName} subtitle={`${pro.trade} • ${pro.subCity}`} showBack />
      <div className="w-full max-w-xl md:max-w-2xl mx-auto px-4 py-4 space-y-4">
        <ProfileHeader pro={pro} />
        <VerificationChecklist pro={pro} />
        <ExperienceBlock pro={pro} />

        <Tabs defaultValue="work" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="work">Work ({workHistory.length})</TabsTrigger>
            <TabsTrigger value="reviews">Reviews ({reviews.length})</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
          </TabsList>
          <TabsContent value="work" className="mt-3">
            <WorkHistoryList jobs={workHistory} />
          </TabsContent>
          <TabsContent value="reviews" className="mt-3">
            <ReviewList reviews={reviews} />
          </TabsContent>
          <TabsContent value="about" className="mt-3">
            <Card className="border-border shadow-sm">
              <CardContent className="p-4 space-y-2 text-xs">
                <p className="font-semibold text-foreground">About {pro.fullName}</p>
                <p className="text-muted-foreground leading-relaxed">{pro.bio}</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <StickyCta
        primaryLabel="Get Price Offer"
        primaryLoading={isRequesting}
        onPrimaryClick={handleRequestQuote}
      />
    </div>
  );
};
