import React from 'react';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { TradeType } from '@/types';

const TRADES: TradeType[] = [
  'Plumber',
  'Electrician',
  'TV Repair',
  'Painter',
  'Carpenter',
];

interface TradeSelectProps {
  value?: TradeType;
  onChange: (trade: TradeType) => void;
  error?: string;
}

export const TradeSelect: React.FC<TradeSelectProps> = ({
  value,
  onChange,
  error,
}) => {
  return (
    <div className="space-y-1.5">
      <Label htmlFor="trade" className="text-sm font-medium text-foreground">
        Primary Trade Category
      </Label>
      <Select value={value} onValueChange={(val) => onChange(val as TradeType)}>
        <SelectTrigger id="trade" className="h-11 rounded-lg w-full">
          <SelectValue placeholder="Select your trade" />
        </SelectTrigger>
        <SelectContent>
          {TRADES.map((trade) => (
            <SelectItem key={trade} value={trade}>
              {trade}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
};
