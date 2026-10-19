import React from 'react';
import { Play, Mic } from 'lucide-react';
import { SystemMessage } from '@/features/chat/components/SystemMessage';
import { QuoteMessageCard } from '@/features/chat/components/QuoteMessageCard';
import { formatRelativeTime } from '@/lib/format';
import type { Message } from '@/types';

interface ChatBubbleProps {
  message: Message;
  isOwn: boolean;
  onViewQuote?: () => void;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({ message, isOwn, onViewQuote }) => {
  if (message.type === 'system') {
    return <SystemMessage text={message.text} />;
  }

  if (message.type === 'quote') {
    return (
      <div className={`flex w-full ${isOwn ? 'justify-end' : 'justify-start'} my-2`}>
        <QuoteMessageCard
          amountETB={message.quoteAmountETB || 0}
          scopeDescription={message.text}
          onViewQuote={onViewQuote || (() => {})}
        />
      </div>
    );
  }

  return (
    <div className={`flex flex-col ${isOwn ? 'items-end' : 'items-start'} my-1`}>
      <div
        className={`max-w-[82%] px-3.5 py-2.5 text-xs ${
          isOwn
            ? 'bg-primary text-primary-foreground rounded-2xl rounded-tr-xs shadow-sm'
            : 'bg-muted text-foreground border border-border rounded-2xl rounded-tl-xs shadow-sm'
        }`}
      >
        {message.type === 'photo' && (
          <div className="mb-2 space-y-1.5">
            <div className="overflow-hidden rounded-xl border border-black/10 bg-black/5 aspect-video max-w-xs">
              {message.mediaUrl ? (
                <img
                  src={message.mediaUrl}
                  alt={message.attachmentName || 'Attachment photo'}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-muted-foreground text-xs">
                  Photo placeholder
                </div>
              )}
            </div>
            {message.attachmentName && (
              <span className="text-[11px] opacity-80 block truncate">
                {message.attachmentName}
              </span>
            )}
          </div>
        )}

        {message.type === 'voice_note' && (
          <div className="flex items-center gap-2.5 py-1 min-w-[170px]">
            <button
              type="button"
              aria-label="Play voice note"
              className={`h-7 w-7 rounded-full flex items-center justify-center shrink-0 ${
                isOwn ? 'bg-primary-foreground text-primary' : 'bg-primary text-primary-foreground'
              }`}
            >
              <Play className="h-3.5 w-3.5 fill-current ml-0.5" />
            </button>
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-0.5 h-3">
                <span className="w-1 h-2 bg-current rounded-full opacity-60" />
                <span className="w-1 h-3 bg-current rounded-full" />
                <span className="w-1 h-1.5 bg-current rounded-full opacity-40" />
                <span className="w-1 h-2.5 bg-current rounded-full opacity-80" />
                <span className="w-1 h-3.5 bg-current rounded-full" />
                <span className="w-1 h-2 bg-current rounded-full opacity-50" />
                <span className="w-1 h-3 bg-current rounded-full" />
              </div>
              <div className="flex items-center gap-1 text-[10px] opacity-80">
                <Mic className="h-2.5 w-2.5" />
                <span>{message.audioDuration || '0:22'}</span>
              </div>
            </div>
          </div>
        )}

        {message.text && (
          <p className="leading-relaxed whitespace-pre-wrap">{message.text}</p>
        )}
      </div>

      <span className="mt-1 text-[10px] text-muted-foreground px-1">
        {formatRelativeTime(message.timestamp)}
      </span>
    </div>
  );
};
