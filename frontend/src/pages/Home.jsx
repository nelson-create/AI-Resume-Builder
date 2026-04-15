import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FileText, Wand2, Search, BarChart3, LayoutTemplate, Briefcase, Sparkles, CheckCircle, ArrowRight } from 'lucide-react';

const Home = () => {
  return (
    <div className="w-full flex flex-col items-center flex-grow bg-gradient-to-b from-[#0f1419] via-[#1a1f2e] to-[#0f1419] font-sans text-[#e8ecf1] dark">
      {/* Hero Section with enhanced animations */}
      <section className="w-full relative py-20 lg:py-32 overflow-hidden flex justify-center text-center px-6">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-20 left-10 w-96 h-96 bg-orange-600 rounded-full filter blur-3xl opacity-10"
          />
          <motion.div
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 10, repeat: Infinity, delay: 2 }}
            className="absolute bottom-20 right-10 w-80 h-80 bg-orange-700 rounded-full filter blur-3xl opacity-10"
          />
        </div>
        
        <div className="max-w-4xl z-10 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-600/10 to-orange-700/10 border border-orange-500/30 text-orange-400 font-semibold text-sm mb-8"
          >
            <Sparkles size={16} />
            <span>AI-Powered Resume Builder</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight mb-6 bg-gradient-to-r from-[#e8ecf1] to-[#a0aec0] bg-clip-text text-transparent"
          >
            Build Your Perfect Resume in Minutes
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-[#cbd5e1] mb-10 max-w-2xl font-medium"
          >
            Create a stunning, ATS-optimized resume with our AI-powered builder. Choose from 50+ professional templates and land your dream job.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link to="/templates">
              <button className="px-10 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-bold text-lg hover:shadow-2xl hover:shadow-orange-500/50 hover:-translate-y-1 transition-all duration-300 flex items-center gap-2 group">
                Create My Resume
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            <Link to="/templates">
              <button className="px-10 py-4 bg-white/10 backdrop-blur-sm text-white rounded-lg font-bold text-lg border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-300">
                View Templates
              </button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8 flex items-center gap-2 text-[#94a3b8]"
          >
            <CheckCircle size={20} className="text-green-400" />
            <span className="font-medium">Over 2 million resumes created • Join now for free</span>
          </motion.div>
        </div>
      </section>

      {/* Features Section - Dark themed */}
      <section className="w-full py-24 px-6 bg-[#1a1f2e] border-t border-[#2d3748]">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-extrabold mb-4 text-[#e8ecf1]"
          >
            Why Choose Our Resume Builder?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[#cbd5e1] text-lg font-medium max-w-2xl mx-auto"
          >
            Everything you need to create a professional resume that passes ATS systems and impresses recruiters.
          </motion.p>
        </div>
        
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: <LayoutTemplate className="text-[#60a5fa]" size={32} />,
              title: 'Professional Templates',
              desc: 'Choose from 50+ recruiter-approved templates designed to pass ATS systems and impress hiring managers.'
            },
            {
              icon: <Wand2 className="text-[#a78bfa]" size={32} />,
              title: 'AI Content Generator',
              desc: 'Let AI suggest professional bullet points based on your job title and experience level.'
            },
            {
              icon: <Search className="text-[#34d399]" size={32} />,
              title: 'ATS Optimization',
              desc: 'Real-time scoring shows how your resume ranks against ATS algorithms used by recruiters.'
            },
            {
              icon: <BarChart3 className="text-[#fbbf24]" size={32} />,
              title: 'Download & Share',
              desc: 'Export as PDF, Word, or get a shareable link to send directly to employers.'
            },
            {
              icon: <Briefcase className="text-[#f87171]" size={32} />,
              title: 'Industry-Specific',
              desc: 'Customized templates and content for IT, Marketing, Sales, Healthcare, and 100+ industries.'
            },
            {
              icon: <FileText className="text-[#818cf8]" size={32} />,
              title: 'Cover Letters',
              desc: 'Generate matching cover letters with AI and download in multiple formats.'
            }
          ].map((f, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-8 rounded-xl bg-gradient-to-br from-[#2d3748] to-[#1a202c] border border-[#3d4a5c] hover:border-orange-500/50 hover:shadow-lg hover:shadow-orange-500/10 transition-all duration-300 flex flex-col items-start text-left"
            >
              <div className="bg-[#2d3748] w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                {f.icon}
              </div>
              <h3 className="text-xl font-bold text-[#e8ecf1] mb-3">{f.title}</h3>
              <p className="text-[#cbd5e1] leading-relaxed font-medium">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Templates Preview Section */}
      <section className="w-full py-24 px-6 bg-gradient-to-b from-[#0f1419] to-[#1a1f2e] border-t border-[#2d3748]">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-extrabold mb-4 text-[#e8ecf1]">Choose Your Perfect Template</h2>
            <p className="text-[#cbd5e1] text-lg">Each template is ATS-optimized and proven to get results</p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {['Professional', 'Modern', 'Creative', 'Executive', 'Minimalist', 'Tech'].map((template, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative overflow-hidden rounded-lg border border-[#3d4a5c] hover:border-[#60a5fa] transition-all duration-300 cursor-pointer"
              >
                <div className="aspect-[9/12] bg-gradient-to-br from-[#2d3748] to-[#1a202c] p-6 flex flex-col items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f1419]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button className="px-6 py-2 bg-[#3b82f6] text-white rounded-lg font-bold hover:bg-[#2563eb] transition-colors">
                      Use Template
                    </button>
                  </div>
                  <FileText size={48} className="text-[#60a5fa] mb-4 opacity-80 group-hover:opacity-100 transition-opacity" />
                  <h3 className="text-lg font-bold text-[#e8ecf1] text-center">{template}</h3>
                  <p className="text-sm text-[#94a3b8] mt-2">Best for professionals</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full py-24 bg-[#1a1f2e] px-6 border-t border-[#2d3748] text-[#e8ecf1] text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-extrabold mb-16"
        >
          Three Steps to Your Perfect Resume
        </motion.h2>
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 relative">
          {[
            {
              num: '1',
              title: 'Pick a Template',
              desc: 'Choose from 50+ professionally designed templates tailored to your industry'
            },
            {
              num: '2',
              title: 'Fill Your Details',
              desc: 'Use AI suggestions to auto-populate your experience and skills'
            },
            {
              num: '3',
              title: 'Download & Apply',
              desc: 'Export as PDF or Word, or share directly with employers'
            }
          ].map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="flex flex-col items-center"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-20 h-20 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center text-3xl font-bold mb-6 text-white shadow-lg shadow-orange-500/30"
              >
                {step.num}
              </motion.div>
              <h3 className="text-xl font-bold mb-3">{step.title}</h3>
              <p className="text-[#cbd5e1] font-medium">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
