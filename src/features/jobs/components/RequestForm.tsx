import React from 'react';
import { Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { StickyCta } from '@/components/shared/StickyCta';
import { PhotoPicker } from './PhotoPicker';
import { UrgencyToggle } from './UrgencyToggle';
import { VerificationPreference } from './VerificationPreference';
import { useNewRequest } from '../hooks/useNewRequest';

const CATEGORIES = ['Plumbing', 'Electrical', 'TV Repair', 'Painting', 'Carpenter'];
const SUBCITIES = ['Bole', 'Piassa', 'CMC', 'Kazanchis', 'Sarbet', 'Gerji'];

export const RequestForm: React.FC = () => {
  const { formData, error, isLoading, actions } = useNewRequest();

  return (
    <form onSubmit={actions.handleSubmit} className="space-y-6 pb-28">
      {/* Category Chips */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-foreground">Service Category</Label>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => {
            const isSelected = formData.category === cat;
            return (
              <Badge
                key={cat}
                role="button"
                tabIndex={0}
                onClick={() => actions.setCategory(cat)}
                className={`cursor-pointer rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
                  isSelected
                    ? 'bg-primary text-primary-foreground hover:bg-emerald-600'
                    : 'bg-muted text-muted-foreground border border-border hover:text-foreground'
                }`}
              >
                {cat}
              </Badge>
            );
          })}
        </div>
      </div>

      {/* Description Textarea */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <Label htmlFor="description" className="text-sm font-medium text-foreground">
            What needs to be fixed?
          </Label>
          <button
            type="button"
            onClick={() =>
              actions.setDescription(
                'Main pressure valve under kitchen sink is leaking water onto the floor and requires new washer/sealing.'
              )
            }
            className="inline-flex items-center gap-1 text-[11px] text-primary hover:underline cursor-pointer"
          >
            <Sparkles className="h-3 w-3" />
            <span>Fill sample text</span>
          </button>
        </div>
        <Textarea
          id="description"
          rows={3}
          value={formData.description}
          onChange={(e) => actions.setDescription(e.target.value)}
          placeholder="Describe what happened, where the issue is, and any specific details..."
          className={`rounded-xl resize-none ${error ? 'border-destructive' : ''}`}
          aria-invalid={Boolean(error)}
        />
        {error && <p className="text-xs text-destructive">{error}</p>}
      </div>

      {/* Photo Picker (Max 3) */}
      <PhotoPicker photos={formData.photos} onChange={actions.setPhotos} />

      {/* Location Selector */}
      <div className="space-y-1.5">
        <Label htmlFor="subCity" className="text-sm font-medium text-foreground">
          Neighborhood in Addis Ababa
        </Label>
        <Select value={formData.subCity} onValueChange={actions.setSubCity}>
          <SelectTrigger id="subCity" className="h-11 rounded-xl w-full">
            <SelectValue placeholder="Select sub-city" />
          </SelectTrigger>
          <SelectContent>
            {SUBCITIES.map((city) => (
              <SelectItem key={city} value={city}>
                {city}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Urgency Toggle */}
      <UrgencyToggle value={formData.urgency} onChange={actions.setUrgency} />

      {/* Verification Preference Radio Group */}
      <VerificationPreference
        value={formData.verificationPreference}
        onChange={actions.setVerificationPreference}
      />

      {/* Sticky Bottom Action */}
      <StickyCta
        primaryLabel="Find professionals"
        onPrimaryClick={actions.handleSubmit}
        primaryLoading={isLoading}
      />
    </form>
  );
};
