import React, { useState, useRef } from 'react';
import { Send, Image, Mic } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { readFileAsDataUrl } from '@/lib/fileUtils';

interface ChatComposerProps {
  onSendMessage: (
    text: string,
    type?: 'text' | 'photo' | 'voice_note',
    mediaUrl?: string
  ) => void;
  disabled?: boolean;
}

const SAMPLE_CHAT_PHOTO =
  'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400';

export const ChatComposer: React.FC<ChatComposerProps> = ({
  onSendMessage,
  disabled = false,
}) => {
  const [text, setText] = useState('');
  const photoInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || disabled) return;
    onSendMessage(text.trim(), 'text');
    setText('');
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const dataUrl = await readFileAsDataUrl(file);
      onSendMessage('Attached site photo for your review.', 'photo', dataUrl);
    } catch {
      onSendMessage('Attached site photo of the issue.', 'photo', SAMPLE_CHAT_PHOTO);
    }
    if (photoInputRef.current) photoInputRef.current.value = '';
  };

  const handleSendVoicePlaceholder = () => {
    onSendMessage('Voice message note (0:18)', 'voice_note');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 p-3 bg-background border-t border-border"
    >
      <input
        ref={photoInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handlePhotoUpload}
      />

      <div className="flex items-center gap-1">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="Attach photo from device"
          title="Attach photo from device"
          onClick={() => photoInputRef.current?.click()}
          disabled={disabled}
          className="h-9 w-9 rounded-full text-muted-foreground hover:text-foreground cursor-pointer"
        >
          <Image className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="Record voice note"
          title="Send voice note"
          onClick={handleSendVoicePlaceholder}
          disabled={disabled}
          className="h-9 w-9 rounded-full text-muted-foreground hover:text-foreground cursor-pointer"
        >
          <Mic className="h-4 w-4" />
        </Button>
      </div>

      <Input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message..."
        disabled={disabled}
        className="h-10 text-xs rounded-full bg-muted/50 border-border focus-visible:ring-1"
      />

      <Button
        type="submit"
        size="icon"
        aria-label="Send message"
        disabled={!text.trim() || disabled}
        className="h-10 w-10 shrink-0 rounded-full bg-primary text-primary-foreground hover:bg-emerald-600 disabled:opacity-50"
      >
        <Send className="h-4 w-4" />
      </Button>
    </form>
  );
};
