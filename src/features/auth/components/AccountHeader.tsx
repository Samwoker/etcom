import React from 'react';
import { MapPin, ShieldCheck } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import type { Customer } from '@/types';

interface AccountHeaderProps {
  customer?: Customer | null;
}

export const AccountHeader: React.FC<AccountHeaderProps> = ({ customer }) => {
  const name = customer?.fullName || 'Verified Customer';
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2);

  // Mask phone number: e.g. +251 91 123 4567 -> +251 91 ••• 4567
  const rawPhone = customer?.phone || '+251 91 123 4567';
  const parts = rawPhone.split(' ');
  const maskedPhone =
    parts.length >= 4
      ? `${parts[0]} ${parts[1]} ••• ${parts[3]}`
      : rawPhone;

  return (
    <Card className="border-border shadow-sm">
      <CardContent className="p-4 flex items-center gap-3.5">
        <Avatar className="h-14 w-14 border border-border">
          <AvatarFallback className="font-bold text-sm bg-primary/10 text-primary">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0 space-y-1">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-foreground truncate">{name}</h2>
            <Badge variant="outline" className="text-[10px] py-0 px-1.5 border-primary/40 text-primary gap-1">
              <ShieldCheck className="h-3 w-3" />
              Verified
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground font-mono">{maskedPhone}</p>
          <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
            <MapPin className="h-3 w-3" />
            <span>{customer?.subCity || 'Bole'}, Addis Ababa</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
