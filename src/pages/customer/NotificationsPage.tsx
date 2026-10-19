import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, CheckCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { PageHeader } from '@/components/shared/PageHeader';
import { EmptyState } from '@/components/shared/EmptyState';
import { NotificationItem, useNotifications } from '@/features/notifications';

export const NotificationsPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    todayNotifications,
    earlierNotifications,
    unreadCount,
    totalCount,
    markAsRead,
    markAllRead,
    isLoading,
  } = useNotifications();

  if (isLoading) {
    return (
      <div className="flex flex-1 flex-col">
        <PageHeader title="Notifications" />
        <div className="w-full max-w-xl md:max-w-2xl mx-auto p-4 space-y-3">
          <Skeleton className="h-16 w-full rounded-xl" />
          <Skeleton className="h-16 w-full rounded-xl" />
          <Skeleton className="h-16 w-full rounded-xl" />
        </div>
      </div>
    );
  }

  const handleNotificationClick = (id: string, linkRoute: string) => {
    markAsRead(id);
    navigate(linkRoute);
  };

  return (
    <div className="flex flex-1 flex-col pb-8">
      <div className="flex items-center justify-between pr-4">
        <PageHeader title="Notifications" />
        {unreadCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={markAllRead}
            className="text-xs text-primary hover:text-primary gap-1 h-8 rounded-full"
          >
            <CheckCheck className="h-3.5 w-3.5" />
            <span>Mark all as read</span>
          </Button>
        )}
      </div>

      <div className="w-full max-w-xl md:max-w-2xl mx-auto px-4 py-2 space-y-5">
        {totalCount === 0 ? (
          <EmptyState
            icon={Bell}
            title="No notifications yet"
            description="Updates on your requests, quotes, payments, and verifications will appear here."
          />
        ) : (
          <>
            {/* Today */}
            {todayNotifications.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-1">
                  Today
                </h3>
                <div className="space-y-2">
                  {todayNotifications.map((notif) => (
                    <NotificationItem
                      key={notif.id}
                      notification={notif}
                      onClick={() => handleNotificationClick(notif.id, notif.linkRoute)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Earlier */}
            {earlierNotifications.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-1">
                  Earlier
                </h3>
                <div className="space-y-2">
                  {earlierNotifications.map((notif) => (
                    <NotificationItem
                      key={notif.id}
                      notification={notif}
                      onClick={() => handleNotificationClick(notif.id, notif.linkRoute)}
                    />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
