import React, { useRef } from 'react';
import { Upload, FileText, X, Sparkles } from 'lucide-react';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { readFileAsDataUrl, isDisplayableImage } from '@/lib/fileUtils';

export const ID_TYPES = [
  'Kebele ID',
  'Passport',
  'Driver licence',
  'Fayda National ID',
] as const;

interface IdDocumentPickerProps {
  idType: string;
  onIdTypeChange: (idType: string) => void;
  frontFile: string | null;
  onFrontFileChange: (file: string | null) => void;
  backFile: string | null;
  onBackFileChange: (file: string | null) => void;
}

const SAMPLE_ID_IMAGE =
  'https://images.unsplash.com/photo-1544717305-2782549b5136?w=400';

export const IdDocumentPicker: React.FC<IdDocumentPickerProps> = ({
  idType,
  onIdTypeChange,
  frontFile,
  onFrontFileChange,
  backFile,
  onBackFileChange,
}) => {
  const frontInputRef = useRef<HTMLInputElement>(null);
  const backInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (val: string | null) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      if (file.type.startsWith('image/')) {
        const dataUrl = await readFileAsDataUrl(file);
        setter(dataUrl);
      } else {
        setter(file.name);
      }
    } catch {
      setter(file.name);
    }
  };

  const handleFillDemoDocs = () => {
    onFrontFileChange(SAMPLE_ID_IMAGE);
    onBackFileChange('national_id_back_verified.pdf');
  };

  return (
    <div className="space-y-3.5">
      <div className="flex items-center justify-between">
        <Label className="text-xs font-semibold text-foreground">
          Document Type <span className="text-destructive">*</span>
        </Label>
        <button
          type="button"
          onClick={handleFillDemoDocs}
          className="inline-flex items-center gap-1 text-[11px] text-primary hover:underline cursor-pointer"
        >
          <Sparkles className="h-3 w-3" />
          <span>Quick fill sample ID</span>
        </button>
      </div>

      <Select value={idType} onValueChange={onIdTypeChange}>
        <SelectTrigger className="w-full text-xs h-10 rounded-xl bg-card">
          <SelectValue placeholder="Select legal ID type" />
        </SelectTrigger>
        <SelectContent>
          {ID_TYPES.map((type) => (
            <SelectItem key={type} value={type} className="text-xs">
              {type}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Front & Back Document Pickers */}
      <div className="grid grid-cols-2 gap-2.5">
        {/* Front */}
        <div className="space-y-1">
          <span className="text-[11px] font-medium text-foreground">Front Side</span>
          <input
            ref={frontInputRef}
            type="file"
            accept="image/*,application/pdf"
            className="hidden"
            onChange={(e) => handleFile(e, onFrontFileChange)}
          />
          {frontFile ? (
            <div className="relative p-2 rounded-xl border border-primary/30 bg-primary/5 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 truncate">
                {isDisplayableImage(frontFile) ? (
                  <img src={frontFile} alt="ID Front" className="h-6 w-6 object-cover rounded shrink-0" />
                ) : (
                  <FileText className="h-4 w-4 text-primary shrink-0" />
                )}
                <span className="truncate text-[10px] font-mono">Front Uploaded</span>
              </div>
              <button
                type="button"
                onClick={() => onFrontFileChange(null)}
                className="text-muted-foreground hover:text-destructive p-0.5"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => frontInputRef.current?.click()}
              className="w-full p-3 rounded-xl border border-dashed border-border bg-muted/20 hover:border-primary text-center flex flex-col items-center justify-center gap-1 transition-colors cursor-pointer"
            >
              <Upload className="h-4 w-4 text-muted-foreground" />
              <span className="text-[11px] text-muted-foreground font-medium">Upload Front</span>
            </button>
          )}
        </div>

        {/* Back */}
        <div className="space-y-1">
          <span className="text-[11px] font-medium text-foreground">Back Side</span>
          <input
            ref={backInputRef}
            type="file"
            accept="image/*,application/pdf"
            className="hidden"
            onChange={(e) => handleFile(e, onBackFileChange)}
          />
          {backFile ? (
            <div className="relative p-2 rounded-xl border border-primary/30 bg-primary/5 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 truncate">
                {isDisplayableImage(backFile) ? (
                  <img src={backFile} alt="ID Back" className="h-6 w-6 object-cover rounded shrink-0" />
                ) : (
                  <FileText className="h-4 w-4 text-primary shrink-0" />
                )}
                <span className="truncate text-[10px] font-mono">Back Uploaded</span>
              </div>
              <button
                type="button"
                onClick={() => onBackFileChange(null)}
                className="text-muted-foreground hover:text-destructive p-0.5"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => backInputRef.current?.click()}
              className="w-full p-3 rounded-xl border border-dashed border-border bg-muted/20 hover:border-primary text-center flex flex-col items-center justify-center gap-1 transition-colors cursor-pointer"
            >
              <Upload className="h-4 w-4 text-muted-foreground" />
              <span className="text-[11px] text-muted-foreground font-medium">Upload Back</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
