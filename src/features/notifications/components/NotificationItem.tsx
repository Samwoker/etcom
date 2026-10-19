import React from 'react';
import {
  FileText,
  RotateCcw,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  ChevronRight,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { formatRelativeTime } from '@/lib/format';
import type { AppNotification, NotificationType } from '@/types';

interface NotificationItemProps {
  notification: AppNotification;
  onClick: () => void;
}

const getNotificationIcon = (type: NotificationType) => {
  switch (type) {
    case 'new_quote':
      return <FileText className="h-4 w-4 text-primary" />;
    case 'quote_countered':
      return <RotateCcw className="h-4 w-4 text-amber-500" />;
    case 'payment_confirmed':
      return <CheckCircle2 className="h-4 w-4 text-primary" />;
    case 'payment_failed':
      return <XCircle className="h-4 w-4 text-destructive" />;
    case 'work_completed':
      return <CheckCircle2 className="h-4 w-4 text-primary" />;
    case 'evidence_needed':
      return <ShieldAlert className="h-4 w-4 text-amber-500" />;
    case 'verification_result':
      return <ShieldCheck className="h-4 w-4 text-primary" />;
    case 'dispute_opened':
      return <AlertTriangle className="h-4 w-4 text-destructive" />;
    default:
      return <FileText className="h-4 w-4 text-muted-foreground" />;
  }
};

export const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  onClick,
}) => {
  return (
    <Card
      onClick={onClick}
      className={`border-border shadow-xs transition-all cursor-pointer hover:bg-muted/30 active:scale-[0.99] ${
        !notification.read ? 'bg-primary/5 border-primary/20' : 'bg-card'
      }`}
    >
      <CardContent className="p-3.5 flex items-start gap-3">
        <div className="h-8 w-8 rounded-full bg-muted/60 flex items-center justify-center shrink-0 mt-0.5">
          {getNotificationIcon(notification.type)}
        </div>

        <div className="flex-1 min-w-0 space-y-0.5">
          <div className="flex items-center justify-between gap-2">
            <h4 className="text-xs font-bold text-foreground truncate">
              {notification.title}
            </h4>
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="text-[10px] text-muted-foreground">
                {formatRelativeTime(notification.createdAt)}
              </span>
              {!notification.read && (
                <span className="h-2 w-2 rounded-full bg-primary" />
              )}
            </div>
          </div>
          <p className="text-[11px] text-muted-foreground leading-relaxed line-clamp-2">
            {notification.message}
          </p>
        </div>

        <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0 self-center" />
      </CardContent>
    </Card>
  );
};
