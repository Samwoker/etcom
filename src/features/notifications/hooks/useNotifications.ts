import { useState, useEffect, useMemo } from 'react';
import { useDemoStore } from '@/store/demoStore';
import type { AppNotification } from '@/types';

export function useNotifications() {
  const { notifications, role, markNotificationAsRead, markAllNotificationsAsRead } = useDemoStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 200);
    return () => clearTimeout(timer);
  }, []);

  const roleNotifications = useMemo(() => {
    return notifications.filter((n) => n.role === role);
  }, [notifications, role]);

  const { todayNotifications, earlierNotifications, unreadCount } = useMemo(() => {
    const today: AppNotification[] = [];
    const earlier: AppNotification[] = [];
    let unread = 0;

    const now = new Date().getTime();
    const oneDayMs = 24 * 60 * 60 * 1000;

    roleNotifications.forEach((n) => {
      if (!n.read) unread += 1;
      const notifTime = new Date(n.createdAt).getTime();
      if (now - notifTime <= oneDayMs) {
        today.push(n);
      } else {
        earlier.push(n);
      }
    });

    return {
      todayNotifications: today,
      earlierNotifications: earlier,
      unreadCount: unread,
    };
  }, [roleNotifications]);

  const markAllRead = () => {
    markAllNotificationsAsRead(role);
  };

  return {
    todayNotifications,
    earlierNotifications,
    unreadCount,
    totalCount: roleNotifications.length,
    markAsRead: markNotificationAsRead,
    markAllRead,
    isLoading,
  };
}
