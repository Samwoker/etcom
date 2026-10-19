import type { Role } from './role';

export type MessageType = 'text' | 'photo' | 'voice_note' | 'quote' | 'system';

export interface Message {
  id: string;
  jobId: string;
  senderId: string;
  senderRole: Role;
  text: string;
  timestamp: string;
  type?: MessageType;
  attachmentName?: string;
  mediaUrl?: string;
  audioDuration?: string;
  quoteAmountETB?: number;
  quoteId?: string;
}

