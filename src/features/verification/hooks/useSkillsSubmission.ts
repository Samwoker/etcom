import { useState } from 'react';
import { useDemoStore } from '@/store/demoStore';
import type { EvidenceRoute } from '../components/EvidenceRoutePicker';

export function useSkillsSubmission() {
  const { currentUserId, professionals, submitSkillsEvidence } = useDemoStore();
  const pro = professionals.find((p) => p.id === currentUserId) || professionals[0];

  const [route, setRoute] = useState<EvidenceRoute>('upload');
  const [files, setFiles] = useState<string[]>(['tvet_plumbing_diploma.pdf']);
  const [refereeName, setRefereeName] = useState<string>('Eng. Girma Wolde');
  const [refereePhone, setRefereePhone] = useState<string>('+251 71 234 5678');
  const [refereeRelationship, setRefereeRelationship] = useState<string>('Master Contractor');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addFile = (fileName: string) => {
    if (!files.includes(fileName)) {
      setFiles((prev) => [...prev, fileName]);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const submitSkills = async () => {
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 350));
      submitSkillsEvidence(pro.id, route, {
        refereeName,
        refereePhone,
        refereeRelationship,
        files,
      });
      return true;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    data: {
      pro,
      route,
      files,
      refereeName,
      refereePhone,
      refereeRelationship,
    },
    isSubmitting,
    actions: {
      setRoute,
      addFile,
      removeFile,
      setRefereeName,
      setRefereePhone,
      setRefereeRelationship,
      submitSkills,
    },
  };
}
