const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  googleId: { type: String, sparse: true },
  profilePicture: { type: String },
  authMethod: { 
    type: String, 
    enum: ['email', 'google'], 
    default: 'email' 
  },
  role: {
    type: String,
    enum: ['job_seeker', 'employer'],
    default: 'job_seeker'
  },
  companyName: String,
  companyDescription: String,
  bio: String,
  companyWebsite: String,
  companyLogo: String,
  companySize: {
    type: String,
    enum: ['1-10', '11-50', '51-200', '201-500', '500+']
  }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
