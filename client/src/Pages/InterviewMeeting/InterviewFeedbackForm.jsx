// InterviewFeedbackForm.jsx

import React, { useState } from 'react';

const InterviewFeedbackForm = () => {
  const [feedback, setFeedback] = useState('');

  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };

  const handleSubmitFeedback = () => {
    // Handle submission of feedback
  };

  return (
    <div className="interview-feedback-form">
      <h3>Interview Feedback</h3>
      <textarea
        value={feedback}
        onChange={handleFeedbackChange}
        placeholder="Enter feedback here..."
      />
      <button onClick={handleSubmitFeedback}>Submit Feedback</button>
    </div>
  );
};

export default InterviewFeedbackForm;
