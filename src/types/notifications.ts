import type { Role } from './role';

export type NotificationType =
  | 'new_quote'
  | 'quote_countered'
  | 'payment_confirmed'
  | 'payment_failed'
  | 'work_completed'
  | 'evidence_needed'
  | 'verification_result'
  | 'dispute_opened';

export interface AppNotification {
  id: string;
  recipientId: string;
  role: Role;
  type: NotificationType;
  title: string;
  message: string;
  linkRoute: string;
  read: boolean;
  createdAt: string;
}
