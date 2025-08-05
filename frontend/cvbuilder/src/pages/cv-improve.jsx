
import { useState } from 'react';
import robotAnimation from '../assets/robot.json';
import { PageLayout } from '../components/layout/PageLayout';
import { SectionLayout } from '../components/layout/SectionLayout';

import LottieHeader from '../components/features/LottieHeader';
import CVUploadForm from '../components/features/CVUploadForm';
import BuildResume from './build-resume';
import { useResumeStore } from '../store/resume-store';
import { improveCvAndGeneratePdf } from '../api/cv-improve-api';
import { useProgress } from '../components/ProgressContext';
import { useMutation } from '@tanstack/react-query';
import { normalizeCvData } from '../utils/normalizeCvData';

export default function CvImprovePage() {
  const [cvFile, setCvFile] = useState(null);
  const [resumeGenerated, setResumeGenerated] = useState(false);
  
  const { setAllData } = useResumeStore();
  const { start, complete, error } = useProgress();

  const mutation = useMutation({
    mutationFn: improveCvAndGeneratePdf,
    onMutate: () => {
      start('Improving your CV...');
    },
    onSuccess: (data) => {
      const { improvedPdf, improvedJson } = data;
setAllData(normalizeCvData(improvedJson));
      const blobUrl = URL.createObjectURL(improvedPdf);
      complete();
      setResumeGenerated(true);
    },
    onError: (err) => {
      console.error(err);
      error();
      alert('Something went wrong while improving your CV.');
    },
  });

  const handleFileChange = (e) => setCvFile(e.target.files[0]);

  const handleImprove = () => {
    if (!cvFile) {
      alert('Please upload a CV file.');
      return;
    }
    mutation.mutate(cvFile);
  };

  return (
    <PageLayout containerType="full">
      {!resumeGenerated ? (
        <SectionLayout>
          <LottieHeader
            animationData={robotAnimation}
            text="Upload your CV and let me help you improve it!"
          />
          <CVUploadForm
            onFileChange={handleFileChange}
            onSubmit={handleImprove}
            buttonLabel="✨ Improve CV"
            loading={mutation.isPending}
          />
        </SectionLayout>
      ) : (
        <div className="mt-12">
          <BuildResume mode="edit-after-improve" />
        </div>
      )}
    </PageLayout>
  );
}