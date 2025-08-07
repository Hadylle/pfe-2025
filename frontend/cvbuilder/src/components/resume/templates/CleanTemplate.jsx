import React from 'react';
import { Mail, Phone, MapPin, Globe, Github, Linkedin } from 'lucide-react';

const CleanTemplate = ({ data }) => {
  const {
    name,
    role,
    aboutMe,
    photo,
    email,
    phone,
    address,
    linkedin,
    github,
    portfolio,
    skills = [],
    experience = [],
    education = [],
    projects = [],
    certifications = [],
    languages = [],
  } = data || {};

  return (
    <div className="bg-gray-100 min-h-screen font-sans text-gray-800">
{/* Header */}
<header className="bg-pink-950 text-white px-6 py-10">
  <div className="max-w-5xl mx-auto flex items-center gap-8">
    
    {/* Profile Image on the Left */}
    {photo && (
      <div className="w-32 h-32 overflow-hidden rounded-xl shadow-md border border-gray-300 bg-white flex-shrink-0">
        <img
          src={photo}
          alt="Profile"
          className="w-full h-full object-cover"
        />
      </div>
    )}

    {/* Info Centered in Remaining Space */}
    <div className="flex-1 text-center">
      <h1 className="text-4xl font-bold">{name || 'Your Name'}</h1>
      {role && <p className="text-lg mt-1">{role}</p>}
      <div className="flex flex-wrap justify-center gap-4 text-sm mt-4 text-gray-200">
        {email && <p className="flex items-center gap-1"><Mail size={16} /> {email}</p>}
        {phone && <p className="flex items-center gap-1"><Phone size={16} /> {phone}</p>}
        {address && <p className="flex items-center gap-1"><MapPin size={16} /> {address}</p>}
        {linkedin && <p className="flex items-center gap-1"><Linkedin size={16} /> {linkedin.replace('https://', '')}</p>}
        {github && <p className="flex items-center gap-1"><Github size={16} /> {github.replace('https://', '')}</p>}
        {portfolio && <p className="flex items-center gap-1"><Globe size={16} /> {portfolio.replace('https://', '')}</p>}
      </div>
    </div>
    
  </div>
</header>



      {/* Main Content */}
      <main className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
        {/* Left Sidebar with green-50 background and profile image */}
        <aside className="bg-gray-100 py-10 px-6 space-y-6 md:col-span-1 relative">
         
          {education.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-2">Education</h2>
              <ul className="space-y-3 text-sm">
                {education.map((edu, i) => (
                  <li key={i}>
                    <p className="font-semibold">{edu.institution}</p>
                    <p>{edu.degree} in {edu.field}</p>
                    <p className="text-gray-600">{edu.startDate} – {edu.endDate}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {skills.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-2">Skills</h2>
              <ul className="flex flex-wrap gap-2 text-sm">
                {skills.map((skill, i) => (
                  <li key={i} className="bg-gray-200 px-3 py-1 rounded-full">
                    {typeof skill === 'string' ? skill : skill.name || skill}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {languages.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-2">Languages</h2>
              <ul className="list-disc list-inside text-sm space-y-1">
                {languages.map((lang, i) => <li key={i}>{lang}</li>)}
              </ul>
            </div>
          )}
        </aside>

        {/* Right Content */}
        <section className="md:col-span-2 space-y-10 py-10 px-6 bg-white">
          {aboutMe && (
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-2">About Me</h2>
              <p className="text-sm leading-relaxed">{aboutMe}</p>
            </div>
          )}

          {experience.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-2">Work Experience</h2>
              <div className="space-y-6 text-sm">
                {experience.map((job, i) => (
                  <div key={i}>
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold">{job.role} @ {job.company}</h3>
                      <span className="text-gray-600 text-sm">{job.duration}</span>
                    </div>
                    <ul className="list-disc list-inside ml-4 mt-1">
                      {job.achievements?.map((point, idx) => <li key={idx}>{point}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {projects.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-2">Projects</h2>
              <div className="space-y-6 text-sm">
                {projects.map((project, i) => (
                  <div key={i}>
                    <h3 className="font-semibold">{project.title}</h3>
                    <p>{project.description}</p>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 text-xs underline"
                      >
                        {project.link}
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {certifications.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-2">Certifications</h2>
              <ul className="list-disc list-inside text-sm space-y-1">
                {certifications.map((cert, i) => (
                  <li key={i}>{cert.title} — {cert.issuer}, {cert.year}</li>
                ))}
              </ul>
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-pink-950 text-white py-4 text-center text-sm">
        {/* Optional footer content */}
      </footer>
    </div>
  );
};

export default CleanTemplate;
