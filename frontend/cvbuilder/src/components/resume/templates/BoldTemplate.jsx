import React from 'react';
import { Mail, Phone, MapPin, Globe, Github, Linkedin } from 'lucide-react';

const BoldTemplate = ({ data, language, colorScheme }) => {
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
    interests = [],
    socialClubs = [],
  } = data || {};

  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen font-sans">
      {/* Sidebar */}
      <aside className="w-full md:w-1/3 bg-black text-white p-6 flex flex-col items-center">
        <div className="w-40 h-40 bg-yellow-400 overflow-hidden mb-4 rounded">
          {photo && (
            <img
              src={photo}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          )}
        </div>
        <h1 className="text-2xl font-bold mb-1 text-center">{name || 'Your Name'}</h1>
        {role && <h2 className="text-md text-yellow-400 mb-4">{role}</h2>}

        <div className="w-full text-sm mb-6 space-y-2">
          {phone && (
            <p className="flex items-center">
              <Phone className="w-4 h-4 mr-2" /> {phone}
            </p>
          )}
          {email && (
            <p className="flex items-center">
              <Mail className="w-4 h-4 mr-2" /> {email}
            </p>
          )}
          {address && (
            <p className="flex items-center">
              <MapPin className="w-4 h-4 mr-2" /> {address}
            </p>
          )}
          {linkedin && (
            <p className="flex items-center">
              <Linkedin className="w-4 h-4 mr-2" /> {linkedin.replace('https://', '')}
            </p>
          )}
          {github && (
            <p className="flex items-center">
              <Github className="w-4 h-4 mr-2" /> {github.replace('https://', '')}
            </p>
          )}
          {portfolio && (
            <p className="flex items-center">
              <Globe className="w-4 h-4 mr-2" /> {portfolio.replace('https://', '')}
            </p>
          )}
        </div>

        {skills.length > 0 && (
          <div className="w-full mb-4">
            <h3 className="text-yellow-400 font-bold mb-2">Skills</h3>
            <ul className="list-disc list-inside text-sm space-y-1">
              {skills.map((skill, i) => (
                <li key={i}>{typeof skill === 'string' ? skill : skill.name || skill}</li>
              ))}
            </ul>
          </div>
        )}

        {interests.length > 0 && (
          <div className="w-full mb-4">
            <h3 className="text-yellow-400 font-bold mb-2">Interests</h3>
            <ul className="list-disc list-inside text-sm space-y-1">
              {interests.map((interest, i) => (
                <li key={i}>{interest}</li>
              ))}
            </ul>
          </div>
        )}

        {socialClubs.length > 0 && (
          <div className="w-full">
            <h3 className="text-yellow-400 font-bold mb-2">Social Clubs</h3>
            <ul className="list-disc list-inside text-sm space-y-1">
              {socialClubs.map((club, i) => (
                <li key={i}>{club}</li>
              ))}
            </ul>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main className="w-full md:w-2/3 p-6 bg-white text-black overflow-auto">
        {aboutMe && (
          <section className="mb-6">
            <h2 className="text-2xl font-bold border-b-4 border-yellow-400 inline-block mb-2">About Me</h2>
            <p className="text-sm leading-relaxed">{aboutMe}</p>
          </section>
        )}

        {experience.length > 0 && (
          <section className="mb-6">
            <h2 className="text-2xl font-bold border-b-4 border-yellow-400 inline-block mb-2">Experience</h2>
            <div className="space-y-4 text-sm">
              {experience.map((job, idx) => (
                <div key={idx}>
                  <h3 className="font-bold">{job.role} @ {job.company}</h3>
                  <p className="text-yellow-600 text-sm">
                    {job.duration}
                  </p>
                  <ul className="list-disc list-inside ml-4">
                    {job.achievements?.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {projects.length > 0 && (
          <section className="mb-6">
            <h2 className="text-2xl font-bold border-b-4 border-yellow-400 inline-block mb-2">Projects</h2>
            <div className="space-y-4 text-sm">
              {projects.map((project, idx) => (
                <div key={idx}>
                  <h3 className="font-bold">{project.title}</h3>
                  <p>{project.description}</p>
                  <p className="italic text-xs text-gray-600">{project.link}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {education.length > 0 && (
          <section className="mb-6">
            <h2 className="text-2xl font-bold border-b-4 border-yellow-400 inline-block mb-2">Education</h2>
            <div className="text-sm space-y-2">
              {education.map((edu, idx) => (
                <div key={idx}>
                  <p><strong>{edu.institution}</strong> — {edu.degree} in {edu.field}</p>
                  <p className="text-yellow-600">{edu.startDate} – {edu.endDate}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {certifications.length > 0 && (
          <section className="mb-6">
            <h2 className="text-2xl font-bold border-b-4 border-yellow-400 inline-block mb-2">Certifications</h2>
            <ul className="list-disc list-inside ml-4 text-sm">
              {certifications.map((cert, i) => (
                <li key={i}>{cert.title} — {cert.issuer}, {cert.year}</li>
              ))}
            </ul>
          </section>
        )}

        {languages.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold border-b-4 border-yellow-400 inline-block mb-2">Languages</h2>
            <ul className="list-inside list-disc text-sm ml-4">
              {languages.map((lang, idx) => (
                <li key={idx}>{lang}</li>)
              )}
            </ul>
          </section>
        )}
      </main>
    </div>
  );
};

export default BoldTemplate;
