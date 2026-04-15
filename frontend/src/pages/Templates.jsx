import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { FilePlus, Star, Zap, Users } from 'lucide-react';
import { useResume } from '../context/ResumeContext';

const Templates = () => {
  const navigate = useNavigate();
  const { updateTemplateId } = useResume();

  const handleTemplateSelect = (id) => {
    updateTemplateId(id);
    navigate('/builder');
  };

  const templates = [
    { id: 'professional', name: 'Professional', color: 'from-orange-500 to-orange-600', uses: '2.3M+' },
    { id: 'modern', name: 'Modern', color: 'from-orange-600 to-red-500', uses: '1.8M+' },
    { id: 'creative', name: 'Creative', color: 'from-orange-400 to-orange-500', uses: '1.2M+' },
    { id: 'minimalist', name: 'Minimalist', color: 'from-gray-500 to-slate-500', uses: '980K+' },
    { id: 'executive', name: 'Executive', color: 'from-orange-600 to-orange-700', uses: '850K+' },
    { id: 'tech', name: 'Tech', color: 'from-green-500 to-emerald-500', uses: '750K+' },
    { id: 'elegant', name: 'Elegant', color: 'from-rose-500 to-pink-500', uses: '640K+' },
    { id: 'bold', name: 'Bold', color: 'from-yellow-500 to-orange-500', uses: '520K+' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f1419] via-[#1a1f2e] to-[#0f1419] flex flex-col items-center py-20 px-6 font-sans text-[#e8ecf1]">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl w-full text-center mb-16"
      >
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-[#e8ecf1] to-[#a0aec0] bg-clip-text text-transparent">
          Choose Your Resume Template
        </h1>
        <p className="text-xl text-[#cbd5e1] font-medium">
          All templates are ATS-optimized and designed to get you noticed by recruiters
        </p>
      </motion.div>

      {/* Quick Start Options */}
      <div className="max-w-5xl w-full flex justify-center mb-24">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          onClick={() => handleTemplateSelect('template1')} 
          className="group cursor-pointer"
        >
          <div className="bg-gradient-to-br from-[#2d3748] to-[#1a202c] border border-[#3d4a5c] rounded-2xl p-10 flex flex-col items-center text-center h-full group-hover:border-orange-500 group-hover:shadow-2xl group-hover:shadow-orange-500/20 transition-all duration-300">
            <motion.div 
              whileHover={{ scale: 1.1 }}
              className="w-20 h-20 rounded-full bg-gradient-to-r from-orange-500/20 to-orange-600/20 text-orange-400 flex items-center justify-center mb-6 border border-orange-500/30"
            >
              <FilePlus size={40} />
            </motion.div>
            <h2 className="text-2xl font-bold mb-3">Create from Scratch</h2>
            <p className="text-[#cbd5e1] mb-8 font-medium">Start fresh with our guided step-by-step builder. Perfect for new job seekers or career changers.</p>
            <span className="px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-bold mt-auto w-full group-hover:shadow-lg group-hover:shadow-orange-500/50 transition-all">
              Start Building
            </span>
          </div>
        </motion.div>


      </div>

      {/* Templates Grid */}
      <div className="max-w-7xl w-full">
        <motion.h2 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-3xl font-extrabold mb-4 text-center border-t border-[#3d4a5c] pt-16"
        >
          Popular Professional Templates
        </motion.h2>
        <p className="text-center text-[#cbd5e1] mb-12 text-lg">Used by millions of job seekers worldwide</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {templates.map((tpl, idx) => (
            <motion.div 
              key={tpl.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => handleTemplateSelect(tpl.id)}
              className="group cursor-pointer"
            >
              <div className="bg-gradient-to-br from-[#2d3748] to-[#1a202c] border border-[#3d4a5c] p-4 rounded-xl group-hover:border-orange-500 group-hover:shadow-2xl group-hover:shadow-orange-500/20 transition-all duration-300 h-full flex flex-col overflow-hidden">
                {/* Template Preview */}
                <div className={`bg-gradient-to-br ${tpl.color} aspect-[3/4] w-full rounded-lg mb-4 flex items-center justify-center p-4 relative overflow-hidden group-hover:scale-105 transition-transform duration-300`}>
                  <div className="absolute inset-0 opacity-20 bg-white"></div>
                  <div className="relative z-10 w-full h-full bg-white/10 backdrop-blur-sm flex flex-col p-3 rounded">
                    <div className="w-1/2 h-3 bg-white/30 mb-2 rounded"></div>
                    <div className="w-full h-1 bg-white/20 mb-1 rounded"></div>
                    <div className="w-3/4 h-1 bg-white/20 mb-4 rounded"></div>
                    <div className="flex gap-2 flex-1">
                      <div className="w-1/4 bg-white/10 rounded"></div>
                      <div className="flex-1 flex flex-col gap-1">
                        <div className="w-full h-1 bg-white/20 rounded"></div>
                        <div className="w-full h-1 bg-white/20 rounded"></div>
                        <div className="w-2/3 h-1 bg-white/20 rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Template Info */}
                <div className="flex-1 flex flex-col">
                  <h3 className="font-bold text-lg text-[#e8ecf1] mb-2">{tpl.name}</h3>
                  <div className="flex items-center gap-1 text-[#94a3b8] text-sm mb-4">
                    <Users size={16} />
                    <span>{tpl.uses} used</span>
                  </div>
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-[#0f1419]/90 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-xl backdrop-blur-sm">
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-bold shadow-lg hover:shadow-xl transition-all"
                    >
                      Use Template
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Features Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-5xl w-full mt-24 bg-gradient-to-r from-orange-600/20 to-orange-700/20 border border-orange-500/30 rounded-2xl p-8 md:p-12 backdrop-blur-sm"
      >
        <h3 className="text-2xl font-bold text-[#e8ecf1] mb-8 text-center">Why Choose Our Templates?</h3>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="flex items-start gap-4">
            <Zap className="text-[#fbbf24] flex-shrink-0 mt-1" size={24} />
            <div>
              <h4 className="font-bold text-[#e8ecf1] mb-2">ATS-Optimized</h4>
              <p className="text-[#cbd5e1]">All templates pass ATS systems and get through keyword scanning</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Star className="text-[#34d399] flex-shrink-0 mt-1" size={24} />
            <div>
              <h4 className="font-bold text-[#e8ecf1] mb-2">Recruiter-Approved</h4>
              <p className="text-[#cbd5e1]">Designed by hiring professionals and proven to get interviews</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Users className="text-[#60a5fa] flex-shrink-0 mt-1" size={24} />
            <div>
              <h4 className="font-bold text-[#e8ecf1] mb-2">Used Millions of Times</h4>
              <p className="text-[#cbd5e1]">Join millions of successful job seekers who landed their dream jobs</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Templates;
