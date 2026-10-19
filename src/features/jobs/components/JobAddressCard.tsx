import React from 'react';
import { MapPin, Calendar, Lock, Phone } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatEthiopianPhone } from '@/lib/format';

interface JobAddressCardProps {
  subCity: string;
  scheduledDate?: string;
  scopeDescription?: string;
  customerPhone?: string;
  contactRevealed: boolean;
}

export const JobAddressCard: React.FC<JobAddressCardProps> = ({
  subCity,
  scheduledDate,
  scopeDescription,
  customerPhone,
  contactRevealed,
}) => {
  return (
    <Card className="border-border shadow-sm">
      <CardContent className="p-4 space-y-3 text-xs">
        {/* Appointment & Location */}
        <div className="grid grid-cols-2 gap-2 pb-2 border-b border-border/50">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary shrink-0" />
            <div>
              <span className="text-[10px] text-muted-foreground block">Service Area</span>
              <span className="font-semibold text-foreground">{subCity} Sub-City</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-primary shrink-0" />
            <div>
              <span className="text-[10px] text-muted-foreground block">Appointment</span>
              <span className="font-semibold text-foreground">{scheduledDate || 'Flexible'}</span>
            </div>
          </div>
        </div>

        {/* Agreed Scope */}
        {scopeDescription && (
          <div className="space-y-1">
            <span className="text-[10px] text-muted-foreground block">Agreed Scope of Work</span>
            <p className="text-[11px] text-foreground leading-relaxed bg-muted/30 p-2.5 rounded-lg border border-border/40">
              {scopeDescription}
            </p>
          </div>
        )}

        {/* Contact Info (Revealed only after confirmation) */}
        <div className="pt-1">
          {contactRevealed && customerPhone ? (
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-primary/5 border border-primary/20">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <div>
                  <span className="text-[10px] text-muted-foreground block">Client Phone</span>
                  <span className="font-bold text-foreground">{formatEthiopianPhone(customerPhone)}</span>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                asChild
                className="h-7 text-xs rounded-full border-primary/30 text-primary hover:bg-primary/5"
              >
                <a href={`tel:${customerPhone.replace(/\s+/g, '')}`}>Call</a>
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2 p-2.5 rounded-lg bg-muted/40 border border-border/50 text-muted-foreground">
              <Lock className="h-3.5 w-3.5 shrink-0" />
              <span className="text-[11px]">Direct client phone unlocks once agreement is confirmed</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
