import React, { useRef } from 'react';
import { FileBadge, Plus, X, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { readFileAsDataUrl, isDisplayableImage } from '@/lib/fileUtils';

interface EvidenceUploadListProps {
  files: string[];
  onAddFile: (fileName: string) => void;
  onRemoveFile: (index: number) => void;
}

export const EvidenceUploadList: React.FC<EvidenceUploadListProps> = ({
  files,
  onAddFile,
  onRemoveFile,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList || fileList.length === 0) return;

    for (const file of Array.from(fileList)) {
      if (file.type.startsWith('image/')) {
        try {
          const dataUrl = await readFileAsDataUrl(file);
          onAddFile(dataUrl);
        } catch {
          onAddFile(file.name);
        }
      } else {
        onAddFile(file.name);
      }
    }

    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label className="text-xs font-semibold text-foreground">
          Certificates & Work Samples
        </Label>
        <span className="text-[11px] text-muted-foreground font-normal">
          {files.length} attached
        </span>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,application/pdf"
        multiple
        className="hidden"
        onChange={handleFileUpload}
      />

      {/* Upload File & Quick Add Presets */}
      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={() => fileInputRef.current?.click()}
          className="text-xs h-8 rounded-full gap-1.5 bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20"
        >
          <Upload className="h-3.5 w-3.5" />
          <span>Upload from device</span>
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => onAddFile('tvet_plumbing_level_3.pdf')}
          className="text-xs h-8 rounded-full gap-1 border-border"
        >
          <Plus className="h-3 w-3 text-primary" />
          <span>TVET Cert</span>
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => onAddFile('trade_license_2025.pdf')}
          className="text-xs h-8 rounded-full gap-1 border-border"
        >
          <Plus className="h-3 w-3 text-primary" />
          <span>Trade License</span>
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => onAddFile('https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400')}
          className="text-xs h-8 rounded-full gap-1 border-border"
        >
          <Plus className="h-3 w-3 text-primary" />
          <span>Sample Work Photo</span>
        </Button>
      </div>

      {/* Uploaded Items List */}
      {files.length > 0 && (
        <div className="space-y-1.5 pt-1">
          {files.map((file, idx) => {
            const isImg = isDisplayableImage(file);
            return (
              <div
                key={idx}
                className="flex items-center justify-between p-2 rounded-lg bg-muted/40 border border-border/60 text-xs"
              >
                <div className="flex items-center gap-2 truncate">
                  {isImg ? (
                    <img src={file} alt="Evidence thumbnail" className="h-6 w-6 object-cover rounded shrink-0 border border-border" />
                  ) : (
                    <FileBadge className="h-4 w-4 text-primary shrink-0" />
                  )}
                  <span className="truncate font-mono text-[11px]">
                    {isImg ? `Evidence Image #${idx + 1}` : file}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => onRemoveFile(idx)}
                  className="text-muted-foreground hover:text-destructive p-1"
                  aria-label="Remove document"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
