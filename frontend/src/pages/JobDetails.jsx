import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import jobAPI from '../api/jobAPI';
import {
  MapPin,
  Briefcase,
  DollarSign,
  Calendar,
  Globe,
  Share2,
  Flag,
  Bookmark,
  ArrowLeft,
  Clock,
  Users
} from 'lucide-react';

const JobDetails = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [applying, setApplying] = useState(false);
  const [applicationData, setApplicationData] = useState({
    coverLetter: '',
    resumeUrl: ''
  });

  useEffect(() => {
    fetchJobDetails();
  }, [jobId]);

  const fetchJobDetails = async () => {
    try {
      setLoading(true);
      const response = await jobAPI.getJobById(jobId);
      setJob(response.data);
      setError('');
    } catch (err) {
      setError('Failed to load job details');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleApplicationChange = (e) => {
    const { name, value } = e.target;
    setApplicationData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitApplication = async (e) => {
    e.preventDefault();
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      setApplying(true);
      await jobAPI.applyForJob(jobId, applicationData, token);
      alert('Application submitted successfully!');
      setShowApplicationForm(false);
      setApplicationData({ coverLetter: '', resumeUrl: '' });
    } catch (err) {
      alert(err.response?.data?.message || 'Error submitting application');
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-gray-600">Loading job details...</div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center">
        <div className="text-red-600 mb-4">{error}</div>
        <button
          onClick={() => navigate('/jobs')}
          className="bg-orange-600 text-white px-6 py-2 rounded-lg"
        >
          Back to Jobs
        </button>
      </div>
    );
  }

  const formatSalary = (salary) => {
    if (!salary || !salary.min) return 'Not specified';
    const min = (salary.min / 1000).toFixed(0);
    const max = salary.max ? (salary.max / 1000).toFixed(0) : min;
    return `$${min}K - $${max}K ${salary.currency}`;
  };

  const isDeadlinePassed = job.applicationDeadline && new Date(job.applicationDeadline) < new Date();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Button */}
        <button
          onClick={() => navigate('/jobs')}
          className="flex items-center gap-2 text-orange-600 hover:text-orange-800 mb-6 transition"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Jobs
        </button>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Job Details */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-8">
              {/* Job Header */}
              <div className="mb-8">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">{job.title}</h1>
                    <p className="text-xl text-gray-600">{job.company}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                      <Bookmark className="w-5 h-5 text-gray-600" />
                    </button>
                    <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                      <Share2 className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                </div>

                {!job.isActive && (
                  <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-2 rounded-lg text-sm mb-4">
                    This job posting is no longer active
                  </div>
                )}
              </div>

              {/* Key Info */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 pb-8 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-orange-600" />
                  <div>
                    <p className="text-gray-600 text-sm">Location</p>
                    <p className="font-semibold text-gray-800">{job.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Briefcase className="w-5 h-5 text-orange-600" />
                  <div>
                    <p className="text-gray-600 text-sm">Type</p>
                    <p className="font-semibold text-gray-800">{job.jobType}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-orange-600" />
                  <div>
                    <p className="text-gray-600 text-sm">Level</p>
                    <p className="font-semibold text-gray-800">{job.experienceLevel}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <DollarSign className="w-5 h-5 text-orange-600" />
                  <div>
                    <p className="text-gray-600 text-sm">Salary</p>
                    <p className="font-semibold text-gray-800">{formatSalary(job.salary)}</p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Job Description</h2>
                <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{job.description}</p>
              </div>

              {/* Responsibilities */}
              {job.responsibilities && job.responsibilities.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Responsibilities</h2>
                  <ul className="space-y-2">
                    {job.responsibilities.map((resp, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="text-orange-600 font-bold mt-1">•</span>
                        <span className="text-gray-700">{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Requirements */}
              {job.requirements && job.requirements.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Requirements</h2>
                  <ul className="space-y-2">
                    {job.requirements.map((req, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="text-orange-600 font-bold mt-1">•</span>
                        <span className="text-gray-700">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Skills */}
              {job.skills && job.skills.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Required Skills</h2>
                  <div className="flex flex-wrap gap-2">
                    {job.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Benefits */}
              {job.benefits && job.benefits.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">Benefits</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {job.benefits.map((benefit, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 p-3 bg-green-50 rounded-lg border border-green-200"
                      >
                        <span className="text-green-600">✓</span>
                        <span className="text-gray-700">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Employer Info */}
            <div className="bg-white rounded-lg shadow-lg p-8 mt-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">About the Employer</h2>
              <div className="flex items-start gap-4">
                {job.employer.companyLogo && (
                  <img
                    src={job.employer.companyLogo}
                    alt={job.employer.companyName}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                )}
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800">{job.employer.companyName}</h3>
                  {job.employer.companyDescription && (
                    <p className="text-gray-600 mt-2">{job.employer.companyDescription}</p>
                  )}
                  {job.employer.companyWebsite && (
                    <a
                      href={job.employer.companyWebsite}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-orange-600 hover:text-orange-800 mt-2 inline-flex items-center gap-1"
                    >
                      <Globe className="w-4 h-4" />
                      Visit Website
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Application Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-6">
              {/* Job Info Summary */}
              <div className="mb-6 space-y-3">
                <div className="flex items-center gap-2 text-gray-700">
                  <Clock className="w-5 h-5 text-gray-400" />
                  <span className="text-sm">Posted on {new Date(job.postedDate).toLocaleDateString()}</span>
                </div>
                {job.applicationDeadline && (
                  <div className="flex items-center gap-2 text-gray-700">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <span className="text-sm">
                      Deadline: {new Date(job.applicationDeadline).toLocaleDateString()}
                    </span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-gray-700">
                  <Users className="w-5 h-5 text-gray-400" />
                  <span className="text-sm">{job.views} views</span>
                </div>
              </div>

              {/* Apply Button */}
              {!isDeadlinePassed ? (
                <>
                  {!showApplicationForm ? (
                    <button
                      onClick={() => setShowApplicationForm(true)}
                      disabled={!job.isActive}
                      className="w-full bg-orange-600 hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 rounded-lg transition mb-3"
                    >
                      Apply Now
                    </button>
                  ) : (
                    <form onSubmit={handleSubmitApplication} className="space-y-4 mb-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Resume URL
                        </label>
                        <input
                          type="url"
                          name="resumeUrl"
                          value={applicationData.resumeUrl}
                          onChange={handleApplicationChange}
                          placeholder="https://..."
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Cover Letter
                        </label>
                        <textarea
                          name="coverLetter"
                          value={applicationData.coverLetter}
                          onChange={handleApplicationChange}
                          rows="4"
                          placeholder="Tell us about yourself..."
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={applying}
                        className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white font-bold py-2 rounded-lg transition"
                      >
                        {applying ? 'Submitting...' : 'Submit Application'}
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setShowApplicationForm(false);
                          setApplicationData({ coverLetter: '', resumeUrl: '' });
                        }}
                        className="w-full border border-gray-300 text-gray-700 font-bold py-2 rounded-lg hover:bg-gray-50 transition"
                      >
                        Cancel
                      </button>
                    </form>
                  )}
                </>
              ) : (
                <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg text-sm">
                  Application deadline has passed
                </div>
              )}

              <button className="w-full border border-gray-300 text-gray-700 font-bold py-2 rounded-lg hover:bg-gray-50 transition flex items-center justify-center gap-2">
                <Flag className="w-4 h-4" />
                Report Job
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
