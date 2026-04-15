import { createContext, useContext, useState } from 'react';

const ResumeContext = createContext();

export const useResume = () => useContext(ResumeContext);

const initialResumeData = {
  personalInfo: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    linkedin: '',
    portfolio: '',
    summary: '',
  },
  experience: [],
  projects: [],
  education: [],
  skills: [],
  templateId: 'template1',
};

export const ResumeProvider = ({ children }) => {
  const [resumeData, setResumeData] = useState(initialResumeData);

  const updatePersonalInfo = (data) => {
    setResumeData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, ...data },
    }));
  };

  const addExperience = (exp) => {
    setResumeData((prev) => ({
      ...prev,
      experience: [...prev.experience, exp],
    }));
  };

  const updateExperience = (index, data) => {
    setResumeData((prev) => {
      const exp = [...prev.experience];
      exp[index] = { ...exp[index], ...data };
      return { ...prev, experience: exp };
    });
  };

  const removeExperience = (index) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index),
    }));
  };

  const addEducation = (edu) => {
    setResumeData((prev) => ({
      ...prev,
      education: [...prev.education, edu],
    }));
  };

  const updateEducation = (index, data) => {
    setResumeData((prev) => {
      const edus = [...prev.education];
      edus[index] = { ...edus[index], ...data };
      return { ...prev, education: edus };
    });
  };

  const removeEducation = (index) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index),
    }));
  };

  const addProject = (project) => {
    setResumeData((prev) => ({
      ...prev,
      projects: [...prev.projects, project],
    }));
  };

  const updateProject = (index, data) => {
    setResumeData((prev) => {
      const projects = [...prev.projects];
      projects[index] = { ...projects[index], ...data };
      return { ...prev, projects };
    });
  };

  const removeProject = (index) => {
    setResumeData((prev) => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index),
    }));
  };

  const updateSkills = (skills) => {
    setResumeData((prev) => ({ ...prev, skills }));
  };

  const updateTemplateId = (templateId) => {
    setResumeData((prev) => ({ ...prev, templateId }));
  };

  return (
    <ResumeContext.Provider value={{
      resumeData,
      setResumeData,
      updatePersonalInfo,
      addExperience,
      updateExperience,
      removeExperience,
      addProject,
      updateProject,
      removeProject,
      addEducation,
      updateEducation,
      removeEducation,
      updateSkills,
      updateTemplateId
    }}>
      {children}
    </ResumeContext.Provider>
  );
};
