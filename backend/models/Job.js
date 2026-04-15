const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  employer: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  title: { 
    type: String, 
    required: true,
    index: true
  },
  description: { 
    type: String, 
    required: true 
  },
  company: { 
    type: String, 
    required: true 
  },
  location: {
    type: String,
    required: true
  },
  jobType: {
    type: String,
    enum: ['Full-time', 'Part-time', 'Contract', 'Temporary', 'Internship'],
    required: true
  },
  experienceLevel: {
    type: String,
    enum: ['Entry Level', 'Mid Level', 'Senior', 'Executive'],
    required: true
  },
  salary: {
    min: Number,
    max: Number,
    currency: { type: String, default: 'USD' },
    showSalary: { type: Boolean, default: true }
  },
  skills: [String],
  requirements: [String],
  responsibilities: [String],
  benefits: [String],
  category: {
    type: String,
    enum: ['Technology', 'Healthcare', 'Finance', 'Marketing', 'Sales', 'Education', 'Other'],
    required: true
  },
  postedDate: {
    type: Date,
    default: Date.now,
    index: true
  },
  applicationDeadline: Date,
  applicants: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    appliedDate: { type: Date, default: Date.now },
    status: {
      type: String,
      enum: ['pending', 'reviewed', 'shortlisted', 'rejected', 'hired'],
      default: 'pending'
    },
    resume: String,
    coverLetter: String
  }],
  isActive: { 
    type: Boolean, 
    default: true 
  },
  views: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

// Index for better query performance
JobSchema.index({ employer: 1, isActive: 1 });
JobSchema.index({ category: 1, isActive: 1 });
JobSchema.index({ location: 1, isActive: 1 });
JobSchema.index({ postedDate: -1 });

module.exports = mongoose.model('Job', JobSchema);
