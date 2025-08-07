import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Github, 
  Linkedin, 
  Upload,
  Plus,
  Edit3,
  Trash2,
  Calendar,
  Award,
  BookOpen,
  Code,
  Languages,
  Heart,
  Users,
  Camera,
  UserCircle
} from 'lucide-react';

// Mock Lottie component since we can't import the actual file
const MockLottie = ({ animationData, style }) => (
  <div style={style} className="flex items-center justify-center bg-blue-100 rounded-full">
    <Upload className="w-16 h-16 text-blue-600 animate-pulse" />
  </div>
);

// Mock data store hook
const useResumeStore = () => ({
  resumeData: {
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1 (555) 123-4567',
    address: 'New York, NY',
    portfolio: 'https://johndoe.dev',
    linkedin: 'https://linkedin.com/in/johndoe',
    github: 'https://github.com/johndoe',
    aboutMe: 'Passionate software developer with 5+ years of experience in full-stack development.',
    avatar: null,
    skills: ['React', 'Node.js', 'Python', 'TypeScript', 'MongoDB'],
    experience: [
      {
        title: 'Senior Developer',
        company: 'Tech Corp',
        startDate: '2022-01',
        endDate: 'Present',
        description: 'Leading development of web applications'
      }
    ],
    education: [
      {
        degree: 'Computer Science',
        school: 'University of Technology',
        startDate: '2018',
        endDate: '2022',
        gpa: '3.8'
      }
    ],
    projects: [
      {
        name: 'E-commerce Platform',
        description: 'Full-stack e-commerce solution',
        technologies: ['React', 'Node.js', 'MongoDB'],
        link: 'https://github.com/johndoe/ecommerce'
      }
    ],
    certifications: [
      {
        name: 'AWS Certified Developer',
        issuer: 'Amazon',
        date: '2023-06',
        credentialId: 'AWS-123456'
      }
    ],
    languages: ['English (Native)', 'Spanish (Conversational)'],
    interests: ['Photography', 'Hiking', 'Reading'],
    socialClubs: ['Tech Meetup NYC', 'Photography Club']
  },
  updateField: (field, value) => console.log(`Update ${field}:`, value),
  addArrayItem: (arrayField, item) => console.log(`Add to ${arrayField}:`, item),
  updateArrayItem: (arrayField, index, item) => console.log(`Update ${arrayField}[${index}]:`, item),
  removeArrayItem: (arrayField, index) => console.log(`Remove ${arrayField}[${index}]`),
  setAllData: (data) => console.log('Set all data:', data)
});

// Mock CV analysis function
const analyzeCvFile = async (file) => {
  await new Promise(resolve => setTimeout(resolve, 2000));
  return {
    name: 'Jane Smith',
    email: 'jane@example.com',
    skills: ['React', 'Vue.js', 'Python']
  };
};

// Avatar Component
const AvatarSection = ({ avatar, onAvatarClick }) => (
  <div className="relative group">
    <div className="w-32 h-32 rounded-full overflow-hidden bg-gradient-to-br from-blue-400 to-purple-600 p-1 shadow-xl">
      <div className="w-full h-full rounded-full overflow-hidden bg-white flex items-center justify-center">
        {avatar ? (
          <img src={avatar} alt="Profile" className="w-full h-full object-cover" />
        ) : (
          <UserCircle className="w-20 h-20 text-gray-400" />
        )}
      </div>
    </div>
    <button
      onClick={onAvatarClick}
      className="absolute -bottom-2 -right-2 bg-white rounded-full p-3 shadow-lg border-4 border-white group-hover:bg-blue-50 transition-colors"
    >
      <Camera className="w-4 h-4 text-blue-600" />
    </button>
  </div>
);

// Modern Input Component
const ModernInput = ({ icon: Icon, label, value, onChange, placeholder, type = "text" }) => (
  <div className="space-y-2">
    <label className="text-sm font-medium text-gray-700">{label}</label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Icon className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
      />
    </div>
  </div>
);

