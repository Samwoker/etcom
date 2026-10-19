import React, { useState } from 'react';
import { Smartphone } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface MpesaPhoneInputProps {
  initialPhone: string;
  onPay: (phone: string) => void;
  isLoading?: boolean;
}

export const MpesaPhoneInput: React.FC<MpesaPhoneInputProps> = ({
  initialPhone,
  onPay,
  isLoading = false,
}) => {
  // Strip +251 prefix if present for clean 9-digit editing
  const cleanInitial = initialPhone.replace(/^\+251\s?/, '').replace(/\s+/g, '');
  const [phone, setPhone] = useState(cleanInitial || '911234567');
  const [error, setError] = useState('');

  const handlePhoneChange = (val: string) => {
    const digits = val.replace(/\D/g, '').slice(0, 9);
    setPhone(digits);
    if (digits.length > 0 && digits.length < 9) {
      setError('Please enter a 9-digit mobile number');
    } else {
      setError('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length !== 9) {
      setError('Please enter a valid 9-digit mobile number');
      return;
    }
    onPay(`+251 ${phone}`);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="mpesa-phone" className="text-xs font-semibold text-foreground">
          M-PESA Phone Number
        </Label>
        <div className="relative flex items-center">
          <span className="absolute left-3 text-xs font-medium text-muted-foreground select-none">
            +251
          </span>
          <Input
            id="mpesa-phone"
            type="tel"
            inputMode="numeric"
            value={phone}
            onChange={(e) => handlePhoneChange(e.target.value)}
            placeholder="9X XXX XXXX"
            className="pl-13 h-11 text-sm font-semibold rounded-xl bg-card border-border"
            disabled={isLoading}
            required
          />
        </div>
        {error ? (
          <p className="text-[11px] text-destructive">{error}</p>
        ) : (
          <p className="text-[11px] text-muted-foreground">
            A prompt will appear on this phone number requesting your M-PESA PIN.
          </p>
        )}
      </div>

      <Button
        type="submit"
        disabled={phone.length !== 9 || isLoading}
        className="w-full h-12 rounded-full font-semibold text-sm bg-primary text-primary-foreground hover:bg-emerald-600 gap-2 shadow-sm"
      >
        <Smartphone className="h-4 w-4" />
        <span>{isLoading ? 'Sending prompt...' : 'Pay with M-PESA'}</span>
      </Button>
    </form>
  );
};
