import React from 'react';
import { Star } from 'lucide-react';

interface RatingInputProps {
  value: number;
  onChange: (rating: number) => void;
}

const RATING_LABELS: Record<number, string> = {
  1: 'Poor',
  2: 'Fair',
  3: 'Good',
  4: 'Very Good',
  5: 'Excellent',
};

export const RatingInput: React.FC<RatingInputProps> = ({ value, onChange }) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-foreground">Rating</label>
        {value > 0 && (
          <span className="text-xs font-medium text-primary">
            {RATING_LABELS[value]} ({value}/5)
          </span>
        )}
      </div>

      <div className="flex items-center gap-2">
        {[1, 2, 3, 4, 5].map((star) => {
          const isSelected = star <= value;
          return (
            <button
              key={star}
              type="button"
              onClick={() => onChange(star)}
              className="p-1 rounded-lg transition-transform active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
            >
              <Star
                className={`h-7 w-7 transition-colors ${
                  isSelected
                    ? 'fill-amber-400 text-amber-400'
                    : 'text-muted-foreground/30 hover:text-muted-foreground/60'
                }`}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};
