const express = require('express');
const router = express.Router();

    const interviewController = require('../controllers/InterviewController')

    router.post('/store', interviewController.storeInterviewData);

    module.exports = router;

    