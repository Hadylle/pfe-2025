// components/resume/Previews/ClassicPreviewThumbnail.jsx
import React from 'react';
import { BaseTemplate } from '../templates/BaseTemplate';
import { colorPalettes } from '../colorPalette';
import { languages } from '../languages';

export default function ClassicPreviewThumbnail({ resumeData }) {
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
          layout="single-column"
        >
          {({ renderHeader, renderSection, renderListItem, getColor }) => (
            <div className="p-8">
              {/* Header */}
              <div className={`flex flex-col md:flex-row gap-6 items-center md:items-start border-b-2 border-blue-700 pb-4 mb-6`}>
                <div className="w-24 h-24 bg-gray-300 rounded-full flex-shrink-0"></div>
                
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-blue-700">{resumeData?.name || "Your Name"}</h1>
                  {resumeData?.role && <h2 className="text-xl text-gray-600">{resumeData.role}</h2>}

                  <div className="flex flex-wrap gap-x-4 gap-y-2 mt-2 text-sm">
                    {resumeData?.email && (
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                        </svg>
                        {resumeData.email}
                      </div>
                    )}
                    
                    {resumeData?.phone && (
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                        </svg>
                        {resumeData.phone}
                      </div>
                    )}
                    
                    {resumeData?.linkedin && (
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                        {resumeData.linkedin?.replace('https://', '')}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* About Me */}
              {resumeData?.aboutMe && (
                <section className="mb-6">
                  <h2 className="text-xl font-semibold border-b border-blue-700 text-blue-700 pb-1 mb-2">
                    About Me
                  </h2>
                  <p className="text-gray-700">{resumeData.aboutMe}</p>
                </section>
              )}

              {/* Experience */}
              {resumeData?.experience?.length > 0 && (
                <section className="mb-6">
                  <h2 className="text-xl font-semibold border-b border-blue-700 text-blue-700 pb-1 mb-2">
                    Experience
                  </h2>
                  {resumeData.experience.map((exp, i) => (
                    <div key={i} className="mb-4">
                      <div className="flex justify-between">
                        <h3 className="font-bold">{exp.role}</h3>
                        <span className="text-gray-600">{exp.duration}</span>
                      </div>
                      <h4 className="text-gray-600">{exp.company}</h4>
                      {exp.achievements?.length > 0 && (
                        <ul className="list-disc pl-5 space-y-1 mt-2">
                          {exp.achievements.map((achievement, j) => (
                            <li key={j} className="text-gray-700">{achievement}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </section>
              )}

              {/* Education */}
              {resumeData?.education?.length > 0 && (
                <section className="mb-6">
                  <h2 className="text-xl font-semibold border-b border-blue-700 text-blue-700 pb-1 mb-2">
                    Education
                  </h2>
                  {resumeData.education.map((edu, i) => (
                    <div key={i} className="mb-4">
                      <h3 className="font-bold">{edu.institution}</h3>
                      <p className="text-gray-600">
                        {edu.degree} - {edu.field}
                      </p>
                      <p className="text-gray-600 text-sm">
                        {edu.startDate} - {edu.endDate}
                      </p>
                    </div>
                  ))}
                </section>
              )}

              {/* Skills */}
              {resumeData?.skills?.length > 0 && (
                <section className="mb-6">
                  <h2 className="text-xl font-semibold border-b border-blue-700 text-blue-700 pb-1 mb-2">
                    Skills
                  </h2>
                  <ul className="flex flex-wrap gap-2">
                    {resumeData.skills.map((skill, i) => (
                      <li
                        key={i}
                        className="px-2 py-1 rounded text-sm bg-blue-100 text-blue-800"
                      >
                        {typeof skill === 'object' ? skill.value : skill}
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Projects */}
              {resumeData?.projects?.length > 0 && (
                <section className="mb-6">
                  <h2 className="text-xl font-semibold border-b border-blue-700 text-blue-700 pb-1 mb-2">
                    Projects
                  </h2>
                  {resumeData.projects.map((proj, i) => (
                    <div key={i} className="mb-4">
                      <h3 className="font-bold">{proj.title}</h3>
                      <p className="text-gray-700">{proj.description}</p>
                      {proj.link && (
                        <a
                          href={proj.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-700 underline"
                        >
                          Project Link
                        </a>
                      )}
                      {proj.techStack?.length > 0 && (
                        <p className="mt-1 text-sm text-gray-600">
                          Tech Stack: {proj.techStack.join(', ')}
                        </p>
                      )}
                    </div>
                  ))}
                </section>
              )}
            </div>
          )}
        </BaseTemplate>
      </div>
    </div>
  );
}