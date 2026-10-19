import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface LineItemInputProps {
  laborETB: number;
  onLaborChange: (val: number) => void;
  materialsETB: number;
  onMaterialsChange: (val: number) => void;
}

export const LineItemInput: React.FC<LineItemInputProps> = ({
  laborETB,
  onLaborChange,
  materialsETB,
  onMaterialsChange,
}) => {
  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="space-y-1.5">
        <Label htmlFor="labor-amount" className="text-xs font-semibold text-foreground">
          Labor (ETB) <span className="text-destructive">*</span>
        </Label>
        <Input
          id="labor-amount"
          type="number"
          min={0}
          value={laborETB || ''}
          onChange={(e) => onLaborChange(Math.max(0, parseInt(e.target.value) || 0))}
          placeholder="e.g. 1200"
          className="text-xs h-10 rounded-xl font-mono"
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="materials-amount" className="text-xs font-semibold text-foreground">
          Estimated Parts (ETB)
        </Label>
        <Input
          id="materials-amount"
          type="number"
          min={0}
          value={materialsETB || ''}
          onChange={(e) => onMaterialsChange(Math.max(0, parseInt(e.target.value) || 0))}
          placeholder="e.g. 450"
          className="text-xs h-10 rounded-xl font-mono"
        />
      </div>
    </div>
  );
};
