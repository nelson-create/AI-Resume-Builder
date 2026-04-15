import { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText, Target, Activity, CheckCircle, AlertTriangle, Loader2 } from 'lucide-react';
import API from '../api/axios';

const ResumeUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [atsResult, setAtsResult] = useState(null);
  const [error, setError] = useState(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Check file type
      const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword'];
      if (!allowedTypes.includes(file.type)) {
        setError('Please select a PDF or Word document (.docx or .doc)');
        return;
      }

      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('File size must be less than 5MB');
        return;
      }

      setSelectedFile(file);
      setError(null);
      setAtsResult(null);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile) {
      setError('Please select a resume file first');
      return;
    }

    try {
      setIsAnalyzing(true);
      setError(null);

      const formData = new FormData();
      formData.append('resume', selectedFile);

      const response = await API.post('/resume/analyze-upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setAtsResult(response.data);
    } catch (error) {
      console.error(error);
      const msg = error.response?.data?.message || 'Failed to analyze resume.';
      setError(msg);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center flex-grow bg-gradient-to-b from-[#0f1419] via-[#1a1f2e] to-[#0f1419] font-sans text-[#e8ecf1] dark min-h-screen py-20 px-6">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-6 bg-gradient-to-r from-[#e8ecf1] to-[#a0aec0] bg-clip-text text-transparent">
            Upload & Analyze Your Resume
          </h1>
          <p className="text-lg md:text-xl text-[#cbd5e1] mb-8 max-w-2xl mx-auto font-medium">
            Upload your existing resume and get an instant ATS score analysis to see how well it performs with applicant tracking systems.
          </p>
        </motion.div>

        {/* Upload Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-[#2d3748] to-[#1a202c] rounded-2xl p-8 shadow-2xl shadow-orange-500/20 border border-orange-500/30 mb-8"
        >
          <div className="text-center mb-6">
            <Upload size={48} className="text-orange-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-[#e8ecf1] mb-2">Upload Your Resume</h3>
            <p className="text-[#cbd5e1]">Supported formats: PDF, DOCX, DOC (Max 5MB)</p>
          </div>

          {/* File Input */}
          <div className="mb-6">
            <label
              htmlFor="resume-upload"
              className="block w-full p-8 border-2 border-dashed border-orange-500/50 rounded-xl cursor-pointer hover:border-orange-400 hover:bg-orange-500/5 transition-all duration-300"
            >
              <div className="text-center">
                {selectedFile ? (
                  <div className="flex items-center justify-center gap-3">
                    <FileText size={24} className="text-green-400" />
                    <span className="text-[#e8ecf1] font-medium">{selectedFile.name}</span>
                    <span className="text-[#94a3b8] text-sm">({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)</span>
                  </div>
                ) : (
                  <div>
                    <Upload size={32} className="text-orange-400 mx-auto mb-2" />
                    <p className="text-[#cbd5e1]">Click to select your resume file</p>
                  </div>
                )}
              </div>
            </label>
            <input
              id="resume-upload"
              type="file"
              accept=".pdf,.docx,.doc"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          {/* Analyze Button */}
          <div className="text-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAnalyze}
              disabled={isAnalyzing || !selectedFile}
              className="px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-bold text-lg hover:shadow-2xl hover:shadow-orange-500/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 mx-auto"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Target size={20} />
                  Check ATS Score
                </>
              )}
            </motion.button>
          </div>
        </motion.div>

        {/* ATS Results */}
        {atsResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {/* Score Ring */}
            <div className="col-span-1 bg-white border border-slate-200 rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-sm">
              <h4 className="text-slate-500 font-semibold mb-4 uppercase tracking-wider text-xs">Overall ATS Score</h4>
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
                {atsResult.score > 80 ? 'Excellent!' : atsResult.score > 60 ? 'Good' : 'Needs Improvement'}
              </p>
            </div>

            <div className="col-span-1 md:col-span-2 space-y-4">
              {/* Issues Found */}
              {atsResult.issues && atsResult.issues.length > 0 && (
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                  <h4 className="text-sm font-bold flex items-center gap-2 text-slate-800 mb-3">
                    <AlertTriangle size={16} className="text-amber-500" /> Issues Found
                  </h4>
                  <ul className="space-y-2">
                    {atsResult.issues.map((issue, i) => (
                      <li key={i} className="text-sm text-slate-600 flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 flex-shrink-0"></span>
                        {issue}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Strengths */}
              {atsResult.strengths && atsResult.strengths.length > 0 && (
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                  <h4 className="text-sm font-bold flex items-center gap-2 text-slate-800 mb-3">
                    <CheckCircle size={16} className="text-emerald-500" /> Strengths
                  </h4>
                  <ul className="space-y-2">
                    {atsResult.strengths.map((strength, i) => (
                      <li key={i} className="text-sm text-slate-600 flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0"></span>
                        {strength}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Suggestions */}
              {atsResult.suggestions && atsResult.suggestions.length > 0 && (
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                  <h4 className="text-sm font-bold flex items-center gap-2 text-slate-800 mb-3">
                    <Activity size={16} className="text-indigo-500" /> Improvement Suggestions
                  </h4>
                  <ul className="space-y-2">
                    {atsResult.suggestions.map((suggestion, i) => (
                      <li key={i} className="text-sm text-slate-600 flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 flex-shrink-0"></span>
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ResumeUpload;