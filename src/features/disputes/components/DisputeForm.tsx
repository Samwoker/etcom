import React, { useRef } from 'react';
import { Camera, X, Image as ImageIcon, ShieldAlert, Sparkles } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ReasonPicker } from './ReasonPicker';
import { readFileAsDataUrl, isDisplayableImage } from '@/lib/fileUtils';

interface DisputeFormProps {
  reason: string;
  onReasonChange: (reason: string) => void;
  description: string;
  onDescriptionChange: (description: string) => void;
  photos: string[];
  onPhotosChange: (photos: string[]) => void;
}

const SAMPLE_DISPUTE_PHOTO =
  'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=300';

export const DisputeForm: React.FC<DisputeFormProps> = ({
  reason,
  onReasonChange,
  description,
  onDescriptionChange,
  photos,
  onPhotosChange,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const remainingSlots = 3 - photos.length;
    const selectedFiles = Array.from(files).slice(0, remainingSlots);

    const loadedDataUrls = await Promise.all(
      selectedFiles.map(async (f) => {
        if (f.type.startsWith('image/')) {
          try {
            return await readFileAsDataUrl(f);
          } catch {
            return f.name;
          }
        }
        return f.name;
      })
    );

    onPhotosChange([...photos, ...loadedDataUrls]);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleAddSample = () => {
    if (photos.length >= 3) return;
    onPhotosChange([...photos, SAMPLE_DISPUTE_PHOTO]);
  };

  return (
    <div className="space-y-4">
      <ReasonPicker value={reason} onChange={onReasonChange} />

      {/* Description */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <Label htmlFor="dispute-desc" className="text-xs font-semibold text-foreground">
            Describe the situation <span className="text-destructive">*</span>
          </Label>
          <button
            type="button"
            onClick={() =>
              onDescriptionChange(
                'Work was left incomplete after water pipe installation. Joints were not sealed properly causing minor leakage under sink.'
              )
            }
            className="inline-flex items-center gap-1 text-[11px] text-primary hover:underline cursor-pointer"
          >
            <Sparkles className="h-3 w-3" />
            <span>Sample text</span>
          </button>
        </div>
        <Textarea
          id="dispute-desc"
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          placeholder="Please provide specifics: what was agreed upon vs what occurred, timeline, or attempted resolution..."
          rows={3}
          className="resize-none text-xs leading-relaxed"
        />
      </div>

      {/* Photo Evidence */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <Label className="text-xs font-semibold text-foreground">Evidence photos</Label>
          <div className="flex items-center gap-2">
            {photos.length < 3 && (
              <button
                type="button"
                onClick={handleAddSample}
                className="inline-flex items-center gap-1 text-[11px] text-primary hover:underline cursor-pointer"
              >
                <Sparkles className="h-3 w-3" />
                <span>Fill sample photo</span>
              </button>
            )}
            <span className="text-[11px] text-muted-foreground font-normal">{photos.length}/3</span>
          </div>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleFileChange}
        />

        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {photos.map((photo, idx) => {
            const isImg = isDisplayableImage(photo);
            return (
              <div
                key={idx}
                className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-border bg-muted/60"
              >
                {isImg ? (
                  <img src={photo} alt="Dispute evidence" className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center p-1 text-center">
                    <ImageIcon className="h-4 w-4 text-primary mb-0.5" />
                    <span className="truncate w-12 text-[8px] text-muted-foreground font-mono">{photo}</span>
                  </div>
                )}
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-0.5 right-0.5 h-4 w-4 rounded-full p-0 shadow"
                  onClick={() => onPhotosChange(photos.filter((_, i) => i !== idx))}
                >
                  <X className="h-2.5 w-2.5" />
                </Button>
              </div>
            );
          })}

          {photos.length < 3 && (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="h-16 w-16 shrink-0 rounded-lg border border-dashed border-border bg-muted/20 flex flex-col items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-colors cursor-pointer"
            >
              <Camera className="h-4 w-4" />
              <span className="text-[9px]">Add photo</span>
            </button>
          )}
        </div>
      </div>

      {/* Info Alert */}
      <Alert className="border-border bg-muted/40">
        <ShieldAlert className="h-4 w-4 text-primary" />
        <AlertTitle className="text-xs font-semibold text-foreground">
          Our team will review both sides
        </AlertTitle>
        <AlertDescription className="text-xs text-muted-foreground mt-1 leading-relaxed">
          Etcom operations will review the messages, quote, and evidence submitted. Disputed jobs do not add to the professional's confirmed work history.
        </AlertDescription>
      </Alert>
    </div>
  );
};
