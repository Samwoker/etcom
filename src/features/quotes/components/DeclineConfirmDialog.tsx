import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface DeclineConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirmDecline: () => void;
  isSubmitting?: boolean;
}

export const DeclineConfirmDialog: React.FC<DeclineConfirmDialogProps> = ({
  open,
  onOpenChange,
  onConfirmDecline,
  isSubmitting = false,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-base font-semibold">Decline this price offer?</DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground pt-1">
            Are you sure you want to decline this price offer? You will return to browse other professionals.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex-row gap-2 pt-2">
          <Button
            type="button"
            variant="outline"
            disabled={isSubmitting}
            onClick={() => onOpenChange(false)}
            className="flex-1 h-10 rounded-full text-xs"
          >
            Keep offer
          </Button>
          <Button
            type="button"
            variant="destructive"
            disabled={isSubmitting}
            onClick={onConfirmDecline}
            className="flex-1 h-10 rounded-full text-xs"
          >
            {isSubmitting ? 'Declining...' : 'Yes, decline offer'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
