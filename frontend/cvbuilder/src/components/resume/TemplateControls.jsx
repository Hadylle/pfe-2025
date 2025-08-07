import React from 'react';
import { useResumeStore } from '../../store/resume-store';
import { languages } from './languages';
import { colorPalettes } from './colorPalette';

const TemplateControls = () => {
  const {
    selectedLanguage,
    selectedColorScheme,
    setSelectedLanguage,
    setSelectedColorScheme,
  } = useResumeStore();

  return (
    <div className="flex flex-wrap gap-4 p-3 bg-gray-50 rounded-lg mb-6">
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
  );
};

export default TemplateControls;
