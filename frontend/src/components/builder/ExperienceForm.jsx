import { useResume } from '../../context/ResumeContext';
import { Plus, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import API from '../../api/axios';

const ExperienceForm = () => {
  const { resumeData, addExperience, updateExperience, removeExperience } = useResume();
  const { experience } = resumeData;


  const handleAdd = () => {
    addExperience({
      title: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      description: ''
    });
  };



  return (
    <div className="space-y-8">
      {experience.map((exp, index) => (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          key={index} 
          className="p-6 rounded-2xl border border-slate-200 bg-slate-50 relative group"
        >
          <button 
            onClick={() => removeExperience(index)}
            className="absolute top-4 right-4 text-slate-400 hover:text-red-500 transition-colors"
          >
            <Trash2 size={20} />
          </button>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Job Title</label>
              <input 
                type="text" 
                value={exp.title || ''}
                onChange={(e) => updateExperience(index, { title: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-indigo-500 outline-none"
                placeholder="Software Engineer" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Company</label>
              <input 
                type="text" 
                value={exp.company || ''}
                onChange={(e) => updateExperience(index, { company: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-indigo-500 outline-none"
                placeholder="Google" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Start Date</label>
              <input 
                type="month" 
                value={exp.startDate || ''}
                onChange={(e) => updateExperience(index, { startDate: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-indigo-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">End Date</label>
              <input 
                type="month" 
                value={exp.endDate || ''}
                onChange={(e) => updateExperience(index, { endDate: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-indigo-500 outline-none"
              />
            </div>
            <div className="md:col-span-2 relative">
              <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
              <textarea 
                rows="4"
                value={exp.description || ''}
                onChange={(e) => updateExperience(index, { description: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-indigo-500 outline-none"
                placeholder="Describe your responsibilities and achievements..." 
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
        <span className="font-medium">Add Work Experience</span>
      </button>
    </div>
  );
};

export default ExperienceForm;
