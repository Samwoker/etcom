import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PageHeader } from '@/components/shared/PageHeader';
import { StickyCta } from '@/components/shared/StickyCta';
import {
  OnboardingSteps,
  ServiceCategoryPicker,
  ExperienceField,
  useOnboarding,
} from '@/features/verification';
import { ROUTES } from '@/app/routes';
import { readFileAsDataUrl } from '@/lib/fileUtils';
import type { TradeType } from '@/types';

export const OnboardingPage: React.FC = () => {
  const navigate = useNavigate();
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const { data, isSubmitting, actions } = useOnboarding();
  const {
    step,
    fullName,
    trade,
    subCity,
    experienceYears,
    bio,
    avatarUrl,
    isStep1Valid,
    isStep2Valid,
  } = data;

  const handleNext = async () => {
    if (step < 3) {
      actions.nextStep();
    } else {
      await actions.finishOnboarding();
      navigate(ROUTES.PRO_VERIFY_IDENTITY);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      actions.prevStep();
    } else {
      navigate(ROUTES.AUTH_WELCOME);
    }
  };

  const handleAvatarFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const dataUrl = await readFileAsDataUrl(file);
      actions.setAvatarUrl(dataUrl);
    } catch {
      // Fallback
    }
    if (avatarInputRef.current) avatarInputRef.current.value = '';
  };

  const handleFillStep1Sample = () => {
    actions.setFullName('Yonas Tadesse');
    actions.setTrade('Electrician');
    actions.setSubCity('Bole');
  };

  const handleFillStep2Sample = () => {
    actions.setExperienceYears(6);
    actions.setBio(
      'Specialized in residential electrical installations, distribution boards, circuit breakers, and inverter backup systems across Addis Ababa.'
    );
  };

  return (
    <div className="flex flex-1 flex-col pb-28">
      <PageHeader
        title="Professional Profile"
        subtitle="Step-by-step registration for skilled trades"
        showBack
        onBack={handleBack}
      />

      <div className="w-full max-w-xl md:max-w-2xl mx-auto px-4 py-4 space-y-4">
        <OnboardingSteps currentStep={step} />

        {/* Step 1: Profile & Trade */}
        {step === 1 && (
          <Card className="border-border shadow-xs">
            <CardContent className="p-4 space-y-4">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="pro-name" className="text-xs font-semibold text-foreground">
                    Full Legal Name <span className="text-destructive">*</span>
                  </Label>
                  <button
                    type="button"
                    onClick={handleFillStep1Sample}
                    className="inline-flex items-center gap-1 text-[11px] text-primary hover:underline cursor-pointer"
                  >
                    <Sparkles className="h-3 w-3" />
                    <span>Quick fill sample</span>
                  </button>
                </div>
                <Input
                  id="pro-name"
                  value={fullName}
                  onChange={(e) => actions.setFullName(e.target.value)}
                  placeholder="e.g. Abebe Bikila"
                  className="text-xs h-10 rounded-xl"
                />
              </div>

              <ServiceCategoryPicker
                selectedTrade={trade}
                onTradeChange={(t) => actions.setTrade(t as TradeType)}
                selectedSubCity={subCity}
                onSubCityChange={actions.setSubCity}
              />
            </CardContent>
          </Card>
        )}

        {/* Step 2: Experience & Bio */}
        {step === 2 && (
          <Card className="border-border shadow-xs">
            <CardContent className="p-4 space-y-2">
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleFillStep2Sample}
                  className="inline-flex items-center gap-1 text-[11px] text-primary hover:underline cursor-pointer"
                >
                  <Sparkles className="h-3 w-3" />
                  <span>Quick fill sample bio</span>
                </button>
              </div>
              <ExperienceField
                years={experienceYears}
                onYearsChange={actions.setExperienceYears}
                bio={bio}
                onBioChange={actions.setBio}
              />
            </CardContent>
          </Card>
        )}

        {/* Step 3: Photo & Summary Review */}
        {step === 3 && (
          <Card className="border-border shadow-xs">
            <CardContent className="p-4 space-y-4">
              <input
                ref={avatarInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarFile}
              />

              <div className="flex flex-col items-center text-center space-y-2">
                <div className="relative">
                  <Avatar className="h-20 w-20 border-2 border-primary/30">
                    <AvatarImage src={avatarUrl} alt={fullName} />
                    <AvatarFallback className="font-bold text-lg bg-muted">
                      {fullName.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <button
                    type="button"
                    onClick={() => avatarInputRef.current?.click()}
                    className="absolute bottom-0 right-0 p-1.5 bg-primary text-primary-foreground rounded-full shadow-md cursor-pointer hover:bg-primary/90 transition-transform active:scale-95"
                    aria-label="Upload photo from device"
                    title="Upload photo from device"
                  >
                    <Camera className="h-3.5 w-3.5" />
                  </button>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground">{fullName}</h3>
                  <p className="text-xs text-muted-foreground">{trade} • {subCity} Sub-City</p>
                  <button
                    type="button"
                    onClick={() => avatarInputRef.current?.click()}
                    className="mt-1 text-[11px] text-primary font-medium hover:underline cursor-pointer"
                  >
                    Tap camera to upload custom photo
                  </button>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-border/60 text-xs">
                <div className="flex justify-between py-1 border-b border-border/40">
                  <span className="text-muted-foreground">Self-reported experience</span>
                  <span className="font-semibold">{experienceYears} years</span>
                </div>
                <div className="flex justify-between py-1 border-b border-border/40">
                  <span className="text-muted-foreground">Listing status</span>
                  <span className="font-semibold text-primary">In progress</span>
                </div>
                <div className="space-y-1 pt-1">
                  <span className="text-muted-foreground block">Professional bio</span>
                  <p className="text-[11px] text-foreground leading-relaxed bg-muted/30 p-2.5 rounded-lg border border-border/40">
                    {bio}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <StickyCta
        primaryLabel={step === 3 ? 'Complete & Verify Identity' : 'Continue'}
        primaryDisabled={
          (step === 1 && !isStep1Valid) ||
          (step === 2 && !isStep2Valid) ||
          isSubmitting
        }
        primaryLoading={isSubmitting}
        onPrimaryClick={handleNext}
      />
    </div>
  );
};
