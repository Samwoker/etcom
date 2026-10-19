import React from 'react';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import type { QueueFilter } from '../hooks/useReviewQueue';

interface QueueFiltersProps {
  filter: QueueFilter;
  onFilterChange: (filter: QueueFilter) => void;
  totalCount: number;
}

export const QueueFilters: React.FC<QueueFiltersProps> = ({
  filter,
  onFilterChange,
  totalCount,
}) => {
  return (
    <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
      <ToggleGroup
        type="single"
        value={filter}
        onValueChange={(val) => {
          if (val) onFilterChange(val as QueueFilter);
        }}
        size="sm"
        variant="outline"
        className="flex-wrap gap-1.5"
      >
        <ToggleGroupItem value="all" className="text-xs px-3 h-8">
          All ({totalCount})
        </ToggleGroupItem>
        <ToggleGroupItem value="identity" className="text-xs px-3 h-8">
          Identity
        </ToggleGroupItem>
        <ToggleGroupItem value="skills" className="text-xs px-3 h-8">
          Skills
        </ToggleGroupItem>
        <ToggleGroupItem value="needs_info" className="text-xs px-3 h-8">
          Needs more info
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};
