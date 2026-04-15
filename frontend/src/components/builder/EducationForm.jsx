import { useResume } from '../../context/ResumeContext';
import { Plus, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

const EducationForm = () => {
  const { resumeData, addEducation, updateEducation, removeEducation } = useResume();
  const { education } = resumeData;

  const handleAdd = () => {
    addEducation({
      school: '',
      degree: '',
      fieldOfStudy: '',
      startDate: '',
      endDate: '',
      description: ''
    });
  };

  return (
    <div className="space-y-8">
      {education.map((edu, index) => (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          key={index} 
          className="p-6 rounded-2xl border border-slate-200 bg-slate-50 relative group"
        >
          <button 
            onClick={() => removeEducation(index)}
            className="absolute top-4 right-4 text-slate-400 hover:text-red-500 transition-colors"
          >
            <Trash2 size={20} />
          </button>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">School / University</label>
              <input 
                type="text" 
                value={edu.school || ''}
                onChange={(e) => updateEducation(index, { school: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-indigo-500 outline-none"
                placeholder="Harvard University" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Degree</label>
              <input 
                type="text" 
                value={edu.degree || ''}
                onChange={(e) => updateEducation(index, { degree: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-indigo-500 outline-none"
                placeholder="Bachelor of Science" 
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-1">Field of Study</label>
              <input 
                type="text" 
                value={edu.fieldOfStudy || ''}
                onChange={(e) => updateEducation(index, { fieldOfStudy: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-indigo-500 outline-none"
                placeholder="Computer Science" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Start Date</label>
              <input 
                type="month" 
                value={edu.startDate || ''}
                onChange={(e) => updateEducation(index, { startDate: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-indigo-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">End Date</label>
              <input 
                type="month" 
                value={edu.endDate || ''}
                onChange={(e) => updateEducation(index, { endDate: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:border-indigo-500 outline-none"
              />
            </div>
          </div>
        </motion.div>
      ))}

      <button 
        onClick={handleAdd}
        className="w-full py-4 border-2 border-dashed border-slate-300 rounded-2xl flex flex-col items-center justify-center text-slate-500 hover:text-indigo-600 hover:border-indigo-400 hover:bg-indigo-50 transition-all gap-2"
      >
        <Plus size={24} />
        <span className="font-medium">Add Education</span>
      </button>
    </div>
  );
};

export default EducationForm;
