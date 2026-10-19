import React, { useState, useRef } from 'react';
import { AlertCircle, Camera, X, Sparkles } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { readFileAsDataUrl } from '@/lib/fileUtils';

interface AddWorkSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (data: { title: string; category: string; description: string; photoUrl: string }) => void;
}

const SAMPLE_WORK_PHOTO =
  'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=500';

export const AddWorkSheet: React.FC<AddWorkSheetProps> = ({
  open,
  onOpenChange,
  onAdd,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [photoUrl, setPhotoUrl] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const dataUrl = await readFileAsDataUrl(file);
      setPhotoUrl(dataUrl);
    } catch {
      setPhotoUrl(file.name);
    }
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleFillSample = () => {
    setTitle('Bole Penthouse Bathroom Piping & Sanitary Fixtures');
    setDescription(
      'Complete PPR piping, modern wall-hung toilet installation, and chrome shower mixer setup.'
    );
    setPhotoUrl(SAMPLE_WORK_PHOTO);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAdd({
      title,
      category: 'Plumbing',
      description,
      photoUrl: photoUrl || SAMPLE_WORK_PHOTO,
    });

    setTitle('');
    setDescription('');
    setPhotoUrl('');
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="rounded-t-2xl max-w-xl md:max-w-2xl mx-auto p-4 sm:p-5 space-y-3">
        <SheetHeader>
          <div className="flex items-center justify-between">
            <SheetTitle className="text-base font-bold">Add Previous Work Project</SheetTitle>
            <button
              type="button"
              onClick={handleFillSample}
              className="inline-flex items-center gap-1 text-[11px] text-primary hover:underline cursor-pointer"
            >
              <Sparkles className="h-3 w-3" />
              <span>Fill sample project</span>
            </button>
          </div>
          <SheetDescription className="text-xs text-muted-foreground">
            Showcase completed projects from your career. Upload photos directly from your device.
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Photo Uploader */}
          <div className="space-y-1">
            <Label className="text-xs font-semibold">Project Photo</Label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />

            {photoUrl ? (
              <div className="relative h-28 w-full rounded-xl overflow-hidden border border-primary/40 bg-muted/30">
                <img src={photoUrl} alt="Project preview" className="h-full w-full object-cover" />
                <button
                  type="button"
                  onClick={() => setPhotoUrl('')}
                  className="absolute top-1.5 right-1.5 p-1 bg-black/60 hover:bg-destructive text-white rounded-full transition-colors"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-4 border-2 border-dashed border-border rounded-xl text-center flex flex-col items-center justify-center gap-1 hover:border-primary/60 transition-colors cursor-pointer bg-muted/20"
              >
                <Camera className="h-5 w-5 text-muted-foreground" />
                <span className="text-xs font-semibold text-foreground">Upload project photo</span>
                <span className="text-[10px] text-muted-foreground">Tap to pick from device or camera</span>
              </button>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="work-title" className="text-xs font-semibold">
              Project Title <span className="text-destructive">*</span>
            </Label>
            <Input
              id="work-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Sanitary pipe repair in Bole"
              className="text-xs h-9 rounded-lg"
              required
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="work-desc" className="text-xs font-semibold">
              Description
            </Label>
            <Textarea
              id="work-desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Fittings used, challenges solved, or scope of work..."
              rows={2}
              className="text-xs resize-none leading-relaxed"
            />
          </div>

          <Alert className="border-border bg-muted/40 p-2.5">
            <AlertCircle className="h-3.5 w-3.5 text-muted-foreground" />
            <AlertDescription className="text-[11px] text-muted-foreground leading-relaxed">
              <strong>Transparency rule:</strong> Self-uploaded photos are clearly labeled as <strong>Not verified by Etcom</strong>.
            </AlertDescription>
          </Alert>

          <Button
            type="submit"
            disabled={!title.trim()}
            className="w-full h-9 rounded-full font-semibold bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Add to Portfolio
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
};
