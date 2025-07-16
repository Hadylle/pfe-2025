import { create } from 'zustand';

export const useResumeStore = create((set) => ({
  resumeData: {
    name: '',
    email: '',
    phone: '',
    address: '',
    portfolio: '',
    linkedin: '',
    github: '',
    aboutMe: '',
    skills: [],
    experience: [],
    education: [],
    projects: [],
    certifications: [],
    languages: [],
    interests: [],
    socialClubs: []
  },

  selectedTemplate: 'classic',

  // ✅ Met à jour un champ simple (ex: name, email, etc.)
  updateField: (field, value) => set((state) => ({
    resumeData: { ...state.resumeData, [field]: value }
  })),

  // ✅ Ajoute un élément à un tableau
  addArrayItem: (arrayField, item) => set((state) => ({
    resumeData: {
      ...state.resumeData,
      [arrayField]: [...state.resumeData[arrayField], item]
    }
  })),

  // ✅ Met à jour un élément spécifique dans un tableau
  updateArrayItem: (arrayField, index, item) => set((state) => ({
    resumeData: {
      ...state.resumeData,
      [arrayField]: state.resumeData[arrayField].map((el, i) => (i === index ? item : el))
    }
  })),

  // ✅ Supprime un élément d’un tableau
  removeArrayItem: (arrayField, index) => set((state) => ({
    resumeData: {
      ...state.resumeData,
      [arrayField]: state.resumeData[arrayField].filter((_, i) => i !== index)
    }
  })),

  // ✅ Change le template
  setTemplate: (template) => set({ selectedTemplate: template }),

  // ✅ Nouveau : remplace tout resumeData depuis un JSON (ex: après analyse AI)
  setAllData: (data) => {
    const defaultData = {
      name: '',
      email: '',
      phone: '',
      address: '',
      portfolio: '',
      linkedin: '',
      github: '',
      aboutMe: '',
      skills: [],
      experience: [],
      education: [],
      projects: [],
      certifications: [],
      languages: [],
      interests: [],
      socialClubs: []
    };

    set({ resumeData: { ...defaultData, ...data } });
  }
}));
