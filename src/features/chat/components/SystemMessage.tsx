import React from 'react';
import { Info } from 'lucide-react';

interface SystemMessageProps {
  text: string;
}

export const SystemMessage: React.FC<SystemMessageProps> = ({ text }) => {
  return (
    <div className="flex justify-center my-3">
      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted/80 border border-border text-[11px] text-muted-foreground font-medium text-center max-w-sm">
        <Info className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
        <span>{text}</span>
      </div>
    </div>
  );
};
