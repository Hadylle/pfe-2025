import { useResumeStore } from '../../store/resume-store';
import { languages } from './languages';
import ModernTemplate from './templates/modern';
import ClassicTemplate from './templates/classic';
import { colorPalettes } from './colorPalette';

const TemplateWrapper = ({ data }) => {
  const {
    selectedTemplate,
    selectedLanguage,
    selectedColorScheme,
    setSelectedLanguage,
    setSelectedColorScheme,
  } = useResumeStore();

  const TemplateComponent = selectedTemplate === 'modern' ? ModernTemplate : ClassicTemplate;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4 p-3 bg-gray-50 rounded-lg">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
          <select 
            value={selectedLanguage} 
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="p-2 border rounded-md text-sm w-full"
          >
            {Object.keys(languages).map((lang) => (
              <option key={lang} value={lang}>
                {languages[lang].languageName || lang.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Color Scheme</label>
          <select
            value={selectedColorScheme}
            onChange={(e) => setSelectedColorScheme(e.target.value)}
            className="p-2 border rounded-md text-sm w-full"
          >
            {Object.keys(colorPalettes).map((scheme) => (
              <option key={scheme} value={scheme}>
                {scheme.charAt(0).toUpperCase() + scheme.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <TemplateComponent 
        data={data} 
        language={selectedLanguage} 
        colorScheme={selectedColorScheme} 
      />
    </div>
  );
};

export default TemplateWrapper;
