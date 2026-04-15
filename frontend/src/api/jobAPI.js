import axios from 'axios';

const API_BASE = 'http://localhost:5000/api/jobs';

const jobAPI = {
  // Fetch all jobs with filters
  getAllJobs: (filters = {}) => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });
    return axios.get(`${API_BASE}?${params}`);
  },

  // Get single job by ID
  getJobById: (jobId) => {
    return axios.get(`${API_BASE}/${jobId}`);
  },

  // Create a new job (employer only)
  createJob: (jobData, token) => {
    return axios.post(API_BASE, jobData, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  // Update a job (employer only)
  updateJob: (jobId, jobData, token) => {
    return axios.put(`${API_BASE}/${jobId}`, jobData, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  // Delete a job (employer only)
  deleteJob: (jobId, token) => {
    return axios.delete(`${API_BASE}/${jobId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  // Apply for a job
  applyForJob: (jobId, applicationData, token) => {
    return axios.post(`${API_BASE}/${jobId}/apply`, applicationData, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  // Get applications for a job (employer only)
  getJobApplications: (jobId, filters = {}, token) => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });
    return axios.get(`${API_BASE}/${jobId}/applications?${params}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  // Update application status (employer only)
  updateApplicationStatus: (applicationId, updateData, token) => {
    return axios.put(`${API_BASE}/application/${applicationId}`, updateData, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  // Get user's applications
  getUserApplications: (filters = {}, token) => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });
    return axios.get(`${API_BASE}/user/applications/list?${params}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  // Get employer's posted jobs
  getEmployerJobs: (filters = {}, token) => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });
    return axios.get(`${API_BASE}/employer/jobs/list?${params}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
};

export default jobAPI;
