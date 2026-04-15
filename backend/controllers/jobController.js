const Job = require('../models/Job');
const JobApplication = require('../models/JobApplication');
const User = require('../models/User');
const { emitJobPosted, emitJobUpdated, emitJobDeleted, emitNewApplication, emitApplicationStatusChanged } = require('../services/websocketService');

// Create a new job posting
exports.createJob = async (req, res) => {
  try {
    const {
      title,
      description,
      company,
      location,
      jobType,
      experienceLevel,
      salary,
      skills,
      requirements,
      responsibilities,
      benefits,
      category,
      applicationDeadline
    } = req.body;

    // Verify user is an employer
    const user = await User.findById(req.user.id);
    if (!user || user.role !== 'employer') {
      return res.status(403).json({ message: 'Only employers can post jobs' });
    }

    const job = new Job({
      employer: req.user.id,
      title,
      description,
      company: company || user.companyName,
      location,
      jobType,
      experienceLevel,
      salary,
      skills: skills || [],
      requirements: requirements || [],
      responsibilities: responsibilities || [],
      benefits: benefits || [],
      category,
      applicationDeadline: applicationDeadline || null
    });

    await job.save();
    await job.populate('employer', 'name companyName companyLogo');

    // Emit WebSocket event for real-time updates
    emitJobPosted(job);

    res.status(201).json({
      message: 'Job posted successfully',
      job
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error creating job', 
      error: error.message 
    });
  }
};

// Get all active jobs with filtering and pagination
exports.getAllJobs = async (req, res) => {
  try {
    const { 
      category, 
      location, 
      jobType, 
      experienceLevel,
      searchTerm,
      page = 1, 
      limit = 10,
      sortBy = 'postedDate'
    } = req.query;

    const filter = { isActive: true };

    if (category) filter.category = category;
    if (location) filter.location = new RegExp(location, 'i');
    if (jobType) filter.jobType = jobType;
    if (experienceLevel) filter.experienceLevel = experienceLevel;
    if (searchTerm) {
      filter.$or = [
        { title: new RegExp(searchTerm, 'i') },
        { description: new RegExp(searchTerm, 'i') },
        { company: new RegExp(searchTerm, 'i') }
      ];
    }

    const skip = (page - 1) * limit;
    const sortOptions = {};
    
    if (sortBy === 'postedDate') sortOptions.postedDate = -1;
    if (sortBy === 'salary') sortOptions['salary.min'] = -1;

    const jobs = await Job.find(filter)
      .populate('employer', 'name companyName companyLogo email')
      .sort(sortOptions)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Job.countDocuments(filter);

    res.status(200).json({
      jobs,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        currentPage: parseInt(page),
        limit: parseInt(limit)
      }
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error fetching jobs', 
      error: error.message 
    });
  }
};

// Get job details by ID
exports.getJobById = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await Job.findByIdAndUpdate(
      id,
      { $inc: { views: 1 } },
      { new: true }
    ).populate('employer', 'name companyName companyDescription companyWebsite companyLogo email');

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error fetching job', 
      error: error.message 
    });
  }
};

// Update job posting (only by employer)
exports.updateJob = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      location,
      jobType,
      experienceLevel,
      salary,
      skills,
      requirements,
      responsibilities,
      benefits,
      category,
      applicationDeadline,
      isActive
    } = req.body;

    const job = await Job.findById(id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Verify ownership
    if (job.employer.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this job' });
    }

    // Update fields
    if (title) job.title = title;
    if (description) job.description = description;
    if (location) job.location = location;
    if (jobType) job.jobType = jobType;
    if (experienceLevel) job.experienceLevel = experienceLevel;
    if (salary) job.salary = salary;
    if (skills) job.skills = skills;
    if (requirements) job.requirements = requirements;
    if (responsibilities) job.responsibilities = responsibilities;
    if (benefits) job.benefits = benefits;
    if (category) job.category = category;
    if (applicationDeadline) job.applicationDeadline = applicationDeadline;
    if (isActive !== undefined) job.isActive = isActive;

    await job.save();
    await job.populate('employer', 'name companyName companyLogo');

    // Emit WebSocket event for real-time updates
    emitJobUpdated(id, { title, description, isActive });

    res.status(200).json({
      message: 'Job updated successfully',
      job
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error updating job', 
      error: error.message 
    });
  }
};

