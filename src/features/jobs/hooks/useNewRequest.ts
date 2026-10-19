import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDemoStore } from '@/store/demoStore';
import { ROUTES } from '@/app/routes';
import type { DraftRequest, UrgencyOption, VerificationPreferenceOption } from '@/types';

export function useNewRequest() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { draftRequest, setDraftRequest } = useDemoStore();

  const initialCategory =
    searchParams.get('category') || draftRequest?.category || 'Plumbing';

  const [formData, setFormData] = useState<DraftRequest>({
    category: initialCategory,
    description: draftRequest?.description || 'My shower is leaking and the tap is hard to turn',
    photos: draftRequest?.photos || [],
    subCity: draftRequest?.subCity || 'Bole',
    urgency: draftRequest?.urgency || 'today',
    verificationPreference: draftRequest?.verificationPreference || 'verified_skills',
  });

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Sync category if query param changes
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat && cat !== formData.category) {
      setFormData((prev) => ({ ...prev, category: cat }));
    }
  }, [searchParams, formData.category]);

  // Persist draft to demoStore on changes
  const updateField = <K extends keyof DraftRequest>(field: K, value: DraftRequest[K]) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value };
      setDraftRequest(updated);
      return updated;
    });
    if (field === 'description' && error) setError(null);
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!formData.description.trim()) {
      setError('Please provide a short description of the problem');
      return;
    }

    setIsLoading(true);
    setDraftRequest(formData);

    // Simulate matching engine calculation
    await new Promise((resolve) => setTimeout(resolve, 350));
    setIsLoading(false);
    navigate(ROUTES.CUSTOMER_RESULTS);
  };

  return {
    formData,
    error,
    isLoading,
    actions: {
      setCategory: (category: string) => updateField('category', category),
      setDescription: (description: string) => updateField('description', description),
      setPhotos: (photos: string[]) => updateField('photos', photos),
      setSubCity: (subCity: string) => updateField('subCity', subCity),
      setUrgency: (urgency: UrgencyOption) => updateField('urgency', urgency),
      setVerificationPreference: (verificationPreference: VerificationPreferenceOption) =>
        updateField('verificationPreference', verificationPreference),
      handleSubmit,
    },
  };
}
