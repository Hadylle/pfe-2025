import { BaseTemplate } from './BaseTemplate';
import { languages } from '../languages';
import { colorPalettes } from '../colorPalette';

const ClassicTemplate = ({ 
  data,
  language = 'en',
  colorScheme = 'default'
}) => {
  const sectionHeaders = languages[language];
  const colors = colorPalettes[colorScheme];

  return (
    <BaseTemplate 
      colorPalette={colors}
      sectionHeaders={sectionHeaders}
      layout="single-column"
    >
      {({ renderHeader, renderSection, renderListItem, getColor }) => (
        <>
          {renderHeader()}

          {/* About Me */}
          {data.aboutMe && renderSection('About Me', 
            <p className={colors.text}>{data.aboutMe}</p>
          )}

          {/* Experience */}
          {data.experience?.length > 0 && renderSection('experience',
            data.experience.map((exp, i) => (
              <div key={i} className="mb-4">
                <div className="flex justify-between">
                  <h3 className="font-bold">{exp.role}</h3>
                  <span className={colors.text}>{exp.duration}</span>
                </div>
                <h4 className={colors.text}>{exp.company}</h4>
                {exp.achievements?.length > 0 && renderListItem(exp.achievements)}
              </div>
            ))
          )}

          {/* Education */}
          {data.education?.length > 0 && renderSection('education',
            data.education.map((edu, i) => (
              <div key={i} className="mb-4">
                <h3 className="font-bold">{edu.institution}</h3>
                <p className={colors.text}>
                  {edu.degree} - {edu.field}
                </p>
                <p className={`${colors.text} text-sm`}>
                  {edu.startDate} - {edu.endDate}
                </p>
              </div>
            ))
          )}

          {/* Skills */}
          {data.skills?.length > 0 && renderSection('skills',
            <ul className="flex flex-wrap gap-2">
              {data.skills.map((skill, i) => (
                <li
                  key={i}
                  className={`px-2 py-1 rounded text-sm ${colors.accent}`}
                >
                  {skill.value}
                </li>
              ))}
            </ul>
          )}

          {/* Projects */}
          {data.projects?.length > 0 && renderSection('projects',
            data.projects.map((proj, i) => (
              <div key={i} className="mb-4">
                <h3 className="font-bold">{proj.title}</h3>
                <p className={colors.text}>{proj.description}</p>
                {proj.link && (
                  <a
                    href={proj.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${colors.primary} underline`}
                  >
                    {sectionHeaders.projectLink || 'Project Link'}
                  </a>
                )}
                {proj.techStack?.length > 0 && (
                  <p className={`mt-1 text-sm ${colors.text}`}>
                    {sectionHeaders.techStack || 'Tech Stack'}: {proj.techStack.join(', ')}
                  </p>
                )}
              </div>
            ))
          )}

          {/* Certifications */}
          {data.certifications?.length > 0 && renderSection('certifications',
            data.certifications.map((cert, i) => (
              <div key={i} className="mb-4">
                <h3 className="font-bold">{cert.title}</h3>
                <p className={colors.text}>
                  {cert.issuer} - {cert.year}
                </p>
              </div>
            ))
          )}

          {/* Languages */}
          {data.languages?.length > 0 && renderSection('languages',
            renderListItem(data.languages)
          )}

          {/* Interests */}
          {data.interests?.length > 0 && renderSection('interests',
            renderListItem(data.interests)
          )}

          {/* Social Clubs */}
          {data.socialClubs?.length > 0 && renderSection('socialClubs',
            renderListItem(data.socialClubs)
          )}
        </>
      )}
    </BaseTemplate>
  );
};

export default ClassicTemplate;
