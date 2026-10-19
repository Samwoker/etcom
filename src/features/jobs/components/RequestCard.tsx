import React from 'react';
import { ShieldCheck, MapPin, Clock, Image as ImageIcon, MessageSquare, X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatRelativeTime } from '@/lib/format';
import type { Job } from '@/types';

interface RequestCardProps {
  job: Job;
  customerFirstName: string;
  onViewAndReply: () => void;
  onDecline: () => void;
}

export const RequestCard: React.FC<RequestCardProps> = ({
  job,
  customerFirstName,
  onViewAndReply,
  onDecline,
}) => {
  return (
    <Card className="border-border shadow-sm hover:border-primary/40 transition-colors">
      <CardContent className="p-4 space-y-3">
        {/* Customer & Privacy Verification Header */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="text-xs font-bold text-foreground truncate">
              {customerFirstName}
            </span>
            <Badge variant="outline" className="text-[10px] py-0 px-1.5 border-primary/40 text-primary gap-0.5">
              <ShieldCheck className="h-3 w-3" />
              Phone verified
            </Badge>
          </div>
          <span className="text-[10px] text-muted-foreground shrink-0 flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {formatRelativeTime(job.createdAt)}
          </span>
        </div>

        {/* Problem Summary */}
        <div className="space-y-1">
          <h4 className="text-sm font-bold text-foreground leading-snug">{job.title}</h4>
          <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
            {job.description}
          </p>
        </div>

        {/* Badges Row: Location, Urgency, Photos */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[11px]">
          <Badge variant="outline" className="gap-1 font-normal border-border bg-muted/30">
            <MapPin className="h-3 w-3 text-muted-foreground" />
            <span>{job.subCity} Sub-City</span>
          </Badge>

          <Badge variant="outline" className="gap-1 font-normal border-border bg-muted/30">
            <ImageIcon className="h-3 w-3 text-muted-foreground" />
            <span>2 photos attached</span>
          </Badge>

          <Badge className="bg-primary/10 text-primary border-primary/20 text-[10px] font-medium">
            Urgency: Today
          </Badge>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 pt-2 border-t border-border/50">
          <Button
            variant="outline"
            size="sm"
            onClick={onDecline}
            className="h-8 text-xs rounded-full px-3 text-muted-foreground hover:text-destructive border-border"
          >
            <X className="h-3.5 w-3.5 mr-1" />
            <span>Decline</span>
          </Button>

          <Button
            size="sm"
            onClick={onViewAndReply}
            className="flex-1 h-8 text-xs rounded-full gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90 font-medium"
          >
            <MessageSquare className="h-3.5 w-3.5" />
            <span>View and reply</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
