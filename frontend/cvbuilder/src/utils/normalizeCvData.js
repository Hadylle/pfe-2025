export function normalizeCvData(cvData) {
  return {
    ...cvData,
    skills: (cvData.skills || []).map(skill =>
      typeof skill === 'string' ? { value: skill } : skill
    ),
    certifications: (cvData.certifications || []).map(cert =>
      typeof cert === 'string' ? JSON.parse(cert) : cert
    ),
    education: (cvData.education || []).map(e => ({ ...e })),
    experience: (cvData.experience || []).map(e => ({ ...e })),
    projects: (cvData.projects || []).map(p => ({ ...p })),
    languages: cvData.languages || [],
    interests: cvData.interests || [],
    socialClubs: cvData.socialClubs || [],
  };
}
