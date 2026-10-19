import React from 'react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { SubCity } from '@/types';

export const TRADES_LIST = [
  'Plumber',
  'Electrician',
  'Painter',
  'TV Repair',
  'Carpenter',
] as const;

export const SUBCITIES_LIST: SubCity[] = [
  'Bole',
  'Piassa',
  'CMC',
  'Kazanchis',
  'Sarbet',
  'Gerji',
  'Akaki',
];

interface ServiceCategoryPickerProps {
  selectedTrade: string;
  onTradeChange: (trade: string) => void;
  selectedSubCity: SubCity;
  onSubCityChange: (subCity: SubCity) => void;
}

export const ServiceCategoryPicker: React.FC<ServiceCategoryPickerProps> = ({
  selectedTrade,
  onTradeChange,
  selectedSubCity,
  onSubCityChange,
}) => {
  return (
    <div className="space-y-4">
      {/* Primary Trade Chips */}
      <div className="space-y-1.5">
        <Label className="text-xs font-semibold text-foreground">
          Primary Service Trade <span className="text-destructive">*</span>
        </Label>
        <p className="text-[11px] text-muted-foreground">
          Choose the primary skilled craft you offer in Addis Ababa.
        </p>
        <ToggleGroup
          type="single"
          value={selectedTrade}
          onValueChange={(val) => val && onTradeChange(val)}
          className="flex flex-wrap gap-2 justify-start pt-1"
        >
          {TRADES_LIST.map((trade) => (
            <ToggleGroupItem
              key={trade}
              value={trade}
              variant="outline"
              className="text-xs px-3.5 py-1.5 rounded-full border-border data-[state=on]:border-primary data-[state=on]:bg-primary/10 data-[state=on]:text-primary"
            >
              {trade}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>

      {/* Primary Sub-City Area */}
      <div className="space-y-1.5">
        <Label className="text-xs font-semibold text-foreground">
          Primary Coverage Area in Addis <span className="text-destructive">*</span>
        </Label>
        <Select value={selectedSubCity} onValueChange={(val) => onSubCityChange(val as SubCity)}>
          <SelectTrigger className="w-full text-xs h-10 rounded-xl bg-card">
            <SelectValue placeholder="Select sub-city area" />
          </SelectTrigger>
          <SelectContent>
            {SUBCITIES_LIST.map((subCity) => (
              <SelectItem key={subCity} value={subCity} className="text-xs">
                {subCity} Sub-City
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
