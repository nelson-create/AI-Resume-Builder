import { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SkillsForm = () => {
  const { resumeData, updateSkills } = useResume();
  const { skills } = resumeData;
  const [inputValue, setInputValue] = useState('');

  const handleAddSkill = (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
      e.preventDefault();
      if (inputValue.trim() && !skills.includes(inputValue.trim())) {
        updateSkills([...skills, inputValue.trim()]);
        setInputValue('');
      }
    }
  };

  const removeSkill = (skillToRemove) => {
    updateSkills(skills.filter(s => s !== skillToRemove));
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-2xl border border-indigo-100">
        <div className="flex items-start gap-4">
          <div className="bg-white p-3 rounded-xl shadow-sm text-indigo-600">
            <Sparkles size={24} />
          </div>
          <div>
            <h4 className="text-lg font-semibold text-slate-800 mb-1">AI Assistant Ready</h4>
            <p className="text-slate-600 text-sm">
              You've entered your core details. Our AI can now help refine your content and suggest related skills. Complete your skill list below.
            </p>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Add Skills</label>
        <div className="flex gap-2">
          <input 
            type="text" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleAddSkill}
            className="flex-1 px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
            placeholder="e.g. React, Node.js, Project Management..." 
          />
          <button 
            onClick={handleAddSkill}
            className="px-6 py-3 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 transition-colors"
          >
            Add
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        <AnimatePresence>
          {skills.map((skill, i) => (
            <motion.div
              key={skill}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="group flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-full shadow-sm"
            >
              <span className="text-sm font-medium text-slate-700">{skill}</span>
              <button 
                onClick={() => removeSkill(skill)}
                className="text-slate-400 hover:text-red-500 transition-colors"
              >
                <X size={14} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SkillsForm;
