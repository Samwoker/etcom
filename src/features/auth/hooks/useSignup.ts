import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDemoStore } from '@/store/demoStore';
import { ROUTES } from '@/app/routes';
import type { TradeType } from '@/types';

export interface SignupFormData {
  fullName: string;
  phone: string;
  trade?: TradeType;
  agreedToTerms: boolean;
}

export interface SignupFormErrors {
  fullName?: string;
  phone?: string;
  trade?: string;
  agreedToTerms?: string;
}

export function useSignup() {
  const navigate = useNavigate();
  const role = useDemoStore((state) => state.role);
  const setPendingSignup = useDemoStore((state) => state.setPendingSignup);

  const [formData, setFormData] = useState<SignupFormData>({
    fullName: '',
    phone: '',
    trade: role === 'professional' ? 'Plumber' : undefined,
    agreedToTerms: false,
  });

  const [errors, setErrors] = useState<SignupFormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const setFullName = (fullName: string) => {
    setFormData((prev) => ({ ...prev, fullName }));
    if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: undefined }));
  };

  const setPhone = (rawPhone: string) => {
    // Only allow digits, max 9 digits
    const digitsOnly = rawPhone.replace(/\D/g, '').slice(0, 9);
    setFormData((prev) => ({ ...prev, phone: digitsOnly }));
    if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
  };

  const setTrade = (trade: TradeType) => {
    setFormData((prev) => ({ ...prev, trade }));
    if (errors.trade) setErrors((prev) => ({ ...prev, trade: undefined }));
  };

  const setAgreedToTerms = (agreedToTerms: boolean) => {
    setFormData((prev) => ({ ...prev, agreedToTerms }));
    if (errors.agreedToTerms) setErrors((prev) => ({ ...prev, agreedToTerms: undefined }));
  };

  const validate = (): boolean => {
    const newErrors: SignupFormErrors = {};

    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Please enter your full name';
    }

    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (formData.phone.length !== 9) {
      newErrors.phone = 'Enter a valid 9-digit number (e.g. 71 123 4567)';
    }

    if (role === 'professional' && !formData.trade) {
      newErrors.trade = 'Please select your primary trade category';
    }

    if (!formData.agreedToTerms) {
      newErrors.agreedToTerms = 'You must agree to the terms to proceed';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    // Simulate 500ms network request
    await new Promise((resolve) => setTimeout(resolve, 500));

    setPendingSignup({
      fullName: formData.fullName.trim(),
      phone: formData.phone,
      trade: formData.trade,
      role,
    });

    setIsLoading(false);
    navigate(ROUTES.AUTH_VERIFY_PHONE);
  };

  return {
    role,
    formData,
    errors,
    isLoading,
    actions: {
      setFullName,
      setPhone,
      setTrade,
      setAgreedToTerms,
      handleSubmit,
    },
  };
}
