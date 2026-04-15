import { useResume } from '../../context/ResumeContext';
import { useState } from 'react';

import API from '../../api/axios';

const PersonalInfoForm = () => {
  const { resumeData, updatePersonalInfo } = useResume();
  const { personalInfo, experience, skills } = resumeData;


  const handleChange = (e) => {
    const { name, value } = e.target;
    updatePersonalInfo({ [name]: value });
  };



  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">First Name</label>
          <input 
            type="text" 
            name="firstName"
            value={personalInfo.firstName || ''}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
            placeholder="John" 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Last Name</label>
          <input 
            type="text" 
            name="lastName"
            value={personalInfo.lastName || ''}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
            placeholder="Doe" 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
          <input 
            type="email" 
            name="email"
            value={personalInfo.email || ''}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
            placeholder="john@example.com" 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number</label>
          <input 
            type="tel" 
            name="phone"
            value={personalInfo.phone || ''}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
            placeholder="+1 (555) 000-0000" 
          />
        </div>
        <div className="md:col-span-2 relative">
          <label className="block text-sm font-medium text-slate-700 mb-2">Professional Summary</label>
          <textarea 
            name="summary"
            value={personalInfo.summary || ''}
            onChange={handleChange}
            rows="5"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all resize-none"
            placeholder="A brief summary of your professional background and goals..." 
          ></textarea>

        </div>
      </div>
    </div>
  );
};

export default PersonalInfoForm;
