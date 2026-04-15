const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

router.post('/generate-summary', aiController.generateSummary);
router.post('/enhance-experience', aiController.enhanceExperience);
router.post('/enhance-project', aiController.enhanceProject);
router.post('/analyze-ats', aiController.analyzeAts);

module.exports = router;
