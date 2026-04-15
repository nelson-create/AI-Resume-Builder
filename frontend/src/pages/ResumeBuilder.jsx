import { useState } from 'react';
import { motion } from 'framer-motion';
import PersonalInfoForm from '../components/builder/PersonalInfoForm';
import ExperienceForm from '../components/builder/ExperienceForm';
import ProjectsForm from '../components/builder/ProjectsForm';
import EducationForm from '../components/builder/EducationForm';
import SkillsForm from '../components/builder/SkillsForm';
import AtsAnalysisForm from '../components/builder/AtsAnalysisForm';
import { useResume } from '../context/ResumeContext';
import { Loader2, Download, Save, Sparkles } from 'lucide-react';
import API from '../api/axios';

const ResumeBuilder = () => {
  const [step, setStep] = useState(1);
  const totalSteps = 6;
  const { resumeData } = useResume();
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    try {
      setIsSaving(true);
      await API.post('/resume', resumeData);
      alert('Resume saved successfully!');
    } catch (error) {
      console.error(error);
      // Better error handling
      const errorMsg = error.response?.data?.message || 'Failed to save resume. Please try again.';
      alert(errorMsg);
    } finally {
      setIsSaving(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const nextStep = () => setStep(s => Math.min(s + 1, totalSteps));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  return (
    <div className="flex h-[calc(100vh-80px)] overflow-hidden bg-[#0f1419] print:h-auto print:bg-white print:block">
      {/* Sidebar - Wizard Steps */}
        <div className="w-64 bg-gradient-to-b from-[#2d3748] to-[#1a202c] border-r border-orange-500/30 p-6 hidden md:block print:hidden">
         <h2 className="text-lg font-bold text-[#e8ecf1] mb-8 flex items-center gap-2">
            <Sparkles size={20} className="text-orange-400" />
           Build Resume
         </h2>
         <div className="space-y-4">
           {[
             { num: 1, label: 'Personal Info' },
             { num: 2, label: 'Experience' },
             { num: 3, label: 'Projects' },
             { num: 4, label: 'Education' },
             { num: 5, label: 'Skills & AI' },
             { num: 6, label: 'ATS Analysis' }
           ].map(item => (
            <motion.div 
              key={item.num} 
              whileHover={{ x: 5 }}
              className="flex items-center gap-3 cursor-pointer"
            >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${step >= item.num ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-black shadow-lg shadow-orange-500/70' : 'bg-[#3d4a5c] text-[#94a3b8]'}`}>
                {item.num}
              </div>
              <span className={`font-medium transition-colors ${step >= item.num ? 'text-[#e8ecf1]' : 'text-[#94a3b8]'}`}>
                {item.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Main Form Area */}
      <div className="flex-1 overflow-y-auto p-6 md:p-10 print:hidden">
        <div className="max-w-2xl mx-auto">
          <motion.div 
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-gradient-to-br from-[#2d3748] to-[#1a202c] rounded-2xl p-8 shadow-2xl shadow-orange-500/20 border border-orange-500/30 min-h-[400px]"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-[#e8ecf1]">
                {step === 1 && "Personal Information"}
                {step === 2 && "Work Experience"}
                {step === 3 && "Projects"}
                {step === 4 && "Education"}
                {step === 5 && "Skills & AI Suggestions"}
                {step === 6 && "ATS Optimization Score"}
              </h3>
              
              <div className="flex gap-3">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSave}
                  disabled={isSaving}
                  className="flex items-center gap-2 px-4 py-2 bg-[#3d4a5c] text-[#cbd5e1] rounded-lg hover:bg-[#4d5a6c] transition-colors font-medium text-sm border border-[#4d5a6c]"
                >
                  {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                  Save
                </motion.button>
                 <motion.button 
                   whileHover={{ scale: 1.05 }}
                   whileTap={{ scale: 0.95 }}
                   onClick={handlePrint}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-600 to-red-500 text-black rounded-lg hover:shadow-lg hover:shadow-orange-600/70 transition-all font-medium text-sm"
                 >
                  <Download size={16} />
                  PDF
                </motion.button>
              </div>
            </div>
            
            {step === 1 && <PersonalInfoForm />}
            {step === 2 && <ExperienceForm />}
            {step === 3 && <ProjectsForm />}
            {step === 4 && <EducationForm />}
            {step === 5 && <SkillsForm />}
            {step === 6 && <AtsAnalysisForm />}

              <div className="flex justify-between mt-8 pt-6 border-t border-orange-500/30">
              <motion.button 
                whileHover={step !== 1 ? { x: -3 } : {}}
                whileTap={step !== 1 ? { scale: 0.95 } : {}}
                onClick={prevStep}
                disabled={step === 1}
                className={`px-6 py-2.5 rounded-lg font-medium transition-all ${step === 1 ? 'bg-[#2d3748] text-[#64748b] cursor-not-allowed' : 'bg-[#3d4a5c] text-[#e8ecf1] hover:bg-[#4d5a6c] border border-[#4d5a6c]'}`}
              >
                Back
              </motion.button>
               <motion.button 
                 whileHover={{ scale: 1.05 }}
                 whileTap={{ scale: 0.95 }}
                 onClick={step === totalSteps ? handleSave : nextStep}
                  className="px-6 py-2.5 bg-gradient-to-r from-orange-500 to-orange-400 text-black rounded-lg font-medium hover:shadow-lg hover:shadow-orange-500/70 transition-all"
               >
                {step === totalSteps ? (isSaving ? 'Saving...' : 'Save & Finish') : 'Next Step'}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Real-time Preview Sidebar */}
      <div className="w-1/3 bg-gradient-to-b from-[#2d3748] to-[#1a202c] p-6 hidden lg:block overflow-y-auto text-white print:w-full print:block print:bg-white print:p-0">
         <h2 className="text-lg font-semibold mb-4 text-[#cbd5e1] flex items-center gap-2 print:hidden">
           <span>Live Preview</span>
           <motion.span 
             animate={{ opacity: [0.5, 1, 0.5] }}
             transition={{ duration: 2, repeat: Infinity }}
              className="text-xs bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded-full border border-orange-500/50"
           >
            Auto-updating
          </motion.span>
        </h2>
        
        {/* Template Selector based on resumeData.templateId */}
        {['template1', 'professional'].includes(resumeData.templateId) && <TemplateProfessional data={resumeData} />}
        {['template2', 'modern'].includes(resumeData.templateId) && <TemplateModern data={resumeData} />}
        {['template3', 'creative'].includes(resumeData.templateId) && <TemplateCreative data={resumeData} />}
        {['template4', 'minimalist'].includes(resumeData.templateId) && <TemplateMinimalist data={resumeData} />}
        
        {/* Fallback for templates without dedicated components */}
        {!['template1', 'professional', 'template2', 'modern', 'template3', 'creative', 'template4', 'minimalist'].includes(resumeData.templateId) && <TemplateProfessional data={resumeData} />}
      </div>
    </div>
  );
};

// --- Template Components ---

const TemplateProfessional = ({ data }) => (
  <div className="aspect-[1/1.414] bg-white rounded-sm shadow-2xl origin-top p-8 text-black overflow-hidden flex flex-col print:shadow-none print:scale-100 print:w-full print:h-full print:p-0">
    <div className="border-b-2 border-slate-800 pb-6 mb-6 text-center">
      <h1 className="text-3xl font-bold uppercase tracking-wider text-slate-900 mb-2">
        {data.personalInfo.firstName || 'First'}{' '}{data.personalInfo.lastName || 'Last'}
      </h1>
      <div className="text-[11px] text-slate-600 flex justify-center gap-4 flex-wrap">
        {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
        {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
        {data.personalInfo.address && <span>{data.personalInfo.address}</span>}
      </div>
    </div>

    {data.personalInfo.summary && (
      <section className="mb-4">
        <h2 className="text-xs font-bold text-slate-800 uppercase tracking-widest border-b border-slate-300 mb-2 pb-1">Professional Summary</h2>
        <p className="text-[10px] text-slate-700 text-justify leading-relaxed">{data.personalInfo.summary}</p>
      </section>
    )}
    
    <div className="space-y-6">
      {data.experience.length > 0 && (
        <section>
          <h2 className="text-sm font-bold text-slate-800 uppercase tracking-widest border-b-2 border-slate-300 mb-3 pb-2">Experience</h2>
          <div className="space-y-4">
            {data.experience.map((exp, i) => (
              <div key={i}>
                <div className="flex justify-between items-baseline">
                  <h3 className="text-[11px] font-bold text-slate-900">{exp.title || 'Position'}</h3>
                  <span className="text-[9px] text-slate-500 font-medium">{exp.startDate} - {exp.endDate}</span>
                </div>
                <div className="text-[10px] text-indigo-700 font-medium mb-1">{exp.company}</div>
                <p className="text-[10px] text-slate-600 leading-normal pl-3 relative before:content-[''] before:absolute before:left-0 before:top-1.5 before:w-1 before:h-1 before:bg-slate-400 before:rounded-full">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.projects.length > 0 && (
        <section>
          <h2 className="text-sm font-bold text-slate-800 uppercase tracking-widest border-b-2 border-slate-300 mb-3 pb-2">Projects</h2>
          <div className="space-y-4">
            {data.projects.map((project, i) => (
              <div key={i}>
                <div className="flex justify-between items-baseline">
                  <h3 className="text-[11px] font-bold text-slate-900">{project.name || 'Project Name'}</h3>
                  <span className="text-[9px] text-slate-500 font-medium">{project.startDate} - {project.endDate}</span>
                </div>
                {project.technologies && (
                  <div className="text-[10px] text-indigo-700 font-medium mb-1">{project.technologies}</div>
                )}
                <p className="text-[10px] text-slate-600 leading-normal pl-3 relative before:content-[''] before:absolute before:left-0 before:top-1.5 before:w-1 before:h-1 before:bg-slate-400 before:rounded-full">{project.description}</p>
                {project.link && (
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-[9px] text-orange-600 hover:text-orange-800 underline ml-3">View Project</a>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {data.education.length > 0 && (
        <section>
          <h2 className="text-sm font-bold text-slate-800 uppercase tracking-widest border-b-2 border-slate-300 mb-3 pb-2">Education</h2>
          <div className="space-y-3">
            {data.education.map((edu, i) => (
              <div key={i}>
                <div className="flex justify-between items-baseline">
                  <h3 className="text-[11px] font-bold text-slate-900">{edu.school}</h3>
                  <span className="text-[9px] text-slate-500 font-medium">{edu.startDate} - {edu.endDate}</span>
                </div>
                <div className="text-[10px] text-slate-700 font-medium">{edu.degree} in {edu.fieldOfStudy}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.skills.length > 0 && (
        <section>
          <h2 className="text-sm font-bold text-slate-800 uppercase tracking-widest border-b-2 border-slate-300 mb-3 pb-2">Skills</h2>
          <div className="flex flex-wrap gap-1">
            {data.skills.map((skill, i) => (
              <span key={i} className="text-[9px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded border border-slate-200">{skill}</span>
            ))}
          </div>
        </section>
      )}
    </div>
  </div>
);

const TemplateModern = ({ data }) => (
  <div className="aspect-[1/1.414] bg-white rounded-sm shadow-2xl origin-top p-0 text-black overflow-hidden flex print:shadow-none print:scale-100 print:w-full print:h-full">
    {/* Left Sidebar */}
    <div className="w-1/3 bg-slate-900 text-white p-6 flex flex-col gap-6">
      <div className="pb-4 border-b border-slate-700">
        <h1 className="text-xl font-bold leading-tight uppercase">
          {data.personalInfo.firstName || 'First'}<br/>{data.personalInfo.lastName || 'Last'}
        </h1>
      </div>

      <div className="space-y-3">
        <h2 className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Contact</h2>
        <div className="text-[9px] space-y-1 text-slate-300">
          {data.personalInfo.email && <div className="break-all">{data.personalInfo.email}</div>}
          {data.personalInfo.phone && <div>{data.personalInfo.phone}</div>}
          {data.personalInfo.address && <div>{data.personalInfo.address}</div>}
        </div>
      </div>

      {data.skills.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Expertise</h2>
          <div className="flex flex-col gap-1.5">
            {data.skills.map((skill, i) => (
              <div key={i} className="text-[10px] border-b border-slate-800 pb-1 text-slate-200">{skill}</div>
            ))}
          </div>
        </div>
      )}
    </div>

    {/* Right Content */}
    <div className="flex-1 p-8 overflow-y-auto">
      {/* Professional Summary under heading */}
      {data.personalInfo.summary && (
        <div className="mb-6">
          <p className="text-[10px] text-slate-600 leading-relaxed text-justify italic">{data.personalInfo.summary}</p>
        </div>
      )}

      {data.experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xs font-bold text-slate-800 uppercase tracking-widest mb-3 flex items-center gap-2">
            <span className="w-6 h-px bg-indigo-600"></span> Experience
          </h2>
          <div className="space-y-4">
            {data.experience.map((exp, i) => (
              <div key={i}>
                <div className="flex justify-between items-baseline mb-0.5">
                  <h3 className="text-[11px] font-bold text-slate-900">{exp.title}</h3>
                  <span className="text-[8px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-600 uppercase font-black">{exp.startDate} - {exp.endDate}</span>
                </div>
                <div className="text-[10px] text-indigo-600 font-bold mb-1.5 italic">{exp.company}</div>
                <p className="text-[9px] text-slate-500 leading-relaxed italic">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {data.projects.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xs font-bold text-slate-800 uppercase tracking-widest mb-3 flex items-center gap-2">
            <span className="w-6 h-px bg-indigo-600"></span> Projects
          </h2>
          <div className="space-y-4">
            {data.projects.map((project, i) => (
              <div key={i}>
                <div className="flex justify-between items-baseline mb-0.5">
                  <h3 className="text-[11px] font-bold text-slate-900">{project.name}</h3>
                  <span className="text-[8px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-600 uppercase font-black">{project.startDate} - {project.endDate}</span>
                </div>
                {project.technologies && (
                  <div className="text-[10px] text-indigo-600 font-bold mb-1.5 italic">{project.technologies}</div>
                )}
                <p className="text-[9px] text-slate-500 leading-relaxed italic">{project.description}</p>
                {project.link && (
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-[8px] text-indigo-600 hover:text-indigo-800 underline italic">View Project</a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {data.education.length > 0 && (
        <div>
          <h2 className="text-xs font-bold text-slate-800 uppercase tracking-widest mb-3 flex items-center gap-2">
            <span className="w-6 h-px bg-indigo-600"></span> Education
          </h2>
          <div className="space-y-3">
            {data.education.map((edu, i) => (
              <div key={i}>
                <h3 className="text-[11px] font-bold text-slate-900">{edu.degree} in {edu.fieldOfStudy}</h3>
                <div className="text-[10px] text-slate-600">{edu.school} | {edu.startDate} - {edu.endDate}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  </div>
);

const TemplateCreative = ({ data }) => (
  <div className="aspect-[1/1.414] bg-white rounded-sm shadow-2xl origin-top p-0 text-black overflow-hidden flex flex-col print:shadow-none print:scale-100 print:w-full print:h-full">
    {/* Colored Header */}
    <div className="bg-indigo-600 text-white p-10 flex flex-col items-center">
      <h1 className="text-3xl font-black uppercase tracking-tighter mb-2">
        {data.personalInfo.firstName || 'Creative'}{' '}{data.personalInfo.lastName || 'Mind'}
      </h1>
      <div className="flex gap-4 text-xs font-medium text-indigo-100">
        {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
        {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
      </div>
      {data.personalInfo.summary && (
        <p className="text-xs text-indigo-100 italic leading-relaxed text-center mt-4 max-w-lg">
          "{data.personalInfo.summary}"
        </p>
      )}
    </div>
    
    <div className="p-8 grid grid-cols-12 gap-8 flex-grow">

      <div className="col-span-8 space-y-6">
        <section>
          <h2 className="text-sm font-black text-indigo-600 uppercase mb-3 flex items-center gap-2">Experience</h2>
          <div className="space-y-5 border-l-2 border-indigo-50 pl-5 ml-2">
            {data.experience.map((exp, i) => (
              <div key={i} className="relative">
                <div className="absolute -left-[26px] top-1 w-3 h-3 rounded-full bg-white border-2 border-indigo-600"></div>
                <h3 className="text-xs font-bold text-slate-900">{exp.title} at {exp.company}</h3>
                <div className="text-[9px] text-slate-400 font-bold mb-2">{exp.startDate} - {exp.endDate}</div>
                <p className="text-[10px] text-slate-600 leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-sm font-black text-indigo-600 uppercase mb-3 flex items-center gap-2">Education</h2>
          <div className="space-y-3">
            {data.education.map((edu, i) => (
              <div key={i}>
                <h3 className="text-xs font-bold text-slate-900">{edu.school}</h3>
                <div className="text-[10px] text-slate-600">{edu.degree} in {edu.fieldOfStudy} ({edu.startDate} - {edu.endDate})</div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="col-span-4 bg-slate-50 p-6 rounded-2xl h-fit">
        <h2 className="text-xs font-black text-slate-900 uppercase mb-4 border-b border-slate-200 pb-2">Top Skills</h2>
        <div className="flex flex-col gap-2">
          {data.skills.map((skill, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
              <span className="text-[11px] font-medium text-slate-700">{skill}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const TemplateMinimalist = ({ data }) => (
  <div className="aspect-[1/1.414] bg-white rounded-sm shadow-2xl origin-top p-12 text-black overflow-hidden flex flex-col items-center text-center print:shadow-none print:scale-100 print:w-full print:h-full print:p-8">
    <header className="mb-10 w-full">
      <h1 className="text-3xl font-light tracking-widest uppercase mb-1">
        {data.personalInfo.firstName || 'NAME'} <span className="font-bold">{data.personalInfo.lastName || 'SURNAME'}</span>
      </h1>
      <div className="text-[10px] text-slate-400 uppercase tracking-[px] flex justify-center gap-4">
        {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
        {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
        {data.personalInfo.address && <span>{data.personalInfo.address}</span>}
      </div>
      </header>

      {data.personalInfo.summary && (
        <div className="mb-6 max-w-lg">
          <p className="text-[11px] text-slate-500 leading-relaxed font-serif italic text-center">
            {data.personalInfo.summary}
          </p>
        </div>
      )}

    <div className="w-full space-y-10 text-left px-4">
      {data.experience.length > 0 && (
        <section>
          <h2 className="text-[10px] font-black uppercase tracking-[3px] border-b-2 border-slate-800 inline-block mb-5">Experience</h2>
          <div className="space-y-6">
            {data.experience.map((exp, i) => (
              <div key={i}>
                <div className="flex flex-col mb-1 text-center items-center">
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-tight">{exp.title}</h3>
                  <div className="text-[10px] text-indigo-600 font-medium mb-1">{exp.company}</div>
                  <div className="text-[8px] text-slate-400 font-medium uppercase tracking-widest">{exp.startDate} — {exp.endDate}</div>
                </div>
                <p className="text-[10px] text-slate-600 leading-relaxed text-center max-w-md mx-auto">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.education.length > 0 && (
        <section className="text-center">
          <h2 className="text-[10px] font-black uppercase tracking-[3px] border-b-2 border-slate-800 inline-block mb-5">Education</h2>
          {data.education.map((edu, i) => (
            <div key={i} className="mb-3">
              <h3 className="text-xs font-bold text-slate-900">{edu.school}</h3>
              <p className="text-[10px] text-slate-500">{edu.degree} in {edu.fieldOfStudy}</p>
              <span className="text-[8px] text-slate-400">{edu.startDate} - {edu.endDate}</span>
            </div>
          ))}
        </section>
      )}

      {data.skills.length > 0 && (
        <section className="text-center pb-10">
          <h2 className="text-[10px] font-black uppercase tracking-[3px] border-b-2 border-slate-800 inline-block mb-5">Skills</h2>
          <p className="text-[10px] text-slate-600 leading-relaxed max-w-md mx-auto">
            {data.skills.join(' • ')}
          </p>
        </section>
      )}
    </div>
  </div>
);

export default ResumeBuilder;
