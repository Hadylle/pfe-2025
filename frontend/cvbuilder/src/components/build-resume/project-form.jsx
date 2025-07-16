import React from 'react';
import { useResumeStore } from '../../store/resume-store';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

export default function ProjectForm() {
  const { resumeData, addArrayItem, updateArrayItem, removeArrayItem } = useResumeStore();

  const [newProject, setNewProject] = React.useState({
    title: '',
    description: '',
    link: '',
    techStack: [''],
  });

  // Add new project only if title is present (you can add more validation)
  const addProject = () => {
    if (newProject.title.trim() !== '') {
      addArrayItem('projects', newProject);
      setNewProject({
        title: '',
        description: '',
        link: '',
        techStack: [''],
      });
    }
  };

  // Update a techStack item for a specific project index
  const updateTechStackItem = (projectIndex, techIndex, value) => {
    const updatedTechStack = [...resumeData.projects[projectIndex].techStack];
    updatedTechStack[techIndex] = value;
    updateArrayItem('projects', projectIndex, {
      ...resumeData.projects[projectIndex],
      techStack: updatedTechStack,
    });
  };

  // Add a new techStack item input for a specific project index
  const addTechStackItem = (projectIndex) => {
    const updatedTechStack = [...resumeData.projects[projectIndex].techStack, ''];
    updateArrayItem('projects', projectIndex, {
      ...resumeData.projects[projectIndex],
      techStack: updatedTechStack,
    });
  };

  // Remove a techStack item input for a specific project index
  const removeTechStackItem = (projectIndex, techIndex) => {
    const updatedTechStack = resumeData.projects[projectIndex].techStack.filter(
      (_, i) => i !== techIndex
    );
    updateArrayItem('projects', projectIndex, {
      ...resumeData.projects[projectIndex],
      techStack: updatedTechStack,
    });
  };

  // Update newProject state for input fields
  const handleNewProjectChange = (field, value) => {
    setNewProject((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
    >
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Projects</h2>

      {/* Existing projects */}
      {resumeData.projects.map((project, index) => (
        <div key={index} className="mb-6 p-4 border border-gray-100 rounded-lg">
          <div className="flex justify-between items-start">
            <div className="space-y-2 flex-grow">
              <input
                type="text"
                value={project.title}
                placeholder="Project Title"
                onChange={(e) =>
                  updateArrayItem('projects', index, {
                    ...project,
                    title: e.target.value,
                  })
                }
                className="w-full text-lg font-semibold border-b border-gray-300 focus:outline-none focus:border-blue-500"
              />
              <textarea
                rows={3}
                value={project.description}
                placeholder="Project Description"
                onChange={(e) =>
                  updateArrayItem('projects', index, {
                    ...project,
                    description: e.target.value,
                  })
                }
                className="w-full mt-2 border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
              />
              <input
                type="text"
                value={project.link}
                placeholder="Project Link"
                onChange={(e) =>
                  updateArrayItem('projects', index, {
                    ...project,
                    link: e.target.value,
                  })
                }
                className="w-full mt-2 border-b border-gray-300 focus:outline-none focus:border-blue-500"
              />

              {/* Tech Stack inputs */}
              <div className="mt-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tech Stack
                </label>
                {project.techStack.map((tech, techIndex) => (
                  <div key={techIndex} className="flex items-center mb-1 gap-2">
                    <input
                      type="text"
                      value={tech}
                      placeholder="Tech name"
                      onChange={(e) => updateTechStackItem(index, techIndex, e.target.value)}
                      className="flex-grow border border-gray-300 rounded-md p-1 focus:outline-none focus:border-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => removeTechStackItem(index, techIndex)}
                      className="text-red-500 hover:text-red-700"
                      aria-label="Remove tech stack item"
                    >
                      &times;
                    </button>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => addTechStackItem(index)}
                  className="mt-1 px-2 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
                >
                  Add Tech
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={() => removeArrayItem('projects', index)}
              className="text-red-500 hover:text-red-700 ml-4 self-start"
              aria-label="Remove project"
            >
              <TrashIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
      ))}

      {/* New project form */}
      <div className="space-y-4 mt-4 border-t pt-4">
        <input
          type="text"
          value={newProject.title}
          placeholder="Project Title"
          onChange={(e) => handleNewProjectChange('title', e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
        />
        <textarea
          rows={3}
          value={newProject.description}
          placeholder="Project Description"
          onChange={(e) => handleNewProjectChange('description', e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
        />
        <input
          type="text"
          value={newProject.link}
          placeholder="Project Link"
          onChange={(e) => handleNewProjectChange('link', e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
        />

        {/* Tech Stack input for new project */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tech Stack
          </label>
          {newProject.techStack.map((tech, idx) => (
            <div key={idx} className="flex items-center mb-1 gap-2">
              <input
                type="text"
                value={tech}
                placeholder="Tech name"
                onChange={(e) => {
                  const updatedTechStack = [...newProject.techStack];
                  updatedTechStack[idx] = e.target.value;
                  setNewProject((prev) => ({ ...prev, techStack: updatedTechStack }));
                }}
                className="flex-grow border border-gray-300 rounded-md p-1 focus:outline-none focus:border-blue-500"
              />
              {newProject.techStack.length > 1 && (
                <button
                  type="button"
                  onClick={() => {
                    const updatedTechStack = newProject.techStack.filter(
                      (_, i) => i !== idx
                    );
                    setNewProject((prev) => ({ ...prev, techStack: updatedTechStack }));
                  }}
                  className="text-red-500 hover:text-red-700"
                  aria-label="Remove tech stack item"
                >
                  &times;
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={() =>
              setNewProject((prev) => ({
                ...prev,
                techStack: [...prev.techStack, ''],
              }))
            }
            className="mt-1 px-2 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
          >
            Add Tech
          </button>
        </div>

        <button
          type="button"
          onClick={addProject}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
        >
          <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
          Add Project
        </button>
      </div>
    </motion.div>
  );
}

