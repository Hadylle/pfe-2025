// components/resume/Previews/ModernPreviewThumbnail.jsx
import React from 'react';
import { BaseTemplate } from '../templates/BaseTemplate';
import { colorPalettes } from '../colorPalette';
import { languages } from '../languages';

export default function ModernPreviewThumbnail({ resumeData }) {
  const {
    name = "Your Name",
    role = "",
    aboutMe = "",
    email = "",
    phone = "",
    website = "",
    location = "",
    photo = "",
    skills = [],
    languages: langData = [],
    education = [],
    experience = [],
    expertise = []
  } = resumeData || {};

  const sectionHeaders = languages['en'];
  const colors = colorPalettes['default'];

  return (
    <div className="relative w-full h-full overflow-hidden bg-white">
      {/* Scaling container */}
      <div 
        className="absolute top-0 left-0 origin-top-left bg-white"
        style={{
          width: '794px', // A4 width at 96 DPI
          height: '1123px', // A4 height at 96 DPI
          transform: 'scale(0.14)', // Scale to fit in thumbnail
          transformOrigin: 'top left'
        }}
      >
        <BaseTemplate 
          colorPalette={colors}
          sectionHeaders={sectionHeaders}
          layout="two-column"
        >
          {({ renderHeader, renderSection, renderListItem, getColor }) => (
            <div className="p-8">
              {/* Header Section */}
              <div className="flex flex-col md:flex-row gap-6 mb-8 items-center md:items-start">
                <div className="w-32 h-32 bg-gray-300 rounded-full flex-shrink-0"></div>
                
                <div className="flex-1">
                  <h1 className="text-4xl font-bold uppercase tracking-wide text-blue-700">
                    {name}
                  </h1>
                  {role && (
                    <h2 className="text-2xl text-blue-600 font-semibold mb-4">
                      {role}
                    </h2>
                  )}
                  
                  {/* About Me */}
                  {aboutMe && (
                    <section className="mb-6">
                      <h2 className="text-xl font-semibold border-b border-blue-700 text-blue-700 pb-1 mb-2">
                        About Me
                      </h2>
                      <p className="text-gray-700 mb-6 leading-relaxed">{aboutMe}</p>
                    </section>
                  )}

                  {/* Contact Information */}
                  <div className="flex flex-wrap gap-4 text-sm border-t-2 border-b-2 border-blue-700 py-4 mb-6">
                    {email && (
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                        </svg>
                        {email}
                      </div>
                    )}
                    
                    {phone && (
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                        </svg>
                        {phone}
                      </div>
                    )}
                    
                    {website && (
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/>
                        </svg>
                        {website.replace('https://', '').replace('http://', '')}
                      </div>
                    )}
                    
                    {location && (
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                        </svg>
                        {location}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Two Column Layout */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Left Column */}
                <div className="md:col-span-1 space-y-8">
                  {/* Education */}
                  {education.length > 0 && (
                    <section>
                      <h2 className="text-xl font-semibold border-b border-blue-700 text-blue-700 pb-1 mb-2">
                        Education
                      </h2>
                      <div className="space-y-4">
                        {education.map((edu, i) => (
                          <div key={i}>
                            <h3 className="font-bold">{edu.degree}</h3>
                            <p className="text-gray-700 italic">
                              {edu.institution}
                            </p>
                            <p className="text-gray-600 text-sm">
                              {edu.duration || `${edu.startDate} - ${edu.endDate}`}
                            </p>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                  {/* Skills */}
                  {skills.length > 0 && (
                    <section>
                      <h2 className="text-xl font-semibold border-b border-blue-700 text-blue-700 pb-1 mb-2">
                        Skills
                      </h2>
                      <div className="space-y-4">
                        {skills[0]?.category ? (
                          skills.map((skillGroup, i) => (
                            <div key={i}>
                              <h3 className="font-semibold">{skillGroup.category}</h3>
                              <ul className="flex flex-wrap gap-2">
                                {skillGroup.items.map((item, j) => (
                                  <li key={j} className="px-2 py-1 rounded text-sm bg-blue-100 text-blue-800">
                                    {typeof item === 'object' ? item.value : item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))
                        ) : (
                          <ul className="flex flex-wrap gap-2">
                            {skills.map((skill, i) => (
                              <li key={i} className="px-2 py-1 rounded text-sm bg-blue-100 text-blue-800">
                                {typeof skill === 'object' ? skill.value : skill}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </section>
                  )}

                  {/* Languages */}
                  {langData.length > 0 && (
                    <section>
                      <h2 className="text-xl font-semibold border-b border-blue-700 text-blue-700 pb-1 mb-2">
                        Languages
                      </h2>
                      <ul className="space-y-2">
                        {langData.map((lang, i) => (
                          <li key={i}>
                            <span className="font-medium">
                              {typeof lang === 'object' ? lang.language : lang.split('(')[0]}:
                            </span> 
                            <span className="text-gray-600 ml-1">
                              {typeof lang === 'object' ? lang.level : lang.split('(')[1]?.replace(')', '')}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </section>
                  )}
                </div>

                {/* Right Column */}
                <div className="md:col-span-2 space-y-8">
                  {/* Experience */}
                  {experience.length > 0 && (
                    <section>
                      <h2 className="text-xl font-semibold border-b border-blue-700 text-blue-700 pb-1 mb-2">
                        Experience
                      </h2>
                      <div className="space-y-6">
                        {experience.map((exp, i) => (
                          <div key={i} className="border-l-2 border-blue-600 pl-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-bold text-lg">{exp.role}</h3>
                                <p className="text-gray-700 font-medium">
                                  {exp.company}
                                </p>
                              </div>
                              <span className="text-gray-600 text-sm whitespace-nowrap">
                                {exp.duration}
                              </span>
                            </div>
                            
                            {exp.achievements?.length > 0 && (
                              <ul className="list-disc pl-5 space-y-1 mt-2">
                                {exp.achievements.map((achievement, j) => (
                                  <li key={j} className="text-gray-700">{achievement}</li>
                                ))}
                              </ul>
                            )}
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                  {/* Expertise */}
                  {expertise.length > 0 && (
                    <section>
                      <h2 className="text-xl font-semibold border-b border-blue-700 text-blue-700 pb-1 mb-2">
                        Expertise
                      </h2>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {expertise.map((exp, i) => (
                          <li key={i} className="flex items-start">
                            <svg 
                              className="w-4 h-4 mt-1 mr-2 text-blue-600 flex-shrink-0" 
                              fill="none" 
                              stroke="currentColor" 
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                            </svg>
                            <span className="text-gray-700">{exp}</span>
                          </li>
                        ))}
                      </ul>
                    </section>
                  )}
                </div>
              </div>
            </div>
          )}
        </BaseTemplate>
      </div>
    </div>
  );
}