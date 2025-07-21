import { create } from 'zustand';

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

export const useResumeStore = create((set) => ({
  resumeData: { ...defaultData },

  selectedTemplate: 'classic',

  updateField: (field, value) => set((state) => ({
    resumeData: { ...state.resumeData, [field]: value }
  })),

  addArrayItem: (arrayField, item) => set((state) => ({
    resumeData: {
      ...state.resumeData,
      [arrayField]: [...state.resumeData[arrayField], item]
    }
  })),

  updateArrayItem: (arrayField, index, item) => set((state) => ({
    resumeData: {
      ...state.resumeData,
      [arrayField]: state.resumeData[arrayField].map((el, i) => (i === index ? item : el))
    }
  })),

  removeArrayItem: (arrayField, index) => set((state) => ({
    resumeData: {
      ...state.resumeData,
      [arrayField]: state.resumeData[arrayField].filter((_, i) => i !== index)
    }
  })),

  setTemplate: (template) => set({ selectedTemplate: template }),

  // 🧠 Better: uses reusable defaultData
  setAllData: (data) => {
    set({ resumeData: { ...defaultData, ...data } });
  }
}));
