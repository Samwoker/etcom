import { useState, useEffect, useCallback } from 'react';
import { useDemoStore } from '@/store/demoStore';
import { getJobById } from '@/services/jobService';
import { getMessagesByJobId, sendChatMessage } from '@/services/chatService';
import { getProfessionalById } from '@/services/professionalService';
import type { Job, Professional, Message } from '@/types';

export function useChat(jobId: string | undefined) {
  const { currentUserId, role, messages: allMessages } = useDemoStore();
  const [job, setJob] = useState<Job | null>(null);
  const [otherParty, setOtherParty] = useState<Professional | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isProfessionalViewer = role === 'professional';

  const loadData = useCallback(async () => {
    if (!jobId) {
      setError('Job ID is missing');
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const jobData = await getJobById(jobId);
      if (!jobData) {
        setError('Job not found');
      } else {
        setJob(jobData);
        const proData = await getProfessionalById(jobData.proId);
        setOtherParty(proData);
        await getMessagesByJobId(jobId);
      }
    } catch {
      setError('Failed to load chat');
    } finally {
      setIsLoading(false);
    }
  }, [jobId]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const messages = allMessages.filter((m) => m.jobId === jobId);

  const sendMessage = useCallback(
    async (text: string, type: Message['type'] = 'text', mediaUrl?: string) => {
      if (!jobId) return;

      const senderId = currentUserId;
      const senderRole = role;

      await sendChatMessage({
        jobId,
        senderId,
        senderRole,
        text,
        type,
        mediaUrl,
        attachmentName: type === 'photo' ? 'Uploaded site photo' : undefined,
      });

      // Scripted response after 1.2s from the opposite party
      setTimeout(async () => {
        if (!isProfessionalViewer) {
          // Response from professional
          await sendChatMessage({
            jobId,
            senderId: job?.proId || 'pro',
            senderRole: 'professional',
            text: 'I received your note. All requirements are clear and I am ready to assist.',
            type: 'text',
          });
        } else {
          // Response from customer
          await sendChatMessage({
            jobId,
            senderId: job?.customerId || 'cust',
            senderRole: 'customer',
            text: 'Thanks for the quick response! Looking forward to having this resolved.',
            type: 'text',
          });
        }
      }, 1200);
    },
    [jobId, currentUserId, role, job, isProfessionalViewer]
  );

  return {
    data: {
      job,
      otherParty,
      messages,
      hasActiveQuote: Boolean(job?.activeQuote),
      isProfessionalViewer,
    },
    isLoading,
    error,
    actions: {
      sendMessage,
      refetch: loadData,
    },
  };
}
