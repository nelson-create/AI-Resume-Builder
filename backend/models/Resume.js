const mongoose = require('mongoose');

const ReferenceSchema = new mongoose.Schema({
  name: String,
  position: String,
  company: String,
  email: String,
  phone: String,
});

const EducationSchema = new mongoose.Schema({
  school: String,
  degree: String,
  fieldOfStudy: String,
  startDate: String,
  endDate: String,
  description: String,
});

const ExperienceSchema = new mongoose.Schema({
  title: String,
  company: String,
  location: String,
  startDate: String,
  endDate: String,
  current: Boolean,
  description: String,
});

const ResumeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, default: 'Untitled Resume' },
  personalInfo: {
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    address: String,
    linkedin: String,
    github: String,
    portfolio: String,
    summary: String,
  },
  experience: [ExperienceSchema],
  education: [EducationSchema],
  skills: [String],
  references: [ReferenceSchema],
  template: { type: String, default: 'modern' },
}, { timestamps: true });

module.exports = mongoose.model('Resume', ResumeSchema);
