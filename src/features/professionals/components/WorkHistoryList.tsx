import React from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { EmptyState } from '@/components/shared/EmptyState';
import { formatRelativeTime } from '@/lib/format';
import type { WorkHistoryItem } from '@/types';

interface WorkHistoryListProps {
  jobs: WorkHistoryItem[];
}

export const WorkHistoryList: React.FC<WorkHistoryListProps> = ({ jobs }) => {
  if (jobs.length === 0) {
    return (
      <EmptyState
        icon={Briefcase}
        title="No completed jobs yet"
        description="This professional has not completed any jobs through the Etcom platform yet."
      />
    );
  }

  return (
    <div className="space-y-3">
      {jobs.map((item) => (
        <Card key={item.id} className="border-border overflow-hidden shadow-sm">
          <CardContent className="p-4 space-y-2.5">
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-sm font-semibold text-foreground leading-snug">
                {item.title}
              </h3>
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 text-[10px] shrink-0 gap-1">
                <CheckCircle2 className="h-3 w-3" />
                Completed
              </Badge>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {item.subCity}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {formatRelativeTime(item.completedDate)}
              </span>
            </div>

            <p className="text-xs text-muted-foreground leading-relaxed">
              {item.description}
            </p>

            {item.photos && item.photos.length > 0 && (
              <div className="pt-1 grid grid-cols-2 sm:grid-cols-3 gap-2">
                {item.photos.map((photoUrl, idx) => (
                  <div
                    key={idx}
                    className="relative aspect-video rounded-lg overflow-hidden border border-border bg-muted"
                  >
                    <img
                      src={photoUrl}
                      alt={`${item.title} documentation ${idx + 1}`}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
