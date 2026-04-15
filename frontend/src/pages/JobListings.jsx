import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jobAPI from '../api/jobAPI';
import { MapPin, Briefcase, DollarSign, Clock, Search, Filter } from 'lucide-react';

const JobListings = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [pagination, setPagination] = useState({});

  const [filters, setFilters] = useState({
    searchTerm: '',
    category: '',
    location: '',
    jobType: '',
    experienceLevel: '',
    page: 1,
    limit: 10
  });

  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchJobs();
  }, [filters.page]);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await jobAPI.getAllJobs(filters);
      setJobs(response.data.jobs);
      setPagination(response.data.pagination);
      setError('');
    } catch (err) {
      setError('Failed to load jobs');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value,
      page: 1 // Reset to first page when filtering
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchJobs();
  };

  const formatSalary = (salary) => {
    if (!salary || !salary.min) return 'Not specified';
    const min = (salary.min / 1000).toFixed(0);
    const max = salary.max ? (salary.max / 1000).toFixed(0) : min;
    return `$${min}K - $${max}K ${salary.currency}`;
  };

  const timeAgo = (date) => {
    const now = new Date();
    const posted = new Date(date);
    const diffInDays = Math.floor((now - posted) / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    return `${Math.floor(diffInDays / 30)} months ago`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Job Opportunities</h1>
          <p className="text-gray-600">Find your next career opportunity</p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="mb-8">
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex gap-2">
              <div className="flex-1 flex items-center border border-gray-300 rounded-lg px-4 py-2">
                <Search className="w-5 h-5 text-gray-400 mr-2" />
                <input
                  type="text"
                  name="searchTerm"
                  value={filters.searchTerm}
                  onChange={handleFilterChange}
                  placeholder="Job title, company, or keyword..."
                  className="flex-1 outline-none text-gray-700"
                />
              </div>
              <button
                type="submit"
                className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg transition"
              >
                Search
              </button>
              <button
                type="button"
                onClick={() => setShowFilters(!showFilters)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition flex items-center gap-2"
              >
                <Filter className="w-5 h-5" />
                Filters
              </button>
            </div>

            {/* Filters */}
            {showFilters && (
              <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t border-gray-200">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    name="category"
                    value={filters.category}
                    onChange={handleFilterChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="">All Categories</option>
                    <option>Technology</option>
                    <option>Healthcare</option>
                    <option>Finance</option>
                    <option>Marketing</option>
                    <option>Sales</option>
                    <option>Education</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={filters.location}
                    onChange={handleFilterChange}
                    placeholder="City or Remote"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Job Type
                  </label>
                  <select
                    name="jobType"
                    value={filters.jobType}
                    onChange={handleFilterChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="">All Types</option>
                    <option>Full-time</option>
                    <option>Part-time</option>
                    <option>Contract</option>
                    <option>Temporary</option>
                    <option>Internship</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Experience Level
                  </label>
                  <select
                    name="experienceLevel"
                    value={filters.experienceLevel}
                    onChange={handleFilterChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="">All Levels</option>
                    <option>Entry Level</option>
                    <option>Mid Level</option>
                    <option>Senior</option>
                    <option>Executive</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        </form>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
            {error}
          </div>
        )}

        {/* Jobs Grid */}
        <div className="space-y-4">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="text-gray-600">Loading jobs...</div>
            </div>
          ) : jobs.length > 0 ? (
            jobs.map(job => (
              <div
                key={job._id}
                onClick={() => navigate(`/jobs/${job._id}`)}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg hover:scale-101 transition cursor-pointer"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 hover:text-orange-600">
                      {job.title}
                    </h3>
                    <p className="text-gray-600 font-medium">{job.company}</p>
                  </div>
                  <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                    {job.jobType}
                  </span>
                </div>

                <div className="flex flex-wrap gap-4 mb-4 text-gray-600">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{job.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Briefcase className="w-4 h-4" />
                    <span className="text-sm">{job.experienceLevel}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSign className="w-4 h-4" />
                    <span className="text-sm">{formatSalary(job.salary)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{timeAgo(job.postedDate)}</span>
                  </div>
                </div>

                <p className="text-gray-600 mb-4 line-clamp-2">{job.description}</p>

                {job.skills && job.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {job.skills.slice(0, 4).map((skill, idx) => (
                      <span
                        key={idx}
                        className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                      >
                        {skill}
                      </span>
                    ))}
                    {job.skills.length > 4 && (
                      <span className="text-gray-600 text-xs">
                        +{job.skills.length - 4} more
                      </span>
                    )}
                  </div>
                )}

                <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                  <span className="text-gray-500 text-xs">{job.views} views</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/jobs/${job._id}`);
                    }}
                    className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-sm transition"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-white rounded-lg">
              <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">No jobs found. Try adjusting your filters.</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {pagination.pages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8">
            <button
              onClick={() => setFilters(prev => ({ ...prev, page: prev.page - 1 }))}
              disabled={pagination.currentPage === 1}
              className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50"
            >
              Previous
            </button>
            {Array.from({ length: pagination.pages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setFilters(prev => ({ ...prev, page }))}
                className={`px-4 py-2 rounded-lg ${
                  pagination.currentPage === page
                    ? 'bg-orange-600 text-white'
                    : 'border border-gray-300 hover:bg-gray-100'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setFilters(prev => ({ ...prev, page: prev.page + 1 }))}
              disabled={pagination.currentPage === pagination.pages}
              className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobListings;
