import React from 'react';
import { Sparkles } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { StickyCta } from '@/components/shared/StickyCta';
import { TradeSelect } from './TradeSelect';
import { useSignup } from '../hooks/useSignup';

export const SignupForm: React.FC = () => {
  const { role, formData, errors, isLoading, actions } = useSignup();

  const handleFillSample = () => {
    actions.setFullName(role === 'professional' ? 'Yonas Tadesse' : 'Kalkidan Bekele');
    actions.setPhone('711234567');
    if (role === 'professional' && !formData.trade) {
      actions.setTrade('Plumber');
    }
    actions.setAgreedToTerms(true);
  };

  return (
    <form onSubmit={actions.handleSubmit} className="flex flex-1 flex-col justify-between">
      <div className="space-y-4 pt-2">
        {/* Full Name Field */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="fullName" className="text-sm font-medium text-foreground">
              Full Name
            </Label>
            <button
              type="button"
              onClick={handleFillSample}
              className="inline-flex items-center gap-1 text-[11px] text-primary hover:underline cursor-pointer"
            >
              <Sparkles className="h-3 w-3" />
              <span>Quick fill sample</span>
            </button>
          </div>
          <Input
            id="fullName"
            placeholder="e.g. Dawit Yohannes"
            value={formData.fullName}
            onChange={(e) => actions.setFullName(e.target.value)}
            className={`h-11 rounded-lg ${errors.fullName ? 'border-destructive focus-visible:ring-destructive/30' : ''}`}
            aria-invalid={Boolean(errors.fullName)}
          />
          {errors.fullName && (
            <p className="text-xs text-destructive">{errors.fullName}</p>
          )}
        </div>

        {/* Phone Number Field */}
        <div className="space-y-1.5">
          <Label htmlFor="phone" className="text-sm font-medium text-foreground">
            Phone Number
          </Label>
          <div className="flex items-center gap-2">
            <div className="flex h-11 items-center justify-center rounded-lg border border-border bg-muted/60 px-3 text-sm font-semibold text-foreground shrink-0 select-none">
              +251
            </div>
            <Input
              id="phone"
              type="tel"
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder="7X XXX XXXX"
              value={formData.phone}
              onChange={(e) => actions.setPhone(e.target.value)}
              className={`h-11 rounded-lg flex-1 font-mono tracking-wider ${
                errors.phone ? 'border-destructive focus-visible:ring-destructive/30' : ''
              }`}
              maxLength={9}
              aria-invalid={Boolean(errors.phone)}
            />
          </div>
          {errors.phone ? (
            <p className="text-xs text-destructive">{errors.phone}</p>
          ) : (
            <p className="text-xs text-muted-foreground">
              We'll send an M-PESA registration verification code
            </p>
          )}
        </div>

        {/* Trade Category Selection for Professionals */}
        {role === 'professional' && (
          <TradeSelect
            value={formData.trade}
            onChange={actions.setTrade}
            error={errors.trade}
          />
        )}

        {/* Agreement Checkbox */}
        <div className="pt-2">
          <div className="flex items-start gap-3">
            <Checkbox
              id="terms"
              checked={formData.agreedToTerms}
              onCheckedChange={(checked) => actions.setAgreedToTerms(Boolean(checked))}
              className="mt-0.5"
            />
            <Label htmlFor="terms" className="text-xs leading-relaxed text-muted-foreground cursor-pointer font-normal">
              I agree to the <span className="font-medium text-foreground underline underline-offset-2">Terms of Service</span> and acknowledge that Etcom verified ratings require proof of work.
            </Label>
          </div>
          {errors.agreedToTerms && (
            <p className="text-xs text-destructive mt-1.5">{errors.agreedToTerms}</p>
          )}
        </div>
      </div>

      {/* Sticky Bottom CTA */}
      <StickyCta
        primaryLabel="Send code"
        onPrimaryClick={actions.handleSubmit}
        primaryLoading={isLoading}
      />
    </form>
  );
};
