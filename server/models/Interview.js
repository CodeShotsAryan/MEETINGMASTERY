// backend/models/Interview.js

const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema({
    interviewer: { type: String, required: true },
    interviewee: { type: String, required: true },
    questions: [{ type: String, required: true }],
    answers: [{ type: String, required: true }],
    timestamps: [{ type: Date, required: true }],
    audio: { type: Buffer, required: true }, // Store audio data as binary
    // Add more fields as needed
});

const Interview = mongoose.model('Interview', interviewSchema);

module.exports = Interview;
