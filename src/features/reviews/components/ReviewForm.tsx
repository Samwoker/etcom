import React, { useRef } from 'react';
import { Camera, X, Image as ImageIcon, Sparkles } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { RatingInput } from './RatingInput';
import { readFileAsDataUrl, isDisplayableImage } from '@/lib/fileUtils';

const REVIEW_TAGS = ['On time', 'Clean work', 'Fair price', 'Good communication'] as const;

interface ReviewFormProps {
  rating: number;
  onRatingChange: (rating: number) => void;
  tags: string[];
  onTagsChange: (tags: string[]) => void;
  comment: string;
  onCommentChange: (comment: string) => void;
  photos: string[];
  onPhotosChange: (photos: string[]) => void;
}

const SAMPLE_REVIEW_PHOTO =
  'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=300';

export const ReviewForm: React.FC<ReviewFormProps> = ({
  rating,
  onRatingChange,
  tags,
  onTagsChange,
  comment,
  onCommentChange,
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

  const handleFillSample = () => {
    onRatingChange(5);
    onTagsChange(['On time', 'Clean work', 'Fair price']);
    onCommentChange(
      'Excellent workmanship! Arrived on time with proper equipment, completed the installation quickly, and cleaned up afterwards.'
    );
    if (photos.length === 0) {
      onPhotosChange([SAMPLE_REVIEW_PHOTO]);
    }
  };

  return (
    <div className="space-y-4 pt-2">
      <div className="flex items-center justify-between">
        <RatingInput value={rating} onChange={onRatingChange} />
        <button
          type="button"
          onClick={handleFillSample}
          className="inline-flex items-center gap-1 text-[11px] text-primary hover:underline cursor-pointer"
        >
          <Sparkles className="h-3 w-3" />
          <span>Quick fill sample</span>
        </button>
      </div>

      {/* Tag Chips */}
      <div className="space-y-1.5">
        <Label className="text-xs font-semibold text-foreground">What went well?</Label>
        <ToggleGroup
          type="multiple"
          value={tags}
          onValueChange={onTagsChange}
          className="flex flex-wrap gap-1.5 justify-start"
        >
          {REVIEW_TAGS.map((tag) => (
            <ToggleGroupItem
              key={tag}
              value={tag}
              size="sm"
              variant="outline"
              className="text-xs rounded-full px-3 py-1 border-border data-[state=on]:border-primary data-[state=on]:bg-primary/10 data-[state=on]:text-primary"
            >
              {tag}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>

      {/* Review Comment */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <Label htmlFor="review-comment" className="text-xs font-semibold text-foreground">
            Written feedback
          </Label>
          <span className="text-[11px] text-muted-foreground font-normal">Optional</span>
        </div>
        <Textarea
          id="review-comment"
          value={comment}
          onChange={(e) => onCommentChange(e.target.value)}
          placeholder="Share your experience with this professional's workmanship, punctuality, and professionalism..."
          rows={3}
          className="resize-none text-xs leading-relaxed"
        />
      </div>

      {/* Optional Photo Picker */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <Label className="text-xs font-semibold text-foreground">Photos of completed work</Label>
          <span className="text-[11px] text-muted-foreground font-normal">{photos.length}/3</span>
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
                  <img src={photo} alt="Work attachment" className="h-full w-full object-cover" />
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
    </div>
  );
};
