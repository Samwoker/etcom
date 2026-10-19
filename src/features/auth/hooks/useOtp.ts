import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useDemoStore } from '@/store/demoStore';
import { ROUTES } from '@/app/routes';

export function useOtp() {
  const navigate = useNavigate();
  const { pendingSignup, role, completePhoneVerification } = useDemoStore();

  const [otp, setOtp] = useState('');
  const [countdown, setCountdown] = useState(30);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 30s Countdown timer
  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  // Masked phone calculation
  const getMaskedPhone = (): string => {
    const raw = pendingSignup?.phone || '711234567';
    const digits = raw.replace(/\D/g, '');
    if (digits.length >= 9) {
      const start = digits.slice(0, 2);
      const end = digits.slice(-2);
      return `+251 ${start} ••• ••${end}`;
    }
    return '+251 71 ••• ••45';
  };

  const handleOtpChange = (value: string) => {
    setOtp(value);
    if (error) setError(null);
  };

  const resendCode = () => {
    if (countdown > 0) return;
    setCountdown(30);
    setOtp('');
    setError(null);
    toast.info('New 6-digit verification code sent');
  };

  const handleVerify = async () => {
    if (otp.length !== 6) {
      setError('Please enter the full 6-digit verification code');
      return;
    }

    setIsLoading(true);
    // Simulate verification delay
    await new Promise((resolve) => setTimeout(resolve, 400));

    const result = completePhoneVerification();
    setIsLoading(false);
    toast.success('Phone verified successfully');

    if (result.role === 'professional') {
      navigate(ROUTES.PRO_ONBOARDING);
    } else if (result.role === 'admin') {
      navigate(ROUTES.ADMIN_QUEUE);
    } else {
      navigate(ROUTES.CUSTOMER_HOME);
    }
  };

  return {
    otp,
    countdown,
    isLoading,
    error,
    maskedPhone: getMaskedPhone(),
    role,
    actions: {
      handleOtpChange,
      resendCode,
      handleVerify,
    },
  };
}
