import { useState } from 'react';
import { useDemoStore } from '@/store/demoStore';

export function useIdentitySubmission() {
  const { currentUserId, professionals, submitProIdentity } = useDemoStore();
  const pro = professionals.find((p) => p.id === currentUserId) || professionals[0];

  const [idType, setIdType] = useState<string>('Kebele ID');
  const [frontFile, setFrontFile] = useState<string | null>('kebele_id_front.jpg');
  const [backFile, setBackFile] = useState<string | null>('kebele_id_back.jpg');
  const [selfieFile, setSelfieFile] = useState<string | null>('pro_face_selfie.jpg');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isValid = Boolean(idType && frontFile && selfieFile);

  const submitIdentity = async () => {
    if (!isValid) return false;
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 350));
      submitProIdentity(pro.id, {
        idType,
        frontFile: frontFile!,
        backFile: backFile || '',
        selfieFile: selfieFile!,
      });
      return true;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    data: {
      pro,
      idType,
      frontFile,
      backFile,
      selfieFile,
      isValid,
    },
    isSubmitting,
    actions: {
      setIdType,
      setFrontFile,
      setBackFile,
      setSelfieFile,
      submitIdentity,
    },
  };
}
