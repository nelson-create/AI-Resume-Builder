const mongoose = require('mongoose');

const JobApplicationSchema = new mongoose.Schema({
  job: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Job', 
    required: true 
  },
  applicant: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  employer: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  resume: {
    url: String,
    uploadedDate: { type: Date, default: Date.now }
  },
  coverLetter: String,
  status: {
    type: String,
    enum: ['pending', 'reviewed', 'shortlisted', 'rejected', 'accepted', 'hired'],
    default: 'pending',
    index: true
  },
  appliedDate: {
    type: Date,
    default: Date.now,
    index: true
  },
  notes: String,
  rating: {
    type: Number,
    min: 0,
    max: 5
  },
  lastUpdate: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

// Index for better query performance
JobApplicationSchema.index({ job: 1, status: 1 });
JobApplicationSchema.index({ applicant: 1, appliedDate: -1 });
JobApplicationSchema.index({ employer: 1, appliedDate: -1 });

module.exports = mongoose.model('JobApplication', JobApplicationSchema);
