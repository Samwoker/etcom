import React from 'react';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { Button } from '@/components/ui/button';
import { StickyCta } from '@/components/shared/StickyCta';
import { useOtp } from '../hooks/useOtp';

export const OtpForm: React.FC = () => {
  const { otp, countdown, isLoading, error, maskedPhone, actions } = useOtp();

  return (
    <div className="flex flex-1 flex-col justify-between">
      <div className="flex flex-col items-center text-center pt-2 md:pt-4">
        <h2 className="text-xl md:text-2xl font-bold text-foreground">
          Enter the 6-digit code
        </h2>
        <p className="mt-1.5 text-xs md:text-sm text-muted-foreground">
          We sent a code to <span className="font-semibold text-foreground">{maskedPhone}</span>
        </p>

        {/* 6-Slot OTP Input */}
        <div className="mt-8 flex flex-col items-center">
          <InputOTP
            maxLength={6}
            value={otp}
            onChange={actions.handleOtpChange}
            autoFocus
          >
            <InputOTPGroup className="gap-2 sm:gap-2.5">
              <InputOTPSlot index={0} className="h-12 w-11 md:h-14 md:w-13 text-lg font-bold rounded-xl border border-input bg-card shadow-sm" />
              <InputOTPSlot index={1} className="h-12 w-11 md:h-14 md:w-13 text-lg font-bold rounded-xl border border-input bg-card shadow-sm" />
              <InputOTPSlot index={2} className="h-12 w-11 md:h-14 md:w-13 text-lg font-bold rounded-xl border border-input bg-card shadow-sm" />
              <InputOTPSlot index={3} className="h-12 w-11 md:h-14 md:w-13 text-lg font-bold rounded-xl border border-input bg-card shadow-sm" />
              <InputOTPSlot index={4} className="h-12 w-11 md:h-14 md:w-13 text-lg font-bold rounded-xl border border-input bg-card shadow-sm" />
              <InputOTPSlot index={5} className="h-12 w-11 md:h-14 md:w-13 text-lg font-bold rounded-xl border border-input bg-card shadow-sm" />
            </InputOTPGroup>
          </InputOTP>

          {error && (
            <p className="mt-3 text-xs text-destructive font-medium">{error}</p>
          )}

          {/* Resend Link & Auto-fill demo helper */}
          <div className="mt-6 flex flex-col items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => actions.handleOtpChange('123456')}
              className="inline-flex items-center gap-1 text-xs text-primary font-medium hover:underline cursor-pointer"
            >
              <span>Auto-fill demo code (123456)</span>
            </button>
            {countdown > 0 ? (
              <p className="text-xs text-muted-foreground">
                Resend code in <span className="font-semibold text-foreground font-mono">{countdown}s</span>
              </p>
            ) : (
              <Button
                variant="link"
                className="h-auto p-0 text-xs font-semibold text-primary hover:text-emerald-700 underline underline-offset-4"
                onClick={actions.resendCode}
              >
                Didn't receive code? Resend
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Sticky Bottom CTA */}
      <StickyCta
        primaryLabel="Verify"
        onPrimaryClick={actions.handleVerify}
        primaryDisabled={otp.length !== 6}
        primaryLoading={isLoading}
      />
    </div>
  );
};
