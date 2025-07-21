import { useResumeStore } from '../../../store/resume-store';
import PhotoComponent from '../PhotoComponent';

export const BaseTemplate = ({ 
  children,
  colorPalette = {
    primary: 'blue',
    secondary: 'gray',
    accent: 'blue',
    text: 'gray',
    border: 'gray'
  },
  sectionHeaders = {
    aboutMe: 'About Me',
    experience: 'Experience',
    education: 'Education',
    skills: 'Skills',
    projects: 'Projects',
    certifications: 'Certifications',
    languages: 'Languages',
    interests: 'Interests',
    socialClubs: 'Social Clubs',
    expertise: 'Expertise'
  },
  layout = 'single-column' // 'single-column' or 'two-column'
}) => {
  const { resumeData } = useResumeStore();

  // Color mapping for Tailwind classes
  const getColor = (type) => {
    const colorMap = {
      primary: {
        text: `text-${colorPalette.primary}-700`,
        border: `border-${colorPalette.primary}-700`,
        bg: `bg-${colorPalette.primary}-100`
      },
      secondary: {
        text: `text-${colorPalette.secondary}-600`,
        border: `border-${colorPalette.secondary}-600`,
        bg: `bg-${colorPalette.secondary}-100`
      },
      accent: {
        text: `text-${colorPalette.accent}-800`,
        border: `border-${colorPalette.accent}-500`,
        bg: `bg-${colorPalette.accent}-100`
      }
    };

    switch(type) {
      case 'header':
        return `${colorMap.primary.text} ${colorMap.primary.border}`;
      case 'section-header':
        return `${colorMap.primary.text} ${colorMap.primary.border}`;
      case 'sub-header':
        return colorMap.secondary.text;
      case 'accent':
        return `${colorMap.accent.bg} ${colorMap.accent.text}`;
      default:
        return '';
    }
  };

  // Common header component
  const renderHeader = () => (
    <div className={`flex flex-col md:flex-row gap-6 items-center md:items-start border-b-2 ${getColor('header')} pb-4 mb-6`}>
      <PhotoComponent photo={resumeData?.photo} name={resumeData?.name} />
      
      <div className="flex-1">
        <h1 className="text-3xl font-bold">{resumeData.name || "Your Name"}</h1>
        {resumeData.role && <h2 className={`text-xl ${getColor('sub-header')}`}>{resumeData.role}</h2>}

        <div className="flex flex-wrap gap-x-4 gap-y-2 mt-2 text-sm">
          {resumeData.email && (
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              {resumeData.email}
            </div>
          )}
          
          {resumeData.phone && (
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
              </svg>
              {resumeData.phone}
            </div>
          )}
          
          {resumeData.linkedin && (
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
              {resumeData.linkedin.replace('https://', '')}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Common section component
  const renderSection = (title, content, options = {}) => {
    const { className = '', isTwoColumn = false } = options;
    
    return (
      <section className={`mb-6 ${className}`}>
        <h2 className={`text-xl font-semibold border-b ${getColor('section-header')} pb-1 mb-2`}>
          {sectionHeaders[title.toLowerCase()] || title}
        </h2>
        {isTwoColumn ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {content}
          </div>
        ) : content}
      </section>
    );
  };

  // Common list item component
  const renderListItem = (items, isSkills = false) => {
    if (isSkills) {
      return (
        <ul className="flex flex-wrap gap-2">
          {items.map((item, i) => (
            <li key={i} className={`px-2 py-1 rounded text-sm ${getColor('accent')}`}>
              {typeof item === 'object' ? item.value : item}
            </li>
          ))}
        </ul>
      );
    }
    
    return (
      <ul className="list-disc pl-5 space-y-1">
        {items.map((item, i) => (
          <li key={i} className={`text-${colorPalette.text}-700`}>
            {typeof item === 'object' ? item.value : item}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className={`font-sans text-${colorPalette.text}-800 max-w-4xl mx-auto p-6`}>
      {children({
        resumeData,
        getColor,
        sectionHeaders,
        renderHeader,
        renderSection,
        renderListItem,
        layout
      })}
    </div>
  );
};