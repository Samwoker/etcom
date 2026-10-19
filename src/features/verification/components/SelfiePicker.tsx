import React, { useRef } from 'react';
import { Camera, X, UserCheck, Sparkles } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { readFileAsDataUrl, isDisplayableImage } from '@/lib/fileUtils';

interface SelfiePickerProps {
  selfieFile: string | null;
  onSelfieChange: (file: string | null) => void;
}

const SAMPLE_SELFIE_IMAGE =
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300';

export const SelfiePicker: React.FC<SelfiePickerProps> = ({
  selfieFile,
  onSelfieChange,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const dataUrl = await readFileAsDataUrl(file);
      onSelfieChange(dataUrl);
    } catch {
      onSelfieChange(file.name);
    }
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <Label className="text-xs font-semibold text-foreground">
          Live Verification Photo <span className="text-destructive">*</span>
        </Label>
        {!selfieFile && (
          <button
            type="button"
            onClick={() => onSelfieChange(SAMPLE_SELFIE_IMAGE)}
            className="inline-flex items-center gap-1 text-[11px] text-primary hover:underline cursor-pointer"
          >
            <Sparkles className="h-3 w-3" />
            <span>Fill sample photo</span>
          </button>
        )}
      </div>
      <p className="text-[11px] text-muted-foreground">
        A clear photo of your face to match with your identification photo.
      </p>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFile}
      />

      {selfieFile ? (
        <div className="p-3 rounded-xl border border-primary/30 bg-primary/5 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2.5">
            {isDisplayableImage(selfieFile) ? (
              <img
                src={selfieFile}
                alt="Verification selfie"
                className="h-10 w-10 object-cover rounded-full border border-primary/40 shrink-0"
              />
            ) : (
              <UserCheck className="h-4 w-4 text-primary shrink-0" />
            )}
            <div className="flex flex-col">
              <span className="font-semibold text-foreground text-xs">Selfie Captured</span>
              <span className="text-[10px] text-muted-foreground">Ready for facial match</span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onSelfieChange(null)}
            className="text-muted-foreground hover:text-destructive p-1"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="w-full p-4 rounded-xl border border-dashed border-border bg-muted/20 hover:border-primary text-center flex flex-col items-center justify-center gap-1.5 transition-colors cursor-pointer"
        >
          <Camera className="h-5 w-5 text-muted-foreground" />
          <span className="text-xs font-semibold text-foreground">Take or select live photo</span>
          <span className="text-[10px] text-muted-foreground">Tap to open device camera or upload image</span>
        </button>
      )}
    </div>
  );
};