// Section Container
const Section = ({ title, icon: Icon, children, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className={`bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden ${className}`}
  >
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 px-6 py-4 border-b border-gray-100">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-white rounded-lg shadow-sm">
          <Icon className="w-5 h-5 text-blue-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      </div>
    </div>
    <div className="p-6">{children}</div>
  </motion.div>
);

// Tag Component
const Tag = ({ children, onRemove }) => (
  <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
    {children}
    {onRemove && (
      <button onClick={onRemove} className="ml-1 hover:bg-blue-200 rounded-full p-0.5">
        <Trash2 className="w-3 h-3" />
      </button>
    )}
  </span>
);

// List Item Component
const ListItem = ({ item, onEdit, onDelete, children }) => (
  <div className="group bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
    <div className="flex justify-between items-start">
      <div className="flex-1">{children}</div>
      <div className="opacity-0 group-hover:opacity-100 transition-opacity flex space-x-2">
        <button
          onClick={() => onEdit(item)}
          className="p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-100 rounded"
        >
          <Edit3 className="w-4 h-4" />
        </button>
        <button
          onClick={() => onDelete(item)}
          className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-100 rounded"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
);

export default function ProfilePage() {
  const [loading, setLoading] = useState(false);
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const { resumeData, updateField, setAllData } = useResumeStore();

  const handleCvUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    try {
      const result = await analyzeCvFile(file);
      setAllData(result);
      alert('✅ CV parsed and filled successfully!');
    } catch (err) {
      console.error(err);
      alert('❌ Failed to analyze CV');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 z-[9999] bg-white bg-opacity-90 flex items-center justify-center">
          <MockLottie animationData={null} style={{ width: 300, height: 300 }} />
        </div>
      )}

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-6xl mx-auto px-6 py-8">
          
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 mb-8"
          >
            <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-6 lg:space-y-0 lg:space-x-8">
              <AvatarSection 
                avatar={resumeData.avatar} 
                onAvatarClick={() => setShowAvatarModal(true)} 
              />
              
              <div className="flex-1 text-center lg:text-left">
                <h1 className="text-4xl font-bold text-gray-800 mb-2">{resumeData.name || 'Your Name'}</h1>
                <p className="text-lg text-gray-600 mb-6">{resumeData.aboutMe || 'Tell us about yourself...'}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Mail className="w-4 h-4" />
                    <span className="text-sm">{resumeData.email || 'email@example.com'}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Phone className="w-4 h-4" />
                    <span className="text-sm">{resumeData.phone || '+1 (555) 123-4567'}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{resumeData.address || 'City, State'}</span>
                  </div>
                </div>

                {/* CV Upload */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border-2 border-dashed border-blue-200">
                  <div className="flex items-center justify-center space-x-3">
                    <Upload className="w-5 h-5 text-blue-600" />
                    <label className="text-sm font-medium text-blue-800 cursor-pointer">
                      Upload CV (PDF to auto-fill profile)
                      <input
                        type="file"
                        accept="application/pdf"
                        onChange={handleCvUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Personal Information Form */}
          <Section title="Personal Information" icon={User} className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ModernInput
                icon={User}
                label="Full Name"
                value={resumeData.name}
                onChange={(value) => updateField('name', value)}
                placeholder="Enter your full name"
              />
              <ModernInput
                icon={Mail}
                label="Email"
                type="email"
                value={resumeData.email}
                onChange={(value) => updateField('email', value)}
                placeholder="your@email.com"
              />
              <ModernInput
                icon={Phone}
                label="Phone"
                value={resumeData.phone}
                onChange={(value) => updateField('phone', value)}
                placeholder="+1 (555) 123-4567"
              />
              <ModernInput
                icon={MapPin}
                label="Address"
                value={resumeData.address}
                onChange={(value) => updateField('address', value)}
                placeholder="City, State, Country"
              />
              <ModernInput
                icon={Globe}
                label="Portfolio"
                value={resumeData.portfolio}
                onChange={(value) => updateField('portfolio', value)}
                placeholder="https://yourportfolio.com"
              />
              <ModernInput
                icon={Linkedin}
                label="LinkedIn"
                value={resumeData.linkedin}
                onChange={(value) => updateField('linkedin', value)}
                placeholder="https://linkedin.com/in/username"
              />
            </div>
            <div className="mt-6">
              <ModernInput
                icon={Github}
                label="GitHub"
                value={resumeData.github}
                onChange={(value) => updateField('github', value)}
                placeholder="https://github.com/username"
              />
            </div>
            <div className="mt-6">
              <label className="text-sm font-medium text-gray-700 mb-2 block">About Me</label>
              <textarea
                value={resumeData.aboutMe}
                onChange={(e) => updateField('aboutMe', e.target.value)}
                placeholder="Tell us about yourself, your passion, and what drives you..."
                className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                rows={4}
              />
            </div>
          </Section>

          {/* Grid Layout for Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            
            {/* Skills Section */}
            <Section title="Skills" icon={Code}>
              <div className="flex flex-wrap gap-2 mb-4">
                {resumeData.skills.map((skill, index) => (
                  <Tag key={index}>{skill}</Tag>
                ))}
              </div>
              <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors">
                <Plus className="w-4 h-4" />
                <span className="text-sm font-medium">Add Skill</span>
              </button>
            </Section>

            {/* Languages Section */}
            <Section title="Languages" icon={Languages}>
              <div className="space-y-2 mb-4">
                {resumeData.languages.map((language, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                    <span className="text-gray-800">{language}</span>
                  </div>
                ))}
              </div>
              <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors">
                <Plus className="w-4 h-4" />
                <span className="text-sm font-medium">Add Language</span>
              </button>
            </Section>
          </div>

          {/* Experience Section */}
          <Section title="Experience" icon={Calendar} className="mb-8">
            <div className="space-y-4 mb-6">
              {resumeData.experience.map((exp, index) => (
                <ListItem key={index} item={exp}>
                  <div>
                    <h3 className="font-semibold text-gray-800">{exp.title}</h3>
                    <p className="text-blue-600 font-medium">{exp.company}</p>
                    <p className="text-sm text-gray-500">{exp.startDate} - {exp.endDate}</p>
                    <p className="text-gray-600 mt-2">{exp.description}</p>
                  </div>
                </ListItem>
              ))}
            </div>
            <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors">
              <Plus className="w-4 h-4" />
              <span className="text-sm font-medium">Add Experience</span>
            </button>
          </Section>

          {/* Education Section */}
          <Section title="Education" icon={BookOpen} className="mb-8">
            <div className="space-y-4 mb-6">
              {resumeData.education.map((edu, index) => (
                <ListItem key={index} item={edu}>
                  <div>
                    <h3 className="font-semibold text-gray-800">{edu.degree}</h3>
                    <p className="text-blue-600 font-medium">{edu.school}</p>
                    <p className="text-sm text-gray-500">{edu.startDate} - {edu.endDate}</p>
                    {edu.gpa && <p className="text-gray-600">GPA: {edu.gpa}</p>}
                  </div>
                </ListItem>
              ))}
            </div>
            <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors">
              <Plus className="w-4 h-4" />
              <span className="text-sm font-medium">Add Education</span>
            </button>
          </Section>

          {/* Projects & Certifications Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            
            {/* Projects Section */}
            <Section title="Projects" icon={Code}>
              <div className="space-y-4 mb-6">
                {resumeData.projects.map((project, index) => (
                  <ListItem key={index} item={project}>
                    <div>
                      <h3 className="font-semibold text-gray-800">{project.name}</h3>
                      <p className="text-gray-600 mb-2">{project.description}</p>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {project.technologies?.map((tech, i) => (
                          <span key={i} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                            {tech}
                          </span>
                        ))}
                      </div>
                      {project.link && (
                        <a href={project.link} className="text-blue-600 text-sm hover:underline">
                          View Project →
                        </a>
                      )}
                    </div>
                  </ListItem>
                ))}
              </div>
              <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors">
                <Plus className="w-4 h-4" />
                <span className="text-sm font-medium">Add Project</span>
              </button>
            </Section>

            {/* Certifications Section */}
            <Section title="Certifications" icon={Award}>
              <div className="space-y-4 mb-6">
                {resumeData.certifications.map((cert, index) => (
                  <ListItem key={index} item={cert}>
                    <div>
                      <h3 className="font-semibold text-gray-800">{cert.name}</h3>
                      <p className="text-blue-600 font-medium">{cert.issuer}</p>
                      <p className="text-sm text-gray-500">Issued: {cert.date}</p>
                      {cert.credentialId && (
                        <p className="text-xs text-gray-400">ID: {cert.credentialId}</p>
                      )}
                    </div>
                  </ListItem>
                ))}
              </div>
              <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors">
                <Plus className="w-4 h-4" />
                <span className="text-sm font-medium">Add Certification</span>
              </button>
            </Section>
          </div>

          {/* Interests & Social Clubs */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Interests Section */}
            <Section title="Interests" icon={Heart}>
              <div className="flex flex-wrap gap-2 mb-4">
                {resumeData.interests.map((interest, index) => (
                  <Tag key={index}>{interest}</Tag>
                ))}
              </div>
              <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors">
                <Plus className="w-4 h-4" />
                <span className="text-sm font-medium">Add Interest</span>
              </button>
            </Section>

            {/* Social Clubs Section */}
            <Section title="Social Clubs" icon={Users}>
              <div className="flex flex-wrap gap-2 mb-4">
                {resumeData.socialClubs.map((club, index) => (
                  <Tag key={index}>{club}</Tag>
                ))}
              </div>
              <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors">
                <Plus className="w-4 h-4" />
                <span className="text-sm font-medium">Add Club</span>
              </button>
            </Section>
          </div>
        </div>
      </div>
    </>
  );
}