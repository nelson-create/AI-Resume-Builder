import { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { Target, Activity, CheckCircle, AlertTriangle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import API from '../../api/axios';

const AtsAnalysisForm = () => {
  const { resumeData } = useResume();
  const [jobDescription, setJobDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [atsResult, setAtsResult] = useState(null);

  const handleAnalyze = async () => {
    if (!jobDescription) {
      alert("Please paste a Job Description to analyze against.");
      return;
    }

    try {
      setIsAnalyzing(true);
      const response = await API.post('/ai/analyze-ats', { jobDescription, resumeData });
      setAtsResult(response.data);
    } catch (error) {
      console.error(error);
      const msg = error.response?.data?.message || 'Failed to run ATS analysis.';
      alert(msg);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6">
        <h4 className="text-lg font-bold text-indigo-900 mb-2 flex items-center gap-2">
          <Target size={20} className="text-indigo-600" /> Target Job Description
        </h4>
        <p className="text-sm text-indigo-700 mb-4">Paste the job description of the position you're applying for. We will analyze your resume against its required keywords and evaluate format completeness.</p>
        <div className="flex flex-col gap-3">
          <textarea 
            rows="5"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-indigo-200 focus:border-indigo-500 outline-none resize-none"
            placeholder="e.g. We are looking for a Senior React Engineer with 5+ years of experience in Node.js, Express, and MongoDB..." 
          ></textarea>
          <div className="flex justify-end">
            <button 
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 disabled:opacity-50 flex items-center gap-2 shadow-sm transition-colors"
            >
              {isAnalyzing ? <Loader2 size={18} className="animate-spin" /> : <Activity size={18} />}
              {isAnalyzing ? 'Analyzing...' : 'Check ATS Score'}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {atsResult && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {/* Score Ring */}
            <div className="col-span-1 bg-white border border-slate-200 rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-sm">
              <h4 className="text-slate-500 font-semibold mb-4 uppercase tracking-wider text-xs">Overall Match</h4>
              <div className="relative w-32 h-32 flex items-center justify-center rounded-full border-[12px] border-indigo-100 mb-4">
                <svg className="absolute inset-0 w-full h-full -rotate-90">
                  <circle
                    cx="50%" cy="50%" r="42%"
                    className="stroke-indigo-600 fill-none transition-all duration-1000 ease-out"
                    strokeWidth="12"
                    strokeDasharray="264"
                    strokeDashoffset={264 - (264 * atsResult.score) / 100}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="text-4xl font-black text-slate-800">{atsResult.score}</div>
              </div>
              <p className={`text-sm font-medium ${atsResult.score > 80 ? 'text-emerald-600' : 'text-amber-500'}`}>
                {atsResult.score > 80 ? 'Excellent Match!' : 'Needs Improvement'}
              </p>
            </div>

            <div className="col-span-1 md:col-span-2 space-y-4">
              {/* Keywords */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                <h4 className="text-sm font-bold flex items-center gap-2 text-slate-800 mb-3">
                  <AlertTriangle size={16} className="text-amber-500" /> Missing Keywords
                </h4>
                <div className="flex flex-wrap gap-2">
                  {atsResult.missingKeywords?.length > 0 ? (
                    atsResult.missingKeywords.map((kw, i) => (
                      <span key={i} className="px-3 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded-full text-xs font-semibold">
                        {kw}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-slate-500">No major keywords missing.</span>
                  )}
                </div>
              </div>

              {/* Suggestions */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                <h4 className="text-sm font-bold flex items-center gap-2 text-slate-800 mb-3">
                  <CheckCircle size={16} className="text-emerald-500" /> Actionable Suggestions
                </h4>
                <ul className="space-y-2">
                  {atsResult.suggestions?.map((sugg, i) => (
                    <li key={i} className="text-sm text-slate-600 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0"></span>
                      {sugg}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AtsAnalysisForm;
