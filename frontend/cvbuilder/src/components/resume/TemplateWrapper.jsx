import { useResumeStore } from '../../store/resume-store';
import ModernTemplate from './templates/modern';
import ClassicTemplate from './templates/classic';
import BoldTemplate from './templates/BoldTemplate';
import CleanTemplate from './templates/CleanTemplate';
const TemplateWrapper = ({ data }) => {
  const { selectedTemplate, selectedLanguage, selectedColorScheme } = useResumeStore();

  const TemplateComponent =
    selectedTemplate === 'modern'
      ? ModernTemplate
      : selectedTemplate === 'bold'
      ? BoldTemplate
        : selectedTemplate === 'clean' ? CleanTemplate
      : ClassicTemplate;

  return (
    <div className="space-y-4">
      <TemplateComponent
        data={data}
        language={selectedLanguage}
        colorScheme={selectedColorScheme}
      />
    </div>
  );
};

export default TemplateWrapper;
