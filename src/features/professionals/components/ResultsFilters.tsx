import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import type { VerificationPreferenceOption } from '@/types';
import type { SortOption } from '../hooks/useProfessionalSearch';

interface ResultsFiltersProps {
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  verificationFilter: VerificationPreferenceOption;
  onVerificationChange: (filter: VerificationPreferenceOption) => void;
  selectedTrade: string;
  onTradeChange: (trade: string) => void;
  totalCount: number;
}

const TRADE_OPTIONS = [
  { value: 'all', label: 'All Trades' },
  { value: 'Plumbing', label: 'Plumbing' },
  { value: 'Electrical', label: 'Electrical' },
  { value: 'TV Repair', label: 'TV & Appliance' },
  { value: 'Painting', label: 'Painting' },
  { value: 'Carpenter', label: 'Carpentry' },
];

const VERIFICATION_OPTIONS: { value: VerificationPreferenceOption; label: string }[] = [
  { value: 'verified_skills', label: 'Verified skills' },
  { value: 'identity_verified', label: 'ID verified' },
  { value: 'all', label: 'Show all' },
];

export const ResultsFilters: React.FC<ResultsFiltersProps> = ({
  sortBy,
  onSortChange,
  verificationFilter,
  onVerificationChange,
  selectedTrade,
  onTradeChange,
  totalCount,
}) => {
  return (
    <div className="space-y-2.5">
      {/* Top Controls Row */}
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs text-muted-foreground font-medium">
          {totalCount} {totalCount === 1 ? 'professional' : 'professionals'} available
        </span>
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs text-muted-foreground hidden sm:inline">Sort:</span>
          <Select value={sortBy} onValueChange={(val) => onSortChange(val as SortOption)}>
            <SelectTrigger className="h-8 rounded-lg text-xs w-[130px] sm:w-[145px] bg-card">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="best_match">Best match</SelectItem>
              <SelectItem value="distance">Nearest first</SelectItem>
              <SelectItem value="rating">Highest rating</SelectItem>
              <SelectItem value="most_jobs">Most jobs</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Trade Category Filter Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {TRADE_OPTIONS.map((trade) => {
          const isSelected =
            selectedTrade.toLowerCase() === trade.value.toLowerCase() ||
            (trade.value === 'all' && (!selectedTrade || selectedTrade === 'all'));

          return (
            <Badge
              key={trade.value}
              role="button"
              tabIndex={0}
              onClick={() => onTradeChange(trade.value)}
              className={`cursor-pointer rounded-full px-3 py-1 text-xs font-semibold shrink-0 transition-all ${
                isSelected
                  ? 'bg-primary text-primary-foreground shadow-2xs hover:bg-primary/90'
                  : 'bg-card text-muted-foreground border border-border hover:text-foreground hover:bg-muted/40'
              }`}
            >
              {trade.label}
            </Badge>
          );
        })}
      </div>

      {/* Verification Filter Chips Row */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 scrollbar-none">
        <span className="text-[11px] text-muted-foreground font-medium shrink-0 mr-1">
          Verification:
        </span>
        {VERIFICATION_OPTIONS.map((opt) => {
          const isSelected = verificationFilter === opt.value;
          return (
            <Badge
              key={opt.value}
              role="button"
              tabIndex={0}
              onClick={() => onVerificationChange(opt.value)}
              className={`cursor-pointer rounded-full px-2.5 py-0.5 text-[11px] font-medium shrink-0 transition-all ${
                isSelected
                  ? 'bg-secondary text-primary border border-primary/30 font-semibold'
                  : 'bg-muted/60 text-muted-foreground border border-transparent hover:text-foreground hover:bg-muted'
              }`}
            >
              {opt.label}
            </Badge>
          );
        })}
      </div>
    </div>
  );
};
