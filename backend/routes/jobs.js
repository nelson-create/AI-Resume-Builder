const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');
const { authenticate } = require('../middleware/authMiddleware');

// Public routes
router.get('/', jobController.getAllJobs);
router.get('/:id', jobController.getJobById);

// Protected routes (require authentication)
router.post('/', authenticate, jobController.createJob);
router.put('/:id', authenticate, jobController.updateJob);
router.delete('/:id', authenticate, jobController.deleteJob);

// Applications
router.post('/:jobId/apply', authenticate, jobController.applyForJob);
router.get('/:jobId/applications', authenticate, jobController.getJobApplications);
router.put('/application/:applicationId', authenticate, jobController.updateApplicationStatus);

// User specific routes
router.get('/user/applications/list', authenticate, jobController.getUserApplications);
router.get('/employer/jobs/list', authenticate, jobController.getEmployerJobs);

module.exports = router;
