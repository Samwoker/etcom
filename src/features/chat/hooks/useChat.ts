import { useState, useEffect, useCallback } from 'react';
import { useDemoStore } from '@/store/demoStore';
import { getJobById } from '@/services/jobService';
import { getMessagesByJobId, sendChatMessage } from '@/services/chatService';
import { getProfessionalById } from '@/services/professionalService';
import { generateGeminiChatReply } from '@/services/geminiService';
import type { Job, Professional, Message } from '@/types';

export function useChat(jobId: string | undefined) {
  const { currentUserId, role, messages: allMessages } = useDemoStore();
  const [job, setJob] = useState<Job | null>(null);
  const [otherParty, setOtherParty] = useState<Professional | null>(null);
  const [isOpponentTyping, setIsOpponentTyping] = useState(false);
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

      // Show typing indicator while opponent replies via Gemini
      setIsOpponentTyping(true);

      try {
        const replyText = await generateGeminiChatReply({
          job,
          opponent: otherParty,
          history: messages,
          userRole: role,
          latestUserMessage: text,
        });

        // Small natural conversational delay
        await new Promise((res) => setTimeout(res, 900));

        await sendChatMessage({
          jobId,
          senderId: isProfessionalViewer ? (job?.customerId || 'c1') : (job?.proId || 'p1'),
          senderRole: isProfessionalViewer ? 'customer' : 'professional',
          text: replyText,
          type: 'text',
        });
      } catch (err) {
        console.error('Failed to generate chat reply:', err);
      } finally {
        setIsOpponentTyping(false);
      }
    },
    [jobId, currentUserId, role, job, otherParty, messages, isProfessionalViewer]
  );

  return {
    data: {
      job,
      otherParty,
      messages,
      hasActiveQuote: Boolean(job?.activeQuote),
      isProfessionalViewer,
      isOpponentTyping,
    },
    isLoading,
    error,
    actions: {
      sendMessage,
      refetch: loadData,
    },
  };
}
