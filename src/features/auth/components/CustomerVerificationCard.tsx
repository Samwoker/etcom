import React, { useState, useRef } from 'react';
import { CheckCircle2, Shield, Upload, Lock, FileText, Check, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from '@/components/ui/sheet';
import { readFileAsDataUrl, isDisplayableImage } from '@/lib/fileUtils';

interface CustomerVerificationCardProps {
  totalJobs: number;
  disputesCount: number;
  cancellationsCount: number;
}

export const CustomerVerificationCard: React.FC<CustomerVerificationCardProps> = ({
  totalJobs,
  disputesCount,
  cancellationsCount,
}) => {
  const [fakeFile, setFakeFile] = useState<string | null>(null);
  const [isUploaded, setIsUploaded] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      if (file.type.startsWith('image/')) {
        const dataUrl = await readFileAsDataUrl(file);
        setFakeFile(dataUrl);
      } else {
        setFakeFile(file.name);
      }
    } catch {
      setFakeFile(file.name);
    }
  };

  return (
    <Card className="border-border shadow-2xs">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold text-foreground flex items-center justify-between">
          <span>Trust & Verification</span>
          <span className="text-[11px] font-normal text-muted-foreground">Etcom Tier 1</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 pt-0">
        {/* Level 1: Phone */}
        <div className="flex items-center justify-between p-2.5 rounded-lg bg-muted/40 border border-border/60">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
            <div>
              <p className="text-xs font-semibold text-foreground">Phone number</p>
              <p className="text-[11px] text-muted-foreground">OTP confirmed via Safaricom</p>
            </div>
          </div>
          <Badge className="bg-primary/10 text-primary border-primary/20 text-[10px] px-2 py-0.5">
            Done
          </Badge>
        </div>

        {/* Level 2: ID (Optional) */}
        <div className="flex items-center justify-between p-2.5 rounded-lg bg-muted/40 border border-border/60">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-muted-foreground shrink-0" />
            <div>
              <p className="text-xs font-semibold text-foreground">National ID</p>
              <p className="text-[11px] text-muted-foreground">Optional (high-value jobs only)</p>
            </div>
          </div>
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="h-7 text-xs rounded-full px-2.5">
                {isUploaded ? 'View ID' : 'Upload ID'}
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="rounded-t-2xl max-w-md mx-auto p-5 space-y-4">
              <SheetHeader>
                <div className="flex items-center justify-between">
                  <SheetTitle className="text-base font-bold">National ID Verification</SheetTitle>
                  <button
                    type="button"
                    onClick={() => setFakeFile('ethiopian_fayda_id.pdf')}
                    className="inline-flex items-center gap-1 text-[11px] text-primary hover:underline cursor-pointer"
                  >
                    <Sparkles className="h-3 w-3" />
                    <span>Fill sample ID</span>
                  </button>
                </div>
                <SheetDescription className="text-xs text-muted-foreground">
                  Identity verification is optional for customers and only required for high-risk or commercial contracts.
                </SheetDescription>
              </SheetHeader>

              <div className="space-y-3">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*,application/pdf"
                  className="hidden"
                  onChange={handleFileChange}
                />

                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="p-5 border-2 border-dashed border-border rounded-xl text-center flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 transition-colors bg-muted/20"
                >
                  <Upload className="h-6 w-6 text-muted-foreground mb-1.5" />
                  <p className="text-xs font-semibold text-foreground">
                    Tap to upload ID document from device
                  </p>
                  <p className="text-[11px] text-muted-foreground">Fayda National ID, Kebele ID, or Passport (Demo)</p>
                </div>

                {fakeFile && (
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-primary/5 border border-primary/20 text-xs">
                    <div className="flex items-center gap-2">
                      {isDisplayableImage(fakeFile) ? (
                        <img src={fakeFile} alt="Customer ID document" className="h-7 w-7 object-cover rounded border border-primary/30" />
                      ) : (
                        <FileText className="h-4 w-4 text-primary" />
                      )}
                      <span className="font-mono text-[11px] truncate max-w-[200px]">
                        {isDisplayableImage(fakeFile) ? 'Document Image Uploaded' : fakeFile}
                      </span>
                    </div>
                    <Check className="h-4 w-4 text-primary shrink-0" />
                  </div>
                )}

                {/* Privacy Note */}
                <div className="flex items-start gap-2 p-3 rounded-lg bg-muted/40 border border-border text-[11px] text-muted-foreground leading-relaxed">
                  <Lock className="h-3.5 w-3.5 text-foreground shrink-0 mt-0.5" />
                  <span>
                    Privacy note: Your documents remain in local memory during this demo session and are never transmitted to third parties.
                  </span>
                </div>

                <Button
                  onClick={() => {
                    if (fakeFile) setIsUploaded(true);
                    setSheetOpen(false);
                  }}
                  disabled={!fakeFile}
                  className="w-full rounded-full font-semibold bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Save ID details
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <Separator />

        {/* Level 3: Account History Metrics */}
        <div className="grid grid-cols-3 gap-2 text-center pt-0.5">
          <div className="p-2 rounded-lg bg-muted/30">
            <span className="text-base font-bold text-foreground block">{totalJobs}</span>
            <span className="text-[10px] text-muted-foreground">Completed</span>
          </div>
          <div className="p-2 rounded-lg bg-muted/30">
            <span className="text-base font-bold text-foreground block">{cancellationsCount}</span>
            <span className="text-[10px] text-muted-foreground">Cancelled</span>
          </div>
          <div className="p-2 rounded-lg bg-muted/30">
            <span className="text-base font-bold text-foreground block">{disputesCount}</span>
            <span className="text-[10px] text-muted-foreground">Disputes</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
