import React, { useRef } from 'react';
import { Camera, X, Image as ImageIcon, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { readFileAsDataUrl, isDisplayableImage } from '@/lib/fileUtils';

interface PhotoPickerProps {
  photos: string[];
  onChange: (photos: string[]) => void;
  maxPhotos?: number;
}

const SAMPLE_DEMO_PHOTOS = [
  'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=300',
  'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=300',
];

export const PhotoPicker: React.FC<PhotoPickerProps> = ({
  photos,
  onChange,
  maxPhotos = 3,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const remainingSlots = maxPhotos - photos.length;
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

    onChange([...photos, ...loadedDataUrls]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleAddSample = () => {
    if (photos.length >= maxPhotos) return;
    const nextSample = SAMPLE_DEMO_PHOTOS[photos.length % SAMPLE_DEMO_PHOTOS.length];
    onChange([...photos, nextSample]);
  };

  const handleRemove = (index: number) => {
    onChange(photos.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
          <Camera className="h-3.5 w-3.5 text-primary" />
          <span>Photos of the problem</span>
          <span className="text-[11px] text-muted-foreground font-normal">
            (Optional, max {maxPhotos})
          </span>
        </label>
        <div className="flex items-center gap-2">
          {photos.length < maxPhotos && (
            <button
              type="button"
              onClick={handleAddSample}
              className="inline-flex items-center gap-1 text-[11px] font-medium text-primary hover:underline cursor-pointer"
            >
              <Sparkles className="h-3 w-3" />
              <span>Fill sample</span>
            </button>
          )}
          <span className="text-[11px] font-medium text-muted-foreground tabular-nums">
            {photos.length}/{maxPhotos}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3 overflow-x-auto pb-1">
        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleFileChange}
        />

        {/* Photo Thumbnails */}
        {photos.map((photo, index) => {
          const isImg = isDisplayableImage(photo);
          return (
            <div
              key={index}
              className="relative flex h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-border bg-muted/60"
            >
              {isImg ? (
                <img
                  src={photo}
                  alt={`Uploaded problem ${index + 1}`}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center p-1 text-center">
                  <ImageIcon className="h-5 w-5 text-primary mb-1" />
                  <span className="truncate w-16 text-[9px] text-muted-foreground font-mono">
                    {photo}
                  </span>
                </div>
              )}
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-1 right-1 h-5 w-5 rounded-full p-0 shadow"
                onClick={() => handleRemove(index)}
                aria-label={`Remove photo ${index + 1}`}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          );
        })}

        {/* Add Photo Button */}
        {photos.length < maxPhotos && (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex h-20 w-20 shrink-0 flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted/30 text-muted-foreground hover:border-primary hover:text-primary transition-colors cursor-pointer"
          >
            <Camera className="h-5 w-5 mb-1" />
            <span className="text-[10px] font-medium">Add Photo</span>
          </button>
        )}
      </div>
    </div>
  );
};
