import { useState } from 'react';
import { useDemoStore } from '@/store/demoStore';
import type { TradeType, SubCity } from '@/types';

export function useOnboarding() {
  const { pendingSignup, saveProOnboarding } = useDemoStore();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [fullName, setFullName] = useState<string>(pendingSignup?.fullName || 'Tewodros Kassahun');
  const [trade, setTrade] = useState<TradeType>(pendingSignup?.trade || 'Plumber');
  const [subCity, setSubCity] = useState<SubCity>('Bole');
  const [experienceYears, setExperienceYears] = useState<number>(4);
  const [bio, setBio] = useState<string>(
    'Experienced tradesperson providing reliable home installation and maintenance services across Addis Ababa.'
  );
  const [avatarUrl, setAvatarUrl] = useState<string>(
    'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=150'
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isStep1Valid = fullName.trim().length >= 2 && Boolean(trade);
  const isStep2Valid = experienceYears >= 0 && bio.trim().length >= 10;

  const nextStep = () => {
    if (step === 1 && isStep1Valid) setStep(2);
    else if (step === 2 && isStep2Valid) setStep(3);
  };

  const prevStep = () => {
    if (step > 1) {
      setStep((prev) => (prev - 1) as 1 | 2 | 3);
    }
  };

  const finishOnboarding = async () => {
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 350));
      const proId = saveProOnboarding({
        fullName,
        trade,
        subCity,
        experienceYears,
        bio,
        avatarUrl,
      });
      return proId;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    data: {
      step,
      fullName,
      trade,
      subCity,
      experienceYears,
      bio,
      avatarUrl,
      isStep1Valid,
      isStep2Valid,
    },
    isSubmitting,
    actions: {
      setFullName,
      setTrade,
      setSubCity,
      setExperienceYears,
      setBio,
      setAvatarUrl,
      nextStep,
      prevStep,
      finishOnboarding,
    },
  };
}