// Delete job posting (only by employer)
exports.deleteJob = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await Job.findById(id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Verify ownership
    if (job.employer.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this job' });
    }

    await Job.findByIdAndDelete(id);

    // Emit WebSocket event for real-time updates
    emitJobDeleted(id);

    res.status(200).json({ message: 'Job deleted successfully' });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error deleting job', 
      error: error.message 
    });
  }
};

// Apply for a job
exports.applyForJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const { coverLetter, resumeUrl } = req.body;

    const job = await Job.findById(jobId);
    if (!job || !job.isActive) {
      return res.status(404).json({ message: 'Job not found or is no longer active' });
    }

    // Check if already applied
    const existingApplication = await JobApplication.findOne({
      job: jobId,
      applicant: req.user.id
    });

    if (existingApplication) {
      return res.status(400).json({ message: 'You have already applied for this job' });
    }

    const application = new JobApplication({
      job: jobId,
      applicant: req.user.id,
      employer: job.employer,
      coverLetter,
      resume: { url: resumeUrl }
    });

    await application.save();
    await application.populate([
      { path: 'applicant', select: 'name email profilePicture' },
      { path: 'job', select: 'title company' }
    ]);

    // Emit WebSocket event to employer
    emitNewApplication(job.employer, application);

    res.status(201).json({
      message: 'Application submitted successfully',
      application
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error submitting application', 
      error: error.message 
    });
  }
};

// Get applications for a job (employer only)
exports.getJobApplications = async (req, res) => {
  try {
    const { jobId } = req.params;
    const { status, page = 1, limit = 10 } = req.query;

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Verify ownership
    if (job.employer.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to view applications' });
    }

    const filter = { job: jobId };
    if (status) filter.status = status;

    const skip = (page - 1) * limit;

    const applications = await JobApplication.find(filter)
      .populate('applicant', 'name email profilePicture')
      .sort({ appliedDate: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await JobApplication.countDocuments(filter);

    res.status(200).json({
      applications,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        currentPage: parseInt(page),
        limit: parseInt(limit)
      }
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error fetching applications', 
      error: error.message 
    });
  }
};

// Update application status (employer only)
exports.updateApplicationStatus = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { status, notes, rating } = req.body;

    const application = await JobApplication.findById(applicationId);
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    // Verify ownership
    if (application.employer.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update application' });
    }

    if (status) application.status = status;
    if (notes) application.notes = notes;
    if (rating !== undefined) application.rating = rating;
    application.lastUpdate = new Date();

    await application.save();
    await application.populate('applicant', 'name email');

    // Emit WebSocket event to applicant
    emitApplicationStatusChanged(application.applicant._id, application);

    res.status(200).json({
      message: 'Application updated successfully',
      application
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error updating application', 
      error: error.message 
    });
  }
};

// Get user's job applications
exports.getUserApplications = async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;

    const filter = { applicant: req.user.id };
    if (status) filter.status = status;

    const skip = (page - 1) * limit;

    const applications = await JobApplication.find(filter)
      .populate('job', 'title company location jobType')
      .populate('employer', 'name companyName companyLogo')
      .sort({ appliedDate: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await JobApplication.countDocuments(filter);

    res.status(200).json({
      applications,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        currentPage: parseInt(page),
        limit: parseInt(limit)
      }
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error fetching applications', 
      error: error.message 
    });
  }
};

// Get employer's posted jobs
exports.getEmployerJobs = async (req, res) => {
  try {
    const { page = 1, limit = 10, isActive } = req.query;

    const filter = { employer: req.user.id };
    if (isActive !== undefined) filter.isActive = isActive === 'true';

    const skip = (page - 1) * limit;

    const jobs = await Job.find(filter)
      .sort({ postedDate: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Job.countDocuments(filter);

    // Get application counts for each job
    const jobsWithCounts = await Promise.all(
      jobs.map(async (job) => {
        const applicationCount = await JobApplication.countDocuments({ job: job._id });
        return {
          ...job.toObject(),
          applicationCount
        };
      })
    );

    res.status(200).json({
      jobs: jobsWithCounts,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        currentPage: parseInt(page),
        limit: parseInt(limit)
      }
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error fetching jobs', 
      error: error.message 
    });
  }
};
