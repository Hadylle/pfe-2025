import { useState } from 'react';
import robotAnimation from '../assets/robot.json';
import { SectionLayout } from '../components/layout/SectionLayout';
import { PageLayout} from '../components/layout/PageLayout';

import { Textarea } from '../components/ui/Input';
import { ErrorMessage } from '../components/ui/ErrorMessage';
import LottieHeader from '../components/features/LottieHeader';
import CVUploadForm from '../components/features/CVUploadForm';
import BuildResume from './build-resume';
import { tailorCv } from '../api/tailor-cv-api';
import { useProgress } from '../components/ProgressContext';
import { useResumeStore } from '../store/resume-store';
import { normalizeCvData } from '../utils/normalizeCvData';
export default function CvTailoringPage() {
  const [cvFile, setCvFile] = useState(null);
  const [jobText, setJobText] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showEditor, setShowEditor] = useState(false);

  const { start, complete, error } = useProgress();
  const { setAllData } = useResumeStore();

  const handleFileChange = (e) => setCvFile(e.target.files[0]);

  const handleTailorCv = async () => {
    if (!cvFile || !jobText.trim()) {
      alert('Please upload your CV and paste the job description.');
      return;
    }

    start('Tailoring your CV to match the job...');
    setErrorMessage('');
    setShowEditor(false);

    try {
      const tailoredJson = await tailorCv(cvFile, jobText);
setAllData(normalizeCvData(tailoredJson));
      complete();
      setShowEditor(true);
    } catch (err) {
      console.error('❌ Tailoring error:', err);
      setErrorMessage('Something went wrong while generating your tailored CV.');
      error();
    }
  };

  const additionalFormContent = (
    <Textarea
      label="Paste Job Description"
      placeholder="Enter job offer text here..."
      rows={5}
      value={jobText}
      onChange={(e) => setJobText(e.target.value)}
    />
  );

  return (
    <PageLayout containerType="full">
      {!showEditor ? (
        <>
          <SectionLayout>
            <LottieHeader
              animationData={robotAnimation}
              text="Upload your CV and job offer to generate a tailored version for better matching."
            />

            <CVUploadForm
              onFileChange={handleFileChange}
              onSubmit={handleTailorCv}
              buttonLabel="🎯 Tailor My CV"
              buttonColor="#0091e3"
              buttonHover="#0c549f"
            >
              {additionalFormContent}
            </CVUploadForm>
          </SectionLayout>

          {errorMessage && (
            <ErrorMessage
              message={errorMessage}
              onRetry={() => setErrorMessage('')}
              retryLabel="Clear Error"
            />
          )}
        </>
      ) : (
        <div className="mt-12 w-full">
          <BuildResume mode="edit-after-tailor" />
        </div>
      )}
    </PageLayout>
  );
}