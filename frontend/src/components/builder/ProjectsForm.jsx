import { useResume } from '../../context/ResumeContext';
import { Plus, Trash2, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import API from '../../api/axios';

const ProjectsForm = () => {
  const { resumeData, addProject, updateProject, removeProject } = useResume();
  const projects = resumeData?.projects || [];


  const handleAdd = () => {
    if (addProject) {
      addProject({
        name: '',
        description: '',
        technologies: '',
        link: '',
        startDate: '',
        endDate: ''
      });
    }
  };



  return (
    <div className="space-y-8">
      {projects.map((project, index) => (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          key={index}
          className="p-6 rounded-2xl border border-slate-200 bg-slate-50 relative group"
        >
          <button
            onClick={() => removeProject && removeProject(index)}
            className="absolute top-4 right-4 text-slate-400 hover:text-red-500 transition-colors"
          >
            <Trash2 size={20} />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Project Name</label>
              <input
                type="text"
                value={project.name || ''}
                onChange={(e) => updateProject && updateProject(index, { name: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-indigo-500 outline-none"
                placeholder="E-commerce Platform"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Project Link (Optional)</label>
              <div className="relative">
                <input
                  type="url"
                  value={project.link || ''}
                  onChange={(e) => updateProject && updateProject(index, { link: e.target.value })}
                  className="w-full px-4 py-2.5 pr-10 rounded-lg border border-slate-200 focus:border-indigo-500 outline-none"
                  placeholder="https://github.com/username/project"
                />
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600 transition-colors"
                  >
                    <ExternalLink size={16} />
                  </a>
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Start Date</label>
              <input
                type="month"
                value={project.startDate || ''}
                 onChange={(e) => updateProject && updateProject(index, { startDate: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-indigo-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">End Date</label>
              <input
                type="month"
                value={project.endDate || ''}
                 onChange={(e) => updateProject && updateProject(index, { endDate: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-indigo-500 outline-none"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">Technologies Used</label>
              <input
                type="text"
                value={project.technologies || ''}
                 onChange={(e) => updateProject && updateProject(index, { technologies: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-indigo-500 outline-none"
                placeholder="React, Node.js, MongoDB, Express"
              />
            </div>
            <div className="md:col-span-2 relative">
              <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
              <textarea
                rows="4"
                value={project.description || ''}
                 onChange={(e) => updateProject && updateProject(index, { description: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-indigo-500 outline-none"
                placeholder="Describe your project, its features, and your contributions..."
              ></textarea>

            </div>
          </div>
        </motion.div>
      ))}

      <button
        onClick={handleAdd}
        className="w-full py-4 border-2 border-dashed border-slate-300 rounded-2xl flex flex-col items-center justify-center text-slate-500 hover:text-indigo-600 hover:border-indigo-400 hover:bg-indigo-50 transition-all gap-2"
      >
        <Plus size={24} />
        <span className="font-medium">Add Project</span>
      </button>
    </div>
  );
};

export default ProjectsForm;