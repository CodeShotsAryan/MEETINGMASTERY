// backend/controllers/interviewController.js

const Interview = require('../models/Interview');

exports.storeInterviewData = async (req, res) => {
    try {
        const { interviewer, interviewee, questions, answers, timestamps } = req.body;
        const audio = req.files.audio; // Assuming audio data is sent as a file from the frontend

        const newInterview = new Interview({
            interviewer,
            interviewee,
            questions,
            answers,
            timestamps,
            audio: audio.data, // Store audio data as binary
        });

        await newInterview.save();

        res.status(201).json({ message: 'Interview data stored successfully' });
    } catch (error) {
        console.error('Error storing interview data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
