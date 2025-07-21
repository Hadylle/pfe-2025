import React, { useState } from 'react';
import { useResumeStore } from '../../store/resume-store';
import { FormContainer } from './ReusableComponents/FormContainer';
import { ArrayInput} from './ReusableComponents/ArrayInput';
import { PlusIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/outline';

export default function ProjectForm() {
  const { resumeData, addArrayItem, removeArrayItem } = useResumeStore();
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    link: '',
    techStack: ['']
  });

  const updateField = (field, value) => {
    setNewProject(prev => ({ ...prev, [field]: value }));
  };

  const addProject = () => {
    if (newProject.title.trim()) {
      const projectToAdd = {
        ...newProject,
        techStack: newProject.techStack.filter(t => t.trim() !== '')
      };
      addArrayItem('projects', projectToAdd);
      setNewProject({
        title: '',
        description: '',
        link: '',
        techStack: ['']
      });
    }
  };

  return (
    <FormContainer title="Projects">
      {/* Display existing projects */}
      {resumeData.projects?.map((project, index) => (
        <div key={index} className="mb-6 p-4 border border-gray-100 rounded-lg">
          <div className="flex justify-between items-start">
            <div className="space-y-2 flex-grow">
              <h3 className="font-medium">{project.title}</h3>
              <p className="text-sm text-gray-600">{project.description}</p>
              {project.link && (
                <a href={project.link} className="text-blue-600 text-sm hover:underline">
                  View Project
                </a>
              )}
              {project.techStack?.length > 0 && (
                <p className="text-sm text-gray-500 italic">
                  Tech: {project.techStack.join(', ')}
                </p>
              )}
            </div>
            <button
              onClick={() => removeArrayItem('projects', index)}
              className="text-red-500 hover:text-red-700"
            >
              <TrashIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      ))}

      {/* Form inputs */}
      <div className="space-y-4 mt-4">
        <input
          type="text"
          placeholder="Project Title"
          value={newProject.title}
          onChange={(e) => updateField('title', e.target.value)}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        <textarea
          rows={3}
          placeholder="Project Description"
          value={newProject.description}
          onChange={(e) => updateField('description', e.target.value)}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Project Link (optional)"
          value={newProject.link}
          onChange={(e) => updateField('link', e.target.value)}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />

        <ArrayInput
          label="Tech Stack"
          items={newProject.techStack}
          onUpdate={(items) => updateField('techStack', items)}
          placeholder="Technology used"
        />

        <button
          onClick={addProject}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
        >
          <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
          Add Project
        </button>
      </div>
    </FormContainer>
  );
}