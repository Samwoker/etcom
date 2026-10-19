import type { Message } from '@/types';
import { useDemoStore } from '@/store/demoStore';

export async function getMessagesByJobId(jobId: string): Promise<Message[]> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const messages = useDemoStore.getState().messages;
  return messages.filter((m) => m.jobId === jobId);
}

export async function sendChatMessage(data: {
  jobId: string;
  senderId: string;
  senderRole: Message['senderRole'];
  text: string;
  type?: Message['type'];
  attachmentName?: string;
  mediaUrl?: string;
  audioDuration?: string;
}): Promise<Message> {
  await new Promise((resolve) => setTimeout(resolve, 150));
  const newMessage: Message = {
    id: `m-${Date.now()}`,
    jobId: data.jobId,
    senderId: data.senderId,
    senderRole: data.senderRole,
    text: data.text,
    timestamp: new Date().toISOString(),
    type: data.type || 'text',
    attachmentName: data.attachmentName,
    mediaUrl: data.mediaUrl,
    audioDuration: data.audioDuration,
  };
  useDemoStore.getState().addMessage(newMessage);
  return newMessage;
}
