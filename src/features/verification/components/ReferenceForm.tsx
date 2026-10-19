import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export const RELATIONSHIPS = [
  'Master Contractor',
  'Previous Client',
  'TVET Workshop Instructor',
  'Commercial Project Manager',
] as const;

interface ReferenceFormProps {
  name: string;
  onNameChange: (name: string) => void;
  phone: string;
  onPhoneChange: (phone: string) => void;
  relationship: string;
  onRelationshipChange: (rel: string) => void;
}

export const ReferenceForm: React.FC<ReferenceFormProps> = ({
  name,
  onNameChange,
  phone,
  onPhoneChange,
  relationship,
  onRelationshipChange,
}) => {
  return (
    <div className="space-y-3 pt-2 border-t border-border/60">
      <div className="space-y-0.5">
        <Label className="text-xs font-semibold text-foreground">
          Work Reference Referee <span className="text-[11px] text-muted-foreground font-normal">(Optional)</span>
        </Label>
        <p className="text-[11px] text-muted-foreground">
          A licensed contractor or past client our team can phone for verification.
        </p>
      </div>

      <div className="space-y-2.5">
        <div className="space-y-1">
          <span className="text-[11px] text-muted-foreground">Referee Full Name</span>
          <Input
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            placeholder="e.g. Eng. Girma Wolde"
            className="text-xs h-9 rounded-lg"
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1">
            <span className="text-[11px] text-muted-foreground">Referee Phone</span>
            <Input
              value={phone}
              onChange={(e) => onPhoneChange(e.target.value)}
              placeholder="+251 91 ••• ••••"
              className="text-xs h-9 rounded-lg"
            />
          </div>

          <div className="space-y-1">
            <span className="text-[11px] text-muted-foreground">Relationship</span>
            <Select value={relationship} onValueChange={onRelationshipChange}>
              <SelectTrigger className="w-full text-xs h-9 rounded-lg bg-card">
                <SelectValue placeholder="Relationship" />
              </SelectTrigger>
              <SelectContent>
                {RELATIONSHIPS.map((rel) => (
                  <SelectItem key={rel} value={rel} className="text-xs">
                    {rel}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};
