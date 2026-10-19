import React, { useEffect, useRef } from 'react';
import { ShieldCheck, MessageSquare } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChatBubble } from '@/components/shared/ChatBubble';
import { EmptyState } from '@/components/shared/EmptyState';
import type { Message } from '@/types';

interface ChatThreadProps {
  messages: Message[];
  currentUserId: string;
  onViewQuote: () => void;
}

export const ChatThread: React.FC<ChatThreadProps> = ({
  messages,
  currentUserId,
  onViewQuote,
}) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      {/* Pinned Info Bar */}
      <div className="sticky top-0 z-10 flex items-center justify-center gap-1.5 bg-muted/90 px-3 py-2 text-center text-[11px] font-medium text-muted-foreground border-b border-border backdrop-blur">
        <ShieldCheck className="h-3.5 w-3.5 text-primary shrink-0" />
        <span>Phone numbers stay private until the job is confirmed</span>
      </div>

      {/* Scrollable Message List */}
      <ScrollArea className="flex-1 px-4 py-3">
        {messages.length === 0 ? (
          <EmptyState
            icon={MessageSquare}
            title="Start conversation"
            description="Discuss details, schedule an inspection, or agree on quote terms."
          />
        ) : (
          <div className="space-y-1 pb-4">
            {messages.map((msg) => (
              <ChatBubble
                key={msg.id}
                message={msg}
                isOwn={msg.senderId === currentUserId}
                onViewQuote={onViewQuote}
              />
            ))}
            <div ref={bottomRef} />
          </div>
        )}
      </ScrollArea>
    </div>
  );
};
