

import { useResumeStore } from '../../store/resume-store';
import { 
  SimpleList 
} from './ReusableComponents/SimpleList';
export default function LanguagesInterestsSocialForm() {
  const { resumeData, updateField } = useResumeStore();

  const updateList = (field, newList) => {
    updateField(field, newList);
  };

  return (
    <div className="space-y-6">
      <SimpleList
        title="Languages"
        items={resumeData.languages || []}
        onAdd={(val) => updateList('languages', [...(resumeData.languages || []), val])}
        onRemove={(idx) => updateList('languages', resumeData.languages.filter((_, i) => i !== idx))}
        placeholder="Add language"
      />
      <SimpleList
        title="Interests"
        items={resumeData.interests || []}
        onAdd={(val) => updateList('interests', [...(resumeData.interests || []), val])}
        onRemove={(idx) => updateList('interests', resumeData.interests.filter((_, i) => i !== idx))}
        placeholder="Add interest"
      />
      <SimpleList
        title="Social Clubs"
        items={resumeData.socialClubs || []}
        onAdd={(val) => updateList('socialClubs', [...(resumeData.socialClubs || []), val])}
        onRemove={(idx) => updateList('socialClubs', resumeData.socialClubs.filter((_, i) => i !== idx))}
        placeholder="Add social club"
      />
    </div>
  );
}
