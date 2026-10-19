import React from 'react';
import { Calendar, Image as ImageIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatRelativeTime } from '@/lib/format';
import { isDisplayableImage } from '@/lib/fileUtils';
import type { SelfUploadWorkItem } from '@/types';

interface PortfolioGridProps {
  items: SelfUploadWorkItem[];
}

export const PortfolioGrid: React.FC<PortfolioGridProps> = ({ items }) => {
  return (
    <div className="space-y-3">
      {items.map((item) => {
        const hasImg = isDisplayableImage(item.photoUrl);
        return (
          <Card key={item.id} className="border-border shadow-2xs overflow-hidden">
            <CardContent className="p-3.5 space-y-2 text-xs">
              <div className="flex items-center justify-between gap-2">
                <Badge variant="outline" className="border-border text-muted-foreground text-[10px] font-normal">
                  Not verified by Etcom
                </Badge>
                <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  <span>{formatRelativeTime(item.createdAt)}</span>
                </div>
              </div>

              {/* Uploaded Project Photo */}
              {item.photoUrl && (
                <div className="relative h-40 w-full overflow-hidden rounded-xl border border-border bg-muted/30">
                  {hasImg ? (
                    <img
                      src={item.photoUrl}
                      alt={item.title}
                      className="h-full w-full object-cover transition-transform hover:scale-105 duration-300"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center gap-1.5 text-muted-foreground text-xs">
                      <ImageIcon className="h-5 w-5" />
                      <span>{item.photoUrl}</span>
                    </div>
                  )}
                </div>
              )}

              <div>
                <h4 className="font-bold text-foreground text-xs">{item.title}</h4>
                <p className="text-[11px] text-muted-foreground leading-relaxed mt-0.5">
                  {item.description || 'Self-reported past client project.'}
                </p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
